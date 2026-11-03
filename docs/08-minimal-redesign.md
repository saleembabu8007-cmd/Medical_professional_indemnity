# Minimal interface redesign

This refinement replaces the prior card-based presentation across the five existing steps. No new customer-facing explanatory copy or marketing claims were added. Existing labels and required legal wording are retained; redundant context and helper text were removed.

## Composition

- One white form surface, 640px maximum reading width, a 224px navigation rail and an 80px desktop separation.
- A single vertical step navigation replaces the horizontal navigation plus repeated current-step panels.
- Coverage summary is available on demand after Coverage rather than duplicated beside every field.
- Mobile uses a compact five-target progress row, current step number, single-column inputs, and document links in the footer.
- No outer form cards, decorative section icons, repeated status text, numbered declaration ornaments or large product headings.

## Components

Shared typography, 48px controls, 44px compact actions, 6px control radius and 8px selected surfaces. Brand teal remains the forward action color; navy anchors headings and current navigation. Checkboxes/radios retain native semantics, labels, selected indicators and visible keyboard focus. Promo Code uses native details/summary, remains open when populated, and survives validation rerenders. Liability is unavailable until a classification supplies its options. Clinic recommendation controls precede the optional source explanation.

The tokens, application stylesheet and component reference were updated together. Business rules, API boundaries and source legal content were not rewritten. Backend integration is still paused.

## Checks

26 existing tests pass; syntax checks pass. Browser checked all five screens at 1440, 1280, 1024, 768, 390 and 360px without horizontal overflow. Verified the sole-proprietor/locum clinic route, selected clinic liability, retained Promo Code after validation, first-invalid-field focus, mobile policy documents and Escape dismissal. Browser error log was empty. These checks do not establish usability outcomes without testing with actual applicants.
