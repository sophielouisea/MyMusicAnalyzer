import { AppDispatch, RootState } from '@/state/store';
import { setVisibleDownloadSummaryModal } from '@/state/viewsSlice';
import { Dialog } from 'primereact/dialog';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SummaryCard = () => {
  return (
    <div className="summary-card">
      <p>What I’ve has been listening to these past 6 months...</p>
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
