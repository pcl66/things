// v1 原生dom写法
// const App = document.createElement('div')
// App.setAttribute('id', 'container')
// const textNode = document.createTextNode('')
// textNode.nodeValue = 'app'
// App.append(textNode)
// document.querySelector('#root').append(App)

// v2 vdom -> dom
const el = {
  type: 'div',
  props: {
    id: 'container',
    children: []
  }
}
const textEl = {
  type: 'TEXT_ELEMENT',
  props: {
    nodeValue: 'app',
    children: []
  }
}

// 静态创建
// const App = document.createElement(el.type)
// App.setAttribute('id', el.props.id)
// const textNode = document.createTextNode('')
// textNode.nodeValue = textEl.props.nodeValue
// App.append(textNode)
// document.querySelector('#root').append(App)

// 动态创建 vnode
import React from './React.js'
import ReactDOM from './ReactDOM.js'
const { createElement } = React
const App = createElement('div', {id: 'app'}, 'hi', 'mini-react')
ReactDOM.createRoot(document.querySelector('#root')).render(App)