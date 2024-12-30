import { AppDispatch, RootState } from '@/state/store';
import { setVisibleDownloadSummaryModal } from '@/state/viewsSlice';
import { Dialog } from 'primereact/dialog';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopDecadesInsights from './TopDecadesInsights';
import PopularityInsights from './PopularityInsights';
import { Divider } from 'primereact/divider';
import TopCard from './TopItems';
import TopItems from './TopItems';

const SummaryCard = () => {
  const timeRange = useSelector((state: RootState) => state.views.timeRange);
  const topArtists = useSelector(
    (state: RootState) => state.artists.data[timeRange]);
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
    <div className="summary-card" style={{fontSize: "15px"}}>
      <p>What you’ve been listening to over the past {months}...</p>
      <Divider />
      <TopItems items={topArtists} numItems={20}/>
      <Divider />
      <TopDecadesInsights />
      <Divider />
      <PopularityInsights />
      <Divider />
    </div>
  )
}

function DownloadSummaryModal(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const visible = useSelector((state: RootState) =>
    state.views.visibleDownloadSummaryModal)

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
    </Dialog>
  )
}

export default DownloadSummaryModal;
