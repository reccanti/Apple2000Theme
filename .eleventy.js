module.exports = function (config) {
  config.addPassthroughCopy("css");
  config.addWatchTarget("css");
  config.addPassthroughCopy("assets");
  config.addWatchTarget("assets");
};
