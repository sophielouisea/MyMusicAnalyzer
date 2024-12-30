import React, { useEffect } from "react";
import TopItems from "./TopItems";
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
          <Card title={"Your top artists"} className="card">
            <TopItems items={topArtists} />
          </Card>
          <Card title={"Your top tracks"} className="card">
            <TopItems items={topTracks} />
          </Card>
          <Card title={"Your top genres"} className="card">
            <TopItems items={topGenres} />
          </Card>
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
              Spotify classifies artists' popularity on a 0 (least popular) to
              100 (most popular) scale.
            </p>
            <div style={{padding: "22px", lineHeight: "25px"}}>
              <PopularityInsights />
            </div>
          </Card>
          <Card title="Your musical period" className="card-double">
            <div style={{ padding: "22px", lineHeight: "25px" }}>
              <TopDecadesInsights />
            </div>
          </Card>
        </div>
      </ScrollPanel>
    </div>
  );
};

export default MainContent;
