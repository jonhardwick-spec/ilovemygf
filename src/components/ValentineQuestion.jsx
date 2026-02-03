import { useState, useRef, useEffect } from 'react'
import './ValentineQuestion.css'

function ValentineQuestion({ onYes }) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [nuhUhVisible, setNuhUhVisible] = useState(false)
  const [yesSize, setYesSize] = useState(1)
  const noButtonRef = useRef(null)
  const containerRef = useRef(null)

  const handleNoMouseEnter = () => {
    if (!containerRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const maxX = container.width - 120
    const maxY = 150

    // Random new position within container bounds
    const newX = Math.random() * maxX - maxX / 2
    const newY = Math.random() * maxY - maxY / 2

    setNoPosition({ x: newX, y: newY })
    setNuhUhVisible(true)
    setYesSize(prev => Math.min(prev + 0.15, 2.5))

    // Hide "Nuh uh" after a moment
    setTimeout(() => setNuhUhVisible(false), 800)
  }

  // Touch handling for mobile
  const handleNoTouchStart = (e) => {
    e.preventDefault()
    handleNoMouseEnter()
  }

  return (
    <div className="valentine-container glass-card" ref={containerRef}>
      <div className="heart-icon">💖</div>
      <h1 className="valentine-title">
        Will you be my Valentine,
        <span className="name-highlight"> Samara</span>?
      </h1>

      <div className="nuh-uh-bubble" style={{ opacity: nuhUhVisible ? 1 : 0 }}>
        Nuh uh! 🙅‍♀️
      </div>

      <div className="buttons-container">
        <button
          className="yes-btn"
          onClick={onYes}
          style={{ transform: `scale(${yesSize})` }}
        >
          Yes! 💕
        </button>

        <button
          ref={noButtonRef}
          className="no-btn"
          onMouseEnter={handleNoMouseEnter}
          onTouchStart={handleNoTouchStart}
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`
          }}
        >
          No 😢
        </button>
      </div>

      <p className="hint-text">
        (There's only one right answer here... 😉)
      </p>
    </div>
  )
}

export default ValentineQuestion
