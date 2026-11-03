# Customer journey preview audit — 3 November 2026

## Completed in this pass

- Isolated sample service adapter, enabled only by sample=1. No requests, storage, OTP messages, claim submission or payments leave the browser through this adapter.
- Sample OTP 123456; wrong OTP rejected; five-minute expiry retained; sample policy selection.
- Renewal policy verification and handoff to prefilled coverage/personal details. Review and consent remain user actions.
- Claims: four data-entry groups, fifth review/attachments stage, editing, file validation and simulated completion.
- Initial claims discussion: appointment-request preview.
- Purchase: valid sample-fill helper, all-step inspection, email outcome and successful/failed/pending payment dialogs.
- Preview navigation retains sample mode across purchase, renewal and claims.
- Normal integration boundaries remain unavailable rather than pretending success.

## How to preview

Use /?sample=1. Expand Interface review, choose Fill sample details, then use normal Continue/Next actions. The same panel allows direct screen/state inspection. Change classification to expose specialisations; choose clinic ownership answers to expose recommended covers and clinic declarations. Existing branch, document, premium and declaration dialogs remain available. For services use services.html?flow=renewal&sample=1 or services.html?flow=claims&sample=1. Fill sample details and use OTP 123456.

Random text is intentionally not accepted in every field: email, mobile, date, allocation totals and mandatory answers retain validation. Use the sample-fill control for valid test values. No real personal data is needed.

## Verification

57 automated tests pass, including sample OTP rejection/verification and the unchanged real submission boundary. Syntax checks pass. Browser verified purchase through successful-payment simulation, claims through completion, and renewal through populated application handoff.

## Not a production backend

Live authentication, insurer rating, policy retrieval, policy issuance, claim storage, appointment booking, email and payment processing still need real integrations. Sample payment outcomes are demonstrations, not receipts or issued policies. This audit does not claim exhaustive user testing or certification of every input combination. The visual interface is customer-oriented; sample controls are confined to preview URLs.
