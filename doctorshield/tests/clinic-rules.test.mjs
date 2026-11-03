import test from 'node:test';
import assert from 'node:assert/strict';
import {clinicRoute,resetClinicDependents} from '../dist/clinic-rules.js';
import {validateQuotation,validateDeclarations,validateCoverage} from '../dist/validation.js';
import {catalog} from '../dist/catalog.js';
const gp={classification:'General Medical Practitioner'};
const cases=[
 [{clinic:'No',picAny:'No'},false,false,['clinic','picAny']],
 [{clinic:'No',picAny:'Yes'},false,true,['clinic','picAny']],
 [{clinic:'Yes',ownership:'Sole Proprietor',locum:'Yes'},true,false,['clinic','ownership','locum']],
 [{clinic:'Yes',ownership:'Sole Proprietor',locum:'No'},false,true,['clinic','ownership','locum']],
 [{clinic:'Yes',ownership:'Partnership / Sdn Bhd',picOther:'Yes'},true,true,['clinic','ownership','picOther']],
 [{clinic:'Yes',ownership:'Partnership / Sdn Bhd',picOther:'No'},true,false,['clinic','ownership','picOther']]
];
for(const [answers,clinic,pic,questions] of cases)test('source branch: '+JSON.stringify(answers),()=>{
 const route=clinicRoute(answers);assert.equal(route.clinic,clinic);assert.equal(route.pic,pic);assert.deepEqual(route.questions,questions);
 assert.deepEqual(validateQuotation({...gp,...answers}),{});
 if(clinic){assert.ok(validateQuotation({...gp,...answers,clinicCover:true}).clinicLiability);assert.deepEqual(validateQuotation({...gp,...answers,clinicCover:true,clinicLiability:'RM 1,000,000'}),{});}
});
test('incomplete ownership never prematurely recommends clinic cover',()=>{
 for(const d of [{clinic:'Yes'},{clinic:'Yes',ownership:'Sole Proprietor'},{clinic:'Yes',ownership:'Partnership / Sdn Bhd'}])assert.equal(clinicRoute(d).clinic,false);
});
test('no clinic questions apply to a classification without medical establishment cover',()=>{assert.deepEqual(clinicRoute({},false).questions,[]);assert.deepEqual(validateQuotation({classification:'Nurses'}),{});});
test('changing owner answer clears hidden answers, selected covers and liability',()=>{const d={clinic:'No',ownership:'Sole Proprietor',locum:'Yes',picOther:'Yes',picAny:'Yes',clinicCover:true,picCover:true,clinicLiability:'RM 1,000,000',declaration:true};resetClinicDependents(d,'clinic');for(const key of ['ownership','locum','picOther','picAny','clinicLiability'])assert.equal(d[key],'');assert.equal(d.clinicCover,false);assert.equal(d.picCover,false);assert.equal(d.declaration,false);});
test('changing locum answer clears previously selected cover',()=>{const d={clinic:'Yes',ownership:'Sole Proprietor',locum:'No',clinicCover:true,clinicLiability:'RM 1,000,000'};resetClinicDependents(d,'locum');assert.equal(d.clinicCover,false);assert.equal(d.clinicLiability,'');assert.equal(clinicRoute(d).pic,true);});
test('medical establishment declarations replace individual declarations',()=>{assert.deepEqual(validateDeclarations({clinicCover:true,answers:{qOrg0:'No',qOrg1:'No',qOrg2:'No',qOrg3:'No'},declaration:true}),{});});
test('22 classification configurations use their own limits and specialisations',()=>{assert.equal(Object.keys(catalog).length,22);for(const [name,c]of Object.entries(catalog)){assert.ok(c.limits.length,name);if(c.specialist)assert.ok(c.specialisations.length,name);}assert.equal(catalog['Dentist (Private sector)'].specialist,true);assert.equal(catalog.Nurses.clinic,false);});
test('liability from an unrelated classification cannot validate',()=>{const d={classification:'General Medical Practitioner',liability:'RM 123',start:'2026-11-01',email:'test@example.com',consent:true,allocations:{}};assert.ok(validateCoverage(d,new Date('2026-10-28')).liability);});
