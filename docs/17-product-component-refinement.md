# Product component refinement — 30 October 2026

This pass changes the actual application, not only its library.

Shared foundations: 52px field height, semantic field padding, choice padding, section-rule and grouping tokens, 12px main surface corners. Persistent labels carry a stronger weight; invalid fields receive icon-assisted linked feedback and a restrained error surface. Read-only controls are visually distinct. Email, telephone and OTP fields expose appropriate input assistance.

Molecules: shared textarea renderer used by declaration disclosures and claim details; selected add-on header with native checkbox plus explicit selected label, separate white dependent-control area; coverage context uses distinct labelled limit/period facts instead of a concatenated sentence.

Compositions: reusable reviewRow/reviewGroup/reviewSection renderers used by the application and library; quieter review rows, grouped section separation, supporting icons on product form headings. Removed an empty pro-rata date sentence when no date exists. Preserved clinic routing, source policy wording, consent and backend boundaries.

Verification: 44 tests pass, including new escaping/validation/semantic review tests; syntax checks pass. Five screens at 1280, 820, 390 and 360px show no horizontal overflow or unlabelled input controls. Verified clinic recommendation selection and dependent liability, library dependent-field collapse, mobile library width and no library console errors. Browser preview verification resumed successfully after the previous turn's transport failure.

Limits: coverage amounts remain unconnected; authenticated claims/renewal require backend integration testing. This pass does not claim every UX issue has been eliminated or constitute an accessibility certification.
