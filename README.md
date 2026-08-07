_This project has been created as part of the 42 curriculum by khiidenh, sojala, ikozhina, rhvidste, vuljas._

---

# Description

GoodPlays is a social platform for discovering, tracking and reviewing video games. It is a unified space where players have the tools to explore new games, manage their personal game library, and connect with others regardless of the platforms they play on.

Users can browse games using a range of filters, or explore a dashboard view highlighting trending games, newest releases, community top-rated titles, and most-played games. They can mark which games they have played, are playing, or want to play, add reviews, and mark favourites. As this is a social platform, users can also search for other users, befriend them, chat with them, and see what games they have in their own gaming library.

<img width="1202" height="589" alt="image" src="https://github.com/user-attachments/assets/97c26ef2-bd0d-497b-a940-5329212078b7" />

### What problems are we solving?

Fragmented Discovery

- Players discover games through scattered sources (friends, social media, Steam, websites), making the actual discovery of game inconsistent and troublesome. The recommendations are also typically platform-specific and do not reflect player's entire gaming profile

Disconnected Platforms

- Game platforms feel siloed, making it difficult for players to discover or feel motivated to explore games outside their primary platform, even for players who are curious to try new experiences.

Lack of Unified Tracking

- Players have no single space to track all the games they have played, are playing, or want to play across different platforms.

Missing Social Layer and Unified Gaming Community

- Social features (friends, communities) are often tied to a specific platform, neglecting many players. This specifically touches on players who tend to play on mobile.

### Who are we targeting?

- All players, but being especially mindful to players who use multiple platforms (PC, console, mobile)
- Players looking for better game recommendations via social features or personalized recommendations.
- Players who want to track and organize their gaming backlog.
- Players who want to find inspiration from other people's experiences, looking at reviews and game histories to discover new games they might enjoy.

---

# Instructions

### Prerequisites

◦ Before running the project, make sure the following software is installed:

- Docker (version 20.10 or newer)
- Docker Compose (version 2 or newer)
- Make (GNU Make)
- Git

◦ The project uses Docker to manage all services, including:

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + Prisma
- Database: PostgreSQL
- Reverse Proxy: NGINX

### Environment Configuration

◦ Create the required environment file in the project root before starting the application.

- Copy `.env.example` to `.env`
- Update the environment variables if necessary.

### Compilation

◦ The project is built and orchestrated using Docker Compose.

◦ To build and start the complete application, run:

- `make`
  - This command will:
    - build the frontend Docker image
    - build the backend Docker image
    - build the NGINX image
    - create the PostgreSQL database container
    - install all project dependencies
    - generate the Prisma Client
    - apply Prisma database migrations
    - launch all services
    - seed the PostgreSQL database with the initial application data, including:
      - games
      - user profiles
      - reviews

### Installation

◦ The application is completely installed inside Docker containers.

◦ All frontend and backend dependencies are installed automatically during the Docker image build process.

### Execution

    ◦ Run the orchestrated docker-compose file: make
    ◦ Stop containers without deleting images: make down
    ◦ Start containers without building new images: make up
    ◦ Just build docker images: make images
    ◦ Remove containers, images and volumes: make clean
    ◦ Clean up everything: make fclean
    ◦ Clear up everything, build and launch: make re

### Accessing the Application

◦ After all containers have started successfully, GoodPlays is available at:

                            https://localhost:8443

◦ All incoming requests are handled by NGINX, which:

- serves the React frontend
- proxies REST API requests to the Express backend
- forwards WebSocket connections used for the real-time chat and notification system

◦ The PostgreSQL database is only accessible from within the Docker network and is not exposed publicly.

### Project Architecture

```text
            Browser
               │
               ▼
             NGINX
        ┌──────┼──────┐
        │      │      │
        ▼      ▼      ▼
   React UI  Express  WebSocket
              API      Server
                    \/
                  Prisma ORM
                    │
                PostgreSQL
```

---

