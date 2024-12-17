import React, { useEffect } from "react";
import Card from "./Card";
import { ScrollPanel } from "primereact/scrollpanel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { getTopArtists } from "@/state/artistsSlice";

const MainContent = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const topArtists = useSelector((state: RootState) => state.artists.data);

  useEffect(() => {
    dispatch(getTopArtists());
  }, [])

  return (
    <div className="main-content">
      <ScrollPanel style={{ width: "80rem", height: "52rem" }}>
        <div className="main-scrollpanel">
          <Card title="Your top artists" items={topArtists}/>
          <Card title="Your top tracks" />
          <Card title="Your top genres" />
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
