export const filterLeaderMetrics = (arr, metric, prop) => {
  let out = arr.sort(
    (a, b) => b.metrics[metric][prop] - a.metrics[metric][prop]
  );
  out = out.filter((a) => a.metrics[metric][prop] > 0);

  out = out.map((a) => {
    return {
      player: a.player,
      stat: a.metrics[metric][prop],
    };
  });

  return out;
};
