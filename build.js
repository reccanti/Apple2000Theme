const { compile } = require("./sassfuncs");
const fs = require("fs-extra");

async function build() {
  // compile sass
  await compile({ entryFile: "./scss/styles.scss", outDir: "./dist" });
  // copy fonts
  await fs.copy("./scss/fonts", "./dist/fonts");
}

build();
