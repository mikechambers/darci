import { calculatePercent, calculateAverage } from "../../../utils/index";

const WeaponView = (props) => {

    let weapons = (props.weapons) ? props.weapons : [];
    let maxCount = props.maxCount;

    weapons.sort((a, b) => {
        return b.kills - a.kills;
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>WEAPON</th>
                    <th>TYPE</th>
                    <th>GAMES</th>
                    <th>KILLS</th>
                    <th>KILLS / GAME</th>
                    <th>PRECISION</th>
                </tr>
            </thead>
            <tbody>
                {weapons.map((w, index) => {
                    if (index >= maxCount) {
                        return;
                    }

                    return (<tr key={w.id}>
                        <td>{w.item.name}</td>
                        <td>{w.item.itemSubType.toString()}</td>
                        <td>{w.activityCount}</td>
                        <td>{w.kills}</td>
                        <td>{calculateAverage(w.kills, w.activityCount).toFixed(2)}</td>
                        <td>{calculatePercent(w.precisionKills, w.kills).toFixed(2)}%</td>
                    </tr>);
                })}
            </tbody>
        </table>
    );
}

export default WeaponView;
