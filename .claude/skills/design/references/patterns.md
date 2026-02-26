# Component Design Patterns

Reference for established UI patterns in this project. When designing new components or redesigning existing ones, follow these patterns for consistency.

## Section Patterns

### Hero Sections
- Full-width, min-height 80vh
- Background: video or image with dark overlay (bg-black/40 or bg-foreground/70)
- Content: centered, max-w-3xl, white text with drop-shadow
- Heading: text-5xl to text-7xl responsive, font-medium tracking-tight
- Subheading: text-xl to text-2xl, white/95 opacity
- CTA: `<AnimatedCTA>` wrapper with 0.6s delay
- Staggered entrance: heading (0ms) -> subtitle (300ms) -> CTA (600ms)

### Content Sections
- Wrap in `<section className="section-padding">` (py-16 md:py-24)
- Container: `<div className="container">` (max-w-1200px, px-6)
- Section heading: `.heading-section` + subtitle in `.text-body`
- Content: responsive grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3/4)
- Scroll animation: `useScrollAnimation(threshold)` on key elements

### Navy Sections
- Use `.bg-navy` class on section
- All text inverts automatically (headings -> cream, body -> white/85)
- Green CTA buttons maintain contrast against navy
- Add border treatment: `border: 1px solid hsla(153, 28%, 45%, 0.4)` for elements on navy

### Alternating Sections
- Alternate between `bg-background` (warm cream) and `bg-secondary` (darker cream)
- Or: cream -> navy -> cream for strong visual break
- Each section should feel distinct but part of the same family

## Card Patterns

### Elevated Cards
```
className="card-elevated" — rounded-lg, p-6 md:p-8, subtle shadow
```
- Use for standalone content blocks (testimonials, features, stats)
- Hover: translateY(-2px) + enhanced shadow for interactive cards
- Add green top border (border-t-4 border-accent) for emphasis

### Image Cards
- Image container: `aspect-[4/3]` or `aspect-video`, overflow-hidden, rounded-t-lg
- Image: `object-cover w-full h-full`, hover scale(1.05) with 500ms transition
- Overlay: gradient from transparent to bg-foreground/60 for text readability
- Content below: p-6, heading + description + optional CTA link

### Stat Cards
- Centered layout, icon at top (w-12 h-12, text-accent)
- Large number: text-4xl font-medium text-primary
- Label below: text-body-sm
- Optional: navy background variant with inverted colors

## Grid Patterns

### Responsive Columns
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8
```
- 2 columns: features, before/after, side-by-side content
- 3 columns: services, team members, blog previews
- 4 columns: stats, trust badges, logo grids
- 5 columns: icon grids (practice areas in WhoWeHelp)

### Staggered Grid Animation
```
className={`stagger-children ${inView ? 'stagger-visible' : ''}`}
```
- Children animate in with 120ms delay between each
- Max 6 items before the stagger feels too slow
- For more items, use fade-in-up on the grid container instead

## Button Patterns

### Primary CTA (`.btn-cta`)
- Pill shape (rounded-full), gradient background, multi-layer shadow
- Sizes: default (px-10 py-4), small header (px-8 py-3), large hero (px-12 py-5)
- Always pair with Lucide icon (Phone, ArrowRight, Calendar)
- Icon sizing: w-4 h-4 (small) to w-5 h-5 (default), mr-2 gap

### Secondary Button (`.btn-secondary`)
- Navy outlined, transparent background
- Use for secondary actions alongside a primary CTA
- Never use two primary CTAs side by side — pair primary + secondary

### Ghost/Link Buttons
- Text-only with hover underline or color shift
- Use for tertiary actions (Learn More, Read More, View All)
- Pair with ChevronRight icon for navigation links

## Animation Patterns

### Page Entrance
- Hero elements: CSS keyframes (animate-slide-up, animate-fade-in-up)
- Staggered delays: 0ms, 300ms, 600ms for heading, subtitle, CTA
- CTAs: Framer Motion `<AnimatedCTA>` for scale-in + ring pulse

### Scroll-Triggered
- Hook: `const anim = useScrollAnimation(0.2)` (threshold 0.2 = 20% visible)
- Apply: `ref={anim.ref} className={anim.className}`
- States: scroll-hidden (opacity 0, translateY 24px) -> scroll-visible (fade-in-up)
- Variants: scroll-hidden-left, scroll-hidden-right, scroll-hidden-scale

### Hover Interactions
- Cards: translateY(-2 to -4px) + shadow expansion, 300ms ease
- Buttons: translateY(-2px) + shadow + color darken, 300ms ease
- Links: color transition, optional underline slide-in
- Images: scale(1.03-1.05), 500ms ease

### Framer Motion (Complex)
- Import: `import { motion, useInView } from "framer-motion"`
- Entry: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
- Premium easing: `ease: [0.22, 1, 0.36, 1]` (deceleration curve)
- Stagger: `transition={{ staggerChildren: 0.12 }}` on parent

## Responsive Breakpoints

| Breakpoint | Width | Use |
|---|---|---|
| Default | 0-639px | Mobile: single column, stacked, full-width |
| `sm:` | 640px+ | Large mobile: side-by-side pairs |
| `md:` | 768px+ | Tablet: 2 columns, increased padding |
| `lg:` | 1024px+ | Desktop: 3-4 columns, flyout nav |
| `xl:` / `2xl:` | 1200px+ | Max container width reached |

### Mobile Design Rules
- Touch targets: minimum 44x44px (p-3 minimum for interactive elements)
- Font sizes: never below text-sm (14px) for body, text-base (16px) preferred
- Padding: px-4 (mobile) -> px-6 (tablet) -> px-8 (desktop) for containers
- Stacking: all grids collapse to single column on mobile
- Navigation: Sheet (side drawer) on mobile, flyout on desktop
- CTAs: full-width on mobile (`w-full`), auto-width on desktop

## Icon Usage

### Lucide React Icons
- Import individually: `import { Phone, Scale, ArrowRight } from "lucide-react"`
- Sizing scale: w-4 h-4 (inline), w-5 h-5 (buttons), w-6 h-6 (cards), w-8-12 (features)
- Color: `text-accent` for emphasis, `text-muted-foreground` for decorative
- Always pair with text for accessibility (icon alone needs aria-label)

### Common Icons by Context
- Phone actions: `Phone`
- Navigation: `ChevronRight`, `ChevronDown`, `ArrowRight`, `Menu`, `X`
- Legal/Services: `Scale`, `Users`, `Heart`, `Shield`, `FileText`, `Gavel`
- Social proof: `Star`, `Quote`, `Award`
- UI feedback: `Check`, `AlertCircle`, `Info`
