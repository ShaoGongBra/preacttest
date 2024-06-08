import { TopView, px } from '@/duxapp'
import { TabBar, PlayerIcon, duxappTheme } from '@/test'
import { Home, News, Player, User } from './pages'

const list = [
  {
    text: '首页',
    icon: 'tabbar_home_nor',
    iconHover: 'tabbar_home_fill',
    comp: Home
  },
  {
    text: '赛事',
    icon: 'tabBar_circle_nor',
    iconHover: 'tabBar_circle_fill',
    comp: Player
  },
  {
    text: '资讯',
    icon: 'tabbar_study_nor',
    iconHover: 'tabbar_study_fill',
    comp: News
  },
  {
    text: '我的',
    icon: 'tabBar_mine_nor',
    iconHover: 'tabBar_mine_fill',
    comp: User
  },
]

const TabBarIcon = ({
  hover,
  index
}) => {
  return <TabBar.ItemIcon
    hover={hover}
    name={list[index].text}
    image={list[index].image}
    imageHover={list[index].imageHover}
    icon={list[index].icon && <PlayerIcon size={52} color={hover ? duxappTheme.primaryColor : duxappTheme.textColor1}
      name={list[index][hover ? 'icon' : 'iconHover']}
      style={{ lineHeight: px(52) }}
    />}
  />
}

export default function Index() {

  return <TopView isSafe>
    <TabBar>
      {
        list.map(item => <TabBar.Item key={item.text} component={item.comp} icon={TabBarIcon} />)
      }
    </TabBar>
  </TopView>
}
