import base64
from datetime import datetime, timedelta
import os
import requests
from typing import Annotated

from fastapi import APIRouter, Header, HTTPException, Response
from pydantic import BaseModel

from utils.spotify_handler import SpotifyHandler


router = APIRouter(prefix="/user", tags=["User"])


class SpotifyCallbackRequest(BaseModel):
    code: str


@router.post("/auth")
def auth(request: SpotifyCallbackRequest):
    """
    Get the user's Spotify access token and expiry timestamp for the 'My Music
    Analyzer' app.

    The body of the request must contain the authorization code from the
    auth flow initiated in the frontend.
    """
    print("Requesting https://accounts.spotify.com/api/token...")
    authorization = f"{os.environ.get('CLIENT_ID')}:{os.environ.get('CLIENT_SECRET')}"
    sample_string_bytes = authorization.encode("ascii")
    base64_bytes = base64.b64encode(sample_string_bytes)
    base64_string = base64_bytes.decode("ascii")

    expires_time = datetime.now() + timedelta(hours=1)
    expires_timestamp = str(int(expires_time.timestamp()))

    response = requests.post(
        "https://accounts.spotify.com/api/token",
        headers={
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": f"Basic {base64_string}"
        },
        data={
            "grant_type": "authorization_code",
            "code": request.code,
            "redirect_uri": os.environ.get("REDIRECT_URI"),
        }
    )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail=response.json()
        )

    token_info = response.json()
    token_info["expires_at"] = expires_timestamp
    return token_info


@router.get("/details")
def user_details(token: Annotated[str | None, Header()], response: Response):
    """
    Get a user's Spotify user details.

    The request header must contain user's Spotify access token (expires every
    hour).
    """
    spotify = SpotifyHandler(token)
    response = spotify.get_user_details()
    return response
