import React from "react";
import EnumSelect from "../../../../components/EnumSelect";
import Stat from "../../../../core/enums/Stat";

const options = [
    Stat.KD,
    Stat.EFFICIENCY,
    Stat.KILLS,
    Stat.DEATHS,
    Stat.ASSISTS,
    Stat.DEFEATS,
    Stat.ACTIVITY_COUNT,
    Stat.WINS,
    Stat.WIN_PERCENT,
    Stat.LOSSES,
    Stat.KILLS_GAME,
    Stat.ASSISTS_GAME,
    Stat.DEFEATS_GAME,
    Stat.DEATHS_GAME,
    Stat.MELEES,
    Stat.MELEES_GAME,
    Stat.GRENADES,
    Stat.GRENADES_GAME,
    Stat.SUPERS,
    Stat.SUPERS_GAME,
];

const StatSelect = (props) => {
    const onChange = props.onChange;
    const selected = props.selected;
    const disabled = props.disabled;
    const label = props.label;

    return (
        <EnumSelect
            label={label}
            options={options}
            onChange={onChange}
            selected={selected}
            disabled={disabled}
        />
    );
};

export default StatSelect;
