import { it, describe, expect } from 'vitest'
import React from '../../core/React'
const { createElement } = React

describe('createElement', () => {
  it('should return vdom', () => {
    const vnode = createElement('div', null, 'hi')
    expect(vnode).toEqual({
      type: 'div',
      props: {
        children: [
          {
            type: 'TEXT_ELEMENT',
            props: {
              nodeValue: 'hi',
              children: []
            }
          }
        ]
      }
    })
  })
})