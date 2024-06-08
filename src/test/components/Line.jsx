import { Column, Divider, px } from '@/duxui'

export const CouponLine = () => {
  return <Column style={{ height: px(36) }} justify='center' className='overflow-hidden'>
    <Divider type='dashed' />
    <Column style={{ width: px(36), left: px(-18) }} className='absolute square top-0 bg-page r-max' />
    <Column style={{ width: px(36), right: px(-18) }} className='absolute square top-0 bg-page r-max' />
  </Column>
}