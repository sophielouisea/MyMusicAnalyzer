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
import TopDecadesInsights from "./TopDecadesInsights";
import PopularityInsights from "./PopularityInsights";

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

  return (
    <div className="main-content">
      <ScrollPanel style={{ width: "80rem", height: "52rem" }}>
        <div className="main-scrollpanel">
          <TopCard title="Your top artists" items={topArtists} />
          <TopCard title="Your top tracks" items={topTracks} />
          <TopCard title="Your top genres" items={topGenres} />
          <Card title="Popularity" className="card-double">
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
            <PopularityInsights />
          </Card>
          <Card title="Your musical period" className="card-double">
            <TopDecadesInsights />
          </Card>
        </div>
      </ScrollPanel>
    </div>
  );
};

export default MainContent;
