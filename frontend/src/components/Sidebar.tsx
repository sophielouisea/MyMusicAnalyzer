import { AppDispatch } from "@/state/store";
import { setTimeRangeView } from "@/state/viewsSlice";
import React from "react";
import { useDispatch } from "react-redux";

const Sidebar = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="sidebar">
      <div>
        <button
          className="sidebar-button"
          onClick={() => { dispatch(setTimeRangeView("short_term"))}}
        >
          Past month
        </button>
        <button
          className="sidebar-button"
          onClick={() => { dispatch(setTimeRangeView("medium_term")) }}
        >
          Past 6 months
        </button>
        <button
          className="sidebar-button"
          onClick={() => { dispatch(setTimeRangeView("long_term")) }}
        >
          Past year
        </button>
      </div>
      <button className="enable-trends" onClick={() => {}}>
        Enable trends
      </button>
    </div>
  );
};

export default Sidebar;
