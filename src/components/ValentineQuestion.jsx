import { useState, useRef, useEffect } from 'react'
import './ValentineQuestion.css'

function ValentineQuestion({ onYes }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [isNuhUh, setIsNuhUh] = useState(false)
  const [yesSize, setYesSize] = useState(1)
  const [bounceInterval, setBounceInterval] = useState(null)
  const yesRef = useRef(null)
  const containerRef = useRef(null)

  // Positions around the Yes button (like orbiting)
  const getPositionsAroundYes = () => {
    const yesBtn = yesRef.current
    if (!yesBtn) return [{ x: 150, y: 0 }]

    const yesWidth = yesBtn.offsetWidth * yesSize
    const yesHeight = yesBtn.offsetHeight * yesSize

    // Offset distance from Yes button center
    const offsetX = yesWidth / 2 + 80
    const offsetY = yesHeight / 2 + 50

    return [
      { x: offsetX + 20, y: 0 },           // right
      { x: -offsetX - 20, y: 0 },          // left
      { x: 0, y: -offsetY - 10 },          // top
      { x: 0, y: offsetY + 10 },           // bottom
      { x: offsetX, y: -offsetY * 0.7 },   // top-right
      { x: -offsetX, y: -offsetY * 0.7 },  // top-left
      { x: offsetX, y: offsetY * 0.7 },    // bottom-right
      { x: -offsetX, y: offsetY * 0.7 },   // bottom-left
    ]
  }

  const bounceToNewPosition = () => {
    const positions = getPositionsAroundYes()
    let newPos = positions[Math.floor(Math.random() * positions.length)]
    // Add small randomness
    newPos = {
      x: newPos.x + (Math.random() - 0.5) * 40,
      y: newPos.y + (Math.random() - 0.5) * 30
    }
    setNoPosition(newPos)
  }

  const handleNoMouseEnter = () => {
    if (isNuhUh) {
      // Already in nuh-uh mode, just bounce again
      bounceToNewPosition()
      return
    }

    setIsNuhUh(true)
    setYesSize(prev => Math.min(prev + 0.15, 2.5))
    bounceToNewPosition()

    // Start bouncing interval
    const interval = setInterval(() => {
      bounceToNewPosition()
    }, 400)
    setBounceInterval(interval)

    // Reset after 2 seconds
    setTimeout(() => {
      clearInterval(interval)
      setBounceInterval(null)
      setIsNuhUh(false)
      setNoPosition({ x: 0, y: 0 })
    }, 2000)
  }

  const handleNoTouchStart = (e) => {
    e.preventDefault()
    handleNoMouseEnter()
  }

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (bounceInterval) clearInterval(bounceInterval)
    }
  }, [bounceInterval])

  return (
    <div className="valentine-container glass-card">
      <div className="heart-icon">💖</div>
      <h1 className="valentine-title">
        Will you be my Valentine,
        <span className="name-highlight"> Samara</span>?
      </h1>

      <div className="buttons-wrapper" ref={containerRef}>
        <div className="buttons-bounding-box">
          <button
            ref={yesRef}
            className="yes-btn"
            onClick={onYes}
            style={{ transform: `scale(${yesSize})` }}
          >
            Yes! 💕
          </button>

          <button
            className={`no-btn ${isNuhUh ? 'nuh-uh-mode' : ''}`}
            onMouseEnter={handleNoMouseEnter}
            onTouchStart={handleNoTouchStart}
            style={{
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`
            }}
          >
            {isNuhUh ? 'Nuh uh! 🙅‍♀️' : 'No 😢'}
          </button>
        </div>
      </div>

      <p className="hint-text">
        (There's only one right answer here... 😉)
      </p>
    </div>
  )
}

export default ValentineQuestion
