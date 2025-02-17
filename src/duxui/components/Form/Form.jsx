import { deepCopy, noop } from '@/duxapp/utils'
import { isValidElement, cloneElement, Fragment, createContext, useContext, useEffect, useMemo, useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import { Schema } from 'b-validate'
import { Text } from '../Text'
import { Column } from '../Flex'
import { Button } from '../Button'
import { Space } from '../Space'
import './Form.scss'

export const formContext = createContext({
  data: {},
  values: {},
  setValue: (field, value) => undefined,
  setValues: data => undefined,
  submit: noop,
  reset: noop,
  labelProps: {},
  containerProps: {},
  direction: 'horizontal',
  disabled: false,
  addItem: noop,
  /**
   * FormItem会触发此事件 用来收集子元素中的字段
   */
  onGetField: noop,
  /**
   * 验证结果
   */
  validateErrors: null
})

export const useFormContext = () => useContext(formContext)

export const Form = forwardRef(({
  labelProps,
  containerProps,
  direction = 'horizontal',
  disabled,
  children,
  onChange,
  onSubmit,
  defaultValues: propsDefaultValues
}, ref) => {

  const _defaultValues = useMemo(() => {
    if (typeof propsDefaultValues === 'function') {
      return {}
    }
    return { ...propsDefaultValues || {} }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [defaultValues, setDefaultValues] = useState(_defaultValues)

  const [values, setvalues] = useState(_defaultValues)

  // 同步或者异步获取默认值
  useEffect(() => {
    if (typeof propsDefaultValues === 'function') {
      const val = propsDefaultValues()
      if (val instanceof Promise) {
        val.then(res => {
          setDefaultValues(res)
          setvalues(res)
        })
      } else {
        setDefaultValues(val)
        setvalues(val)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 将值保存起来
  const valuesRef = useRef(values)
  valuesRef.current = values

  const [resultData, setResultData] = useState({ ...defaultValues })

  // 将onChange存起来
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  // 将onSubmit存起来
  const onSubmitRef = useRef(onSubmit)
  onSubmitRef.current = onSubmit

  useEffect(() => {
    if (defaultValues === values) {
      return
    }
    onChangeRef.current?.(deepCopy(values))
  }, [values, defaultValues])

  const setValue = useCallback((key, value) => {
    setvalues(old => {
      old[key] = value
      return { ...old }
    })
  }, [])

  const setValues = useCallback(data => {
    setvalues(old => ({ ...old, ...data }))
  }, [])

  /**
   * 存储验证规则
   */
  const validateSchemas = useRef({})

  const [validateErrors, setValidateErrors] = useState(null)

  /**
   * 表单验证
   */
  const validate = useCallback(async () => {
    return new Promise((resolve, reject) => {
      const schema = new Schema(validateSchemas.current)
      schema.validate(valuesRef.current, errors => {
        if (!errors) {
          resolve()
        } else {
          reject(errors)
        }
        setValidateErrors(errors)
      })
    })
  }, [])

  /**
   * 收集表单验证
   */
  const addItem = useCallback(({ field, rules }) => {
    validateSchemas.current[field] = rules
  }, [])

  const submit = useCallback(async () => {
    await validate()
    onSubmitRef.current?.(deepCopy(valuesRef.current))

    // onChangeRef.current?.(deepCopy(valuesRef.current))
    setResultData(deepCopy(valuesRef.current))
  }, [validate])

  const reset = useCallback(() => {
    setvalues(deepCopy(defaultValues))

    setResultData(deepCopy(defaultValues))
    // onChangeRef.current?.(deepCopy(defaultValues))
  }, [defaultValues])

  useImperativeHandle(ref, () => {
    return {
      data: resultData,
      defaultValues,
      values,
      setValue,
      setValues,
      submit,
      reset,
      validate
    }
  }, [resultData, defaultValues, values, reset, setValue, setValues, submit, validate])

  const result = {
    data: resultData, defaultValues, values,
    setValue, setValues, submit, reset, validate, addItem,
    labelProps, containerProps, direction, disabled, validateErrors
  }

  return <formContext.Provider value={result}>
    {
      typeof children === 'function'
        ? children(result)
        : children
    }
  </formContext.Provider>
})

const FormItem = ({
  label,
  labelProps,
  containerProps,
  subLabel,
  renderLabelRight,
  desc,
  direction,
  required,
  initialValue,
  style,
  disabled,
  className,
  children,
  rules,
  trigger,
  triggerPropName,
  field,
  // 当有的表单一个需要编辑多个字段时，指定此方式
  fields,
  ...props
}) => {

  const form = useFormContext()

  const fieldOld = useRef(null)

  useMemo(() => {
    rules?.length && form.addItem({
      field,
      rules
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field])

  useMemo(() => {
    form.onGetField?.(field, fieldOld.current)
    fieldOld.current = field
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field])

  const horizontal = (direction || form.direction) === 'horizontal'

  const _labelProps = { ...form.labelProps, ...labelProps }

  const _containerProps = { ...form.containerProps, ...containerProps }

  const value = form.values[field]

  const child = useMemo(() => {
    let _child = children
    if (typeof children === 'function') {
      _child = children({
        value,
        ...form,
        // data: form.data,
        // values: form.values,
        // setValue: form.setValue,
        // setValues: form.setValues,
        // submit: form.submit,
        // reset: form.reset
      })
    }
    if (isValidElement(_child) && (typeof field !== 'undefined' || fields)) {
      _child = cloneElement(_child, {
        [trigger]: _value => {
          _child[trigger]?.(_value)
          if (fields) {
            form.setValues(_value)
          } else {
            form.setValue(field, _value)
          }
        },
        field: _child.props.field || field,
        [triggerPropName]: _child[triggerPropName] ?? (fields ? form.values : value),
        disabled: disabled ?? form.disabled
      })
    }

    return _child
  }, [children, value, form, trigger, triggerPropName, fields, disabled, field])

  if (!label) {
    return child
  }
  const err = form.validateErrors?.[field]

  const _label = <Text
    {..._labelProps}
    className={classNames(horizontal && 'FormItem__label', _labelProps.className)}
    style={_labelProps.style}
  >
    {label}{required && <Text className='FormItem__label__required'>*</Text>}
    {!!subLabel && <Text size={1} color={3} bold={false}> {subLabel}</Text>}
  </Text>

  return <Column {...props} style={style} className={classNames('FormItem', className)}>
    <Space row={horizontal} items={horizontal ? 'center' : 'stretch'} style={_containerProps.style} {..._containerProps} >
      {
        renderLabelRight ? <Space row justify='between'>
          {_label}
          {renderLabelRight}
        </Space>
          : _label
      }
      {child}
    </Space>
    {!!desc && <Text className='FormItem__desc' size={2} color={2}>{desc}</Text>}
    {err && <Text className='FormItem__verify' type='danger' size={1}>{err.message}</Text>}
  </Column>
}

FormItem.defaultProps = {
  trigger: 'onChange',
  triggerPropName: 'value',
  containerProps: {}
}

const Submit = ({ children, ...props }) => {
  const form = useFormContext()
  if (isValidElement(children)) {
    return cloneElement(children, {
      onClick: e => {
        children.props.onClick?.(e)
        form.submit()
      }
    })
  }
  return <Button {...props} onClick={form.submit}>
    {children}
  </Button>
}

const Reset = ({ children, ...props }) => {
  const form = useFormContext()
  if (isValidElement(children)) {
    return cloneElement(children, {
      onClick: e => {
        children.props.onClick?.(e)
        form.reset()
      }
    })
  }
  return <Button {...props} onClick={form.reset}>
    {children}
  </Button>
}

const arrayContext = createContext({})

const ArrayForm = ({
  value,
  onChange,
  renderTop,
  renderBottom,
  renderItem: RenderItem,
  itemContainer: ItemContainer = Fragment,
  children
}) => {

  const form = useFormContext()

  const setValues = useCallback(val => {
    onChange?.(val)
  }, [onChange])

  // 将value保存到ref 在RN上调用setValue时，不会调用到最新的函数，暂时不知道是什么问题
  const valueRef = useRef(value)
  valueRef.current = value

  const setValue = useCallback((index, val) => {
    const _value = Array.isArray(valueRef.current) ? [...valueRef.current] : []
    _value[index] = val
    onChange?.(_value)
  }, [onChange])

  const defaultData = useMemo(() => [], [])

  return <formContext.Provider
    value={{
      ...form,
      values: value || defaultData, setValues, setValue,
      parent: form
    }}
  >
    <arrayContext.Provider value={{ values: value || defaultData, setValues, setValue }}>
      {renderTop}
      <ItemContainer>
        {
          RenderItem ?
            value?.map((item, index) => <RenderItem key={index} value={item} index={index} values={value} />) :
            children
        }
      </ItemContainer>
      {renderBottom}
    </arrayContext.Provider>
  </formContext.Provider>
}

const ArrayAction = ({
  action,
  children
}) => {

  const { values, setValues } = useContext(arrayContext)

  const click = useCallback(() => {
    if (typeof action === 'function') {
      setValues(action(values ? [...values] : []))
    }
  }, [action, setValues, values])

  if (isValidElement(children)) {
    return cloneElement(children, {
      onClick: click
    })
  }
  console.error('ArrayAction组件只能传入一个具有点击事件的子组件')
  return null
}

const ObjectForm = ({
  value,
  onChange,
  children
}) => {

  const form = useFormContext()

  const setValues = useCallback(_data => {
    onChange?.({ ...value, ..._data })
  }, [onChange, value])

  // 将value保存到ref 在RN上调用setValue时，不会调用到最新的函数，暂时不知道是什么问题
  const valueRef = useRef(value)
  valueRef.current = value

  const setValue = useCallback((field, val) => {
    const _value = typeof valueRef.current === 'object' ? { ...valueRef.current } : {}
    _value[field] = val
    onChange?.(_value)
  }, [onChange])

  const defaultData = useMemo(() => ({}), [])

  // console.log(value || defaultData)


  return <formContext.Provider
    value={{
      ...form, values: value || defaultData,
      setValues, setValue,
      parent: form
    }}
  >
    {children}
  </formContext.Provider>
}

const useFormItemProxy = ({ value, onChange, defaultValue } = {}) => {

  const [val, setVal] = useState(value ?? defaultValue)

  const valRef = useRef(val)
  valRef.current = val

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const input = useCallback(e => {
    const _val = e?.detail?.value ?? e
    setVal(_val)
    valRef.current = _val
    onChangeRef.current?.(_val)
  }, [])

  useMemo(() => {
    // 反向更新值
    if (valRef.current !== value) {
      setVal(value)
    }
  }, [value])

  useMemo(() => {
    // 更新默认值
    if (typeof value === 'undefined' && typeof defaultValue !== 'undefined') {
      onChangeRef.current(defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [val, input]
}

Form.Item = FormItem
Form.Submit = Submit
Form.Reset = Reset
Form.Object = ObjectForm
Form.Array = ArrayForm
Form.ArrayAction = ArrayAction
Form.useFormContext = useFormContext
Form.useFormItemProxy = useFormItemProxy
