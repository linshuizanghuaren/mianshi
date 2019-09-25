### react

#### 写一个组件

```js
inport React from 'react'
export default calss App extends React.Component{
    render() {
        return {
            <div>hello world</div>
        }
    }
}
```

### react-dom

将react渲染到dom上

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'
ReactDOM.reader(<APP />, document.getElementById('root'))
```

### 服务端渲染

- 新建一个server-entry.js

```js
import Reactfrom'react'
import App from 'App.jsx'
export default <app />
```
