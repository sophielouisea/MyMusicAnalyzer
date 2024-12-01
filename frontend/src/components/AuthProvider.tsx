import React from 'react';
import { Navigate } from 'react-router-dom';

const checkIsAuthenticated = () => {
  const token = window.localStorage.getItem("spotifyToken");
  const tokenExpiry = window.localStorage.getItem("spotifyTokenExpiry");

  if (token && tokenExpiry && Number(tokenExpiry) > Date.now()) {
    return true;
  }
  return false;
}

function AuthProvider({ children }): React.JSX.Element {
  if (checkIsAuthenticated()) {
    return children;
  } else {
    return <Navigate to="/loading" />;
  }
}

export default AuthProvider;
