function checkDocument(config){
 const normalize=value=>String(value).replace(/\s+/g,' ').trim(),checks=[];
 if(config.focus_selector)document.querySelector(config.focus_selector)?.focus();
 for(const check of config.checks||[]){let passed=true,actual=[];try{const nodes=[...document.querySelectorAll(check.selector)],node=nodes[0];
  if(check.exists===false)passed=nodes.length===0;else passed=nodes.length>0;
  if(check.count!==undefined)passed=passed&&nodes.length===check.count;
  if(check.textIncludes!==undefined){const found=nodes.some(n=>normalize(n.textContent).includes(normalize(check.textIncludes)));passed=passed&&found;actual.push(node?.textContent?.slice(0,200)||'(absent)')}
  for(const [name,value]of Object.entries(check.attributes||{})){const got=node?.getAttribute(name);passed=passed&&(value===null?got===null:got===String(value));actual.push(name+'='+got)}
  for(const [property,value]of Object.entries(check.style||{})){const got=node?getComputedStyle(node).getPropertyValue(property).trim():'(absent)';const probe=document.createElement('span');probe.style.setProperty(property,String(value));probe.style.position='absolute';document.body.append(probe);const expected=/color$|^font-weight$/.test(property)?getComputedStyle(probe).getPropertyValue(property).trim():String(value).trim();probe.remove();passed=passed&&got===expected;actual.push(property+': '+got)}
 }catch(error){passed=false;actual.push(error.message)}checks.push({selector:check.selector,passed,actual:actual.join(' · ')})}
 parent.postMessage({nunyaWebCheck:true,token:config.token,checks},'*');
 document.addEventListener('submit',event=>event.preventDefault());document.addEventListener('click',event=>{if(event.target.closest('a'))event.preventDefault()});
}

const ready=()=>setTimeout(()=>{document.body.getBoundingClientRect();checkDocument(JSON.parse(document.getElementById('nunya-web-config').textContent))},30);if(document.readyState==='complete')ready();else window.addEventListener('load',ready,{once:true});
