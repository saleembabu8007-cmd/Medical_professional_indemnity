/** Explicit local simulation. Never used without sample=1/review=1. No network or storage. */
export const previewApi=Object.freeze({
 async requestServiceOtp(){return {challengeId:'sample-only',expiresAt:Date.now()+300000};},
 async verifyServiceOtp({code}){return {verified:code==='123456',policies:code==='123456'?[{id:'sample-policy',number:'SAMPLE-DS-2026-001',name:'Alex Tan · Medical indemnity',insured:{name_of_insured:'Alex Tan',claim_contact_email:'alex@example.com',claim_phone_number:'0123456789'}}]:[]};},
 async submitClaim(){return {reference:'SAMPLE-CLAIM-001'};}
});