# Resources

◦ [Docker Compose](https://docs.docker.com/compose/intro/compose-application-model/)

◦ [Dockerfile](https://docs.docker.com/build/concepts/dockerfile/)

◦ [Dockerfile Best Practices](https://docs.docker.com/build/building/best-practices/)

◦ [Nginx](https://hub.docker.com/_/nginx)

◦ [Explaining Docker Networking Concepts](https://ostechnix.com/explaining-docker-networking-concepts/)

◦ [WordPress Deployment with NGINX, PHP-FPM and MariaDB using Docker Compose](https://medium.com/swlh/wordpress-deployment-with-nginx-php-fpm-and-mariadb-using-docker-compose-55f59e5c1a)

◦ [Virtual Machines vs Docker](https://www.geeksforgeeks.org/devops/difference-between-docker-and-virtualization/)

◦ [Secrets](https://docs.docker.com/engine/swarm/secrets/)

◦ [Secrets Handling](https://medium.com/@jagadeeshkema/docker-secrets-environment-variables-handling-sensitive-data-the-right-way-0eacb628b7d9)

◦ [Docker Networks](https://bunny.net/academy/computing/what-is-docker-networking/)

◦ [React Accessibility on MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_accessibility)

◦ [Accessibility checklist](https://www.a11yproject.com/checklist/)

◦ [Google Identity: OAuth 2.0 for sign-in](https://developers.google.com/identity/protocols/oauth2)

◦ [Passport-google-oauth20 strategy](https://www.passportjs.org/packages/passport-google-oauth20/)

◦ [Multer for file uploads](https://betterstack.com/community/guides/scaling-nodejs/multer-in-nodejs/)

◦ [Prisma Instructions](https://medium.com/@fardeenmansuri0316/prisma-for-beginners-setting-up-migrating-and-querying-data-050fc401fa0d)

◦ [Prisma Documentation](https://www.prisma.io/docs/orm)

◦ [Backend Folder structure](https://medium.com/@dwincahya8/best-practices-for-structuring-and-writing-express-js-applications-0fa4fe127f07)

◦ [FrontendMasters Courses](https://frontendmasters.com/)

## AI usage

◦ AI assistance was used throughout the development of GoodPlays to improve development efficiency, verify implementation ideas and enhance code quality.

◦ All design decisions, implementation, testing, debugging and system integration were carried out by the development team.

◦ AI was used for the following tasks:

- Explaining programming concepts and technologies.
- Assisting with debugging and identifying potential issues in the codebase.
- Reviewing code and suggesting improvements for readability, maintainability and performance.
- Providing guidance during technical discussions and implementation planning.
- Assisting with improving project documentation.

All AI-generated suggestions were reviewed, validated and modified where necessary before being incorporated into the project. The development team is fully responsible for the project's architecture, functionality, security, testing and the correctness of the final implementation.

---

# Team Information

| Team member | Role                      | Responsibilities                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Karoliina   | Product Owner             | Defined the product vision and created a Miro board outlining the design specification, including what the product is, the problems it solves, our target audience, the core loop, and additional resources for inspiration. Tracked the backlog on a Trello board to ensure tasks were properly logged and placed in the right columns. Also contributed as a developer, primarily focusing on backend endpoints.                                                                                                                                                                               |
| Ross        | Technical Lead (Frontend) | Responsible for the architecture, implementation, and maintenance of the React frontend. Established coding standards and reusable component patterns, reviewed and integrated frontend features, coordinated UI development across the team, and ensured a consistent, responsive, and accessible user experience while collaborating closely with backend developers to define APIs and integrate real-time functionality.                                                                                                                                                                     |
| Viljar      | Technical Lead (Backend)  | Established the Trello workflow for project planning and task tracking. As Backend Technical Lead, evaluated backend technologies, selected Node.js with Express, designed the backend architecture and set up the backend server. Shared backend knowledge with the team and provided technical support when needed. Created script to gather data of games for the database. As a Backend Developer, implemented the real-time chat system using WebSockets on both the backend and frontend, and led the integration of NGINX with HTTPS to provide secure communication for the application. |
| Inna        | Developer                 | Implemented Google OAuth 2.0 authentication end-to-end (frontend and backend), and built the application's role-based permissions system end-to-end (frontend and backend), including a dedicated admin panel for users and reviews                                                                                                                                                                                                                                                                                                                                                              |
| Sonja       | Project Manager           | Responsible for scheduling and booking weekly meetings, team coordination, and process tracking. Implemented accessibility compliance, made initial design for UI structure on profile, game, and dashboard pages. Built frontend components and functionalities like the friend list popup, friend request UI, and profile editing, implementing necessary additional backend endpoints. Refactored backend code to ensure consistent logic for Prisma calls and error handling. Reviewed PR's and contributed with fixes and updates to various features.                                      |

---

# Project Management

**_Initial architecture:_** \
At project start, we agreed on an initial plan for project modules that we wanted to complete to reach required points. After that, Viljar generated us a _Trello_ table with specific tasks based on the subject's general requirements and module descriptions. Karoliina also made us a _Miro_ board with project info, design specs, reference screenshots from web applications with a similar idea, and a notes area. _Trello_ was used throughout the project to guide Git branch logic: each task card had a separate branch that was eventually merged to main. _Miro_ was updates with current status of implemented modules and points, as well as a to do list and other general project management notes. \
<br>
**_Git practices:_** \
On GitHub, we used a rule in our repository to prevent merging straight into main. Instead, a pull request was opened for each branch, and code review was done using GitHub Copilot and by at least one team member. \
<br>
**_Team communication:_** \
For communication, we used a Discord group chat and weekly face-to-face meetings at campus.

---

# Technical Stack

**_Backend_** \
◦ Node.js: JavaScript runtime used to build the backend. \
◦ Express: Lightweight web framework for creating REST APIs and middleware. \
◦ WebSocket (ws): Enables real-time communication for the chat system. \
◦ Passport.js + Google OAuth 2.0: Secure authentication using Google accounts. \
◦ JWT (jsonwebtoken): Stateless authentication and authorization using JSON Web Tokens. \
◦ bcryptjs: Password hashing for secure credential storage. \
◦ Zod: Runtime validation of incoming request data. \
◦ CORS: Restricts cross-origin requests to trusted frontend origins. \
◦ Multer: image uploads

**_Database_** \
◦ PostgreSQL: Relational database chosen for its reliability, excellent performance and seamless integration with Prisma. \
◦ Prisma ORM: Type-safe database access, schema management and migrations.

**_Frontend_** \
◦ React with Typescript \
◦ MUI Material, headlessUI

**_Security_** \
◦ NGINX: Acts as a reverse proxy, serves the frontend, routes API and WebSocket traffic, terminates SSL/TLS and redirects HTTP requests to HTTPS. \
◦ HTTPS (TLS/SSL): Encrypts communication between clients and the server.

## Technical Choices

The project uses **React** and **TypeScript** to create a maintainable, type-safe frontend with reusable components. The backend is built with **Node.js** and **Express** because they provide a lightweight and efficient environment for REST APIs and integrate well with **WebSockets** for real-time chat functionality.

**PostgreSQL** was selected as the database because it is robust, reliable, and well-suited for relational data. **Prisma ORM** was chosen to simplify database development through type-safe queries, migrations and schema management.

For authentication, **Passport.js**, **Google OAuth 2.0** and **JWT** provide secure user authentication and session handling. **NGINX** was introduced as a reverse proxy to centralize traffic routing, terminate HTTPS connections, proxy WebSocket communication and improve the application's security by enforcing encrypted communication.

---

# Database Schema

### User

| Field     | Type     | Notes                                 |
| --------- | -------- | ------------------------------------- |
| id        | Int      | primary key, autoincrement            |
| name      | String   | unique                                |
| email     | String   | unique                                |
| password  | String   | nullable (OAuth users won't have one) |
| bio       | String   | nullable                              |
| createdAt | DateTime |                                       |
| image     | Bytes    |                                       |

### OAuthAccount

| Field          | Type   | Notes                 |
| -------------- | ------ | --------------------- |
| id             | Int    | primary key           |
| userId         | Int    | foreign key → User.id |
| provider       | Enum   | GOOGLE / FT           |
| providerUserId | String | unique per provider   |

### Game

| Field                 | Type     | Notes       |
| --------------------- | -------- | ----------- |
| id                    | Int      | primary key |
| name                  | String   | unique      |
| description           | String   |             |
| imageSmall / imageBig | String   |             |
| releaseDate           | DateTime |             |
| developer / publisher | String   | nullable    |
| rating                | Float    |             |

### Platform

| Field | Type   | Notes       |
| ----- | ------ | ----------- |
| id    | Int    | primary key |
| name  | String | unique      |

### GameMode

| Field | Type   | Notes       |
| ----- | ------ | ----------- |
| id    | Int    | primary key |
| name  | String | unique      |

### Genre

| Field | Type   | Notes       |
| ----- | ------ | ----------- |
| id    | Int    | primary key |
| name  | String | unique      |

### Review

| Field      | Type     | Notes                               |
| ---------- | -------- | ----------------------------------- |
| id         | Int      | primary key                         |
| review     | String   | nullable                            |
| rating     | Int      |                                     |
| userId     | Int      | foreign key → User.id               |
| gameId     | Int      | foreign key → Game.id               |
| platformId | Int      | nullable, foreign key → Platform.id |
| createdAt  | DateTime |                                     |

### LikeReview

| Field    | Type | Notes                   |
| -------- | ---- | ----------------------- |
| id       | Int  | primary key             |
| userId   | Int  | foreign key → User.id   |
| reviewId | Int  | foreign key → Review.id |

### UserGameRelation (favorites / play-status join table)

| Field      | Type    | Notes                                                      |
| ---------- | ------- | ---------------------------------------------------------- |
| id         | Int     | primary key                                                |
| userId     | Int     | foreign key → User.id                                      |
| gameId     | Int     | foreign key → Game.id                                      |
| gameStatus | Enum    | nullable — NONE / WANT_TO_PLAY / PLAYING / COMPLETED / DNF |
| favorite   | Boolean |                                                            |

### UserUserRelation (friend requests)

| Field        | Type | Notes                 |
| ------------ | ---- | --------------------- |
| id           | Int  | primary key           |
| senderId     | Int  | foreign key → User.id |
| receiverId   | Int  | foreign key → User.id |
| friendStatus | Enum | PENDING / FRIENDS     |

### Message

| Field      | Type     | Notes                 |
| ---------- | -------- | --------------------- |
| id         | Int      | primary key           |
| senderId   | Int      | foreign key → User.id |
| receiverId | Int      | foreign key → User.id |
| content    | String   |                       |
| read       | Boolean  | default false         |
| createdAt  | DateTime |                       |

**Relationships:**

- One `User` has many `Review`s, `OAuthAccount`s, and `Message`s sent/received (1-to-many)
- One `Game` has many `Review`s (1-to-many)
- `User` ↔ `Game` is many-to-many via `UserGameRelation` (favorites/status)
- `Game` ↔ `Platform`, `Game` ↔ `GameMode`, `Game` ↔ `Genre` are many-to-many
- `User` ↔ `Review` is many-to-many via `LikeReview` (liking reviews)
- `User` ↔ `User` is many-to-many via `UserUserRelation` (self-relation, friend requests) and via `Message` (self-relation, direct messaging)

---

# Features List

| Feature                            | Description                                                                                                                                 | Work Division             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| User Registration & Login          | Allows users to create an account and log in using email and password                                                                       | Inna, Viljar, Ross, Sonja |
| Google Authentication              | Allows users to register and log in using their Google account                                                                              | Inna                      |
| Dashboard                          | A langin view with curated game lists: Trending, Newest, Top Rated and Most played. To help users discover games without manually searching | Karoliina                 |
| Game Browsing and Filtering        | Lets users browse the game catalogue and narrow results using filters                                                                       | Ross                      |
| Search                             | Lets users search for specific games or users                                                                                               | Ross, Viljar              |
| Game Library                       | Displays a user's tracked games(Want to play, playing, Completed, Favourites)                                                               | Sonja, Ross, Karoliina    |
| Game Status Tracking & Favouriting | Lets users mark a game's status                                                                                                             | Sonja, Karoliina, Ross    |
| Reviews & Rating                   | Lets users write reviews on the games they have played                                                                                      | Ross, Karoliina           |
| Friends System                     | Lets users search for other users, see own friends list, send/accept friend requests, and remove friends                                    | Sonja, Karoliina          |
| Chat                               | Lets friends message each other directly                                                                                                    | Viljar                    |
| Online Status Indicator            | Shows which friends are currently online                                                                                                    | Viljar                    |
| Profile Customization              | Lets users edit their avatar, bio and username                                                                                              | Sonja, Karoliina          |
| Advanced Permissions               | Grants more permissions to designated admin users for moderation                                                                            | Inna                      |

---

# Modules

| Module                                                                        | Major/minor (points) | Justification                                                                                                                                                                                                         | Implementation                                                                                                                                                                                                                                                                                                                                                        | Work division                        |
| :---------------------------------------------------------------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| Use a framework for both the frontend and backend                             | Major (2 pts)        | React and TypeScript to create a maintainable, type-safe frontend with reusable components. The backend is built with Node.js and Express because they provide a lightweight and efficient environment for REST APIs. | React for frontend, Node.js and Express                                                                                                                                                                                                                                                                                                                               | Ross, Viljar, Sonja, Karoliina, Inna |
| Implement real-time features using WebSockets or similar technology           | Major (2 pts)        | WebSockets were chosen to provide persistent two-way communication between the client and server, enabling instant message delivery and live updates without repeated HTTP requests.                                  | Chat system, user notifications and real-time updates (Toast)                                                                                                                                                                                                                                                                                                         | Viljar, Ross, (Sonja)                |
| Allow users to interact with other users                                      | Major (2 pts)        | A social platform was the core idea for our application, so user-to-user interaction and friendship functionalities were a no brainer to build.                                                                       | Chat, profile and friends systems                                                                                                                                                                                                                                                                                                                                     | Ross, Viljar, Sonja, Karoliina       |
| Use an ORM for the database                                                   | Minor (1 pt)         | We used Prisma as our ORM. With the Prisma Client, we could easily query and update the database, making it easier as we were able to use Javascript rather than SQL                                                  | Prisma was used for database                                                                                                                                                                                                                                                                                                                                          | Karoliina                            |
| Custom-made design system with reusable components                            | Minor (1 pt)         | Using React for frontend, reusable components were a natural choice.                                                                                                                                                  | As we built frontend with React, we aimed to reuse components whenever possible to maintain consistent visual outlook and logic. For example components like Review, ControlledInput, and PaginationControl were used on various pages, modifying details through props.                                                                                              | Ross, Sonja                          |
| Implement advanced search functionality with filters, sorting, and pagination | Minor (1 pt)         | Advanced search functionality was a great fit for our games page UI where user can browse and search for games to play or rate.                                                                                       | Search for games with filtering was built with Mui material Autocomplete and TextField for fields with non-predefined values. Genres, platforms and developers were fetched from database for Autocomplete. Resulting games were fetched from database using search queries. Mui material Select was used for rating filter and sorting, which had predefined values. | Ross                                 |
| Complete accessibility compliance (WCAG 2.1 AA)                               | Major (2 pts)        | Learning to build an accessible wep app was one of Sonja's goals for the project, and accessibility compliance should be the standard for any modern website.                                                         | Support for screen reader, keyboard navigation, and other assistive technologies. Implemented and tested using WAVE and VoiceOver (macOS). Updated as frontend code evolved.                                                                                                                                                                                          | Sonja                                |
| Standard user management and authentication                                   | Major (2pts)         | Our app being a social platform required the functionality for user to authenticate to create a profile and to add others as friends.                                                                                 | Registration, login and logout functionality, secure password hashing, JWT authentication, Google OAuth 2.0 login, protected backend routes through authentication middleware, user profile management, session validation and role-based authorization for administrative features                                                                                   | Karoliina, Ross, Viljar, Sonja, Inna |
| Implement remote authentication with OAuth 2.0                                | Minor (1 pt)         | Lets users sign in with an account they already trust instead of creating a new password.                                                                                                                             | Google OAuth 2.0 via Passport.js, with a frontend callback page and username picker for new sign-ins.                                                                                                                                                                                                                                                                 | Inna                                 |
| Advanced permissions system                                                   | Major (2 pts)        | Needed a way to manage users and reviews without giving out direct database access.                                                                                                                                   | SUPERUSER/ADMIN/USER roles with an admin panel for managing users and reviews, plus safeguards against self-deletion and admin actions targeting superuser accounts.                                                                                                                                                                                                  | Inna                                 |

---

# Individual Contributions

**_Sonja_**:

- Initial Docker setup (v1.0) with containers for backend, frontend, and database
- Initial frontend setup with Vite and mvp for landing page and header
- Functional UI for profile page: profile info, lists of own games (favorites and different statuses), and own reviews
  - Functionalities to edit username and bio (incl. frontend + backend validation for input) and send friend requests
  - Friends list as a popup element with tabs and real-time updates
  - Added necessary backend endpoints
- Migration from plain CSS to Tailwind CSS
- Translating some frontend files from JS to TS
- Functional UI for game page: game info, list of reviews
  - Fuctionalities to add game to favorites and modify status
- User logout functionality (UI and backend)
- Accessibility compliance and content for Accessibility footer page
- Backend refactoring to ensure consistent database use through route, controller, and service stages
- Assessment and polishing of error handling for both backend and frontend, implementing Toast notifications to handle error responses from backend to frontend
- Project management: scheduling and booking weekly meetings, coordinating team progress and communication
- Reviewing of PR's and providing support for fixes and additions to various features and branches
- Some challenges: Implementing accessibility features brought along some issues with the visual UI, and learning to use a screen reader and accessibility assessment tools (WAVE, Mozilla Firefox Accessibility Inspector) and how to solve different errors and alerts they announced required some work. React and TypeScript were new to me, and I faced some issues with React rendering logic and e.g. useState and useEffect. I overcame these issues by finding helpful resources, a lot of help from and teamwork with Ross, and through trial and error. I also learned a lot about working with a shared codebase, and what has to be taken into account when refactoring or otherwise modifying each other's code.

**_Ross_**:

- Frontend Architecture
  - Led the design and architecture of the React frontend.
  - Established the overall project structure, routing, and component hierarchy.
  - Developed reusable UI components and shared application patterns.
  - Introduced React Contexts and custom hooks to improve state management and code reuse.
  - Maintained frontend coding standards and TypeScript best practices.

- Authentication & User Management
  - Implemented the frontend authentication flow.
  - Developed login, registration Hook forms and front end validation.
  - Implemented protected routes and authenticated navigation.
  - Created profile pages and user information displays.

- UI Color coordination
  - created a 3 color/value theme system in accordance with design color design
  - Makes it easier to update/customise the theme without the UI getting too noisy/distracting
  - Especially noticable once the Components get more cluttered

- Header Implamentation and Routes Management
  - Created header navigation system and designed the Header functionality
  - Implamented contextual header title that changes depending on Route Context
  - Implamented quick search function that can be minimised
  - Implamented Public and Private route management
  - Managed UI design and icon formatting

- Games Library
  - Designed and implemented the Games browser.
  - Added advanced search, filtering, sorting, and pagination.
  - Integrated game data from the backend.
  - Created reusable components for displaying game information.

- Game Pages
  - Implemented the individual game pages.
  - Developed the review display interface.
  - Added rating summaries and statistics.
  - Integrated platform, genre, and game mode information.
  - Designed responsive layouts for presenting game information.
  - Created icon Selectors for Platform, Genre and Modes
  - Created Icon Components from .svg graphics that were not included in the react library

- Rating & Favourite System
  - Designed and implemented the game rating interface.
  - Created reusable star rating components.
  - Implemented the favourites system.
  - Developed shared React Contexts for managing favourite state.
  - Integrated frontend interactions with backend rating APIs.

- Review System
  - Built the frontend review interface.
  - Added review creation, editing, and display functionality.
  - Implamented both in the Game page and the Profile Pages
  - Fetches game platforms from the database related to that game and works at scale
  - Integrated review validation and backend communication.

- Real-Time Chat
  - Added some quality of life improvements to the Chat headlessUI
  - implamented Chat scrolling so that it also goes to the latest message (in style of messaging apps)
  - implamented feature where by the user can type and use enter to send continuous messages (rather than having to click the chatbox manually)

- Friend System
  - Developed the frontend notification system for:
    - Sending friend requests
    - Accepting requests
    - Declining requests
    - Removing friends
  - Integrated friend management into user profiles and chat so they update accordingly.

- Notifications
  - Implemented toast notifications throughout the application.
  - Designed reusable notification components.
  - Integrated real-time notifications for:
    - Friend requests
    - Chat messages
    - Friend status updates

- User Experience & Accessibility
  - Designed a consistent responsive interface using Tailwind CSS.
  - Refined layouts and navigation throughout development.
  - Improved overall usability through continuous UI refinement.

- Reusable Component Library
  - Developed numerous reusable frontend components, including:
    - Buttons
    - Rating controls
    - Favourite buttons
    - Search bars
    - Pagination controls
    - Notification components
    - Profile components
    - Chat components
    - Game information components
    - Shared icons and utility components

- Frontend–Backend Integration
  - Worked closely with backend developers to define API requirements.
  - Integrated REST endpoints across the application.
  - Implemented WebSocket event handling for realtime features.
  - Resolved frontend/backend integration issues throughout development.

- Technical Leadership
  - Served as Frontend Technical Lead.
  - Guided frontend architecture and technical implementation.
  - Reviewed frontend design decisions and maintained coding standards.
  - Refactored existing code to improve maintainability and consistency.
  - Resolved merge conflicts and frontend integration issues.
  - Helped other team members with frontend implementation, debugging, and code reviews.

- Challenges
  - **feature creep:** staying focused on building the stuff that will be evaluated
    - over the stuff that would be nice to have in the app
    - being able to create a feature that uses both the front and backend
  - **color coordination:** (three value setup )
  -
  - **Frontend–Backend Integration:** Coordinating API contracts and ensuring consistent data structures between the React frontend and Express backend as both evolved during development.
  - **Real-Time Communication:** Implementing WebSocket-based chat, notifications, online status, and other real-time updates while correctly handling connection state and UI synchronization.
  - **Complex State Management:** Keeping shared state, such as favourites, friendships, conversations, and user information, synchronized across multiple React components and pages.
  - **Collaborative Development:** Managing parallel development across multiple Git branches, resolving merge/rebase conflicts, and integrating contributions from different team members.
  - **Component Architecture:** Refactoring growing frontend functionality into reusable components, contexts, and custom hooks while keeping the codebase maintainable.
  - **Debugging React Behaviour:** Tracking down difficult state, lifecycle, dependency, and rendering issues, particularly where asynchronous requests and real-time events interacted.
  - **Responsive & Consistent UI:** Maintaining a coherent design and user experience across a large number of interconnected pages and features.

**_Inna_**:

- Google OAuth 2.0 authentication
  - Added an OAuthAccount table via Prisma, and made User.password optional for OAuth-only accounts
  - Google sign-in flow via Passport.js, distinguishing new vs. returning users
  - Frontend callback page and username picker for first-time sign-ins
- Role-based permissions system (SUPERUSER/ADMIN/USER)
  - Bootstrap script to create the initial superuser from environment variables
  - requireRole middleware and role-gated backend routes
  - Frontend Context that tracks the current user's role in memory (not persisted to storage), used to show/hide admin-only UI and gate the admin page
- Admin panel for managing users and reviews
  - Search, sort, and pagination for both users and reviews
  - Delete users/reviews, assign roles
  - Safeguards against self-deletion, self-demotion, and any admin action targeting superuser accounts

  **_Karoliina_**:
  - Set up the project in Miro, including design specification outlining the project vision, target audience, what problems the project aims to solve, as well as collecting inspiration and resources that could be beneficial.

- Designed the database schema
- Integrated Prisma for database access and management.
- Developed backend endpoints for:
  - Fetching profile and game pages
  - Adding and removing friends
  - Updating user bios and nicknames
  - Managing game statuses
  - Adding reviews
  - Fetching dashboard game data
- Created database seeders for users and reviews, populating the database with realistic user profiles representing different player types and generating reviews.
- Implemented the dashboard view on both frontend and backend. Including sections for Top Rated, Newest, Most Played, and Currently Trending games.
- Developed the frontend and backend functionality for avatar uploads, allowing users to upload and update their profile pictures.
- Worked on Profile, Game and Chat UI pages to ensure the layout worked on mobile viewports.

There was quite a few of challenges ahead when it came to this project! First and foremost I had not worked with Javascript so it took some learning to even work with the basics. But as I was working in the backend for the endpoints and I investigated different resources, at least I found a manageable way for me to work with Javascript and it was easy to follow the same pattern and learn as you go. One other challenge to mention was file uploads as Multer middleware was new to me. I had imagined I would save the images on diskStorage but Viljar actually recommended that it’s better to save the images in the database. In addition the file structure on the backend was confusing to me in the beginning as I was having difficulties understanding what should the controller have and what the service layer would have but luckily resources on the internet helped with that! Lastly, I would say working with frontend caused many hiccups. I wanted to make the frontend dashboard UI as well as I had not worked on the frontend but for that, it helped me to investigate how Sonja and Ross had been working on the frontend and I could then use their work as the base (as we already had game cards and similar structure on the profile page!). In addition, as we late on realised that this should be tested with different screen sizes, I delved a bit deeper into Tailwind breakpoints, to make certain elements behave a bit differently if the screen size was bigger vs smaller. Overall, as everything was completely new to me, this project was a combination of studying resources, asking team members, discussing with AI to gain deeper understanding and lots of trial and error.

**_Viljar_**:

- Planned and organized the backend development workflow as Backend Technical Lead.
- Set up the backend architecture using Node.js and Express.
- Implemented JWT authentication.
- Designed and implemented the real-time chat system using WebSockets (`ws`) on both the backend and frontend.
- Developed the messaging functionality, conversation management, online status tracking indicator and friend-based chat permissions.
- Implemented secure HTTPS communication by configuring Nginx as a reverse proxy with SSL/TLS termination.
- Configured reverse proxy routing for the frontend, backend API and WebSocket connections.
- Improved backend security by configuring CORS, secure cookies, authentication middleware and request validation.
- Assisted teammates if needed throughout the project.
- Challenges:
  - All frameworks were new for me, so I had to take online courses to gain knowledge. Developing was challenging in each step, but we divided the work to smaller pieces so it was smoother to adjust to new knowledge. When I had challenges, I asked help or discussed it with team members.

---
