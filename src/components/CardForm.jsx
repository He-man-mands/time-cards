import { useState } from 'react'
import './CardForm.css'

function CardForm({ onAddCard }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (question.trim() && answer.trim()) {
      onAddCard(question, answer)
      setQuestion('')
      setAnswer('')
    }
  }

  return (
    <div className="card-form">
      <h2>Create New Card</h2>
      <p className="form-description">
        Front: Question | Back: Answer
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Question (Front of Card)</label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What do you want to remember?"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="answer">Answer (Back of Card)</label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write the answer here..."
            rows="4"
            required
          />
        </div>

        <button type="submit" className="btn btn-create">
          Create Card
        </button>
      </form>
    </div>
  )
}

export default CardForm
