/* A visible failure state, even if a later application script never loads. */
(()=>{let failed=false;const show=()=>{const node=document.querySelector('#a-script-failure');if(node&&failed)node.hidden=false};window.addEventListener('error',e=>{if(e.target?.tagName==='SCRIPT'||e.filename?.includes(location.host)){failed=true;show()}},true);document.addEventListener('DOMContentLoaded',show)})();
