import markdownIt from "markdown-it";

export default (config) => {
  // Check if we're in production (Netlify sets CONTEXT=production for production deploys)
  const isProduction = process.env.CONTEXT === "production";

  // Markdown filter for rendering markdown strings in templates
  const md = markdownIt({ html: true, linkify: true });
  config.addFilter("md", (content) => {
    if (!content) return "";
    return md.render(content);
  });

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
  // In production: only show posts where published=true AND date <= now
  // In preview/dev: show all posts (including drafts and scheduled posts)
  config.addCollection("blog", (collectionApi) => {
    const now = new Date();
    return collectionApi
      .getFilteredByGlob("src/site/blog/*.md")
      .filter((post) => {
        if (isProduction) {
          // In production, post must be published AND have a past/current date
          const isPublished = post.data.published === true;
          const isDatePassed = new Date(post.data.date) <= now;
          return isPublished && isDatePassed;
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
