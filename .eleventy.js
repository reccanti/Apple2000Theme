const sass = require("sass");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");

function compileSass({ entryFile, outputDir }) {
  sass.render(
    {
      file: entryFile,
    },
    async (err, res) => {
      if (err) throw err;
      await mkdirp(path.resolve(outputDir));
      fs.writeFile(
        path.resolve(outputDir, path.basename(entryFile, ".scss") + ".css"),
        res.css,
        (err) => {
          if (err) throw err;
        }
      );
    }
  );
}

function didSassFileChange(files) {
  return !!files.find((file) => file.endsWith(".scss"));
}

module.exports = function (config) {
  /**
   * Run this initially no matter what
   */
  compileSass({
    entryFile: "./scss/styles.scss",
    outputDir: "_site/styles",
  });

  config.addWatchTarget("scss");
  config.on("beforeWatch", (changedFiles) => {
    // changedFiles is an array of files that changed
    // to trigger the watch/serve build
    // if we detect a file
    if (didSassFileChange(changedFiles)) {
      compileSass({
        entryFile: "./scss/styles.scss",
        outputDir: "_site/styles",
      });
    }
  });

  config.addPassthroughCopy("assets");
  config.addWatchTarget("assets");
};
