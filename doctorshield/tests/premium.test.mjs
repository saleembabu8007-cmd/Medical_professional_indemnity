import test from 'node:test';
import assert from 'node:assert/strict';
import {money,premiumSummary,premiumBreakdown} from '../dist/premium-components.js';
test('unavailable and invalid prices are never presented as zero',()=>{for(const value of [null,undefined,NaN,Infinity,-1,'100'])assert.equal(money(value),'RM —');assert.equal(money(0),'RM 0.00');assert.equal(money(1234.5),'RM 1,234.50');});
test('bar and breakdown use the same final amount without adding tax twice',()=>{const q={total:100,discount:10,net:90,sst:7.2,stampDuty:10,final:107.2};assert.match(premiumSummary(q),/RM 107.20/);assert.match(premiumBreakdown(q),/RM 107.20/);assert.match(premiumBreakdown(q),/SST 8%/);assert.doesNotMatch(premiumBreakdown(q),/not available/);});
test('unconnected quote retains all six source rows and dialog semantics',()=>{assert.equal((premiumBreakdown().match(/<tr/g)||[]).length,6);assert.match(premiumSummary(),/aria-haspopup="dialog"/);assert.match(premiumSummary(),/Not yet calculated/);assert.match(premiumBreakdown(),/Payment is not available yet/);});
test('partial quotes do not imply an all-inclusive verified price',()=>{assert.match(premiumSummary({final:100}),/Not yet calculated/);assert.match(premiumBreakdown({final:100}),/Payment is not available yet/);});
