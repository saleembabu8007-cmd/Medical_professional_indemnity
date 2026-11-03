import test from 'node:test';
import assert from 'node:assert/strict';
import {createFormComponents} from '../dist/components.js';

test('shared field reads current validation state after an error object is replaced',()=>{
 const data={email:'a@example.com'};let errors={};
 const ui=createFormComponents(()=>data,()=>errors);
 assert.doesNotMatch(ui.field('email','Email'),/aria-invalid/);
 errors={email:'Enter a valid email address.'};
 const html=ui.field('email','Email');
 assert.match(html,/aria-invalid="true"/);
 assert.match(html,/aria-describedby="email-hint email-error"/);
 assert.match(html,/id="email-error"/);
});
test('input values and select options cannot inject HTML',()=>{
 const ui=createFormComponents(()=>({name:'"><script>alert(1)</script>',category:''}),()=>({}));
 assert.doesNotMatch(ui.field('name','Name'),/<script>/);
 assert.doesNotMatch(ui.select('category','Category',['<img src=x onerror=alert(1)>']),/<img/);
});
test('consent keeps linked content outside an interactive label',()=>{
 const ui=createFormComponents(()=>({consent:false}),()=>({}));
 const html=ui.check('consent','Read the <a href="/terms">terms</a>.');
 assert.match(html,/aria-labelledby="consent-label"/);
 assert.match(html,/<a href="\/terms">/);
 assert.doesNotMatch(html,/<label[^>]*>.*<a/);
});

test('long-form fields escape values and link their errors',()=>{
 const ui=createFormComponents(()=>({details:'</textarea><script>bad()</script>'}),()=>({details:'Please provide details.'}));
 const html=ui.textarea('details','Details');assert.doesNotMatch(html,/<script>/);assert.match(html,/aria-invalid="true"/);assert.match(html,/details-hint details-error/);assert.match(html,/field-error/);
});
test('phone and email atoms expose suitable input assistance',()=>{const ui=createFormComponents(()=>({}),()=>({}));assert.match(ui.field('contact','Contact',{type:'email'}),/autocapitalize="none"/);assert.match(ui.field('contact','Contact',{type:'tel'}),/inputmode="tel"/);});
