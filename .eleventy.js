const { compile } = require("./sassfuncs");

function didSassFileChange(files) {
  return !!files.find((file) => file.endsWith(".scss"));
}

module.exports = function (config) {
  /**
   * Run this initially no matter what
   */
  compile({
    entryFile: "./scss/styles.scss",
    outDir: "_site/styles",
  });

  config.addWatchTarget("scss");
  config.on("beforeWatch", async (changedFiles) => {
    // changedFiles is an array of files that changed
    // to trigger the watch/serve build
    // if we detect a file
    if (didSassFileChange(changedFiles)) {
      compile({
        entryFile: "./scss/styles.scss",
        outDir: "_site/styles",
      });
    }
  });

  config.addPassthroughCopy({ "scss/fonts": "styles/fonts" });

  config.addPassthroughCopy("assets");
  config.addWatchTarget("assets");
};
