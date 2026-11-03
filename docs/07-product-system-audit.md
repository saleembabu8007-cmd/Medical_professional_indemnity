# Product system audit and implementation — 29 October 2026

## Scope and findings

Reviewed the current local application, its source-derived catalog and clinic rules, shared controls, responsive CSS, supporting dialogs, service boundary and existing regression suite. The implemented product has five steps: Coverage, Quotation, Personal Particulars, Declaration and Summary. Supporting views cover specialist allocations, branch editing, policy documents, applicant notices, supplementary questions, verification and service outcomes. No account dashboard, authentication, claims management or policy-management product exists in this repository; none was invented.

The main presentation problems were duplicated base CSS rules, a large generated portrait competing with a transactional task, tiny mobile step labels, inconsistent action targets and outdated handoff claims. The repository already contained substantial working conditional logic; replacing it would introduce needless risk.

## Implemented design decisions

- Replaced the promotional portrait with a quiet policy context rail, current step and selected coverage. Policy documents remain accessible on mobile.
- Consolidated duplicate base selectors into a canonical component layer. Preserved responsive adaptations and existing business-flow selectors.
- Added semantic feedback, disabled, readonly, hover, placeholder, inverse, selection and overlay tokens, plus typography, motion and target-size roles.
- Retained exact brand teal #08A5B5 and navy #132766. Primary actions use dark accessible text; small teal text uses the darker semantic link color.
- Retained locally bundled Kanit and Inter. Established a clearer page/section/label/helper hierarchy, increased small secondary text and kept mobile inputs at 16px.
- Reworked mobile progress into five large numbered targets with full accessible names and a visible current-stage label above the form.
- Added shared action, notice and section-heading renderers. Application and library consume the same modules.
- Updated the add-on product label to Clinic Medical Malpractice Insurance. Preserved source legal text and routing predicates.
- Added a pending-operation guard and busy/disabled state around service requests. Errors explicitly state that no information was submitted.
- Increased compact buttons and icon controls to at least 44px. Consent checkboxes use 24px native targets, with text labels for simple choices; legal links remain independently operable.
- Added birthday autocomplete, consistent select error styling and focus restoration after branch changes.

## Architecture and component contract

The application remains a dependency-free static frontend. tokens.css owns visual foundations; application.css owns shared styles and responsive composition. components.js creates form atoms from live data/error getters. ui.js supplies button, notice and sectionHeading. app.js composes screens and controls navigation. clinic-rules.js/catalog.js/validation.js retain business logic; draft.js owns tab-scoped recovery; api.js is the integration boundary.

| Component | Anatomy and API | States and accessibility | Responsive/use guidance |
|---|---|---|---|
| Button | Text, optional leading/trailing icon; action, variant, size, disabled, describedBy | Native button; keyboard Enter/Space; visible focus; primary/secondary/quiet; disabled and aria-busy | 48px standard, 44px compact; one primary forward action per footer. Explain blocked actions beside the control. |
| Text field | Label, native input, optional hint, error; id, type, placeholder, full, optional, readonly, disabled | Label association, autocomplete where relevant, aria-invalid and describedby; default/focus/error/readonly/disabled | Two columns where useful, one on narrow layouts; never use placeholder as label. |
| Select | Label, native select, hint, error; options derived from classification | Native keyboard behavior, explicit unselected option; linked errors; nationality lock follows NRIC rule | Full-width when labels/options are long; native mobile selection retained. |
| Radio group | Fieldset, legend, labelled choices, group error | Native arrow/Space behavior, visible selected border and radio indicator; explicit answers | Wrap choices rather than shrink labels; groups remain together. |
| Consent | Native checkbox, associated content, separate legal links, error | No nested interactive links inside a clickable label; explicit unchecked default | Do not preselect legal agreements or turn linked text into a large conflicting hit target. |
| Notice | Icon, optional title, trusted body; tone, live | Error alerts, polite status for pending updates; icon plus text, never color alone | Fits form width; do not stack promotional notices above the task. Escape dynamic values before trusted HTML composition. |
| Section heading | Decorative icon, h2 text, optional note | Heading hierarchy below the page h1 | Consistent spacing; icons support recognition rather than decoration. |
| Recommendation | Badge, product heading, expandable source explanation, premium state, checkbox, conditional limit | Explicit selected state; details/summary keyboard behavior; selection independent of recommendation | Long title wraps; insurance limits appear only for selected clinic cover. |
| Step navigation | Five native buttons, number/check, accessible step name, current state | aria-current=step; future stages gated outside QA mode | Desktop labels; mobile numbers plus visible current-stage label. No tiny text squeezed into five columns. |
| Review section | Heading, Edit action, definition list, optional disclosure | Semantic dt/dd, explicit return-to-edit controls | Two columns on wide screens; ruled single-column rows on mobile. |
| Dialog | Native dialog, labelled sticky heading, body, footer, close control | Modal focus containment, Escape dismissal and focus return | Width constrained to viewport, scrolling body, controls remain reachable. |

Spacing uses a 4px base with 8/12/16/20/24/32/40/48/64 steps; control/panel radii are 8/12px. Transitions use 140/200ms with reduced-motion support. Loading remains localized to the invoked action. No skeleton, fake financial result or synthetic success is introduced for an unconnected service.

## Flow preservation

Clinic No → PIC question → no cover or PIC. Clinic Yes + Sole Proprietor → locum question → clinic cover when Yes, PIC when No. Clinic Yes + Partnership/Sdn Bhd → other-establishment PIC question → clinic alone or clinic plus PIC. Incomplete answers never produce premature recommendations. Changing a parent answer clears hidden downstream values. Organisation declarations replace individual declarations when clinic coverage is selected. Branches are limited to four and remain conditional on clinic coverage.

## Verification

- 26 existing automated tests pass: six terminal clinic routes, incomplete states, dependent reset, classification catalogs, liability validation, declaration routing, draft recovery and shared field safety.
- Syntax checks pass for all client modules, including ui.js.
- Browser checked all five main screens at 1440, 1280, 1024, 768, 390 and 360 CSS-pixel widths: no horizontal page overflow.
- Browser confirmed partnership + other-establishment PIC exposes both recommendations and selecting clinic cover reveals its limit.
- Mobile policy-document dialog fits viewport; Escape dismisses it. Coverage validation renders linked errors and focuses the first invalid control.
- Mobile branch dialog validates incomplete input without closing or silently saving.

These are targeted checks, not a claim of full WCAG certification or exhaustive browser/device compatibility. Final assistive-technology testing and acceptance testing with the integrated service remain necessary.

## Remaining integration work

Backend work is paused by request. Premiums, authoritative eligibility and classifications, dynamic policy wording, application submission, quote email, OTP and payment are unconnected. Payment is explicitly disabled. The local draft is sessionStorage, not an account or secure server-side application record. Supporting outcome screens are QA-only examples and clearly say the outcomes have not occurred. Backdating, renewal, server-side validation, expiry and recovery need the real service contract. Do not treat the source snapshot as insurer approval or final underwriting logic.
- Supporting OTP, supplementary, referral, email-outcome, expiry and error screens also fit the 360px viewport. Browser error log was empty. Component reference loaded shared controls and feedback successfully.
