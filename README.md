# Time Cards - Spaced Repetition Learning App

A modern React + Vite app for creating flashcards and using spaced repetition to enhance your memory.

## Features

- **Create Cards**: Add unlimited flashcards with questions on the front and answers on the back
- **Test Memory**: Study mode where cards are presented in reverse order (newest first)
- **Card Flipping**: Click cards to reveal answers
- **Spaced Repetition**:
  - Cards you remember go to the end of the queue
  - Cards you forget stay at the top for immediate review
  - Automatic reordering based on performance
- **Persistent Storage**: All cards are saved in browser localStorage
- **Responsive Design**: Works beautifully on desktop and mobile devices
- **Statistics**: Track review counts for each card

## Getting Started

### Prerequisites
- Node.js 20.14+
- npm

### Installation

```bash
cd time-cards-app
npm install
npm run dev
```

The app will open at `http://localhost:5173/`

### Build for Production

```bash
npm run build
npm run preview
```

## How to Use

1. **Home Page**: Shows your total card count and action buttons
2. **Create Cards**: Click "Create New Card" to add a new flashcard
   - Enter the question/topic on the front
   - Enter the answer on the back
3. **Test Memory**: Click "Test Memory" to start a study session
   - Cards appear in reverse creation order (newest first)
   - Click the card to flip and see the answer
   - Choose "I Remembered" (green) or "I Forgot" (red)
   - Remembered cards move to the end of the queue
   - Forgot cards stay at the top for next review
4. **View Cards**: See all your cards on the home page with their review count

## Storage

All data is stored in your browser's localStorage under the key `timeCards`. Clear your browser data to reset.

## Tech Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **CSS3**: Modern styling with gradients and animations
- **localStorage API**: Browser-based data persistence

## Project Structure

```
src/
├── App.jsx                 # Main app component with state management
├── App.css                 # Global styles
├── components/
│   ├── CardForm.jsx        # Create card form
│   ├── CardForm.css
│   ├── CardList.jsx        # Display all cards
│   ├── CardList.css
│   ├── StudyMode.jsx       # Study/test mode with flipping
│   └── StudyMode.css       # Card flip animations
```

## Tips for Effective Learning

- Create cards regularly to build your knowledge base
- Review cards daily for best results
- Don't move a card too quickly if unsure - use "I Forgot" to reinforce
- The spaced repetition algorithm will naturally balance your learning
