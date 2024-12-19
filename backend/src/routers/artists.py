import os
from typing import Annotated
from fastapi import APIRouter, Header, Response, status
from utils.spotify_handler import SpotifyHandler
from pydantic import BaseModel
import numpy as np

router = APIRouter(prefix="/artists", tags=["Artists"])

def get_popularity_summary(top_artists: dict):
    artists = {artist["name"]: artist["popularity"] for artist in top_artists}
    popularity_scores = np.array(list(artists.values()))
    imax = int(np.argmax(popularity_scores))
    imin = int(np.argmin(popularity_scores))
    return {
        "average_index": int(np.mean(popularity_scores)),
        "lowest": list(artists.items())[imin][0],
        "lowest_index": list(artists.items())[imin][1],
        "highest": list(artists.items())[imax][0],
        "highest_index": list(artists.items())[imax][1],
    }

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

@router.get("/popularity")
def get_popularity(token: Annotated[str | None, Header()], response: Response):
    if token:
        spotify = SpotifyHandler(token)
        short_term = spotify.get_top_artists(limit=50, time_range="short_term")
        medium_term = spotify.get_top_artists(limit=50, time_range="medium_term")
        long_term = spotify.get_top_artists(limit=50, time_range="long_term")
        if short_term:
            res = {
                "short_term": get_popularity_summary(short_term),
                "medium_term": get_popularity_summary(medium_term),
                "long_term": get_popularity_summary(long_term),
            }
            print("RES:", res)
        else:
            res = {"message": "An error occurred."}
        return res
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED
