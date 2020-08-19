module.exports = config => {

  config.addPassthroughCopy("src/site/img");
  config.addPassthroughCopy("src/site/js");
  config.addPassthroughCopy("src/site/css");

  return {
    dir: {
      input: "src/site",
      includes: "src/site/__includes",
      output: "tmp"
    }
  }
}
