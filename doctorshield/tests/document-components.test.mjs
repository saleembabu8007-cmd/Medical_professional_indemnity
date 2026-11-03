import test from 'node:test';
import assert from 'node:assert/strict';
import {documentRow} from '../dist/ui.js';
import {reviewRow} from '../dist/insurance-components.js';
import {createFormComponents} from '../dist/components.js';

test('document rows escape metadata and reject executable destinations',()=>{
 const html=documentRow({title:'<script>unsafe</script>',href:'https://example.com/document.pdf',type:'PDF'});
 assert.doesNotMatch(html,/<script>/);
 assert.match(html,/opens in a new tab/);
 assert.match(html,/rel="noopener"/);
 assert.throws(()=>documentRow({title:'Unsafe',href:'javascript:alert(1)'}),TypeError);
});
test('review distinguishes a genuine zero from an absent value',()=>{
 assert.match(reviewRow('Patients',0),/<dd>0<\/dd>/);
 assert.match(reviewRow('Patients',null),/<dd>—<\/dd>/);
});
test('invalid radio groups expose the error on the fieldset and escape option text',()=>{
 const forms=createFormComponents(()=>({}),()=>({clinic:'Choose an option.'}));
 const html=forms.question('clinic','Clinic',['<script>bad</script>']);
 assert.match(html,/<fieldset aria-invalid="true" aria-describedby="clinic-error">/);
 assert.doesNotMatch(html,/<script>/);
});
