.PHONY: dev_api
dev_api:
	set -a; source dev.config; echo "Running API in environment:" $$ENV; uvicorn backend.src.api:api --port 8000 --reload
