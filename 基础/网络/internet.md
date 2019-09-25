
### HTTP 协议的特点

- 无连接
  - 限制每次连接只处理一个请求
- 无状态
  - 协议对于事务处理没有记忆能力。
- 简单快速
  - 客户向服务器请求服务时，只需传送请求方法和路径。
- 灵活
  - HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记。

### 请求报文
 - 请求行
   - 请求类型
   - 要访问的资源
   - HTTP协议版本号
 - 请求头
   - 用来说明服务器要使用的附加信息（一些键值对）
   - 例如：User-Agent、 Accept、Content-Type、Connection
 - 空行
   - 分割请求头与请求体
 - 请求体
   - 可以添加任意的其他数据


### 响应报文
 - 状态行
   - 状态码
   - 状态消息 
   - HTTP协议版本号
 - 消息报头
   - 说明客户端要使用的一些附加信息
   - 如：Content-Type、charset、响应的时间
 - 响应正文
   - 返回给客户端的文本信息 


### HTTP 方法
 - GET
   - 获取资源
 - POST
   - 传输资源
 - PUT
   - 更新资源
 - DELETE
   - 删除资源
 - HEAD
   - 获取报文首部


### Post 和 Get 的区别

 - GET在浏览器回退时是无害的，而POST会再次提交
 - Get请求能缓存，Post不能
 - Post相对Get相对安全一些，因为Get请求都包含在URL中，而且会被浏览器保存记录，Post不会。但是再抓包的情况下都是一样的。
 - Post 可以通过 request body来传输比 Get 更多的数据 
 - URL有长度限制，会影响 Get 请求，但是这个长度限制是浏览器规定的
 - Post 支持更多的编码类型且不对数据类型限制
 - POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok(返回数据)


先引入副作用和幂等的概念。
副作用指对服务器上的资源做改变，搜索是无副作用的，注册是副作用的。
幂等指发送 M 和 N 次请求（两者不相同且都大于 1），服务器上资源的状态一致，比如注册 10 个和 11 个帐号是不幂等的，对文章进行更改 10 次和 11 次是幂等的。
在规范的应用场景上说，Get 多用于无副作用，幂等的场景，例如搜索关键字。Post 多用于副作用，不幂等的场景，例如注册。

### 常见状态码

#### 1XX 指示信息

表示请求已接收，继续处理

#### 2XX 成功

- **200** OK
- 204 No content，表示请求成功，但响应报文不含实体的主体部分
- 205 Reset Content，表示请求成功，但响应报文不含实体的主体部分，但是与 204 响应不同在于要求请求方重置内容
- **206** Partial Content，进行范围请求

#### 3XX 重定向

- **301** 永久性重定向，表示资源已被分配了新的 URL
- **302** 临时性重定向，表示资源临时被分配了新的 URL
- 303 表示资源存在着另一个 URL，应使用 GET 方法获取资源
- **304** 未修改，重定位到浏览器。自从上次请求后，请求的网页未修改过。服务器返回此响应时，不会返回网页内容。如果网页自请求者上次请求后再也没有更改过，您应将服务器配置为返回此响应（称为 If-Modified-Since HTTP 标头）。服务器可以告诉 Googlebot 自从上次抓取后网页没有变更，进而节省带宽和开销。
- 307 临时重定向，和302含义类似，但是期望客户端保持请求方法不变向新的地址发出请求

#### 4XX 客户端错误

- 400 请求报文存在语法错误
- 401  表示发送的请求需要有通过 HTTP 认证的认证信息
- **403** forbidden，表示对请求资源的访问被服务器拒绝
- **404** 在服务器上没有找到请求的资源

#### 5XX 服务器错误

- **500** 表示服务器端在执行请求时发生了错误
- 501 表示服务器不支持当前请求所需要的某个功能
- **503** 表明服务器暂时处于超负载或正在停机维护，无法处理请求

### HTTP持久连接（HTTP1.1支持）

HTTP协议采用“请求-应答”模式，并且HTTP是基于TCP进行连接的。普通模式（非keep-alive）时，每个请求或应答都需要建立一个连接，完成之后立即断开。

当使用`Conection: keep-alive`模式（又称持久连接、连接重用）时，keep-alive使客户端道服务器端连接持续有效，即不关闭底层的TCP连接，当出现对服务器的后继请求时，keep-alive功能避免重新建立连接。

### HTTP管线化 （HTTP1.1支持

管线化后，请求和响应不再是依次交替的了。他可以支持一次性发送多个请求，并一次性接收多个响应。

- 只有get与head请求可以进行管线化，POST有限制
- 初次创建连接时不应该启动管线机制，因为服务器不一定支持该协议

### http和https的区别

http默认采用80作为通讯端口，对于传输采用不加密的方式，https默认采用443，对于传输的数据进行加密传输

### 三次握手

简单的说：
 - 第一次握手
   - SYN = 1， seq(client) = x
   - 客户端向服务端发送连接请求报文段。该报文段中包含自身的数据通讯初始序号。请求发送后，客户端便进入 SYN-SENT 状态。

 - 第二次握手
   - SYN = 1，ACK = 1，确认序号 = x+1, seq(server) = y
   - 服务端收到连接请求报文段后，如果同意连接，则会发送一个应答，该应答中也会包含自身的数据通讯初始序号，发送完成后便进入 SYN-RECEIVED 状态

 - 第三次握手
   - ACK = 1，确认序号 = y+1, seq(client) = x + 1
   - 客户端收到连接同意的应答后，还要向服务端发送一个确认报文。客户端发完这个报文段后便进入ESTABLISHED 状态，服务端收到这个应答后也进入 ESTABLISHED 状态，此时连接建立成功。

