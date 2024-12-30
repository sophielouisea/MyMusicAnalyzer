from typing import Annotated
from fastapi import APIRouter, Header, Response, status
from utils.spotify_handler import SpotifyHandler
from utils.utils import format_top_genres


router = APIRouter(prefix="/genres", tags=["Genres"])


@router.get("/top_genres")
def get_top_genres(token: Annotated[str | None, Header()], response: Response):
    """
    Get a Spotify user's top 20 genres, over the short, medium and long term
    (1, 6 and 12 months, respectively).

    The request header must contain user's Spotify access token (expires every
    hour).
    """
    if token:
        spotify = SpotifyHandler(token)
        return spotify.get_top(
            "artists",
            processing_function=format_top_genres,
            limit=50
        )
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED
