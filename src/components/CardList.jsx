import './CardList.css'

function CardList({ cards, onDelete }) {
  return (
    <div className="card-list">
      {cards.map((card) => (
        <div key={card.id} className="card-preview">
          <div className="card-content">
            <div className="card-front">
              <strong>Q:</strong> {card.question}
            </div>
            <div className="card-back">
              <strong>A:</strong> {card.answer}
            </div>
          </div>
          <div className="card-meta">
            <span className="review-count">Reviewed: {card.reviewCount}</span>
            <button
              className="btn-delete"
              onClick={() => onDelete(card.id)}
              title="Delete card"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardList
