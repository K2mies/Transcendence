RESET=$(shell echo "\033[0m")
RED=$(shell echo "\033[1;31m")
GREEN=$(shell echo "\033[1;32m")
YELLOW=$(shell echo "\033[1;33m")
BLUE=$(shell echo "\033[1;34m")

COMPOSE_FILE=docker-compose.yml
BACKEND=backend

all: images up wait seed
	@echo "$(GREEN)ALL GOOD. DONE!$(RESET)"

images:
	@echo "$(BLUE)Building docker images...$(RESET)"
	@docker compose -f $(COMPOSE_FILE) build

up:
	@echo "$(BLUE)Starting containers...$(RESET)"
	@docker compose -f $(COMPOSE_FILE) up -d

wait:
	@echo "$(YELLOW)Waiting for backend...$(RESET)"
	@i=0; \
	until [ "$$(docker inspect --format='{{.State.Health.Status}}' $(BACKEND) 2>/dev/null)" = "healthy" ]; do \
		i=$$((i+1)); \
		[ $$i -ge 60 ] && { echo ""; echo "$(RED)Timed out waiting for backend healthcheck.$(RESET)"; exit 1; }; \
		printf "."; \
		sleep 2; \
	done
	@echo ""
	@echo "$(GREEN)Backend is ready.$(RESET)"

seed:
	@echo "$(BLUE)Seeding database...$(RESET)"

	@docker exec $(BACKEND) node prisma/gamesSeed.js
	@echo "$(GREEN)GAMES SEED DONE!$(RESET)"

	@docker exec $(BACKEND) node prisma/profilesSeed.js
	@echo "$(GREEN)PROFILES SEED DONE!$(RESET)"

	@docker exec $(BACKEND) node prisma/reviewsSeed.js
	@echo "$(GREEN)REVIEWS SEED DONE!$(RESET)"

down:
	@echo "$(RED)Stopping containers...$(RESET)"
	@docker compose -f $(COMPOSE_FILE) down

clean:
	@echo "$(RED)Removing containers, images and volumes...$(RESET)"
	@docker compose -f $(COMPOSE_FILE) down --rmi all -v

fclean: clean
	@echo "$(RED)Removing data directories...$(RESET)"
	@docker system prune -f --volumes

re: fclean all

.PHONY: all images wait seed clean fclean re up down
