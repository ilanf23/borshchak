# Typography & Spacing Guidelines

## Typography System

### Font Families
- **Playfair Display** — Serif, used for all headings (h1-h6). Loaded via Google Fonts with weights 400, 500, 600, 700. Conveys elegance, tradition, and authority.
- **Lora** — Serif, used for all body text. Loaded via Google Fonts with weights 400, 500, 600. Highly readable at body sizes, warm and approachable.

Both are serif fonts — this is intentional for a professional services firm. Serif typography communicates trust, heritage, and seriousness.

### Type Scale

| Utility | Mobile | Desktop | Use |
|---|---|---|---|
| `.heading-hero` | text-5xl (3rem) | text-7xl (4.5rem) | Page hero headlines only |
| `.heading-section` | text-4xl (2.25rem) | text-5xl (3rem) | Section headings |
| `.heading-subsection` | text-2xl (1.5rem) | text-3xl (1.875rem) | Subsection titles, card headings |
| `.text-body` | text-lg (1.125rem) | text-xl (1.25rem) | Primary body text |
| `.text-body-sm` | text-base (1rem) | text-lg (1.125rem) | Secondary text, captions |
| Base body | 1.05rem | 1.05rem | Default paragraph text |

### Typography Rules

1. **Headings are always Playfair Display** — Applied via CSS (`h1-h6 { font-family: 'Playfair Display' }`). Use `font-medium` (500) as default weight, `font-semibold` (600) for emphasis.

2. **Body text is always Lora** — Applied via CSS on `body`. Use `font-normal` (400) for text, `font-medium` (500) for emphasis within body text.

3. **Line height by context:**
   - Headings: `leading-tight` (1.25) — compact for large text
   - Body: `leading-relaxed` (1.625) — generous for readability
   - UI elements: `leading-normal` (1.5) — balanced for buttons, badges

4. **Tracking (letter-spacing):**
   - Headings: `tracking-tight` (-0.025em) — tightened for elegance
   - CTA buttons: `tracking-wide` or 0.025em — slightly open for emphasis
   - Uppercase labels: `tracking-wider` (0.05em) or `tracking-widest` (0.1em)
   - Body text: default tracking (0) — never modify

5. **Color by hierarchy:**
   - Primary: `hsl(var(--text-primary))` / `220 25% 18%` — headings, important text
   - Secondary: `hsl(var(--text-secondary))` / `220 15% 40%` — body text, descriptions
   - Muted: `hsl(var(--text-muted))` / `220 12% 55%` — captions, metadata, timestamps
   - On dark: `text-white` for headings, `text-white/90` or `text-white/85` for body
   - On images: always add `drop-shadow-lg` on headings, `drop-shadow` on body

6. **Never go below text-sm (14px)** for any readable text. Minimum for legal disclaimers is text-xs (12px).

### Heading Patterns

**Section with Subtitle:**
```tsx
<h2 className="heading-section mb-4">Section Title</h2>
<p className="text-body max-w-2xl mx-auto">
  Supporting description text that adds context.
</p>
```

**Heading with Accent:**
```tsx
<p className="text-sm uppercase tracking-widest text-accent font-medium mb-2">
  Category Label
</p>
<h2 className="heading-section mb-4">Main Heading</h2>
```

**Heading on Dark Background:**
```tsx
<h2 className="heading-section text-white drop-shadow-lg mb-4">
  Heading on Image/Navy
</h2>
<p className="text-lg text-white/90 drop-shadow">
  Body text on dark background.
</p>
```

---

## Spacing System

### Tailwind Spacing Scale (Key Values)

| Token | Value | Common Use |
|---|---|---|
| `1` | 0.25rem (4px) | Micro gaps between inline elements |
| `2` | 0.5rem (8px) | Icon-to-text gap, tight padding |
| `3` | 0.75rem (12px) | Button padding (vertical), small gaps |
| `4` | 1rem (16px) | Standard gap, mobile padding |
| `6` | 1.5rem (24px) | Section heading to content gap, container padding |
| `8` | 2rem (32px) | Between content blocks, card padding |
| `10` | 2.5rem (40px) | Hero subtitle to CTA gap |
| `12` | 3rem (48px) | Between major sections (mobile) |
| `16` | 4rem (64px) | Section padding (mobile, `.section-padding`) |
| `20` | 5rem (80px) | Hero vertical padding (mobile) |
| `24` | 6rem (96px) | Section padding (desktop, `.section-padding`) |
| `28` | 7rem (112px) | Hero vertical padding (tablet) |
| `36` | 9rem (144px) | Hero vertical padding (desktop) |

### Spacing Rules

1. **Vertical rhythm between sections:** Always use `.section-padding` (py-16 md:py-24) or `.section-padding-sm` (py-12 md:py-16). Never use arbitrary vertical padding on sections.

2. **Heading to content:** `mb-4` (1rem) for heading to paragraph, `mb-6` (1.5rem) for heading to grid/list, `mb-8` to `mb-10` for large section headings to content.

3. **Between cards/items:** `gap-6` (1.5rem) for tight grids, `gap-8` (2rem) for spacious grids. Use `gap-6 md:gap-8` for responsive.

4. **Card internal padding:** `p-6` (1.5rem) on mobile, `p-6 md:p-8` (2rem desktop) for comfortable reading.

5. **Container padding:** `px-6` (1.5rem) via the `.container` class. Provides consistent horizontal margins.

6. **Max-width for readability:** Body text should never exceed `max-w-2xl` (42rem / 672px) for single-column reading. Use `max-w-3xl` for hero sections.

7. **Responsive padding pattern:**
   - Mobile: `px-4 py-3` (compact)
   - Tablet: `px-6 py-4` (comfortable)
   - Desktop: `px-8 py-5` (generous)

### Common Spacing Patterns

**Section Layout:**
```tsx
<section className="section-padding">
  <div className="container">
    <div className="text-center mb-12 md:mb-16">
      <h2 className="heading-section mb-4">Title</h2>
      <p className="text-body max-w-2xl mx-auto">Description</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {/* cards */}
    </div>
  </div>
</section>
```

**Card Layout:**
```tsx
<div className="card-elevated">
  <div className="mb-4">
    <Icon className="w-8 h-8 text-accent" />
  </div>
  <h3 className="heading-subsection mb-3">Card Title</h3>
  <p className="text-body-sm">Card description text.</p>
</div>
```

**CTA Block:**
```tsx
<div className="text-center mt-10 md:mt-12">
  <a href="tel:..." className="btn-cta">
    <Phone className="w-5 h-5 mr-2" />
    Call Us Now
  </a>
</div>
```

### Spacing Anti-Patterns (Avoid)

- Arbitrary margin/padding values that don't follow the scale (e.g., `mt-[37px]`)
- Using `space-y-*` when `gap-*` on a flex/grid parent would be cleaner
- Inconsistent padding across similar components (one card p-4, another p-8)
- Missing responsive adjustments on section-level spacing
- More than 3 breakpoint overrides for the same property (simplify the design)
