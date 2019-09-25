# webpack

## 描述

webpack是一个为现代js应用诞生的模块打包器.但其实webpack不仅仅是用来打包JS,css,图片,字体,甚至是你自己发明的东西你都可以用webpack来打包

## loader

loader用于对模块源码的转换，loader描述了webpack如何处理非javascript模块，并且在buld中引入这些依赖。loader可以将文件从不同的语言（如TypeScript）转换为JavaScript，或者将内联图像转换为data URL。比如说：CSS-Loader，Style-Loader等

loader是运行在NodeJS中，可以用options对象进行配置。plugin可以为loader带来更多特性。loader可以进行压缩，打包，语言翻译等等。

loader从模板路径解析，npm install node_modules。也可以自定义loader，命名XXX-loader。

语言类的处理器loader：CoffeeScript，TypeScript，ESNext（Bable）,Sass,Less,Stylus。任何开发技术栈都可以使用webpack。

## plugins

plugins目的在于解决loader无法实现的其他事，从打包优化和压缩，到重新定义环境变量，功能强大到可以用来处理各种各样的任务。webpack提供了很多开箱即用的插件：CommonChunkPlugin主要用于提取第三方库和公共模块，避免首屏加载的bundle文件，或者按需加载的bundle文件体积过大，导致加载时间过长，是一把优化的利器。而在多页面应用中，更是能够为每个页面间的应用程序共享代码创建bundle

## mode

可以在config文件里面配置，也可以在CLI参数中配置：webpack --mode=production（一般会选择在CLI，也就是npm scripts里面进行配置）。

在webpack4以下版本，webpack3.XX，通过plugins进行环境变量的配置。

## resolve

resolver是个库，帮助webpack找到bundle需要引入的模块代码，打包时，webpack使用enhanced-resolve来解析路径。 

## manifest

管理所有模块之间的交互。runtime将能够查询模块标识符，检索出背后对应的模块。

```js
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        app: path.join(_dirname,'../client/app.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(_dirname, 'xxx'),
        publicPath: '/public'
    },
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(_dirname, '../node_modules')
                ]
            }
        ]
    },
    // plugins: [
    //     new HTMLPlugin()
    // ]
    plugins: [
        new HTMLPlugin({
            template: path.join(_dirname, '../client/template.html')
        })
    ]
}
```

- 打包命令

```js
"build": "webpack --config build/webpack.config.js"
```

## bable

- 安装babel-loader插件以及babel-care核心代码

.babelrc 因为babel编译es6代码,不能编译jsx文件,所以需要配置

```js
{
    //代表支持的语法
    "presets": [
        ["es2015", {"loose":true}],
        "react"
    ]
    // 导致需要继续安装新的插件
    // babel-preset-es2015 bable-preset-饿死015-loose babel-preset-react
}
```

## 浏览器打开文件

- 安装html-webpack-plugin
- 生成一个html页面,并将webpack生成的文件注入到html中

### webpack.config.server.js

```js
const path = require('path')
module.exports = {
    // 决定运行在什么环境
    target: 'node',
    entry: {
        app: path.join(_dirname,'../client.server-entry.js')
    },
    output: {
        filename: 'server-entry.js',
        path: path.join(_dirname, 'xxx'),
        publicPath: '/public',
        // 模块化方案 umd/cmd/amd/commonJs
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(_dirname, '../node_modules')
                ]
            }
        ]
    }
}
```

- 打包命令

```js
"build:client": "webpack --config build/webpack.config.client.js"
"build:server": "webpack --config build/webpack.config.server.js"
"clear": "rimraf dist" // npm i rimfaf -D
"build": "npm run clear && npm run build:client && npm run build:server"
```
