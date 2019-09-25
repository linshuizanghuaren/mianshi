### 什么是W3c标准,探探对W3C的理解

- web标准规范要求,书写标签必须闭合、标签小写,不乱嵌套,可提高机器人对网页的搜索几率
- 建议使用外链css和酵素脚本,从而达到结构与行为,结构与表现粉分离,提高页面的渲染速度,能更快的显示页面的内容
- 样式与标签分离,更合理的语义化便签,是内容能被更多的用户所访问,内容能被更广泛的设备访问,减少代码和组件,从而降低维护成本,改本更方便
- 不需要变动页面内容,便可提供打印版本,提高网站易用性

### Doctype作用?严格模式与兼容模式各有什么区别

- Doctype是用来声明文档类型,告诉浏览器的解析器用什么文档标准解析文档.Doctype不存在或者格式不正确会导致文档以兼容模式呈现
- 文档类型有三种:strict(严格),Transitional(过渡)以及Franset(基于框架)
- 1:width不同
  - 在严格模式中 ：width是内容宽度 ，元素真正的宽度 = margin-left + border-left-width + padding-left + width + padding-right + border-right- width +  margin-right;
  - 在兼容模式中 ：width则是元素的实际宽度 ，内容宽度 = width - ( padding-left + padding-right + border-left-width + border-right-width)
- 兼容模式下可设置百分比的高度和行内元素的高宽
- 在Standards模式下，给span等行内元素设置width和height都不会生效，而在兼容模式下，则会生效。
- 在standards模式下，一个元素的高度是由其包含的内容来决定的，如果父元素没有设置高度，子元素设置一个百分比的高度是无效的。
- 用margin:0 auto设置水平居中在IE下会失效
- 使用margin:0 auto在standards模式下可以使元素水平居中，但在兼容模式下却会失效（用text-align属性解决）
body{text-align:center};#content{text-align:left}
- 兼容模式下Table中的字体属性不能继承上层的设置，white-space:pre会失效，设置图片的padding会失效

### html5为什么只需要<!DOCTYPE HTML>?

- DTD的是W3C所发布的一个文档类型定义，简单的说，就是告诉浏览器你的这个HTML，是根据那个标准写的，解析的时候用哪个标准解析。
- HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）。
- 而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型

### html语义化标签以及语义化的好处

- audio,img,address,date,header,footer,aside
- 即使在没有CSS样式的条件下，也能很好地呈现出内容结构、代码结构
- 语义化HTML会使HTML结构变的清晰，有利于维护代码和添加样式
- 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页
- 提升搜索引擎优化(SEO)的效果。和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重
- 便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循W3C标准的团队都遵循这个标准，可以减少差异化
- 通常语义化HTML会使代码变的更少，使页面加载更快

### 浏览器内核的理解

主要分成两部分：渲染引擎(layout engineer 或 Rendering Engine)和 JS 引擎。

渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后渲染到用户的屏幕上。

JS 引擎则：解析和执行 javascript 来实现逻辑和控制 DOM 进行交互。

最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。

| 浏览器  | 内核           | 备注   |
| -      | -     | - |
| IE      | Trident        | IE、猎豹安全、360 极速浏览器、百度浏览器  |
| firefox | Gecko          |    |
| Safari  | webkit         | 从 Safari 推出之时起，它的渲染引擎就是 Webkit，一提到 webkit，首先想到的便是 chrome，Webkit 的鼻祖其实是 Safari。 |
| chrome  | Chromium/Blink | 在 Chromium 项目中研发 Blink 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。Blink 其实是 WebKit 的分支。大部分国产浏览器最新版都采用 Blink 内核。二次开发    |
| Opera   | blink          | Opera内核原为：Presto，现在跟随 chrome 用 blink 内核。     |

### head元素

head子元素大概分为三类，分别是：

- 描述网页基本信息的
- 指向渲染网页需要其他文件链接的
- 各大厂商根据自己需要定制的

