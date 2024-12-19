import requests

class SpotifyHandler:

    def __init__(self, token: str):
        self._token = token

    def authenticate(self):
        raise NotImplementedError()

    def get_top_artists(self, limit: int = None, time_range: str = None):
        response = self._get("me/top/artists", limit=limit, time_range=time_range)
        return self.format_items(response)

    def get_top_tracks(self, limit: int = None, time_range: str = None):
        response = self._get("me/top/tracks", limit=limit, time_range=time_range)
        return self.format_items(response)

    def get_user_details(self):
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
        return response.json()

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
    def format_track_item(item: dict, rank: int):
        filtered_keys = ["name", "id", "genres", "popularity", "artists"] # TODO add image?
        return {
            "id": item["id"],
            "name": item["name"],
            "artist": item["artists"][0]["name"],
            "popularity": item["popularity"],
            "image": item["album"]["images"][2]["url"],
            "personal_ranking": rank
        }
