import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { calculatePercent } from "../../../utils";

const RefreshStatus = (props) => {
  const lastUpdate = props.lastUpdate;
  const refreshInterval = props.refreshInterval;

  const [elapsedTime, setElapsedTime] = useState();
  useEffect(() => {
    if (!lastUpdate) {
      return;
    }

    /*
    const interval = setInterval(() => {
      let t = Date.now() - lastUpdate.getTime();
      setElapsedTime(t);
    }, 100);
    return () => {
      clearInterval(interval);
    };
    */

    let lastUpdateMs = lastUpdate.getTime();
    const frameCallback = (elapsed) => {
      let t = Date.now() - lastUpdateMs;

      setElapsedTime(t);

      let totalTime = refreshInterval;
      if (t >= totalTime) {
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

  let elementStyle = {
    padding: "24px",
  };
  let barContainerStyle = {
    width: "500px",
    backgroundColor: "#FFFFFF22",
  };

  let barStyle = {
    width: `${percent}%`,
    backgroundColor: "#FFFFFF88",
    height: "5px",
  };

  let timeElapsedStyle = {
    font: "var(--font-progress)",
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
