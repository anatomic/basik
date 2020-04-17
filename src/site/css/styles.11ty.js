const fs = require("fs").promises;
const path = require("path");
const postcss = require("postcss");

const FILENAME = "styles.css";

module.exports = class {
  async data() {
    const filepath = path.join(__dirname, `../__includes/postcss/${FILENAME}`);
    return {
      permalink: `css/${FILENAME}`,
      filepath,
      rawCss: await fs.readFile(filepath)
    };
  }

  async render({ filepath, rawCss }) {
    return await postcss([
      require("postcss-import"),
      require("precss"),
      require("tailwindcss"),
      require("autoprefixer"),
      require("postcss-color-mix"),
      require("cssnano")
    ]).process(rawCss, { from: filepath }).then(result => result.css);
  }
};
