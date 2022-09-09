import React from 'react'
import './Circle.css'

export default function Circle(props) {
  return (
    <button
      className={props.colour}
      onClick={props.onClick}
      disabled={props.disabled} />
  )
}
