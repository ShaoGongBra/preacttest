# 1.0.27
## Badeg
新增style支持

## Calendar
新增 `onMonthChange` 事件，在用户切换月份的时候触发，默认月份也会触发  
优化文本颜色为为主题色

## Checkbox
新增 `virtual` 属性，可以把多选组设置为虚拟组件，不会生成实体dom

## Radio
新增 `virtual` 属性，可以把多选组设置为虚拟组件，不会生成实体dom

## From
优化当未设置 field 属性时，其功能将不起作用

## HtmlView
优化H5端间距及行高  
修复RN端可能会闪烁的问题

## PikcerDate
当未设置时，设置默认值为当天

## Sign
小程序端用2d模式重写  
新增未签名验证 当笔画过少时会抛出错误  
修复小程序清除功能无效

## TabBar
新增 `onChange` 属性，当切换TabBar项目时触发
新增 `style` `className` 属性

## Video
修复Video显示问题

# 1.0.26
## TouchableOpacity
新增触摸反馈组件

# 1.0.25

## LicensePlate
新增车牌号码输入键盘组件
```jsx
<LicensePlate length={7} onChange={val => console.log(val)} />
```

# 1.0.24

## Absolute
将此组件移动到duxapp基础模块

## PullView
将此组件移动到duxapp基础模块

## BoxShowdow
- 将此组件RN端的实现方法从SVG替换为一个原生组件，极大提高渲染性能
- 移除radius属性
- 统一RN和其他端的属性

## Textarea
统一h5端背景颜色

## HtmlView
修复h5端视频高度错误

## Image
修复无法预览的问题

## Link
新增Link组件，用来跳转链接

## Swiper
新增幻灯片组件

## Video
新增视频播放组件

## Types
修复、补全了多个组件的代码提示

## 其他
- 组件全面支持design设计器

# 1.0.23
## Avatar
优化头像默认值

## UploadImages
修图图片上传组件样式问题

## 新增ScrollViewManage组件
组件用于管理ScrollView组件的刷新状态，提供给多个子元素刷新方法

## TabBar
修复组件会多次刷新的问题

## Tab
新增 `oneHidden` 属性，只有一个Tab选项的时候隐藏Tab

## Types
完善多个组件的代码提示

# 1.0.20

## 新增NumberKeyboard组件
此组件为数字键盘，可以对诸如验证码输入、支付密码输入等环节进行输入优化

## 新增InputCode组件
验证码或者密码输入组件，此组件需配合NumberKeyboard一起使用，使用示例参考示例模块(duxuiExample)

# 1.0.17
## Image
- [修复] square属性在h5下不显示图片
## Grid
- [修复] 过滤无效的子元素

# 1.0.16
## 新增Status组件
组件用于显示在四角的状态，提供两个默认组件,使用方法如下
```jsx
<View className='bg-white items-center justify-center overflow-hidden' style={{ height: px(300) }}>
  <Text>这是内容</Text>
  <Status status={<Status.Incline>状态1</Status.Incline>} />
  <Status horizontal='right' status={<Status.Incline>状态2</Status.Incline>} />
  <Status horizontal='right' vertical='bottom' status={<Status.Incline>状态3</Status.Incline>} />
  <Status status={<Status.Common type='success'>状态</Status.Common>} />
</View>
```

## Tab
- [新增] 新增`badgeProps`属性 用于在Tab项目上显示红点

## Divider
- [新增] `padding`支持通过主题配置默认值

# 1.0.15

## Tab
- [新增] 新增`tabStyle`属性用于控制tab部分的样式
- [修复] RN下 滚动模式下不在左边的问题

## Form
- [新增] 新增`containerProps`属性用于控制`Form.Item`容器的样式

## Empty
- [优化] 替换默认图片

## Card
- [新增] `Card.Title`组件新增样式和类属性

## Calendar
- [新增] 新增`navStyle`和`headStyle`属性用于用户控制导航部分和周导航部分样式
- [优化] 删除默认的白色背景

## Button
- [修复] plan模式下type为custom不生效的问题

## Badeg
- [优化] 优化为点状时的默认颜色

## Image
- [新增] 新增`square`属性，控制是否显示为正方形，使用此属性需要指定width

## Grade
- [新增] 新增`type`属性，控制颜色

## Radio
- [新增] 新增`checked`属性，控制是否选中
- [新增] 新增`onClick`属性，监听点击事件

## HtmlView
- [修复] 修复图片无法预览

## Tag
- [新增] 添加了默认样式

## Text
- [优化] 优化了Text的渲染性能


# 1.0.8

## 更新说明

- [新增] 日历组件支持自定义日期
- [新增] 日历组件支持传入自定义禁用日期
- [types] 补全表单相关代码提示

# 1.0.0

## 更新说明

发布首个版本
