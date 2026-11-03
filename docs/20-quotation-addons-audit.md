# Quotation add-ons audit — 2 November 2026

Source: https://my-individualindemnity.doctorshield.com/
Public quotation logic inspected in audit/live-home-nov02.js. No live quote, consent or customer data was submitted.

## Source routing preserved

| Practice answers | Recommended cover |
| --- | --- |
| No clinic; PIC for any clinic: Yes | PIC |
| No clinic; PIC for any clinic: No | Neither |
| Sole proprietor; independent locums: Yes | Clinic (includes own-clinic PIC) |
| Sole proprietor; independent locums: No | PIC |
| Partnership / Sdn Bhd; PIC elsewhere: Yes | Clinic and PIC |
| Partnership / Sdn Bhd; PIC elsewhere: No | Clinic |

Only eligible classifications show practice questions. Dependent questions appear progressively. Changing an upstream answer clears dependent answers, selected cover and clinic limit. Existing routing already matched the source; this change repairs the presentation rather than changing eligibility.

## Implemented

- A distinct Recommended Add-On section groups practice questions and relevant optional covers.
- Shared quotationAddon component: product identity, source recommendation disclosure, clinic limit, premium and explicit opt-in checkbox.
- Clinic limit is visible before opting in, as on the source portal; selecting a limit does not select coverage. A limit is required only when clinic cover is selected.
- Separate clinic and PIC premiums; selected sample amounts flow into the existing bottom-bar breakdown. Unavailable real premiums remain unavailable, never zero.
- Original recommendation explanations retained, including the distinction between own-clinic PIC and PIC elsewhere.
- Two-card desktop composition and stacked mobile layout, keyboard focus and forced-colour support.
- Policy-document access placed within the quotation page.
- Design-system specimen uses the same component as the application.

## Verification and limits

55 automated tests passed, including all six recommendation routes, selection/reset logic, conditional validation and sample pricing. JavaScript syntax checks passed. Browser verification before the final responsive adjustment confirmed the populated quotation and both selected covers. The final two-column/mobile visual recheck could not be completed because the browser connection returned “browser.user is unavailable”. This remains a visual verification limitation, not a confirmed rendering defect.

Real rating, annual/pro-rated premiums, quotation delivery and payment remain dependent on backend integration. Illustrative pricing is confined to explicitly labelled sample/review mode and is not an insurer quote. No changes were deployed to the live portal.
