import os
from fastapi import APIRouter

router = APIRouter(prefix="/genres", tags=["Genres"])

@router.get("/ping")
def genres_ping():
    return "Ok"
