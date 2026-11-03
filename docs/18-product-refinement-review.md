# Product refinement review — 2 November 2026

## Scope and baseline

This pass continues the existing implementation. It does not replace insurer rules, legal wording, classification data, premium calculations or the backend boundary. The running coverage screen was inspected before edits. Source review covered the application renderer, shared form components, review compositions, pricing bar, service controller, stylesheet, token file and component library.

The baseline already had native form controls, conditional clinic routing, a five-step application, premium disclosure, renewal/claims service entry and session drafts. Rebuilding these behaviours would risk regressions without addressing the visual problems.

## Findings and implemented changes

| Area | Finding | Change |
| --- | --- | --- |
| Review composition | Nested bordered panels and tinted headers repeated the enclosing form surface. | Flattened review sections into headings, consistent edit positions, aligned facts and separators between meaningful groups. Applied through shared styles to application and claim review. |
| Claim review | Separate markup duplicated the application review pattern; corrections required stepping backward. | Reused reviewSection, reviewGroup and reviewRow. Added direct edit actions for each claim group. |
| Document access | Plain links lacked clear document anatomy. | Added shared documentRow with file symbol, title, factual PDF metadata, external-link indicator and new-tab announcement. Used in the actual policy-documents dialog and library. |
| Form errors | Corrected inputs could retain stale error treatment until submission. | Revalidate a previously invalid field on blur; remove its error and update the error summary only when its existing validator accepts it. Do not interrupt typing or replace the form. |
| Radio errors | Group error association lacked an explicit invalid state. | Invalid fieldsets now expose aria-invalid and their associated error. Option text is escaped. |
| Modal behaviour | Only premium sheets prevented background scrolling. | All application dialogs lock page scrolling and restore it on close. Existing focus restoration remains. |
| Mobile selection | Selected labels used a wrapped flex row and arbitrary indent. | Selected coverage uses explicit checkbox/content columns; its state label aligns under the title. |
| Mobile progress | A bare fraction gave limited step context. | Displays the existing step name beside the fraction. |
| Review values | Falsy-value handling could render a genuine zero as missing. | Zero is preserved; null, undefined and empty strings use the missing-value marker. |
| Feedback tokens | Status border colours were hardcoded outside foundations. | Added error, success, warning and information border roles, consumed in shared styles and exposed in the library. |
| Attachments | File names and removal actions lacked a stable row layout; hints/errors were not associated with the input. | Added wrapping filename rows, stable remove targets and described-by/invalid attributes. |
| Service actions | Empty-policy and handoff links used an unstyled base button. | Applied the existing primary action treatment. |

## Component conventions

- Review sections are parts of one document, rather than independent cards. Separate sections with spacing and a single rule. Keep metadata labels quieter than values.
- Use `documentRow` for known HTTPS documents. Do not invent size, revision date or download state. Metadata is optional when unavailable.
- Keep user-entered values escaped. Preserve zero as data.
- Status backgrounds, content colours and borders resolve through semantic roles. Existing teal and navy identity is unchanged.
- Form error correction uses the same validation rules as progression. It clears only an error already shown, after leaving the field.
- Choice states preserve native input semantics and keyboard behaviour. Mobile alignment must not depend on the length of a title.
- Application and reference pages import the same component renderers.

## Verification

- `npm run check`: passed for all configured application modules.
- `npm test`: 47 passed, 0 failed. Includes clinic routing, classification-specific limits, declarations, validation, draft handling, premium availability, service verification boundaries, attachments, document escaping, radio errors and zero-valued review data.
- No build task exists; this project serves the static ES modules directly.
- Initial rendered coverage inspection completed. The browser connection then disappeared and the browser inventory became empty. No post-change screenshots or six-width layout results are claimed for this pass.

## Remaining work and release limits

This is an implemented refinement pass, not a completed production sign-off. The full requested screen-by-screen visual review remains incomplete. Resume rendered inspection at 1440, 1280, 1024, 768, 390 and 360px: coverage and errors; every clinic recommendation route; personal details and branches; individual/clinic declarations; summary and pricing sheet; documents and allocations; service entry; authenticated service states using an approved test integration; and library specimens.

Specifically verify corrected-field blur behaviour, direct claim edits, attachment replacement/removal focus, modal keyboard containment/return, long translated or insurer-supplied values, zoom and reduced motion. The new CSS has passed source checks but cannot substitute for rendered verification.

Real quote amounts, OTP delivery, policy retrieval, renewal handoff, claims submission and payment remain disconnected as previously requested. No successful transaction, price, authentication or claim receipt was fabricated. Do not describe the portal as live-ready until these contracts and the remaining visual/accessibility checks are completed.
