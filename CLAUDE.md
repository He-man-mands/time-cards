# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Time Cards is a spaced repetition flashcard learning application built with React and Vite. It allows users to create flashcards with questions and answers, then practice them through an interactive study mode with flip animations. Card metadata (review count, last reviewed date) is tracked to support spaced repetition learning algorithms in future versions. Data persists to browser localStorage.

## Development Commands

```bash
# Start development server (HMR enabled on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Run ESLint across entire project
npm run lint

# Preview production build locally
npm run preview
```

## Architecture Overview

### High-Level Structure

The app follows a single-page architecture with three main modes managed by App.jsx state:
- **Home mode**: Display card statistics and list of all cards, with buttons to create or study
- **Create mode**: Form to add new flashcards
- **Study mode**: Interactive flashcard review with flip animation and response tracking

### Key Design Patterns

**State Management**: App.jsx is the single source of truth with state lifted to the top level:
- `cards`: The master array of all user-created flashcards, persisted to localStorage
- `mode`: Controls which view is rendered (home/create/study)
- `studyCards`: A subset of cards with additional `studyOrder` metadata for the current study session

**Data Structure**: Cards have this shape:
```javascript
{
  id: number (Date.now()),
  question: string,
  answer: string,
  createdAt: ISO timestamp,
  lastReviewedAt: ISO timestamp or null,
  reviewCount: number
}
```

**Persistence**: Two useEffect hooks in App.jsx handle localStorage:
1. On mount: Load saved cards from localStorage
2. On cards change: Persist the updated cards array

### Component Hierarchy

```
App.jsx (main controller, state management)
├── CardForm.jsx (create mode - form for new cards)
├── CardList.jsx (home mode - static display of all cards)
└── StudyMode.jsx (study mode - interactive card flipping and responses)
```

**Component Responsibilities**:
- **App.jsx**: Routes between views, manages card CRUD operations, coordinates study session initialization and response handling
- **CardForm.jsx**: Controlled form inputs for question/answer, validation (non-empty trim check), triggers onAddCard callback
- **CardList.jsx**: Maps cards array to preview cards, displays question/answer/review count, delete buttons with callbacks
- **StudyMode.jsx**: Manages study session UI state (current card index, flip state), renders flip animation with CSS, processes remembered/forgot responses

### Study Session Flow

When startStudy() is called in App.jsx:
1. Cards array is reversed (newest first) and reordered with `studyOrder` metadata
2. StudyMode component receives these cards and manages which card is displayed
3. User flips card (toggles CSS flip animation) to see the answer
4. User selects "Remembered" or "I Forgot"
5. handleStudyResponse() in App.jsx:
   - Updates `lastReviewedAt` and `reviewCount` on the master card object
   - Reorders studyCards: "Remembered" moves card to end of queue, "Forgot" keeps it at top
6. When all cards cycled through (studyCards becomes empty), Study mode shows completion screen

## Styling

Each component has a corresponding CSS file with the same name:
- `src/index.css`: Global styles and CSS variables (if defined)
- `src/App.css`: Layout for home/create views
- Component CSS files: Scoped styles for CardForm, CardList, StudyMode

The flip animation in StudyMode.css likely uses CSS 3D transforms or similar techniques triggered by the `.flipped` class on `.flashcard`.

## Tools & Configuration

- **Build tool**: Vite 7.x (see vite.config.js - uses React plugin)
- **Linter**: ESLint 9.x with React hooks and React Refresh plugins (flat config in eslint.config.js)
  - Note: `no-unused-vars` rule ignores component names (pattern `^[A-Z_]`)
- **Runtime**: React 19.2, React DOM 19.2 (ES modules)

## Future Enhancement Opportunities

The code already tracks the metadata needed for spaced repetition scheduling (reviewCount, lastReviewedAt). The study mode queue reordering logic (move remembered cards to end, keep forgotten cards at top) provides a foundation for implementing algorithms like SM-2 to adjust intervals based on difficulty.
