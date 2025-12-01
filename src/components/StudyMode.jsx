import { useState } from 'react'
import './StudyMode.css'

function StudyMode({ cards, onResponse, onExit }) {
  // This is where the components starts
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [completedCount, setCompletedCount] = useState(0)

  // Logic begins

  if (!cards || cards.length === 0) {
    return (
      <div className="study-complete">
        <h2>All Done! 🎉</h2>
        <p>You've reviewed all your cards!</p>
        <button className="btn btn-primary" onClick={onExit}>
          Back to Home
        </button>
      </div>
    )
  }

  const currentCard = cards[currentIndex]
  // Midway through the logic
  const handleResponse = (remembered) => {
    onResponse(currentCard.id, remembered)

    // Remove current card from cards array and move to next
    const remainingCards = cards.filter(c => c.id !== currentCard.id)

    if (remembered) {
      // Add to end
      const reorderedCards = [...remainingCards, currentCard]
      setCompletedCount(completedCount + 1)
      // Stay at same index since array shifted
    } else {
      // Keep at top (card already at position 0 after filter)
      setCompletedCount(completedCount + 1)
    }

    setIsFlipped(false)

    // Move to next card
    if (currentIndex < remainingCards.length) {
      setCurrentIndex(currentIndex)
    } else {
      setCurrentIndex(0)
    }
  }

  const progress = Math.round((completedCount / (completedCount + cards.length)) * 100) || 0

  return (
    <div className="study-mode">
      <header className="study-header">
        <button className="btn btn-back" onClick={onExit}>
          ← Exit
        </button>
        <h2>Memory Test</h2>
        <div className="progress-info">
          <span>{completedCount} / {completedCount + cards.length} reviewed</span>
        </div>
      </header>

      <div className="study-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="card-counter">
          Card {currentIndex + 1} of {cards.length}
        </div>

        <div
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="card-inner">
            <div className="card-front-side">
              <p className="card-label">Question</p>
              <p className="card-text">{currentCard.question}</p>
              <p className="flip-hint">Click to reveal answer</p>
            </div>
            <div className="card-back-side">
              <p className="card-label">Answer</p>
              <p className="card-text">{currentCard.answer}</p>
              <p className="flip-hint">Click to go back</p>
            </div>
          </div>
        </div>

        {isFlipped && (
          <div className="response-buttons">
            <button
              className="btn btn-forgot"
              onClick={() => handleResponse(false)}
            >
              ✕ I Forgot
            </button>
            <button
              className="btn btn-remembered"
              onClick={() => handleResponse(true)}
            >
              ✓ I Remembered
            </button>
          </div>
        )}

        {!isFlipped && (
          <p className="response-hint">Flip the card when ready!</p>
        )}
      </div>
    </div>
  )
}

export default StudyMode
