import os
from typing import Annotated

from fastapi import APIRouter, Header, Response, status

router = APIRouter(prefix="/artists", tags=["Artists"])

@router.get("/ping")
def artists_ping():
    return "Ok"

@router.get("/top_artists")
def get_top_artists(token: Annotated[str | None, Header()], response: Response):
    if token == "ksjdkns":
        return "Ok"
    else:
        response.body = "Please provide a valid token."
        response.status_code = status.HTTP_401_UNAUTHORIZED
