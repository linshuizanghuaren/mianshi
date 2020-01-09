# includes

## String.prototype.includes()

### 用法

str.includes(searchString[, position])

### 参数

searchString 要在此字符串中搜索的字符串。区分大小写。

### position

可选。从当前字符串的哪个索引位置开始搜寻子字符串；默认值为 0。

```js
var str = 'To be, or not to be, that is the question.'
console.log(str.includes('To be')) // true
console.log(str.includes('question')) // true
console.log(str.includes('nonexistent')) // false
console.log(str.includes('To be', 1)) // false  从第一个索引开始找
console.log(str.includes('TO BE')) // false
```

## 替代方法 1------str.indexOf()

```js
function fackIncludes(str, Field) {
  if (str.indexOf(Field) != -1) {
    return true
  }
  return false
}
```

## 替代方法 2------str.search()

```js
function fackIncludes(str, Field) {
  if (str.search(Field) != -1) {
    return true
  }
  return false
}
```

## 替代方法 3--------str.match()

```js
function fackIncludes(str, Field) {
  if (str.match(Field)) {
    return true
  }
  return false
}
```
