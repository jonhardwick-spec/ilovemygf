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
          You paid attention, I love you gorgeous :)
        </p>

        <div className="love-message">
          <p className="love-intro">My baby girl, my whole world, I love you to the end of it :)</p>
          <p>I can't wait till we can move in together! Until then lets have as much fun as possible :)!</p>
          <p>You've been working so hard over the last few months you're such a big girl. I know its been rough baby but we're almost out of it.</p>
          <p className="love-highlight">You mean the ends of the earth to me and I can't even brush my teeth when you're gone let alone feel the need to exist.</p>
          <p>You make me feel complete, I hope I do the same :)</p>
        </div>

        <div className="floating-hearts">
          <span className="float-heart" style={{ animationDelay: '0s' }}>💖</span>
          <span className="float-heart" style={{ animationDelay: '0.5s' }}>💕</span>
          <span className="float-heart" style={{ animationDelay: '1s' }}>💗</span>
          <span className="float-heart" style={{ animationDelay: '1.5s' }}>💖</span>
          <span className="float-heart" style={{ animationDelay: '2s' }}>💕</span>
        </div>

        <div className="signature">
          <p>Forever yours,</p>
          <p className="signature-name">Your Valentine 💘</p>
        </div>

        <div className="youtube-embed">
          <p className="song-intro">Our song 💕</p>
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/onRk0sjSgFU?autoplay=1&loop=1&playlist=onRk0sjSgFU"
            title="Everything In Its Right Place"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default Celebration
