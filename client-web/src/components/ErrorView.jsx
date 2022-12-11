import React, { useState } from "react";
import {
    DestinyApiDisabledError,
    DestinyApiResponseError,
} from "../core/errors";
import Icon, { CHEVRONS_DOWN } from "./Icon";

const rootStyleBase = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
};

const outputStyle = {
    width: "100%",
    height: 200,
    background: "none",
    color: "white",
    border: "none",
    overflowY: "scroll",
};

const headerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
};

const expandedStyle = {
    background: "var(--color-list-item-background)",
    borderRadius: "var(--radius-border)",
    padding: 8,
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
        apiMessage = `Status : ${error.status}\nCode : ${error.code}\nURL: ${error.url}\n-----------`;
    }

    const rootStyle = {
        ...rootStyleBase,
        opacity: expanded ? 1 : 0.5,
    };

    return (
        <div style={rootStyle}>
            <div>
                <div
                    style={headerStyle}
                    className="subsection_header underline"
                >
                    <div>{error.constructor.name}</div>
                    <div onClick={onExpandedClick} className="link icon_link">
                        <Icon icon={CHEVRONS_DOWN} width="14" />
                    </div>
                </div>
                <div className="overflow">{error.message}</div>
            </div>

            {expanded && (
                <div style={expandedStyle}>
                    <textarea style={outputStyle} readOnly={true}>
                        {`${apiMessage}\n${error.stack.toString()}\n${
                            error.constructor.name
                        }\n${error.message}`}
                    </textarea>
                </div>
            )}
        </div>
    );
};

export default ErrorView;
