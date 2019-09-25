
```js
const express = require('express')
const ReactSSR= require('react-dom/server')
const serverEntry = require('../dist/server-entry').default
const fs = require('fs')
const template = fs.readFileSync(path.join(_dirname, '../dist/index.html), utf8')
app.use('/public', express.static(path.join(_dirname, '../dist')))
//浏览器的任何请求都返回服务端代码
app.get('*', function(req, res){
    const appString = ReactSSR.renderToString(serverEntry)
    template.replace('<app></app>', appString)
    res.send(appString)
})

//分配端口
app.listen(3333, function(){
    console.log('server is listening on 3333')
})

- 配置启动命令
"start" : 'node server/server.js'
```
