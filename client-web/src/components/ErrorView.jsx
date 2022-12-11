import React from "react";

const ErrorView = (props) => {
    const error = props.error;

    console.log(error);

    //log a bug
    //ask for help

    return <div>{error.toString()}</div>;
};

export default ErrorView;
