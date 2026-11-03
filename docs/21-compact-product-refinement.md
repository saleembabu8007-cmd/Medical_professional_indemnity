# Compact product refinement — 2 November 2026

## Audit findings and changes

| Finding | Implemented response |
| --- | --- |
| Oversized chrome competes with the form | Header 80 → 68px; rail 248 → 224px; desktop panel inset 40 → 28px; illustration 208 → 120px |
| Repeated large surfaces obscure grouping | Quiet quote rows, unboxed calculated-field label, white specialisation selection panel, smaller service cards |
| Loose rhythm makes forms feel longer | Semantic field gap 20px and section gap 24px; 46px desktop controls; 48px mobile fields; 44px minimum actions |
| Data is difficult to scan | Aligned date labels, compact review rows with subtle separators, tabular amounts and distinct supporting labels |
| Specialisation task has competing regions | Numbered browse/selection groups, live selection count, conventional checkmarks, divider instead of another tinted card |
| Validation marks every allocation as wrong | Invalid individual percentages get targeted errors and first-invalid focus; total-only errors identify the group |
| Repeated artwork distracts during completion | Smaller existing vector illustration; contextual calendar/contact icons; insurance icons retained |
| Library guidance drifted from implementation | Geometry and target descriptions updated alongside shared tokens |

## Interaction rationale

Proximity: short within-group spacing, larger between-group spacing. Recognition: persistent selected services and percentages remain visible while searching. Progressive disclosure: existing clinic questions, recommendations and policy details remain conditional. Fitts: compact visual density preserves touch targets. Error recovery: draft edits remain reversible until Save; invalid percentage focus is targeted. Consistency: product, service pages and library share tokens and composition stylesheet. These are design decisions, not a claim of measured usability improvement; user testing is still needed.

## Verification

- 55 automated tests passed; syntax checks passed.
- All five application steps checked at 390 and 1280px: no horizontal page overflow.
- Specialisation selection, two-service equal allocation and Save verified in browser; mobile sheet visually inspected.
- No browser console errors during those application checks.
- Real insurer rating, OTP and payment still require backend integration. Sample pricing remains labelled.
