import { AppDispatch, RootState } from "@/state/store";
import { setVisibleDownloadSummaryModal } from "@/state/viewsSlice";
import { Dialog } from "primereact/dialog";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TopDecadesInsights from "./TopDecadesInsights";
import PopularityInsights from "./PopularityInsights";
import { Divider } from "primereact/divider";
import TopItems from "./TopItems";
import html2canvas from "html2canvas";

function DownloadSummaryModal(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const visible = useSelector(
    (state: RootState) => state.views.visibleDownloadSummaryModal,
  );

  const handleDownloadImage = async (elementId: string) => {
    const element = document.getElementById(elementId),
      canvas = await html2canvas(element as HTMLElement, {
        allowTaint: true,
        useCORS: true,
        logging: true,
      }),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "spotify_summary.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SummaryCard = () => {
    const currentDate = new Date().toLocaleString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

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
    let months = "";

    switch (timeRange) {
      case "short_term":
        months = "month";
        break;
      case "medium_term":
        months = "6 months";
        break;
      case "long_term":
        months = "12 months";
        break;
    }

    return (
      <div
        id="summary"
        className="summary-card"
        style={{ fontSize: "15px", letterSpacing: "0.8px" }}
      >
        <p style={{ fontWeight: 100, marginBottom: "1rem" }}>{currentDate}</p>
        <p>What you’ve been listening to over the past {months}...</p>
        <Divider />
        <br></br>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="summary-column">
            <TopItems items={topArtists} numItems={5} />
          </div>
          <div className="summary-column">
            <TopItems items={topTracks} numItems={5} />
          </div>
          <div className="summary-column">
            <TopItems items={topGenres} numItems={5} />
          </div>
        </div>
        <Divider />
        <br></br>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TopDecadesInsights />
          <div style={{ width: "2rem" }}></div>
          <PopularityInsights />
        </div>
      </div>
    );
  };

  return (
    <Dialog
      header=""
      visible={visible}
      onHide={() => {
        if (!visible) return;
        dispatch(setVisibleDownloadSummaryModal(false));
      }}
      className="modal"
    >
      <SummaryCard />
      <button
        className="download-summary"
        onClick={() => handleDownloadImage("summary")}
      >
        Download
      </button>
    </Dialog>
  );
}

export default DownloadSummaryModal;
