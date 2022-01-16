

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

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>MEDAL</th>
                    <th>GOLD</th>
                    <th>COUNT</th>
                    <th>DESCRIPTION</th>

                </tr>
            </thead>
            <tbody>
                {medals.map((m, index) => {
                    if (index >= maxCount) {
                        return;
                    }

                    return (<tr key={m.id}>
                        <td><img height="40" src={m.info.icon} /></td>
                        <td>{m.info.name}</td>
                        <td>{m.info.isGold.toString()}</td>
                        <td>{m.count}</td>
                        <td>{m.info.description}</td>
                    </tr>);
                })}
            </tbody>
        </table>
    );
}

export default MedalsView;
