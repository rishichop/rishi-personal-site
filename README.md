# Rishi's Personal Site

A personal portfolio/website built with React, TypeScript, and Vite.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for bundling
- **Tailwind CSS v4** for styling
- **Motion** for animations
- **Lucide React** for icons

## Getting Started

```bash
npm install
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Build for production
npm run preview   # Preview production build
```

## Docker

Multi-stage Docker build — compiles with Node, serves with Nginx.

```bash
docker build -t rishi-personal-site .
docker run -p 80:80 rishi-personal-site
```

## Hosting

Self-hosted on a **Raspberry Pi** with:

- **Cloudflare Tunnels** — exposes the site publicly without opening ports
- **Watchtower** — watches the GitHub Container Registry and automatically pulls and redeploys updated Docker images
