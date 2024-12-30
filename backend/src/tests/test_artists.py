from utils.utils import get_popularity_summary
from utils.spotify_handler import SpotifyHandler
from tests.fixtures import formatted_artist_items, raw_artist_items

def test_format_items(raw_artist_items, formatted_artist_items):
    spotify = SpotifyHandler("_")
    assert spotify.format_items(raw_artist_items) == formatted_artist_items


def test_get_popularity_summary(formatted_artist_items):
    assert get_popularity_summary(formatted_artist_items) == {
        "average_index": 93,
        "lowest": "Frank Ocean",
        "lowest_index": 89,
        "highest": "Kendrick Lamar",
        "highest_index": 97,
    }
