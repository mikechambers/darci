import React, { useState } from "react";
import ErrorView from "./ErrorView";
import Icon, { ALERT_ICON } from "./Icon";

const rootStyle = {
    width: 400,
    position: "absolute",
    right: "var(--padding-content)",
    top: "var(--padding-content)",
    padding: "var(--padding-content)",
    zIndex: 100,
};

const listStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
};

const iconStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
};

const ErrorContainerView = (props) => {
    const errors = props.errors;

    const [expanded, setExpanded] = useState(false);

    if (!errors.length) return "";

    const onExpandedClick = () => {
        setExpanded(!expanded);
    };

    let title = "";
    if (errors.length) {
        title = `${errors.length} Error${errors.length > 1 ? "s" : ""}`;
    }

    return (
        <div style={rootStyle}>
            <div
                onClick={onExpandedClick}
                className="link icon_link"
                style={iconStyle}
            >
                <Icon icon={ALERT_ICON} width="20" title={title} />
            </div>

            {expanded && (
                <div style={listStyle}>
                    {errors.map((e, index) => {
                        return <ErrorView error={e} key={index} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default ErrorContainerView;
