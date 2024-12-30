import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

function TopDecadesInsights(): React.JSX.Element {
  const timeRange = useSelector((state: RootState) => state.views.timeRange);
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
}

export default TopDecadesInsights;
