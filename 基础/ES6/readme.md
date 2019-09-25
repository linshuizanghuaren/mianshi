
### ES5 / ES6的继承除了写法之外还有什么区别

- class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。
- class 声明内部会启用严格模式。
- class 的所有方法（包括静态方法和实例方法）都是不可枚举的。
- class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。
- 必须使用 new 调用 class。
- class 内部无法重写类名。

### var,let,const的区别

- var声明的变量会挂载在window上，而let和const声明的变量不会
- var声明变量存在变量提升，let和const不存在变量提升
- let和const声明形成块作用域
- 同一作用域下let和const不能声明同名变量，而var可以
- const一旦声明必须赋值,不能修改,如果声明的是复合类型数据,可修改属性

### 反引号标识

- ES6 模板字符串(Template String)是增强版的字符串，用反引号(`)标识，它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

### proxy

- Proxy用于修改某些操作的默认行为，也可以理解为在目标对象之前架设一层拦截，外部所有的访问都必须先通过这层拦截，因此提供了一种机制，可以对外部的访问进行过滤和修改。这个词的原理为代理，在这里可以表示由它来“代理”某些操作，译为“代理器”

### 箭头函数与普通函数的区别

- 箭头函数是匿名函数，不能作为构造函数，不能使用new
- 箭头函数不绑定arguments，取而代之用rest参数...解决
- 箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值
- 箭头函数通过 call()  或   apply() 方法调用一个函数时，只传入了一个参数，对 this 并没有影响。
- 箭头函数没有原型属性
- 箭头函数不能当做Generator函数,不能使用yield关键字

总结
1:箭头函数的 this 永远指向其上下文的  this ，任何方法都改变不了其指向，如 call() ,  bind() ,  apply()
2:普通函数的this指向调用它的那个对象

- promise
- async / await
- generator生成器
- 生成器原理
- ES Module
- commonJs,AMD,CMD,UMD
- import和export
- forEach()/map()/filter()/reduce()/some()/every()/all()
- 使用解构实现两个变量值的交换

### Promise

Promise本身是同步的立即执行函数， 当在 executor 中执行 resolve 或者 reject 的时候, 此时是异步操作， 会先执行 then/catch 等，当主栈完成后，才会去调用 resolve/reject 中存放的方法执行，打印 p 的时候，是打印的返回结果，一个 Promise 实例。

### async await

Async/Await就是一个自执行的generate函数。利用generate函数的特性把异步的代码写成“同步”的形式。

async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。

### [手写promise](https://blog.csdn.net/weixin_33881753/article/details/91448116)
