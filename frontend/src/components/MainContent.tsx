import React, { useEffect } from "react";
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


  useEffect(() => {
    dispatch(getTopArtists());
    dispatch(getTopTracks());
    dispatch(getTopGenres());
  }, []);

  return (
    <div className="main-content">
      <ScrollPanel style={{ width: "80rem", height: "52rem" }}>
        <div className="main-scrollpanel">
          <Card title="Your top artists" items={topArtists} />
          <Card title="Your top tracks" items={topTracks} />
          <Card title="Your top genres" items={topGenres} />
          <Card />
          <Card />
          <Card />
          <div className="card" style={{ gridColumn: "1/span 3" }}>
            <div className="card-header">
              Trends
              <i className="pi pi-arrow-up-right-and-arrow-down-left-from-center icon-button"></i>
            </div>
          </div>
        </div>
      </ScrollPanel>
    </div>
  );
};

export default MainContent;
