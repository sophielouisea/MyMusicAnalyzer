import requests
from typing import Callable, Literal

class SpotifyHandler:

    def __init__(self, token: str):
        self._token = token

    def authenticate(self):
        raise NotImplementedError()

    def get_top(self, type: Literal["artists", "tracks"],
                processing_function: Callable = None, limit: int = 20,
                format: bool = True) -> dict:
        """
        """
        response = {}
        for time_range in ["short_term", "medium_term", "long_term"]:
            response[time_range] = self._get(
                f"me/top/{type}",
                limit=limit,
                time_range=time_range
            )
            print(response)
            if format:
                response[time_range] = self.format_items(response[time_range])
            if processing_function:
                response[time_range] = processing_function(response[time_range])
        return response

    def get_user_details(self) -> dict:
        response = self._get("me")
        return response

    def _check_token(self):
        raise NotImplementedError()

    def _get(self, url_path: str, **params) -> dict:
        response = requests.get(
            url="https://api.spotify.com/v1/" + url_path,
            headers={
                "Authorization": f"Bearer {self._token}"
            },
            params=params | {}
        )
        if response.ok:
            return response.json()
        else:
            print(response)
            return []

    def format_items(self, items: list[dict]) -> list[dict]:
        type = items['items'][0]["type"]
        if type == "artist":
            format_fct = self.format_artist_item
        elif type == "track":
            format_fct = self.format_track_item
        return [format_fct(item, rank + 1) for rank, item in enumerate(items["items"])]

    @staticmethod
    def format_artist_item(item: dict, rank: int) -> dict:
        filtered_keys = ["name", "id", "genres", "popularity"]
        formatted_artist = {k: v for k, v in item.items() if k in filtered_keys}
        formatted_artist["image"] = item["images"][2]["url"]
        formatted_artist["personal_ranking"] = rank
        return formatted_artist

    @staticmethod
    def format_track_item(item: dict, rank: int) -> dict:
        return {
            "id": item["id"],
            "name": item["name"],
            "artist": item["artists"][0]["name"],
            "popularity": item["popularity"],
            "image": item["album"]["images"][2]["url"],
            "personal_ranking": rank
        }
