
### vue获取数据在那个周期函数

看情况, 一般 created/beforeMount/mounted 皆可.
比如如果你要操作 DOM , 那肯定 mounted 时候才能操作

### v-show和v-if指令的共同点和不同点

- v-if是真的,v-show是假的

### v-if和v-for的优先级

- v-for

### v-el的作用是什么

被废弃,替代的是$refs获取元素

### 路由导航钩子

全局钩子 router.beforeEach(to,from,next) 作用跳转前进行判断拦截

beforeEach
beforeResolve
afterEach

第二种：组件内的钩子

beforeRouteEnter
beforeRouteUpdate (2.2 新增)
beforeRouteLeave

第三种：单独路由独享组件

beforeEnter

### 如何设计一个router

新一代router离不开hash或者history
hash router
hash router 有一个明显的标志是url 中带有#， 我们可以通过监听url中的hash来进行路由跳转

```js
class Routers {
   constructor () {
       this.routes = {}; // 存放路由path及callback
       this.currentUrl = '';
       this.refresh = this.refresh.bind(this);
       // 监听路由change调用相对应的路由回调
       window.addEventListener('load', this.refresh, false);
       window.addEventListener('hashchange', this.refresh, false);
   }
   route(path, callback){
       this.routes[path] = callback;
   }
   push() {
       this.currentUrl = location.hash.slice(1) || '/';
       this.routes[this.currentUrl] && this.routes[this.currentUrl]()
   }
}
// 简版的hash router 已经实现了， 我们可以这样使用
window.VueRouter = new Routers();
VueRouter.route('/', ()=> console.log('page1'))
VueRouter.route('/detail', ()=> console.log('page2'))
```

history router
history 为 HTML5 Api,提供了丰富的router 相关属性， 比如history.back() 就能轻松的做到页面回退 , 我们使用history 能轻易的实现一个简版的router
先了解一个几个相关的api
history.pushState 浏览器历史纪录添加记录
history.replaceState 修改浏览器历史纪录中当前纪录
history.popState 当history 发生变化时触发

```js
class Routers {
   contructor () {
       this.routes = {};
       this.listerPopState()
   }
   init(path) {
       history.replaceState({path: path}, null, path);
       this.routes[path] && this.routes[path]();
   }
   route(path, callback){
       this.routes[path] = callback;
   }
   push(path) {
       history.pushState({path: path}, null, path);
       this.routes[path] && this.routes[path]();
   }
   listerPopState () {
       window.addEventListener('popstate' , e => {
           const path = e.state && e.state.path;
           this.routers[path] && this.routers[path]()
       })
   }
}
简版的history router 已经实现了， 我们可以这样使用
window.VueRouter = new Routers();
VueRouter.route('/', ()=> console.log('page1'))
VueRouter.route('/detail', ()=> console.log('page2'))
// 跳转
VueRouter.push('/detail')  // page2
```

### router-link事件无效解决办法

在router-link上使用@click无效是因为router-link的作用是单纯的路由跳转会影响阻止点击事件，使用@click.native就可以了

### params和query的区别

params：/router1/:id ，/router1/123，/router1/789 ,这里的id叫做params

query：/router1?id=123 ,/router1?id=456 ,这里的id叫做query

### vue的template编译的理解

简而言之，就是先通过compile转化成AST树，再经过generate得到的render函数返回VNode(Vue的虚拟DOM节点)

详情步骤：

首先，通过compile编译器把template编译成AST语法树(abstract syntax tree 即源代码的抽象语法结构的树状表现形式)，compile是createCompiler的返回值，createCompiler是用以创建编译器的。另外compile还负责合并option；

然后，AST会经过generate(将AST语法树转化成render function字符串的过程)得到render函数，render的返回值是VNode，VNode是Vue的虚拟DOM节点，里面有（标签名、子节点、文本等等）；

总结: compile编译器把template编译成AST语法树 -> AST会经过generate得到render函数从而得到虚拟dom

### hash路由与history路由之间的区别

- hash ——即地址栏URL中的#符号
- history ——利用了HTML5 History Interface 中新增的pushState() 和replaceState() 方法
- history模式，会出现404 的情况，需要后台配置

### sass和less有什么特性

- sass
  - 1、可以用变量，例如（$变量名称=值）；
  - 2、可以用混合器，例如（）
  - 3、可以嵌套

### vue页面闪烁问题

在使用vue时会出现加载渲染页面时闪烁，一般有以下两个情况：
1.使用了{{}},解决方案使用v-bind
2.使用v-if，出现原先要隐藏的元素先出现然后在隐藏从而造成了闪烁的问题。

``` css
[v-cloak] {
    display:none;
}
```

在v-if中加上v-cloak即可解决.

### vue中sync的用法

- 实现父子组件数据的双向绑定

### key的使用

- key的作用主要是为了高效的更新虚拟DOM

### assets和static的区别

相同点：资源在html中使用，都是可以的。

不同点：使用assets下面的资源，在js中使用的话，路径要经过webpack中file-loader编译，路径不能直接写。

assets中的文件会经过webpack打包，重新编译，推荐该方式。而static中的文件，不会经过编译。项目在经过打包后，会生成dist文件夹，static中的文件只是复制一遍而已。简单来说，static中建议放一些外部第三方，自己的放到assets，别人的放到static中。

### 跨组件双向数据绑定

- watch监听数据变化不断的派发事件

### vue禁止弹窗后的屏幕滚动

- event.stopPropagation()

### vue更新数组时触发视图更新的方法

- Vue.set
- Vue.delete
- 用Object.assign或lodash.assign可以为对象添加响应式属性，可以触发视图更新
