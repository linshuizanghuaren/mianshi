# JS

## DOM事件级别

- DOM0
  - onXXX类型的定义事件
  - element.onclick = function(e) { ... }
- DOM2
  - addEventListener方式
  - element.addEventListener('click', function (e) { ... })
  - btn.removeEventListener('click', func, false)
  - btn.attachEvent("onclick", func);
  - btn.detachEvent("onclick", func);
- DOM3
  - 增加了很多事件类型
  - element.addEventListener('keyup', function (e) { ... })
  - eventUtil 是自定义对象，textInput 是 DOM3 级事件

## DOM 事件模型

捕获从上到下， 冒泡从下到上。
先捕获，再到目标，再冒泡

## DOM事件流

DOM标准采用捕获+冒泡。两种事件流都会触发DOM的所有对象，从window对象开始，也在window对象结束。

DOM标准规定事件流包括三个阶段

- 事件捕获阶段
- 处于目标阶段
- 事件冒泡阶段

## 描述DOM事件捕获的具体流程

从window -> document -> html -> body -> ... -> 目标元素

## 事件捕获与事件冒泡

- 事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发
- 从顶层元素到目标元素或者从目标元素到顶层元素，和事件冒泡是一个相反的过程

## 如何阻止冒泡？

- 取消默认操作
  - w3c 的方法是 e.preventDefault()
  - IE 则是使用 e.returnValue = false;
- return false
  - javascript 的 return false 只会阻止默认行为
  - 是用 jQuery 的话则既阻止默认行为又防止对象冒泡。
- 阻止冒泡
  - w3c 的方法是 e.stopPropagation()
  - IE 则是使用 e.cancelBubble = true

```js
[js] view plaincopy
function stopHandler(event){
  window.event
  ? window.event.cancelBubble = true
  : event.stopPropagation();
}
```

## 事件的代理/委托

事件委托是指将事件绑定目标元素的到父元素上，利用冒泡机制触发该事件

优点：

- 可以减少事件注册，节省大量内存占用
- 可以将事件应用于动态添加的子元素上

但使用不当会造成事件在不应该触发时触发

```js
ulEl.addEventListener('click', function(e){
  var target = event.target || event.srcElement;
  if(target && target.nodeName.toUpperCase() === "LI"){
    console.log(target.innerHTML);
  }
}, false);
```

## 事件代理与普通事件有什么区别

- 普通事件指的是可以用来注册的事件；
- 事件绑定是指把事件注册到具体的元素之上。

## IE 的事件处理和 W3C 的事件处理有哪些区别？

绑定事件

- W3C: targetEl.addEventListener('click', handler, false);
- IE: targetEl.attachEvent('onclick', handler);

删除事件

- W3C: targetEl.removeEventListener('click', handler, false);
- IE: targetEl.detachEvent(event, handler);

事件对象

- W3C: var e = arguments.callee.caller.arguments[0]
- IE: window.event

事件目标

- W3C: e.target
- IE: window.event.srcElement

阻止事件默认行为

- W3C: e.preventDefault()
- IE: window.event.returnValue = false'

阻止事件传播

- W3C: e.stopPropagation()
- IE: window.event.cancelBubble = true

## bom是啥

BOM 是 browser object model 的缩写， 简称浏览器对象模型。 主要处理浏览器窗口和框架，描述了与浏览器进行交互的方法和接口， 可以对浏览器窗口进行访问和操作， 譬如可以弹出新的窗口， 回退历史记录， 获取 url……

## BOM 与 DOM 的关系

1. javacsript 是通过访问 BOM 对象来访问、 控制、 修改浏览器
2. BOM 的 window 包含了 document， 因此通过 window 对象的 document 属性就可以访问、检索、 修改文档内容与结构。
3. document 对象又是 DOM 模型的根节点。

因此， BOM 包含了 DOM， 浏览器提供出来给予访问的是 BOM 对象， 从 BOM 对象再访问到 DOM 对象， 从而 js 可以操作浏览器以及浏览器读取到的文档

## BOM 对象包含哪些内容？

- Window JavaScript 层级中的顶层对象， 表示浏览器窗口。
- Navigator 包含客户端浏览器的信息。
- History 包含了浏览器窗口访问过的 URL。
- Location 包含了当前 URL 的信息。
- Screen 包含客户端显示屏的信息。

