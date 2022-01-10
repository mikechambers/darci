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
          <Route path="player" element={<PlayerSummaryView />}>
            <Route path=":memberId" element={<PlayerSummaryView />}>
              <Route path=":platformId" element={<PlayerSummaryView />}>
                <Route path=":classType" element={<PlayerSummaryView />}>
                  <Route path=":mode" element={<PlayerSummaryView />}>
                    <Route path=":moment" element={<PlayerSummaryView />} />
                    <Route />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="activity/:activityId/" element={<ActivityDetailView />}>
            <Route path=":memberId" element={<ActivityDetailView />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />


      </Routes>
    </BrowserRouter>
  </React.StrictMode >,
  document.getElementById('root')
);
