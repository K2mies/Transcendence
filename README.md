_This project has been created as part of the 42 curriculum by khiidenh, sojala, ikozhina, rhvidste, vuljas._

---

# Description

    [◦Section that clearly presents the project, including its goal and a brief overview.
    ◦Section should also contain a clear name for the project and its

key features.]

---

# Instructions

    [◦Section containing any relevant information about compilation,
    installation, and/or execution.
    ◦Section should mention all the needed prerequisites (software,

tools, versions, configuration like .env setup, etc.), and step-by-step instructions to
run the project.]

### Compilation

### Installation

### Execution

    ◦ Run the orchestrated docker-compose file: make
    ◦ Stop containers without deleting images: make down
    ◦ Start containers without building new images: make up
    ◦ Just build docker images: make images
    ◦ Remove containers, images and volumes: make clean
    ◦ Clean up everything: make fclean
    ◦ Clear up everything, build and launch: make re

---

# Resources

    [◦ Section listing classic references related to the topic (documentation, articles, tutorials, etc.), as well as a description of how AI was used — specifying for which tasks and which parts of the project.]

◦ [Alpine Linux setup guide](https://itsfoss.com/alpine-linux-virtualbox/)

◦ [SSH connection setup](https://www.geeksforgeeks.org/installation-guide/how-to-install-openssh-on-alpine/)

◦ [VirtualBox shared folders](https://wiki.alpinelinux.org/wiki/VirtualBox_shared_folders)

◦ [Install Docker and Docker Compose](https://virtualzone.de/posts/alpine-docker-rootless/)

◦ [Docker Compose](https://docs.docker.com/compose/intro/compose-application-model/)

◦ [Dockerfile](https://docs.docker.com/build/concepts/dockerfile/)

◦ [Dockerfile Best Practices](https://docs.docker.com/build/building/best-practices/)

◦ [Mariadb](https://hub.docker.com/_/mariadb)

◦ [Wordpress](https://hub.docker.com/_/wordpress)

◦ [Nginx](https://hub.docker.com/_/nginx)

◦ [Wordpress with docker compose](https://www.linode.com/docs/guides/wordpress-with-docker-compose/)

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

    ◦ AI usage:
    	-

---

# Team Information

| Team member | Role                      | Responsibilities                                                                                                                                                                                                                                                                                                                                                                                                             |
| :---------- | :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Karoliina   | Product Owner             |                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Ross        | Technical Lead (Frontend) | Responsible for the architecture, implementation, and maintenance of the React frontend. Established coding standards and reusable component patterns, reviewed and integrated frontend features, coordinated UI development across the team, and ensured a consistent, responsive, and accessible user experience while collaborating closely with backend developers to define APIs and integrate real-time functionality. |
| Viljar      | Technical Lead (Backend)  |                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Inna        | Developer                 | Implemented Google OAuth 2.0 authentication end-to-end (frontend and backend), and built the application's role-based permissions system end-to-end (frontend and backend), including a dedicated admin panel for users and reviews |
| Sonja       | Project Manager           | Scheduling and booking weekly meetings, team coordination, process tracking                                                                                                                                                                                                                                                                                                                                                  |

    [For each team member mentioned at the top of the README.md, you must provide:
    	◦ Assigned role(s): PO, PM, Tech Lead, Developers, etc.
    	◦ Brief description of their responsibilities.]

---

# Project Management

**_Initial architecture:_** \
At project start, we agreed on an initial plan for project modules that we wanted to complete to reach required points. After that, Viljar generated us a _Trello_ table with specific tasks based on the subject's general requirements and module descriptions. Karoliina also made us a _Miro_ board with project info, design specs, reference screenshots from web applications with a similar idea, and a notes area. _Trello_ was used throughout the project to guide Git branch logic: each task card had a separate branch that was eventually merged to main. _Miro_ was updates with current status of implemented modules and points, as well as a to do list and other general project management notes. \
**_Git practices:_** \
On GitHub, we used a rule in our repository to prevent merging straight into main. Instead, a pull request was opened for each branch, and code review was done using GitHub Copilot and by at least one team member. \
**_Team communication:_** \
For communication, we used a Discord group chat and weekly face-to-face meetings at campus. \

    [◦ How the team organized the work (task distribution, meetings, etc.).
    ◦ Tools used for project management (GitHub Issues, Trello, etc.).
    ◦ Communication channels used (Discord, Slack, etc.).]

---

# Technical Stack

**_Backend_** \
 ◦ Express: backend server
◦ Node.js

**_Database_** \
 ◦ PostgreSQL
◦ Prisma ORM

**_Frontend_** \
 ◦ React with Typescript
◦ MUI Material, headlessUI

    [◦ Frontend technologies and frameworks used.
    ◦ Backend technologies and frameworks used.
    ◦ Database system and why it was chosen.
    ◦ Any other significant technologies or libraries.
    ◦ Justification for major technical choices.]

---

# Database Schema

    [◦ Visual representation or description of the database structure.
    ◦ Tables/collections and their relationships.
    ◦ Key fields and data types.]

---

# Features List

    [◦ Complete list of implemented features.
    ◦ Which team member(s) worked on each feature.
    ◦ Brief description of each feature’s functionality.]

---

# Modules

| Module                                                                        | Major/minor (points) | Justification                                                                                                                                                 | Implementation                                                                                                                              | Work division                        |
| :---------------------------------------------------------------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------- |
| Use a framework for both the frontend and backend                             | Major (2 pts)        | ?                                                                                                                                                             | React for frontend, Node.js and Express                                                                                                     | Ross, Viljar, Sonja, Karoliina, Inna |
| Implement real-time features using WebSockets or similar technology           | Major (2 pts)        | ?                                                                                                                                                             | Chat system, user notifications and real-time updates (Toast)                                                                               | Viljar, Ross, (Sonja)                |
| Allow users to interact with other users                                      | Major (2 pts)        | A social platform was the core idea for our application, so user-to-user interaction and friendship functionalities were a no brainer to build.               | Chat, profile, and friends systems                                                                                                          | Ross, Viljar, Sonja, Karoliina       |
| Use an ORM for the database                                                   | Minor (1 pt)         | ?                                                                                                                                                             | Prisma was used for database                                                                                                                | Karoliina                            |
| Custom-made design system with reusable components                            | Minor (1 pt)         | Using React for frontend, reusable components were a natural choice.                                                                                          | ?                                                                                                                                           | Ross, Sonja                          |
| Implement advanced search functionality with filters, sorting, and pagination | Minor (1 pt)         | Advanced search functionality was a great fit for our games page UI where user can browse and search for games to play or rate.                               | ?                                                                                                                                           | Ross                                 |
| Complete accessibility compliance (WCAG 2.1 AA)                               | Major (2 pts)        | Learning to build an accessible wep app was one of Sonja's goals for the project, and accessibility compliance should be the standard for any modern website. | Support for screen reader, keyboard navigation, and other assistive technologies. Implemented and tested using WAVE and Voice Over (MacOS). | Sonja                                |
| Standard user management and authentication                                   | Major (2pts)         | Our app being a social platform required the functionality for user to authenticate to create a profile and to add others as friends.                         | ?                                                                                                                                           | Karoliina, Ross, Viljar, Sonja, Inna |
| Implement remote authentication with OAuth 2.0                                | Minor (1 pt)         | Lets users sign in with an account they already trust instead of creating a new password.                                                                     | Google OAuth 2.0 via Passport.js, with a frontend callback page and username picker for new sign-ins.                                       | Inna                                 |
| Advanced permissions system                                                   | Major (2 pts)        | Needed a way to manage users and reviews without giving out direct database access.                                                                            | SUPERUSER/ADMIN/USER roles with an admin panel for managing users and reviews, plus safeguards against self-deletion and admin actions targeting superuser accounts. | Inna                                 |

    [◦ List of all chosen modules (Major and Minor).
    ◦ Point calculation (Major = 2pts, Minor = 1pt).
    ◦ Justification for each module choice, especially for custom "Modules of
    choice".
    ◦ How each module was implemented.
    ◦ Which team member(s) worked on each module.]

---

# Individual Contributions

**_Sonja_**:

- Initial Docker setup (v1.0) with containers for backend, frontend, and database
- Initial frontend setup with Vite and mvp for landing page and header
- Functional UI for profile page: profile info, lists of own games (favorites and different statuses), and own reviews
  - Functionalities to edit profile info and send friend requests
  - Friends list as a popup element with tabs
  - Added necessary backend endpoints
- Migration from plain CSS to Tailwind CSS
- Translating some frontend files from JS to TS
- Functional UI for game page: game info, list of reviews
  - Fuctionalities to add game to favorites and modify status
- User logout functionality (UI and backend)
- Accessibility compliance and content for Accessibility footer page

**\_Ross:**

### Frontend Architecture

- Led the design and architecture of the React frontend.
- Established the overall project structure, routing, and component hierarchy.
- Developed reusable UI components and shared application patterns.
- Introduced React Contexts and custom hooks to improve state management and code reuse.
- Maintained frontend coding standards and TypeScript best practices.

### Authentication & User Management

- Implemented the frontend authentication flow.
- Developed login, registration Hook forms and front end validation.
- Implemented protected routes and authenticated navigation.
- Created profile pages and user information displays.

### UI Color coordination

- created a 3 color/value theme system in accordance with design color design
- Makes it easier to update/customise the theme without the UI getting too noisy/distracting
- Especially noticable once the Components get more cluttered

### Header Implamentation and Routes Management

- Created header navigation system and designed the Header functionality
- Implamented contextual header title that changes depending on Route Context
- Implamented quick search function that can be minimised
- Implamented Public and Private route management
- Managed UI design and icon formatting

### Games Library

- Designed and implemented the Games browser.
- Added advanced search, filtering, sorting, and pagination.
- Integrated game data from the backend.
- Created reusable components for displaying game information.

### Game Pages

- Implemented the individual game pages.
- Developed the review display interface.
- Added rating summaries and statistics.
- Integrated platform, genre, and game mode information.
- Designed responsive layouts for presenting game information.
- Created icon Selectors for Platform, Genre and Modes
- Created Icon Components from .svg graphics that were not included in the react library

### Rating & Favourite System

- Designed and implemented the game rating interface.
- Created reusable star rating components.
- Implemented the favourites system.
- Developed shared React Contexts for managing favourite state.
- Integrated frontend interactions with backend rating APIs.

### Review System

- Built the frontend review interface.
- Added review creation, editing, and display functionality.
- Implamented both in the Game page and the Profile Pages
- Fetches game platforms from the database related to that game and works at scale
- Integrated review validation and backend communication.

### Real-Time Chat

- Added some quality of life improvements to the Chat headlessUI
- implamented Chat scrolling so that it also goes to the latest message (in style of messaging apps)
- implamented feature where by the user can type and use enter to send continuous messages (rather than having to click the chatbox manually)

### Friend System

- Developed the frontend notification system for:
  - Sending friend requests
  - Accepting requests
  - Declining requests
  - Removing friends
- Integrated friend management into user profiles and chat so they update accordingly.

### Notifications

- Implemented toast notifications throughout the application.
- Designed reusable notification components.
- Integrated real-time notifications for:
  - Friend requests
  - Chat messages
  - Friend status updates

### User Experience & Accessibility

- Designed a consistent responsive interface using Tailwind CSS.
- Refined layouts and navigation throughout development.
- Improved overall usability through continuous UI refinement.

### Reusable Component Library

Developed numerous reusable frontend components, including:

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

### Frontend–Backend Integration

- Worked closely with backend developers to define API requirements.
- Integrated REST endpoints across the application.
- Implemented WebSocket event handling for realtime features.
- Resolved frontend/backend integration issues throughout development.

### Technical Leadership

- Served as Frontend Technical Lead.
- Guided frontend architecture and technical implementation.
- Reviewed frontend design decisions and maintained coding standards.
- Refactored existing code to improve maintainability and consistency.
- Resolved merge conflicts and frontend integration issues.
- Helped other team members with frontend implementation, debugging, and code reviews.

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

[◦ Detailed breakdown of what each team member contributed.
◦ Specific features, modules, or components implemented by each person.
◦ Any challenges faced and how they were overcome.]

---

# Additional information

[Any other useful or relevant information is welcome (usage documentation, known
limitations, license, credits, etc.).]
