import React from 'react'
import './WinMessage.css'
import { Button } from 'react-bootstrap'

export default function WinMessage(props) {
  return (
    <div className="win-message">
      <div className="win-message-content">
        <h2>{props.winner + ' wins!'}</h2>
        <Button variant="primary" onClick={() => props.resetGame()} >New Game</Button>
      </div>
    </div>
  )
}
