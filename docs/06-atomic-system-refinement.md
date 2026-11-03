# Shared design system refinement

This pass improves the implemented system across the product rather than replacing its visual direction.

## Structural changes

- Extracted field, select, radio-question, checkbox, hint and error rendering into `dist/components.js`. The application and component reference now consume the same implementation.
- Added semantic tokens for content width, sidebar width, layout gap, panel padding, muted/selected surfaces, focus, shadows and feedback timing.
- Standardized control radii to 8px and panels to 12px. Increased form label readability, retained 48px primary touch targets and 16px mobile input text.
- Tightened the desktop composition to a 1200px shell with a 312px policy rail and a 56px gap. Tablet and mobile retain their own single-column adaptations.
- Grouped personal information into Your details, Contact details and Practice details.
- Introduced numbered declaration groups with a consistent reading column, response spacing and separators. The question wording and answer rules are unchanged.
- Changed the review layout to ruled rows; irrelevant nationality/NRIC rows are omitted based on the existing conditions.
- Refined selected recommendation cards, expandable explanations, document links, branch cards and dialogs.
- Corrected outdated typography and geometry descriptions in the component reference.

## Interaction and accessibility

Field errors now have a shared visual treatment. Inputs retain explicit labels and hint/error associations. Keyboard focus, selected choices, readonly inputs and disabled actions remain distinct. The component factory reads the latest validation state after each rerender. Consent links stay outside a clickable label wrapper.

The existing classification, clinic/PIC, declaration and local-draft rules were preserved. Backend work remains deferred.

## Verification

- All 26 tests pass, including new checks for current validation state, HTML escaping and consent markup.
- Syntax checks pass for every active JavaScript module.
- Personal details, declarations, review, document dialog and the shared component reference were inspected in the browser.
- The checked mobile review layout has no horizontal overflow or missing description targets at 390px.
- The review-only QA route remains separate from the standard application URL.

This is not an assertion that every device or assistive technology has been certified. Existing service-integration requirements in `04-product-design-audit.md` still apply.
