<div align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,40:1a3a5c,100:0d1117&height=160&section=header&text=My%20Portfolio&fontSize=46&fontColor=58a6ff&animation=fadeIn&fontAlignY=38&desc=Next.js%2015%20%7C%20Three.js%20%7C%20Framer%20Motion%20%7C%20TypeScript&descSize=15&descAlignY=58&descColor=8b949e" />
</div>

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=15&duration=2600&pause=900&color=58A6FF&center=true&vCenter=true&width=600&lines=%24+next+build+%E2%9C%93+compiled+successfully;Animated+portfolio+%E2%80%94+Next.js+15+%2B+App+Router;Three.js+neural+network+hero+scene;GSAP+%2B+Framer+Motion+scroll+animations;Formspree+contact+%7C+SEO+ready+%7C+Vercel" alt="Typing SVG" />
</div>

<br/>

<div align="center">

[![Live](https://img.shields.io/badge/Live_Site-my--portfolio--alpha--ochre--20.vercel.app-58a6ff?style=flat-square&logo=vercel&logoColor=white&labelColor=0d1117)](https://my-portfolio-alpha-ochre-20.vercel.app/)
&nbsp;
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Kiran%20Gautham-0077B5?style=flat-square&logo=linkedin&logoColor=white&labelColor=0d1117)](https://www.linkedin.com/in/kiran-gautham-b16319358/)
&nbsp;
[![Gmail](https://img.shields.io/badge/Gmail-kirangautham82899-D14836?style=flat-square&logo=gmail&logoColor=white&labelColor=0d1117)](mailto:kirangautham82899@gmail.com)

</div>

---

## `$ cat overview.md`

A cinematic one-page developer portfolio built for performance and polish. Features a Three.js neural-network hero, GSAP scroll-reveal animations, smooth Lenis scrolling, Formspree contact form, downloadable resume, and full SEO metadata — deployed on Vercel.

```
Architecture
├── app/                  Next.js 15 App Router — pages, metadata, sitemap, robots
├── components/           Portfolio sections, animation providers, UI primitives
│   ├── hero-canvas.tsx   Three.js neural network scene (lazy/idle loaded)
│   ├── portfolio-experience.tsx  All sections — Hero, About, Skills, Projects …
│   ├── loading-screen.tsx        Branded boot animation
│   └── ui/               Shadcn-style button primitive
├── lib/
│   └── portfolio-data.ts  Single source of truth — all content lives here
└── public/               Resume PDF, OG image, project screenshots
```

---

## `$ cat tech-stack.lock`

<div align="center">

| Layer | Technology |
|:---|:---|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) ![CSS Tokens](https://img.shields.io/badge/CSS_Tokens-a78bfa?style=flat-square&logoColor=white) |
| **Animation** | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer&logoColor=white) ![GSAP](https://img.shields.io/badge/GSAP_ScrollTrigger-88CE02?style=flat-square&logo=greensock&logoColor=black) ![Lenis](https://img.shields.io/badge/Lenis_Scroll-0d1117?style=flat-square&logoColor=white) |
| **3D / Visuals** | ![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=three.js&logoColor=white) |
| **Forms** | ![Formspree](https://img.shields.io/badge/Formspree-58a6ff?style=flat-square&logoColor=white) |
| **Tooling** | ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |

</div>

---

## `$ ls features/`

```
hero/             Three.js neural-network scene — lazy loaded on idle callback
                  Node layers [3→5→5→3], glowing edges, bounding wireframe, accent ring

animations/       GSAP ScrollTrigger reveal on every section card
                  Framer Motion entrance animations on Hero and Nav
                  Lenis smooth scroll across the entire page

sections/         Hero · About · Skills · Experience · Projects
                  Research & Achievements · Tech Stack · GitHub Activity · Contact

contact/          Formspree-powered form — real email delivery, no backend needed
                  Loading state · success toast · error fallback

theming/          Dark / Light mode via next-themes + CSS custom properties
                  Magnetic buttons · tilt cards · spotlight glass effect

seo/              next/metadata — Open Graph, Twitter card, sitemap, robots.txt
                  Canonical URL, structured description, favicon (SVG monogram)
```

---

## `$ pnpm install && pnpm dev`

```bash
# Prerequisites: Node 18+, pnpm

git clone https://github.com/kirangautham-82899/My-Portfolio.git
cd My-Portfolio
pnpm install
pnpm dev
# → http://localhost:3000
```

**Quality checks (run before deploy):**

```bash
pnpm typecheck   # TypeScript strict check
pnpm lint        # ESLint
pnpm build       # Production build + static analysis
```

**Vercel deployment settings:**

```
Framework:       Next.js
Install Command: pnpm install
Build Command:   pnpm build
Output:          .next
```

---

## `$ nano lib/portfolio-data.ts`

All portfolio content — projects, skills, experience, contact links, education, certifications, achievements — lives in a single file:

```
lib/portfolio-data.ts   ← edit here to update any content on the site
```

No component changes needed. Update the data file, push, and Vercel redeploys automatically.

---

## `$ git log --oneline`

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=kirangautham-82899&theme=github-compact&bg_color=0d1117&color=58a6ff&line=a78bfa&point=5ef0b5&area=true&hide_border=true" width="100%" />
</div>

---

<div align="center">

```
built by Kiran Gautham  ·  MIT License  ·  2026
```

[![Live Site](https://img.shields.io/badge/Live_Site-Visit-58a6ff?style=flat-square&logo=vercel&logoColor=white&labelColor=0d1117)](https://my-portfolio-alpha-ochre-20.vercel.app/)
&nbsp;
[![Source](https://img.shields.io/badge/Source-GitHub-181717?style=flat-square&logo=github&logoColor=white&labelColor=0d1117)](https://github.com/kirangautham-82899/My-Portfolio)

<br/>

  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,40:1a3a5c,100:0d1117&height=100&section=footer" />
</div>
