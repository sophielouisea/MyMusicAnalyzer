from collections import Counter
import numpy as np


def format_top_genres(top_artists: list[dict]) -> list[dict]:
    """
    Extract the top genres (by frequency) from the top artist items list.

    Args:
        top_artists (list): The list of top listened-to artists.

    Returns:
        A sorted list of dictionaries, ranking the user's top genres.
    """
    all_genres = []
    for item in top_artists:
        all_genres.extend(item["genres"])

    top_genres = {k.title(): all_genres.count(k) for k in set(all_genres)}
    top_genres = dict(Counter(top_genres).most_common())

    top_genres_sorted = []
    for i, v in enumerate(top_genres):
        top_genres_sorted.append({"personal_ranking": i+1, "name": v})

    return top_genres_sorted[:20]


def get_decade_counts(top_tracks: list[dict]) -> list[dict]:
    """
    Extract the top decades (by frequency) from the top track items list.

    Args:
        top_tracks (list): The list of top listened-to tracks.

    Returns:
        A sorted list of dictionaries, ranking the user's top decades.
    """
    get_decade = lambda x: x["album"]["release_date"][:3] + "0"
    decade_counts =  dict(Counter([
        get_decade(item) for item in top_tracks["items"]
    ]))
    sorted_counts = sorted(
        decade_counts.items(),
        key=lambda x: x[1],
        reverse=True
    )
    return [{"year": k, "counts": v} for k, v in dict(sorted_counts).items()]


def get_popularity_summary(top_artists: list[dict]) -> dict:
    """
    Get insights about the average, lowest and highest popularity index of the
    artists a user listens to. Spotify classifies artists' popularity on a 0
    (least popular) to 100 (most popular) scale.

    Args:
        top_artists (list): The list of top listened-to artists.

    Returns:
        A dictionary of summary statistics about the popularity scores of
        the user's most listened-to artists.
    """
    artists = {artist["name"]: artist["popularity"] for artist in top_artists}
    popularity_scores = np.array(list(artists.values()))

    imax = int(np.argmax(popularity_scores))
    imin = int(np.argmin(popularity_scores))

    return {
        "average_index": int(np.mean(popularity_scores)),
        "lowest": list(artists.items())[imin][0],
        "lowest_index": list(artists.items())[imin][1],
        "highest": list(artists.items())[imax][0],
        "highest_index": list(artists.items())[imax][1],
    }
