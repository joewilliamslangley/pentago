import React, { useState } from 'react'
import Circle from './Circle'
import Block from './Block'
import Board from './Board'
import WinMessage from './WinMessage'
import StartMessage from './StartMessage'
import { Button, Row, Col } from 'react-bootstrap'
import './Game.css'
import { winningLines } from './winner'

export default function Game() {
  const [gameStart, setGameStart] = useState(false)
  const [circles, setCircles] = useState(Array(36).fill(null))
  const [blackIsNext, setblackIsNext] = useState(true)
  const [rotateNext, setRotateNext] = useState(false)
  const [selectedBlock, setSelectedBlock] = useState(null)
  const [winStatus, setWinStatus] = useState(false)

  const block1 = circles.slice(0,9)
  const block2 = circles.slice(9,18)
  const block3 = circles.slice(18,27)
  const block4 = circles.slice(27,36)

  const handleTurn = circleNum => {
    const newCircles = circles.slice();
    if (newCircles[circleNum]) {
      return
    }
    newCircles[circleNum] = blackIsNext ? 'black' : 'white'
    setCircles(newCircles)
    calculateWinner(newCircles)
    setblackIsNext(!blackIsNext)
    setRotateNext(!rotateNext)
  }

  const renderBlock = (blockNum, circles) => {
    let blockStatus
    if (rotateNext && selectedBlock === null) {
      blockStatus = 'block-selection'
    } else if (rotateNext && selectedBlock !== null && selectedBlock !== blockNum) {
      blockStatus = 'block-inactive'
    }
    return (
      <Block
        onClick={() => setSelectedBlock(blockNum)}
        blockNum={blockNum}
        circles={circles}
        renderCircle={renderCircle}
        blockStatus={blockStatus} />
    )
  }

  const renderCircle = circleNum => {
    const disableStatus = winStatus || rotateNext ? true : false
    return (
      <Circle
        onClick={() => handleTurn(circleNum)}
        index={circleNum}
        colour={renderColour(circleNum)}
        disabled={disableStatus} />
    )
  }

  const renderColour = circleNum => {
    if (circles[circleNum] === 'black') {
      return "circle black"
    } else if (circles[circleNum] === 'white') {
      return "circle white"
    } else {
      return "circle"
    }
  }

  const calculateWinner = circles => {
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c, d, e] = winningLines[i];
      if (circles[a] && circles[a] === circles[b] && circles[a] === circles[c] && circles[a] === circles[d] && circles[a] === circles[e]) {
        setWinStatus(true);
      }
    }
    return null;
  }

  const renderRotateBox = () => {
    if (winStatus) {
      return
    } else if (rotateNext && selectedBlock !== null) {
      return (
      <div className='rotate-box'>
        <Row className="justify-content-md-center rotate-buttons-row">
          <Col sm md='auto' className='rotate-button-col'>
            <Button className='rotate-left' onClick={() => rotateBlock('anticlockwise')}>Rotate anticlockwise</Button>
          </Col>
          <Col sm md='auto' className='rotate-button-col'>
            <Button className='rotate-right' onClick={() => rotateBlock('clockwise')}>Rotate clockwise</Button>
          </Col>
          <Col sm md='auto' className='rotate-button-col'>
            {renderSkipRotate()}
          </Col>
        </Row>
      </div>
      )
    } else if (rotateNext) {
      return (
        renderSkipRotate()
      )
    }
  }

  const handleSkip = () => {
    setRotateNext(!rotateNext);
    setSelectedBlock(null)
  }

  const renderSkipRotate = () => {
    const blocks = [block1, block2, block3, block4]
    const anyBlocksEmpty = blocks.some(block => {
      return block.every(circle => circle === null)
    })
    if (anyBlocksEmpty && !winStatus){
    return (
      <Button variant="secondary" className='skip' onClick={() => handleSkip()}>Skip</Button>
    )
    }
  }

  const rotateBlock = (direction) => {
    const blocks = [block1, block2, block3, block4]
    const newBlock = blocks[selectedBlock].slice()
    const clockwiseRotation = [newBlock[6], newBlock[3], newBlock[0], newBlock[7], newBlock[4], newBlock[1], newBlock[8], newBlock[5], newBlock[2]]
    const anticlockwiseRotation = [newBlock[2], newBlock[5], newBlock[8], newBlock[1], newBlock[4], newBlock[7], newBlock[0], newBlock[3], newBlock[6]]
    const rotatedBlock = direction === 'clockwise' ? clockwiseRotation : anticlockwiseRotation
    blocks.splice(selectedBlock, 1, rotatedBlock)
    setCircles([...blocks[0], ...blocks[1], ...blocks[2], ...blocks[3]])
    setSelectedBlock(null)
    setRotateNext(!rotateNext)
  }

  const renderDialogue = () => {
    if (winStatus) {
      return
    } else if (rotateNext && selectedBlock === null) {
      return "Click a block to rotate"
    } else if (rotateNext && selectedBlock !== null) {
      return "Pick a rotation direction or choose a different block"
    } else {
      return `${blackIsNext ? 'Black' : 'White'}'s turn to move`
    }
  }

  const resetGame = () => {
    setCircles(Array(36).fill(null))
    setblackIsNext(true)
    setRotateNext(false)
    setSelectedBlock(null)
    setWinStatus(false)
  }

  return (
    <div className="game">
      {!gameStart ? <StartMessage startGame={setGameStart}/> : null}
      <Board renderBlock={renderBlock} />
      <div className='user-interaction'>
        <h3>{renderDialogue()}</h3>
        {renderRotateBox()}
      </div>
      {winStatus ? <WinMessage winner={blackIsNext ? 'White' : 'Black'} resetGame={resetGame} /> : null}
    </div>
  )
}
