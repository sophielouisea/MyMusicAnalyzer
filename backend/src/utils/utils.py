import numpy as np


def get_popularity_summary(top_artists: dict):
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
