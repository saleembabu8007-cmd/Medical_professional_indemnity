/** Design preview only. These illustrative rates are NOT insurer pricing. */
export function sampleQuote({clinicCover=false,picCover=false}={}){
 const items=[{label:'Individual indemnity',amount:1200}];
 if(clinicCover)items.push({label:'Clinic Medical Malpractice Insurance',amount:300});
 if(picCover)items.push({label:'PIC coverage',amount:150});
 const total=items.reduce((sum,item)=>sum+item.amount,0),discount=60,net=total-discount,sst=Math.round(net*8)/100,stampDuty=10;
 return {sample:true,items,total,discount,net,sst,stampDuty,final:Math.round((net+sst+stampDuty)*100)/100};
}
