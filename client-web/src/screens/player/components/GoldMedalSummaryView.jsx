import Medal from "../../../components/Medal";
import { MEDIUM } from "../../../core/consts";

let style = {
  display: "flex",
  alignItems: "start",
  justifyContent: "start",
  flexWrap: "wrap",
};

const medal_style = {
  display: "flex",
  alignItems: "center",
  padding: "0px 20px 20px 0px",
};

const GoldMedalSummaryView = (props) => {
  let medals = props.medals ? props.medals : [];
  let max = props.max ? props.max : 5;

  medals.sort((a, b) => {
    if (b.info.isGold === a.info.isGold) {
      return b.count - a.count;
    }

    if (b.info.isGold && !a.info.isGold) {
      return 1;
    }

    return -1;
  });

  //only display gold medals
  medals = medals.filter((m) => m.info.isGold);

  if (medals.length > max) {
    medals = medals.slice(0, max);
  }

  if (medals.length === 0) {
    return "";
  }

  return (
    <div style={style}>
      {medals.map((m, index) => {
        return (
          <div style={medal_style} key={m.id}>
            <Medal medal={m.info} count={m.count} size={MEDIUM} />
            &nbsp;
            {m.info.name}
          </div>
        );
      })}
    </div>
  );
};

export default GoldMedalSummaryView;
