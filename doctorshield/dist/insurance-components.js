import {icon} from './icons.js';
import {money} from './premium-components.js';
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/** Insurance organism. Values are text; never accepts premium assumptions. */
export function coverageContext({classification='',liability='',period='',editable=true}={}){
 if(!classification)return '';
 return `<section class="coverage-context" aria-label="Your coverage"><div class="coverage-context-main"><span class="context-symbol">${icon('shield',20)}</span><div><strong>${esc(classification)}</strong><dl class="context-facts">${liability?'<div><dt>Limit Of Liability</dt><dd>'+esc(liability)+'</dd></div>':''}${period?'<div><dt>Coverage period</dt><dd>'+esc(period)+'</dd></div>':''}</dl></div>${editable?'<button type="button" class="link-btn" data-action="edit-coverage">Edit</button>':''}</div></section>`;
}

/** Selection header and dependent detail area; html is trusted rendered form content. */
export function coverageOption({id,title,selected=false,description='',details=''}){
 return `<section class="coverage-option ${selected?'is-selected':''}"><label class="coverage-option-select" for="${esc(id)}"><input type="checkbox" name="${esc(id)}" id="${esc(id)}" ${selected?'checked':''}><span>${esc(title)}</span><span class="coverage-selected-label" aria-hidden="true">${selected?'Selected':''}</span></label><div class="coverage-option-body"><details class="recommendation"><summary>Why is this recommended?</summary><p>${esc(description)}</p></details>${details}</div></section>`;
}

/** Quotation add-on. Eligibility is resolved upstream; details are trusted form markup. */
export function quotationAddon({id,title,kind='clinic',selected=false,description='',details='',price=null,sample=false}){
 const available=typeof price==='number'&&Number.isFinite(price)&&price>=0;
 return `<section class="quotation-addon ${selected?'is-selected':''}" aria-labelledby="${esc(id)}-title">
 <header class="quotation-addon-head"><span class="addon-symbol">${icon(kind==='clinic'?'building':'shield',22)}</span><h3 id="${esc(id)}-title">${esc(title)}</h3>${selected?'<span class="addon-status" aria-hidden="true">Selected</span>':''}</header>
 <div class="quotation-addon-content">${details}<details class="recommendation"><summary>Why is this recommended?</summary><p>${esc(description)}</p></details></div>
 <div class="quotation-addon-price"><span>${kind==='clinic'?'Your clinic indemnity premium':'Your PIC coverage premium'}</span><div><strong>${money(available?price:null)}</strong><small>${available?(sample?'Before tax':''):'Not yet calculated'}</small></div></div>
 <label class="quotation-addon-choice" for="${esc(id)}"><input type="checkbox" name="${esc(id)}" id="${esc(id)}" aria-label="${esc(title)}" ${selected?'checked':''}><span>${selected?'Added to your coverage':'Add This Recommended Coverage'}</span></label>
 </section>`;
}

/** Consistent forward/back composition. Accepts trusted button renderer output only. */
export function actionBar(back='',forward=''){
 return `<div class="card-actions"><div class="action-back">${back}</div><div class="action-forward">${forward}</div></div>`;
}

/** Composed review components. Rendered content is trusted; row values are escaped. */
export const reviewRow=(label,value)=>'<div><dt>'+esc(label)+'</dt><dd>'+esc(value===null||value===undefined||value===''?'—':value)+'</dd></div>';
export const reviewGroup=(title,body)=>'<div class="review-group">'+(title?'<h3>'+esc(title)+'</h3>':'')+'<dl class="review-details">'+body+'</dl></div>';
export const reviewSection=(id,title,action,body)=>'<section class="review-panel" aria-labelledby="review-'+esc(id)+'"><header class="review-panel-head"><h2 id="review-'+esc(id)+'">'+esc(title)+'</h2>'+(action?'<button type="button" class="link-btn" data-action="'+esc(action)+'" aria-label="Edit '+esc(title)+'">Edit</button>':'')+'</header>'+body+'</section>';
