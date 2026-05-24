# Octopus Consulting Services — Build Plan

A luxury, award-grade real estate consultant site for Chennai. Single-pass build. Final stack: TanStack Start + Tailwind v4 + GSAP + Three.js, with Lovable Cloud (DB) and the Resend connector for enquiry email delivery to gkr26002@gmail.com.

## 1. Design System

Wire brand tokens into `src/styles.css` (oklch equivalents of the brand hex):

- `--primary` Deep Navy `#0A1F44`
- `--accent` Emerald `#006B4F`
- `--gold` Royal Gold `#C9A84C`
- `--background` `#FFFFFF`, `--surface` `#F6F8FA`, `--foreground` `#1A1A2E`
- Gradients: `--gradient-gold`, `--gradient-navy`; shadow: `--shadow-luxe`
- Fonts: Playfair Display (headings) + Inter (body) loaded via `<link>` in `__root.tsx` head
- Custom utilities: `.text-gold`, `.bg-navy`, `.shimmer-border`, `.glass-nav`

## 2. Global Shell (`src/routes/__root.tsx`)

- Preloader (octopus SVG mark, fades out on mount)
- Custom cursor (dot + trailing ring, hover-aware)
- Morphing Navbar (transparent → frosted glass on scroll) with logo placeholder + links: Home / Projects / About / Contact + gold "Enquire" CTA
- Footer (logo, address, phone, email, Facebook, WhatsApp, quick links, embedded Google Map, copyright)
- Floating: WhatsApp FAB (pulsing ring, `wa.me/919840080766`), Call FAB (`tel:+919840080766`)
- Mobile sticky bottom action bar (Call / WhatsApp / Enquire)
- SEO meta per route via `head()`; sitemap.xml + robots.txt
- GA4 placeholder script slot

## 3. Routes

```
src/routes/
  __root.tsx
  index.tsx          → Home
  projects.tsx       → Projects (filters + 52 cards + modal)
  about.tsx          → About
  contact.tsx        → Contact
  sitemap[.]xml.ts
  api/public/enquiry.ts  → POST handler (insert + Resend send)
```

### Home sections

Hero (Three.js wireframe cityscape, headline, dual CTAs, scroll arrow) → Builder logo marquee → Animated stats (52+/15+/1000+/500+) → Why Choose Us (6 cards) → Featured Properties (6 from data) → How It Works (3 steps, animated gold connector line) → Testimonials carousel → CTA banner → Footer.

### Projects

Sticky filter bar (search, location, budget, BHK, builder, sort) + 3-col grid, 9 per "Load More". Click card → enquiry modal with Zod-validated form.

### About

Skyline hero, story copy, mission/vision cards, team placeholder (3–4), 52 builder logo wall (grayscale → color on hover), RERA note.

### Contact

Split layout: contact info + WhatsApp/Facebook on left, validated form on right, Google Maps iframe of Anna Nagar below.

## 4. Animations

- GSAP + ScrollTrigger for section fade/slide-ins, stats count-up, stepper line draw
- Three.js hero: rotating wireframe building cluster + particle field in navy/gold, parallax on mouse, capped DPR for performance, respects `prefers-reduced-motion`
- Property card: lift + image zoom + shimmering gold border on hover
- Marquee: pure CSS infinite scroll, pause on hover
- Page transitions: fade between routes via root-level wrapper

## 5. Data

`src/data/projects.ts` — typed array of all 52 projects (id, builder, name, location, area, priceMin/Max, bhk[], image placeholder URL).
`src/data/builders.ts` — 52 builder names → text-badge logos (real assets later).
`src/data/testimonials.ts` — 6 entries.

## 6. Backend (Lovable Cloud + Resend)

- Enable Lovable Cloud
- Migration: `enquiries` table (id, name, phone, email, budget, location, project_id, message, source, created_at) with RLS (insert allowed for anon, select restricted to service role)
- Connect Resend connector
- Server route `POST /api/public/enquiry`: Zod-validate body → insert via `supabaseAdmin` → send email through Resend gateway to `gkr26002@gmail.com` (templated HTML) → return `{ ok: true }`
- Frontend modal + contact form `POST` to that endpoint; success state with animated checkmark + "We'll call you within 2 hours"
- Indian phone validation (`/^[6-9]\d{9}$/` after stripping +91/spaces)

## 7. SEO

- Per-route `head()` with unique title, description, og:title, og:description, og:url, canonical (leaves only)
- JSON-LD `RealEstateAgent` on home with NAP + Facebook sameAs
- `public/robots.txt` (allow all) + dynamic `sitemap.xml` route

## 8. Dependencies to add

`gsap`, `three`, `@types/three`, `zod` (likely present), `embla-carousel-react` (testimonials/marquee fallback).

## 9. Build order

1. Tokens + fonts + global CSS utilities
2. Cloud enable + Resend connect + enquiries table + enquiry server route
3. Root shell (navbar, footer, FABs, preloader, cursor, mobile bar)
4. Data files (52 projects, builders, testimonials)
5. Home page (hero Three.js, all sections)
6. Projects page (filters, grid, modal)
7. About + Contact
8. SEO (head meta, sitemap, robots, JSON-LD)
9. QA pass: responsive check, reduced-motion, console clean

## Assets

Builder logos and project photos use elegant typographic placeholders (navy card + gold builder initials + project name) — designed to look intentional, swappable when you upload real assets. Office Google Map uses a public embed iframe for the Anna Nagar address.

## Notes

- Resend connector setup requires picking/creating a connection mid-build; I'll trigger that step and proceed.
- The default Resend sender will be `onboarding@resend.dev` until you verify a domain on Resend.
- GA4 ID left as a placeholder constant — paste your `G-XXXX` and it goes live.
