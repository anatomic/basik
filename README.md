# BASIK - Build A School In Kenya

Website for BASIK, a UK registered charity (number 1116936) working to end poverty through education in Kenya.

**Live site:** [www.basik.org.uk](https://www.basik.org.uk)

## Tech Stack

- [Eleventy](https://www.11ty.dev/) - Static site generator
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [esbuild](https://esbuild.github.io/) - JavaScript bundler
- [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) - Prose styling
- [@tailwindplus/elements](https://tailwindplus.com/) - UI components

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
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

Output is generated in the `_site` directory.

## Project Structure

```
basik/
├── src/
│   ├── css/
│   │   └── styles.css      # Tailwind source CSS
│   ├── js/
│   │   └── main.js         # JavaScript entry point
│   └── site/
│       ├── css/            # Compiled CSS (generated)
│       ├── js/             # Bundled JS (generated)
│       ├── img/            # Images
│       └── index.html      # Main page template
├── _site/                  # Built site (generated)
├── .eleventy.js            # Eleventy configuration
├── tailwind.config.js      # Tailwind configuration (legacy, v4 uses CSS)
└── package.json
```

## Deployment

The site is automatically deployed to **Netlify** on push to the `master` branch.

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

## Content Management

Content editors can access the CMS at [www.basik.org.uk/admin](https://www.basik.org.uk/admin).

The site uses [Decap CMS](https://decapcms.org/) (formerly Netlify CMS) with Netlify Identity for authentication.

## Contributing

BASIK is a volunteer-run charity. If you'd like to contribute to the website or the charity's mission, please get in touch.

## Links

- [BASIK on JustGiving](https://www.justgiving.com/basikuk)
- [BASIK on Facebook](https://www.facebook.com/BuildSchoolsEndPoverty)
- [TECDI - Tsavo East Community Development Initiative](https://tecdi.co.ke/)
