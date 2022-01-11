import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayerView from "./pages/player/PlayerView";
import ActivityView from "./pages/activity/ActivityView";
import HomeView from "./pages/home/HomeView";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route index path="/" element={<HomeView />} />
          <Route path="player" element={<PlayerView />}>
            <Route path=":memberId" element={<PlayerView />}>
              <Route path=":platformId" element={<PlayerView />}>
                <Route path=":classType" element={<PlayerView />}>
                  <Route path=":mode" element={<PlayerView />}>
                    <Route path=":moment" element={<PlayerView />} />
                    <Route />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="activity/:activityId/" element={<ActivityView />}>
            <Route path=":memberId" element={<ActivityView />} />
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
