# ================================
# JobHunt Pro - Makefile
# ================================

.PHONY: help install dev build start test lint docker-build docker-run docker-stop clean

# Default target
help:
	@echo "JobHunt Pro - Available Commands"
	@echo "================================="
	@echo ""
	@echo "Development:"
	@echo "  make install      - Install dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make start        - Start production server"
	@echo ""
	@echo "Testing:"
	@echo "  make test         - Run tests"
	@echo "  make test-watch   - Run tests in watch mode"
	@echo "  make test-cov     - Run tests with coverage"
	@echo "  make lint         - Run linter"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-build - Build Docker image"
	@echo "  make docker-run   - Run Docker container"
	@echo "  make docker-stop  - Stop Docker container"
	@echo "  make docker-dev   - Run development container"
	@echo "  make docker-logs  - View container logs"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean        - Clean build artifacts"
	@echo "  make deps-update  - Update dependencies"

# --------------------------------
# Development Commands
# --------------------------------

install:
	npm ci

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

# --------------------------------
# Testing Commands
# --------------------------------

test:
	npm test

test-watch:
	npm run test:watch

test-cov:
	npm run test:coverage

lint:
	npm run lint

lint-fix:
	npm run lint -- --fix

typecheck:
	npx tsc --noEmit

# --------------------------------
# Docker Commands
# --------------------------------

docker-build:
	docker build -t jobhunt-pro:latest .

docker-run:
	docker run -d -p 3000:3000 --name jobhunt-pro jobhunt-pro:latest

docker-stop:
	docker stop jobhunt-pro && docker rm jobhunt-pro

docker-dev:
	docker-compose --profile dev up --build

docker-prod:
	docker-compose up --build -d

docker-logs:
	docker logs -f jobhunt-pro

docker-shell:
	docker exec -it jobhunt-pro /bin/sh

docker-clean:
	docker-compose down -v --rmi local

# --------------------------------
# Utility Commands
# --------------------------------

clean:
	rm -rf .next
	rm -rf node_modules
	rm -rf coverage
	rm -rf .turbo

deps-update:
	npm update
	npm audit fix

deps-check:
	npm outdated

# --------------------------------
# CI/CD Commands
# --------------------------------

ci-install:
	npm ci --prefer-offline --no-audit

ci-test:
	npm test -- --ci --coverage --reporters=default

ci-build:
	NODE_ENV=production npm run build

# --------------------------------
# Release Commands
# --------------------------------

release-patch:
	npm version patch
	git push --follow-tags

release-minor:
	npm version minor
	git push --follow-tags

release-major:
	npm version major
	git push --follow-tags
