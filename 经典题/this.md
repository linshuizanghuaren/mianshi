# 手动实现call.,apply,bind

## 先分析3个方法的作用

- 改变this的指向
- 传入参数
- call/apply返回函数结果,bind返回新函数

## 实现call

### 改变this指向

- 对象上的方法,在调用时,this是指向对象的

```js
let o = {
    fn:function(){
        console.log(this);
    }
}
o.fn() //  Object {fn: function}  
```

- 知道了这点,我们就可以实现改变this指向了

```js
// 函数原型上添加 myCall方法 来模拟call
Function.prototype.myCall = function(obj){
    //我们要让传入的obj成为, 函数调用时的this值.
    obj._fn_ = this;  //在obj上添加_fn_属性，值是this(要调用此方法的那个函数对象)。
    obj._fn_();       //在obj上调用函数,那函数的this值就是obj.
    delete obj._fn_; // 再删除obj的_fn_属性,去除影响.
    //_fn_ 只是个属性名 你可以随意起名，但是要注意可能会覆盖obj上本来就有的属性
}
```

### 传入参数

```js

// 只需要在原来的基础上 用下拓展运算符 剩余运算符即可
Function.prototype.myCall = function(obj,...arg){
    obj._fn_ = this;
    obj._fn_(...arg);
    delete obj._fn_;
}
//测试
let test = {
    name:'test'
}
let o = {
    name:'o',
    fn:function(){
        console.log(this.name, ...arguments);  //这里把参数显示一下
    }
}
o.fn(1,2,3) // "o" 1 2 3
o.fn.call(test,1,2,3) // "test" 1 2 3
o.fn.myCall(test,1,2,3) // "test" 1 2 3
// 没问题
```

### 返回函数值

- 很简单,变量保存一下

```js
Function.prototype.myCall = function(obj,...arg){
    let val ;
    obj._fn_ = this;
    val = obj._fn_(...arg);  //不能直接return obj._fn_(...arg) 这样就不delete属性了
    delete obj._fn_;
    return val;
}
Function.prototype.myCall = function(obj){
    let arg = [];
    let val ;
    for(let i = 1 ; i<arguments.length ; i++){ // 从1开始
        arg.push( 'arguments[' + i + ']' ) ;
    }
    obj._fn_ = this;
    val = eval( 'obj._fn_(' + arg + ')' ) // 字符串拼接，JS会调用arg数组的toString()方法，这样就传入了所有参数
    delete obj._fn_;
    return val;
}
```

### 传参检验

- 传入的obj如果是null, undefined 应该改为window。如果是string，number，boolean应该转换为对象

```js
if(obj === null || obj === undefined){
    obj = window;
} else {
    obj = Object(obj);
}
```

## 实现apply

### 利用已经写好的myCall来实现

```js
// ES6
Function.prototype.myApply = function(obj,arr){
    let args = [];
    for(let i = 0 ; i<arr.length; i++){
        args.push( arr[i] );
    }
    // 其实直接 ...arr 传参也可以 但是效果就和aplly有微小差别了
    return this.myCall(obj, ...args);
}
// ES3
Function.prototype.myApply = function(obj,arr){
    let args = [];
    for(let i = 0 ; i<arr.length; i++){
        args.push( 'arr[' + i + ']' );  // 这里也是push 字符串
    }
    return eval( 'this.myCall(obj,' + args + ')' );
}
```

### 不用myCall

```js
Function.prototype.myApply = function(obj,arr){
    let args = [];
    let val ;
    for(let i = 0 ; i<arr.length ; i++){
        args.push( 'arr[' + i + ']' ) ;
    }
    obj._fn_ = this;
    val = eval( 'obj._fn_(' + args + ')' )
    delete obj._fn_;
    return val
}
```

### 测试

```js
Array.apply({},{length:3});
// 返回 [undefined, undefined, undefined]
Array.myApply({},{length:3});
// 返回 [undefined, undefined, undefined]
```

