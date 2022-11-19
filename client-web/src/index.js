/* MIT License
 *
 * Copyright (c) 2022 Mike Chambers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
import CompareView from "./screens/compare";
import OverlayView from "./screens/overlay";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index path="/" element={<HomeView />} />
                    <Route index path="/about" element={<AboutView />} />
                    <Route index path="/search" element={<SearchView />} />
                    <Route
                        path="/overlay/:memberId/:platformId/:classType/:mode/:startMoment/:overlayType/"
                        element={<OverlayView />}
                    />
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
                    <Route
                        path="latest/:memberId/"
                        element={<LatestView />}
                    ></Route>
                    <Route
                        index
                        path="compare/:data/"
                        element={<CompareView />}
                    />
                    <Route path="*" element={<NoMatchView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
