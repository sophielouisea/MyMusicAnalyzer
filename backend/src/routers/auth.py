import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import base64
from datetime import datetime, timedelta

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
    data = {
        "grant_type": "authorization_code",
        "code": request.code,
        "redirect_uri": os.environ.get("REDIRECT_URI"),
    }
    authorization = f"{os.environ.get('CLIENT_ID')}:{os.environ.get('CLIENT_SECRET')}"
    sample_string_bytes = authorization.encode("ascii")
    base64_bytes = base64.b64encode(sample_string_bytes)
    base64_string = base64_bytes.decode("ascii")
    current_time = datetime.now() + timedelta(hours=1)
    current_timestamp = str(int(current_time.timestamp()))
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
    token_info["expires_at"] = current_timestamp
    print(token_info)

    return token_info
