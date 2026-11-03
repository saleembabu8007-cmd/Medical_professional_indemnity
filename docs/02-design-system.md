# DoctorShield interface system

## Direction

Quiet, precise and clinical without feeling institutional: white surfaces, navy typography, generous spacing, teal emphasis, fine borders, restrained radii. Use the supplied SVG unchanged and preserve its aspect ratio. Avoid stock doctor photography, ornamental dashboards, invented trust metrics and unsupported promises.

## Tokens

Brand teal #08A5B5; brand navy #132766. Canvas #F5F8FA, surface #FFFFFF, primary text #182C45, secondary text #566779, border #DCE4E9. Interactive borders must have sufficient contrast independently of decorative dividers.

White on teal is approximately 2.97:1; navy on teal is 4.68:1; navy on white is 13.91:1. Use navy on brand teal; use white on navy. Teal text uses #007D89 (4.89:1 on white). Do not round a failing contrast value up to a pass.

Heading: Kanit 400/500/600. Body/UI: Inter 400/500/600/700. Body 16px/1.6, supporting text 14px/1.55, form labels 14px/1.45 at 600. Avoid thin weights for essential text. Headings scale 28–40px depending on viewport. Numeric totals use tabular figures.

Spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px. Radii: 8px controls, 12px panels, 20px major surfaces. Inputs at least 48px high; major buttons 48–52px high. Use 44px or larger interactive targets as a product standard; WCAG 2.2 AA has a 24px minimum with exceptions.

Desktop container: 1160px maximum, 32px gutters. Form and complementary summary use a roughly 2:1 split. Mobile: 20px gutters, single column, no fixed-height form containers. Legal copy stays within a readable measure. Sticky elements must not obscure focus or form errors.

## Component contract

Button: primary, secondary, quiet, destructive; idle, hover, focus-visible, pressed, disabled, loading. Form field: label, optional marker, hint, control, error. Select: blank/default, loading, selected, unavailable, error. Checkbox/radio: native semantics with generous label hit area. Stepper: ordered stages, current step, completed steps. Summary: description list with edit navigation. Notice: icon, heading, explanation; distinct information/error/success states. Dialog: native modal, titled, focus contained, Escape and close control, return focus. Allocation picker: search, selected rows, numeric percentages, total and errors. Branch editor: list, add, edit, remove. Financial table: tabular values, explicit currency, itemised charges and final total.

All components use semantic tokens rather than local colour literals. Focus uses a visible navy outline with offset. Error is identified in words as well as colour. Motion is short and respects reduced-motion preferences.

## Content discipline

Keep source product, field, answer and legal wording intact. New navigational labels and integration-status text must be clearly distinguished from policy copy. Existing errors are editorial review items; don't silently correct binding language. Never add coverage claims, eligibility guarantees, urgency, customer counts or endorsements.

## Sources

- Existing experience: https://my-individualindemnity.doctorshield.com/
- Contrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Target sizing: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
