import { useEffect, useState } from 'react'
import './Celebration.css'

function Celebration() {
  const [confettiPieces, setConfettiPieces] = useState([])

  useEffect(() => {
    // Generate confetti
    const pieces = []
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 4,
        color: ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ff85a2', '#fff0f5'][Math.floor(Math.random() * 6)],
        size: 8 + Math.random() * 12,
        type: Math.random() > 0.5 ? 'heart' : 'circle'
      })
    }
    setConfettiPieces(pieces)
  }, [])

  return (
    <div className="celebration-container">
      {/* Confetti Layer */}
      <div className="confetti-layer">
        {confettiPieces.map(piece => (
          <div
            key={piece.id}
            className={`confetti-piece ${piece.type}`}
            style={{
              left: `${piece.left}%`,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              backgroundColor: piece.type === 'circle' ? piece.color : 'transparent',
              width: piece.size,
              height: piece.size,
              '--heart-color': piece.color
            }}
          >
            {piece.type === 'heart' && '💕'}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="celebration-content glass-card">
        <div className="yippee-text">YIPPPEEEE!!!</div>

        <div className="celebration-hearts">
          💖💕💗💖💕💗💖
        </div>

        <h1 className="celebration-title">
          I knew you were the one!
        </h1>

        <p className="celebration-subtitle">
          You passed the test! You really do know me! 🥹
        </p>

        <div className="love-message">
          <p>Samara, you are my everything.</p>
          <p>My best friend, my soulmate, my forever.</p>
          <p className="anniversary-reminder">
            Since July 19th, every day with you has been a blessing 💍
          </p>
        </div>

        <div className="floating-hearts">
          <span className="float-heart" style={{ animationDelay: '0s' }}>💖</span>
          <span className="float-heart" style={{ animationDelay: '0.5s' }}>💕</span>
          <span className="float-heart" style={{ animationDelay: '1s' }}>💗</span>
          <span className="float-heart" style={{ animationDelay: '1.5s' }}>💖</span>
          <span className="float-heart" style={{ animationDelay: '2s' }}>💕</span>
        </div>

        <div className="signature">
          <p>With all my love,</p>
          <p className="signature-name">Your Valentine 💘</p>
        </div>
      </div>
    </div>
  )
}

export default Celebration