## History 对象

History 对象包含用户（在浏览器窗口中） 访问过的 URL

|  方法/属性  |  描述 |
|  -  |   - |
| length     | 返回浏览器历史列表中的 URL 数量。|
| back()     | 加载 history 列表中的前一个 URL。|
| forward()  | 加载 history 列表中的下一个 URL。|
| go()       | 加载 history 列表中的某个具体页面|

## Location 对象

Location 对象包含有关当前 URL 的信息。

| 属性  | 描述 |
|  -  | -  |
| hash     | 设置或返回从井号 (#) 开始的 URL（锚） 。|
| host     | 设置或返回主机名和当前 URL 的端口号。|
| hostname | 设置或返回当前 URL 的主机名。|
| href     | 设置或返回完整的 URL。|
| pathname | 设置或返回当前 URL 的路径部分。|
| port     | 设置或返回当前 URL 的端口号。|
| protocol | 设置或返回当前 URL 的协议。|
| search   | 置或返回从问号 (?) 开始的 URL（查询部分） 。|

| 方法  |  描述  |
|    - |    - |
|assign()         | 加载新的文档。 |
|reload(‘force’)  | 重新加载当前文档。参数可选，不填或填 false 则取浏览器缓存的文档|
|replace()        | 用新的文档替换当前文档。|

## Window 对象

Window 对象表示一个浏览器窗口或一个框架。 在客户端 JavaScript 中， Window 对象
是全局对象，所有的表达式都在当前的环境中计算。 例如，可以只写 document， 而
不必写 window.document。

| 属性               | 描述                            |
|  - | -  |
| closed             | 返回窗口是否已被关闭。          |
| defaultStatus      | 设置或返回窗口状态栏中的默认文本。 （仅 Opera 支持）                |
| document           | 对 Document 对象的只读引用。 请参阅 Document 对象。                 |
| history            | 对 History 对象的只读引用。 请参数 History 对象。                   |
| innerheight        | 返回窗口的文档显示区的高度。    |
| innerwidth         | 返回窗口的文档显示区的宽度。    |
| length             | 设置或返回窗口中的框架数量。    |
| location           | 用于窗口或框架的 Location 对象。 请参阅 Location 对象。             |
| name               | 设置或返回窗口的名称。          |
| Navigator          | 对 Navigator 对象的只读引用。 请参数 Navigator 对象。               |
| opener             | 返回对创建此窗口的窗口的引用。  |
| outerheight        | 返回窗口的外部高度。            |
| outerwidth         | 返回窗口的外部宽度。            |
| pageXOffset        | 设置或返回当前页面相对于窗口显示区左上角的 X 位置。                 |
| pageYOffset        | 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。                 |
| parent             | 返回父窗口。                    |
| Screen             | 对 Screen 对象的只读引用。 请参数 Screen 对象。                     |
| self               | 返回对当前窗口的引用。 等价于 Window 属性。                         |
| status             | 设置窗口状态栏的文本。 (默认只支持 Opera)                           |
| top                | 返回最顶层的先辈窗口。          |
| window             | window 属性等价于 self 属性， 它包含了对窗口自身的引用。            |
| screenLeft <br/> screenTop <br/> screenX <br/> screenY | 只读整数。声明了窗口的左上角在屏幕上的的 x 坐标和 y 坐标。 IE、 Safari、 Chrome 和 Opera 支持 screenLeft 和 screenTop， 而 Chrome、 Firefox 和 Safari 支持 screenX 和 screenY。 |


| 方法            | 描述          |
| - | - |
| alert()         | 显示带有一段消息和一个确认按钮的警告框。          |
| blur()          | 把键盘焦点从顶层窗口移开。                        |
| confirm()       | 显示带有一段消息以及确认按钮和取消按钮的对话框。  |
| createPopup()   | 创建一个弹出窗口。 只有 ie 支持（不包括 ie11）    |
| focus()         | 把键盘焦点给予一个窗口。                          |
| moveBy()        | 可相对窗口的当前坐标把它移动指定的像素。          |
| moveTo()        | 把窗口的左上角移动到一个指定的坐标。              |
| open()          | 打开一个新的浏览器窗口或查找一个已命名的窗口。 window.open(URL,name,features,replace) |
| print()         | 打印当前窗口的内容。                              |
| prompt()        | 显示可提示用户输入的对话框。                      |
| resizeBy()      | 按照指定的像素调整窗口的大小。                    |
| resizeTo()      | 把窗口的大小调整到指定的宽度和高度。              |
| scrollBy()      | 按照指定的像素值来滚动内容。                      |
| scrollTo()      | 把内容滚动到指定的坐标。                          |
| setInterval()   | 按照指定的周期（以毫秒计） 来调用函数或计算表达式。   |
| setTimeout()    | 在指定的毫秒数后调用函数或计算表达式。            |
| clearInterval() | 取消由 setInterval() 设置的 timeout。             |
| clearTimeout()  | 取消由 setTimeout() 方法设置的 timeout。close() 关闭浏览器窗口|

## Navigator 对象

Navigator 对象包含的属性描述了正在使用的浏览器。 可以使用这些属性进行平台专用的配置。 虽然这个对象的名称显而易见的是 Netscape 的 Navigator 浏览器， 但其他实现了 JavaScript 的浏览器也支持这个对象。

| 属性 | 描述 |
| - |  -   |
|appCodeName      | 返回浏览器的代码名。 以 Netscape 代码为基础的浏览器中， 它的值是 "Mozilla"。Microsoft 也是|
|appMinorVersion  | 返回浏览器的次级版本。 （IE4、 Opera 支持）|
|appName          | 返回浏览器的名称。|
|appVersion       | 返回浏览器的平台和版本信息。|
|browserLanguage  | 返回当前浏览器的语言。 （IE 和 Opera 支持）cookieEnabled 返回指明浏览器中是否启用 cookie 的布尔值。|
|cpuClass         | 返回浏览器系统的 CPU 等级。 （IE 支持）|
|onLine           | 返回指明系统是否处于脱机模式的布尔值。|
|platform         | 返回运行浏览器的操作系统平台。|
|systemLanguage   | 返回当前操作系统的默认语言。 （IE 支持）|
|userAgent        | 返回由客户机发送服务器的 user-agent 头部的值。|
|userLanguage     | 返回操作系统设定的自然语言。 （IE 和 Opera 支持）|
|plugins          | 返回包含客户端安装的所有插件的数组|

| 方法 | 描述  |
|  - |  - |
|javaEnabled()    | 规定浏览器是否支持并启用了 Java。|
|taintEnabled()   | 规定浏览器是否启用数据污点 (data tainting)。|

## Screen 对象

Screen 对象包含有关客户端显示屏幕的信息。 每个 Window 对象的 screen 属性都引用一个 Screen 对象。 Screen 对象中存放着有关显示浏览器屏幕的信息。 JavaScript 程序将利用这些信息来优化它们的输出， 以达到用户的显示要求。 例如，一个程序可以根据显示器的尺寸选择使用大图像还是使用小图像，它还可以根据显示器的颜色深度选择使用 16 位色还是使用 8 位色的图形。 另外，JavaScript 程序还能根有关屏幕尺寸的信息将新的浏览器窗口定位在屏幕中间。

|    属性   |   描述   |
|    - |    - |
|availHeight          |返回显示屏幕的高度 (除 Windows 任务栏之外)。|
|availWidth           |返回显示屏幕的宽度 (除 Windows 任务栏之外)。|
|bufferDepth          |设置或返回调色板的比特深度。 （仅 IE 支持）colorDepth 返回目标设备或缓冲器上的调色板的比特深度。|
|deviceXDPI           |返回显示屏幕的每英寸水平点数。 （仅 IE 支持）|
|deviceYDPI           |返回显示屏幕的每英寸垂直点数。 （仅 IE 支持）|
|fontSmoothingEnabled |返回用户是否在显示控制面板中启用了字体平滑。 （仅 IE 支持）|
|height               |返回显示屏幕的高度。|
|logicalXDPI          |返回显示屏幕每英寸的水平方向的常规点数。 （仅 IE 支持）|
|logicalYDPI          |返回显示屏幕每英寸的垂直方向的常规点数。 （仅 IE 支持）|
|pixelDepth           |返回显示屏幕的颜色分辨率（比特每像素） 。|
|updateInterval       | 设置或返回屏幕的刷新率。 （仅 IE11 以下支持）|
| width |返回显示器屏幕的宽度。|

## 检测浏览器版本版本有哪些方式？

- 根据 navigator.userAgent // UA.toLowerCase().indexOf('chrome')
- 根据 window 对象的成员 // 'ActiveXObject' in window

## JS获取dom的CSS样式

```js
function getStyle(obj, attr){
  if(obj.currentStyle){
    return obj.currentStyle[attr];
  } else {
    return window.getComputedStyle(obj, false)[attr];
  }
}
```

## 实现添加,移除,移动,复制,创建,查找节点

创建新节点

- createDocumentFragment() //创建一个 DOM 片段
- createElement() //创建一个具体的元素
- createTextNode() //创建一个文本节点

添加、移除、替换、插入

- appendChild()
- removeChild()
- replaceChild()
- insertBefore() //在已有的子节点前插入一个新的子节点

查找

- getElementsByTagName() //通过标签名称
- getElementsByName() // 通过元素的 Name 属性的值(IE 容错能力较强，会得到一个数组，其中包括 id 等于 name 值的)  
- getElementById() //通过元素 Id，唯一性

## documen.write 和 innerHTML 的区别

- document.write 只能重绘整个页面
- innerHTML 可以重绘页面的一部分

## Window 对象 与 document对象

window

- Window 对象表示当前浏览器的窗口，是 JavaScript 的顶级对象。
- 我们创建的所有对象、函数、变量都是 Window 对象的成员。
- Window 对象的方法和属性是在全局范围内有效的。

document

- Document 对象是 HTML 文档的根节点与所有其他节点（元素节点，文本节点，属性节点, 注释节点）
- Document 对象使我们可以通过脚本对 HTML 页面中的所有元素进行访问
- Document 对象是 Window 对象的一部分，即 window.document

## JS 变量类型

JS中有 6 种原始值，分别是：

1. boolean
2. number
3. string
4. undefined
5. symbol
6. null

引用类型：

1. 对象
2. 数组
3. 函数

## JS中使用typeof能得到哪些类型

其中一个奇怪的 null，虽然是基本变量，但是因为设计的时候`null`是全0，而对象是`000`开头，所以有这个误判。

1. boolean
2. number
3. string
4. undefined
5. symbol
6. **object**
7. **function**

## instanceof 能正确判断对象的原理是什么？

判断一个对象与构造函数是否在一个原型链上

```js
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str = 'hello world'
str instanceof String // false

var str1 = new String('hello world')
str1 instanceof String // true
```

## 实现一个类型判断函数

1. 判断null
2. 判断基础类型
3. 使用`Object.prototype.toString.call(target)`来判断**引用类型**

注意： 一定是使用`call`来调用，不然是判断的Object.prototype的类型
之所以要先判断是否为基本类型是因为：虽然`Object.prototype.toString.call()`能判断出某值是：number/string/boolean，但是其实在包装的时候是把他们先转成了对象然后再判断类型的。 但是JS中包装类型和原始类型还是有差别的，因为对一个包装类型来说，typeof的值是object

```javascript
/**
 * 类型判断
 */
function getType(target) {
  //先处理最特殊的Null
  if(target === null) {
    return 'null';
  }
  //判断是不是基础类型
  const typeOfT = typeof target
  if(typeOfT !== 'object') {
    return typeOfT;
  }
  //肯定是引用类型了
  const template = {
    "[object Object]": "object",
    "[object Array]" : "array",
    // 一些包装类型
    "[object String]": "object - string",
    "[object Number]": "object - number",
    "[object Boolean]": "object - boolean"
  };
  const typeStr = Object.prototype.toString.call(target);
  return template[typeStr];
}
```

## ==与===的区别

- 对于== 来说，如果对比双方的类型不一样的话，就会进行类型转换
- 对于===来说,不转类型，直接判断类型和值是否相同。

## 如何判断一个数据是不是Array

- `Array.isArray(obj)`
  - ECMAScript 5种的函数，当使用ie8的时候就会出现问题。
- `obj instanceof Array`
  - 当用来检测在不同的window或iframe里构造的数组时会失败。这是因为每一个iframe都有它自己的执行环境，彼此之间并不共享原型链，所以此时的判断一个对象是否为数组就会失败。此时我们有一个更好的方式去判断一个对象是否为数组。
- `Object.prototype.toString.call(obj) == '[object Array]'`
  - 这个方法比较靠谱
- `obj.constructor === Array`
  - constructor属性返回对创建此对象的函数的引用

## undefined和null的区别

- Undefined类型只有一个值，即undefined。当声明的变量还未被初始化时，变量的默认值为undefined。
- Null类型也只有一个值，即null。null用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。

## JS中有那些内置对象

- 数据封装类对象
  - String、Array、Object、Boolean、Number
- 其他对象
  - Math、Date、RegExp、Error、Function、Arguments
- ES6 新增对象
  - Promise、Map、Set、Symbol、Proxy、Reflect
- Event对象的常见应用

## obj.toString()和object.prototype.tostring.call(obj)结果不一样的原因

这是因为toString为Object的原型方法，而Array ，function等类型作为Object的实例，都重写了toString方法。不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串.....），而不会去调用Object上原型toString方法（返回对象的具体类型），所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用Object上原型toString方法。

## JS运行分三步

语法分析（通篇扫描是否有语法错误），预编译（发生在函数执行的前一刻），解释执行（一行行执行）

## 作用域与变量声明提升

- 在 JavaScript 中，函数声明与变量声明会被 JavaScript 引擎隐式地提升到当前作用域的顶部
- 声明语句中的赋值部分并不会被提升，只有名称被提升
- 函数声明的优先级高于变量，如果变量名跟函数名相同且未赋值，则函数声明会覆盖变量声明
- 如果函数有多个同名参数，那么最后一个参数（即使没有定义）会覆盖前面的同名参数

## 异步任务

- setTimeOut、setInterval
- DOM 事件
- Promise

## JavaScript 实现异步编程的方法？

- 回调函数
- 事件监听
- 发布/订阅
- Promises 对象
- Async 函数[ES7]

## JavaScript 中，调用函数有哪几种方式？

- 方法调用模式 Foo.foo(arg1, arg2);
- 函数调用模式 foo(arg1, arg2);
- 构造器调用模式 (new Foo())(arg1, arg2);
- call/apply 调用模式 Foo.foo.call(that, arg1, arg2);
- bind 调用模式 Foo.foo.bind(that)(arg1, arg2)();

## 创建对象的方法

- 字面量创建
- 构造函数创建
- Object.create()

```js
var o1 = {name: 'value'};
var o2 = new Object({name: 'value'});

var M = function() {this.name = 'o3'};
var o3 = new M();

var P = {name: 'o4'};
var o4 = Object.create(P)
```

## instanceof原理

判断实例对象的__proto__属性与构造函数的prototype是不是用一个引用。如果不是，他会沿着对象的__proto__向上查找的，直到顶端Object。

## 类的声明

```js
// 普通写法
function Animal() {
  this.name = 'name'
}

// ES6
class Animal2 {
  constructor () {
    this.name = 'name';
  }
}
```

## 判断对象是哪个类的直接实例

使用`对象.construcor`直接可判断

## 箭头函数 => 中this

箭头函数不会创建自己的this,**它只会从自己的作用域链的上一层继承this**

## this的指向有哪几种情况？

this代表函数调用相关联的对象，通常页称之为执行上下文。

1. 作为函数直接调用，非严格模式下，this指向window，严格模式下，this指向undefined；
2. 作为某对象的方法调用，this通常指向调用的对象。
3. 使用apply、call、bind 可以绑定this的指向。
4. 在构造函数中，this指向新创建的对象
5. 箭头函数没有单独的this值，this在箭头函数创建时确定，它与声明所在的上下文相同。

## 如果对一个函数进行多次 bind，那么上下文会是什么呢？

```js
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => ?
```

不管我们给函数 bind 几次，fn 中的 this 永远由第一次 bind 决定，所以结果永远是 window。

```js
// fn.bind().bind(a) 等于
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()
```

## 多个this规则出现时，this最终指向哪里？

首先，new 的方式优先级最高，接下来是 bind 这些函数，然后是 obj.foo() 这种调用方式，最后是 foo 这种调用方式，同时，箭头函数的 this 一旦被绑定，就不会再被任何方式所改变。

- 懒加载的实现
- window.onload和onDocumentReady的区别
- dom.getAttribute(propName)和dom.propName的区别和联系

## focus/blur与focusin/focusout的区别与联系

1. focus/blur不冒泡，focusin/focusout冒泡
2. focus/blur兼容性好，focusin/focusout在除FireFox外的浏览器下都保持良好兼容性，如需使用事件托管，可考虑在FireFox下使用事件捕获elem.addEventListener('focus', handler, true)

## mouseover/mouseout与mouseenter/mouseleave的区别与联系

1. mouseover/mouseout是标准事件，**所有浏览器都支持**；mouseenter/mouseleave是IE5.5引入的特有事件后来被DOM3标准采纳，现代标准浏览器也支持
2. mouseover/mouseout是**冒泡**事件；mouseenter/mouseleave**不冒泡**。需要为**多个元素监听鼠标移入/出事件时，推荐mouseover/mouseout托管，提高性能**
3. 标准事件模型中event.target表示发生移入/出的元素,**event.relatedTarget**对应移出/如元素；在老IE中event.srcElement表示发生移入/出的元素，**event.toElement**表示移出的目标元素，**event.fromElement**表示移入时的来源元素

## 区分什么是“客户区坐标”、“页面坐标”、“屏幕坐标”

- 客户区坐标
  - 鼠标指针在可视区中的水平坐标(clientX)和垂直坐标(clientY)
- 页面坐标
  - 鼠标指针在页面布局中的水平坐标(pageX)和垂直坐标
- 屏幕坐标
  - 设备物理屏幕的水平坐标(screenX)和垂直坐标(screenY)

## offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别

- offsetWidth/offsetHeight 返回值包含 content + padding + border，效果与 e.getBoundingClientRect()相同
- clientWidth/clientHeight 返回值只包含 content + padding，如果有滚动条，也不包含滚动条
- scrollWidth/scrollHeight 返回值包含 content + padding + 溢出内容的尺寸

## 拖拽会用到哪些事件

- dragstart:拖拽开始时在被拖拽元素上触发此事件,监听器需要设置拖拽所需数据,从操作系统拖拽文件到浏览器时不触发此事件.
- dragenter:拖拽鼠标进入元素时在该元素上触发,用于给拖放元素设置视觉反馈,如高亮
- dragover:拖拽时鼠标在目标元素上移动时触发.监听器通过阻止浏览器默认行为设置元素为可拖放元素.
- dragleave:拖拽时鼠标移出目标元素时在目标元素上触发.此时监听器可以取消掉前面设置的视觉效果.
- drag:拖拽期间在被拖拽元素上连续触发
- drop:鼠标在拖放目标上释放时,在拖放目标上触发.此时监听器需要收集数据并且执行所需操作.如果是从操作系统拖放文件到浏览器,需要取消浏览器默认行为.
- dragend:鼠标在拖放目标上释放时,在拖拽元素上触发.将元素从浏览器拖放到操作系统时不会触发此事件.

## [数组Array对象常用方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B)

修改器方法
下面的这些方法会**改变调用它们的对象自身的值**：

- Array.prototype.pop()
  - 删除数组的最后一个元素，并返回这个元素。
- Array.prototype.push()
  - 在数组的末尾增加一个或多个元素，并返回数组的新长度。
- Array.prototype.shift()
  - 删除数组的第一个元素，并返回这个元素。
- Array.prototype.unshift()
  - 在数组的开头增加一个或多个元素，并返回数组的新长度。
- Array.prototype.splice()
  - 在任意的位置给数组添加或删除任意个元素。
- Array.prototype.reverse()
  - 颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。
- Array.prototype.sort()
  - 对数组元素进行排序，并返回当前数组。
- Array.prototype.fill()
  - 将数组中指定区间的所有元素的值，都替换成某个固定的值。
- Array.prototype.copyWithin()
  - 在数组内部，将一段元素序列拷贝到另一段元素序列上，覆盖原有的值。

访问方法
下面的这些方法绝对不会改变调用它们的对象的值，只会返回一个新的数组或者返回一个其它的期望值。

- Array.prototype.join()
  - 连接所有数组元素组成一个字符串。
- Array.prototype.slice()
  - 抽取当前数组中的一段元素组合成一个新数组。
- Array.prototype.concat()
  - 返回一个由当前数组和其它若干个数组或者若干个非数组值组合而成的新数组。
- Array.prototype.includes()
  - 判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。
- Array.prototype.indexOf()
  - 返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。
- Array.prototype.lastIndexOf()
  - 返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。
- Array.prototype.toSource() 
  - 返回一个表示当前数组字面量的字符串。遮蔽了原型链上的 Object.prototype.toSource() 方法。
- Array.prototype.toString()
  - 返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。
- Array.prototype.toLocaleString()
  - 返回一个由所有数组元素组合而成的本地化后的字符串。遮蔽了原型链上的 Object.prototype.toLocaleString() 方法。

迭代方法

在下面的众多遍历方法中，有很多方法都需要指定一个回调函数作为参数。在每一个数组元素都分别执行完回调函数之前，数组的length属性会被缓存在某个地方，所以，如果你在回调函数中为当前数组添加了新的元素，那么那些新添加的元素是不会被遍历到的。此外，如果在回调函数中对当前数组进行了其它修改，比如改变某个元素的值或者删掉某个元素，那么随后的遍历操作可能会受到未预期的影响。总之，不要尝试在遍历过程中对原数组进行任何修改，虽然规范对这样的操作进行了详细的定义，但为了可读性和可维护性，请不要这样做。

- Array.prototype.forEach()
  - 为数组中的每个元素执行一次回调函数。
- Array.prototype.map()
  - 返回一个由回调函数的返回值组成的新数组。
- Array.prototype.reduce()
  - 从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。
- Array.prototype.filter()
  - 将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。
- Array.prototype.every()
  - 如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。
- Array.prototype.some()
  - 如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。

- Array.prototype.find()
  - 找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。
- Array.prototype.findIndex()
  - 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。
- Array.prototype.keys()
  - 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键。
- Array.prototype.entries()
  - 返回一个数组迭代器对象，该迭代器会包含所有数组元素的键值对。

## [字符串常用API](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

- String.prototype.split()
  - 通过分离字符串成字串，将字符串对象分割成字符串数组。
- String.prototype.slice(start, end)
  - 摘取一个字符串区域，返回一个新的字符串。
- String.prototype.substr(start, len)
  - 通过指定字符数返回在指定位置开始的字符串中的字符。
- String.prototype.substring()
  - 返回在字符串中指定两个下标之间的字符。
- String.prototype.trim()
  - 从字符串的开始和结尾去除空格
- String.prototype.concat()
  - 连接两个字符串文本，并返回一个新的字符串。
- String.prototype.match()
  - 使用正则表达式与字符串相比较。
- String.prototype.replace()
  - 被用来在正则表达式和字符串直接比较，然后用新的子串来替换被匹配的子串。
- String.prototype.search()
  - 对正则表达式和指定字符串进行匹配搜索，返回第一个出现的匹配项的下标。
- String.prototype.toString()
  - 返回用字符串表示的特定对象。重写 Object.prototype.toString 方法。

## Set、Map、WeakSet 和 WeakMap 的区别？

### [Set](http://es6.ruanyifeng.com/#docs/set-map#Set)

- 表示有没有，成员的值都是唯一的，没有重复的值
- 可以接受一个数组（或可迭代的数据结构）作为参数
- 注：两个对象总是不相等的
  
属性：

- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set实例的成员总数。

方法：

- add(value)：添加某个值，返回 Set 结构本身。
  - `s.add(1).add(2).add(2)`;
- delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- has(value)：返回一个布尔值，表示该值是否为Set的成员。
- clear()：清除所有成员，没有返回值。

遍历方法

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

### [WeakSet](http://es6.ruanyifeng.com/#docs/set-map#WeakSet)

WeakSet 结构与 Set 类似，也是不重复的值的集合。但与 Set 有几个区别：

- WeakSet 的成员**只能是对象**，而不能是其他类型的值
- WeakSet 中的对象都是弱引用
  - 如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存
  - 垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
- WeakSet 不可遍历
  - 由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的
- WeakSet 结构中没有clear方法。

### [Map](http://es6.ruanyifeng.com/#docs/set-map#Map)

类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，**各种类型的值（包括对象）都可以当作Map的键**。

遍历方法
Map 结构原生提供三个遍历器生成函数和一个遍历方法。

- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。
- forEach()：遍历 Map 的所有成员。

### [WeakMap](http://es6.ruanyifeng.com/#docs/set-map#WeakMap)

WeakMap的设计目的在于: 有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用，而一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放被引用对象占用的内存。

基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。

一个典型应用**场景**是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除
