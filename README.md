# Kiran Gautham — Portfolio

A production-grade animated developer portfolio built with Next.js 15, Three.js, Framer Motion, and GSAP. Designed to be fast, accessible, and visually sharp.

**Live site:** [my-portfolio-alpha-ochre-20.vercel.app](https://my-portfolio-alpha-ochre-20.vercel.app/)

---

## What's inside

| Section | Description |
|:--------|:------------|
| Hero | Three.js neural-network scene with floating particles, lazy-loaded on idle |
| About | Focus areas and education card |
| Skills | Animated skill bars with proficiency levels |
| Experience | Timeline of roles — internship and full-time at Sustains.ai |
| Projects | Case-study cards with GitHub links and tech tags |
| Research | Publication, achievements, certifications, leadership |
| Tech Stack | Full badge grid of tools and languages |
| GitHub Activity | Contribution graph and stats |
| Contact | Formspree-powered form with real email delivery |

---

## Tech stack

**Framework**
- Next.js 15 (App Router) — React 19 — TypeScript

**Styling & Animation**
- Tailwind CSS v4 with CSS custom properties
- Framer Motion — entrance and transition animations
- GSAP + ScrollTrigger — scroll-reveal on every section
- Lenis — smooth scroll

**3D**
- Three.js — neural network hero scene (nodes, edges, orbiting ring, particles)

**Other**
- Formspree — contact form email delivery
- next/metadata — Open Graph, Twitter card, sitemap, robots.txt
- SVG favicon — KG monogram with gradient

---

## Getting started

**Requirements:** Node 18+, pnpm

```bash
git clone https://github.com/kirangautham-82899/My-Portfolio.git
cd My-Portfolio
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

**Before deploying:**

```bash
pnpm typecheck
pnpm lint
pnpm build
```

---

## Project structure

```
app/
  layout.tsx              Root layout, metadata, fonts
  page.tsx                Entry point → PortfolioExperience
  icon.svg                Favicon

components/
  portfolio-experience.tsx   All sections — Hero through Footer
  hero-canvas.tsx            Three.js scene (lazy loaded)
  loading-screen.tsx         Boot animation
  scramble-text.tsx          Text scramble utility
  magnetic-button.tsx        Magnetic hover button
  custom-cursor.tsx          Custom cursor
  ui/button.tsx              Reusable button primitive

lib/
  portfolio-data.ts          All content — edit this to update the site
  utils.ts                   Tailwind merge helper

public/
  Kiran-Gautham-Resume.pdf   Downloadable resume
  og-image.png               Open Graph preview image
  projects/                  Project screenshots
```

---

## Updating content

Everything — projects, skills, experience, contact links, education, certifications, achievements — lives in one file:

```
lib/portfolio-data.ts
```

Edit that file and push. Vercel redeploys automatically.

---

## Deploying to Vercel

Connect the GitHub repo to Vercel and use these settings:

| Setting | Value |
|:--------|:------|
| Framework | Next.js |
| Install command | `pnpm install` |
| Build command | `pnpm build` |
| Output directory | `.next` |

---

## Contact form setup

The contact form posts to [Formspree](https://formspree.io). The endpoint is configured in `components/portfolio-experience.tsx`:

```ts
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwvdyvoq";
```

To use your own endpoint, replace the form ID with one from your Formspree account.

---

Built by [Kiran Gautham](https://github.com/kirangautham-82899) · 2026
