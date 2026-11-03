/** Percentage arithmetic in hundredths, shared by the selector and its tests. */
export const allocationTotal=values=>Math.round(Object.values(values).reduce((sum,value)=>sum+(Number.isFinite(value)?value:0),0)*100)/100;
export function distributeAllocations(values){
 const keys=Object.keys(values);if(!keys.length)return {};
 const share=Math.floor(10000/keys.length),remainder=10000-share*keys.length;
 return Object.fromEntries(keys.map((key,index)=>[key,(share+(index<remainder?1:0))/100]));
}
export function validAllocations(values){return Object.keys(values).length>0&&Object.values(values).every(v=>Number.isFinite(v)&&v>0&&v<=100)&&allocationTotal(values)===100;}
