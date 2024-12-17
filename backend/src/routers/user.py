import base64
from datetime import datetime, timedelta
import os
import requests
from typing import Annotated

from fastapi import APIRouter, Header, HTTPException, Response, status
from pydantic import BaseModel

from utils.spotify_handler import SpotifyHandler

router = APIRouter(prefix="/user", tags=["User"])

@router.get("/ping")
def auth_ping():
    return "Ok"


class SpotifyCallbackRequest(BaseModel):
    code: str

@router.post("/auth")
def auth(request: SpotifyCallbackRequest):
    print("Requesting https://accounts.spotify.com/api/token...")

    token_url = "https://accounts.spotify.com/api/token"
    data = {
        "grant_type": "authorization_code",
        "code": request.code,
        "redirect_uri": os.environ.get("REDIRECT_URI"),
    }
    authorization = f"{os.environ.get('CLIENT_ID')}:{os.environ.get('CLIENT_SECRET')}"
    sample_string_bytes = authorization.encode("ascii")
    base64_bytes = base64.b64encode(sample_string_bytes)
    base64_string = base64_bytes.decode("ascii")
    expires_time = datetime.now() + timedelta(hours=1)
    expires_timestamp = str(int(expires_time.timestamp()))
    print(data)

    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": f"Basic {base64_string}"
    }
    response = requests.post(token_url, data=data, headers=headers)

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.json()
        )

    token_info = response.json()
    token_info["expires_at"] = expires_timestamp
    print(token_info)

    return token_info

@router.get("/details")
def user_details(token: Annotated[str | None, Header()], response: Response):
    spotify = SpotifyHandler(token)
    response = spotify.get_user_details()
    return response