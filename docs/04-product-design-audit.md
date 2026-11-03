# DoctorShield product design audit and implementation

29 October 2026 · Local frontend, backend integration deferred

## Assessment

The previous interface had usable form primitives but still read as a review build. Its dark promotional rail, repeated product descriptions, placeholder financial rows and conspicuous development notices competed with the application. Component styling had accumulated through successive overrides. The redesign now uses a lighter photographic direction, a single active component stylesheet, concise headings and a consistent control system.

This is an implemented frontend refinement, not a claim that the complete insurance service is ready to launch. Quote generation, policy-specific documents, underwriting decisions, OTP, email and payment still require the existing services.

## Findings and corrections

| Area | Finding | Implemented change |
|---|---|---|
| Composition | Large navy rail dominated the form and looked like a generic landing-page panel | Light product card, editorial medical photograph, restrained product identification and separate policy links |
| Imagery | Decorative shield diagram did not add useful information | One purpose-made medical portrait, following the user's photographic reference; no ornamental shield graphics |
| Hierarchy | Step number, uppercase category, title, description and repeated form heading all described the same screen | One page title, persistent step navigation, short section headings; repeated explanatory copy removed |
| Brand | Primary actions were navy throughout | Exact brand teal `#08A5B5` for primary actions and active step markers; navy anchors headings and secondary emphasis |
| Contrast | White small text on the supplied teal is insufficient for normal text | Dark button text on teal, measured at 4.73:1; darker teal links on white at 5.97:1 |
| Controls | Border, radius and height values were inconsistent across rounds | Shared 48px control height, 8px control radius, 14px panel radius, consistent field labels, hints and errors |
| States | Selected and disabled states were not systematic | Defined hover, pressed, selected, focus-visible, disabled, error and readonly treatments |
| Icons | All icons lived in the application file | One shared `icons.js` source, common 24-unit grid and 1.65 stroke; decorative icons hidden from assistive technology |
| Copy | Development explanations appeared before the user reached the relevant feature | Global build banner removed; service limitations shown at quotation/payment, where they affect the next action |
| Consent | Checkbox duplicated “I agree” before the original consent sentence | Duplicate removed, original consent text and links retained; checkbox has an accessible name without nesting links inside its label |
| Recommendations | Uppercase technical categories and repeated premium labels made cards busy | Simple recommendation label, clear cover title, disclosure for original explanation, consistent opt-in control |
| Summary | Six empty price rows resembled unfinished scaffolding | Breakdown retained in a disclosure; unavailable quotation/payment state stated explicitly; payment action disabled until integration |
| Mobile | Full promotional rail pushed the actual form down | Small product image and product identity; the form takes priority; single-column controls and 16px input text |
| Maintenance | Multiple stylesheet generations could override one another | Application and component reference load only `application.css` and its shared token file; previous styles are no longer part of the live page |

## Atomic system

**Foundations:** exact brand colours, semantic surface/text/link/error colours, Kanit headings, Inter body, 4px spacing base, typography roles, control geometry and reduced-motion behavior. These are in `dist/tokens.css`.

**Atoms:** shared icons, text labels, optional markers, input/select/textarea controls, primary/secondary/quiet buttons, icon buttons, radio and checkbox inputs, links and badges.

**Composed controls:** labelled fields with hints and inline errors; radio question groups; consent rows; date pair; specialisation allocation rows; recommendation cards; feedback notices; error summary; disclosure; document links.

**Screen patterns:** persistent progress navigation, left policy context/right form, conditional practice questionnaire, branch editor dialog, declaration questions, review sections and premium breakdown. The component reference uses the same CSS as the portal.

Primary buttons use dark text deliberately. Changing them to small white text on the supplied teal would reduce readability. Borders, radio selection and focus rings provide additional state cues beyond colour alone.

## Content policy

Removed repetition and implementation-oriented copy from the main flow. Retained PIDM wording, the terms/privacy consent, disclosure questions, recommendation explanations, policy links and branch revenue condition. General interface labels were shortened where the meaning stays intact. No premium, tax calculation, completed submission, payment success or insurer approval has been invented.

The portrait is generated editorial imagery of a fictional physician. It does not identify a DoctorShield employee, customer or endorser. It is decorative (`alt=""`) because it does not communicate form instructions. The delivered JPEG is approximately 123 KiB; the original PNG remains available as source artwork.

## Flow integrity retained

The existing source-derived recommendation model remains unchanged:

| Clinic situation | Further answer | Recommendation |
|---|---|---|
| Does not own a clinic | PIC for any clinic: No | No clinic/PIC add-on |
| Does not own a clinic | PIC for any clinic: Yes | PIC |
| Sole proprietor | Hires locums seeing new patients independently: Yes | Clinic indemnity |
| Sole proprietor | Locum answer: No | PIC |
| Partnership / Sdn Bhd | PIC for another establishment: No | Clinic indemnity |
| Partnership / Sdn Bhd | PIC for another establishment: Yes | Clinic indemnity and PIC |

Recommendations are optional. Choosing clinic cover requires its liability limit. Changes to upstream answers clear dependent cover selections. Medical-establishment declarations replace individual-only questions when clinic cover is selected. Twenty-two classification configurations remain in the local snapshot, obtained from the original public portal on 28 October 2026.

## Verification and release limits

The existing unit suite covers all six terminal recommendation routes, incomplete branches, dependent resets, classification configurations, required fields, disclosures and tab draft recovery. Browser checks cover desktop and narrow/mobile layouts, primary controls, validation and conditional recommendations. These checks are not a full accessibility certification or a substitute for testing on physical iOS and Android devices.

Before a public launch, the backend must provide current classification rules, dynamically valid specialisation/limit combinations, actual rates and taxes, quotation documents, underwriting/referral outcomes, OTP, email and payment. Supplementary-question activation and renewal/backdating routes still need service contracts and acceptance scenarios. The static snapshot must not be treated as an authoritative insurance eligibility engine.

The frontend saves a draft in session storage with a six-hour expiry. “Start again” clears that tab's draft after confirmation. This is local convenience, not an authenticated account or durable cross-device save. Deployment requires a suitable retention/privacy decision and backend validation of every submitted field.

## Files

- `doctorshield/dist/tokens.css`: semantic foundations
- `doctorshield/dist/application.css`: active components, states and responsive layouts
- `doctorshield/dist/icons.js`: shared vector icon source
- `doctorshield/dist/app.js`: screen composition and interaction
- `doctorshield/dist/design-system.html`: component reference
- `doctorshield/dist/assets/physician-portrait.jpg`: optimized production image asset
- `doctorshield/dist/assets/physician-portrait.png`: original generated artwork
- `docs/05-image-art-direction.md`: image provenance and exact generation prompt

Do not rerun the one-off migration scripts (`refine-interface.mjs`, `finish-interface.mjs`, `audit-improvements.mjs`, `polish-design.mjs`) on the current source. They document applied migrations and are not build commands. Run `npm run dev`, `npm run check` and `npm test` from `doctorshield`.

## Completed checks for this revision

- 23 regression tests passed.
- JavaScript syntax checks passed.
- Restyled clinic route checked in-browser, including dependent locum question and clinic liability selection.
- No horizontal overflow at 320, 390, 768 and 1024px in the checked coverage/recommendation layouts.
- No missing aria-describedby targets on the checked recommendation screen.
- Desktop and mobile captures saved as `docs/polished-desktop.png` and `docs/polished-mobile.png`.
