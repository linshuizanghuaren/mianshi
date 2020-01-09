# set

set 是 ES6 中新增的类型，和数组类似，唯一不同在于该类型不会有重复的数据，一般常用来对数据进行去重操作。

## 声明

let set = new Set();即创建了一个空的 set

## 赋值

```js
let set = new Set(['张三','李四','王五']);
// 输出结果为:张三，李四，王五

let set = new Set(['张三','李四','王五','张三','李四']
// 输出结果仍然为:张三，李四，王五
```

## 属性

size 属性求 set 集合的大小(长度)
console.log(set.size)集合的大小为 3

## 方法

1、add 方法，表示新增一个元素到 set 中。
如:set.add('赵六')则输出结果为张三，李四，王五，赵六

2、delete 方法，表示删除一个元素，返回的结果为 true 或者 false。
如:set.delete('张三')
输出 console.log(set.delete('张三')) 结果为 true
再次输出 console.log(set) 结果为：李四，王五

3、has 方法，表示判断某个元素是否在 set 这个集合中。
如：set.has('李四')返回结果为 true

4、clear 方法表示清除集合中所有的元素。没有任何返回值。直接清除元素
如:set.clear()则将元素全部清除。
