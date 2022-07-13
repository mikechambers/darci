import { calculatePercent } from "../../../utils";

const ProgressBar = (props) => {

    let progress = props.progress;
    let total = props.total;

    let p = calculatePercent(props.progress, props.total);

    const containterStyle = {
        width:`${p}%`,
        height:"10px",
        display:"flex",
        border: "1px solid #ffffff"
    };

    const barStyle = {
        width:"75%",
        backgroundColor:"#FF0000"
    };

    return(
        <div style={containterStyle}>
            <div style={barStyle}></div>
        </div>
    );

};

export default ProgressBar;

