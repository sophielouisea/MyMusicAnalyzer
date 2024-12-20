from collections import Counter
import os
from typing import Annotated
from fastapi import APIRouter, Header, Response, status
from utils.spotify_handler import SpotifyHandler
from pydantic import BaseModel

router = APIRouter(prefix="/genres", tags=["Genres"])

def format_top_genres(top_artists_list):
    all_genres = []
    for item in top_artists_list:
        all_genres.extend(item["genres"])
    top_genres = {k.title(): all_genres.count(k) for k in set(all_genres)}
    top_genres = dict(Counter(top_genres).most_common())
    top_genres_sorted = [{"personal_ranking": i+1, "name": v} for i, v in enumerate(top_genres)][:20]
    return top_genres_sorted

@router.get("/ping")
def artists_ping():
    return "Ok"

@router.get("/top_genres")
def get_top_genres(token: Annotated[str | None, Header()], response: Response):
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