## 实现bind

### ES6 + 写好的myApple

```js
Function.prototype.myBind = function(obj,...arg1){   //arg1收集剩余参数
    return (...arg2) => {   //返回箭头函数, this绑定调用这个方法(myFind)的函数对象
        return this.myApply( obj, arg1.concat(arg2) );   // 将参数合并
    }
}
```

### ES6

```js
// 其实没什么说的
Function.prototype.myBind = function(obj,...arg1){
    return (...arg2) => {
        let args = arg1.concat(arg2);
        let val ;
        obj._fn_ = this;
        val = obj._fn_( ...args );
        delete obj._fn_;
        return val
    }
}
```

### 不用ES6,不用myApple

```js
Function.prototype.myBind = function(obj){
    let _this = this;
    let argArr = [];
    let arg1 = [];
    for(let i = 1 ; i<arguments.length ; i++){ // 从1开始
        arg1.push( arguments[i] ); // 这里用arg1数组收集下参数
        // 获取arguments是从1开始, 但arg1要从 0(i-1)开始
        // 若是用Array.prototype.slice.call(argument)就方便多了
        argArr.push( 'arg1[' + (i - 1)  + ']' ) ; // 如果用arguments在返回的函数里运行 会获取不到这个函数里的参数了
    }
    return function(){
        let val ;
        for(let i = 0 ; i<arguments.length ; i++){ // 从0开始
            argArr.push( 'arguments[' + i + ']' ) ;
        }
        obj._fn_ = _this;
        val = eval( 'obj._fn_(' + argArr + ')' ) ;
        delete obj._fn_;
        return val
    };
}
```

### 测试

```js
let test = {
    name:'test'
}
let o = {
    name:'o',
    fn:function(){
        console.log(this.name, ...arguments);  //这里把参数显示一下
    }
}
//myBind
b = o.fn.myBind(test,1,2)
b() // "test" 1 2
b(3,4) // "test" 1 2 3 4
// bind
b = o.fn.bind(test,1,2)
b() // "test" 1 2
b(3,4) // "test" 1 2 3 4
```

## 模拟call

```js
Function.prototype.myCall = function(obj){
    if(obj === null || obj === undefined){
        obj = window;
    } else {
        obj = Object(obj);
    }
    let arg = [];
    let val ;
    for(let i = 1 ; i<arguments.length ; i++){
        arg.push( 'arguments[' + i + ']' ) ;
    }
    obj._fn_ = this;
    val = eval( 'obj._fn_(' + arg + ')' )
    delete obj._fn_;
    return val
}
```

## 模拟apply

```js
Function.prototype.myApply = function(obj,arr){
    if(obj === null || obj === undefined){
        obj = window;
    } else {
        obj = Object(obj);
    }
    let args = [];
    let val ;
    for(let i = 0 ; i<arr.length ; i++){
        args.push( 'arr[' + i + ']' ) ;
    }
    obj._fn_ = this;
    val = eval( 'obj._fn_(' + args + ')' )
    delete obj._fn_;
    return val
}
```

## 模拟bind

```js
Function.prototype.myFind = function(obj){
    if(obj === null || obj === undefined){
        obj = window;
    } else {
        obj = Object(obj);
    }
    let _this = this;
    let argArr = [];
    let arg1 = [];
    for(let i = 1 ; i<arguments.length ; i++){  
        arg1.push( arguments[i] );
        argArr.push( 'arg1[' + (i - 1)  + ']' ) ;
    }
    return function(){
        let val ;
        for(let i = 0 ; i<arguments.length ; i++){
            argArr.push( 'arguments[' + i + ']' ) ;
        }
        obj._fn_ = _this;
        console.log(argArr);
        val = eval( 'obj._fn_(' + argArr + ')' ) ;
        delete obj._fn_;
        return val
    };
}
```
