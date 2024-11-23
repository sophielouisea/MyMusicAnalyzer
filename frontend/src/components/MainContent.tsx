import React from "react";
import Card from "./Card";
import { ScrollPanel } from "primereact/scrollpanel";

const MainContent = (): React.JSX.Element => {
  return (
    <div className="main-content">
      <ScrollPanel style={{ width: "80rem", height: "52rem" }}>
        <div className="main-scrollpanel">
          <Card title="Top artists" />
          <Card title="Top tracks" />
          <Card title="Top genres" />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </ScrollPanel>
    </div>
  );
};

export default MainContent;
