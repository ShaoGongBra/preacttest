import { usePageData } from '@/duxcms'
import { Column, Image, Row, ScrollViewManage, nav, px } from '@/duxui'
import { Swiper, SwiperItem } from '@tarojs/components'
import { useEffect, useState } from 'react'

export const HomeBanner = ({ height = 540 }) => {
  const { onRefresh } = ScrollViewManage.useContext()

  const [data, dataAction] = usePageData('tools/magic/banner', { cache: true })

  useEffect(() => {
    const { remove } = onRefresh(dataAction.reload)
    return () => remove()
  }, [dataAction.reload, onRefresh])

  const [select, setSelect] = useState(0)

  return <Column>
    <Swiper style={{ height: px(height) }} onChange={e => setSelect(e.detail.current)}>
      {
        data.map(item => {
          return <SwiperItem key={item.id}>
            <Image src={item.image} className='w-full h-full' onClick={() => nav(item.url)} />
          </SwiperItem>
        })
      }
    </Swiper>
    <Row className='absolute left-0 right-0 gap-1 z-1 bottom-0 pv-3' style={{ bottom: px(24) }} justify='center'>
      {
        data.map((item, index) => <Column
          key={item.id}
          className='r-2'
          style={{
            backgroundColor: select === index ? '#fff' : 'rgba(255,255,255,0.5)',
            width: px(select === index ? 32 : 12),
            height: px(12)
          }}
        />)
      }
    </Row>
  </Column>
}
