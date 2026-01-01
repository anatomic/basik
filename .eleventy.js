module.exports = (config) => {
  // Passthrough copy for static assets
  config.addPassthroughCopy("src/site/img");
  config.addPassthroughCopy("src/site/js");
  config.addPassthroughCopy("src/site/css");
  config.addPassthroughCopy("src/site/admin");
  config.setServerPassthroughCopyBehavior("passthrough");

  // Set Nunjucks as the template engine for HTML files
  config.setTemplateFormats(["njk", "md", "html"]);

  // Blog/News collection - sorted by date, newest first
  config.addCollection("blog", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/site/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Date formatting filter
  config.addFilter("dateFormat", (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  // ISO date filter for datetime attributes
  config.addFilter("isoDate", (date) => {
    return new Date(date).toISOString().split("T")[0];
  });

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
