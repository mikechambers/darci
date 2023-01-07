/* MIT License
 *
 * Copyright (c) 2023 Mike Chambers
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

import ListView from "../../components/ListView";
import PageSectionView from "../../components/PageSectionView";

const rootStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
};

const AboutView = (props) => {
    return (
        <div style={rootStyle}>
            <PageSectionView title="About" />

            <div>
                <p>
                    DARCI is a self hosted platform for aggregating, viewing and
                    analyzing Destiny 2 PVP stats.
                </p>
                <p>
                    {" "}
                    Its is built around the concept of players modes, and
                    moments. While the UI exposes a number of options for modes
                    and moments, it is also possible to manually enter modes and
                    moments not exposed by the UI.
                </p>

                <p>
                    DARCI is currently under development, and is{" "}
                    <a href="https://github.com/mikechambers/dcli">available</a>{" "}
                    under a{" "}
                    <a href="https://github.com/mikechambers/darci/blob/main/LICENSE.md">
                        MIT Open Source License
                    </a>
                    .
                </p>
                <p>
                    If you run into an issue, or have suggestions or feature
                    requests please{" "}
                    <a href="https://github.com/mikechambers/darci/issues">
                        log an issue
                    </a>{" "}
                    or share on the{" "}
                    <a href="https://discord.gg/TEDQy65hhn">darci discord</a>.
                </p>
                <p>
                    Created by{" "}
                    <a href="http://www.mikechambers.com">Mike Chambers</a>. [
                    <a href="https://twitter.com/mesh">Twitter</a>] | [
                    <a href="https://github.com/mikechambers/">Github</a>]
                </p>
            </div>
        </div>
    );
};

export default AboutView;
