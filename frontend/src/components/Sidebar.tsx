import React from "react";

const Sidebar = (): React.JSX.Element => {
  return (
    <div className="sidebar">
      <div>
        <button className="sidebar-button">Past month</button>
        <button className="sidebar-button">Past 6 months</button>
        <button className="sidebar-button">Past year</button>
      </div>
      <button className="enable-trends" onClick={() => {}}>
        Enable trends
      </button>
    </div>
  );
};

export default Sidebar;
