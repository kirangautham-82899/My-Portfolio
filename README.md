# Kiran Gautham Portfolio

A premium animated developer portfolio for **Kiran Gautham**, built to showcase full-stack product engineering, AI/ML systems, cybersecurity projects, real-time applications, research, achievements, leadership, and resume-driven career highlights.

The site is designed as a cinematic one-page portfolio with smooth scrolling, interactive motion, a lightweight Three.js hero scene, project case-study cards, GitHub project links, resume download, and SEO-ready metadata for production deployment.

## Highlights

- Cinematic responsive portfolio experience with animated sections and polished interaction details.
- Resume-driven content for education, experience, skills, projects, certifications, publication, achievements, and leadership.
- Performance-conscious animation setup with lazy/idle loading for heavier browser-only effects.
- Project cards linked to real GitHub repositories under `kirangautham-82899`.
- Downloadable resume at `public/Kiran-Gautham-Resume.pdf`.
- SEO and social preview metadata through the Next.js App Router.
- Vercel-ready build using default Next.js deployment settings.

## Tech Stack

- **Framework:** Next.js 15, React 19, App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, custom CSS tokens
- **Animation:** Framer Motion, GSAP, Lenis
- **3D / Visuals:** Three.js
- **UI:** Radix Slot, Shadcn-style primitives, Lucide icons
- **Tooling:** ESLint, pnpm, Vercel

## Project Structure

```text
app/                         Next.js App Router pages, metadata, sitemap, robots
components/                  Portfolio sections, animation providers, UI primitives
components/ui/               Reusable button primitive
lib/                         Portfolio data and shared utilities
pages/_error.tsx             Minimal Pages Router error fallback for Next build compatibility
public/                      Resume, Open Graph image, and project screenshots
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Quality Checks

Run the same checks used before deployment:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

If `.next/types` is missing on a fresh checkout, run `pnpm build` once and then rerun `pnpm typecheck`.

## Deployment

This project is optimized for Vercel.

```bash
npx vercel
npx vercel --prod
```

Recommended Vercel settings:

- **Framework Preset:** Next.js
- **Install Command:** `pnpm install`
- **Build Command:** `pnpm build`
- **Output Directory:** `.next`

## Content Source

Most portfolio text, project metadata, social links, skill entries, and contact links live in:

```text
lib/portfolio-data.ts
```

Update that file when changing profile details, project links, achievements, contact information, or resume-facing content.

## Repository

[github.com/kirangautham-82899/My-Portfolio](https://github.com/kirangautham-82899/My-Portfolio)

## License

This portfolio is maintained by Kiran Gautham. All resume content, personal branding, and project imagery are owned by the author unless otherwise noted.
