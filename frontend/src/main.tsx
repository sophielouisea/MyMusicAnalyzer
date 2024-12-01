import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./components/AuthProvider.tsx";
import Login from './components/Login.tsx';
import SpotifyCallback from './components/SpotifyCallback';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/callback" element={<SpotifyCallback />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthProvider>
              <App />
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  </StrictMode>,
);
