import {configuration} from './catalog.js';
import {clinicRoute} from './clinic-rules.js';
export const allocationTotal=values=>Math.round(Object.values(values).reduce((sum,n)=>sum+(Number(n)||0),0)*100)/100;
export function validateCoverage(data,today=new Date()){
 const errors={};
 if(!data.classification)errors.classification='Select your classification.';
 if(!configuration(data)?.limits.includes(data.liability))errors.liability='Select a limit of liability for your classification.';
 if(!data.start)errors.start='Enter the insurance start date.';
 else {const start=new Date(data.start+'T00:00:00');const day=new Date(today);day.setHours(0,0,0,0);const limit=new Date(day);limit.setMonth(limit.getMonth()+9);if(!Number.isFinite(start.getTime())||start.getFullYear()!==Number(data.start.slice(0,4))||start.getMonth()+1!==Number(data.start.slice(5,7))||start.getDate()!==Number(data.start.slice(8,10)))errors.start='Enter a valid date.';else if(start>limit)errors.start='Please enter a valid date, date should be within nine months from today.';else if(start<day)errors.start='Backdated coverage requires the existing policy eligibility service.';}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))errors.email='Enter a valid email address.';
 if(!data.consent)errors.consent='Please read and agree to the terms before continuing.';
 if(configuration(data)?.specialist&&(allocationTotal(data.allocations)!==100||Object.values(data.allocations).some(n=>!Number.isFinite(Number(n))||n<0||n>100)))errors.allocations='Complete Service Details with a total of 100%.';
 return errors;
}
export function validateQuotation(data){
 const errors={},route=clinicRoute(data,configuration(data)?.clinic ?? true);
 for(const key of route.questions)if(!data[key])errors[key]='Select an answer.';
 if(data.clinicCover&&route.clinic&&!configuration(data)?.limits.includes(data.clinicLiability))errors.clinicLiability='Please select clinic limit of liability.';
 return errors;
}
export function validatePersonal(data,today=new Date()){
 const errors={};
 for(const key of ['fullName','dob','practice','mobile','nationality'])if(!data[key]?.trim())errors[key]='Complete this field.';
 if(configuration(data)?.nric&&!data.nric?.trim())errors.nric='Enter your NRIC number.';
 if(data.nationality==='Others'&&!data.otherNationality?.trim())errors.otherNationality='Enter your country name.';
 if(data.clinicCover&&!data.clinicName?.trim())errors.clinicName='Please enter the clinic name.';
 if(data.dob&&(!Number.isFinite(new Date(data.dob).getTime())||new Date(data.dob)>today))errors.dob='Enter a valid date of birth in the past.';
 if(data.mobile&&!/^\+?[\d\s()-]{8,18}$/.test(data.mobile))errors.mobile='Enter a valid mobile number.';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email||''))errors.email='Enter a valid email address.';
 return errors;
}
export function validateDeclarations(data){
 const errors={},org=!!data.clinicCover;
 for(let i=0;i<4;i++){const key=(org?'qOrg':'q')+i;if(!data.answers[key])errors[key]='Select an answer.';}
 const risk=org?[0,1,2,3].some(i=>data.answers['qOrg'+i]==='Yes'):data.answers.q0==='Disagree'||[1,2,3].some(i=>data.answers['q'+i]==='Yes');
 const details=org?'orgDetails':'riskDetails';
 if(risk&&!data[details]?.trim())errors[details]='Please provide details below.';
 if(!data.declaration)errors.declaration='Please read and accept the declaration before continuing.';
 return errors;
}
