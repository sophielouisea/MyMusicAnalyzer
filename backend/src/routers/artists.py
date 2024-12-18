import os
from typing import Annotated
from fastapi import APIRouter, Header, Response, status
from utils.spotify_handler import SpotifyHandler
from pydantic import BaseModel

router = APIRouter(prefix="/artists", tags=["Artists"])


TMP_VALS = {
    "medium_term": [
        {
            "name": "Frank Ocean",
            "id": "aa",
            "image": "aa",
            "popularity": 87,
            "personal_ranking": 1,
            "genres": ["pop", "r&b"]
        },
        {
            "name": "Frank Ocean",
            "id": "aa",
            "image": "aa",
            "popularity": 87,
            "personal_ranking": 2,
            "genres": ["pop", "r&b"]
        },
        {
            "name": "Frank Ocean",
            "id": "aa",
            "image": "aa",
            "popularity": 87,
            "personal_ranking": 3,
            "genres": ["pop", "r&b"]
        },
        {
            "name": "Frank Ocean",
            "id": "aa",
            "image": "aa",
            "popularity": 87,
            "personal_ranking": 4,
            "genres": ["pop", "r&b"]
        },
        {
            "name": "Frank Ocean",
            "id": "aa",
            "image": "aa",
            "popularity": 87,
            "personal_ranking": 5,
            "genres": ["pop", "r&b"]
        },
    ]
}

@router.get("/ping")
def artists_ping():
    return "Ok"

@router.get("/top_artists")
def get_top_artists(token: Annotated[str | None, Header()], response: Response):
    if token:
        # spotify = SpotifyHandler(token)
        # return spotify.get_top_artists()
        return TMP_VALS
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED
