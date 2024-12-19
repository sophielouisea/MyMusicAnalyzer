import os
from typing import Annotated
from fastapi import APIRouter, Header, Response, status
from utils.spotify_handler import SpotifyHandler
from pydantic import BaseModel

router = APIRouter(prefix="/artists", tags=["Artists"])

@router.get("/ping")
def artists_ping():
    return "Ok"

@router.get("/top_artists")
def get_top_artists(token: Annotated[str | None, Header()], response: Response):
    if token:
        spotify = SpotifyHandler(token)
        short_term = spotify.get_top_artists(limit=20, time_range="short_term")
        medium_term = spotify.get_top_artists(limit=20, time_range="medium_term")
        long_term = spotify.get_top_artists(limit=20, time_range="long_term")
        return {
            "short_term": short_term,
            "medium_term": medium_term,
            "long_term": long_term,
        }
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED
