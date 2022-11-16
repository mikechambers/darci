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
import PageSectionView from "../../components/PageSectionView";
import ScreenNavigationView from "../../components/ScreenNavigationView";
import PlayerCompareSearchView from "./components/PlayerCompareSearchView";
import PlayerSearchView from "./components/PlayerSearchView";

const pageContainerStyle = {
    //minWidth: "720px",
    width: "100%",
};

const gappedStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    //width: "250px",
    width: "min-content",
};

const pageLinks = [
    {
        value: "Search",
        id: "search",
    },
    {
        value: "Compare",
        id: "compare",
    },
];

const SearchView = (props) => {
    return (
        <div
            id="page_nav"
            className="page_containter"
            style={pageContainerStyle}
        >
            <div style={gappedStyle}>
                <ScreenNavigationView links={pageLinks} />

                <PageSectionView
                    id="search"
                    title="Search"
                    description="Player search"
                />

                <PlayerSearchView />

                <PageSectionView
                    id="compare"
                    title="Compare"
                    description="Player search"
                />

                <PlayerCompareSearchView />
            </div>
        </div>
    );
};

export default SearchView;
