import { useState } from 'react'
import HelloKittyRain from './components/HelloKittyRain'
import ValentineQuestion from './components/ValentineQuestion'
import Questionnaire from './components/Questionnaire'
import Celebration from './components/Celebration'
import './App.css'

function App() {
  const [stage, setStage] = useState('valentine') // valentine, quiz, celebration, sadface
  const [saidYes, setSaidYes] = useState(false)

  const handleValentineYes = () => {
    setSaidYes(true)
    setStage('quiz')
  }

  const handleQuizComplete = (allCorrect) => {
    if (allCorrect) {
      setStage('celebration')
    } else {
      setStage('sadface')
    }
  }

  const handleRetry = () => {
    setStage('quiz')
  }

  return (
    <div className="app">
      <HelloKittyRain />

      <div className="content">
        {stage === 'valentine' && (
          <ValentineQuestion onYes={handleValentineYes} />
        )}

        {stage === 'quiz' && (
          <Questionnaire onComplete={handleQuizComplete} />
        )}

        {stage === 'celebration' && (
          <Celebration />
        )}

        {stage === 'sadface' && (
          <div className="sadface-container glass-card">
            <div className="sadface-emoji">😭</div>
            <h1 className="sadface-title">So you hate me :(</h1>
            <p className="sadface-text">I thought you knew me better...</p>
            <button className="retry-btn" onClick={handleRetry}>
              Try Again? 🥺
            </button>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Made with 💕 for Samara</p>
        <p className="anniversary">Our Anniversary: July 19th 💖</p>
      </footer>
    </div>
  )
}

export default App
