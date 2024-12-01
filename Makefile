.PHONY: run-api
run-api:
	set -a; source dev.config; echo "Running API in environment:" $$ENV; uvicorn backend.src.api:api --port 8000 --reload

.PHONY: check-frontend
check-frontend:
	cd frontend/ && tsc -b && vitest run && yarn prettier

.PHONY: check-backend
check-backend:
	cd backend/ && pytest && ruff format
