// Verified against the public portal's question handlers, 2 November 2026.
export const clinicExplanation = 'Clinic indemnity protects the clinic as a business entity. When the clinic is named in a lawsuit because of something a nurse, a dispenser, a locum, or any staff member did under its roof, clinic indemnity is what defends the clinic and pays damages on its behalf.';
export const picExplanation = 'PIC coverage protects the individual registered as the Person in Charge under the Private Healthcare Facilities and Services Act 1998. This is a distinct legal role, and it carries distinct legal exposure. Not for clinical decisions, but for governance failures. Inadequate protocols, lapses in compliance, failure to maintain staff credentials, poor record keeping, problems with emergency preparedness.';
export function clinicRoute(data, eligible = true) {
 const route = { questions: [], clinic: false, pic: false, clinicText: '', picText: '' };
 if (!eligible) return route;
 route.questions.push('clinic');
 if (data.clinic === 'No') {
  route.questions.push('picAny');
  if (data.picAny === 'Yes') { route.pic = true; route.picText = picExplanation; }
 } else if (data.clinic === 'Yes') {
  route.questions.push('ownership');
  if (data.ownership === 'Sole Proprietor') {
   route.questions.push('locum');
   if (data.locum === 'Yes') route.clinic = true;
   if (data.locum === 'No') { route.pic = true; route.picText = 'PIC coverage is recommended as the sole trader extension of a sole proprietor does not cover the PIC. ' + picExplanation; }
  } else if (data.ownership === 'Partnership / Sdn Bhd') {
   route.questions.push('picOther');
   if (['Yes','No'].includes(data.picOther)) route.clinic = true;
   if (data.picOther === 'Yes') { route.pic = true; route.picText = 'Clinic indemnity will cover for the PIC of the clinic you own but it wont cover for the PIC duties that you carry out for other establishements, hence you are recommended to buy a clinic indemnity and top up your individual indemnity with a PIC add-on.'; }
  }
 }
 if (route.clinic) route.clinicText = clinicExplanation + (route.pic ? '' : ' Clinic indemnity also provides cover for PIC.');
 return route;
}
export function resetClinicDependents(data, changed) {
 const dependents = {classification:['clinic','ownership','locum','picAny','picOther'],clinic:['ownership','locum','picAny','picOther'],ownership:['locum','picAny','picOther']};
 for (const key of dependents[changed] || []) data[key] = '';
 if (['classification','clinic','ownership','locum','picAny','picOther'].includes(changed)) {
  data.clinicCover = false; data.picCover = false; data.clinicLiability = '';
 }
 if (changed !== 'picCover') { data.declaration = false; }
}
