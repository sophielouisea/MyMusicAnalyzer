import os
from fastapi import APIRouter

router = APIRouter(prefix="/patterns", tags=["Listening patterns"])

@router.get("/ping")
def patterns_ping():
    return "Ok"
