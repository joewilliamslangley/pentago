import React from 'react'
import './Block.css'

export default function Block(props) {
  const handleClick = () => {
    if (props.blockStatus === 'block-selection' || props.blockStatus === 'block-inactive') {
      return props.onClick
    }
  }

  return (
    <div
      className={'block ' + props.blockStatus}
      onClick={handleClick()}>
      {props.circles.map(index => {
        return props.renderCircle(index)
      })}
    </div>
  )
}
