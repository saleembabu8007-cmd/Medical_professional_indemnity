# Live portal journey audit — 29 October 2026

## Evidence and scope
Live UI inspected at https://my-individualindemnity.doctorshield.com/ and /claims. Public source evidence is retained in audit/current-page.html and audit/original-home.js. Hidden claim field definitions were read from the live claims DOM, not inferred. No customer lookup, OTP delivery, claim submission, appointment booking or payment was performed. Authenticated policy content and gateway outcomes remain unverified.

## Journey comparison
| Journey | Live evidence | Local implementation / remaining work |
| --- | --- | --- |
| New insurance | Classification → quote → personal particulars → declarations → summary | Existing five-step frontend retained, including classification and clinic branching. Quotation API remains disconnected. |
| Renewal entry | Services → Renew → registered mobile → Message OTP or Whatsapp OTP | Added responsive service page and navigation. Malaysian phone normalization, pending guard, errors, change-number and expiry/resend states. |
| Renewal verification | renewFormOtpSend and formRenewOtpVerify; one/multiple/no policy records | Added authenticated policy selection and no-record recovery. Server-provided renewal link handoff only; local policy hydration, renewal eligibility, prefill and re-declaration remain integration work. |
| Initial claims discussion | Claims → initial discussion → mobile verification → Office365 booking link | Separate purpose-specific verification flow; authenticated link handoff supported. Booking is not performed locally. |
| Claim notification | Claims → registered mobile → OTP → policy selection → claim details | Added guarded frontend with four field groups plus review/attachments. Source fields preserved; no private data is persisted. |
| Claim attachments | PDF, DOC/DOCX, JPEG/JPG/PNG/BMP, XLS/XLSX; each ≤6 MB | Local selection/removal and size/extension validation. Server file-signature checks, malware scanning and total limits still required. |
| Checkout | Card/debit/wallet/personal banking versus business banking; POST /doPayment | Both options already existed in local summary and were retained. No premium or payment transaction fabricated. |
| Payment reconciliation | Source references failure/reject, paid and repayment flags | Added explicit getPaymentStatus adapter boundary. Gateway return UI, signed reference lookup, retry eligibility, receipts and policy issuance remain pending backend contracts. |
| Emailed quotations | Source link retrieval, expired links, already-purchased states | Existing presentation states are not authenticated retrieval. Signed-link resolver and verified quote hydration remain pending. |
| Referral/backdating | Underwriting/eligibility dependent | Existing guarded flow retained; not broadened using assumptions. |

## Claim field parity
Name of Insured; Contact Email; Phone Number; Policy Number; Hospital / Clinic / Location of Incident; Cause of Incident; Injury Details; Date of Incident/Loss; Speciality; Patient’s Name; Nationality of Patient; Gender of Patient; Claimant Solicitors / Lawyers; Claimant’s Name; Claimant’s Relationship to Patient; First Notification Received By (Email, Letter, Verbal, Others); First Notification Received On; Description of Facts/Injuries; multiple claim/policy documents.

## Source issues avoided
- Renewal countdown is three minutes while claim code mixes four-minute display and five-minute expiry. New controller requires server expiresAt; it does not guess an OTP lifetime.
- Source uses multiple record identifiers and legacy modal states. New frontend separates purpose, challenge and authenticated policy results.
- Old source includes a 2021/2022 renewal announcement. This is not copied into the new interface.
- No URL flag is trusted as proof of payment or authentication.

## Adapter contracts
requestServiceOtp({purpose: renewal|claims|discussion, phone, channel: sms|whatsapp}) → {challengeId, expiresAt: epoch milliseconds}. Must throttle server-side, normalize purpose/channel, avoid account enumeration and use an opaque challenge.
verifyServiceOtp({challengeId, code}) → {verified:true, policies:[{id, number, name, insured, url}]}. API must bind authorization to server session; client verified is a display contract, not security authorization. insured keys match claim field IDs. URL handoffs restricted to the insurance domain or Office365 booking domain.
submitClaim({policyId, details, files}) currently throws IntegrationRequiredError. Implement multipart upload, authoritative validation, idempotency and receipt before enabling success/retry handling.
getPaymentStatus: currently disconnected. Never infer a successful charge from a browser redirect, query string, local storage or a user-selected payment method.

## Verification and limits
36 unit tests pass, including disconnected-auth rejection, expiry, invalid verification, mobile normalization, required claim fields, attachments and safe links. Syntax checks pass. Browser verified entry navigation, both claim choices, empty phone validation and unavailable service response. Post-authenticated screens are implemented but not validated against a live account. Production backend and authenticated integration testing remain necessary; this is not a claim of full live parity.
