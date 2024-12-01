import os
from fastapi import APIRouter

router = APIRouter(prefix="/trends", tags=["Listening trends"])

@router.get("/ping")
def trends_ping():
    return "Ok"
