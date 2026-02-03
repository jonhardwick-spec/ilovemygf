import { useState } from 'react'
import './Questionnaire.css'

const questions = [
  {
    id: 1,
    question: "What is our anniversary date? 💕",
    options: ["July 19th", "June 14th", "August 3rd", "September 1st"],
    correct: 0
  },
  {
    id: 2,
    question: "What do I love most about you?",
    options: ["Everything! 💖", "Just your looks", "Your cooking only", "Nothing special"],
    correct: 0
  },
  {
    id: 3,
    question: "How much do I love you?",
    options: ["To infinity and beyond! 🚀", "A little bit", "Medium amount", "Not sure"],
    correct: 0
  },
  {
    id: 4,
    question: "Would I choose you again?",
    options: ["Always & Forever 💍", "Maybe", "Probably not", "Need to think about it"],
    correct: 0
  },
  {
    id: 5,
    question: "What are you to me?",
    options: ["My whole world 🌍", "Just a friend", "An acquaintance", "A stranger"],
    correct: 0
  }
]

function Questionnaire({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleOptionClick = (optionIndex) => {
    if (showFeedback) return

    setSelectedOption(optionIndex)
    const correct = optionIndex === questions[currentQuestion].correct
    setIsCorrect(correct)
    setShowFeedback(true)

    const newAnswers = [...answers, { questionId: questions[currentQuestion].id, correct }]
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedOption(null)
        setShowFeedback(false)
      } else {
        // Quiz complete - check if all correct
        const allCorrect = newAnswers.every(a => a.correct)
        onComplete(allCorrect)
      }
    }, 1200)
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

      {showFeedback && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <span>Perfect! You know me so well! 💕</span>
          ) : (
            <span>Hmm... Are you sure you know me? 🤔</span>
          )}
        </div>
      )}

      <div className="quiz-footer">
        <span className="hearts-display">
          {answers.map((a, i) => (
            <span key={i} className={a.correct ? 'heart-correct' : 'heart-wrong'}>
              {a.correct ? '💖' : '💔'}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}

export default Questionnaire
