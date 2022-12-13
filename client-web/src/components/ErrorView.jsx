import React, { useState } from "react";
import {
    DestinyApiDisabledError,
    DestinyApiResponseError,
} from "../core/errors";
import { generateId } from "../core/utils/string";
import Icon, { CHEVRONS_DOWN } from "./Icon";

const rootStyleBase = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    background: "var(--color-list-item-background)",
    borderRadius: "var(--radius-border)",
    padding: 8,
};

const outputStyle = {
    width: "100%",
    height: 200,
    background: "none",
    color: "#FFFFFF88",
    border: "none",
    overflowY: "scroll",
};

const messageStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
};

const headerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
};

const reportStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    font: "var(--font-label)",
    color: "var(--color-font)",
};

const ErrorView = (props) => {
    const error = props.error;

    const [expanded, setExpanded] = useState(false);

    const onExpandedClick = () => {
        setExpanded(!expanded);
    };

    //status code
    //stack trace
    //expand details

    let apiMessage = "";
    if (error instanceof DestinyApiResponseError) {
        apiMessage = `Status : ${error.status}\nCode : ${error.code}\n`;
    }

    if (error.url) {
        apiMessage += `URL: ${error.url}\n`;
    }

    if (apiMessage.length) {
        apiMessage += "-----------";
    }

    const rootStyle = {
        ...rootStyleBase,
    };

    const opacityStyle = {
        opacity: expanded ? 1.0 : 0.5,
    };

    const id = generateId("error_text_area");

    const onCopyClick = (e) => {
        const out = document.getElementById(id);
        navigator.clipboard.writeText(out.value);
    };

    const iconClassNames = ["link", "icon_link"];

    if (expanded) {
        iconClassNames.push("flip_icon");
    }

    const errorName = !!error.name ? error.name : error.name;

    return (
        <div style={rootStyle}>
            <div style={opacityStyle}>
                <div style={headerStyle}>
                    <div className="subsection_header underline">
                        <div>{errorName}</div>
                    </div>
                    <div style={messageStyle}>
                        <div className="overflow">{error.message}</div>
                        <div
                            onClick={onExpandedClick}
                            className={iconClassNames.join(" ")}
                        >
                            <Icon icon={CHEVRONS_DOWN} width="14" />
                        </div>
                    </div>
                </div>

                {expanded && (
                    <div>
                        <textarea
                            id={id}
                            style={outputStyle}
                            readOnly={true}
                            defaultValue={`${apiMessage}\n${error.stack.toString()}\n${errorName}\n${
                                error.message
                            }`}
                        ></textarea>
                        <div>&nbsp;</div>
                        <div style={reportStyle} className="label">
                            <div className="link" onClick={onCopyClick}>
                                Copy
                            </div>
                            <div>
                                Report :{" "}
                                <a
                                    href="https://discord.gg/TEDQy65hhn"
                                    className="link"
                                >
                                    Discord
                                </a>{" "}
                                |{" "}
                                <a
                                    href="https://github.com/mikechambers/darci/issues"
                                    className="link"
                                >
                                    Github
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ErrorView;
