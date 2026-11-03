# DoctorShield product redesign

## Review links

- Application with illustrative pricing: http://127.0.0.1:4174/?sample=1
- Component library: http://127.0.0.1:4174/design-system.html
- Normal application without illustrative prices: http://127.0.0.1:4174/

## Audit findings and changes

| Finding | Implemented response |
| --- | --- |
| A long specialisation list exposed percentage inputs for every service, making selection and allocation one overwhelming task. | Searchable native checkbox rows on the left, selected services and percentage controls on the right; stacked panels on mobile. Unselected services have no percentage input. |
| An allocation total did not explain how much remained, and users had to calculate equal shares manually. | Persistent total, progress bar, remaining/over-allocated amount, explicit split-equally action and exact hundredth-of-a-percent arithmetic. Invalid, zero, negative, nonfinite or non-100% allocations cannot be saved. |
| Selected services were hidden behind an aggregate count. | Coverage now lists each selected specialisation and its percentage. Review retains the source service names and allocations. |
| Missing prices made it difficult to review financial hierarchy. | Explicit sample mode with deterministic illustrative line items, discount, net, SST, stamp duty and final total. Clinic/PIC selections update the sample consistently. The bar and breakdown consume the same model. |
| Sample amounts could be mistaken for actual insurer prices. | Sample badge alongside amounts, explanation inside breakdown, no persistence into real drafts, payment disabled and service-boundary guard against emailing/submitting/paying samples. Normal mode still shows unavailable pricing. |
| The application lacked a coherent visual support area. | New local vector medical-practice artwork, sized prominently on coverage and more quietly on later steps; reused on service entry. Artwork is decorative, hidden from assistive technology and removed on mobile. |
| Form, coverage and pricing groups looked too similar. | Distinct compositions: structured coverage facts, highlighted premium total, neutral form sections, selected add-on panels, quiet review rows and separate disclosure surfaces. |
| Typography and layout proportions had accumulated inconsistent refinements. | Updated semantic title/body sizes, page/rail dimensions, form padding, surface geometry and responsive composition styles. Brand colours and locally served Kanit/Inter remain. |
| Mobile percentage suffix collided with entered values. | Reserved suffix space and corrected control specificity; visually verified after correction. |
| The sample badge increased fixed-bar height. | Increased reserved bottom clearance so the fixed bar does not consume the final content area. |
| Service actions were undersized and centred on mobile. | Full-width primary/secondary actions; back remains a quieter separate action. |
| Mobile-number validation repeated the same message twice. | Field-level error is shown once; service-level failures retain their contextual status area. |
| Library examples no longer matched product pricing/artwork. | Updated shared sample breakdown, foundations and visual-language specimen. Both product and library consume the same composition stylesheet and renderer functions. |

## Implementation structure

- `tokens.css`: semantic foundations and composition dimensions.
- `product-compositions.css`: shared application, service, review, pricing and allocation layouts. Loaded after existing primitive styles on all three entry pages.
- `allocation-model.js`: percentage total, equal distribution and validation.
- `sample-quote.js`: isolated illustrative amounts; explicitly not underwriting or insurer rating logic.
- `app.js`: selection workspace, coverage allocation summary, preview isolation and pricing integration.
- `premium-components.js`: consistent amount formatting, sample identification and itemised breakdown.
- `visuals.js`: local vector medical-practice artwork.
- `services.js`: shared visual language and simplified field-error presentation.
- `design-system.js`: matching specimens and documented foundations.

No new dependencies were installed. Existing classification data, clinic/PIC routing, legal wording and live integration boundaries were retained.

## Verification

- All configured JavaScript modules pass `npm run check`, including the two new modules.
- 51 automated tests pass. New tests cover equal distribution for 1–70 choices, preserved source indices, invalid allocation values, all sample add-on combinations and normal-mode price unavailability.
- Five application steps checked at actual viewport widths 1440, 1280, 1024, 768, 390 and 360px: 30 checks, no document-level horizontal overflow. Requested and actual widths were recorded in `redesign-responsive-results.json`.
- Browser checks: specialisation search, multiple selection, equal allocation, invalid-total rejection, correction and save; clinic/PIC conditional recommendations; sample total updates; mobile premium sheet; branch dialog opening; claims entry and invalid-mobile feedback; renewal entry; library form, insurance composition, pricing and visual sections.
- Application and library browser logs showed no warnings/errors during the inspected flows.
- Screenshots: `redesign-specialisations-desktop.png`, `redesign-specialisations-mobile.png`, `redesign-premium-mobile.png`, `redesign-quotation-desktop.png`.

## Limits

Responsive overflow checks are not a substitute for exhaustive accessibility or device certification. Screen-reader testing, real-device keyboard behaviour and authenticated policy/claims states still need validation with a connected test backend. OTP delivery, actual policy retrieval, insurer pricing, renewal completion, claims receipt and payment remain unavailable. The sample is deliberately not a random rate generator: fixed illustrative inputs keep arithmetic reproducible and avoid prices changing unexpectedly while editing.

Illustrative amounts must not be used as financial guidance or an insurance quotation. The real application route continues to require server-supplied amounts.
