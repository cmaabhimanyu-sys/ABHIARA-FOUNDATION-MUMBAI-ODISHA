# Visual Consistency Audit Findings

## Page Root Backgrounds
| Page | Root bg | Hero type |
|------|---------|-----------|
| Home | #0A1628 (dark) | Dark with hero image |
| OurStory | #0A1628 (dark) | Dark with hero image |
| Vision | #0A1628 (dark) | Dark gradient |
| Programs | #0A1628 (dark) | Dark gradient |
| CSRPartners | #0A1628 (dark) | Dark gradient |
| Activities | #0A1628 (dark) | Dark gradient |
| Team | #0A1628 (dark) | Dark gradient |
| **Donate** | **#FAF7F2 (light)** | **LIGHT - NAVBAR INVISIBLE** |
| Contact | #0A1628 (dark) | Dark gradient |

## ISSUE 1: Donate page - ENTIRE page is light (#FAF7F2)
- Navbar white text invisible on light bg
- Need to either: make Navbar detect light bg, OR give Donate a dark hero

## ISSUE 2: Consistency check - section patterns
- Donate is the ONLY page with a fully light root background
- All other pages: dark root → alternating dark/light sections
- DECISION: Change Donate to match the pattern (dark root + dark hero + alternating sections)

## Fix Plan
1. Navbar: Add a `variant` prop ("dark" | "light") so pages can tell the navbar what color to use
2. Donate: Restructure to match the pattern: dark hero → light content → dark sections
3. OR: Simply make Donate have a dark hero section like all other pages

## Best approach: Make Donate consistent with all other pages
- Change root bg to #0A1628
- Add a dark hero section (like other pages)
- Keep the donation content in a light section below
- This is the most consistent approach
