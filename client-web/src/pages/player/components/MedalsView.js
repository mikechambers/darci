

const MedalsView = (props) => {

    let medals = (props.medals) ? props.medals : [];
    let maxCount = (props.maxCount) ? props.maxCount : 5;

    medals.sort((a, b) => {
        //return b.kills - a.kills;

        if (b.info.isGold === a.info.isGold) {
            return b.count - a.count;
        }

        if (b.info.isGold && !a.info.isGold) {
            return 1;
        }

        return -1;
    });

    if (medals.length > maxCount) {
        medals = medals.slice(0, maxCount);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>MEDAL</th>
                    <th></th>
                    <th>COUNT</th>
                    <th>DESCRIPTION</th>

                </tr>
            </thead>
            <tbody>
                {medals.map((m, index) => {

                    return (<tr key={m.id}>
                        <td><img height="40" src={m.info.icon} /></td>
                        <td>{m.info.name}</td>
                        <td>{(m.info.isGold) ? "GOLD" : ""}</td>
                        <td>{m.count}</td>
                        <td>{m.info.description}</td>
                    </tr>);
                })}
            </tbody>
        </table>
    );
}

export default MedalsView;
