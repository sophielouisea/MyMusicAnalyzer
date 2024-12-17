import os
from typing import Annotated
from fastapi import APIRouter, Header, Response, status
from utils.spotify_handler import SpotifyHandler

router = APIRouter(prefix="/artists", tags=["Artists"])

@router.get("/ping")
def artists_ping():
    return "Ok"

@router.get("/top_artists")
def get_top_artists(token: Annotated[str | None, Header()], response: Response):
    if token:
        spotify = SpotifyHandler(token)
        return spotify.get_top_artists()
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED
