const sass = require("sass");
const fs = require("fs-extra");
const path = require("path");

/**
 * Don't mind me, just a tiny wrapper to
 * to make a promise interface for Dart-Sass
 */
function sassRenderAsync(sassOptions) {
  return new Promise((resolve, reject) => {
    sass.render(sassOptions, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

async function compile({ entryFile, outDir }) {
  try {
    /**
     * Step 1: make the output directory if it
     * doesn't already exist
     */
    await fs.mkdirp(path.resolve(outDir));
    /**
     * Step 2: compile the sass
     */
    const res = await sassRenderAsync({ file: entryFile });
    /**
     * Step 3: write the compiled sass to a file
     */
    const filename = path.resolve(
      outDir,
      `${path.basename(entryFile, ".scss")}.css`
    );
    await fs.promises.writeFile(filename, res.css);
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.log(err);
  }
}

module.exports = {
  compile,
};
