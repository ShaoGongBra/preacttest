import { Button, Column, Header, Text, Row } from '@/duxui'
import { PlayerIcon } from '@/test/components/PlayerIcon'
import { user } from '@/user'
import './home.scss'

export const Home = () => {

  return <>
    <Header />
    <Row>
      <Column items='center'>
        <PlayerIcon size={40} color='#8D6CEB' name='dianhua' />
        <Text size={20} color='#8D6CEB'>电话</Text>
      </Column>
      <Column items='center'>
        <PlayerIcon size={40} color='#8D6CEB' name='daohang' />
        <Text size={20} color='#8D6CEB'>导航</Text>
      </Column>
    </Row>
    <Button onClick={user.login}>to Login</Button>
  </>
}
