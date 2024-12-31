import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

function PopularityInsights(): React.JSX.Element {
  const timeRange = useSelector((state: RootState) => state.views.timeRange);
  const popularity = useSelector(
    (state: RootState) => state.popularity.data[timeRange],
  );

  if (popularity) {
    return (
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
    );
  }
  return <></>;
}

export default PopularityInsights;
