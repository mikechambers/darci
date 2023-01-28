import React from "react";
import Icon, { CLOSE_ICON } from "./Icon";

const rootStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    padding: "var(--overlay-padding)",
    visibility: "visible",
    boxSizing: "border-box",
    backgroundColor: "#000000CC",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
};

const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    backgroundColor: "var(--color-list-item-background)",
    borderRadius: "var(--radius-border)",
    padding: "12px",
};

const buttonContainerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
};

const iconContainerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
};

const TextOutputView = (props) => {
    const value = props.value ? props.value : "";
    const onClose = props.onClose;

    const handleClose = (e) => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div style={rootStyle}>
            <div style={wrapperStyle}>
                <div style={iconContainerStyle}>
                    <div onClick={handleClose} className="link">
                        <Icon icon={CLOSE_ICON} width={16} />
                    </div>
                </div>
                <textarea
                    rows="25"
                    cols="50"
                    autoComplete="off"
                    readOnly={true}
                    value={value}
                    id="export-area"
                />
                <div style={buttonContainerStyle}>
                    <button
                        onClick={() =>
                            navigator.clipboard.writeText(
                                document.getElementById("export-area").value
                            )
                        }
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextOutputView;
