const rollup = require("rollup").rollup;
const path = require("path");

/**
 * Work out how to handle dynamic imports as part of the compilation phase for this file.
 * @type {exports}
 */
module.exports = class {
  async data() {
    return {
      permalink: "js/main.js",
      moreData: "foo"
    };
  }

  async render() {
    const bundle = await rollup({
      input: path.join(__dirname, "../__includes/js/main.js")
    });

    const { output } = await bundle.generate({
      format: "cjs"
    });

    // Can we always guarantee that the entrypoint is bundle 0? Is there a difference between assets and bundles?
    return output[0].code;
  }
};
