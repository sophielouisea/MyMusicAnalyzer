import React, { useEffect } from 'react';
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

const redirectToSpotifyAuth = () => {
  const state = generateRandomString(16);
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_CLIENT_ID,
    response_type: "code",
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    scope: import.meta.env.VITE_SCOPES,
    state: state,
  });
  window.location.href = `${SPOTIFY_AUTH_ENDPOINT}?${params.toString()}`;
};

const generateRandomString = (length: number) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const Login = () => {
  useEffect(() => {
    redirectToSpotifyAuth();
  }, []);

  return <div>Loading... Redirecting to Spotify for login...</div>;
};

export default Login;
