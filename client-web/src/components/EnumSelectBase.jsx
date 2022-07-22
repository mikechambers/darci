import React from "react";

const EnumSelectBase = (props) => {
  let options = props.options;
  let selected = props.selected;
  let label = props.label;
  let onChange = props.onChange;

  let handleOnChange = function (e) {
    onChange(options[e.target.selectedIndex]);
  };

  if (!options) {
    options = [];
  }

  return (
    <select
      className="nav_select"
      onChange={handleOnChange}
      value={selected}
      name={label}
      id={`${label}_select`}
    >
      {options.map((m, index) => {
        return (
          <option key={index} value={m} className="nav_option">
            {m.label}
          </option>
        );
      })}
    </select>
  );
};

export default EnumSelectBase;
