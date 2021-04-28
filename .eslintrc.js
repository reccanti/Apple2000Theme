module.exports = {
  extends: ["airbnb-base"],
  rules: {
    "prettier/prettier": "error",
    quotes: "off",
    "comma-dangle": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          ".eleventy.js",
          ".eslintrc.js",
          "sassfuncs.js",
          "build.js",
        ],
      },
    ],
  },
  plugins: ["prettier"],
};
