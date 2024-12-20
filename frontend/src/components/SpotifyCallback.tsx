import { AppDispatch, RootState } from "@/state/store";
import { authenticateUser } from "@/state/userSessionSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

const SpotifyCallback = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.userSession.data.isAuthenticated,
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      dispatch(authenticateUser(code));
    }
  }, []);

  if (isAuthenticated) {
    navigate("/");
  }

  console.log("SpotifyCallback...");
  return (
    <ProgressSpinner className="loading-spinner" animationDuration=".5s" />
  );
};

export default SpotifyCallback;
