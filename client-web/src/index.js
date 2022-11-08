import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayerView from "./screens/player/index";
import ActivityView from "./screens/activity/index";
import HomeView from "./screens/home/index";
import AboutView from "./screens/about/index";
import NoMatchView from "./screens/404/index";
import SearchView from "./screens/search";
import LatestView from "./screens/latest";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index path="/" element={<HomeView />} />
          <Route index path="/about" element={<AboutView />} />
          <Route index path="/search" element={<SearchView />} />
          <Route
            path="player/:memberId/:platformId/:classType/:mode/:momentType/:startMoment/"
            element={<PlayerView />}
          >
            <Route path=":endMoment" element={<PlayerView />} />
          </Route>
          <Route
            path="activity/:activityId/"
            element={<ActivityView />}
          ></Route>
          <Route path="latest/:memberId/" element={<LatestView />}></Route>
          <Route path="*" element={<NoMatchView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
