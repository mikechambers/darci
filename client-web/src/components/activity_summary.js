import { calculateAverage, calculatePercent } from "../utils";

const ActivitySummary = (props) => {

    let activityStats = props.activityStats;

    if (props.isLoading) {
        return "<div>Loading...</div>";
    }


    let summary = activityStats.summary;

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>W/L</th>
                    <th>KILLS</th>
                    <th>ASSISTS</th>
                    <th>K+A</th>
                    <th>DEATHS</th>
                    <th>KD</th>
                    <th>KD/A</th>
                    <th>EFF</th>
                    <th>SUPERS</th>
                    <th>GRENADES</th>
                    <th>MELEES</th>
                    <th>MERCY</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>TOTAL</td>
                    <td>{summary.activityCount}</td>
                    <td>{summary.kills}</td>
                    <td>{summary.assists}</td>
                    <td>{summary.opponentsDefeated}</td>
                    <td>{summary.deaths}</td>
                    <td>{summary.killsDeathsRatio.toFixed(2)}</td>
                    <td>{summary.killsDeathsAssists.toFixed(2)}</td>
                    <td>{summary.efficiency.toFixed(2)}</td>
                    <td>{summary.superKills}</td>
                    <td>{summary.grenadeKills}</td>
                    <td>{summary.meleeKills}</td>
                    <td>{summary.mercies}</td>
                </tr>
                <tr>
                    <td>HIGH</td>
                    <td>{summary.wins}-{summary.losses}</td>
                    <td>{summary.highestKills}</td>
                    <td>{summary.highestAssists}</td>
                    <td>{summary.highestOpponentsDefeated}</td>
                    <td>{summary.highestDeaths}</td>
                    <td>{summary.highestKillsDeathsRatio.toFixed(2)}</td>
                    <td>{summary.highestKillsDeathsAssists.toFixed(2)}</td>
                    <td>{summary.highestEfficiency.toFixed(2)}</td>
                    <td>{summary.highestSuperKills}</td>
                    <td>{summary.highestGrenadeKills}</td>
                    <td>{summary.highestMeleeKills}</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>PER GAME</td>
                    <td>{calculatePercent(summary.wins, summary.activityCount).toFixed()}%</td>
                    <td>{calculateAverage(summary.kills, summary.activityCount).toFixed(2)}</td>
                    <td>{calculateAverage(summary.assists, summary.activityCount).toFixed(2)}</td>
                    <td>{calculateAverage(summary.opponentsDefeated, summary.activityCount).toFixed(2)}</td>
                    <td>{calculateAverage(summary.deaths, summary.activityCount).toFixed(2)}</td>
                    <td>{summary.killsDeathsRatio.toFixed(2)}</td>
                    <td>{summary.killsDeathsAssists.toFixed(2)}</td>
                    <td>{summary.efficiency.toFixed(2)}</td>
                    <td>{calculateAverage(summary.superKills, summary.activityCount).toFixed(2)}</td>
                    <td>{calculateAverage(summary.grenadeKills, summary.activityCount).toFixed(2)}</td>
                    <td>{calculateAverage(summary.meleeKills, summary.activityCount).toFixed(2)}</td>
                    <td>{calculatePercent(summary.mercies, summary.activityCount).toFixed()}%</td>
                </tr>

            </tbody>
        </table>
    );
};

export default ActivitySummary;