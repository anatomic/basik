# BASIK - Build A School In Kenya

Website for BASIK, a UK registered charity (number 1116936) working to end poverty through education in Kenya.

**Live site:** [www.basik.org.uk](https://www.basik.org.uk)

## Tech Stack

- [Eleventy v3](https://www.11ty.dev/) - Static site generator
- [Nunjucks](https://mozilla.github.io/nunjucks/) - Templating language
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [esbuild](https://esbuild.github.io/) - JavaScript bundler
- [Decap CMS](https://decapcms.org/) - Git-based content management
- [Netlify](https://www.netlify.com/) - Hosting and forms

## Getting Started

### Prerequisites

- Node.js v20 or higher
- npm

### Installation

```bash
npm ci
```

### Development

Start the development server with live reload:

```bash
npm run dev
```

This runs Eleventy with hot reload and watches for CSS/JS changes.

### Build

Build the site for production:

```bash
npm run build
```

This runs: `lint → clean → build:assets → build:site`

Output is generated in the `_site` directory.

### Linting

```bash
npm run lint
```

Uses ESLint 9 with flat config.

## Project Structure

```
basik/
├── src/
│   ├── css/
│   │   └── styles.css          # Tailwind source CSS
│   ├── js/
│   │   └── main.js             # JavaScript entry point
│   └── site/
│       ├── _includes/          # Nunjucks layouts & partials
│       │   ├── base.njk        # Base HTML layout
│       │   ├── header.njk      # Site header
│       │   ├── footer.njk      # Site footer
│       │   └── post.njk        # Blog post layout
│       ├── _data/              # Global data files
│       │   ├── settings.json   # Site settings (editable via CMS)
│       │   ├── site.js         # Build-time data
│       │   └── cacheBust.js    # Asset cache busting
│       ├── admin/              # Decap CMS
│       │   ├── index.html      # CMS entry point
│       │   └── config.yml      # CMS configuration
│       ├── blog/               # News/blog posts (Markdown)
│       ├── img/                # Images
│       ├── js/                 # Passthrough JS files
│       ├── index.njk           # Homepage
│       ├── contact.njk         # Contact form
│       ├── contact-success.njk # Form success page
│       └── news.njk            # News listing page
├── _site/                      # Built site (generated, gitignored)
├── .eleventy.js                # Eleventy configuration
├── eslint.config.js            # ESLint flat config
├── prettier.config.js          # Prettier configuration
├── netlify.toml                # Netlify build settings
└── package.json
```

## Deployment

The site is automatically deployed to **Netlify** on push to the `master` branch.

[![Netlify Status](https://api.netlify.com/api/v1/badges/e4364dfc-b432-4860-bf60-7c7afa51835d/deploy-status)](https://app.netlify.com/projects/basik/deploys)

## Content Management

Content editors can access the CMS at [www.basik.org.uk/admin](https://www.basik.org.uk/admin).

The site uses [Decap CMS](https://decapcms.org/) with Netlify Identity for authentication. Editors can manage:

- **News & Updates** - Blog posts in Markdown
- **Site Settings** - Title, description, contact email, social links

## Contact Form

The contact form uses Netlify Forms. Submissions are:
- Viewable in the Netlify dashboard
- Sent via email notification to info@basik.org.uk

## Contributing

BASIK is a volunteer-run charity. If you'd like to contribute to the website or the charity's mission, please get in touch.

## Links

- [BASIK on JustGiving](https://www.justgiving.com/basikuk)
- [BASIK on Facebook](https://www.facebook.com/BuildSchoolsEndPoverty)
- [TECDI - Tsavo East Community Development Initiative](https://tecdi.co.ke/)
