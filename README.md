*This project has been created as part of the 42 curriculum by khiidenh, sojala, ikozhina, rhvidste, vuljas.*

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

	◦ AI usage:
		-

---

# Team Information
| Team member | Role | Responsibilities |
|:--------|:--------|:--------|
| Karoliina | Product Owner | |
| Ross | Technical Lead (Frontend) | |
| Viljar | Technical Lead (Backend) | |
| Inna | Developer | |
| Sonja | Project Manager | Scheduling and booking weekly meetings, team coordination, process tracking |

	[For each team member mentioned at the top of the README.md, you must provide:
		◦ Assigned role(s): PO, PM, Tech Lead, Developers, etc.
		◦ Brief description of their responsibilities.]

---

# Project Management
**Initial architecture:** At project start, we agreed on an initial plan for project modules that we wanted to complete to reach required points. After that, Viljar generated us a *Trello* table with specific tasks based on the subject's general requirements and module descriptions. Karoliina also made us a *Miro* board with project info, design specs, reference screenshots from web applications with a similar idea, and a notes area. *Trello* was used throughout the project to guide Git branch logic: each task card had a separate branch that was eventually merged to main. *Miro* was updates with current status of implemented modules and points, as well as a to do list and other general project management notes. \
**Git practices:** On GitHub, we used a rule in our repository to prevent merging straight into main. Instead, a pull request was opened for each branch, and code review was done using GitHub Copilot and by at least one team member. \
**Team communication:** For communication, we used a Discord group chat and weekly face-to-face meetings at campus. \

	[◦ How the team organized the work (task distribution, meetings, etc.).
	◦ Tools used for project management (GitHub Issues, Trello, etc.).
	◦ Communication channels used (Discord, Slack, etc.).]

---

# Technical Stack
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
| Module | Major/minor (points) | Justification | Implementation | Work division |
|:--------|:--------|:--------|:--------|:--------|
| Use a framework for both the frontend and backend | Major (2 pts) | ? | React for frontend, Node.js and Express | Ross, Viljar, Sonja, Karoliina, Inna |
| Implement real-time features using WebSockets or similar technology | Major (2 pts) | ? | Chat system, user notifications and real-time updates (Toast) | Viljar, Ross, (Sonja)
| Allow users to interact with other users | Major (2 pts) | ? | Chat, profile, and friends systems | Ross, Viljar, Sonja, Karoliina |
| Use an ORM for the database | Minor (1 pt) | ? | Prisma was used for database | Karoliina |
| Custom-made design system with reusable components | Minor (1 pt) | ? | ? | Ross, Sonja |
| Implement advanced search functionality with filters, sorting, and pagination | Minor (1 pt) | ? | ? | Ross
| Complete accessibility compliance (WCAG 2.1 AA) | Major (2 pts) | ? | Support for screen reader, keyboard navigation, and other assistive technologies. Implemented and tested using WAVE and Voice Over (MacOS). | Sonja
| Standard user management and authentication | Major (2pts) | ? | ? | Karoliina, Ross, Viljar, Sonja, Inna |
| Implement remote authentication with OAuth 2.0 | Minor (1 pt) | ? | Google authentication | Inna |
| Advanced permissions system | Major (2 pts) | ? | ? | Inna |

	[◦ List of all chosen modules (Major and Minor).
	◦ Point calculation (Major = 2pts, Minor = 1pt).
	◦ Justification for each module choice, especially for custom "Modules of
	choice".
	◦ How each module was implemented.
	◦ Which team member(s) worked on each module.]

---

# Individual Contributions
	[◦ Detailed breakdown of what each team member contributed.
	◦ Specific features, modules, or components implemented by each person.
	◦ Any challenges faced and how they were overcome.]

---

# Additional information
[Any other useful or relevant information is welcome (usage documentation, known
limitations, license, credits, etc.).]
