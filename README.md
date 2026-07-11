# IEEE ISET Bizerte Student Branch — Website

The official website for the IEEE ISET Bizerte Student Branch, built with [Next.js](https://nextjs.org). It presents the branch's chapters, executive board, events, past moments/legacy messages, and a contact form, and is exported as a static site for hosting on standard web servers.

## Tech Stack

- **[Next.js 15](https://nextjs.org)** (App Router, static export via `output: 'export'`)
- **React 19** / TypeScript
- **Tailwind CSS 4**
- **Framer Motion** for animations
- **EmailJS** for the contact form
- **Geist** font, **lucide-react** / **react-icons** for icons

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Script          | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| `npm run dev`   | Start the local dev server (Turbopack)                             |
| `npm run build` | Build and export a static site to `out/`                           |
| `npm run start` | Serve the production build (requires a non-static Next.js server)  |
| `npm run lint`  | Run ESLint                                                          |

## Project Structure

```
src/app/
├── AboutUs/                 # About Us page
├── Chapters/                 # Chapters page
├── Contact/                  # Contact page (EmailJS integration)
├── Events/                   # Events page
├── Footer/, Nav/, Loader/    # Shared layout pieces
├── components/
│   ├── Background/           # Animated gradient background
│   ├── Chapters/              # Chapters section component
│   ├── ExcutiveBoard/         # Executive board / team section
│   ├── Hero/                  # Landing hero section
│   ├── LegacyMessages/        # Legacy messages section
│   └── Moment/                 # Moments/gallery section
├── context/ThemeContext.tsx  # Light/dark theme provider
├── data/                     # Static content (contact, events, legacy, moments, team)
├── layout.tsx                # Root layout, fonts, metadata
├── page.tsx                  # Home page
└── globals.css               # Global styles

public/
├── images/                   # Team & event photos
├── logos/                    # IEEE society/affinity group logos
└── .htaccess                 # Apache routing config for the static export
```

Site content (team members, events, legacy messages, moments, contact info) is centralized in `src/app/data/` — update these files to change what's displayed without touching component code.

## Building & Deployment

This project is configured for **static export** (`next.config.ts`):

```bash
npm run build
```

This produces a static site in `out/`, ready to upload to any static host (Apache, Nginx, GitHub Pages, etc.). The included `public/.htaccess` provides routing/rewrite rules for Apache-based hosting so that page routes resolve correctly.

Because the site is statically exported, Next.js Image Optimization is disabled (`images.unoptimized: true`) and all internal routes use trailing slashes (e.g. `/Events/`).

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
