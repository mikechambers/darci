import ProgressBar from "./ProgessBar";
import ProgressDetail from "./ProgressDetail";


const ValorExperience = (props) => {

    let valor = props.valor;
    console.log(valor)

    const style = {
        width:"250px",
        display:"grid",
        gridTemplateColumns: "50px 100px 100px",
        gridTemplateRows: "25px 25px 25px 25px 25px",
        gridTemplateAreas: `
            "title tier ."
            "label_total bar_total experience_total"
            "label_next bar_next experience_next"
            "label_streak bar_streak ."
        `
    };

    return (
        <div style={style}>
            <div id="title" style={{gridArea:"title"}}>Valor</div>
            <div id="tier" style={{gridArea:"tier"}}>Mythic</div>

            <div id="label_total" style={{gridArea:"label_total"}}>Total</div>
            <div id="bar_total" style={{gridArea:"bar_total"}}>
                <ProgressBar progress={valor.progress} total={valor.total}/>
            </div>
            <div id="experience_total" style={{gridArea:"experience_total"}}>
                <ProgressDetail progress="9735" total="10000" />
            </div>

            <div id="label_next" style={{gridArea:"label_next"}}>Next</div>
            <div id="bar_next" style={{gridArea:"bar_next"}}>BAR</div>
            <div id="experience_next" style={{gridArea:"experience_next"}}>
            <ProgressDetail progress="736" total="1000" />
            </div>

            <div id="label_streak" style={{gridArea:"label_streak"}}>Streak</div>
            <div id="bar_streak" style={{gridArea:"bar_streak"}}>Bar</div>

        </div>
    );
}

export default ValorExperience;