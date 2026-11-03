# V3 — atomic interface refinement

V3 refines the shared component layer rather than changing the insurance journey. Customer-facing wording and business rules are retained.

## Applied across the application

- Native selects now share one chevron, inset and focus treatment. The select remains native for keyboard and mobile behavior.
- Checkboxes and radios use a consistent geometry, visible checked state and hover/focus treatment. Native semantics remain intact; forced-colors mode restores platform appearance.
- Disabled, readonly, invalid and focused inputs have distinct states. Error focus uses the error color; disabled inputs do not look editable.
- Secondary, quiet, disabled and loading buttons receive consistent interaction feedback. Loading remains explicitly disabled and aria-busy.
- Feedback surfaces have semantic borders, backgrounds and icons. Selected add-ons strengthen the product mark as well as the outline.
- Review values and premium columns use tabular numerals. Product headers, disclosures, allocation rows and status icons receive consistent spacing and optical sizing.
- Tokens now include control hover/fill, focus halo, tracking, pill/small geometry and popover elevation roles.

## Design-system reference

Rebuilt design-system.html, design-system.js and design-system.css into nine navigable sections: foundations, typography, controls, selection, actions, feedback, compositions, visuals and behavior. Samples use the real components.js, ui.js, icons.js and visuals.js exports. Native fields and selections are operable; the product sample updates its selected appearance. A scroll-aware navigation marks the section being inspected. Static sample values are documented as examples, not outcomes.

## Verification

- All 26 existing rule, validation, draft and component tests pass; all client modules pass syntax checks.
- All five application screens checked at 1440, 1280, 1024, 768, 390 and 360px: 30 checks, no horizontal overflow.
- Component reference checked at desktop, tablet and mobile widths without horizontal overflow.
- Browser keyboard check: ArrowRight changes the native radio selection; Space toggles the checkbox.
- Invalid Coverage submission exposes five invalid controls and focuses Classification.
- Browser console error log is empty.

Backend services remain paused. This is a frontend refinement; it does not establish integrated release readiness, accessibility certification or measured usability improvement.
