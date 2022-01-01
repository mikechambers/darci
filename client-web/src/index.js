import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './app';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayerSummaryView from "./routes/player_summary_view";
import ActivityDetailView from "./routes/activity_detail_view";
import HomeView from "./routes/home_view";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index path="/" element={<HomeView />} />
          <Route path="player" element={<PlayerSummaryView />} />
          <Route path="activity" element={<ActivityDetailView />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode >,
  document.getElementById('root')
);
