import { useState, useEffect } from 'react'
import './App.css'
import CardForm from './components/CardForm'
import CardList from './components/CardList'
import StudyMode from './components/StudyMode'

function App() {
  const [cards, setCards] = useState([])
  const [mode, setMode] = useState('home') // home, create, study
  const [studyCards, setStudyCards] = useState([])

  // Load cards from localStorage on mount
  useEffect(() => {
    const savedCards = localStorage.getItem('timeCards')
    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }
  }, [])

  // Save cards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('timeCards', JSON.stringify(cards))
  }, [cards])

  const addCard = (question, answer) => {
    const newCard = {
      id: Date.now(),
      question,
      answer,
      createdAt: new Date().toISOString(),
      lastReviewedAt: null,
      reviewCount: 0,
    }
    setCards([newCard, ...cards])
  }

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id))
  }

  const startStudy = () => {
    // Initialize study session with all cards in reverse order (newest first)
    const orderedCards = [...cards].reverse().map((card, index) => ({
      ...card,
      studyOrder: index,
    }))
    setStudyCards(orderedCards)
    setMode('study')
  }

  const handleStudyResponse = (cardId, remembered) => {
    if (remembered) {
      // Move card to the end of queue
      const updatedStudyCards = studyCards.filter(c => c.id !== cardId)
      const card = studyCards.find(c => c.id === cardId)
      if (card) {
        setStudyCards([...updatedStudyCards, { ...card, studyOrder: updatedStudyCards.length }])
      }
    } else {
      // Card stays at top for next review
      const updatedStudyCards = studyCards.filter(c => c.id !== cardId)
      const card = studyCards.find(c => c.id === cardId)
      if (card) {
        setStudyCards([{ ...card, studyOrder: 0 }, ...updatedStudyCards.map((c, idx) => ({ ...c, studyOrder: idx + 1 }))])
      }
    }

    // Update card metadata
    setCards(prevCards =>
      prevCards.map(c =>
        c.id === cardId
          ? {
              ...c,
              lastReviewedAt: new Date().toISOString(),
              reviewCount: c.reviewCount + 1,
            }
          : c
      )
    )
  }

  const exitStudy = () => {
    setMode('home')
    setStudyCards([])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Time Cards</h1>
        <p className="subtitle">Spaced repetition learning</p>
      </header>

      {mode === 'home' && (
        <div className="home-view">
          <div className="cards-stats">
            <div className="stat-box">
              <h2>{cards.length}</h2>
              <p>Total Cards</p>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="btn btn-primary"
              onClick={() => setMode('create')}
            >
              + Create New Card
            </button>
            <button
              className="btn btn-secondary"
              onClick={startStudy}
              disabled={cards.length === 0}
            >
              Test Memory
            </button>
          </div>

          {cards.length > 0 && (
            <div className="cards-section">
              <h2>Your Cards</h2>
              <CardList cards={cards} onDelete={deleteCard} />
            </div>
          )}
        </div>
      )}

      {mode === 'create' && (
        <div className="create-view">
          <button
            className="btn btn-back"
            onClick={() => setMode('home')}
          >
            ← Back
          </button>
          <CardForm onAddCard={(q, a) => {
            addCard(q, a)
            setMode('home')
          }} />
        </div>
      )}

      {mode === 'study' && (
        <StudyMode
          cards={studyCards}
          onResponse={handleStudyResponse}
          onExit={exitStudy}
        />
      )}
    </div>
  )
}

export default App
