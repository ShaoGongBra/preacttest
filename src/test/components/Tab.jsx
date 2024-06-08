import { Badge, Column, Image, Row, duxappTheme, Text, px } from '@/duxui'
import tab from './images/tab.png'

export const PlayerTab = ({
  list,
  value,
  onChange
}) => {
  return <Row className='mt-3 mh-3'>
    {
      list.map(item => {
        const select = item.value === value
        return <Row key={item.name} style={{ width: px(272), height: px(72) }} onClick={() => !select && onChange(item.value)}>
          <Column className={select ? 'bg-white gap-1' : 'gap-1'} justify='end' items='center' style={{ width: px(240) }}>
            <Badge dot={item.dot}>
              <Text {...select ? { type: 'danger' } : {}} bold>{item.name}</Text>
            </Badge>
            <Column
              style={{ width: px(80), height: px(6), backgroundColor: select ? duxappTheme.primaryColor : 'transparent' }}
              className='r-1'
            />
          </Column>
          {select && <Image src={tab} style={{ width: px(32) }} className='h-full' />}
        </Row>
      })
    }
  </Row>
}