### 为什么不用两次握手？

主要是为了防止已经失效的连接请求报文突然又传送到了服务器，从而产生错误。

假设有这样一种场景, 客户端发送的第一个请求连接并且没有丢失，但是被滞留的时间太长。由于TCP的客户端迟迟没有收到确认报文，以为服务器没有收到，此时重新向服务器发送报文。 
而现在第一个请求到达服务端，这个请求已经报废了，但是又会建立连接。

如果采用的是三次握手，就算是那一次失效的报文传送过来了，服务端接受到了那条失效报文并且回复了确认报文，但是客户端不会再次发出确认。由于服务器收不到确认，就知道客户端并没有请求连接。

### 四次挥手

TCP 是全双工的，在断开连接时两端都需要发送 FIN 和 ACK。

 - 第一次挥手
   - 若客户端 A 认为数据发送完成，则它需要向服务端 B 发送连接释放请求。

 - 第二次挥手
   - B 收到连接释放请求后，会告诉应用层要释放 TCP 链接。然后会发送 ACK 包，并进入 **CLOSE_WAIT** 状态，表示 A 到 B 的连接已经释放，不接收 A 发的数据了。但是因为 **TCP 连接时双向的**，所以 B 仍旧可以发送数据给 A。

 - 第三次挥手
   - B 如果此时还有没发完的数据会继续发送，完毕后会向 A 发送连接释放请求，然后 B 便进入**LAST-ACK**状态。
   - PS：通过延迟确认的技术（通常有时间限制，否则对方会误认为需要重传），可以将第二次和第三次握手合并，延迟 ACK 包的发送。
  
 - 第四次挥手
   - A 收到释放请求后，向 B 发送确认应答，此时 A 进入 **TIME-WAIT** 状态。该状态会持续 2MSL（最大段生存期，指报文段在网络中生存的时间，超时会被抛弃） 时间，若该时间段内没有 B 的重发请求的话，就进入 **CLOSED** 状态。当 B 收到确认应答后，也便进入 CLOSED 状态。

### 为什么建立连接是三次握手，关闭连接确是四次挥手呢？

建立连接的时候， 服务器在LISTEN状态下，收到建立连接请求的SYN报文后，把ACK和SYN放在一个报文里发送给客户端。 

而关闭连接时，服务器收到对方的FIN报文时，仅仅表示对方不再发送数据了但是还能接收数据，而自己也未必全部数据都发送给对方了

### 基于TCP的应用层协议有哪些

- HTTP
- HTTPS
- SSH
- Telnet
- FTP
- SMTP

### UDP简单描述

UDP（User Datagram Protocol），又叫用户数据报协议。
UDP是一个无连接的、不可靠、基于数据报的传输协议。UDP只是报文（报文可以理解为一段段的数据）的搬运工，不会对报文进行任何拆分和拼装操作。

### 从输入url到页面加载完成的过程

- 判断是否需要跳转(301)
- 从浏览器中读取缓存
- DNS解析
- TCP连接
- HTTP请求发出
- 服务端处理请求，HTTP响应返回
- 浏览器拿到响应数据，解析响应内内容，把解析结果展示给用户

### cookie与session的区别

- cookie存在客户端，session存在于服务端。
- cookie在客户端中存放，容易伪造，不如session安全
- session会消耗大量服务器资源，cookie在每次HTTP请求中都会带上，影响网络性能
- 域的支持范围不一样，比方说a.com的Cookie在a.com下都能用，而www.a.com的Session在api.a.com下都不能用

### 创建一个简单的Ajax

- 创建 XMLHttpRequest 对象

```js
if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}
```

- 绑定onreadystatechange 事件

```js
httpRequest.onreadystatechange = function(){
    // Process the server response here.
};
```

- 向服务器发送请求

```js
httpRequest.open('GET', 'http://www.example.org/some.file', true);
httpRequest.send();
```

完整的例子

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

### httpRequest.readyState的值

- 0 (未初始化) or (请求还未初始化)
- 1 (正在加载) or (已建立服务器链接)
- 2 (加载成功) or (请求已接受)
- 3 (交互) or (正在处理请求)
- 4 (完成) or (请求已完成并且响应已准备好)

### Ajax与cookie

- ajax会自动带上同源的cookie，不会带上不同源的cookie
- 可以通过前端设置withCredentials为true， 后端设置Header的方式让ajax自动带上不同源的cookie，但是这个属性对同源请求没有任何影响。会被自动忽略。

### 实现fetch

### 跨域通信的方式

- JSONP
- CORS
- Hash
- postMessage
- WebSoket

### 同源策略

- 端口相同
- 域名相同
- 协议相同

### 跨域

- CORS请求

```js
'Access-Control-Allow-Headers': '允许Content-Type'
'Access-Control-Allow-Methods': '允许的请求方法'
'Access-Control-Max-Age': '预请求允许其他方法和类型传输的时间'
```

- jsonp跨域
  - srcipt标签、link标签、img标签、iframe标签

### web安全

- CSRF跨站请求伪造
- SQL注入
- XSS跨站脚本攻击
