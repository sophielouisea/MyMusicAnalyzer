from fastapi import FastAPI, responses
from fastapi.middleware.cors import CORSMiddleware

from routers.artists import router as artists_router
from routers.genres import router as genres_router
from routers.tracks import router as tracks_router
from routers.user import router as user_router


api = FastAPI()


api.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:*/",
        "https://cool-vacherin-b978f6.netlify.app/"
    ],
    allow_methods=["*"],
    allow_credentials=True,
    allow_headers=["*"]
)


@api.get("/", include_in_schema=False)
def index():
    return responses.RedirectResponse(url="/docs")


@api.get("/ping")
def get_ping(user_name: str):
    """
    Test endpoint. Returns 'Ok'.
    """
    return f"Hello {user_name}"


api.include_router(router=artists_router)
api.include_router(router=genres_router)
api.include_router(router=tracks_router)
api.include_router(router=user_router)
