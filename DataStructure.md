📦 **ROOT LEVEL**
	project/
	│
	├── frontend/
	├── backend/
	├── docker-compose.yml
	├── README.md
	└── .gitignore

---

🖥️ **FRONTEND (React)**
	frontend/
	│
	├── public/
	│
	├── src/
	│   │
	│   ├── assets/              # images, icons, fonts
	│   │
	│   ├── components/         # reusable UI components
	│   │   ├── common/
	│   │   ├── layout/
	│   │   └── ui/
	│   │
	│   ├── pages/              # full screens (routes)
	│   │   ├── Auth/
	│   │   ├── Games/
	│   │   ├── Profile/
	│   │   ├── Friends/
	│   │   └── Chat/
	│   │
	│   ├── services/           # API calls (ONLY place for backend requests)
	│   │   ├── api.js
	│   │   ├── auth.service.js
	│   │   ├── game.service.js
	│   │   ├── review.service.js
	│   │   └── chat.service.js
	│   │
	│   ├── context/            # global state (auth, user, socket)
	│   │   ├── AuthContext.jsx
	│   │   ├── UserContext.jsx
	│   │   └── SocketContext.jsx
	│   │
	│   ├── hooks/              # reusable logic hooks
	│   │   ├── useAuth.js
	│   │   ├── useSocket.js
	│   │   └── useFetch.js
	│   │
	│   ├── utils/              # helpers (formatters, validators)
	│   │
	│   ├── routes/             # route definitions
	│   │   └── AppRouter.jsx
	│   │
	│   ├── App.jsx
	│   └── main.jsx
	│
	└── package.json

	⚠️ FRONTEND RULES
		- ❌ NO API calls outside /services
		- ❌ NO direct WebSocket usage outside SocketContext
		- ❌ NO business logic inside components

---

⚙️ **BACKEND (Node.js + Express + Prisma)**
	📁 ROOT BACKEND STRUCTURE
		backend/
		│
		├── src/
		│   ├── app.js
		│   ├── server.js
		│
		│   ├── config/
		│   ├── middleware/
		│   ├── utils/
		│   ├── prisma/
		│   ├── websocket/
		│   └── modules/
		│
		├── package.json
		└── .env

	⚙️ CONFIG
		config/
		│
		├── db.js          # Prisma client
		├── env.js         # environment variables loader
		├── cors.js        # CORS policy

	🛡️ MIDDLEWARE
		middleware/
		│
		├── auth.middleware.js
		├── error.middleware.js
		├── rateLimit.middleware.js
		├── validate.middleware.js

	🧰 UTILS
		utils/
		│
		├── jwt.js
		├── password.js
		├── logger.js
		├── response.js

	🧠 PRISMA
		prisma/
		│
		├── schema.prisma
		├── migrations/
		└── seed.js   # JSON game seeding logic

	💬 WEBSOCKET SYSTEM
		websocket/
		│
		├── socket.js              # connection handler
		├── events.js              # event constants
		│
		├── handlers/
		│   ├── message.handler.js
		│   ├── typing.handler.js
		│   └── connection.handler.js
		│
		└── registry.js            # userId ↔ socketId mapping

	🧩 MODULES (CORE BACKEND ARCHITECTURE)
		Each module follows STRICT pattern:

		module/
		│
		├── module.routes.js
		├── module.controller.js
		├── module.service.js
		├── module.validation.js
		└── module.repository.js (optional, for DB abstraction)

	🔐 AUTH MODULE
		auth/
		├── auth.routes.js
		├── auth.controller.js
		├── auth.service.js
		├── auth.validation.js

	👤 USER MODULE
		user/
		├── user.routes.js
		├── user.controller.js
		├── user.service.js

	🎮 GAME MODULE
		game/
		├── game.routes.js
		├── game.controller.js
		├── game.service.js
		├── game.seed.js

	⭐ REVIEW MODULE
		review/
		├── review.routes.js
		├── review.controller.js
		├── review.service.js

	👥 FRIEND MODULE
		friend/
		├── friend.routes.js
		├── friend.controller.js
		├── friend.service.js

	💬 CHAT MODULE
		chat/
		├── chat.routes.js
		├── chat.controller.js
		├── chat.service.js
		├── message.service.js

	🚀 CORE FILES
		app.js
			- Express setup
			- middleware registration
			- route registration
		server.js
			- starts HTTP server
			- attaches WebSocket server

---