# Project Makefile: convenient default commands for this API Platform starter
# Usage examples:
#   make up               # run docker compose in foreground with recommended env
#   make up-detached      # run docker compose in background (detached)
#   make down             # stop containers
#   make restart          # restart the stack
#   make logs             # follow api service logs
#   make composer-install # run composer install inside the api container
#   make phpunit          # run phpunit inside the api container
#   make console ARGS="your:command"  # run symfony console inside api container

.DEFAULT_GOAL := help

# Compose command (can be overridden from environment)
COMPOSE ?= docker compose -f compose.yaml -f compose.override.yaml

# The main PHP/service name used for exec/logs; change if your service is named differently
PHP_SERVICE ?= php

.PHONY: help up down restart logs composer-install phpunit console

help:
	@printf "Usage:\n"
	@printf "  make up               # start services (foreground) with default env\n"
	@printf "  make down             # stop services\n"
	@printf "  make restart          # restart services\n"
	@printf "  make logs             # follow logs for the '%s' service\n" "$(PHP_SERVICE)"
	@printf "  make composer-install # run composer install inside the '%s' service\n" "$(PHP_SERVICE)"
	@printf "  make phpunit          # run phpunit tests inside the '%s' service\n" "$(PHP_SERVICE)"
	@printf "  make console ARGS=\"command\"  # run symfony console inside the '%s' service\n" "$(PHP_SERVICE)"


# Start in background
up:
	@echo "Starting stack (detached) with: $(ENV_VARS)"
	@$(ENV_VARS) $(COMPOSE) up -d --wait

# Stop and remove containers
down:
	@echo "Stopping stack"
	@$(COMPOSE) down

sync-fork:
	@echo "Syncing fork with upstream"
	@curl -sSL https://raw.githubusercontent.com/coopTilleuls/template-sync/main/template-sync.sh | sh -s -- https://github.com/api-platform/api-platform

restart: down up

# Follow logs for the PHP/API service
logs:
	@$(COMPOSE) logs -f --tail=200 $(PHP_SERVICE)

# Run composer install inside the api container
composer-install:
	@$(COMPOSE) exec -T $(PHP_SERVICE) composer install --no-interaction --prefer-dist --optimize-autoloader

# Run phpunit inside the api container (assumes ./bin/phpunit exists in container)
phpunit:
	@$(COMPOSE) exec -T $(PHP_SERVICE) ./bin/phpunit

# Run symfony console inside the api container; pass the command via ARGS variable.
# Example: make console ARGS="cache:clear"
console:
	@$(COMPOSE) exec -T $(PHP_SERVICE) php bin/console $(ARGS)
