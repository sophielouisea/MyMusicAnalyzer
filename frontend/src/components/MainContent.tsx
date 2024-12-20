import React, { useEffect } from "react";
import TopCard from "./TopCard";
import Card from "./Card";
import { ScrollPanel } from "primereact/scrollpanel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { getTopArtists } from "@/state/artistsSlice";
import { getTopTracks } from "@/state/tracksSlice";
import { getTopGenres } from "@/state/genresSlice";
import { getPopularity } from "@/state/popularitySlice";
import { getDecades } from "@/state/decadesSlice";

const MainContent = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const timeRange = useSelector((state: RootState) => state.views.timeRange);
  const topArtists = useSelector(
    (state: RootState) => state.artists.data[timeRange],
  );
  const topTracks = useSelector(
    (state: RootState) => state.tracks.data[timeRange],
  );
  const topGenres = useSelector(
    (state: RootState) => state.genres.data[timeRange],
  );

  useEffect(() => {
    dispatch(getTopArtists());
    dispatch(getTopTracks());
    dispatch(getTopGenres());
    dispatch(getPopularity());
    dispatch(getDecades());
  }, []);

  const renderDecadesInsights = () => {
    const topDecades = useSelector(
      (state: RootState) => state.decades.data[timeRange],
    );

    if (topDecades) {
      return (
        <>
          <p className="p-insights">
            Your top decade is the{" "}
            <b style={{ opacity: 1, color: "white", fontWeight: 600 }}>
              {topDecades[0].year}'s
            </b>
            .<br style={{ marginBottom: "1rem" }}></br>
            The other decades you have been listening to are:
            <br></br>
            {topDecades.slice(1, topDecades.length).map((item, index) => (
              <span index={index}>
                <br></br>- The {item.year}'s (
                {Math.round((item.counts / 50) * 100)}%)
              </span>
            ))}
          </p>
        </>
      );
    }
    return <></>;
  };

  const renderPopularityInsights = () => {
    const popularity = useSelector(
      (state: RootState) => state.popularity.data[timeRange],
    );

    if (popularity) {
      return (
        <>
          <p
            style={{
              fontSize: "15px",
              opacity: 0.5,
              textAlign: "left",
              marginInline: "1.5rem",
              marginBottom: "0",
            }}
          >
            Spotify classifies artists' popularity on a 0 (least popular) to 100
            (most popular) scale.
          </p>
          <p className="p-insights">
            <b style={{ opacity: 1, color: "white", fontWeight: 600 }}>
              {JSON.stringify(popularity.average_index)}
            </b>{" "}
            is the average popularity of your most listened-to artists.
            <br style={{ marginBottom: "1rem" }}></br>
            The most popular artist you listen to is{" "}
            <b style={{ opacity: 1, color: "white", fontWeight: 600 }}>
              {popularity.highest}
            </b>
            , who has a popularity score of{" "}
            <b style={{ opacity: 1, color: "white", fontWeight: 600 }}>
              {JSON.stringify(popularity.highest_index)}
            </b>
            .<br style={{ marginBottom: "1rem" }}></br>
            The least popular artist you listen to is{" "}
            <b style={{ opacity: 1, color: "white", fontWeight: 600 }}>
              {popularity.lowest}
            </b>
            , with a popularity score of{" "}
            <b style={{ opacity: 1, color: "white", fontWeight: 600 }}>
              {JSON.stringify(popularity.lowest_index)}
            </b>
            .
          </p>
        </>
      );
    }
    return <></>;
  };

  return (
    <div className="main-content">
      <ScrollPanel style={{ width: "80rem", height: "52rem" }}>
        <div className="main-scrollpanel">
          <TopCard title="Your top artists" items={topArtists} />
          <TopCard title="Your top tracks" items={topTracks} />
          <TopCard title="Your top genres" items={topGenres} />
          <Card title="Popularity" className="card-double">
            {renderPopularityInsights()}
          </Card>
          <Card title="Your musical period" className="card-double">
            {renderDecadesInsights()}
          </Card>
        </div>
      </ScrollPanel>
    </div>
  );
};

export default MainContent;
