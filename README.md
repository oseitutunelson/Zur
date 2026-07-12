# ZUR Construction — Premium Construction Company Website

A world-class, conversion-focused construction company website built to the uploaded
ZUR Construction design system (deep navy-charcoal · cool off-white · vermilion accent `#E8512A`), enhanced with
advanced animations, an interactive Three.js construction scene, and scroll-driven
building assembly.

## Tech Stack

- **React 18** + **Vite** (fast dev, code-split production build)
- **Three.js** + **@react-three/fiber** / **drei** — interactive 3D hero scene
- **GSAP** + **ScrollTrigger** — scroll-driven building assembly, pinned horizontal process timeline, milestone timeline
- **Framer Motion** — micro-interactions, reveals, page transitions
- **Tailwind CSS** — design-token-driven styling

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home — 3D hero, trust counters, about, services, scroll build-assembly, projects, process, why-us, testimonials, partners, FAQ, CTA |
| `/about` | Story, mission/vision, values, GSAP milestone timeline, leadership, certifications |
| `/services` | All 9 service categories with detail, benefits, process |
| `/projects` | Filterable masonry/grid portfolio + before/after sliders |
| `/projects/:slug` | Project detail — overview, challenge/solution, cost breakdown, gallery, testimonial |
| `/contact` | Multi-step quote form, offices, map, WhatsApp |

## Design System

Tokens live in `tailwind.config.js`:

- `ink` — deep navy-charcoal surfaces (`#111A24`)
- `bone` — cool off-white (`#F4F5F7`)
- `accent` — ZUR Construction vermilion (`#E8512A`)
- `steel` — cool secondary for borders & muted surfaces
- Display & body type: **Sora** (geometric, architectural).

## Performance & Accessibility

- Three.js scene is lazy-loaded, WebGL-detected, and disabled for `prefers-reduced-motion`
- Secondary routes are `React.lazy` code-split
- Images lazy-loaded via optimized Unsplash URLs (swap `src/lib/img.js` for your CDN)
- Reduced-motion media query disables animations
- Semantic landmarks, focus-visible states, aria labels on interactive controls

## Structure

```
src/
  components/        shared UI (Navbar, Footer, Button, Reveal, Counter, ...)
    home/            homepage sections
  pages/             routed pages
  three/             ConstructionScene + HeroCanvas
  data/site.js       all content (services, projects, testimonials, ...)
  lib/               gsap setup + image helper
```

Update copy, projects and services in **`src/data/site.js`** — pages render from it.

