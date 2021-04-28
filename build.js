/* eslint-disable-next-line import/no-extraneous-dependencies */
const fs = require("fs-extra");
const { compile } = require("./sassfuncs");

async function build() {
  // compile sass
  await compile({ entryFile: "./scss/styles.scss", outDir: "./dist" });
  // copy fonts
  await fs.copy("./scss/fonts", "./dist/fonts");
}

build().then(() => {
  process.exit();
});
