# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Time Cards is a spaced repetition learning application built with React and Vite. The app allows users to create flashcards (questions/answers) and study them with an interactive study mode that tracks review history and implements a simple scheduling algorithm to prioritize cards that need more practice.

## Development Guidelines

- We are on V1 of this project, so whenever creating a component add V1 at the end of name, example if the component needs to be called CustomButton, call it CustomButtonV1 instead

## Build and Development Commands

- `npm run dev`: Start Vite dev server (http://localhost:5173)
- `npm run build`: Production build to `dist/` directory
- `npm run lint`: Run ESLint to check for code issues
- `npm run preview`: Preview the production build locally

## Tech Stack

- **Frontend Framework**: React 19 with React DOM
- **Build Tool**: Vite 7
- **Language**: JavaScript with JSX (no TypeScript)
- **Styling**: CSS (vanilla, scoped per component)
- **Linting**: ESLint 9 with React Hooks and React Refresh plugins
- **Storage**: Browser localStorage for persistence

## Architecture and Data Flow

### Component Structure
The app uses a three-view architecture managed in `src/App.jsx`:

1. **Home View** (`mode === 'home'`): Shows card statistics, action buttons, and a list of all cards
2. **Create View** (`mode === 'create'`): Renders `CardForm` component for adding new cards
3. **Study View** (`mode === 'study'`): Renders `StudyMode` component for interactive learning

### Core Components

- **`App.jsx`**: Main container managing app state and modal/view switching
- **`CardForm.jsx`**: Form for creating new flashcards with question and answer fields
- **`CardList.jsx`**: Displays all cards with delete functionality
- **`StudyMode.jsx`**: Interactive study interface showing one card at a time with reveal/response buttons

### Data Model

Each card object contains:
```javascript
{
  id: number (Date.now()),
  question: string,
  answer: string,
  createdAt: ISO string,
  lastReviewedAt: ISO string | null,
  reviewCount: number
}
```

Cards are persisted to localStorage under the key `'timeCards'`.

### Study Mode Algorithm

- Cards are initially ordered newest-first (reverse of creation order)
- When a card is marked as "remembered", it moves to the end of the queue
- When "not remembered", it stays at the front for immediate re-review
- Card metadata (lastReviewedAt, reviewCount) is updated on each review

### State Management

All state lives in `App.jsx`:
- `cards`: The master list of all flashcards
- `mode`: Current view ('home', 'create', 'study')
- `studyCards`: Copy of cards with temporary study-session ordering

No external state management library is used (no Redux/Context).

## Styling

CSS is organized per-component:
- `src/index.css`: Global styles
- `src/App.css`: App layout and container styles
- `src/components/*.css`: Component-specific styles

Buttons use a `.btn` base class with modifiers like `.btn-primary`, `.btn-secondary`, etc.

## Code Quality

- ESLint configured for React with hooks validation
- Ignores unused variables that start with uppercase (convention for components)
- React Refresh plugin for fast HMR during development
- No TypeScript—all code is plain JavaScript/JSX