📌 **Description**

	This task defines the complete structural blueprint of the application.
	It explains:
		- What parts (modules) the system consists of
		- How those parts interact
		- How data flows through the system
		- How frontend, backend, and database are connected

	👉 Think of this as the “map of the entire system” before building anything.

---

🧱 **1. SYSTEM OVERVIEW**

	The application is a full-stack web platform where users can:
		- Discover games
		- Review and rate them
		- Add friends
		- Chat in real-time

	🧩 **Main Components**
	🖥️ Frontend (React)
		- What users see and interact with
		- Handles UI, forms, navigation
		- Sends requests to backend

	⚙️ Backend (Node.js + Express)
		- Processes all requests
		- Contains business logic
		- Handles authentication
		- Communicates with database

	🗄️ Database (PostgreSQL + Prisma)
		- Stores all persistent data
		- Users, games, reviews, messages, etc.

	🔄 System Flow (Simplified)
	User → Frontend → Backend → Database
						↓
					WebSocket (chat)

---

🧠 **2. MODULE SYSTEM (CORE ARCHITECTURE)**
	Instead of random files, the backend is split into independent modules.

	👉 A module = one responsibility/domain

	🔐 Auth Module
		Purpose: Handle authentication

	Responsibilities:
		- Register users
		- Login users
		- Generate JWT tokens
		- Verify authentication

	Why separate?
	Because auth logic is reused everywhere.

	👤 **User Module**
		Purpose: Manage user data

	Responsibilities:
		- Fetch user profile
		- Update profile
		- Store avatar, bio, etc.

	🎮 **Game Module**
		Purpose: Manage game data

	Responsibilities:
		- Store games (from JSON seed)
		- Provide game listings
		- Provide game details

	⭐ **Review Module**
		Purpose: Handle user opinions

	Responsibilities:
		- Create reviews
		- Store ratings
		- Calculate average scores

	👥 **Friend Module**
		Purpose: Social connections

	Responsibilities:
		- Send friend requests
		- Accept/reject requests
		- Maintain friend list

	💬 **Chat Module**
		Purpose: Real-time communication

	Responsibilities:
		- Send messages via WebSocket
		- Store chat history
		- Deliver messages instantly

	⚠️ IMPORTANT RULE

	Each module must be:
		- Independent
		- Self-contained
		- Not tightly coupled with others

	👉 Example:
		- Chat should NOT know how reviews work
		- Reviews should NOT handle authentication

---

🌐 **3. API DESIGN (HOW FRONTEND TALKS TO BACKEND)**
	The frontend communicates with backend using REST API.

	🧾 What is REST?

	REST is a standard way to design APIs using:
		- URLs (endpoints)
		- HTTP methods (GET, POST, PUT, DELETE)

	🔑 Base URL
		- /api/v1/

	👉 Versioning (v1) allows future upgrades without breaking frontend.

	📏 Naming Rules (STRICT)
		- Use plural nouns → /users, /games
		- Use HTTP methods correctly:
			- GET → fetch data
			- POST → create
			- PUT → update
			- DELETE → remove

	Keep endpoints predictable!

	📡 Example API Endpoints
	🔐 Auth
		- POST /api/v1/auth/register
		- POST /api/v1/auth/login
		- GET  /api/v1/auth/me

	👉 /me returns current logged-in user

	👤 Users
		- GET /api/v1/users/:id
		- PUT /api/v1/users/:id

	🎮 Games
		- GET /api/v1/games
		- GET /api/v1/games/:id

	⭐ Reviews
		- POST   /api/v1/reviews
		- GET    /api/v1/reviews?gameId=123
		- DELETE /api/v1/reviews/:id

	👥 Friends
		- POST /api/v1/friends/request
		- POST /api/v1/friends/accept
		- GET  /api/v1/friends

	💬 Chat (REST fallback)
		- GET /api/v1/chat/:chatId/messages

	⚠️ RULE
		- 👉 Frontend developers MUST NOT invent endpoints
		- 👉 Backend defines them FIRST

---

⚡ **4. WEBSOCKET ARCHITECTURE (CHAT ONLY)**
	🧠 Why WebSockets?
	Normal HTTP:
		- Request → Response → Done
	WebSockets:
		- Persistent connection
		- Real-time updates

	📍 Scope
		- WebSockets are used ONLY for chat
		👉 Not for:
			- reviews
			- friends
			- games

	🔌 Connection
	ws://localhost:3000
	📦 Message Structure
		- All messages must follow this format:
		"""
			{
			"type": "EVENT_NAME",
			"payload": { }
			}
		"""

	📤 Example (Client → Server)
	"""
		{
		"type": "SEND_MESSAGE",
		"payload": {
			"chatId": "123",
			"content": "Hello"
		}
		}
	"""

	📥 Example (Server → Client)
	"""
		{
		"type": "NEW_MESSAGE",
		"payload": {
			"chatId": "123",
			"senderId": "user1",
			"content": "Hello",
			"timestamp": "2026-04-23T10:00:00Z"
		}
		}
	"""

	⚠️ RULES
		- Never send raw strings
		- Always include type
		- Always include payload

---

📁 **5. BACKEND STRUCTURE (EXPLAINED)**
	backend/src/modules/

	Each module contains:
		- routes → defines endpoints
		- controller → handles request/response
		- service → business logic
		- middleware → validation/auth

	Example (Auth Module)
	"""
		auth/
		├── auth.routes.js      → defines endpoints
		├── auth.controller.js  → handles request
		├── auth.service.js     → logic (login, register)
		└── auth.middleware.js  → protect routes
	"""

	🧠 WHY THIS STRUCTURE?

	Without it:
		- logic gets duplicated
		- files become huge
		- debugging becomes painful

---

📁 **6. FRONTEND STRUCTURE (EXPLAINED)**
	frontend/src/

	📄 pages/
		Full screens (routes)
		Examples:
			- Login
			- Profile
			- Games

	🧩 components/
		Reusable UI pieces

		Examples:
			- Navbar
			- GameCard
			- ReviewItem

	🔌 services/
		Handles API calls
		Example:
			- fetch('/api/v1/games')

	🌐 context/
		Global state (auth, user)
		⚠️ RULE
			- 👉 UI components must NOT call APIs directly
			- 👉 Use services layer

---

🔄 **7. DATA FLOW (STEP-BY-STEP)**
	🧾 Example: Creating a Review
		- User writes review in UI
		- Frontend sends request:
		- POST /api/v1/reviews
		- Backend controller receives it
		- Service validates and processes
		- Prisma writes to DB
		- Response sent back
		- UI updates

	💬 Example: Chat Message
		- User sends message
		- WebSocket sends event
		- Backend receives it
		- Message stored in DB
		- Message broadcast to other user
		- UI updates instantly

---

📦 **8. DELIVERABLES (CLEAR DEFINITION OF DONE)**
	✅ 1. Architecture Diagram
		Simple visual:
			[ React Frontend ]
					↓ REST API
			[ Express Backend ]
					↓ Prisma
			[ PostgreSQL DB ]
			↕ WebSocket (Chat)

	✅ 2. API Guideline Document
		Must include:
			- All endpoints
			- Request format
			- Response format
			- Error format

---