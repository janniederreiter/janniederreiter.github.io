/* Include this script alongside any iframe[data-coachmatch-embed].
   It adjusts iframe height using only messages from that iframe's own origin. */
(function () {
  'use strict';
  function frames(){return Array.from(document.querySelectorAll('iframe[data-coachmatch-embed]'));}
  function ask(iframe) {
    try {iframe.contentWindow.postMessage({type:'coachmatch:request-height'},new URL(iframe.src,location.href).origin);} catch (_) {}
  }
  function init(){
    frames().forEach(f=>{
      if (!f.dataset.cmInitialized){
        f.dataset.cmInitialized='1';
        f.style.width='100%';
        f.style.border='0';
        f.style.display='block';
        if(!f.style.height)f.style.height='950px';
        f.addEventListener('load',()=>ask(f));
      }
      ask(f);
    });
  }
  window.addEventListener('message',event=>{
    const d=event.data;
    if(!d||d.type!=='coachmatch:height'||!Number.isFinite(d.height))return;
    for(const frame of frames()){
      try {
        if(event.source!==frame.contentWindow)continue;
        if(event.origin!==new URL(frame.src,location.href).origin)continue;
        frame.style.height=Math.max(420,Math.min(6000,Math.ceil(d.height)+4))+'px';
      }catch(_){}
    }
  });
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
