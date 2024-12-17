import os
from fastapi import APIRouter

router = APIRouter(prefix="/tracks", tags=["Tracks"])

@router.get("/ping")
def tracks_ping():
    return "Ok"
