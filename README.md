# SW Creators

Production-grade Next.js (App Router) site for the SW Creators social talent agency roster.

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
npm install
```

## Local Development

```bash
npm run dev
```

Visit http://localhost:3000.

## Quality

```bash
npm run lint
```

(The first run of `next lint` may prompt you to select a config. Choose `Strict` when prompted.)

## Production Build

```bash
npm run build
npm run start
```

## SEO Assets

```bash
npm run sitemap
```

Generates `sitemap.xml` and `robots.txt` in `public/`.

## Deployment

1. Push to a Git repository.
2. Import the repository in Vercel.
3. Framework preset: **Next.js**. Use `npm run build`.
4. Set custom domain and run `npm run sitemap` in a pre-deploy step if required.
