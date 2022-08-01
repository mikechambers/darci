import { DateTime, Duration } from "luxon";
import { useEffect, useState } from "react";
import { calculatePercent } from "../../../utils";

const RefreshStatus = (props) => {
  let lastUpdate = props.lastUpdate;

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

      let totalTime = 30 * 1000;
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
  }, [lastUpdate]);

  let s = "Waiting to update";
  let percent = 0;
  if (lastUpdate) {
    let out = DateTime.fromJSDate(lastUpdate).toRelative();
    s = `Last updated ${out}`;

    let totalTime = 30 * 1000; // 30 seconds
    percent = calculatePercent(elapsedTime, totalTime);
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
