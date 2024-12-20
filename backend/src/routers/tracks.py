import os
from typing import Annotated
from fastapi import APIRouter, Header, Response, status
from utils.spotify_handler import SpotifyHandler
from collections import Counter

router = APIRouter(prefix="/tracks", tags=["Tracks"])


def get_decade_counts(items: list[dict]):
    """
    """
    get_decade = lambda x: x["album"]["release_date"][:3] + "0"
    decade_counts =  dict(Counter([get_decade(item) for item in items["items"]]))
    sorted_counts = dict(sorted(decade_counts.items(), key=lambda x: x[1], reverse=True))
    res = [{"year": k, "counts": v} for k, v in sorted_counts.items()]
    return res


@router.get("/ping")
def tracks_ping():
    return "Ok"

@router.get("/top_tracks")
def get_top_tracks(token: Annotated[str | None, Header()], response: Response):
    """
    """
    if token:
        spotify = SpotifyHandler(token)
        return spotify.get_top("tracks")
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED

@router.get("/top_decades")
def get_top_decades(token: Annotated[str | None, Header()], response: Response):
    """
    """
    if token:
        spotify = SpotifyHandler(token)
        return spotify.get_top(
            "tracks",
            processing_function=get_decade_counts,
            limit=50,
            format=False
        )
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED
