export const capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//https://stackoverflow.com/a/1199420/10232
export const truncate = function (str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};
