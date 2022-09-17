import React from 'react'
import { Button } from 'react-bootstrap'
import './StartMessage.css'


export default function StartMessage(props) {
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='start-message'>
      <div className='start-message-content'>
        <h1>Pentago!</h1>
        <Button onClick={() => props.startGame(true)}>Start Game</Button>
        <Button onClick={() => openInNewTab('https://www.ultraboardgames.com/pentago/game-rules.php')}>Rules</Button>
      </div>
    </div>
  )
}
