# [process](http://nodejs.cn/api/process.htm)

### process.cwd()

cwd()方法可以获得当前执行的路径。和linux下的cwd一样

### process.argv

`process.argv` 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数。

- 数组第一个元素为：node所安装的路径
- 数组第二个元素为：当前执行文件的路径
- 剩余元素为执行node命令时传入的参数

### process.argv0

保存了process.argv数组的第一个值的*引用*，不常用

### process.execArgv

process.execArgv 属性返回当Node.js进程被启动时，Node.js特定的命令行选项（位于node后，文件名之前）。 这些选项在process.argv属性返回的数组中不会出现。

### process.execPath

返回启动 Node.js 进程的可执行文件的绝对路径名。基本就是 process.argv 的第一个参数

### process.env
process.env 属性返回包含用户环境的对象。

#### process.env.PATH
