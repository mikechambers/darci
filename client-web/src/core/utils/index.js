export const calculateAverage = (value, total) => {
  if (!total) {
    return 0;
  }

  return value / total;
};

export const calculatePercent = (value, total) => {
  if (!total) {
    return 0;
  }

  return (value / total) * 100.0;
};

//https://stackoverflow.com/a/1199420/10232
export const truncate = function (str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};
