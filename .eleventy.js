module.exports = (config) => {
  // Passthrough copy for static assets
  config.addPassthroughCopy("src/site/img");
  config.addPassthroughCopy("src/site/js");
  config.addPassthroughCopy("src/site/css");
  config.addPassthroughCopy("src/site/admin");
  config.setServerPassthroughCopyBehavior("passthrough");

  // Set Nunjucks as the template engine for HTML files
  config.setTemplateFormats(["njk", "md", "html"]);

  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    // Use Nunjucks for HTML and Markdown processing
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
