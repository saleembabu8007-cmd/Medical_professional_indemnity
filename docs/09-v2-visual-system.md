# DoctorShield V2 visual system

V2 updates the entire shared presentation layer while retaining the minimal copy, five-step journey and existing rules. It introduces a navy navigation surface with contrasting active and completed states, a quiet grey canvas, a white primary form surface, custom vector policy artwork and distinct clinic/PIC marks. Mobile retains a white, task-focused layout and omits the decorative artwork.

## Foundations and components

- Exact brand colors remain #08A5B5 and #132766; dark primary-button text retains readable contrast. Rail text, borders, accent and selected surfaces have dedicated semantic tokens.
- Kanit page titles use 34px desktop / 30px mobile; Inter remains the label and body font.
- 50px fields, 48px buttons, 44px compact actions; 8px control and 16px form/dialog radii.
- Shared field, selection, focus, hover, disabled, readonly, loading and error states updated across all screens. Loading is now an explicit button option in ui.js and is shown in the component reference.
- Recommendation headers use shared coverageMark graphics; selection has a strong outline independent of the checkbox indicator. Review data, branch rows, dialogs, disclosures and allocation controls inherit the same foundations.
- visuals.js contains inline decorative SVG artwork and product marks; no remote image requests, stock photography or generated raster assets. Graphics are aria-hidden and convey no insurance decision or fabricated outcome.

## Verification

Syntax checks and all 26 existing tests pass. Browser checks cover all five application screens at 1440, 1280, 1024, 768, 390 and 360px, with no horizontal overflow. Partnership plus external-PIC route exposes both products; selected clinic coverage reveals its liability input. Browser console error log is empty.

Backend remains paused. Pricing, OTP, application submission and payment remain unconnected; visual refinement does not imply readiness for live insurance transactions. Real-user usability testing and integrated acceptance testing are still required.
