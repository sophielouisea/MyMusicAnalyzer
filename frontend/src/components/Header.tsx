import { RootState } from "@/state/store";
import React from "react";
import { useSelector } from "react-redux";

const Header = (): React.JSX.Element => {
  const userName = useSelector(
    (state: RootState) => state.userSession.data.userName,
  );

  return (
    <header className="header">
      <h1>My Music Analyser</h1>
      <div className="header-user-button" style={{ textAlign: "center" }}>
        {userName}
      </div>
    </header>
  );
};

export default Header;
