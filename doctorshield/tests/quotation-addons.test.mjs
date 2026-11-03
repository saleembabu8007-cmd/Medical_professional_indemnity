import test from 'node:test';
import assert from 'node:assert/strict';
import {quotationAddon} from '../dist/insurance-components.js';
import {clinicRoute,resetClinicDependents} from '../dist/clinic-rules.js';
import {validateQuotation} from '../dist/validation.js';
import {sampleQuote} from '../dist/sample-quote.js';

test('clinic limit can be inspected before adding optional coverage',()=>{
 const html=quotationAddon({id:'clinicCover',title:'Clinic Medical Malpractice Insurance',details:'<select id="clinicLiability"></select>'});
 assert.match(html,/id="clinicLiability"/);assert.match(html,/Add This Recommended Coverage/);
 assert.match(html,/Not yet calculated/);assert.doesNotMatch(html,/RM 0\.00/);
 assert.doesNotMatch(html,/ checked/);
});
test('selected add-on exposes its price, state, label and explanation safely',()=>{
 const html=quotationAddon({id:'picCover',kind:'pic',title:'PIC coverage',selected:true,price:150,sample:true,description:'<script>test</script>'});
 assert.match(html,/RM 150\.00/);assert.match(html,/Before tax/);
 assert.match(html,/aria-label="PIC coverage" checked/);assert.match(html,/Added to your coverage/);
 assert.doesNotMatch(html,/<script>/);
});
test('choosing a clinic limit is not consent to add cover',()=>{
 const data={classification:'General Medical Practitioner',clinic:'Yes',ownership:'Partnership / Sdn Bhd',picOther:'No',clinicCover:false,clinicLiability:'RM 1,000,000'};
 assert.deepEqual(validateQuotation(data),{});assert.equal(sampleQuote(data).items.length,1);
 assert.ok(validateQuotation({...data,clinicCover:true,clinicLiability:''}).clinicLiability);
});
test('changed practice answers remove both add-ons from sample totals',()=>{
 const data={clinic:'Yes',ownership:'Partnership / Sdn Bhd',picOther:'Yes',clinicCover:true,picCover:true,clinicLiability:'RM 1,000,000'};
 assert.equal(sampleQuote(data).items.length,3);
 data.clinic='No';resetClinicDependents(data,'clinic');
 assert.equal(sampleQuote(data).items.length,1);assert.equal(clinicRoute(data).clinic,false);assert.equal(clinicRoute(data).pic,false);
 assert.equal(data.clinicLiability,'');
});

