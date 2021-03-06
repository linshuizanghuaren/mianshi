### 刷笔试题

- 手写promise并使用promise封装一个ajax

### typeOf()和instanceof()的用法区别

- typeof只能判断类型
- instanceof 用于判断一个变量是否某个对象的实例

### [web开发中会话跟踪的方法有哪些](https://blog.csdn.net/qq_33745501/article/details/79439644)

Web服务器使用Http协议。Http是无状态协议。Http的web服务器不能保持与客户端的关联。会话(session)定义为在一段时间内，单一客户与web服务器之间的一系列的交互。在一个会话中，跟踪请求之间的数据成为会话跟踪

- 1.使用隐藏域进行会话跟踪
- 2.SSL会话{Secure Socket Layer
- 3.Cookies
- 4.URL重写
- 5.IP地址

### 观察者模式

讲解下Vue的数据双向绑定

### [函数柯里化](https://www.jianshu.com/p/8e32b9b5e813)

概念
为实现多参函数提供了一个递归降解的实现思路——把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数

### 深拷贝与浅拷贝

- 基本数据类型的变量和值都是存放在栈中，声明之后会分配一块内存区域，基本数据类型之间的赋值是直接把栈内存中存的值赋值给变量（传值）

- 引用类型的变量存在栈中，但值是存在堆中，实际上栈存放的是指向堆中的地址，也叫引用，引用类型直接的赋值实质是把引用赋值给一个变量（传址），所以其指向的堆内存中的值是一样的

- 浅拷贝是指只复制一层对象，当对象的属性是引用类型时，实质复制的是其引用，当引用指向的值改变时也会跟着变化

```js
var obj = { a:1, arr: [2,3] };
function shallowCopy(src) {
  var dst = {};
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
    }
  }
  return dst;
}
var shallowObj = shallowCopy(obj);
//当一个对象属性的引用值改变时将导致另一个也改变
shallowObj.arr[1] = 5;
obj.arr[1]   // = 5
```

使用`Object.assign`解决这个问题。

```js
let a = {
  age: 1
}
let b = Object.assign({}, a)
a.age = 2
console.log(b.age) // 1
```

通过展开运算符 `...` 来实现浅拷贝

```js
let a = {
  age: 1
}
let b = {...a};
a.age = 2;
console.log(b.age)  // 1
```

- 深拷贝是指复制对象的所有层级，实现方法

```js
// 通过递归实现
deepCopy(o) {
    if (o instanceof Array) {
      let n = [];
      for (let i = 0; i < o.length; ++i) {
        n[i] =deepCopy(o[i]);
      }
      return n;
    } else if (o instanceof Object) {
      let n = {}
      for (let i in o) {
        n[i] = deepCopy(o[i]);
      }
      return n;
    } else {
      return o;
    }
}

// 通过JSON解析实现
//把一个对象转成json字符串在转成json对象
JSON.parse(JSON.stringify(o))
```

### [异步编程](https://blog.csdn.net/qq_22944825/article/details/79253013)

- callback回调方法
- 事件发布/订阅
- promise
- generator
- async await 方法

### apply实现bind

- bind()也是用来实现上下文绑定。bind()和call与apply不同。bind是新创建一个函数，然后把它的上下文绑定到bind()括号中的参数上，然后将它返回

```js
var button =document.getElementById("button"),
   text = document.getElementById("text");
button.onclick = function() {
   alert(this.id); // 弹出text
}.bind(text);
```

- 用apply实现bind

```js
if (!function() {}.bind) {
    Function.prototype.bind = function(context) {
        var self = this,
        args = Array.prototype.slice.call(arguments);  
        return function() {
            return self.apply(context, args.slice(1));
        }
    };
}
```

### JS函数式编程中compose的实现

```js
function add2(x) {
    return x + 2;
}

function mult3(x) {
    return x * 3;
}

function mult2(x) {
    return x * 2;
}

const compose = (...func) => (...init) => {
    let result;
    switch (func.length) {
        case 0:
            result = func;
            break;
        case 1:
            result = func[0](...init);
            break;
        default:
            result = func.reduce((x, y) => {
                return typeof x === 'function' ? y(x(...init)) : y(x);
            });
            break;
    }
    console.log(result);
    return result;
}

var test = compose(add2, mult3, mult2)(1); // ( 1 + 2 ) * 3 * 2 = 18
var test = compose(add2, mult3)(2);  // ( 2 + 2 ) * 3 = 12
var test = compose(add2)(2); // 4
var test = compose(mult3)(2); // 6
var test = compose(mult3)(); // NaN
var test = compose()(2);  // []
```

### 写一个返回闭包的函数

- 闭包函数是指有权访问另一个函数作用域中的变量的函数
- 创建闭包函数最常见的方式是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量
- 闭包的特点
  - 函数嵌套函数
  - 函数内部可以引用外部的参数和变量
  - 参数和变量不会被垃圾回收机制回收
- 闭包的优点
  - 希望一个变量长期驻扎在内存中
  - 避免全局变量的污染
  - 私有变量存在
- 闭包的实现
  - 函数嵌套函数
  - 外层函数返回内层函数
  - 外面有一全局变量接受外层函数
- 返回闭包时牢记一点：返回函数不要引用任何循环变量，或者后续会发生变化的变量！

```js
function makefunc(x) {
    return function (){
        return x;
    }
}
alert(makefunc(0));
```

### 改变函数内部的this指针的指向

每个函数都包含两个非继承来的方法call()和apply()；

使用call()或者apply()，可以改变this的指向；

假设要改变fn函数内部的this的指向，指向obj，那么可以fn.call(obj);或者fn.apply(obj);

call和apply的区别：

call和apply的区别在于参数，他们两个的第一个参数都是一样的，表示调用该函数的对象；

apply的第二个参数是数组，是[arg1,arg2,arg3]这种形式，而call是arg1,arg2,arg3这样的形式。

另外还可以用bind函数：

var bar=fn.bind(obj);

那么fn中的this就指向obj对象了，bind函数返回新的函数，这个函数内的this指针指向obj对象。

### [取数组的最大值](https://www.cnblogs.com/zhouyangla/p/8482010.html)

- 排序
- 假设法
- 使用 Math 中的 max/min 方法
- 使用ES6的扩展运算符

### [JS延迟加载的几种方式](https://blog.csdn.net/meijory/article/details/76389762)

- defer 属性
- async 属性
- 动态创建DOM方式
- 使用jQuery的getScript方法
- 使用setTimeout延迟方法
- 让JS最后加载

### [如何判断img加载完成](https://www.cnblogs.com/snandy/p/3704938.html)

- load事件
- readystatechange事件
  - readyState为complete和loaded则表明图片已经加载完毕。测试IE6-IE10支持该事件，其它浏览器不支持
- img的complete属性

### 数组扁平化

数组扁平化是指将一个多维数组变为一维数组

```js
[1, [2, 3, [4, 5]]]  ------>    [1, 2, 3, 4, 5]
```

递归法：

```js
function flatten(arr) {
  let res = [];
  arr.map(item => {
    if(Array.isArray(item)) {
      res = res.concat(flatten(item))
    } else {
      res.push(item);
    }
  })
  return res;
}
```

```js
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
    return a.concat(b);
});
// flattened is [0, 1, 2, 3, 4, 5]
```

### 手写原生 ajax

简单GET请求

```js
function ajax(url, cb) {
  let xhr;
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      cb(xhr.responseText);
    }
  }
  xhr.open('GET', url, true);
  xhr.send();
}
```

### 用Array的reduce方法实现map方法

```js
//使用 reduce 实现数组 map 方法
const selfMap2 = function (fn, context){
    let arr = Array.prototype.slice.call(this)
    // 这种实现方法和循环的实现方法有异曲同工之妙，利用reduce contact起数组中每一项
    // 不过这种有个弊端，会跳过稀疏数组中为空的项
    return arr.reduce((pre, cur, index) => {
        return [...pre, fn.call(context, cur, index, this)]
    }, [])
}

Array.prototype.selfMap = selfMap2
var arr1 = [1, 2, 3]
arr1.length = 5

let arrMap = arr1.selfMap(function (x) {
    return x * 2
})
```

### 计数器

实现一个foo函数 可以这么使用:

```js
a = foo();b = foo();c = foo();
// a === 1;b === 2;c === 3;
foo.clear();d = foo(); //d === 1;
```

```js
function myIndex() {
    var index = 1;

    function foo(){
        return index++;
    }

    foo.clear = function() {
        index = 1;
    }
    return foo;
}

var foo = myIndex();
```
