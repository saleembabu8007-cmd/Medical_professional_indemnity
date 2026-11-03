import {previewApi} from './preview-api.js';
import {policyArtwork} from './visuals.js';
import {insuranceApi} from './api.js';
import {ServiceSession,claimGroups,validateClaim,validateAttachments,safeServiceLink} from './service-model.js';
import {createFormComponents} from './components.js';
import {button,notice} from './ui.js';
import {actionBar,reviewRow,reviewGroup,reviewSection} from './insurance-components.js';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mode=new URLSearchParams(location.search).get('flow')==='claims'?'claims':'renewal';
const preview=new URLSearchParams(location.search).get('sample')==='1';
const serviceApi=preview?previewApi:insuranceApi;
const session=new ServiceSession(serviceApi);let purpose=mode,view=mode==='claims'?'choices':'phone',data={},errors={},message='',files=[],policy=null,claimStep=0,busy=false;
const {field,textarea,select,question,errorFor}=createFormComponents(()=>data,()=>errors);
const main=document.querySelector('#main');
function render(focus=true){let body='';
 if(view==='complete')body=notice('Sample completed. Nothing was sent or paid.',{tone:'success'})+'<a class="btn primary" href="services.html?flow='+mode+'&sample=1">Start again</a>';

 if(view==='choices')body=`<h2>First Notification Details</h2><div class="service-options"><button class="service-option" data-action="discussion"><strong>Initial Claims Discussion</strong><span>Book An Appointment</span></button><button class="service-option" data-action="claim"><strong>Claims details</strong><span>If you have already spoken to us</span></button></div>`;
 if(view==='phone'||view==='otp')body=`<h2>Verification</h2><p class="service-intro">Please enter your registered mobile number</p><div class="fields">${field('mobile','Mobile Number',{type:'tel',full:true,hint:'+60',readonly:view==='otp'})}</div>${view==='otp'?`<div class="fields">${field('otp','OTP',{full:true})}</div><p class="hint" id="expiry"></p>${actionBar(button('Change mobile number',{action:'change',variant:'quiet'}),button('Verify',{action:'verify'}))}<button class="link-btn" data-action="resend">Resend OTP</button>`:actionBar(mode==='claims'?button('Back',{action:'choices',variant:'quiet'}):'',button('Message OTP',{action:'sms'})+button('Whatsapp OTP',{action:'whatsapp',variant:'secondary'}))}`;
 if(view==='policies')body=`<h2>Select policy</h2>${session.policies.length?session.policies.map((p,i)=>`<button class="service-option" data-policy="${i}"><strong>${esc(p.number)}</strong><span>${esc(p.name)} →</span></button>`).join(''):`<p class="service-intro">Kindly note we are unable to retrieve records of your previous policy with us.</p><a class="btn primary" href="./${preview?'?sample=1':''}">Get a Quote</a>`}`;
 if(view==='handoff'&&preview)body='<h2>'+ (purpose==='discussion'?'Book An Appointment':'Renew')+'</h2><p>'+esc(policy.number)+'</p>'+reviewGroup('',reviewRow('Name of Insured',policy.insured.name_of_insured)+reviewRow('Policy Number',policy.number))+(purpose==='discussion'?field('appointment','Preferred appointment date',{type:'date'})+'<button class="btn primary" data-action="sample-complete">Preview appointment request</button>':'<a class="btn primary" href="./?sample=1&renewal=1">Review renewal details</a>');
 if(view==='handoff'&&!preview)body=`<h2>${purpose==='discussion'?'Initial Claims Discussion':'Renew'}</h2><p class="service-intro">${esc(policy?.number||'')}</p>${safeServiceLink(policy?.url)?`<a class="btn primary" href="${esc(safeServiceLink(policy.url))}">${purpose==='discussion'?'Book An Appointment':'Continue'}</a>`:notice('This service is not available yet.',{tone:'info'})}`;
 if(view==='claim'){const [title,fields]=claimGroups[claimStep];body=`<nav class="claim-progress" aria-label="Claim progress">${[...claimGroups.map(g=>g[0]),'Review'].map((label,i)=>`<span class="${i===claimStep?'current':i<claimStep?'complete':''}" ${i===claimStep?'aria-current="step"':''}><b>${i<claimStep?'✓':i+1}</b><small>${label}</small></span>`).join('')}</nav><h2>${title}</h2><div class="fields service-fields">${fields.map(([id,label,type])=>type==='gender'?question(id,label,['Male','Female']):type==='notification'?select(id,label,['Email','Letter','Verbal','Others'],{full:true}):type==='textarea'?textarea(id,label,{rows:5}):field(id,label,{type:type||'text',full:true,readonly:['claim_policy_number','name_of_insured'].includes(id)})).join('')}</div>${actionBar(button('Back',{action:'claim-back',variant:'quiet'}),button('Continue',{action:'claim-next'}))}`;}
 if(view==='claim-review')body=`<h2>Claims details</h2><div class="review-sections">${claimGroups.map(([title,fields],i)=>reviewSection('claim-'+i,title,'edit-claim-'+i,reviewGroup('',fields.map(([id,label])=>reviewRow(label,data[id])).join('')))).join('')}</div><section class="form-section"><label for="attachments">Claims related documents and Policy Documents</label><p class="hint" id="attachments-hint">You can add multiple files, Each file should not be more than 6 MB</p><input type="file" id="attachments" aria-describedby="attachments-hint${errors.attachments?' attachments-error':''}" ${errors.attachments?'aria-invalid="true"':''} multiple accept=".pdf,.doc,.docx,.jpeg,.png,.jpg,.bmp,.xls,.xlsx"><ul class="attachment-list">${files.map((f,i)=>`<li><span>${esc(f.name)}</span> <button class="link-btn" data-remove="${i}" aria-label="Remove ${esc(f.name)}">Remove</button></li>`).join('')}</ul>${errorFor('attachments')}</section>${actionBar(button('Back',{action:'claim-back',variant:'quiet'}),button('Submit',{action:'submit'}))}`;
 const otpBody=view==='otp'?body:'';
 if(view==='otp')body='<h2>Verify your mobile number</h2><p class="service-intro">'+esc(data.mobile)+'</p><button class="btn secondary" data-action="reopen-otp">Enter OTP</button>';
 document.title=(mode==='renewal'?'Renew':'Claims')+' | DoctorShield';main.innerHTML=`<div class="service-layout"><aside class="service-rail"><div class="rail-brand-art">${policyArtwork()}</div><p class="rail-product">Chubb Elite Medical<br>Malpractice Insurance</p><nav aria-label="Services"><a href="./">Get a Quote</a><a href="services.html?flow=renewal${preview?'&sample=1':''}" ${mode==='renewal'?'aria-current="page"':''}>Renew</a><a href="services.html?flow=claims${preview?'&sample=1':''}" ${mode==='claims'?'aria-current="page"':''}>Claims</a></nav></aside><section class="card service-card"><div class="card-body"><h1>${mode==='renewal'?'Renew':'Claims'}</h1>${preview?'<details class="service-preview"><summary>Preview mode</summary><p>No information is submitted. OTP: 123456</p><button class="link-btn" data-action="sample-fill">Fill sample details</button></details>':''}<div id="service-status" role="alert">${message?notice(esc(message),{tone:'error'}):''}</div>${body}<div class="service-help"><a href="https://my.doctorshield.com/contact-us/" target="_blank" rel="noopener">Contact Us ↗</a></div></div></section></div>`;
 if(view==='otp'){main.insertAdjacentHTML('beforeend','<dialog class="service-otp" aria-label="Mobile verification"><button type="button" class="icon-btn otp-close" data-action="dismiss-otp" aria-label="Close verification">×</button>'+ (message?notice(esc(message),{tone:'error'}):'')+otpBody+'</dialog>');const dialog=main.querySelector('.service-otp');dialog.addEventListener('cancel',()=>{view='phone';data.otp='';render();});dialog.showModal();dialog.querySelector('#otp')?.focus();}
 if(focus&&view!=='otp'){main.focus();document.querySelector('[aria-invalid="true"]')?.focus();}updateExpiry();
}
function updateExpiry(){const el=document.querySelector('#expiry');if(el&&session.challenge){const n=Math.max(0,Math.ceil((session.challenge.expiresAt-Date.now())/1000));el.textContent=n?`${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`:'This OTP has expired. Request a new OTP.';document.querySelector('[data-action="verify"]').disabled=n===0;document.querySelector('[data-action="resend"]').disabled=n>0;}}
setInterval(updateExpiry,1000);
main.addEventListener('input',e=>{if(e.target.name)data[e.target.name]=e.target.value;});
window.addEventListener('beforeunload',e=>{if(view==='claim'||view==='claim-review'){e.preventDefault();e.returnValue='';}});
main.addEventListener('change',e=>{if(e.target.id==='attachments'){const next=[...files,...e.target.files];const error=validateAttachments(next);if(error)errors.attachments=error;else{files=next;delete errors.attachments;}render(false);}});
main.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.tagName==='INPUT'&&['phone','otp'].includes(view)){e.preventDefault();main.querySelector(`[data-action="${view==='phone'?'sms':'verify'}"]`)?.click();}});
main.addEventListener('click',async e=>{const target=e.target.closest('button');if(!target||busy)return;message='';errors={};
 if(target.dataset.remove!==undefined){files.splice(Number(target.dataset.remove),1);render(false);return;}
 if(target.dataset.policy!==undefined){policy=session.policies[Number(target.dataset.policy)];if(purpose==='claims'){data={mobile:data.mobile,...policy.insured,claim_policy_number:policy.number};files=[];claimStep=0;view='claim';}else view='handoff';render();return;}
 const action=target.dataset.action;
 if(action==='dismiss-otp'){view='phone';data.otp='';}
 if(action==='reopen-otp'){view='otp';}
 if(preview&&action==='sample-complete'){view='complete';}
 if(preview&&action==='sample-fill'){data.mobile='0123456789';data.otp='123456';for(const [,fields]of claimGroups)for(const [id,,type]of fields){if(!data[id])data[id]=type==='date'?new Date().toISOString().slice(0,10):type==='email'?'alex@example.com':type==='tel'?'0123456789':type==='gender'?'Male':type==='notification'?'Email':'Sample details';}}

 if(action?.startsWith('edit-claim-')){claimStep=Number(action.slice(-1));view='claim';}
 if(action==='choices'){view='choices';session.challenge=null;data.otp='';}
 if(action==='discussion'||action==='claim'){purpose=action==='discussion'?'discussion':'claims';view='phone';}
 if(action==='change'){view='phone';session.challenge=null;data.otp='';}
 if(action==='claim-back'){if(view==='claim-review'){view='claim';claimStep=3;}else if(claimStep)claimStep--;else view='policies';}
 if(action==='claim-next'){const all=validateClaim(data);for(const [id] of claimGroups[claimStep][1])if(all[id])errors[id]=all[id];if(!Object.keys(errors).length){if(claimStep===3)view='claim-review';else claimStep++;}}
 if(['sms','whatsapp','resend','verify','submit'].includes(action)){busy=true;target.disabled=true;target.setAttribute('aria-busy','true');try{
 if(['sms','whatsapp','resend'].includes(action)){await session.request(purpose,data.mobile,action==='resend'?session.challenge?.channel:action);view='otp';data.otp='';}
 if(action==='verify'){await session.verify(data.otp);data.otp='';view='policies';}
 if(action==='submit'){errors=validateClaim(data);const error=validateAttachments(files);if(error)errors.attachments=error;if(!Object.keys(errors).length){await serviceApi.submitClaim({policyId:policy.id,details:data,files});if(preview)view='complete';else message='Submission status could not be confirmed. Contact Us before trying again.';}}
 }catch(error){message=error.message;if(/Malaysian mobile/.test(message)){errors.mobile=message;message='';}if(view==='otp'&&!session.challenge)view='phone';}finally{busy=false;}}
 render();
});
render();
if(preview)document.querySelectorAll('header a,.service-rail a').forEach(a=>{const href=a.getAttribute('href');if(href?.startsWith('services.html')&&!href.includes('sample='))a.href+='&sample=1';else if(href==='./')a.href='./?sample=1';});
