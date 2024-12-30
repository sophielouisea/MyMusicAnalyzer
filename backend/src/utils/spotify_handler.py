import requests
from typing import Callable, Literal, Optional

class SpotifyHandler:
    def __init__(self, token: str):
        self._token = token

    def authenticate(self):
        """
        # TODO: implement auth within SpotifyHandler class
        """
        raise NotImplementedError()

    def get_top(self, type: Literal["artists", "tracks"], limit: int = 20,
                processing_function: Optional[Callable] = None,
                format_items: bool = True) -> dict:
        """
        Get the top Sportify items of a given type, over the short, medium and
        long term (1, 6, and 12 months, respectively).

        Args:
            type (str): The type of record to get. Either 'artist' or 'tracks'
                (must be supported by the Spotify API).
            limit (int): The maximum number of items to return per time period.
            processing_function (Optional[Callable]): A function to apply
                additional processing to the Spotify API results. Optional.
            format_items (bool): Whether to apply formatting to each item.
                Defaults to 'True'.

        Returns:
            A dictionary containing the user's top items over the short, medium
                and long term.
        """
        response = {}
        for time_range in ["short_term", "medium_term", "long_term"]:
            response[time_range] = self._get(
                f"me/top/{type}",
                limit=limit,
                time_range=time_range
            )

            if format_items:
                response[time_range] = self.format_items(response[time_range])
            if processing_function:
                response[time_range] = processing_function(response[time_range])
        return response

    def get_user_details(self) -> dict:
        """
        Get the user's Spotify user details.
        """
        return self._get("me")

    def _check_token(self, token: str) -> bool:
        """
        # TODO: Implement function to check a giveen token's validity.
        """
        raise NotImplementedError()

    def _get(self, url_path: str, **params) -> dict:
        """
        Send an authorized GET request to the Spotify API.

        Args:
            url_path (str): The URL sub-path for the chosen Spotify endpoint.

        Returns:
            If the request is successful, the Spotify response. Else, an empty
                dictionary.
        """
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
            return {}

    def format_items(self, items: list[dict]) -> list[dict]:
        """
        Format the a list of Spotify items into the desired format, based on
        the item type specified in the data. Flattens the data and keeps only
        the relevant keys.

        Args:
            items (list[dict]): The list of items returned by the Spotify API.

        Returns:
            The formatted list of items.
        """
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
