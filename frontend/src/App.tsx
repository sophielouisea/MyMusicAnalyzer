import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./App.css";
import DownloadSummaryModal from "./components/DownloadSummaryModal";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        <MainContent />
        <DownloadSummaryModal />
      </div>
    </div>
  );
};

export default App;
