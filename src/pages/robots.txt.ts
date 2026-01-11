import type { APIRoute } from "astro";
import settings from "../data/settings.json";

export const GET: APIRoute = () => {
  const buildDate = new Date().toISOString().split("T")[0];

  const robotsTxt = `# robots.txt for ${settings.title}
# Generated at build time: ${buildDate}

User-agent: *
Allow: /

# Disallow admin and utility pages
Disallow: /admin/
Disallow: /contact-success/

# Sitemap location
Sitemap: ${settings.url}/sitemap-index.xml
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
