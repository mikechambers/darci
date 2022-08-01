import { DateTime, Duration } from "luxon";
import { useEffect, useState } from "react";

const RefreshStatus = (props) => {
  let lastUpdate = props.lastUpdate;

  const [elapsedHuman, setElapsedHuman] = useState();
  useEffect(() => {
    if (!lastUpdate) {
      return;
    }

    const interval = setInterval(() => {
      //   /let ms = lastUpdate.getTime() - new Date().getTime();

      let out = DateTime.fromJSDate(lastUpdate).toRelative();

      //let out = d.toHuman({ listStyle: "long" });
      setElapsedHuman(out);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [lastUpdate]);

  let s = "Waiting to update";
  if (elapsedHuman) {
    s = `Last updated ${elapsedHuman}`;
  }

  return <div>{s}</div>;
};

export default RefreshStatus;
