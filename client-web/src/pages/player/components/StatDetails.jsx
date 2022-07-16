import GamesDetail from "./GamesDetail";
import KillsStatDetail from "./KillsStatDetail";
import StatDetail from "./StatDetail";

import { calculateAverage } from "../../../utils";

const style = {
    display:"flex",
    flexWrap:"wrap"
};

const StatDetails = (props) => {

    const summary = props.summary;

    return(
        <div style={style}>

        <GamesDetail
          wins={summary.wins}
          losses={summary.losses}
          mercies={summary.mercies}
          activity_count={summary.activityCount}
        />

        <StatDetail
          avg={calculateAverage(summary.kills, summary.activityCount).toFixed(
            2
          )}
          total={summary.kills}
          high={summary.highestKills}
          title="Kills"
        />

        <KillsStatDetail
          total={summary.kills}
          weapons={summary.weaponKills}
          supers={summary.superKills}
          melees={summary.meleeKills}
        />

        <StatDetail
          avg={calculateAverage(summary.assists, summary.activityCount).toFixed(
            2
          )}
          total={summary.assists}
          high={summary.highestAssists}
          title="Assists"
        />

        <StatDetail
          avg={calculateAverage(
            summary.opponentsDefeated,
            summary.activityCount
          ).toFixed(2)}
          total={summary.opponentsDefeated}
          high={summary.highestOpponentsDefeated}
          title="Defeats"
        />

        <StatDetail
          avg={calculateAverage(summary.deaths, summary.activityCount).toFixed(
            2
          )}
          total={summary.deaths}
          high={summary.highestDeaths}
          title="Deaths"
        />


        </div>
    );
};

export default StatDetails;