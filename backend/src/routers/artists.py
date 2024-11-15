import os
from fastapi import APIRouter

router = APIRouter(prefix="/artists", tags=["Artists"])

@router.get("/ping")
def artists_ping():
    return "Ok"
