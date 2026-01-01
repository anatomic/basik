module.exports = (config) => {
  config.addPassthroughCopy("src/site/img");
  config.addPassthroughCopy("src/site/js");
  config.addPassthroughCopy("src/site/css");
  config.setServerPassthroughCopyBehavior("passthrough");

  return {
    dir: {
      input: "src/site",
      includes: "src/site/__includes",
      output: "_site",
    },
  };
};
