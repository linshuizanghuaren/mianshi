# 小程序文件结构

- 文件夹
- app.json
  - 必须要有这个文件，如果没有这个文件，项目无法运行，因为微信小程序把这个作为配置文件入口，是当前小程序的全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 等。
- app.js
  - 必须要有这个文件，没有也会报错！这个文件创建一下就行，可以什么都不写，以后我们可以在这个文件中监听并处理小程序的生命周期函数、声明全局变量。
- project.config.json
  - 小程序工具的个性化配置，例如界面颜色、编译配置等等。

## pages里面的文件，分为四种类型，下面来简单介绍一下这四程类型

- WXML模板：和HTML非常像，WXML由标签属性等构成，但是和HTML也有很多不一样的地方，
  - 例如：
    - 标签名字不一样，写 HTML 的时候，经常会用到的标签是 div, p, span，而小程序的 WXML 用的标签是 view, button, text 等等
    - 多了一些 wx:if 这样的属性以及 {{ }} 这样的表达式
- WXSS 样式：WXSS 具有 CSS 大部分的特性，小程序在 WXSS 也做了一些扩充和修改。
  - 新增了尺寸单位rpx。1rpx=0.5px=1物理像素
  - 提供了全局的样式和局部样式。你可以写一个 app.wxss 作为全局样式，会作用于当前小程序的所有页面，局部页面样式 page.wxss 仅对当前页面生效。
  - 此外 WXSS 仅支持部分 CSS 选择器
- JS 交互逻辑：一个服务仅仅只有界面展示是不够的，还需要和用户做交互：响应用户的点击、获取用户的位置等等。在小程序里边，我们就通过编写 JS脚本文件来处理用户的操作。
- 页面配置page.json：独立定义每个页面的一些属性，例如顶部颜色、是否允许下拉刷新等等。

## 小程序事件

### 事件分类

- 冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递。
- 非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递

### 事件绑定

- 事件绑定的写法同组件的属性，以 key、value 的形式。
  - key 以bind或catch开头，然后跟上事件的类型，如bindtap、catchtouchstart。
  - value 是一个字符串，需要在对应的 Page 中定义同名的函数。不然当触发事件的时候会报错。
bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。

### 刷新加载

- 需要在app.json的window选项中或页面配置中开启enablePullDownRefresh。
- 可以通过wx.startPullDownRefresh触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
- 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。

### 更新页面

```js
  this.setData(Object data, Function callback)
```

### 小程序生命周期

- onLaunch 初始化
- onShow  显示
- onHide  隐藏
- onError 错误
- onPageNotFound  页面不存在

### 页面生命周期

- data  页面初始化
- onLoad  页面加载
- onShow  页面显示
- onReady  页面初次渲染完成
- onHide  页面隐藏
- onUnload  页面卸载

### 常用API

- onPullDownRefresh  下拉动作
- onReachBottom  上拉动作
- onShareAppMessage  分享
- onPageScroll  页面滚动
- onTabItemTap  tab点击事件

### 传值

- 使用全局变量实现数据传递
- 页面跳转或重定向时，使用url带参数传递数据
- 使用组件模板 template传递参数
- 使用缓存传递参数
- 使用数据库传递数据

### 开发框架

- mpvue 美团
- wepy 腾讯
- taro 京东
