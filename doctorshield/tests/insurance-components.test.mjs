import test from 'node:test';
import assert from 'node:assert/strict';
import {coverageContext,coverageOption,actionBar} from '../dist/insurance-components.js';
test('coverage context escapes applicant-derived values and omits absent context',()=>{
 assert.equal(coverageContext({}), '');
 const result=coverageContext({classification:'<img onerror="run()">',liability:'RM 1,000,000',editable:false});
 assert.ok(!result.includes('<img'));
 assert.ok(result.includes('&lt;img'));
 assert.ok(!result.includes('data-action'));
});
test('coverage selection preserves native checkbox state and escapes source descriptions',()=>{
 const result=coverageOption({id:'clinicCover',title:'Clinic cover',selected:true,description:'<script>bad()</script>'});
 assert.match(result,/type="checkbox" name="clinicCover" id="clinicCover" checked/);
 assert.match(result,/for="clinicCover"/);
 assert.ok(!result.includes('<script>'));
});
test('action area does not introduce a second submit control',()=>{
 const result=actionBar('<button type="button">Back</button>','<button type="button">Continue</button>');
 assert.equal((result.match(/<button/g)||[]).length,2);
 assert.ok(!result.includes('type="submit"'));
});
import {reviewRow,reviewGroup,reviewSection} from '../dist/insurance-components.js';
test('review composition escapes values and identifies edit targets',()=>{const html=reviewSection('personal','Your details','edit-personal',reviewGroup('Contact details',reviewRow('Email','<script>bad()</script>')));assert.doesNotMatch(html,/<script>/);assert.match(html,/aria-label="Edit Your details"/);assert.match(html,/aria-labelledby="review-personal"/);assert.match(html,/<dl class="review-details">/);});
test('coverage context exposes distinct limit and period facts',()=>{const html=coverageContext({classification:'Doctor',liability:'RM 500,000',period:'1 Jan – 31 Dec'});assert.match(html,/<dt>Limit Of Liability<\/dt>/);assert.match(html,/<dt>Coverage period<\/dt>/);});
