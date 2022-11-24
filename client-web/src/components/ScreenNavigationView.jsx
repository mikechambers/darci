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

import { ReactComponent as NavigationIcon } from "./images/tabler/map.svg";

const navigationIconWrapperStyle = {
    position: "sticky",
    top: 0,
};

//note, this is a bit of hack. Need to find a programtic
//way to position correctly
const navigationIconStyle = {
    strokeWidth: 1,
    width: 18,
    position: "absolute",
    top: 26,
    left: -30,
};

const onPageHomeClick = function () {
    let e = document.getElementById("page_nav");
    e.scrollIntoView({ behavior: "smooth", block: "start" });
};
const ScreenNavigationView = (props) => {
    const links = props.links;

    const elementStyle = {};

    const linkContainerStyle = {
        display: "flex",
        flexDirection: "row",
        gap: "var(--nav-item-gap)",
        justifyContent: "flex-start",
    };

    const onClick = (index) => {
        let section = document.getElementById(links[index].id);
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <React.Fragment>
            <div
                style={navigationIconWrapperStyle}
                onClick={onPageHomeClick}
                title="Return to top of page"
            >
                <NavigationIcon
                    style={navigationIconStyle}
                    className="page_nav_icon"
                />
            </div>
            <div id="s" style={elementStyle}>
                <div style={linkContainerStyle}>
                    {links.map((item, index) => {
                        return (
                            <div
                                className="nav page"
                                id={`page_view_nav_${index}`}
                                key={item.value}
                                onClick={() => onClick(index)}
                            >
                                {item.value}
                            </div>
                        );
                    })}
                </div>
            </div>
        </React.Fragment>
    );
};

export default ScreenNavigationView;
