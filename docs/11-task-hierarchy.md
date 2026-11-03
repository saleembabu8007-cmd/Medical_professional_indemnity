# Task hierarchy and cognitive-load refinement

This change reorganizes the application rather than adding another visual theme. It retains source wording, insurance rules and legal content.

- **Grouping and proximity:** Coverage period and Contact information are explicit labelled sections. Required practice address precedes optional patient/revenue fields. Identity information precedes the optional tax number.
- **Clear affordances:** Insurance End Date is a labelled output instead of an input. It still updates immediately from the selected start date. Users can distinguish what they must enter from what the application calculates.
- **Progressive disclosure:** Optional clinic branches are collapsed until needed; existing branches keep the section open. Eligibility wording is retained inside the section before the Add action. Removing the final branch returns focus to the disclosure control.
- **Visual hierarchy:** The clinic/PIC recommendations share one section heading instead of repeating the badge. Product marks, titles, selection and explanation remain in a consistent order.
- **Reduced competition:** Removed decorative sidebar illustration and repeated support label. Kept navigation, documents and contact access. Empty optional tax values are omitted from review; required missing data remains visible.
- **Error prevention and recognition:** Existing classification-dependent choices, parent-answer resets, linked validation, review/edit actions and native controls are preserved. No mandatory questions or agreements are hidden by this work.

These are design decisions intended to reduce scanning and unnecessary decisions, not measured claims about user performance. Not every UX heuristic applies to every control; no claim of applying all UX laws or eliminating all confusion is made.

## Verification

26 tests passed after the form restructure; final module syntax checks passed. Browser verified the calculated end date, one heading across two recommended products, and branch disclosure/dialog access. All five main screens checked at six widths (1440, 1280, 1024, 768, 390, 360): no page overflow. Console error log empty. Backend is still paused.

Final browser check: adding a test branch keeps the section open; removing the last branch closes it and correctly returns keyboard focus to Add Clinic / Branch. Test data was confined to the non-persistent local review screen.
