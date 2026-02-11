

# Diversify Stock Photo Layouts Across Legal Services Pages

Replace the repetitive centered image blocks with 6 different layout styles, ensuring no two consecutive images on any page use the same treatment.

## Layout Styles

### Style 1: Full-Bleed Background with Quote Overlay
Image spans full width with a dark overlay and a short relevant quote or stat centered on top in white text.

### Style 2: Side-by-Side (Image Left, Text Right)
Two-column layout -- image on the left (roughly 50%), short contextual paragraph on the right.

### Style 3: Side-by-Side (Text Left, Image Right)
Reverse of Style 2 -- text block on the left, image on the right.

### Style 4: Full-Bleed Edge-to-Edge (No Container)
Image spans the full viewport width with no container or rounded corners -- a bold visual break.

### Style 5: Offset Image with Accent Block
Image slightly narrower with a colored accent block (navy or green) peeking behind it on one side for visual depth.

### Style 6: Image with Caption Bar
Centered image (current style) but with a subtle caption bar below it -- a short contextual note in muted text.

## Assignment Per Page

### Divorce Page (3 images)
1. After Divorce vs. Dissolution -- **Style 2** (image left, short text about choosing the right path)
2. After fault grounds -- **Style 1** (full-bleed background with a quote about justice)
3. Before quiz -- **Style 5** (offset with navy accent block)

### Child Custody Page (3 images)
1. After custody allocation -- **Style 3** (text left about protecting your family, image right)
2. After court factors -- **Style 4** (full-bleed edge-to-edge)
3. Before quiz -- **Style 6** (image with caption bar)

### Child Support Page (3 images)
1. After lawyer roles -- **Style 1** (full-bleed background with a stat about Ohio child support)
2. After calculation factors -- **Style 5** (offset with green accent block)
3. Before quiz -- **Style 2** (image left, encouraging text right)

### Prenuptial Agreement Page (3 images)
1. After "What Is a Prenup" -- **Style 4** (full-bleed edge-to-edge)
2. After invalidation section -- **Style 3** (text left, image right)
3. Before quiz -- **Style 1** (full-bleed background with a quote about planning ahead)

## Technical Details

### Files Modified
- `src/pages/Divorce.tsx` -- replace 3 image sections
- `src/pages/Custody.tsx` -- replace 3 image sections
- `src/pages/ChildSupport.tsx` -- replace 3 image sections
- `src/pages/PrenuptialAgreement.tsx` -- replace 3 image sections

### Styling Approach
- All layouts use responsive design (stack vertically on mobile for side-by-side layouts)
- Full-bleed backgrounds use `bg-cover bg-center` with a semi-transparent navy overlay
- Offset accent blocks use `relative`/`absolute` positioning
- Same Unsplash image URLs are retained -- only the presentation changes
- No new dependencies required

