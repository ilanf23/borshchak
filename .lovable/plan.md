
# Redesign Google Reviews Section

## Overview
Replace the current compact 3-card carousel with a more immersive, detailed layout that gives each review more breathing room and visual impact.

## New Design

### 1. Featured Review Spotlight
The top 5-star reviews will rotate in a large "spotlight" area -- a single review displayed prominently with:
- Large avatar initial (colored background)
- Full review text (no truncation)
- Bigger star display and reviewer name
- A large opening quotation mark as a decorative element
- Subtle green accent left border

### 2. Review Grid Below
Replace the 3-card paginated carousel with a scrollable grid showing **all reviews** at once (no pagination needed):
- **2-column layout** on desktop, single column on mobile
- Each card shows the **full review text** (no `line-clamp`)
- Larger cards with more padding, bigger text, and a Google "G" icon watermark
- Verified Google Review badge on each card
- Staggered fade-in animations on scroll

### 3. Stats Header (Simplified)
- Keep the Google logo + rating number + stars + total count
- Move the rating distribution bar chart into a collapsible/expandable section to reduce visual clutter
- Keep the filter-by-rating functionality

### 4. "Read More on Google" CTA
Add a button at the bottom linking to the Google Maps listing to see all 160 reviews.

## Technical Details

### Files Modified
- **`src/components/home/GoogleReviews.tsx`** -- Complete redesign of the component layout:
  - Add a featured spotlight review section with rotating highlights
  - Replace paginated carousel with a full scrollable grid
  - Remove `line-clamp-4` so full text is always shown
  - Add decorative quote marks and Google badge elements
  - Add collapsible rating distribution
  - Add "Read More on Google" CTA button
  - Use framer-motion for staggered card entrance animations

### No Other Files Changed
The Testimonials page already imports `GoogleReviews` so no routing or page changes needed.