### meta中设置viewport是做什么用的,怎么写

阻止用户手滑放大或缩小页面，需要在 index.html中添加meta元素,设置viewport。

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
```

### html中title属性和alt属性的区别

```html
<img src="#" alt="alt信息" />
```

当图片不输出信息的时候，会显示 alt 信息 鼠标放上去没有信息，当图片正常读取，不会出现 alt 信息。

```html
<img src="#" alt="alt信息" title="title信息" />
```

- 当图片不输出信息的时候，会显示 alt 信息 鼠标放上去会出现 title 信息；
- 当图片正常输出的时候，不会出现 alt 信息，鼠标放上去会出现 title 信息。
- 除了纯装饰图片外都必须设置有意义的值，搜索引擎会分析。

### 页面导入样式时,使用link和@import有什么区别?

- link 属于 XHTML 标签，除了加载 CSS 外，还能用于定义 RSS, 定义 rel 连接属性等作用；而@import 是 CSS 提供的，只能用于加载 CSS;
- 页面被加载的时，link 会同时被加载，而@import 引用的 CSS 会等到页面被加载完再加载;
- import 是 CSS2.1 提出的，只在 IE5 以上才能被识别，而 link 是 XHTML 标签，无兼容问题;
- link 支持使用 js 控制 DOM 去改变样式，而@import 不支持;

### 行内元素有哪些?块级元素有哪些?空元素有哪些?哪些元素可以自闭合

定义：CSS 规范规定，每个元素都有 display 属性，确定该元素的类型，每个元素都有默认的 display 值，如 div 的 display 默认值为“block”，则为“块级”元素；span 默认 display 属性值为“inline”，是“行内”元素。

- 行内元素有：a b span img input select strong（强调的语气）
- 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p
- 行内块元素: input img td
- 空元素：
  - 常见: br hr img input link meta
  - 不常见: area base col command embed keygen param source track wbr
- 自闭合: input meta link br hr img

### html和dom的关系

- HTML只是一个字符串
- DOM由HTML解析而来
- JS可以维护DOM

- HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等。
功能的增加：

  - 绘画 canvas
  - 用于媒介播放的 video 和 audio 元素
  - 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失
  - sessionStorage 的数据在浏览器关闭后自动删除
  - 语意化更好的内容元素，比如 article、footer、header、nav、section
  - 表单控件，calendar、date、time、email、url、search
  - 新的技术 webworker, websocket, Geolocation
- 移除的元素：
  
  - 纯表现的元素：basefont，big，center，font, s，strike，tt，u;
  - 对可用性产生负面影响的元素：frame，frameset，noframes；
- 支持 HTML5 新标签：

  - IE8/IE7/IE6 支持通过 document.createElement 方法产生的标签，
  - 可以利用这一特性让这些浏览器支持 HTML5 新标签，
  - 浏览器支持新标签后，还需要添加标签默认的样式。
  - 当然也可以直接使用成熟的框架、比如 html5shim;

    ```html
    <!--[if lt IE 9]>
      <script>
        src = 'http://html5shim.googlecode.com/svn/trunk/html5.js'
      </script>
    <![endif]-->
    ```

- 如何区分 HTML5： DOCTYPE 声明\新增的结构元素\功能元素

### HTML5 的离线储存怎么使用，工作原理能不能解释一下？

在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

原理：HTML5 的离线存储是基于一个新建的.appcache 文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

### 浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢？

- 在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问 app，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过 app 并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。
- 离线的情况下，浏览器就直接使用离线存储的资源。

在离线状态时，操作 window.applicationCache 进行需求实现。

### em与i的区别

- 效果都是斜体
- em 是语义化标签，表强调
- i 是样式标签， 表斜体

### property和attribute的区别

例如一个input标签 `<input value="3" />`
他的attribute是3
但如果使用`input.value = 4` 或 直接修改值为4，这时再去getAttribute得到的还是"3"

### form的作用

- 直接提交表单
- 使用submit / reset按钮
- 便于浏览器保存表单
- 第三方库可以整体取值
- 第三方库可以进行表单验证

### cookies, sessionStorage, localStorage的区别

- cookie 是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）
- cookie 数据始终在同源的 http 请求中携带（即使不需要），记会在浏览器和服务器间来回传递。
- sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。
- 存储大小：
- cookie 数据大小不能超过 4k。
- sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。
- 有效期（生命周期）：
- localStorage: 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
- sessionStorage: 数据在当前浏览器窗口关闭后自动删除。
- cookie: 设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭
- 共享
- sessionStorage不能共享，localStorage在同源文档之间共享，cookie在同源且符合path规则的文档之间共享

### 一像素边框问题

有的手机分辨率比较高，是2倍屏或3倍屏，手机上的浏览器就会把CSS中的1像素值展示为2个或3个物理宽度 解决方法： 添加一个border.css库，将利用**scroll缩放的原理**将边框重置。当我们需要使用一像素边框时只需要在标签上添加对应类名，如设置底部一像素边框就在标签上加入"border-bottom"的class名

### 300毫秒点击延迟问题

在移动端开发中，某些机型上使用click事件会延迟300ms才执行，这样影响了用户体验。 解决方法： 引入[fastclick.js](https://www.jianshu.com/p/05b142d84780)。

### 重绘和回流

html加载时发生了什么

在页面加载时，浏览器把获取到的HTML代码解析成1个DOM树，DOM树里包含了所有HTML标签，包括display:none隐藏，还有用JS动态添加的元素等。
浏览器把所有样式(用户定义的CSS和用户代理)解析成样式结构体
DOM Tree 和样式结构体组合后构建render tree, render tree类似于DOM tree，但区别很大，因为render tree能识别样式，render tree中每个NODE都有自己的style，而且render tree不包含隐藏的节点(比如display:none的节点，还有head节点)，因为这些节点不会用于呈现，而且不会影响呈现的，所以就不会包含到 render tree中。我自己简单的理解就是DOM Tree和我们写的CSS结合在一起之后，渲染出了render tree

什么是回流

当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候，这时候是一定会发生回流的，因为要构建render tree。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。

什么是重绘
当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘

区别:

回流必将引起重绘，而重绘不一定会引起回流。比如：只有颜色改变的时候就只会发生重绘而不会引起回流
当页面布局和几何属性改变时就需要回流
比如：添加或者删除可见的DOM元素，元素位置改变，元素尺寸改变——边距、填充、边框、宽度和高度，内容改变

### 同源策略

如果两个页面的协议，端口（如果有指定）和域名都相同，则两个页面具有相同的源。

同源策略是什么

同源策略是浏览器的一个安全功能，不同源的客户端脚本在没有明确授权的情况下，不能读写对方资源。所以xyz.com下的js脚本采用ajax读取abc.com里面的文件数据是会被拒绝的。

同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

不受同源策略限制的

1.页面中的链接重定向以及表单提交是不会受到同源策略限制的。

2.跨域资源的引入是可以的。但是js不能读写加载的内容。如嵌入到页面中的<script src="..."></script>，<img>，<link>，<iframe>等。

### 优雅降级和渐进增强

什么是优雅降级

在网页开发中，优雅降级指的是一开始针对一个高版本的浏览器构建页面，先完善所有的功能。然后针对各个不同的浏览器进行测试，修复，保证低级浏览器也有基本功能 就好，低级浏览器被认为“简陋却无妨 (poor, but passable)” 可以做一些小的调整来适应某个特定的浏览器。但由于它们并非我们所关注的焦点，因此除了修复较 大的错误之外，其它的差异将被直接忽略。也就是以高要求，高版本为基准，向下兼容

什么是渐进增强

在网页开发中，渐进增强认为应该专注于内容本身。一开始针对低版本的浏览器构建页面，满足最基本的功能，再针对高级浏 览器进行效果，交互，追加各种功能以达到更好用户体验,换句话说，就是以最低要求，实现最基础功能为基本，向上兼容

二者区别

1.如果你采用渐进增强的开发流程，先做一个基本功能版，然后针对各个浏览器进行渐进增加，增加各种功能。相对于优雅降级来说，开发周期长，初期投入资金大。 你想一下不可能拿个基本功能版给客户看呀，多寒酸，搞不好一气之下就不找你做了，然后就炸了。但是呢，也有好处，就是提供了较好的平台稳定性，维护起来资金小， 长期来说降低开发成本。

2.那采用优雅降级呢，这样可以在较短时间内开发出一个只用于一个浏览器的完整功能版，然后就可以拿给PM找客户谈呀，可以拿去测试，市场试水呀，对于功能尚未确定的 产品，优雅降级不失为一种节约成本的方法。

### canvas和svg的区别

canvas是html5提供的新元素<canvas\>，而svg存在的历史要比canvas久远，已经有十几年了。svg并不是html5专有的标签，最初svg是用xml技术（超文本扩展语言，可以自定义标签或属性）描述二维图形的语言。在H5中看似canvas与svg很像，但是，他们有巨大的差别。

首先，从它们的功能上来讲，canvas可以看做是一个画布。，其绘制出来的图形为**标量图**，因此，可以在canvas中引入jpg或png这类格式的图片，在实际开发中，大型的网络**游戏**都是用canvas画布做出来的，并且canvas的技术现在已经相当的成熟。另外，我们喜欢用canvas来做一些统计用的图表，如柱状图曲线图或饼状图等。
而svg，所绘制的图形为**矢量图**，所以其用法上受到了限制。因为只能绘制矢量图，所以svg中不能引入普通的图片，因为矢量图的不会失真的效果，在项目中我们会用来**做小图标**。但是由于其本质为矢量图，可以被无限放大而不会失真，这很适合被用来做地图，而百度地图就是用svg技术做出来的。

另外从技术发面来讲canvas里面绘制的图形不能被引擎抓取，如我们要让canvas里面的一个图片跟随鼠标事件: canvas.onmouseover=function(){}。
而svg里面的图形可以被引擎抓取，支持事件的绑定。另外canvas中我们绘制图形通常是通过javascript来实现，svg更多的是通过标签来来实现，如在svg中绘制正矩形形就要用<rect>，这里我们不能用属性style="width:XXX;height:XXX;"来定义。

### HTML5 的 form 如何关闭自动补全功能？

给不想要提示的 form 或某个 input 设置为 autocomplete=off。

### 如何实现浏览器内多个标签页之间的通信? (阿里)

- WebSocket、SharedWorker；
- 也可以调用 localstorge、cookies 等本地存储方式；

localstorge 另一个浏览上下文里被添加、修改或删除时，它都会触发一个`storage`事件，
我们通过监听事件，控制它的值来进行页面信息通信；
注意 quirks：Safari 在无痕模式下设置 localstorge 值时会抛出 QuotaExceededError 的异常；

### iframe 有那些缺点？

- iframe 会阻塞主页面的 Onload 事件；
- 搜索引擎的检索程序无法解读这种页面，不利于 SEO;
- iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

使用 iframe 之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript动态给 iframe 添加 src 属性值，这样可以绕开以上两个问题。

### 如何在页面上实现一个圆形的可点击区域？

- map+area 或者 svg
- border-radius
- 纯 js 实现 需要求一个点在不在圆上简单算法、获取鼠标坐标等等

### 实现不使用 border 画出 1px 高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果。

```html
<div style="height:1px;overflow:hidden;background:red"></div>
```

### Label 的作用是什么？是怎么用的？

label 标签来定义表单控制间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

```html
<label for="Name">Number:</label> <input type=“text“name="Name" id="Name"/>
<label>Date:<input type="text" name="B"/></label>
```
