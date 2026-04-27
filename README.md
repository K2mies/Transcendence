# Transcendence | GoodPlays

## Team members
Karoliina | Sonja | Inna | Ross | Viljar

---

## Project description

GoodPlays (WIP name) is a social platform for discovering, tracking and reviewing video games. We want to create a unified space where players have the tools to explore new games, manage their personal game library and connect with others regardless of the platforms they play on.

---

## Tech stack
### Backend
	- Node.js
	- Express

### Frontend
	- React
	- Tailwind CSS
	- Three.js (optional)

### Database
	- PostgreSQL
	- Prisma (ORM, schema management, and migrations)

---

## Project structure
	- frontend/ -> React app
	- backend/  -> API server + database

---

## Getting started
### Backend
	- cd backend/
	- npm install (to install node packages defined in package.json)
	- npm run dev (sets up a local development server, enabling real-time code changes and instant feedback)

### Frontend
	- cd frontend/
	- npm install
	- npm run dev

---

## Naming convention
### Backend

👉 Rule:
  - lowercase
  - dot-separated (.)
  - role-based suffix

Example:
  ```
	auth.controller.js
	user.service.js
	game.routes.js
  ```

### Frontend

👉 Rule:
  - PascalCase for components

Example:
  ```
	Login.jsx
	GameDetails.jsx
	UserProfile.jsx
  ```

### Variable naming

👉 Rule:
  - camelCase in JS

Example:
  ```
	userId
	gameId
	createdAt
	isAuthenticated
  ```

### Database (Prisma)

👉 Rule:
  - PascalCase for models
  - camelCase for fields

Example [models]:
  ```
	model User
	model Game
	model Review
  ```

Example [fields]:
  ```
	createdAt
	userId
  ```

### API Routes

👉 Rule:
  - plural nouns
  - lowercase
  - REST standard

Example:
  ```
	/api/v1/users
	/api/v1/games
	/api/v1/reviews
  ```

### Websocket Events

👉 Rule:
  - UPPER_SNAKE_CASE

Example:
  ```
	"SEND_MESSAGE"
	"NEW_MESSAGE"
	"TYPING"
  ```

### GitHub

👉 Rule:
  - prefix:
    - Card name from Trello (Example: GG01:)
  - action description:
    - feat
    - fix
    - setup

Examples:
  ```
	GG01: setup: creating base folders + README
	GG10: feat: User model implementation
	GG10: fix: User model fields correction
  ```

---
