import test from 'node:test';
import assert from 'node:assert/strict';
import {allocationTotal,distributeAllocations,validAllocations} from '../dist/allocation-model.js';
import {sampleQuote} from '../dist/sample-quote.js';
import {premiumSummary,premiumBreakdown} from '../dist/premium-components.js';
test('equal allocation retains source keys and rounds to exactly 100%',()=>{
 const values=distributeAllocations({2:0,5:0,17:0});
 assert.deepEqual(Object.keys(values),['2','5','17']);
 assert.equal(allocationTotal(values),100);assert.ok(validAllocations(values));
 for(let n=1;n<=70;n++){const result=distributeAllocations(Object.fromEntries(Array.from({length:n},(_,i)=>[i,0])));assert.equal(allocationTotal(result),100);}
});
test('allocation requires positive finite values and an exact total',()=>{
 for(const values of [{},{0:0,1:100},{0:-1,1:101},{0:NaN},{0:Infinity},{0:99.99},{0:100.01}])assert.equal(validAllocations(values),false);
 assert.equal(validAllocations({0:33.33,1:33.33,2:33.34}),true);
});
test('sample arithmetic remains consistent for all addon combinations',()=>{
 for(const clinicCover of [false,true])for(const picCover of [false,true]){
 const q=sampleQuote({clinicCover,picCover});assert.equal(q.sample,true);
 assert.equal(q.total,q.items.reduce((sum,item)=>sum+item.amount,0));
 assert.equal(q.net,q.total-q.discount);
 assert.equal(q.final,Math.round((q.net+q.sst+q.stampDuty)*100)/100);
 assert.doesNotMatch(premiumSummary(q),/sample-badge/);
 assert.doesNotMatch(premiumBreakdown(q),/sample-notice/);
 }
});
test('normal pricing stays unavailable without an actual quote',()=>{
 assert.match(premiumSummary(),/Not yet calculated/);
 assert.doesNotMatch(premiumSummary(),/1,241/);
});


