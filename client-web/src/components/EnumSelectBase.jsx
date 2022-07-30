import React from "react";
import { NativeSelect } from "@mantine/core";
import { truncate } from "../utils";

const EnumSelectBase = (props) => {
  let options = props.options;
  let selected = props.selected;
  let label = props.label;
  let description = props.description ? props.description : "";
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
  if (props.selected) {
    const found = options.find((option) => option.label === selected.label);

    defaultValue = found ? found.label : options[0].label;
  }

  //todo: can add an icon
  return (
    <div>
      <NativeSelect
        onChange={handleOnChange}
        label={label}
        description={description}
        defaultValue={defaultValue}
        data={options}
        size="xs"
        variant="filled"
        styles={(theme) => ({
          input: { opacity: "0.8" },
          label: { color: "#ffffff", textTransform: "uppercase" },
        })}
      />
    </div>
  );
};

export default EnumSelectBase;
