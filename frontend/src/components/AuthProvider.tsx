import React, { useEffect, useState } from "react";
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
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(checkHasValidToken());
  }, []);

  useEffect(() => {
    if (hasValidToken) {
      dispatch(getUserDetails());
    }
  }, [hasValidToken]);

  const pingApi = async () => {
    const apiUrl = import.meta.env.VITE_FASTAPI_URL;
    const requestConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl + "ping?user_name=sophie", requestConfig).then((res) => {
      setMessage(JSON.stringify(res.json()));
    }).catch((err) => { console.log("Error:", err)});
  }
  useEffect(() => {
    pingApi()
  }, [])

  if (hasValidToken === false) {
    return <p>Message: {message}</p>
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
