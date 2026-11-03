import test from 'node:test';
import assert from 'node:assert/strict';
import {readDraft,saveDraft,clearDraft} from '../dist/draft.js';
const storage=()=>{let value=null;return {getItem:()=>value,setItem:(_,v)=>value=v,removeItem:()=>value=null};};
const defaults={fullName:'',declaration:false,allocations:{},answers:{},branches:[]};
test('tab draft survives reload and retains the current step',()=>{const store=storage();saveDraft(store,{...defaults,fullName:'Test'},2,2,1000);assert.equal(readDraft(store,defaults,1001).data.fullName,'Test');assert.equal(readDraft(store,defaults,1001).stage,2);clearDraft(store);assert.equal(readDraft(store,defaults,1002),null);});
test('expired or malformed draft does not break application startup',()=>{const store=storage();saveDraft(store,defaults,0,0,1000);assert.equal(readDraft(store,defaults,1000+21600001),null);store.setItem('', '{invalid');assert.equal(readDraft(store,defaults),null);assert.equal(readDraft(undefined,defaults),null);assert.equal(saveDraft(undefined,defaults,0,0),false);});
test('unexpected draft fields and invalid allocations are not restored',()=>{const store=storage();saveDraft(store,{...defaults,unknown:'discard',allocations:{a:100,0:-2,1:50},answers:{q0:'Agree',q1:'invalid'},branches:[{name:'Only name'}]},99,99,1000);const d=readDraft(store,defaults,1001);assert.equal(d.stage,0);assert.equal(d.data.unknown,undefined);assert.deepEqual(d.data.allocations,{1:50});assert.deepEqual(d.data.answers,{q0:'Agree'});assert.deepEqual(d.data.branches,[]);});
