import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";
import { calculatePercent, calculateAverage } from "../../../utils/index";

const WeaponsView = (props) => {

    let weapons = (props.weapons) ? props.weapons : [];
    let maxCount = (props.maxCount) ? props.maxCount : 5;

    weapons.sort((a, b) => {
        return b.kills - a.kills;
    });

    if (weapons.length > maxCount) {
        weapons = weapons.slice(0, maxCount);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th class="left">WEAPON</th>
                    <th class="left">TYPE</th>
                    <th>GAMES</th>
                    <th>KILLS</th>
                    <th>KILLS / GAME</th>

                    <th>PRECISION</th>
                    <th>K/D</th>
                    <th>EFF</th>
                </tr>
            </thead>
            <tbody>
                {weapons.map((w, index) => {
                    return (<tr key={w.id}>
                        <td><div
                            style={{ width: 25, height: 25, borderRadius: "50%", border: "solid black 2px", backgroundSize: "cover", backgroundImage: `url(${w.item.icon})`}}>
                        </div></td>
                        <td class="left">{w.item.name}</td>
                        <td class="left">{w.item.itemSubType.toString()}</td>
                        <td>{w.activityCount}</td>
                        <td>{w.kills}</td>
                        <td>{calculateAverage(w.kills, w.activityCount).toFixed(2)}</td>
                        <td>{calculatePercent(w.precisionKills, w.kills).toFixed(2)}%</td>
                        <td>{calculateKillsDeathsRatio(w.totalGameKills, w.totalGameDeaths).toFixed(2)}</td>
                        <td>{calculateEfficiency(w.totalGameKills, w.totalGameAssists, w.totalGameDeaths).toFixed(2)}</td>
                    </tr>);
                })}
            </tbody>
        </table>
    );
}

export default WeaponsView;
