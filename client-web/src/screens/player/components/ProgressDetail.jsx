
const ProgressDetail = (props) => {
    let progress = props.progress;
    let total = props.total;

    const style = {
        display:"flex",
        flexWrap:"nowrap"
    };


    return (
        <div style={style}>
            <div style={{width:"45px", textAlign:"right"}}>{progress}</div>
            <div style={{width:"10px", textAlign:"center"}}>/</div>
            <div style={{width:"45px", textAlign:"left"}}>{total}</div>
        </div>
    );

}

export default ProgressDetail;