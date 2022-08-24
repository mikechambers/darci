import React from "react";
import { truncate } from "../core/utils";

const EnumSelect = (props) => {
  let options = props.options;
  let selected = props.selected;
  let label = props.label;
  let onChange = props.onChange;
  let maxLabelLength = props.maxLabelLength ? props.maxLabelLength : 100;

  let handleOnChange = function (e) {
    onChange(options[e.target.selectedIndex].data);
  };

  if (!options) {
    options = [];
  }

  options = options.map((item, index) => {
    return {
      value: item.label,
      label: truncate(item.label, maxLabelLength),
      data: item,
    };
  });

  let defaultValue = "";
  if (options && options.length && props.selected) {
    const found = options.find((option) => {
      //note, label may be truncated in options
      return option.value === selected.label;
    });

    //defaultValue = found ? found.value : options[0].value;

    if (found) {
      defaultValue = found.value;
    } else {
      //if we get here it means that a default value was passed in
      //that is not in the data set (happens when we remove a season option)
      //so, we set default to the first item in the data, and then broadcast that
      //the selected item changed. But we have to wait a frame to do it
      //since we cant cause a re-render when the component is rendering.
      defaultValue = options[0].value;
      window.requestAnimationFrame(() => {
        onChange(options[0].data);
      });
    }
  }

  return (
    <div>
      <label className="form_label">{label}</label>
      <select onChange={handleOnChange} value={defaultValue}>
        {options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EnumSelect;
