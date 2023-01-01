import React from "react";
import { ReactComponent as ChevronRight } from "../components/images/tabler/chevron-right.svg";

const gameDetailNavStyle = {
    backgroundColor: "#FFFFFFee",
    width: "10px",
    borderRadius: "0px var(--radius-border) var(--radius-border) 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
};

const chevronIconStyle = {
    color: "#000000",
    width: 16,
    height: 16,
};

const ListLinkIndicatorView = (props) => {
    const onClick = props.onClick;

    if (!onClick) {
        return <div></div>;
    }

    const onHandleClick = (e) => {
        e.stopPropagation();

        onClick();
    };

    return (
        <div style={gameDetailNavStyle} onClick={onHandleClick}>
            <ChevronRight style={chevronIconStyle} />
        </div>
    );
};

export default ListLinkIndicatorView;
