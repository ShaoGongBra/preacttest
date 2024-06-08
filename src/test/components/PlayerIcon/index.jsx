import { Text } from '@tarojs/components'
import { useMemo } from 'react'
import { font, px } from '@/duxapp/utils'
import icons from './icons.json'
import './index.scss'

font.load('PlayerIcon', 'https://pictcdn.client.jujiang.me/fonts/PlayerIcon.1715861528075.ttf')

export const PlayerIcon = ({ name, color, size, style, className, ...props }) => {

  const _style = useMemo(() => {
    const sty = { ...style }
    if (color) {
      sty.color = color
    }
    if (size) {
      sty.fontSize = px(size)
    }
    return sty
  }, [color, size, style])

  const status = font.useFont('PlayerIcon')

  if (!icons[name]) {
    return console.log(`PlayerIcon的${name}图标不存在`)
  }

  if (!status) {
    return null
  }

  return <Text
    className={`PlayerIcon${className ? ' ' + className : ''}`}
    style={_style}
    {...props}
  >
    {String.fromCharCode(icons[name])}
  </Text>
}
