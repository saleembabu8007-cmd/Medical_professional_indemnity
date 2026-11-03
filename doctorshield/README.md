# DoctorShield Individual Indemnity

Local frontend with five application stages, conditional clinic/PIC cover, branch editing, declarations, review and supporting dialogs. Plain JavaScript ES modules; no framework or build dependency.

## Run

From this folder, run npm run dev. The default port is 4173. If that port is occupied, use PowerShell: $env:PORT='4174'; npm run dev. Open http://127.0.0.1:4174/ for the server used in this workspace.

## Verify

npm run check checks every client module. npm test checks validation, all six clinic/PIC terminal routes, classification rules, draft recovery and shared controls. Open /design-system.html for the component reference. ?sample=1 and ?review=1 expose local sample journeys and screen inspection controls. Use Fill sample details; service OTP is 123456. Renewal and claims previews use services.html?flow=renewal&sample=1 and services.html?flow=claims&sample=1.

## Architecture

- tokens.css: brand, semantic colors, typography, spacing, motion and geometry.
- application.css: shared components and responsive layout.
- components.js: native input, select, radio-group and consent atoms.
- ui.js: shared buttons, section headings and status notices.
- app.js: screen composition, navigation and local interaction state.
- clinic-rules.js, catalog.js and validation.js: independent business rules and validation.
- draft.js: six-hour sessionStorage draft scoped to a browser tab, with graceful storage failure.
- content.js: source notices, declarations and supporting copy.
- api.js: explicit unconnected service boundary.

## Backend boundary

No real premium is calculated, application submitted, OTP/email delivered or payment initiated. Real payment remains disabled; sample mode offers explicitly simulated outcomes. The 22-classification catalog is a public-source snapshot, not authoritative server underwriting. Final eligibility, premiums, dynamic policy wording, expiry, backdating/renewal and recovery require integration and acceptance testing.

Generated portrait assets are retained on disk but are not used in transactional screens. Earlier migration scripts and legacy styles are historical; do not rerun them. Current entry points load application.css and product-compositions.css; service and library pages also load their respective styles.

See ../docs/07-product-system-audit.md for the current audit and component contract.

