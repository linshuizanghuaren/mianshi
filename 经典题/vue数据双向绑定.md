# 数据双向绑定

Observer 监听器：用来监听属性的变化通知订阅者
Watcher 订阅者：收到属性的变化，然后更新视图
Compile 解析器：解析指令，初始化模版，绑定订阅者

## 监听器Observer

监听器的作用就是去监听数据的每一个属性,使用 Object.defineProperty 方法，当我们监听到属性发生变化之后我们需要通知 Watcher 订阅者执行更新函数去更新视图，在这个过程中我们可能会有很多个订阅者 Watcher 所以我们要创建一个容器 Dep 去做一个统一的管理。

```js
function defineReactive(data, key, value) {
  //递归调用，监听所有属性
  observer(value);
  var dep = new Dep();
  Object.defineProperty(data, key, {
    get: function () {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return value;
    },
    set: function (newVal) {
      if (value !== newVal) {
        value = newVal;
        dep.notify(); //通知订阅器
      }
    }
  });
}

function observer(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}

function Dep() {
  this.subs = [];
}
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
}
Dep.prototype.notify = function () {
  console.log('属性变化通知 Watcher 执行更新视图函数');
  this.subs.forEach(sub => {
    sub.update();
  })
}
Dep.target = null;
```

## 订阅者Watcher

Watcher 主要是接受属性变化的通知，然后去执行更新函数去更新视图，所以我们做的主要是有两步：

- 把 Watcher 添加到 Dep 容器中，这里我们用到了 监听器的 get 函数
- 接收到通知，执行更新函数。

```js
function Watcher(vm, prop, callback) {
  this.vm = vm;
  this.prop = prop;
  this.callback = callback;
  this.value = this.get();
}
Watcher.prototype = {
  update: function () {
    const value = this.vm.$data[this.prop];
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.callback(value);
    }
  },
  get: function () {
    Dep.target = this; //储存订阅器
    const value = this.vm.$data[this.prop]; //因为属性被监听，这一步会执行监听器里的 get方法
    Dep.target = null;
    return value;
  }
}
```

## 测试

这一步我们把 Watcher 也给弄了出来，到这一步我们已经实现了一个简单的双向绑定了，我们可以尝试把两者结合起来看下效果。

```js
function Mvue(options, prop) {
    this.$options = options;
    this.$data = options.data;
    this.$prop = prop;
    this.$el = document.querySelector(options.el);
    this.init();
}
Mvue.prototype.init = function () {
    observer(this.$data);
    this.$el.textContent = this.$data[this.$prop];
    new Watcher(this, this.$prop, value => {
        this.$el.textContent = value;
    });
}
```

这里我们尝试利用一个实例来把数据与需要监听的属性传递进来，通过监听器监听数据，然后添加属性订阅，绑定更新函数。

```js
<div id="app">{{name}}</div>
const vm = new Mvue({
    el: "#app",
    data: {
        name: "我是摩登"
    }
}, "name");
```
