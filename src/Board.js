import React, { useState } from 'react'
import Circle from './Circle'
import Block from './Block'
import './Board.css'
import { winningLines } from './winner'
import { Container } from 'react-bootstrap'

export default function Board() {
  const [circles, setCircles] = useState(Array(36).fill(null))
  const [blackIsNext, setblackIsNext] = useState(true)
  const [rotateNext, setRotateNext] = useState(false)
  const [selectedBlock, setSelectedBlock] = useState(null)

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
    setblackIsNext(!blackIsNext)
    setRotateNext(!rotateNext)
  }

  const handleBlockClick = blockNum => {
    console.log(blockNum)
    setSelectedBlock(blockNum)
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
        onClick={() => handleBlockClick(blockNum)}
        blockNum={blockNum}
        circles={circles}
        renderCircle={renderCircle}
        blockStatus={blockStatus} />
    )
  }

  const renderCircle = circleNum => {
    const winStatus = calculateWinner(circles) || rotateNext ? true : false
    return (
      <Circle
        onClick={() => handleTurn(circleNum)}
        index={circleNum}
        colour={renderColour(circleNum)}
        disabled={winStatus} />
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
        return circles[a];
      }
    }
    return null;
  }

  const winnerStatus = () => {
    const winner = calculateWinner(circles)
    if (winner) {
      return 'Winner: ' + winner;
    }
  }

  const renderRotateBox = () => {
    if (rotateNext && selectedBlock !== null) {
      return (
        <div className='rotate-box'>
        <button className='rotate-left' onClick={() => rotateBlock('anticlockwise')}>Rotate left</button>
        {renderSkipRotate()}
        <button className='rotate-right' onClick={() => rotateBlock('clockwise')}>Rotate right</button>
      </div>
      )
    }
  }

  const renderSkipRotate = () => {
    const blocks = [block1, block2, block3, block4]
    const anyBlocksEmpty = blocks.some(block => {
      return block.every(circle => circle === null)
    })
    if (anyBlocksEmpty){
    return (
      <button className='skip' onClick={() => setRotateNext(!rotateNext)}>Skip</button>
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

  console.log('selected block:' + selectedBlock)

  return (
    <div className="game">
      <Container className="board-container">
        <div className='board board-size'>
          {renderBlock(0, [0,1,2,3,4,5,6,7,8])}
          {renderBlock(1, [9,10,11,12,13,14,15,16,17])}
          {renderBlock(2, [18,19,20,21,22,23,24,25,26])}
          {renderBlock(3, [27,28,29,30,31,32,33,34,35])}
        </div>
        {renderRotateBox()}
        <div className="status">{winnerStatus()}</div>
      </Container>
    </div>
  )
}
