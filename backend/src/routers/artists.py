from typing import Annotated
from fastapi import APIRouter, Header, Response, status
from utils.spotify_handler import SpotifyHandler
from utils.utils import get_popularity_summary

router = APIRouter(prefix="/artists", tags=["Artists"])


@router.get("/ping")
def artists_ping():
    return "Ok"


@router.get("/top_artists")
def get_top_artists(token: Annotated[str | None, Header()], response: Response):
    if token:
        spotify = SpotifyHandler(token)
        return spotify.get_top("artists", limit=20)
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED


@router.get("/popularity")
def get_popularity(token: Annotated[str | None, Header()], response: Response):
    if token:
        spotify = SpotifyHandler(token)
        return spotify.get_top(
            "artists",
            processing_function=get_popularity_summary,
            limit=50
        )
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED

@router.get("/top_artists_raw")
def get_top_artists_raw(token: Annotated[str | None, Header()], response: Response):
    if token:
        spotify = SpotifyHandler(token)
        return spotify._get("me/top/artists", limit=2, time_range="short_term")
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED
