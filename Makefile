RESET=$(shell echo "\033[0m")
RED=$(shell echo "\033[1;31m")
GREEN=$(shell echo "\033[1;32m")
YELLOW=$(shell echo "\033[1;33m")
BLUE=$(shell echo "\033[1;34m")

COMPOSE_FILE=docker-compose.yml

all: images up
	@echo "$(GREEN)ALL GOOD. DONE!$(RESET)"

images:
	@echo "$(BLUE)Building docker images...$(RESET)"
	@docker-compose -f $(COMPOSE_FILE) build

up:
	@echo "$(BLUE)Starting containers...$(RESET)"
	@docker-compose -f $(COMPOSE_FILE) up -d

down:
	@echo "$(RED)Stopping containers...$(RESET)"
	@docker-compose -f $(COMPOSE_FILE) down

clean:
	@echo "$(RED)Removing containers, images and volumes...$(RESET)"
	@docker-compose -f $(COMPOSE_FILE) down --rmi all -v

fclean: clean
	@echo "$(RED)Removing data directories...$(RESET)"
	@docker system prune -f --volumes

re: fclean all

.PHONY: all images clean fclean re up down
