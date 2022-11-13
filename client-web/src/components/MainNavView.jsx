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

import { useNavigate } from "react-router-dom";
import PlayerConfigSelectView from "./PlayerConfigSelectView";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "var(--page-max-width)",
    gap: "var(--nav-item-gap)",

    padding: "var(--padding-content) var(--padding-page-container)",
};

const navStyle = {
    display: "flex",
    gap: "24px", //move this to css and reuse
};

const MainNavView = (props) => {
    const navigate = useNavigate();
    const onUpdate = (url) => {
        navigate(url);
    };

    return (
        <div style={rootStyle}>
            <div style={navStyle}>
                <div className="nav page" onClick={() => onUpdate("/")}>
                    DARCI
                </div>
                <div className="nav page" onClick={() => onUpdate("/search/")}>
                    SEARCH
                </div>
                <div className="nav page" onClick={() => onUpdate("/about/")}>
                    ABOUT
                </div>
            </div>
            <PlayerConfigSelectView onUpdate={onUpdate} />
            <hr className="page_section_title" />
        </div>
    );
};

export default MainNavView;
