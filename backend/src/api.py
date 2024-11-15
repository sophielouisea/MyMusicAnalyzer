import os
from fastapi import FastAPI, responses
from fastapi.middleware.cors import CORSMiddleware

api = FastAPI()

api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:*/"],
    allow_methods=["*"],
    allow_credentials=True,
    allow_headers=["*"]
)

@api.get("/", include_in_schema=False)
def index():
    return responses.RedirectResponse(url="/docs")

@api.get("/ping")
def get_ping(user_name: str):
    return f"Hello {user_name}"
