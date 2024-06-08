import { ComponentType, Component, CSSProperties } from 'react'

interface names {
  '0yuanfeiyong'
  'jinbi'
  'guge'
  'zanting'
  'dianhua'
  'daohang'
  'fuhao-weizhi'
  'arrow_left'
  'tabBar_circle_nor'
  'tabBar_circle_fill'
  'tabbar_home_fill'
  'tabbar_home_nor'
  'tabBar_mine_fill'
  'tabbar_study_nor'
  'tabBar_mine_nor'
  'tabbar_study_fill'
}

interface PlayerIconProps {
  /** 图标名称 */
  name?: keyof names
  /**
   * 图标颜色
   */
  color?: string
  /**
   * 图标尺寸
   */
  size?: number,
  /**
   * class
   */
  className: string,
  /**
   * 样式
   */
  style: CSSProperties,
  /**
   * 点击事件
   * @returns
   */
  onClick: () => void
}

/**
 * PlayerIcon 图标库
 */
export class PlayerIcon extends Component<PlayerIconProps> {

}
