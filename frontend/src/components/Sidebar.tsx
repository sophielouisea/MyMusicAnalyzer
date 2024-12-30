import { AppDispatch, RootState } from "@/state/store";
import { setTimeRangeView } from "@/state/viewsSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedView = useSelector((state: RootState) => state.views.timeRange);

  const getClassName = (buttonName: string) => {
    return buttonName === selectedView
      ? "sidebar-button-selected"
      : "sidebar-button";
  };

  // TODO: implement summary download
  return (
    <div className="sidebar">
      <div>
        <button
          className={getClassName("short_term")}
          onClick={() => {
            dispatch(setTimeRangeView("short_term"));
          }}
        >
          Past month
        </button>
        <button
          className={getClassName("medium_term")}
          onClick={() => {
            dispatch(setTimeRangeView("medium_term"));
          }}
        >
          Past 6 months
        </button>
        <button
          className={getClassName("long_term")}
          onClick={() => {
            dispatch(setTimeRangeView("long_term"));
          }}
        >
          Past year
        </button>
      </div>
      <button className="download-summary" onClick={() => {}}>
        Download summary
      </button>
    </div>
  );
};

export default Sidebar;
