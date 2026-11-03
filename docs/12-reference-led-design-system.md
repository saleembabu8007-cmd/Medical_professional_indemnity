# DoctorShield — reference-led visual system

## Design direction

The supplied references informed composition rather than branding: a quiet step rail, a focused white workspace, choices in one reading direction, distinct selected product cards, and a predictable action footer. DoctorShield retains #08A5B5, #132766, Kanit and Inter. Reference-specific claims, prices, statistics, illustrations, purple palettes and unrelated insurance features were not copied.

The previous navy navigation block and accumulated stylesheet overrides were replaced. application.css is now a single canonical layer covering the application shell, form atoms, selections, insurance organisms, review, feedback, dialogs and responsive states.

## Semantic token contract

Tokens live in dist/tokens.css. Existing short names are compatibility aliases; new visual roles should use the semantic names below. Primitive values are not a substitute for choosing the correct role.

| Group | Roles | Usage |
|---|---|---|
| Brand | brand-primary, brand-secondary | Immutable DoctorShield identity |
| Surfaces | surface-page, surface-default, surface-subtle, surface-selection, surface-control | Canvas, workspace, quiet context, selected coverage, editable controls |
| Content | content-primary, content-secondary, content-heading, content-action, content-on-action | Body, supporting copy, headings, links, primary-button labels |
| Borders | border-default, border-control, border-selection | Structure, editable boundaries, selected options |
| Actions | action-primary, action-hover, action-pressed | Primary action states |
| Focus | focus-outline, focus-halo | Visible keyboard focus, separate from selected state |
| Feedback | state-danger/success/warning/info and associated surfaces | Text plus icon and surface; never color alone |
| Disabled | state-disabled, state-disabled-surface | Explicitly unavailable controls |
| Type | text-title, text-section, text-body, text-label, text-caption | 26px page, 17px section, 14px body, 13px label, 12px supporting text |
| Geometry | radius-control, radius-panel, control-height, target-min | 8px controls, 16px workspace, 48px fields/actions, 44px compact targets |
| Composition | page-width, rail-width, layout-gap, panel-padding | 1120px page, 220px rail, 48px separation, 32px workspace inset |
| Motion | motion-fast, motion-standard, ease-standard | 140/200ms; reduced motion disables transitions and animation |

Spacing follows a 4px base. Related fields use 20–24px gaps; sections use 28–32px separation. Border contrast on editable controls is stronger than decorative boundaries. Brand teal is not used as small text on white; the semantic action color is darker.

## Atoms and molecules

components.js owns labels, input values, errors, selects, questions and consent. Native controls retain keyboard, autofill and mobile behavior, while the application supplies their visual treatment. Selects have a consistent chevron/inset; radios and checkboxes have distinct shapes; fields have separate editable, readonly, disabled, focus and error states. Forced-colors mode restores platform control appearance.

ui.js owns button hierarchy, loading/disabled behavior, notices and section headings. Buttons accept action, variant, icons, disabled/loading, describedBy and size. Loading is disabled and aria-busy. Notice content is trusted rendered HTML; dynamic values must be escaped before composing it.

## Insurance organisms

These are implemented in dist/insurance-components.js and consumed by both app.js and design-system.js.

| Export | Contract | Behavior |
|---|---|---|
| coverageContext | classification, liability, period, editable | Compact selected-coverage context; absent when no classification; values escaped; Edit returns to Coverage |
| coverageOption | id, title, selected, description, details | Whole labelled header selects native checkbox; supporting explanation is separately expandable; selected clinic limit is supplied as trusted form markup |
| actionBar | back and forward rendered controls | One consistent action area per page; stays within its task surface; respects disabled/payment boundary |

Checkboxes are used for independent clinic/PIC covers; radio controls remain for mutually exclusive answers. Product selection does not imply eligibility approval or a calculated premium.

## Screen compositions

1. **Coverage:** title inside workspace; classification and liability first; grouped coverage period; calculated end date as output; contact and optional promo; unchanged legal consent; one forward action.
2. **Quotation:** compact coverage context with edit; unavailable premium state; full-width practice choices; grouped selected product cards; dependent clinic limit; existing continuation intent.
3. **Personal particulars:** identity, contact and practice groups; required data before optional information; optional clinic branches disclosed on demand.
4. **Declaration:** readable source questions; compact explicit answer choices; disclosure details when needed; existing notices and consent.
5. **Summary:** editable semantic review rows; tabular financial formatting; separate premium/payment group; payment stays disabled while integration is unavailable.

Supporting allocation, branch, document, legal and state dialogs use the same type, spacing, focus and control contracts. Small screens collapse the rail into a compact progress row and move document access to the footer. The action footer remains part of the task surface, not a global overlay.

## Verification and limits

29 tests pass, including new organism escaping and native selection-state checks. All client modules pass syntax checks. Browser checked all five application screens at 1440, 1280, 1024, 768, 390 and 360px: no horizontal overflow and exactly one action area per screen. Verified combined clinic/PIC recommendations, clinic liability selection, specialist search/100% allocation save, focus restoration and first-invalid-field focus.

This is a local frontend implementation. Backend eligibility, premiums, documents, email, OTP, submission and payment are still unconnected. No certification or measured improvement in usability is claimed; integrated acceptance and assistive-technology testing remain necessary before a live insurance launch.
