import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyCallback = () => {
  const API_CALLBACK_ENDPOINT = import.meta.env.VITE_API_AUTH_ENDPOINT;
  if (!API_CALLBACK_ENDPOINT) {
    return <>Missing API_CALLBACK_ENDPOINT</>
  }
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code) {
      fetch(API_CALLBACK_ENDPOINT + "/auth", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.access_token) {
            localStorage.setItem('spotifyToken', data.access_token);
            localStorage.setItem('spotifyTokenExpiry', data);
          }
          //navigate('/');
        })
        .catch(error => console.error('Error exchanging code:', error));
    }
  }, []);

  return <div>Loading... {API_CALLBACK_ENDPOINT} </div>;
};

export default SpotifyCallback;
