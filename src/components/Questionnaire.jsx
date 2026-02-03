import { useState } from 'react'
import './Questionnaire.css'

// Giant Hello Kitty blowing kiss
const GiantKittyKiss = () => (
  <svg width="200" height="200" viewBox="0 0 220 200">
    <path d="M30 85 L55 15 L80 85 Z" fill="#ffffff" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M120 85 L145 15 L170 85 Z" fill="#ffffff" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
    <ellipse cx="100" cy="115" rx="75" ry="65" fill="#ffffff" stroke="#000" strokeWidth="2"/>
    <ellipse cx="35" cy="45" rx="20" ry="14" fill="#ff1493"/>
    <ellipse cx="75" cy="45" rx="20" ry="14" fill="#ff1493"/>
    <circle cx="55" cy="50" r="12" fill="#ff69b4"/>
    <ellipse cx="70" cy="105" rx="8" ry="12" fill="#000000"/>
    <path d="M 122 105 Q 130 95 138 105" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <ellipse cx="100" cy="125" rx="7" ry="5" fill="#ffd700"/>
    <ellipse cx="100" cy="145" rx="6" ry="4" fill="#ff69b4" stroke="#ff1493" strokeWidth="1"/>
    <line x1="15" y1="100" x2="55" y2="110" stroke="#000" strokeWidth="2"/>
    <line x1="15" y1="115" x2="55" y2="120" stroke="#000" strokeWidth="2"/>
    <line x1="15" y1="130" x2="55" y2="130" stroke="#000" strokeWidth="2"/>
    <line x1="185" y1="100" x2="145" y2="110" stroke="#000" strokeWidth="2"/>
    <line x1="185" y1="115" x2="145" y2="120" stroke="#000" strokeWidth="2"/>
    <line x1="185" y1="130" x2="145" y2="130" stroke="#000" strokeWidth="2"/>
    <g className="giant-kiss-heart">
      <path
        d="M 190 100 l-6-6 C 176 86 170 82 164 82 c-4 0-8 4-8 8 c0 6 4 10 14 18 l 6 6 l 6-6 c 10-8 14-12 14-18 c0-4-4-8-8-8 c-6 0-12 4-18 12 z"
        fill="#ff69b4"
      />
    </g>
  </svg>
)

const questions = [
  {
    id: 1,
    question: "What is our anniversary date? 💕",
    options: ["July 19th", "June 14th", "August 3rd", "September 1st"],
    correct: 0
  },
  {
    id: 2,
    question: "What's my favorite facial expression of yours?",
    options: ["Your pouty face", "Your thinking face", "Your sleepy face", "Your excited face"],
    correct: 1
  },
  {
    id: 3,
    question: "Why do I love YOUR brown eyes and not other peoples?",
    type: "text",
    correct: "any"
  },
  {
    id: 4,
    question: "What do I love most about you?",
    options: ["Your smile", "Everything about you", "Your sense of humor", "Your cooking"],
    correct: 1
  },
  {
    id: 5,
    question: "How much do I love you?",
    options: ["A lot", "More than anything", "To infinity and beyond", "Kinda"],
    correct: 2
  },
  {
    id: 6,
    question: "Would I choose you again?",
    options: ["Probably", "Always and forever", "Maybe", "Need to think about it"],
    correct: 1
  },
  {
    id: 7,
    question: "What are you to me?",
    options: ["My best friend", "My girlfriend", "My whole world", "My partner"],
    correct: 2
  }
]

function Questionnaire({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showFail, setShowFail] = useState(false)
  const [textAnswer, setTextAnswer] = useState('')

  const handleTextSubmit = () => {
    if (!textAnswer.trim() || showFeedback) return

    setIsCorrect(true)
    setShowFeedback(true)

    const newAnswers = [...answers, { questionId: questions[currentQuestion].id, correct: true }]
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setTextAnswer('')
        setShowFeedback(false)
      } else {
        onComplete(true)
      }
    }, 1200)
  }

  const handleOptionClick = (optionIndex) => {
    if (showFeedback || showFail) return

    setSelectedOption(optionIndex)
    const correct = optionIndex === questions[currentQuestion].correct
    setIsCorrect(correct)
    setShowFeedback(true)

    if (!correct) {
      // Wrong answer - show fail screen immediately
      setTimeout(() => {
        setShowFail(true)
      }, 800)
      return
    }

    const newAnswers = [...answers, { questionId: questions[currentQuestion].id, correct }]
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedOption(null)
        setShowFeedback(false)
      } else {
        // Quiz complete - all correct!
        onComplete(true)
      }
    }, 1200)
  }

  const handleRetry = () => {
    // Reset everything
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedOption(null)
    setShowFeedback(false)
    setIsCorrect(false)
    setShowFail(false)
  }

  // Show fail screen
  if (showFail) {
    return (
      <div className="fail-container glass-card">
        <div className="fail-emoji">😭</div>
        <h1 className="fail-title">So you hate me :(</h1>
        <p className="fail-text">I thought you knew me better...</p>
        <button className="retry-btn" onClick={handleRetry}>
          Try Again? 🥺
        </button>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="quiz-container glass-card">
      <div className="quiz-header">
        <span className="quiz-badge">Question {currentQuestion + 1}/{questions.length}</span>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h2 className="quiz-question">{question.question}</h2>

      {question.type === 'text' ? (
        <div className="text-input-container">
          <input
            type="text"
            className="text-answer-input"
            placeholder="Type your answer..."
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
            disabled={showFeedback}
          />
          <button
            className="submit-text-btn"
            onClick={handleTextSubmit}
            disabled={!textAnswer.trim() || showFeedback}
          >
            Submit 💕
          </button>
        </div>
      ) : (
        <div className="options-grid">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${
                selectedOption === index
                  ? (index === question.correct ? 'correct' : 'incorrect')
                  : ''
              } ${showFeedback && index === question.correct ? 'reveal-correct' : ''}`}
              onClick={() => handleOptionClick(index)}
              disabled={showFeedback}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      )}

      {showFeedback && isCorrect && (
        <div className="correct-popup-overlay">
          <div className="correct-popup">
            <div className="giant-kitty">
              <GiantKittyKiss />
            </div>
            <div className="yippeee-text">YIPPEEE!</div>
          </div>
        </div>
      )}

      <div className="quiz-footer">
        <span className="hearts-display">
          {answers.map((a, i) => (
            <span key={i} className="heart-correct">💖</span>
          ))}
        </span>
      </div>
    </div>
  )
}

export default Questionnaire
