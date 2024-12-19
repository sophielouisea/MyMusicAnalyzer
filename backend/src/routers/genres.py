from collections import Counter
import os
from typing import Annotated
from fastapi import APIRouter, Header, Response, status
from utils.spotify_handler import SpotifyHandler
from pydantic import BaseModel

router = APIRouter(prefix="/genres", tags=["Genres"])

@router.get("/ping")
def artists_ping():
    return "Ok"

def format_top_genres(top_artists_list):
    all_genres = []
    for item in top_artists_list:
        all_genres.extend(item["genres"])
    top_genres = {k.title(): all_genres.count(k) for k in set(all_genres)}
    top_genres = dict(Counter(top_genres).most_common())
    top_genres_sorted = [{"personal_ranking": i+1, "name": v} for i, v in enumerate(top_genres)][:20]
    return top_genres_sorted

@router.get("/top_genres")
def get_top_genres(token: Annotated[str | None, Header()], response: Response):
    if token:
        spotify = SpotifyHandler(token)
        short_term = spotify.get_top_artists(limit=50, time_range="short_term")
        medium_term = spotify.get_top_artists(limit=50, time_range="medium_term")
        long_term = spotify.get_top_artists(limit=50, time_range="long_term")
        return {
            "short_term": format_top_genres(short_term),
            "medium_term": format_top_genres(medium_term),
            "long_term": format_top_genres(long_term),
        }
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED
