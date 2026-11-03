/** Decorative brand artwork. No policy status or coverage claim is represented. */
export function policyArtwork(){return `<svg class="policy-artwork" viewBox="0 0 280 208" fill="none" aria-hidden="true">
<path d="M22 184H262" stroke="#CBD9DE"/><ellipse cx="140" cy="181" rx="109" ry="9" fill="#E2ECEF"/>
<path d="M43 59 137 26 235 59V178H43Z" fill="#F3F8F9" stroke="#B7CCD2" stroke-width="1.5"/>
<path d="M137 26V178H235V59Z" fill="#E5F0F2"/>
<path d="M35 64 137 28 243 64" stroke="#132766" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="61" y="83" width="56" height="47" rx="3" fill="white" stroke="#98B9C4"/>
<path d="M89 83V130M61 106H117" stroke="#98B9C4"/>
<rect x="154" y="85" width="57" height="93" rx="4" fill="#C9E5E9" stroke="#82AFBB"/>
<path d="M182 86V177" stroke="#82AFBB"/><path d="M177 130V142M189 130V142" stroke="#132766" stroke-width="2" stroke-linecap="round"/>
<rect x="100" y="47" width="42" height="35" rx="8" fill="#08A5B5"/><path d="M121 56V73M112.5 64.5H129.5" stroke="white" stroke-width="4"/>
<rect x="50" y="143" width="81" height="37" rx="5" fill="#132766"/><path d="M66 156H113M66 167H100" stroke="#A4C4D3" stroke-width="3" stroke-linecap="round"/>
<path d="M240 178V139" stroke="#628F85" stroke-width="2"/><path d="M240 157C219 159 214 138 220 132 234 132 240 145 240 157Z" fill="#80AEA1"/><path d="M240 146C258 144 264 127 256 121 241 124 238 135 240 146Z" fill="#A5C8BA"/>
<path d="M227 164H252L248 183H231Z" fill="#EDF3F3" stroke="#ACC7C8"/>
<path d="M31 149V123" stroke="#8AABB6" stroke-width="2"/><circle cx="31" cy="117" r="9" fill="#D7EBED" stroke="#91B5BE"/>
</svg>`;}

export function coverageMark(kind='clinic'){
 const path=kind==='clinic'?'M7 27V9h18v18M11 5h10v4M12 15h8m-4-4v8M13 27v-5h6v5M4 27h24':'M16 4 6 8v8c0 7 10 12 10 12s10-5 10-12V8L16 4Zm-4 12 3 3 6-7';
 return `<span class="coverage-mark" aria-hidden="true"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg></span>`;
}
