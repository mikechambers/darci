import React from "react";
import ErrorView from "./ErrorView";

const rootStyle = {
    width: 400,
    position: "absolute",
    right: "var(--padding-content)",
    bottom: "var(--padding-content)",
    padding: "var(--padding-content)",
};

const ErrorContainerView = (props) => {
    const errors = props.errors;

    console.log(errors);

    //log a bug
    //ask for help

    return (
        <div style={rootStyle}>
            {errors.map((e, index) => {
                return <ErrorView error={e} key={index} />;
            })}
        </div>
    );
};

export default ErrorContainerView;
