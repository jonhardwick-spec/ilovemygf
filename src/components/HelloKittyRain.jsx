import { useMemo } from 'react'

// Regular Hello Kitty - not kissing
const HelloKitty = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    {/* Left ear - pointed triangle */}
    <path d="M30 85 L55 15 L80 85 Z" fill="#ffffff" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
    {/* Right ear - pointed triangle */}
    <path d="M120 85 L145 15 L170 85 Z" fill="#ffffff" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>

    {/* Main face */}
    <ellipse cx="100" cy="115" rx="75" ry="65" fill="#ffffff" stroke="#000" strokeWidth="2"/>

    {/* Pink bow on left ear */}
    <ellipse cx="35" cy="45" rx="20" ry="14" fill="#ff1493"/>
    <ellipse cx="75" cy="45" rx="20" ry="14" fill="#ff1493"/>
    <circle cx="55" cy="50" r="12" fill="#ff69b4"/>

    {/* Left eye */}
    <ellipse cx="70" cy="105" rx="8" ry="12" fill="#000000"/>
    {/* Right eye */}
    <ellipse cx="130" cy="105" rx="8" ry="12" fill="#000000"/>

    {/* Nose */}
    <ellipse cx="100" cy="125" rx="7" ry="5" fill="#ffd700"/>

    {/* Left whiskers */}
    <line x1="15" y1="100" x2="55" y2="110" stroke="#000" strokeWidth="2"/>
    <line x1="15" y1="115" x2="55" y2="120" stroke="#000" strokeWidth="2"/>
    <line x1="15" y1="130" x2="55" y2="130" stroke="#000" strokeWidth="2"/>

    {/* Right whiskers */}
    <line x1="185" y1="100" x2="145" y2="110" stroke="#000" strokeWidth="2"/>
    <line x1="185" y1="115" x2="145" y2="120" stroke="#000" strokeWidth="2"/>
    <line x1="185" y1="130" x2="145" y2="130" stroke="#000" strokeWidth="2"/>
  </svg>
)

// Hello Kitty blowing a kiss - with animated heart
const HelloKittyKiss = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 220 200">
    {/* Left ear - pointed triangle */}
    <path d="M30 85 L55 15 L80 85 Z" fill="#ffffff" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
    {/* Right ear - pointed triangle */}
    <path d="M120 85 L145 15 L170 85 Z" fill="#ffffff" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>

    {/* Main face */}
    <ellipse cx="100" cy="115" rx="75" ry="65" fill="#ffffff" stroke="#000" strokeWidth="2"/>

    {/* Pink bow on left ear */}
    <ellipse cx="35" cy="45" rx="20" ry="14" fill="#ff1493"/>
    <ellipse cx="75" cy="45" rx="20" ry="14" fill="#ff1493"/>
    <circle cx="55" cy="50" r="12" fill="#ff69b4"/>

    {/* Left eye */}
    <ellipse cx="70" cy="105" rx="8" ry="12" fill="#000000"/>
    {/* Right eye - winking */}
    <path d="M 122 105 Q 130 95 138 105" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round"/>

    {/* Nose */}
    <ellipse cx="100" cy="125" rx="7" ry="5" fill="#ffd700"/>

    {/* Kissy mouth - small oval */}
    <ellipse cx="100" cy="145" rx="6" ry="4" fill="#ff69b4" stroke="#ff1493" strokeWidth="1"/>

    {/* Left whiskers */}
    <line x1="15" y1="100" x2="55" y2="110" stroke="#000" strokeWidth="2"/>
    <line x1="15" y1="115" x2="55" y2="120" stroke="#000" strokeWidth="2"/>
    <line x1="15" y1="130" x2="55" y2="130" stroke="#000" strokeWidth="2"/>

    {/* Right whiskers */}
    <line x1="185" y1="100" x2="145" y2="110" stroke="#000" strokeWidth="2"/>
    <line x1="185" y1="115" x2="145" y2="120" stroke="#000" strokeWidth="2"/>
    <line x1="185" y1="130" x2="145" y2="130" stroke="#000" strokeWidth="2"/>

    {/* Floating kiss heart - animated */}
    <g className="kiss-heart">
      <path
        d="M 180 120 l-3-3 C 173 113 170 111 167 111 c-2 0-4 2-4 4 c0 3 2 5 7 9 l 3 3 l 3-3 c 5-4 7-6 7-9 c0-2-2-4-4-4 c-3 0-5 2-9 6 z"
        fill="#ff69b4"
      />
    </g>
  </svg>
)

