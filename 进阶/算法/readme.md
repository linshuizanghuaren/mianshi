# 算法

## 字符串反转

```js
function reverse(str){
    for(let i=0;i<str.length;i++){
        return str.split('').reverse().join('');
    }
}
```

## 产生随机数

```js
function random(n){
    let str='123asdasdasrwer';
    let obj='';
    var l=str.length;
    for(let i=0;i<n;i++){
       return obj+=str.charAt(Math.floor(Math.random()*l));
    }
}
```

## 统计字符串中字母出现次数多的

```js
function findMaxDuplicateChar(str) {
    if(str.length == 1) {
        return str;
    }
    let charObj = {};
    for(let i=0;i<str.length;i++) {
        if(!charObj[str.charAt(i)]) {
            charObj[str.charAt(i)] = 1;
        }else{
            charObj[str.charAt(i)] += 1;
        }
    }
    console.log(charObj)
    let maxChar = '', maxValue = 1;
    for(var k in charObj) {
        if(charObj[k] >= maxValue) {
            maxChar = k;
            maxValue = charObj[k];
        }
    }
    return maxChar;
}
var str = 'qwebbsqgwgasassbdbqqwe'
findMaxDuplicateChar(str)
```

## 写一个方法将数组换成前端更易解析的树状结构

```js
function getTree(data) {
    var newData = [],
        hash = {};
    for (var i = 0; i < data.length; i++) {
        if (!hash[data[i].province]) {
            hash[data[i].province] = {
                'province': data[i].province
            };
            hash[data[i].province]['city'] = [{
                'name': data[i].city,
                'code': data[i].code
            }]
            newData.push(hash[data[i].province]);
        } else if (hash[data[i].province].province == data[i].province) {
            hash[data[i].province]['city'].push({
                'name': data[i].city,
                'code': data[i].code
            })
        }
    }
    return newData;
}
var data = [{
    'province': '浙江',
    'city': '温州',
    'code': '10010'
}, {
    'province': '浙江',
    'city': '杭州',
    'code': '10011'
}, {
    'province': '安徽',
    'city': '合肥',
    'code': '10012'
}, {
    'province': '安徽',
    'city': '马鞍山',
    'code': '10013'
}, {
    'province': '浙江',
    'city': '宁波',
    'code': '10014'
}];
console.log(getTree(data));
```

## 冒泡排序

```js
 var example=[8,95,34,21,53,12];
 function sortarr(arr){
  for(i=0;i<arr.length-1;i++){
   for(j=0;j<arr.length-1-i;j++){
    if(arr[j]>arr[j+1]){
     var temp=arr[j];
     arr[j]=arr[j+1];
     arr[j+1]=temp;
    }
    console.log(arr)
   }
  }
  return arr;
 }
 sortarr(example);
// 冒泡排序 每次将最小元素推至最前
// 原始状态 8,95,34,21,53,12
// 第一次 8,34,95,21,53,12
// 第二次 8,34,21,95,53,12
// ...
```

## 插入排序

```js
// 插入排序 从下标1开始每增1项排序一次，越往后遍历次数越多
function sort1(array) {
  var len = array.length,
      i, j, tmp, result;
  
  // 设置数组副本
  result = array.slice(0);
  for(i=1; i < len; i++){
    tmp = result[i];
    j = i - 1;
    while(j>=0 && tmp < result[j]){
      result[j+1] = result[j];
      j--;
    }
    result[j+1] = tmp;
  }
  return result;
}
// 插入操作要进行n-1次
```

## 快速排序

```js
function sort6(array) {
  var tmp_array = array.slice(0), result,
  quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort(right));
  };
  result = quickSort(tmp_array);
  return result;
}
```
