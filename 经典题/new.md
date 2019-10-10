# new

## 如何实现一个new

```js
function _new(func, ...args) {
   let obj = Object.create(func.prototype)
   let res = func.apply(obj, args);
   return (res instanceof Object) ? res : obj;
}
```

## [构造函数，new时发生了什么](https://zhuanlan.zhihu.com/p/23987456)

```javascript
   var obj  = {};
   obj.__proto__ = Base.prototype;
   Base.call(obj);  
```

1. 创建一个新的对象 obj;
2. 将这个空对象的__proto__成员指向了Base函数对象prototype成员对象
3. Base函数对象的this指针替换成obj, 相当于执行了Base.call(obj);
4. 如果构造函数显示的返回一个对象，那么则这个实例为这个返回的对象。 否则返回这个新创建的对象

![](../../img/git-rebease.png)