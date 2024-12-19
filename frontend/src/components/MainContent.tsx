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

const MainContent = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const timeRange = useSelector((state: RootState) =>
    state.views.timeRange);
  const topArtists = useSelector((state: RootState) =>
    state.artists.data[timeRange]);
  const topTracks = useSelector((state: RootState) =>
    state.tracks.data[timeRange]);
  const topGenres = useSelector((state: RootState) =>
    state.genres.data[timeRange]);

  useEffect(() => {
    dispatch(getTopArtists());
    dispatch(getTopTracks());
    dispatch(getTopGenres());
    dispatch(getPopularity());
  }, []);

  const renderPopularityInsights = () => {
    const popularity = useSelector((state: RootState) =>
      state.popularity.data[timeRange]);

    if (popularity) {
      return (
        <>
          <p style={{fontSize: "14px", opacity: 0.5}}>
            Spotify classifies artists' popularity on a 0-100 scale.
          </p>
          <p className="p-insights">
            <b style={{opacity: 1, color:"white", fontWeight: 600}}>{JSON.stringify(popularity.average_index)}</b> is the average popularity of your most listened-to artists.
            <br style={{marginBottom: "1rem"}}></br>
            The most popular artist you listen to is <b style={{ opacity: 1, color: "white", fontWeight: 600 }}>{popularity.highest}</b>, who has
            a popularity score of <b style={{ opacity: 1, color: "white", fontWeight: 600 }}>{JSON.stringify(popularity.highest_index)}</b>.
            <br style={{ marginBottom: "1rem" }}></br>
            The least popular artist you listen to is <b style={{ opacity: 1, color: "white", fontWeight: 600 }}>{popularity.lowest}</b>, with
            a popularity score of <b style={{ opacity: 1, color: "white", fontWeight: 600 }}>{JSON.stringify(popularity.lowest_index)}</b>.
          </p>
        </>
      )
    }
    return <></>
  }

  return (
    <div className="main-content">
      <ScrollPanel style={{ width: "80rem", height: "52rem" }}>
        <div className="main-scrollpanel">
          <TopCard title="Your top artists" items={topArtists} />
          <TopCard title="Your top tracks" items={topTracks} />
          <TopCard title="Your top genres" items={topGenres} />
          <Card title="Popularity" className="card">
            {renderPopularityInsights()}
          </Card>
          <Card title="Trends" className="card-double">
            <p style={{
              opacity: 0.5,
              fontSize: 14,
              textAlign: "left",
              marginLeft: "1rem"
            }}>
              Coming soon.
            </p>
          </Card>
        </div>
      </ScrollPanel>
    </div>
  );
};

export default MainContent;
