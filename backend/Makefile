.PHONY: run-dev
run-dev:
	set -a && source .env.dev && uvicorn src.api:api --port $$PORT --reload

.PHONY: check-backend
check-backend:
	pytest && ruff format
