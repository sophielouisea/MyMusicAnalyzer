import { RootState } from "@/state/store";
import React from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "primereact/tooltip";

const Header = (): React.JSX.Element => {
  const userName = useSelector(
    (state: RootState) => state.userSession.data.userName,
  );

  const handleLogout = async () => {
    await window.localStorage.removeItem("spotifyToken");
    await window.localStorage.removeItem("spotifyTokenExpiry");
    location.reload();
    return true;
  };

  return (
    <header className="header">
      <h1>My Music Analyser</h1>
      {/* <Tooltip target=".header-user-button" /> */}
      <button className="logout-button" onClick={() => handleLogout()}>
        Refresh
      </button>
      <div
        className="header-user-button"
        data-pr-tooltip={userName || ""}
        data-pr-position="left"
        style={{ fontSize: "14px", cursor: "pointer" }}
      >
        {userName ? userName[0] : ""}
      </div>
    </header>
  );
};

export default Header;
