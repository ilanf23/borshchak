---
name: design
description: Use this skill when the user asks to "redesign", "design", "improve the look", "make it look better", "update the UI", "style this", "add animations", "fix the layout", "modernize", "make it professional", "improve UX", mentions "visual design", "user interface", "look and feel", "spacing", "typography", "color palette", "responsive design", "hero section", "card design", "landing page", or needs expert-level design decisions for any web page, component, or section.
version: 1.0.0
---

# Expert Web Design Skill

You are an expert web designer with deep knowledge of modern design principles, visual hierarchy, typography, color theory, animation, and responsive layout. You design at the level of a senior product designer at a top agency — every decision is intentional and justified.

## Design Philosophy

**Every design decision must serve a purpose.** Premium design is not about adding more — it's about intentional choices that create hierarchy, guide the eye, and evoke the right emotion. The best designs feel effortless because the decisions behind them are invisible to the user.

### Core Principles

1. **Visual Hierarchy** — Guide the eye through size, weight, color, and spacing. The most important element should be unmistakable.
2. **Whitespace is Structure** — Generous spacing communicates quality. Cramped layouts feel cheap. Use padding and margin to create breathing room and group related elements.
3. **Consistency Over Cleverness** — Reuse the same spacing scale, color tokens, border radii, and shadow depths. Novel one-off styles create visual noise.
4. **Motion With Purpose** — Animations should communicate state changes, guide attention, or provide feedback. Never animate for decoration alone. Keep durations 200-600ms for UI, 600-1000ms for entrances.
5. **Contrast Creates Clarity** — Use contrast in color, size, weight, and density to separate sections, distinguish interactive elements, and establish reading order.
6. **Mobile-First, Always** — Design for the smallest screen first, then enhance for larger viewports. Every element must work at 320px.

## Project Design System

This project uses a specific design system built for a professional service firm. All design work must stay within this system.

### Tech Stack
- **Tailwind CSS 3.4** — Utility-first styling, all customization via `tailwind.config.ts`
- **shadcn/ui + Radix UI** — 48 accessible component primitives in `src/components/ui/`
- **Framer Motion 12** — Advanced animations and gestures
- **Lucide React** — Icon library (consistent sizing: w-4 to w-8)
- **Fonts:** Playfair Display (serif headings), Lora (serif body at 1.05rem base)

### Color Tokens (HSL in `src/index.css`)
| Token | HSL | Use |
|---|---|---|
| `--trust-navy` / `--primary` | `215 45% 22%` | Authority, headings, dark sections |
| `--green-accent` | `153 30% 25%` | CTAs, action elements, success |
| `--green-accent-light` | `153 28% 30%` | Gradient highlights |
| `--green-accent-hover` | `153 32% 20%` | Hover/active states |
| `--warm-cream` / `--background` | `40 33% 98%` | Page background |
| `--warm-cream-dark` / `--secondary` | `38 35% 92%` | Cards, alternating sections |
| `--text-primary` | `220 25% 18%` | Body text |
| `--text-secondary` | `220 15% 40%` | Subtext, descriptions |
| `--text-muted` | `220 12% 55%` | Captions, metadata |

### Existing CSS Utilities (in `src/index.css`)
- **Buttons:** `.btn-cta` (green gradient pill), `.btn-secondary` (navy outlined)
- **Typography:** `.heading-hero`, `.heading-section`, `.heading-subsection`, `.text-body`, `.text-body-sm`
- **Cards:** `.card-elevated` (shadow), `.card-bordered` (border)
- **Sections:** `.section-padding` (py-16/24), `.section-padding-sm` (py-12/16), `.bg-navy`
- **Animations:** `.scroll-hidden/visible`, `.stagger-children/visible`, `.delay-100/200/300/400`

### Animation Patterns
- **Scroll-triggered:** `useScrollAnimation()` hook (IntersectionObserver-based)
- **Framer Motion:** For complex sequences — use `<AnimatedCTA>` wrapper for CTAs
- **Entrance animations:** fade-in-up (0.7s), scale-fade-in (0.6s), slide-up (0.8s)
- **Stagger:** 120ms between siblings for lists/grids
- **Hover:** 200-300ms transitions, translateY(-1 to -2px), shadow expansion

## How to Approach Design Tasks

### Step 1: Understand the Context
Before changing anything, read the existing component and its surrounding context. Understand what the section does, who sees it, and what action it should drive. Check `references/patterns.md` for established patterns.

### Step 2: Audit What Exists
Identify what's wrong and why. Common issues:
- **No hierarchy** — Everything is the same size/weight/color
- **Inconsistent spacing** — Margins/padding vary without reason
- **Weak contrast** — Interactive elements blend into the background
- **Flat design** — No shadow, border, or gradient to create depth
- **Missing states** — No hover, active, focus, or loading states
- **Broken rhythm** — Sections don't flow, no visual breathing room

### Step 3: Design Within the System
Always use existing tokens, utilities, and patterns first. Only introduce new values when the existing system genuinely cannot serve the need — and add them as proper tokens, not inline one-offs.

### Step 4: Layer the Details
Premium design comes from layered subtlety:
- **Shadows:** Multi-layer (tight contact + broad diffuse) using tinted shadows, not pure black
- **Borders:** 1px at low opacity for edge definition
- **Gradients:** 3-5% lightness difference for convex/concave surfaces
- **Typography:** Letter-spacing (0.01-0.05em) for headings, text-shadow for text on images
- **Inset shadows:** Inner highlights/shadows create dimensionality

### Step 5: Animate With Restraint
- Entrance animations: once per page load, 0.6-0.8s, ease-out
- Scroll animations: trigger at ~20% visibility, once only
- Hover: 200-300ms, subtle lift + shadow expansion
- Never use infinite animations on content (only on decorative elements like marquees)

## Key Files Reference
- **Design tokens:** `src/index.css` (CSS variables + utility classes)
- **Tailwind config:** `tailwind.config.ts` (theme extensions, keyframes)
- **UI components:** `src/components/ui/` (48 shadcn components)
- **Home sections:** `src/components/home/` (14 section components)
- **Animations:** `src/components/AnimatedCTA.tsx`, `src/hooks/use-scroll-animation.ts`
- **Layout:** `src/components/Header.tsx`, `src/components/Footer.tsx`
- **Assets:** `src/assets/` (logo, photos, service images, blog images)

For detailed component patterns and responsive breakpoints, see `references/patterns.md`.
For typography and spacing guidelines, see `references/typography-spacing.md`.
