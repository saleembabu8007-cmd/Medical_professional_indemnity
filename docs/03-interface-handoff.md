# Interface refinement — 28 October 2026

## Implemented journey

Coverage → Quotation → Personal Particulars → Declaration → Summary.

Personal information and declarations now have separate steps and separate validation. Specialist allocations remain a coverage subtask; clinic/PIC panels belong to quotation; clinic branches belong to personal details. Summary includes all collected personal fields, selected cover, branches and declaration answers, with edit controls. The screen-review drawer is intentionally separate from the normal journey and collapsed by default.

## Design system

Original SVG policy/shield visual on the left, forms on the right. The supplied logo, exact teal/navy colours, local Kanit and Inter font files are retained. Mobile uses a compact visual banner above a single-column form. The shared component library is available at `/design-system.html`.

Tokens: `dist/tokens.css` and semantic refinements in `dist/refined.css`. Components share typography, controls, action hierarchy, focus rings, input states, radio groups, notices, dialogs and error summaries. Required decisions have no preselected answer. Long legal wording stays left aligned and is not rewritten for visual convenience.

## UX rationale

- Choice overload: context-dependent sections, searchable specialist list, and five named tasks.
- Recognition: persistent labels, editable review, named progress and coverage summary.
- Fitts's law: primary actions and radio rows have large hit areas; mobile inputs use 16px text.
- Proximity and common region: consistent spacing separates field groups, not each individual field into a competing card.
- Error prevention and recovery: specific field errors, focus navigation, allocation constraints, conditional ownership/disclosure validation, preserved in-memory values when navigating back.
- Visual hierarchy: one page heading, restrained colour, one dominant next action, supplementary review tools collapsed.
- Accessibility: native inputs/fieldsets/dialogs, text plus colour feedback, visible keyboard focus and reduced-motion support.

These are design applications, not a claim that every UX heuristic guarantees an outcome or that a full independent accessibility audit has passed.

## Verification

JavaScript syntax checks pass for all five modules. Seven automated validation tests pass, covering date bounds, invalid and negative allocations, clinic ownership dependencies, explicit declarations, disclosure detail requirements and personal details. Browser verification covered the ordered flow through summary using synthetic local data, preserved values, payment's disconnected boundary, specialist search/save, conditional clinic panels and desktop/mobile/tablet layout checks. No application, OTP, email or payment was sent.

## Integration scope

The user explicitly chose interface first and APIs later. Pricing, OTP, payment, full classification eligibility, exact policy-document URLs and backend-dependent routing remain unconnected. Normal mode does not fabricate a successful quote or advance past an unconnected service. Review mode allows visual inspection. No policy is issued or simulated as issued.

Source content parity still requires comparison with the full application source, especially dynamically loaded options, recommendation explanations, renewal/backdating and hidden branches. The implemented interface must not be described as a production-operational insurance service until those integrations and acceptance checks are complete.
