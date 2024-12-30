from typing import Annotated
from fastapi import APIRouter, Header, Response, status
from utils.spotify_handler import SpotifyHandler
from utils.utils import get_decade_counts


router = APIRouter(prefix="/tracks", tags=["Tracks"])


@router.get("/top_tracks")
def get_top_tracks(token: Annotated[str | None, Header()], response: Response):
    """
    Get a Spotify user's top 20 tracks, over the short, medium and long term
    (1, 6 and 12 months, respectively).

    The request header must contain user's Spotify access token (expires every
    hour).
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
    Get a Spotify user's top played decades, over the short, medium and long
    term (1, 6 and 12 months, respectively).

    The request header must contain user's Spotify access token (expires every
    hour).
    """
    if token:
        spotify = SpotifyHandler(token)
        return spotify.get_top(
            "tracks",
            processing_function=get_decade_counts,
            limit=50,
            format_items=False
        )
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED
