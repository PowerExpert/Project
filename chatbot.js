(function () {
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
    #chat-fab {
      position:fixed; bottom:28px; right:28px; width:58px; height:58px;
      border-radius:4px; background:#1a7a4a; border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      z-index:9999; transition:transform 0.15s,background 0.2s;
      box-shadow:0 0 0 0 rgba(26,122,74,0.4);
      animation:fab-pulse 2.5s ease-out infinite; color:#fff;
    }
    #chat-fab:hover { transform:scale(1.06); background:#27a762; }
    @keyframes fab-pulse { 0%{box-shadow:0 0 0 0 rgba(26,122,74,0.4)} 70%{box-shadow:0 0 0 12px rgba(26,122,74,0)} 100%{box-shadow:0 0 0 0 rgba(26,122,74,0)} }

    #chat-window {
      position:fixed; bottom:98px; right:28px; width:560px; max-height:580px;
      background:#fff; border:1.5px solid #c8ddd3; border-radius:4px;
      display:none; flex-direction:column; z-index:9998; overflow:hidden;
      box-shadow:0 8px 32px rgba(26,122,74,0.12); font-family:'Space Mono',monospace;
    }
    #chat-window.open { display:flex; }
    #chat-header { padding:13px 16px; border-bottom:1.5px solid #c8ddd3; display:flex; align-items:center; justify-content:space-between; background:#f7faf8; }
    .chat-header-left { display:flex; align-items:center; gap:10px; }
    .chat-header-icon { width:30px; height:30px; background:#1a7a4a; border-radius:4px; display:flex; align-items:center; justify-content:center; color:#fff; flex-shrink:0; }
    .chat-title { color:#1a2420; font-size:13px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; }
    .chat-sub { color:#9db8ac; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; margin-top:1px; }
    .chat-live { display:flex; align-items:center; gap:5px; font-size:10px; color:#1a7a4a; font-weight:700; letter-spacing:0.1em; }
    .chat-live-dot { width:6px; height:6px; border-radius:50%; background:#27a762; animation:blink-g 1.4s ease-in-out infinite; }
    @keyframes blink-g { 0%,100%{opacity:1} 50%{opacity:0.2} }
    #chat-close { background:none; border:none; cursor:pointer; color:#9db8ac; font-size:16px; font-family:'Space Mono',monospace; padding:4px 8px; border-radius:2px; transition:color 0.2s; }
    #chat-close:hover { color:#1a7a4a; }
    #chat-messages { flex:1; overflow-y:auto; padding:14px 16px; display:flex; flex-direction:column; gap:10px; max-height:420px; }
    #chat-messages::-webkit-scrollbar { width:3px; }
    #chat-messages::-webkit-scrollbar-thumb { background:#d0eddc; border-radius:2px; }
    .msg { max-width:82%; padding:10px 14px; border-radius:4px; font-size:12px; line-height:1.85; font-family:'Space Mono',monospace; letter-spacing:0.02em; }
    .msg.bot { background:#f7faf8; color:#1a2420; align-self:flex-start; border:1px solid #c8ddd3; border-left:2.5px solid #1a7a4a; }
    .msg.user { background:#1a7a4a; color:#fff; align-self:flex-end; }
    .msg-role { font-size:9px; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:5px; font-weight:700; }
    .msg.bot .msg-role { color:#1a7a4a; }
    .msg.user .msg-role { color:rgba(255,255,255,0.6); }
    .typing { display:flex; gap:4px; align-items:center; padding:3px 0; }
    .typing span { width:5px; height:5px; border-radius:50%; background:#1a7a4a; display:inline-block; animation:dot-bounce 1s ease-in-out infinite; }
    .typing span:nth-child(2){animation-delay:0.16s} .typing span:nth-child(3){animation-delay:0.32s}
    @keyframes dot-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
    #chat-suggestions { display:flex; flex-wrap:wrap; gap:5px; padding:9px 14px 0; }
    .sug-btn { background:#f7faf8; border:1px solid #c8ddd3; border-radius:2px; color:#6b7f75; font-family:'Space Mono',monospace; font-size:10px; letter-spacing:0.06em; padding:5px 10px; cursor:pointer; transition:background 0.15s,color 0.15s,border-color 0.15s; }
    .sug-btn:hover { background:#e8f5ee; border-color:#1a7a4a; color:#1a7a4a; }
    #chat-input-row { padding:10px 13px; border-top:1.5px solid #c8ddd3; display:flex; gap:7px; align-items:center; background:#fff; }
    #chat-input { flex:1; background:#f7faf8; border:1.5px solid #c8ddd3; border-radius:4px; padding:9px 12px; color:#1a2420; font-size:12px; font-family:'Space Mono',monospace; outline:none; letter-spacing:0.03em; transition:border-color 0.2s; }
    #chat-input::placeholder { color:#9db8ac; }
    #chat-input:focus { border-color:#27a762; }
    #chat-send { background:#1a7a4a; border:none; border-radius:4px; width:38px; height:38px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.15s; color:#fff; flex-shrink:0; }
    #chat-send:hover { background:#27a762; }
    #chat-send:disabled { background:#c8ddd3; cursor:not-allowed; }
    #chat-tip { position:fixed; bottom:38px; right:98px; background:#fff; border:1.5px solid #c8ddd3; border-left:2.5px solid #1a7a4a; border-radius:2px; padding:9px 14px; z-index:9997; color:#1a2420; font-size:11px; font-family:'Space Mono',monospace; white-space:nowrap; pointer-events:none; letter-spacing:0.05em; animation:tip-in 0.3s ease forwards; box-shadow:0 4px 16px rgba(26,122,74,0.1); }
    #chat-tip span { color:#1a7a4a; font-weight:700; }
    #chat-tip::after { content:''; position:absolute; right:-8px; top:50%; transform:translateY(-50%); border:7px solid transparent; border-left-color:#c8ddd3; border-right:none; }
    @keyframes tip-in { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML('beforeend', `
    <button id="chat-fab" title="Спросить об Алматы">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
      </svg>
    </button>
    <div id="chat-window">
      <div id="chat-header">
        <div class="chat-header-left">
          <div class="chat-header-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
          </div>
          <div>
            <div class="chat-title">UrbanGuide AI</div>
            <div class="chat-sub">Городской помощник</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:14px">
          <div class="chat-live"><div class="chat-live-dot"></div>LIVE</div>
          <button id="chat-close">✕</button>
        </div>
      </div>
      <div id="chat-suggestions">
        <button class="sug-btn">🚇 Расписание метро</button>
        <button class="sug-btn">🏛 Достопримечательности</button>
        <button class="sug-btn">🍽 Местная еда</button>
        <button class="sug-btn">🕌 Мечети Алматы</button>
        <button class="sug-btn">🎭 События</button>
        <button class="sug-btn">🛡 Советы по безопасности</button>
      </div>
      <div id="chat-messages">
        <div class="msg bot">
          <div class="msg-role">URBANGI</div>
          Привет! Я ваш умный городской помощник. Спросите меня о транспорте, районах, исторических местах, еде, безопасности или культурном этикете Алматы и Казахстана.
        </div>
      </div>
      <div id="chat-input-row">
        <input id="chat-input" placeholder="Спросите о транспорте, местах, районах..." autocomplete="off"/>
        <button id="chat-send">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  `);

  const fab=document.getElementById('chat-fab'),win=document.getElementById('chat-window'),closeBtn=document.getElementById('chat-close'),input=document.getElementById('chat-input'),sendBtn=document.getElementById('chat-send'),msgList=document.getElementById('chat-messages');
  const history=[];

  fab.addEventListener('click',()=>{ win.classList.toggle('open'); if(win.classList.contains('open')) input.focus(); });
  closeBtn.addEventListener('click',()=>win.classList.remove('open'));
  input.addEventListener('keydown',e=>{ if(e.key==='Enter'){e.preventDefault();send();} });
  sendBtn.addEventListener('click',send);

  document.querySelectorAll('.sug-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      input.value=btn.textContent.replace(/^[^\w\u0400-\u04FF]+/,'').trim();
      win.classList.add('open'); input.focus(); send();
    });
  });

  function addMsg(role){
    const el=document.createElement('div'); el.className='msg '+role;
    const lbl=document.createElement('div'); lbl.className='msg-role'; lbl.textContent=role==='user'?'ВЫ':'URBANGI';
    el.appendChild(lbl);
    const body=document.createElement('div'); el.appendChild(body); msgList.appendChild(el); msgList.scrollTop=msgList.scrollHeight; return body;
  }

  function addTyping(){
    const el=document.createElement('div'); el.className='msg bot';
    const lbl=document.createElement('div'); lbl.className='msg-role'; lbl.textContent='URBANGI';
    const dots=document.createElement('div'); dots.className='typing'; dots.innerHTML='<span></span><span></span><span></span>';
    el.appendChild(lbl); el.appendChild(dots); msgList.appendChild(el); msgList.scrollTop=msgList.scrollHeight; return el;
  }

  async function send(){
    const text=input.value.trim(); if(!text) return;
    input.value=''; sendBtn.disabled=true;
    const sug=document.getElementById('chat-suggestions'); if(sug) sug.style.display='none';
    addMsg('user').textContent=text;
    history.push({role:'user',content:text});
    const typing=addTyping();
    try {
      const res=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:1000,
          system:`Ты — UrbanGuide, экспертный помощник по городу Алматы и Казахстану. Отвечай только на русском языке. Помогай пользователям с: транспортом (метро, автобусы, такси), районами и достопримечательностями, историческими и сакральными местами, местной едой и ресторанами, культурным этикетом, советами по безопасности. Будь конкретным и полезным, как местный житель-знаток. Используй короткие абзацы или списки.`,
          messages:history
        })
      });
      const data=await res.json();
      const reply=data.content?.[0]?.text||'Нет ответа.';
      typing.remove(); addMsg('bot').textContent=reply;
      history.push({role:'assistant',content:reply});
    } catch(e) {
      typing.remove(); addMsg('bot').textContent='Ошибка соединения. Попробуйте снова.';
    }
    sendBtn.disabled=false; msgList.scrollTop=msgList.scrollHeight;
  }

  const tip=document.createElement('div'); tip.id='chat-tip';
  tip.innerHTML='📍 Спросите <span>UrbanGuide</span> что угодно о городе';
  document.body.appendChild(tip);
  setTimeout(()=>{ if(tip.parentNode) tip.remove(); },5000);
  fab.addEventListener('click',()=>{ if(tip.parentNode) tip.remove(); });
})();