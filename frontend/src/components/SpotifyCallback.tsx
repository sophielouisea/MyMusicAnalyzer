import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyCallback = () => {
  const API_CALLBACK_ENDPOINT = import.meta.env.API_URL + "/auth"
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (code) {
      fetch(API_CALLBACK_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('spotifyToken', data.access_token);
          localStorage.setItem('spotifyTokenExpiry', data.expires_at);
          //navigate('/');
        })
        .catch(error => console.error('Error exchanging code:', error));
    }
  }, []);

  return <div>Loading...</div>;
};

export default SpotifyCallback;
