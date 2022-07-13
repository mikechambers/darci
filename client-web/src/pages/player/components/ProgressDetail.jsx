
const ProgressDetail = (props) => {
    let progress = props.progress;
    let total = props.total;

    const style = {
        display:"flex",
        flexWrap:"nowrap"
    };


    return (
        <div style={style}>
            <div>{progress}</div>
            <div>/</div>
            <div>{total}</div>
        </div>
    );

}

export default ProgressDetail;