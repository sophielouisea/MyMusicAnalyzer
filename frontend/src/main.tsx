import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./components/AuthProvider.tsx";
import Login from "./components/Login.tsx";
import SpotifyCallback from "./components/SpotifyCallback";
import { store } from "./state/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  </StrictMode>,
);
