// Original code-native brand illustration. Decorative; all information is also in text.
export function policyIllustration(step=0){
const accents=['#08A5B5','#08A5B5','#132766','#08A5B5','#132766'];
return `<svg class="policy-illustration" viewBox="0 0 400 300" fill="none" aria-hidden="true">
<defs><linearGradient id="paper" x1="130" y1="35" x2="294" y2="250" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="#F4FAFB"/></linearGradient><linearGradient id="shield-fill" x1="250" y1="130" x2="323" y2="245" gradientUnits="userSpaceOnUse"><stop stop-color="#132766"/><stop offset="1" stop-color="#244B87"/></linearGradient><filter id="paper-shadow" x="65" y="0" width="300" height="300" filterUnits="userSpaceOnUse"><feDropShadow dx="0" dy="12" stdDeviation="15" flood-color="#132766" flood-opacity=".09"/></filter></defs>
<circle cx="205" cy="151" r="130" fill="#E5F4F5"/><circle cx="205" cy="151" r="103" stroke="#C3E4E7" stroke-dasharray="3 7"/>
<path d="M54 107h30m-15-15v30M335 77h16m-8-8v16" stroke="#79C9D0" stroke-width="2" stroke-linecap="round"/>
<circle cx="65" cy="210" r="4" fill="#08A5B5"/><circle cx="340" cy="227" r="5" fill="#132766" fill-opacity=".2"/>
<g transform="rotate(-7 194 143)" filter="url(#paper-shadow)"><rect x="111" y="31" width="175" height="222" rx="14" fill="url(#paper)" stroke="#D0E5E9"/>
<rect x="131" y="51" width="38" height="38" rx="10" fill="#E5F4F5"/>
<path d="M149 60v19m-9-9h19" stroke="#08A5B5" stroke-width="4" stroke-linecap="round"/>
<rect x="181" y="58" width="80" height="7" rx="3.5" fill="#132766"/><rect x="181" y="73" width="51" height="5" rx="2.5" fill="#B2C8D3"/>
<path d="M132 107h132" stroke="#DCE8ED"/><rect x="132" y="126" width="85" height="6" rx="3" fill="#7C95AB"/><rect x="132" y="141" width="116" height="5" rx="2.5" fill="#D2E0E7"/>
<rect x="132" y="164" width="16" height="16" rx="4" fill="#DBF2F0"/><path d="m136 172 3 3 5-6" stroke="#007D89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="160" y="170" width="67" height="5" rx="2.5" fill="#A3BBC8"/>
<rect x="132" y="192" width="16" height="16" rx="4" fill="#DBF2F0"/><path d="m136 200 3 3 5-6" stroke="#007D89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="160" y="198" width="53" height="5" rx="2.5" fill="#A3BBC8"/>
<rect x="132" y="222" width="91" height="5" rx="2.5" fill="#D2E0E7"/></g>
<path d="m281 128-49 18v42c0 34 49 58 49 58s49-24 49-58v-42l-49-18Z" fill="url(#shield-fill)" stroke="white" stroke-width="5"/>
<path d="m281 141-37 14v32c0 24 37 44 37 44s37-20 37-44v-32l-37-14Z" stroke="#68CAD2" stroke-opacity=".6"/>
<path d="m263 186 12 12 25-29" stroke="#7AE0DF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="51" y="149" width="81" height="49" rx="12" fill="white" stroke="#D0E5E9"/><rect x="65" y="163" width="24" height="21" rx="5" fill="${accents[step]}"/><path d="M72 169h10m-5-5v10" stroke="white" stroke-width="1.5"/><rect x="97" y="164" width="21" height="4" rx="2" fill="#9CB4C4"/><rect x="97" y="175" width="14" height="4" rx="2" fill="#D0E1E7"/>
</svg>`;}
