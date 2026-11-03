const key='doctorshield.application.v1';
const lifetime=6*60*60*1000;
export function readDraft(storage, defaults, now=Date.now()) {
 try {
  const draft=JSON.parse(storage.getItem(key));
  if(!draft||draft.version!==1||!Number.isFinite(draft.savedAt)||now-draft.savedAt>lifetime)return null;
  const data={...defaults};
  for(const name of Object.keys(defaults)){
   if(typeof defaults[name]==='string'&&typeof draft.data?.[name]==='string')data[name]=draft.data[name].slice(0,20000);
   if(typeof defaults[name]==='boolean'&&typeof draft.data?.[name]==='boolean')data[name]=draft.data[name];
  }
  data.allocations=Object.fromEntries(Object.entries(draft.data?.allocations||{}).filter(([i,n])=>/^\d+$/.test(i)&&Number.isFinite(n)&&n>=0&&n<=100));
  data.answers=Object.fromEntries(Object.entries(draft.data?.answers||{}).filter(([i,v])=>/^q(?:Org)?[0-3]$/.test(i)&&['Yes','No','Agree','Disagree'].includes(v)));
  data.branches=Array.isArray(draft.data?.branches)?draft.data.branches.slice(0,4).filter(b=>b&&['name','address','phone'].every(k=>typeof b[k]==='string')).map(b=>({name:b.name.slice(0,500),address:b.address.slice(0,2000),phone:b.phone.slice(0,30)})):[];
  const stage=Number.isInteger(draft.stage)&&draft.stage>=0&&draft.stage<=4?draft.stage:0;
  const maxStage=Number.isInteger(draft.maxStage)&&draft.maxStage>=0&&draft.maxStage<=4?draft.maxStage:0;
  return {data,stage:Math.min(stage,maxStage),maxStage};
 } catch {return null;}
}
export function saveDraft(storage,data,stage,maxStage,now=Date.now()) {
 try{storage.setItem(key,JSON.stringify({version:1,savedAt:now,data,stage,maxStage}));return true;}catch{return false;}
}
export function clearDraft(storage){try{storage.removeItem(key);}catch{}}