// Simple pink heart
const Heart = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 32 32">
    <path
      d="M16 28l-1.8-1.6C6.4 19.5 2 15.5 2 10.5 2 6.4 5.4 3 9.5 3c2.3 0 4.5 1.1 6 2.7C17 4.1 19.3 3 21.5 3 25.6 3 29 6.4 29 10.5c0 5-4.4 9-12.2 15.9L16 28z"
      fill="#ff69b4"
      stroke="#ff1493"
      strokeWidth="1"
    />
  </svg>
)

// Cute bow
const Bow = ({ size }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 60 40">
    <ellipse cx="15" cy="20" rx="13" ry="16" fill="#ff1493"/>
    <ellipse cx="45" cy="20" rx="13" ry="16" fill="#ff1493"/>
    <circle cx="30" cy="20" r="8" fill="#ff69b4"/>
    <path d="M30 28 Q28 38 24 40" stroke="#ff1493" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M30 28 Q32 38 36 40" stroke="#ff1493" strokeWidth="4" fill="none" strokeLinecap="round"/>
  </svg>
)

// Mix: regular kitty, 1/3 kissing kitty, hearts, bows
const components = [HelloKitty, HelloKitty, HelloKittyKiss, Heart, Heart, Bow, HelloKitty, Heart]

function HelloKittyRain() {
  const items = useMemo(() => {
    const arr = []
    const totalItems = 35
    const columns = 10 // Divide screen into 10 columns
    const columnWidth = 100 / columns

    let kittyCount = 0
    for (let i = 0; i < totalItems; i++) {
      // Distribute evenly across columns with slight randomness
      const column = i % columns
      const baseLeft = column * columnWidth
      const randomOffset = (Math.random() - 0.5) * columnWidth * 0.6
      const itemType = Math.floor(Math.random() * components.length)

      // Only kitties (indices 0, 1, 2, 6) can be foreground, and only 1/3 of them
      const isKitty = itemType === 0 || itemType === 1 || itemType === 2 || itemType === 6
      let isForeground = false
      if (isKitty) {
        isForeground = kittyCount % 3 === 0
        kittyCount++
      }

      arr.push({
        id: i,
        left: Math.max(2, Math.min(98, baseLeft + columnWidth / 2 + randomOffset)),
        delay: Math.random() * 15,
        duration: 10 + Math.random() * 10,
        size: 35 + Math.random() * 30,
        type: itemType,
        opacity: 0.85 + Math.random() * 0.15,
        foreground: isForeground
      })
    }
    return arr
  }, [])

  return (
    <>
      <style>{`
        @keyframes kittyFall {
          0% {
            transform: translate3d(0, -120px, 0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: var(--item-opacity);
          }
          50% {
            transform: translate3d(30px, 50vh, 0) rotate(15deg);
          }
          95% {
            opacity: var(--item-opacity);
          }
          100% {
            transform: translate3d(-25px, 110vh, 0) rotate(-10deg);
            opacity: 0;
          }
        }
        @keyframes kissFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(15px, -20px) scale(1.3);
            opacity: 0.7;
          }
        }
        .kitty-rain-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        .kitty-rain-container.background {
          z-index: 0;
        }
        .kitty-rain-container.foreground {
          z-index: 9999;
        }
        .kitty-item {
          position: absolute;
          top: -120px;
          will-change: transform, opacity;
          animation: kittyFall ease-in-out infinite;
        }
        .kiss-heart {
          animation: kissFloat 1.5s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
      <div className="kitty-rain-container background">
        {items.filter(item => !item.foreground).map(item => {
          const Component = components[item.type]
          return (
            <div
              key={item.id}
              className="kitty-item"
              style={{
                left: item.left + '%',
                animationDuration: item.duration + 's',
                animationDelay: item.delay + 's',
                '--item-opacity': item.opacity
              }}
            >
              <Component size={item.size} />
            </div>
          )
        })}
      </div>
      <div className="kitty-rain-container foreground">
        {items.filter(item => item.foreground).map(item => {
          const Component = components[item.type]
          return (
            <div
              key={item.id}
              className="kitty-item"
              style={{
                left: item.left + '%',
                animationDuration: item.duration + 's',
                animationDelay: item.delay + 's',
                '--item-opacity': item.opacity
              }}
            >
              <Component size={item.size} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default HelloKittyRain
