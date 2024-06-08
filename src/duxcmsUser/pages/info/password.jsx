import { useCallback } from 'react'
import { request, user, toast, useVerifyCode } from '@/duxcmsUser'
import { Button, Input, Form, Header, TopView, ScrollView, Loading, Column, Text, Row } from '@/duxui'

export default function Password() {

  const userInfo = user.getUserInfo()

  const code = useVerifyCode()

  const getCode = useCallback(() => {
    code.getCode(() => request({
      url: 'member/setting/code',
      toast: true,
      loading: true,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = async (data) => {
    console.log(data, 'data')
    if (data.password != data.password1) {
      return toast('两次密码不一致')
    }
    await request({
      url: 'member/setting/password',
      method: 'POST',
      data,
      loading: true,
      toast,
    }).then(() => {
      toast('修改成功')
      setTimeout(() => {
        user.logout()
      }, 800);
    })
  };

  return <TopView>
    <Header title='设置密码' />
    <Form onSubmit={submit}>
      <ScrollView>
        <Column className='mh-3 mt-3 bg-white r-2 p-3'>
          <Input disabled value={userInfo.tel} />
        </Column>
        <Row className='mh-3 mt-3 bg-white r-2 p-3' items='center'>
          <Form.Item field='code'>
            <Input placeholder='请输入验证码' className='flex-grow' />
          </Form.Item>
          {
            code.status === 2 ?
              <Loading size={42} /> :
              <Text size={2} type='primary' onClick={getCode}>{code.text}</Text>
          }
        </Row>
        <Column className='mh-3 mt-3 bg-white r-2 p-3'>
          <Form.Item field='password1' >
            <Input password placeholder='请输入新密码' />
          </Form.Item>
        </Column>
        <Column className='mh-3 mt-3 bg-white r-2 p-3'>
          <Form.Item field='password'>
            <Input password placeholder='请再次输入新密码' />
          </Form.Item>
        </Column>
        <Form.Submit>
          <Button type='primary' size='l' className='m-3'>提交</Button>
        </Form.Submit>
      </ScrollView>
    </Form>
  </TopView>
}


