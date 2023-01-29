import React, { useState } from "react";
import Icon, { DOWNLOAD_ICON } from "./Icon";
import TextOutputView from "./TextOutputView";

const exportButtonStyle = {
    display: "flex",
    flexDirection: "row",
};

const ExportDataView = (props) => {
    const data = props.data;
    const title = props.title ? props.title : "Export Data";

    const [displayExport, setDisplayExport] = useState(false);

    const onClick = (e) => {
        e.preventDefault();
        setDisplayExport(!displayExport);
    };

    return (
        <div>
            <div
                style={exportButtonStyle}
                className="link"
                onClick={onClick}
                title={title}
            >
                <Icon icon={DOWNLOAD_ICON} title={title} width={18} /> export
            </div>
            {(() => {
                if (displayExport) {
                    return (
                        <TextOutputView
                            data={data}
                            onClose={() => {
                                setDisplayExport(false);
                            }}
                        />
                    );
                } else {
                    return "";
                }
            })()}
        </div>
    );
};

export default ExportDataView;
