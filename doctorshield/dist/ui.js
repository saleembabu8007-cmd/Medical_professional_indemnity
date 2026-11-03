import {icon} from './icons.js';

const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

/** Shared action atom. Labels are text; icons are drawn from the local icon set. */
export function button(label, {action, variant='primary', leading, trailing, disabled=false, loading=false, describedBy='', size='regular'}={}) {
  return `<button type="button" class="btn ${variant}${size==='small'?' small':''}"${action?` data-action="${escape(action)}"`:''}${disabled||loading?' disabled':''}${loading?' aria-busy="true"':''}${describedBy?` aria-describedby="${escape(describedBy)}"`:''}>${leading?icon(leading,18):''}<span>${escape(label)}</span>${trailing?icon(trailing,18):''}</button>`;
}

/** Contextual feedback. Content is trusted application markup, never raw user input. */
export function notice(content, {tone='info', title='', live=false}={}) {
  return `<div class="notice ${tone}-notice"${live?` role="${tone==='error'?'alert':'status'}"`:''}>${icon(tone==='success'?'check':'info',20)}<div>${title?`<strong>${escape(title)}</strong>`:''}${content}</div></div>`;
}

/** Labelled section heading, kept separate from the page's single h1. */
export function sectionHeading(title, name='file', note='') {
  return `<div class="section-head"><span class="icon-box">${icon(name)}</span><h2>${escape(title)}</h2>${note?`<small>${escape(note)}</small>`:''}</div>`;
}

/** Factual document metadata and an explicit external destination. */
export function documentRow({title,href,type=''}) {
  const url=new URL(href);
  if(url.protocol!=='https:')throw new TypeError('Document links must use HTTPS');
  return `<a class="document-row" href="${escape(url.href)}" target="_blank" rel="noopener"><span class="document-row-symbol">${icon('file',20)}</span><span class="document-row-content"><strong>${escape(title)}</strong>${type?`<small>${escape(type)}</small>`:''}</span>${icon('external',16)}<span class="sr-only"> (opens in a new tab)</span></a>`;
}
