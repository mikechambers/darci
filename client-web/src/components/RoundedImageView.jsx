import React from "react";
import ImageView from "./ImageView";

const RoundedImageView = (props) => {
    const width = props.width;
    const height = props.height;
    const image = props.image;
    const title = props.title;
    const backgroundColor = props.backgroundColor;

    return (
        <ImageView
            title={title}
            borderRadius={4}
            width={width}
            height={height}
            image={image}
            backgroundColor={backgroundColor}
        />
    );
};

export default RoundedImageView;
