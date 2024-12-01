import React, { useEffect, useState } from 'react';
import Button from './Button';
import { Navigate, useNavigate } from 'react-router-dom';

type Props = {
  children: string | React.JSX.Element | React.JSX.Element[] | (() => React.JSX.Element)
}

const checkIsAuthenticated = async () => {
  const token = window.localStorage.getItem("spotifyToken");
  console.log("checkIsAuthenticated - token:", token)
  const tokenExpiry = window.localStorage.getItem("spotifyTokenExpiry");
  console.log("checkIsAuthenticated - tokenExpiry:", tokenExpiry)
  //  && tokenExpiry && Number(tokenExpiry) > Date.now()
  if (token) {
    return true;
  }
  return false;
}

function AuthProvider({ children }: Props): React.JSX.Element {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    checkIsAuthenticated().then(res => setIsAuth(res));
  }, [])

  const redirectToLogin = () => {
    //window.location.href = "http://localhost:5173/login"
    console.log("redirect")
    return null;
  }

  const stayHere = () => {
    console.log("clicked")
  }

  const buttonLabel = isAuth ? "Go to App" : "Log in";
  const buttonHandler = isAuth ? stayHere() : redirectToLogin();


  return (
    <>
      <div> STORING: {window.localStorage.getItem("spotifyTokenExpiry")}</div>
      <Button onClick={}>{buttonLabel}</Button>
    </>
  )
}

export default AuthProvider;
