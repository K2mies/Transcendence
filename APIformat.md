🔴 **STEP 1 — FULL API REQUEST / RESPONSE DESIGN**
	If this is unclear → frontend and backend will constantly block each other.
	We’re defining:
		- exact request bodies
		- exact response formats
		- error structure
	👉 No guessing allowed after this.

---

📦 **GLOBAL RESPONSE FORMAT (MANDATORY STANDARD)**
	Every response from backend must follow ONE structure:
		✅ Success
			"""
			{
			"status": "success",
			"data": { }
		}
		"""
		❌ Error
			"""
			{
			"status": "error",
			"message": "Error description",
			"code": 400
			}
		"""

---

🔐 **AUTH API**
	POST /api/v1/auth/register
		Request:
			"""
			{
			"email": "user@example.com",
			"username": "player1",
			"password": "securepassword"
			}
			"""
		Response:
			"""
			{
			"status": "success",
			"data": {
				"user": {
				"id": "uuid",
				"email": "user@example.com",
				"username": "player1"
				},
				"token": "JWT_TOKEN"
			}
			}
			"""

	POST /api/v1/auth/login
		Request:
			"""
			{
			"email": "user@example.com",
			"password": "securepassword"
			}
			"""
		Response:
			"""
			{
			"status": "success",
			"data": {
				"user": {
				"id": "uuid",
				"email": "user@example.com",
				"username": "player1"
				},
				"token": "JWT_TOKEN"
			}
			}
			"""

	GET /api/v1/auth/me
		Headers:
			Authorization: Bearer TOKEN
		Response:
			"""
			{
			"status": "success",
			"data": {
				"id": "uuid",
				"email": "user@example.com",
				"username": "player1",
				"avatar": "url"
			}
			}
		"""

---

👤 **USER API**
	GET /api/v1/users/:id
		Response:
			"""
			{
			"status": "success",
			"data": {
				"id": "uuid",
				"username": "player1",
				"avatar": "url",
				"bio": "text"
			}
			}
			"""

	PUT /api/v1/users/:id
		Request:
			"""
			{
			"username": "newName",
			"bio": "updated bio"
			}
		"""

---

🎮 **GAME API**
	GET /api/v1/games
		Query params:
			- page
			- limit
			- genre
		Response:
			"""
			{
			"status": "success",
			"data": {
				"games": [
				{
					"id": "uuid",
					"title": "Game Name",
					"genre": "RPG",
					"rating": 4.5
				}
				],
				"pagination": {
				"page": 1,
				"totalPages": 10
				}
			}
			}
			"""

	GET /api/v1/games/:id
		Response:
			"""
			{
			"status": "success",
			"data": {
				"id": "uuid",
				"title": "Game Name",
				"description": "Long text",
				"genre": "RPG",
				"releaseDate": "2020-01-01",
				"rating": 4.5
			}
			}
			"""

---

⭐ **REVIEW API**
	POST /api/v1/reviews
		Request:
			"""
			{
			"gameId": "uuid",
			"rating": 5,
			"content": "Amazing game!"
			}
			"""
		Response:
			"""
			{
			"status": "success",
			"data": {
				"id": "uuid",
				"gameId": "uuid",
				"userId": "uuid",
				"rating": 5,
				"content": "Amazing game!"
			}
			}
			"""

	GET /api/v1/reviews?gameId=
		Response:
			"""
			{
			"status": "success",
			"data": [
				{
				"id": "uuid",
				"user": {
					"username": "player1"
				},
				"rating": 4,
				"content": "Good",
				"createdAt": "date"
				}
			]
			}
			"""

	DELETE /api/v1/reviews/:id

---

👥 **FRIEND API**
	POST /api/v1/friends/request
		Request:
			"""
			{
			"userId": "target-user-id"
			}
			"""

	POST /api/v1/friends/accept
		Request:
			"""
			{
			"requestId": "uuid"
			}
			"""

	GET /api/v1/friends
		Response:
			"""
			{
			"status": "success",
			"data": {
				"friends": [
				{
					"id": "uuid",
					"username": "friend1"
				}
				],
				"requests": [
				{
					"id": "uuid",
					"from": {
					"id": "uuid",
					"username": "user2"
					}
				}
				]
			}
			}
			"""

---

💬 **CHAT API (REST SUPPORT)**
	GET /api/v1/chat/:chatId/messages
		Response:
		"""
		{
		"status": "success",
		"data": [
			{
			"id": "uuid",
			"senderId": "uuid",
			"content": "Hello",
			"timestamp": "date"
			}
		]
		}
		"""

---

⚠️ VALIDATION RULES (MANDATORY)
	- Email must be valid format
	- Password min length (e.g. 6)
	- Rating must be 1–5
	- Required fields must not be empty

---

⚠️ ERROR EXAMPLES
	{
	"status": "error",
	"message": "Invalid credentials",
	"code": 401
	}
	{
	"status": "error",
	"message": "Validation failed",
	"code": 400
	}

---