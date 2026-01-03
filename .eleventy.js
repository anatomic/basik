export default (config) => {
  // Check if we're in production (Netlify sets CONTEXT=production for production deploys)
  const isProduction = process.env.CONTEXT === "production";

  // Passthrough copy for static assets
  config.addPassthroughCopy("src/site/img");
  config.addPassthroughCopy("src/site/js");
  config.addPassthroughCopy("src/site/css");
  config.addPassthroughCopy("src/site/admin");
  config.setServerPassthroughCopyBehavior("passthrough");

  // Set Nunjucks as the template engine for HTML files
  config.setTemplateFormats(["njk", "md", "html"]);

  // Make isProduction available to templates for conditional rendering
  config.addGlobalData("isProduction", isProduction);

  // Blog/News collection - sorted by date, newest first
  // In production: only show posts with publish date <= now
  // In preview/dev: show all posts (including future scheduled posts)
  config.addCollection("blog", (collectionApi) => {
    const now = new Date();
    return collectionApi
      .getFilteredByGlob("src/site/blog/*.md")
      .filter((post) => {
        // In production, only include posts that are published (date <= now)
        if (isProduction) {
          return new Date(post.data.date) <= now;
        }
        // In non-production environments, show all posts
        return true;
      })
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

  // Filter to check if a date is in the future (for scheduled posts indicator)
  config.addFilter("isFutureDate", (date) => {
    return new Date(date) > new Date();
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
