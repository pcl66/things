function createTextNode(nodeValue) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue,
      children: []
    }
  }
}
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        if(typeof child === 'string') {
          return createTextNode(child)
        } else {
          return child
        }
      })
    }
  }
}

function render(el, container) {
  const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(el.type)

  // 处理props
  for(let key in el.props) {
    console.log(key)
    if(key !== 'children') {
      dom[key] = el.props[key]
    }
  }

  // 处理children
  const children = el.props.children
  children.forEach(child => {
    render(child, dom)
  })

  container.append(dom)
}

const React = {
  render,
  createElement
}

export default React