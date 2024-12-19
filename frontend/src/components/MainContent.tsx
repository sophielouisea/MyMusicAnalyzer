import React, { useEffect } from "react";
import TopCard from "./TopCard";
import Card from "./Card";
import { ScrollPanel } from "primereact/scrollpanel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { getTopArtists } from "@/state/artistsSlice";
import { getTopTracks } from "@/state/tracksSlice";
import { getTopGenres } from "@/state/genresSlice";

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

  interface userStats {
    highest: string
    highestIndex: number
    averageIndex: number
    lowest: string
    lowestIndex: number
  }

  const renderPopularityInsights = () => {
    let popularity: userStats;
    return (
      <p>
        Spotify classifies artists' popularity on a 0-100 scale. The average
        popularity of your most listened-to artists is {popularity.averageIndex}.

        The most popular artist you listen to is {popularity.highest} who has
        a popularity score of {popularity.highestIndex}.

        The least popular artist you listen to is {popularity.lowest} who has
        a popularity score of {popularity.lowestIndex}.
      </p>
    )
  }


  useEffect(() => {
    dispatch(getTopArtists());
    dispatch(getTopTracks());
    dispatch(getTopGenres());
  }, []);

  return (
    <div className="main-content">
      <ScrollPanel style={{ width: "80rem", height: "52rem" }}>
        <div className="main-scrollpanel">
          <TopCard title="Your top artists" items={topArtists} />
          <TopCard title="Your top tracks" items={topTracks} />
          <TopCard title="Your top genres" items={topGenres} />
          <Card title="Popularity" className="card">
            Popularity stats.
          </Card>
          <Card title="Trends" className="card-double">
            <p style={{
              opacity: 0.7,
              fontSize: 15,
              textAlign: "left",
              marginLeft: "1.5rem"
            }}>
              Coming soon...
            </p>
          </Card>
        </div>
      </ScrollPanel>
    </div>
  );
};

export default MainContent;
