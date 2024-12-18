import os
from typing import Annotated
from fastapi import APIRouter, Header, Response, status
from utils.spotify_handler import SpotifyHandler

router = APIRouter(prefix="/tracks", tags=["Tracks"])

TMP_VALS = [
    {
        "id": "aa",
        "name": "Pyramids",
        "artist": "Frank Ocean",
        "popularity": 87,
        "personal_ranking": 1,
        "image": ""
    },
    {
        "id": "aa",
        "name": "Pyramids",
        "artist": "Frank Ocean",
        "popularity": 87,
        "personal_ranking": 1,
        "image": ""
    },
    {
        "id": "aa",
        "name": "Pyramids",
        "artist": "Frank Ocean",
        "popularity": 87,
        "personal_ranking": 1,
        "image": ""
    },
    {
        "id": "aa",
        "name": "Pyramids",
        "artist": "Frank Ocean",
        "popularity": 87,
        "personal_ranking": 1,
        "image": ""
    },
    {
        "id": "aa",
        "name": "Pyramids",
        "artist": "Frank Ocean",
        "popularity": 87,
        "personal_ranking": 1,
        "image": ""
    },
    {
        "id": "aa",
        "name": "Pyramids",
        "artist": "Frank Ocean",
        "popularity": 87,
        "personal_ranking": 1,
        "image": ""
    },
]

@router.get("/ping")
def tracks_ping():
    return "Ok"

@router.get("/top_tracks")
def get_top_artists(token: Annotated[str | None, Header()], response: Response):
    if token:
        # spotify = SpotifyHandler(token)
        # return spotify.get_top_tracks()
        return TMP_VALS
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED
