import pytest

@pytest.fixture
def raw_artist_items():
    return {
        "items": [
            {
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg"
            },
            "followers": {
                "href": None,
                "total": 35777491
            },
            "genres": [
                "conscious hip hop",
                "hip hop",
                "rap",
                "west coast rap"
            ],
            "href": "https://api.spotify.com/v1/artists/2YZyLoL8N0Wb9xBt1NhZWg",
            "id": "2YZyLoL8N0Wb9xBt1NhZWg",
            "images": [
                {
                "height": 640,
                "url": "https://i.scdn.co/image/ab6761610000e5eb39ba6dcd4355c03de0b50918",
                "width": 640
                },
                {
                "height": 320,
                "url": "https://i.scdn.co/image/ab6761610000517439ba6dcd4355c03de0b50918",
                "width": 320
                },
                {
                "height": 160,
                "url": "https://i.scdn.co/image/ab6761610000f17839ba6dcd4355c03de0b50918",
                "width": 160
                }
            ],
            "name": "Kendrick Lamar",
            "popularity": 97,
            "type": "artist",
            "uri": "spotify:artist:2YZyLoL8N0Wb9xBt1NhZWg"
            },
            {
            "external_urls": {
                "spotify": "https://open.spotify.com/artist/2h93pZq0e7k5yf4dywlkpM"
            },
            "followers": {
                "href": None,
                "total": 17068439
            },
            "genres": [
                "lgbtq+ hip hop",
                "neo soul"
            ],
            "href": "https://api.spotify.com/v1/artists/2h93pZq0e7k5yf4dywlkpM",
            "id": "2h93pZq0e7k5yf4dywlkpM",
            "images": [
                {
                "height": 640,
                "url": "https://i.scdn.co/image/ab6761610000e5ebee3123e593174208f9754fab",
                "width": 640
                },
                {
                "height": 320,
                "url": "https://i.scdn.co/image/ab67616100005174ee3123e593174208f9754fab",
                "width": 320
                },
                {
                "height": 160,
                "url": "https://i.scdn.co/image/ab6761610000f178ee3123e593174208f9754fab",
                "width": 160
                }
            ],
            "name": "Frank Ocean",
            "popularity": 89,
            "type": "artist",
            "uri": "spotify:artist:2h93pZq0e7k5yf4dywlkpM"
            }
        ],
        "total": 27,
        "limit": 2,
        "offset": 0,
        "href": "https://api.spotify.com/v1/me/top/artists?limit=2&time_range=short_term",
        "next": "https://api.spotify.com/v1/me/top/artists?offset=2&limit=2&time_range=short_term",
        "previous": None
    }


@pytest.fixture
def formatted_artist_items():
    return [
        {
            "genres": [
                "conscious hip hop",
                "hip hop",
                "rap",
                "west coast rap"
            ],
            "id": "2YZyLoL8N0Wb9xBt1NhZWg",
            "name": "Kendrick Lamar",
            "popularity": 97,
            "image": "https://i.scdn.co/image/ab6761610000f17839ba6dcd4355c03de0b50918",
            "personal_ranking": 1
        },
        {
            "genres": [
                "lgbtq+ hip hop",
                "neo soul"
            ],
            "id": "2h93pZq0e7k5yf4dywlkpM",
            "name": "Frank Ocean",
            "popularity": 89,
            "image": "https://i.scdn.co/image/ab6761610000f178ee3123e593174208f9754fab",
            "personal_ranking": 2
        }
    ]


@pytest.fixture
def raw_track_items():
    return {}


@pytest.fixture
def formatted_track_items():
    return {}
