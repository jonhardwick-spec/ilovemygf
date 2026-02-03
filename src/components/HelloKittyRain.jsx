import { useMemo } from 'react'

// Cute Hello Kitty Face SVG
const HelloKittyFace = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Face */}
    <ellipse cx="50" cy="55" rx="35" ry="30" fill={color} />
    {/* Left ear */}
    <ellipse cx="25" cy="30" rx="12" ry="15" fill={color} />
    {/* Right ear */}
    <ellipse cx="75" cy="30" rx="12" ry="15" fill={color} />
    {/* Left eye */}
    <ellipse cx="38" cy="50" rx="4" ry="5" fill="#1a0812" />
    {/* Right eye */}
    <ellipse cx="62" cy="50" rx="4" ry="5" fill="#1a0812" />
    {/* Nose */}
    <ellipse cx="50" cy="60" rx="4" ry="3" fill="#ffb6c1" />
    {/* Left whiskers */}
    <line x1="15" y1="55" x2="32" y2="58" stroke="#1a0812" strokeWidth="1.5" />
    <line x1="15" y1="62" x2="32" y2="62" stroke="#1a0812" strokeWidth="1.5" />
    <line x1="15" y1="69" x2="32" y2="66" stroke="#1a0812" strokeWidth="1.5" />
    {/* Right whiskers */}
    <line x1="85" y1="55" x2="68" y2="58" stroke="#1a0812" strokeWidth="1.5" />
    <line x1="85" y1="62" x2="68" y2="62" stroke="#1a0812" strokeWidth="1.5" />
    <line x1="85" y1="69" x2="68" y2="66" stroke="#1a0812" strokeWidth="1.5" />
    {/* Bow */}
    <ellipse cx="22" cy="22" rx="10" ry="7" fill="#ff1493" />
    <ellipse cx="22" cy="22" rx="5" ry="5" fill="#ff69b4" />
  </svg>
)

// Heart SVG
const Heart = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
)

// Star SVG
const Star = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)

// Bow SVG
const Bow = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 50 30" fill={color}>
    <ellipse cx="12" cy="15" rx="10" ry="12" />
    <ellipse cx="38" cy="15" rx="10" ry="12" />
    <ellipse cx="25" cy="15" rx="6" ry="6" fill="#ff1493" />
  </svg>
)

const components = [HelloKittyFace, Heart, Star, Bow]

function HelloKittyRain() {
  const items = useMemo(() => {
    const arr = []
    for (let i = 0; i < 30; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 8 + Math.random() * 6,
        size: 25 + Math.random() * 30,
        type: Math.floor(Math.random() * components.length),
        blur: 0.3 + Math.random() * 1.5,
        opacity: 0.4 + Math.random() * 0.4,
        color: ['#ff69b4', '#ffb6c1', '#ff1493', '#ffc0cb', '#fff0f5'][Math.floor(Math.random() * 5)]
      })
    }
    return arr
  }, [])

  return (
    <>
      <style>{`
        @keyframes kittyFall {
          0% {
            transform: translate3d(0, -80px, 0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          8% {
            opacity: var(--item-opacity);
          }
          50% {
            transform: translate3d(20px, 50vh, 0) rotate(15deg) scale(1);
          }
          92% {
            opacity: var(--item-opacity);
          }
          100% {
            transform: translate3d(-15px, 115vh, 0) rotate(-10deg) scale(0.9);
            opacity: 0;
          }
        }
        .kitty-rain-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
          pointer-events: none;
        }
        .kitty-item {
          position: absolute;
          top: -80px;
          will-change: transform, opacity;
          animation: kittyFall ease-in-out infinite;
        }
      `}</style>
      <div className="kitty-rain-container">
        {items.map(item => {
          const Component = components[item.type]
          return (
            <div
              key={item.id}
              className="kitty-item"
              style={{
                left: item.left + '%',
                animationDuration: item.duration + 's',
                animationDelay: item.delay + 's',
                filter: `blur(${item.blur}px)`,
                '--item-opacity': item.opacity
              }}
            >
              <Component color={item.color} size={item.size} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default HelloKittyRain
