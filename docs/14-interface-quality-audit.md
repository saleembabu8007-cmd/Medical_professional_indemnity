# Interface quality audit — 30 October 2026

Scope: five application steps, clinic/PIC branching, shared controls, premium summary/dialog, service entry/verification and claim-form code. This is an interface review, not a live backend certification.

| Area | Finding | Applied resolution |
| --- | --- | --- |
| Alignment | Premium bar had hardcoded left offset unrelated to tablet form geometry. Services had a nested width/padding system. | Premium uses page, gutter, rail, gap and panel tokens; services use the same grid. |
| Typography | Subheadings were larger than section headings. Pricing helper text shrank to 10px. | Section 18px, subheading 16px, helper text 11–12px; tabular currency values and stable weight. |
| Spacing | Section and field rhythm mixed unrelated values. | Semantic field/section/choice spacing and action-clearance tokens. |
| Group relationships | Simple binary questions consumed two full-width rows. | Compact two-column radio groups; long choice labels remain stacked. Native keyboard behavior retained. |
| Backgrounds/borders | Selected add-on headers remained white while only the body changed. | Unified selected surface, selected border and checkbox; restrained neutral page and white workspace. |
| Selection | Current and completed navigation used almost identical saturated circles. | Current step has a light selected surface; completed steps are quieter. Selected radio rows have a stable inset border. |
| Pricing | Partial quote objects could imply an inclusive total. | Require all six finite nonnegative amounts; incomplete response stays unavailable. No tax recomputation. |
| Disclosure | Long recommendation text could spread across large cards. | Reading width limited for explanatory copy, while primary choices remain direct. |
| Actions | Mobile Back and breakdown targets were below 44px. | Minimum 44px and reserved space beneath fixed bar; retain one forward action. |
| Services | No route back from claim verification to initial choice. | Back action clears challenge and returns to claim choice. |
| Claim context | Selecting a different policy retained previous patient/incident details and attachments. | Reset details/files/step on policy selection. Browser leave warning protects active unsent claim work. |
| Save feedback | Checkmark could remain next to storage-failure warning. | Icon suppressed on storage error. |

Verification: all five application screens checked at 1280, 820, 768, 390 and 360px. No horizontal overflow, one premium bar on steps 2–5, no premium-bar action below 44px. Source clinic branches remain covered by existing tests. JavaScript syntax checks pass. Pricing regression test added for partial quotes.

Limitations: authenticated claim and renewal states remain disconnected and cannot be signed off against a live account. No insurance amounts, eligibility or outcomes were invented. Native date controls depend on the browser; their surrounding field treatment is shared. Full assistive-technology and real-device testing remains appropriate before release.
