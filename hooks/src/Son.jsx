import React from 'react'

export default function Son(props) {
  console.log("Son", props)
  return (
    <div>son
      {
        props.children("xxx")
      }
    </div>
  )
}
