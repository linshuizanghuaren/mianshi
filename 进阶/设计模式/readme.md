### [常见的设计模式](https://blog.csdn.net/song_mou_xia/article/details/80763833)

- 工厂模式

```js
function CreatePerson(name,age,sex) {
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.sex = sex;
    obj.sayName = function(){
        return this.name;
    }
    return obj;
}
var p1 = new CreatePerson("longen",'28','男');
var p2 = new CreatePerson("tugenhua",'27','女');
console.log(p1.name); // longen
console.log(p1.age);  // 28
console.log(p1.sex);  // 男
console.log(p1.sayName()); // longen

console.log(p2.name);  // tugenhua
console.log(p2.age);   // 27
console.log(p2.sex);   // 女
console.log(p2.sayName()); // tugenhua
```

- 单例模式

```js
// 单体模式
var Singleton = function(name){
    this.name = name;
};
Singleton.prototype.getName = function(){
    return this.name;
}
// 获取实例对象
var getInstance = (function() {
    var instance = null;
    return function(name) {
        if(!instance) {//相当于一个一次性阀门,只能实例化一次
            instance = new Singleton(name);
        }
        return instance;
    }
})();
// 测试单体模式的实例,所以a===b
var a = getInstance("aa");
var b = getInstance("bb");
```

- 沙箱模式

```js
let sandboxModel=(function(){
    function sayName(){};
    function sayAge(){};
    return{
        sayName:sayName,
        sayAge:sayAge
    }
})()
```

- 发布者订阅者模式

```js
//发布者与订阅模式
    var shoeObj = {}; // 定义发布者
    shoeObj.list = []; // 缓存列表 存放订阅者回调函数

    // 增加订阅者
    shoeObj.listen = function(fn) {
        shoeObj.list.push(fn); // 订阅消息添加到缓存列表
    }

    // 发布消息
    shoeObj.trigger = function() {
            for (var i = 0, fn; fn = this.list[i++];) {
                fn.apply(this, arguments);//第一个参数只是改变fn的this,
            }
        }
     // 小红订阅如下消息
    shoeObj.listen(function(color, size) {
        console.log("颜色是：" + color);
        console.log("尺码是：" + size);
    });

    // 小花订阅如下消息
    shoeObj.listen(function(color, size) {
        console.log("再次打印颜色是：" + color);
        console.log("再次打印尺码是：" + size);
    });
    shoeObj.trigger("红色", 40);
    shoeObj.trigger("黑色", 42);
```
