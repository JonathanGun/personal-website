# Personal Website

Clean personal website built with Gatsby + React.

## Features
- Minimal dark UI
- Timeline experience section (data-driven via JSON)
- Project cards with image + tech badges
- Accessible semantic markup
- Manifest + image plugin scaffolding

## Structure
```
content/
  experience.json
  projects.json
src/
  components/Layout.tsx
  pages/index.tsx
  sections/{Hero,Experience,Projects}.tsx
  styles/global.css
```

## Getting Started
Install dependencies and start dev server.

```bash
npm install
npm run develop
```
Site will be at http://localhost:8000

## Customization
- Edit `content/*.json` to change data.
- Update theme colors in `src/styles/global.css`.
- Adjust site metadata in `gatsby-config.ts`.

## Deployment
Run `npm run build` and deploy the `public` directory to any static host (Netlify, Vercel, GitHub Pages, etc.).

## License
MIT
