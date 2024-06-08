import { Avatar, Card, Column, Divider, Form, Header, Input, ModalForm, Row, ScrollView, Text, TopView, SelectorPicker, DatePicker, nav } from '@/duxui'
import { CmsIcon, cmsUser, duxappTheme, userHook } from '@/duxcmsUser'
import { useMemo, useCallback } from 'react'

export default function UserSetting() {

  const [userInfo] = cmsUser.useUserInfo()

  const defaultData = useMemo(() => ({
    sex: userInfo.sex,
    birthday: userInfo.birthday,
    nickname: userInfo.nickname,
  }), [userInfo.birthday, userInfo.nickname, userInfo.sex])

  const update = useCallback(data => {
    cmsUser.setInfo({ ...defaultData, ...data }, true)
  }, [defaultData])

  return <TopView>
    <Header title='用户信息' />
    <ScrollView>
      <Form onChange={update} defaultValues={defaultData}>
        <Card margin disableMarginBottom verticalPadding={false}>
          <Divider.Group padding={0}>
            <Row items='center' justify='between' className='pv-3' onClick={() => nav('duxcmsUser/info/avatar')}>
              <Text bold grow>我的头像</Text>
              <Avatar size='s' url={userInfo.avatar} />
              <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
            </Row>
            <Form.Item field='nickname'>
              <ModalForm
                renderForm={props => <Column className='p-3'>
                  <Input placeholder='请输入昵称' type='nickname' focus {...props} />
                </Column>}
                type='confirm'
                title='昵称'
              >
                <Row items='center' justify='between' className='pv-3'>
                  <Text bold grow>昵称</Text>
                  <Text bold>{userInfo.nickname}</Text>
                  <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
                </Row>
              </ModalForm>
            </Form.Item>
            <Form.Item field='sex'>
              <ModalForm
                renderForm={<SelectorPicker
                  range={[{ name: '男', value: 1 }, { name: '女', value: 2 }, { name: '保密', value: 0 }]}
                />}
                title='性别'
              >
                <Row items='center' justify='between' className='pv-3'>
                  <Text bold grow>性别</Text>
                  <Text bold>{userInfo.sex == 1 ? '男' : userInfo.sex == 2 ? '女' : '保密'}</Text>
                  <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
                </Row>
              </ModalForm>
            </Form.Item>

            <Form.Item field='birthday'>
              <ModalForm
                renderForm={<DatePicker mode='date' minDate='1970-01-01' />}
                title='出生日期'
              >
                <Row items='center' justify='between' className='pv-3'>
                  <Text bold grow>出生日期</Text>
                  <Text bold>{!userInfo.birthday ? '2000-01-01' : userInfo.birthday}</Text>
                  <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
                </Row>
              </ModalForm>
            </Form.Item>
            {userHook.Render({ mark: 'setting.item' })}
          </Divider.Group>
        </Card>
        <userHook.Render mark='setting.security'>
          <Card margin disableMarginBottom verticalPadding={false}>
            <Divider.Group padding={0}>
              <Row items='center' justify='between' className='pv-3' onClick={() => nav('duxcmsUser/info/phone')}>
                <Text bold grow>手机号</Text>
                <Text color={3}>更换手机号</Text>
                <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
              </Row>
              <Row items='center' justify='between' className='pv-3' onClick={() => nav('duxcmsUser/info/password')}>
                <Text bold grow>登录密码</Text>
                <Text color={3}>去修改</Text>
                <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
              </Row>
            </Divider.Group>
          </Card>
        </userHook.Render>
      </Form>
    </ScrollView>
  </TopView>
}
