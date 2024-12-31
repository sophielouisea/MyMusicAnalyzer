import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { checkHasValidToken, getUserDetails } from "@/state/userSessionSlice";
import { AppDispatch } from "@/state/store";
import { ProgressSpinner } from "primereact/progressspinner";

type Props = {
  children: React.ReactNode;
};

function AuthProvider({ children }: Props): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const hasValidToken = useSelector(
    (state: RootState) => state.userSession.data.hasValidToken,
  );

  useEffect(() => {
    dispatch(checkHasValidToken());
  }, []);

  useEffect(() => {
    if (hasValidToken) {
      dispatch(getUserDetails());
    }
  }, [hasValidToken]);

  useEffect(() => {
    window.localStorage.setItem("spotifyTokenExpiry", "test");
  }, [])

  const getValue = async () => {
    const tokenExpiry = await window.localStorage.getItem("spotifyTokenExpiry");
    return tokenExpiry
  }

  if (hasValidToken === false) {
    return <p>Hello!</p>
    {/* // return <Navigate to="/login" />; */}
  } else if (hasValidToken === true) {
    return <> {children} </>;
  } else {
    return (
      <ProgressSpinner className="loading-spinner" animationDuration=".5s" />
    );
  }
}

export default AuthProvider;
