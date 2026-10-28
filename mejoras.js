/* Radio Méndez v1.6.6 — Interfaz, horarios y publicidad. No crea reproductores nuevos. */
(()=>{
  'use strict';
  const $=id=>document.getElementById(id);
  const audio=$('radio-audio');

  // Un único HTMLAudioElement. Los botones flotantes llaman a controles ya existentes.
  const miniReconnect=$('radio-mini-reconnect');
  const miniShare=$('radio-mini-share');
  if(miniReconnect)miniReconnect.addEventListener('click',()=>{$('reconnect')?.click()});
  if(miniShare)miniShare.addEventListener('click',()=>{$('share')?.click()});

  function updateSignal(state){
    const indicator=$('radio-live-indicator');
    const mini=$('radio-mini-signal');
    const word={standby:'LISTA PARA ESCUCHAR',connecting:'CONECTANDO',playing:'EN VIVO',error:'SIN SEÑAL'}[state]||'LISTA PARA ESCUCHAR';
    if(indicator){indicator.dataset.state=state;indicator.innerHTML='<i class="radio-live-dot"></i> '+word}
    if(mini){mini.dataset.state=state;mini.textContent=state==='playing'?'AL AIRE':state==='connecting'?'CONECTANDO':state==='error'?'SIN SEÑAL':'LISTA'}
  }
  if(audio){
    audio.addEventListener('loadstart',()=>updateSignal('connecting'));
    audio.addEventListener('waiting',()=>updateSignal('connecting'));
    audio.addEventListener('playing',()=>updateSignal('playing'));
    audio.addEventListener('pause',()=>updateSignal('standby'));
    audio.addEventListener('error',()=>updateSignal('error'));
    audio.addEventListener('volumechange',()=>{
      const volume=Math.round(audio.volume*100);
      const value=audio.muted?0:volume;
      if($('volume-number'))$('volume-number').textContent=value+'%';
      if($('volume'))$('volume').value=String(value);
      if($('radio-mini-volume'))$('radio-mini-volume').value=String(value);
      if($('mute'))$('mute').setAttribute('aria-label',audio.muted?'Activar sonido':'Silenciar audio');
    });
  }

  // Muestra el espacio PREVISTO según la hora de Ecuador; no confirma la conexión de los locutores.
  // Mañana (09h–12h) y mediodía (12h–14h) se programan diariamente de forma provisional; Villa de lunes a viernes.
  const fmt=new Intl.DateTimeFormat('en-US',{timeZone:'America/Guayaquil',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
  function updateSchedule(){
    const parts=Object.fromEntries(fmt.formatToParts(new Date()).map(x=>[x.type,x.value]));
    const mins=Number(parts.hour)*60+Number(parts.minute);
    const morning=mins>=9*60 && mins<12*60;
    const midday=mins>=12*60 && mins<14*60;
    const villa=['Mon','Tue','Wed','Thu','Fri'].includes(parts.weekday) && mins>=20*60 && mins<22*60;
    const label=$('show-slot-label'),title=$('show-slot-title'),detail=$('show-slot-detail'),mini=$('radio-mini-program');
    if(morning){
      if(label)label.textContent='EN HORARIO DE LA MAÑANA QUE TE MUEVE';
      if(title)title.textContent='La mañana que te mueve';
      if(detail)detail.textContent='Música con Radio Méndez · 09h00 a 12h00';
      if(mini)mini.textContent='La mañana que te mueve · 09h00–12h00';
    }else if(midday){
      if(label)label.textContent='EN HORARIO DE EL VACILÓN DEL MEDIODÍA';
      if(title)title.textContent='El Vacilón del Mediodía';
      if(detail)detail.textContent='Radio Méndez · música y alegría · 12h00 a 14h00';
      if(mini)mini.textContent='El Vacilón del Mediodía · 12h00–14h00';
    }else if(villa){
      if(label)label.textContent='EN HORARIO DE EL VACILE DE VILLA';
      if(title)title.textContent='El Vacile de Villa';
      if(detail)detail.textContent='Ángel Villa DJ · Villa Show · hasta las 22h00';
      if(mini)mini.textContent='Horario: El Vacile de Villa · Ángel Villa DJ';
    }else{
      if(label)label.textContent='PROGRAMACIÓN MUSICAL';
      if(title)title.textContent='Radio Méndez · La radio que te mueve';
      if(detail)detail.textContent='La mañana · 09h–12h | El Vacilón · 12h–14h | Villa · L–V, 20h–22h';
      if(mini)mini.textContent='Mañana 09h–12h · Mediodía 12h–14h · Noches L–V 20h–22h';
    }
  }
  updateSchedule();
  setInterval(updateSchedule,60000);

  // Cuatro espacios independientes que comparten el mismo índice para garantizar rotación coordinada.
  const raw=Array.isArray(window.MENDEZ_AUSPICIANTES)?window.MENDEZ_AUSPICIANTES:[];
  const validImage=/^(?:\.\/)?assets\/[A-Za-z0-9_./-]+\.(?:png|jpg|jpeg|webp|svg)$/i;
  const sponsors=raw.filter(item=>item && typeof item.logo==='string' && validImage.test(item.logo.trim()) && !item.logo.includes('..'))
    .map(item=>{
      let link='';
      try{
        if(item.url){const u=new URL(String(item.url));if(u.protocol==='https:' || u.protocol==='http:')link=u.href;}
      }catch(_){}
      return {name:String(item.nombre||'Auspiciante'),image:item.logo.trim(),url:link};
    });
  const mounts=Array.from(document.querySelectorAll('[data-sponsor-carousel]'));
  if(!sponsors.length){mounts.forEach(el=>el.hidden=true);return}
  let current=0,paused=false,downX=null;
  function makeMount(mount){
    const showHeader=mount.dataset.sponsorLocation!=='auspiciantes';
    if(showHeader){
      const header=document.createElement('div');header.className='sponsor-display-header';
      const label=document.createElement('strong');label.textContent='AUSPICIANTES DE RADIO MÉNDEZ';
      const link=document.createElement('a');link.href='#auspiciantes';link.textContent='Conocer auspiciantes ↗';
      header.append(label,link);mount.append(header);
    }
    const carousel=document.createElement('div');carousel.className='sponsor-carousel';
    carousel.setAttribute('aria-label','Banners de auspiciantes; cambio cada 7 segundos');
    const stage=document.createElement('div');stage.className='sponsor-stage';
    const bar=document.createElement('div');bar.className='sponsor-bar';
    const brand=document.createElement('strong');brand.className='sponsor-brand';
    const tools=document.createElement('div');tools.className='sponsor-tools';
    const prev=document.createElement('button');prev.type='button';prev.className='sponsor-arrow';prev.textContent='‹';prev.setAttribute('aria-label','Auspiciante anterior');
    const next=document.createElement('button');next.type='button';next.className='sponsor-arrow';next.textContent='›';next.setAttribute('aria-label','Siguiente auspiciante');
    const dots=document.createElement('div');dots.className='sponsor-dots';
    sponsors.forEach((item,i)=>{const dot=document.createElement('button');dot.type='button';dot.className='sponsor-dot';dot.setAttribute('aria-label','Ver banner de '+item.name);dot.addEventListener('click',()=>go(i));dots.append(dot)});
    prev.addEventListener('click',()=>go(current-1));next.addEventListener('click',()=>go(current+1));
    tools.append(prev,dots,next);bar.append(brand,tools);carousel.append(stage,bar);mount.append(carousel);
    carousel.addEventListener('mouseenter',()=>paused=true);
    carousel.addEventListener('mouseleave',()=>paused=false);
    carousel.addEventListener('focusin',()=>paused=true);
    carousel.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget))paused=false});
    carousel.addEventListener('touchstart',e=>{downX=e.touches[0]?.clientX??null},{passive:true});
    carousel.addEventListener('touchend',e=>{if(downX===null)return;const x=e.changedTouches[0]?.clientX??downX;const delta=x-downX;downX=null;if(Math.abs(delta)>35)go(current+(delta<0?1:-1))},{passive:true});
    mount._stage=stage;mount._brand=brand;mount._dots=dots;
  }
  mounts.forEach(makeMount);
  function render(animate){
    const item=sponsors[current];
    mounts.forEach(mount=>{
      const stage=mount._stage,container=document.createElement(item.url?'a':'div');
      container.className='sponsor-slide'+(animate?' is-changing':'');
      if(item.url){container.href=item.url;container.target='_blank';container.rel='noopener noreferrer';container.setAttribute('aria-label','Visitar '+item.name)}
      const img=document.createElement('img');img.src=item.image;img.alt='Banner publicitario de '+item.name;
      // Main poster can load immediately; hidden views can load naturally.
      img.loading=mount.dataset.sponsorLocation==='inicio'?'eager':'lazy';
      img.onerror=()=>{img.alt='Banner no disponible de '+item.name};
      container.append(img);stage.replaceChildren(container);mount._brand.textContent=item.name;
      Array.from(mount._dots.children).forEach((dot,i)=>dot.setAttribute('aria-current',String(i===current)));
    });
  }
  function go(i){current=(i+sponsors.length)%sponsors.length;render(true)}
  render(false);
  if(sponsors.length>1)setInterval(()=>{if(!paused && !document.hidden)go(current+1)},7000);
})();
