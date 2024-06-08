import { Avatar, Badge, BoxShadow, Card, Column, Grid, Header, Image, LinearGradient, Row, ScrollView, ScrollViewManage, Text, colorLighten, duxappTheme, nav, px } from '@/duxui'
import { CmsIcon, TabBar, request, user, contextState } from '@/test'
import { useEffect, useState } from 'react'

export function User() {

  const [, loginStatus] = user.useUserInfo()

  const [total, setTotal] = useState({})

  const show = TabBar.useShowStatus()

  useEffect(() => {
    if (show) {
      if (loginStatus && user.isLogin()) {
        request('member/stats').then(setTotal)
        request('member/info').then(user.setInfo)
      } else {
        setTotal({})
      }
    }
  }, [loginStatus, show])

  return <contextState.Provider value={{ total }}>
    <Header absolute style={{ backgroundColor: 'transparent' }}
      renderHeader={<Row className='h-full gap-3 ph-3' items='center' justify='end'>
        <Badge count={total.member?.notice}>
          <CmsIcon onClick={() => nav('duxcmsUser/notice/list')} size={48} color={duxappTheme.textColor1} name='remind' />
        </Badge>
        <CmsIcon onClick={() => nav('duxcmsShop/setting/index')} size={48} color={duxappTheme.textColor1} name='set' />
      </Row>}
    />
    <LinearGradient colors={[colorLighten(duxappTheme.primaryColor, 0.9), duxappTheme.pageColor]} className='absolute left-0 top-0 w-full' style={{ height: px(1000) }} />
  </contextState.Provider>
}
