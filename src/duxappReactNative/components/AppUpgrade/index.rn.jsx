import { updateApp } from '@/duxappReactNative/utils/rn'
import { Text } from '@tarojs/components'
import { cloneElement, isValidElement, useEffect, useState } from 'react'
import { getVersion, getBuildNumber } from 'react-native-device-info'
import codePush from 'react-native-code-push'
import { toast } from '@/duxapp/utils/util'

export const AppUpgrade = ({
  children
}) => {
  if (isValidElement(children)) {
    return cloneElement(children, {
      onClick: e => {
        children.props.onClick?.(e)
        updateApp().then(status => {
          if (!status) {
            toast('已是最新版本')
          }
        })
      }
    })
  }
  console.log('AppUpgrade子元素只能是一个可点击的组件')
  return null
}

const AppUpgradeVersion = props => {
  const [codepushVersion, setCodepushVersion] = useState(false)

  useEffect(() => {
    codePush.getUpdateMetadata(codePush.UpdateState.RUNNING).then(res => {
      if (res) {
        setCodepushVersion(res.label)
      }
    })
  }, [])

  return <Text {...props}>
    {getVersion()} {codepushVersion}({getBuildNumber()})
  </Text>
}

AppUpgrade.Version = AppUpgradeVersion
