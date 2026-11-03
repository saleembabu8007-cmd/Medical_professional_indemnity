# DoctorShield individual indemnity — current-flow audit

Inspected 27 October 2026. Source: https://my-individualindemnity.doctorshield.com/

## Evidence and limits

The calculator and specialist allocation dialog were inspected in the live browser. General Medical Practitioner was selected: seven liability options loaded, from RM 500,000 to RM 10,000,000. Selecting Specialist (Private sector) opened a long specialisation/percentage table with a running total and Close, Reset, Submit actions. No application, agreement, OTP request, email or payment was submitted.

Other journey sections were discovered in the publicly rendered page document. Their existence is verified; their precise branch predicates, pricing logic and runtime transitions are not. The current browser viewport was approximately 498 × 667; findings about visual layout refer to this viewport, not a completed cross-device audit.

## Journey inventory

| Area | Observed purpose | Verification |
|---|---|---|
| Entry | Classification, liability, dates, email, promotion, consent | Live browser |
| Specialist detail | Percentage allocation across specialisations | Live browser |
| Quotation | Premium, conditional clinic/PIC choices, quote email alternative | Page content |
| Applicant | Identity/contact/practice information | Page content |
| Clinic branches | Branch collection and eligibility wording | Page content |
| Underwriting | Individual and organisation declarations | Page content |
| Supplementary assessment | Pandemic-related questionnaires | Page content; active routing unknown |
| Referral | Relationship-manager/support path | Page content; trigger unknown |
| Review | Policy and premium breakdown, payment-channel choice | Page content |
| Returning customer | Verification, renewal, duplicate-policy handling | Page content; live authentication not exercised |
| Exceptions | Expiry, technical error, backdate agreement, review dialogs | Page content |

This is a branching application, not a single quote form. A faithful replacement must retain business rules independently of its visual layout.

## UX findings and response

1. **Placeholder-only identification.** Several inputs lose their visible identifying text after entry; accessibility exposes some as unnamed fields. Use persistent visible labels, stable IDs and associated hints/errors.
2. **Dense legal copy.** The narrow layout uses justified copy, creating uneven gaps and difficult scanning. Keep the exact wording but use left alignment, readable line height and separate the checkbox statement from supporting notices.
3. **Unclear progress.** Percentages do not explain the task ahead; page content reports completion before payment. Use named stages and explicit current-step status. Never imply an issued policy from reaching review.
4. **Heavy calculator surface.** A large dark panel dominates the small viewport. Use a white form surface, restrained borders and navy hierarchy on a light neutral background.
5. **Long specialisation dialog.** Dozens of fields create nested scrolling and retrieval work. Provide search, clearly marked selected rows, percentage input constraints and a persistent total. Preserve the full terminology and allocation semantics.
6. **Mixed question polarity.** An agree/disagree declaration coexists with yes/no risk questions. Preserve the original wording and answer types. Never preselect answers or infer that all negative answers are equivalent.
7. **Conditional information overload.** Add-ons, branches and detailed questionnaires should appear only when relevant. Exact relevance rules require the existing backend contract, not designer inference.
8. **Financial clarity.** Coverage selection and premium are different concepts. Give each its own hierarchy; show totals and their breakdown together. Do not invent premiums or recreate unverified tax/commission arithmetic in the browser.
9. **Content quality exceptions.** Source contains typographical errors, historical notices and inconsistent domain references. Maintain a content registry and flag these for owner review rather than silently rewriting or deleting them.
10. **Recovery must be designed.** Back navigation, changed classifications, expired quotes, failed OTP, duplicate policies and failed payment need durable, distinguishable states.

## Proposed interface structure

Coverage → Quotation → Personal Particulars → Summary → existing payment provider.

Service Details remains a conditional coverage subtask. Clinic/PIC selection belongs with quotation. Applicant declarations and optional supplementary questions belong with personal particulars. Referral is a distinct outcome, not a successful purchase. Quote-email is a distinct completion outcome, not payment.

## Applied UX principles

| Principle | Concrete application |
|---|---|
| Hick–Hyman | Reveal relevant follow-up questions; search long option lists |
| Fitts | Large primary actions and entire selectable answer rows |
| Proximity/common region | Group coverage, dates, declarations and financial totals separately |
| Recognition over recall | Persistent labels and a coverage summary across steps |
| Consistency/Jakob | Familiar form controls, clear back/next navigation, ordinary link behavior |
| Error prevention | Validate formats, dependent values and allocations before advancing |
| Visibility of system status | Loading, success, error and current-step states; no invented progress |
| User control | Editable review sections, reversible add-ons, preserved in-memory entries |
| Cognitive load | One dominant action per section, readable legal copy, restrained decoration |

UX principles are design heuristics, not a guarantee of conversion or a substitute for usability testing.

## Release validation

Check 360/390/768/1024/1440 widths, 200% zoom, keyboard-only use, screen-reader names, focus restoration, long content, every classification and branch, allocations, invalid dates, stale quote handling, repeated submissions, OTP limits and payment recovery. Compare every retained string against the source registry. Validate pricing and eligibility only against backend fixtures supplied by the owner.

## Agreed delivery boundary

The user requested an implemented interface, no Figma deliverable, and explicitly chose API integration later. UI completion must not be reported as a working insurance platform. No mock quote, verification, email delivery or payment result may be represented as real.
