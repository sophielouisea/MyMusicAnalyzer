import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests

router = APIRouter(prefix="/auth", tags=["Authorization"])

@router.get("/ping")
def auth_ping():
    return "Ok"


class SpotifyCallbackRequest(BaseModel):
    code: str

@router.post("/")
def auth(request: SpotifyCallbackRequest):
    print("Requesting https://accounts.spotify.com/api/token...")

    token_url = "https://accounts.spotify.com/api/token"
    payload = {
        "grant_type": "authorization_code",
        "code": request.code,
        "redirect_uri": os.environ.get("REDIRECT_URI"),
        "client_id": os.environ.get("CLIENT_ID"),
        "client_secret": os.environ.get("CLIENT_SECRET"),
    }
    print(payload)
    # headers = {"Content-Type": "application/x-www-form-urlencoded"}
    # response = requests.post(token_url, data=payload, headers=headers)

    # if response.status_code != 200:
    #     raise HTTPException(
    #         status_code=response.status_code,
    #         detail=response.json()
    #     )
    # print(response.json())

    # return response.json()
