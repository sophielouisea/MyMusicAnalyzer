import os
from typing import Annotated
from fastapi import APIRouter, Header, Response, status
from utils.spotify_handler import SpotifyHandler

router = APIRouter(prefix="/tracks", tags=["Tracks"])


@router.get("/ping")
def tracks_ping():
    return "Ok"

@router.get("/top_tracks")
def get_top_tracks(token: Annotated[str | None, Header()], response: Response):
    if token:
        spotify = SpotifyHandler(token)
        short_term = spotify.get_top_tracks(limit=20, time_range="short_term")
        medium_term = spotify.get_top_tracks(limit=20, time_range="medium_term")
        long_term = spotify.get_top_tracks(limit=20, time_range="long_term")
        response = {
            "short_term": short_term,
            "medium_term": medium_term,
            "long_term": long_term,
        }
        print(response)
        return response
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED
