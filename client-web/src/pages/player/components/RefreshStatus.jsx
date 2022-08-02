import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { calculatePercent } from "../../../utils";

const barContainerStyle = {
  width: "50%",
  backgroundColor: "#FFFFFF22",
};
const timeElapsedStyle = {
  font: "var(--font-progress)",
};

const elementStyleBase = {
  //padding: "24px",
  display: "flex",
  flexDirection: "column",
};

const barStyleBase = {
  backgroundColor: "#FFFFFF88",
  height: "2px",
};

const RefreshStatus = (props) => {
  const lastUpdate = props.lastUpdate;
  const refreshInterval = props.refreshInterval;
  const align = props.align;

  let elementAlign = "flex-start";
  if (align === "center") {
    elementAlign = "center";
  } else if (align === "right") {
    elementAlign = "flex-end";
  }

  const [elapsedTime, setElapsedTime] = useState();
  useEffect(() => {
    if (!lastUpdate) {
      return;
    }

    let lastUpdateMs = lastUpdate.getTime();
    const frameCallback = (elapsed) => {
      let t = Date.now() - lastUpdateMs;

      setElapsedTime(t);

      if (t >= refreshInterval) {
        return;
      }

      window.requestAnimationFrame(frameCallback);
    };

    const intervalId = window.requestAnimationFrame(frameCallback);

    //todo: issue is we only capture the first interval
    return () => {
      window.cancelAnimationFrame(intervalId);
    };
  }, [lastUpdate, refreshInterval]);

  let s = "Waiting to update";
  let percent = 0;
  if (lastUpdate) {
    let out = DateTime.fromJSDate(lastUpdate).toRelative();
    s = `Last updated ${out}`;

    percent = calculatePercent(elapsedTime, refreshInterval);
    percent = Math.min(percent, 100);
  }

  const elementStyle = {
    ...elementStyleBase,
    alignItems: elementAlign,
  };

  const barStyle = {
    ...barStyleBase,
    width: `${percent}%`,
  };

  return (
    <div style={elementStyle}>
      <div style={barContainerStyle}>
        <div style={barStyle}></div>
      </div>
      <div style={timeElapsedStyle}>{s}</div>
    </div>
  );
};

export default RefreshStatus;