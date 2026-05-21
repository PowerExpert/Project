(function () {

  // ─── Styles ───────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

    #chat-fab {
      position: fixed; bottom: 28px; right: 28px; width: 60px; height: 60px;
      border-radius: 4px; background: #e8a830; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      z-index: 9999; transition: transform 0.15s, background 0.2s;
      box-shadow: 0 0 0 0 rgba(232,168,48,0.5);
      animation: fab-pulse 2.5s ease-out infinite;
      font-family: 'Space Mono', monospace;
    }
    #chat-fab:hover { transform: scale(1.06); background: #f5c96a; }
    @keyframes fab-pulse {
      0%   { box-shadow: 0 0 0 0 rgba(232,168,48,0.5); }
      70%  { box-shadow: 0 0 0 14px rgba(232,168,48,0); }
      100% { box-shadow: 0 0 0 0 rgba(232,168,48,0); }
    }

    #chat-window {
      position: fixed; bottom: 100px; right: 28px; width: 600px; max-height: 580px;
      background: rgba(8,12,16,0.98); border: 1px solid rgba(232,168,48,0.3);
      border-radius: 4px; display: none; flex-direction: column; z-index: 9998;
      backdrop-filter: blur(20px); overflow: hidden;
      box-shadow: 0 12px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,168,48,0.08);
      font-family: 'Space Mono', monospace;
    }
    #chat-window.open { display: flex; }

    #chat-header {
      padding: 14px 16px;
      border-bottom: 1px solid rgba(232,168,48,0.2);
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(13,18,25,0.9);
    }
    .chat-header-left { display: flex; align-items: center; gap: 12px; }
    .chat-header-icon {
      width: 32px; height: 32px;
      background: #e8a830;
      border-radius: 3px;
      display: flex; align-items: center; justify-content: center;
      color: #080c10;
      flex-shrink: 0;
    }
    .chat-title {
      color: #eef2f7;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .chat-sub {
      color: rgba(238,242,247,0.4);
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-top: 2px;
    }
    .chat-live {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 10px;
      color: #1de9b6;
      letter-spacing: 0.1em;
    }
    .chat-live-dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: #1de9b6;
      animation: blink-teal 1.4s ease-in-out infinite;
    }
    @keyframes blink-teal {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.2; }
    }
    #chat-close {
      background: none; border: none; cursor: pointer;
      color: rgba(238,242,247,0.35); font-size: 16px;
      font-family: 'Space Mono', monospace;
      padding: 4px 8px; border-radius: 2px;
      transition: color 0.2s;
    }
    #chat-close:hover { color: #e8a830; }

    #chat-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 12px; max-height: 420px;
    }
    #chat-messages::-webkit-scrollbar { width: 3px; }
    #chat-messages::-webkit-scrollbar-track { background: transparent; }
    #chat-messages::-webkit-scrollbar-thumb { background: rgba(232,168,48,0.3); border-radius: 2px; }

    .msg {
      max-width: 85%; padding: 11px 14px; border-radius: 3px;
      font-size: 12.5px; line-height: 1.75;
      font-family: 'Space Mono', monospace;
      letter-spacing: 0.02em;
    }
    .msg.bot {
      background: rgba(13,18,25,0.95);
      color: #d4cfc8;
      align-self: flex-start;
      border: 1px solid rgba(232,168,48,0.2);
      border-left: 2px solid #e8a830;
    }
    .msg.user {
      background: rgba(232,168,48,0.15);
      color: #f5c96a;
      align-self: flex-end;
      border: 1px solid rgba(232,168,48,0.3);
    }

    .msg-label {
      font-size: 9px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      margin-bottom: 6px;
      opacity: 0.5;
    }
    .msg.bot .msg-label { color: #e8a830; }
    .msg.user .msg-label { color: #f5c96a; }

    #chat-input-row {
      padding: 12px 14px;
      border-top: 1px solid rgba(232,168,48,0.2);
      display: flex; gap: 8px; align-items: center;
      background: rgba(8,12,16,0.95);
    }
    #chat-input {
      flex: 1;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(232,168,48,0.25);
      border-radius: 2px;
      padding: 10px 14px;
      color: #eef2f7;
      font-size: 12px;
      font-family: 'Space Mono', monospace;
      outline: none;
      transition: border-color 0.2s;
      letter-spacing: 0.04em;
    }
    #chat-input::placeholder { color: rgba(238,242,247,0.25); }
    #chat-input:focus { border-color: rgba(232,168,48,0.6); }

    #chat-send {
      background: #e8a830;
      border: none;
      border-radius: 2px;
      width: 40px; height: 40px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
      color: #080c10;
      flex-shrink: 0;
    }
    #chat-send:hover { background: #f5c96a; }
    #chat-send:disabled { background: rgba(232,168,48,0.25); cursor: not-allowed; }

    /* Suggested queries */
    #chat-suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 10px 14px 0;
    }
    .sug-btn {
      background: rgba(232,168,48,0.08);
      border: 1px solid rgba(232,168,48,0.25);
      border-radius: 2px;
      color: rgba(238,242,247,0.6);
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.06em;
      padding: 5px 10px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }
    .sug-btn:hover {
      background: rgba(232,168,48,0.2);
      border-color: rgba(232,168,48,0.5);
      color: #e8a830;
    }
  `;
  document.head.appendChild(style);

  // ─── HTML ─────────────────────────────────────────────────
  document.body.insertAdjacentHTML('beforeend', `
    <button id="chat-fab" title="Ask about the city">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#080c10" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
      </svg>
    </button>

    <div id="chat-window">
      <div id="chat-header">
        <div class="chat-header-left">
          <div class="chat-header-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
          </div>
          <div>
            <div class="chat-title">UrbanGuide AI</div>
            <div class="chat-sub">City Intelligence Assistant</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:16px;">
          <div class="chat-live">
            <div class="chat-live-dot"></div>
            LIVE
          </div>
          <button id="chat-close">✕</button>
        </div>
      </div>

      <div id="chat-suggestions">
        <button class="sug-btn">🚇 Metro schedule</button>
        <button class="sug-btn">🏛 Top landmarks</button>
        <button class="sug-btn">🍽 Best local food</button>
        <button class="sug-btn">🚧 Road works</button>
      </div>

      <div id="chat-messages">
        <div class="msg bot">
          <div class="msg-label">UrbanGuide</div>
          Hello! I'm your urban intelligence assistant. Ask me about transport routes, city districts, local events, infrastructure updates, tourist attractions, or anything about navigating and exploring the city. I respond in your language too.
        </div>
      </div>

      <div id="chat-input-row">
        <input id="chat-input" placeholder="Ask about transport, sights, districts..." />
        <button id="chat-send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  `);

  // ─── Logic ────────────────────────────────────────────────
  const fab     = document.getElementById('chat-fab');
  const win     = document.getElementById('chat-window');
  const closeBtn = document.getElementById('chat-close');
  const input   = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const msgList = document.getElementById('chat-messages');
  const history = [];

  fab.addEventListener('click', () => {
    win.classList.toggle('open');
    if (win.classList.contains('open')) input.focus();
  });
  closeBtn.addEventListener('click', () => win.classList.remove('open'));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); send(); } });
  sendBtn.addEventListener('click', send);

  // Suggestion buttons
  document.querySelectorAll('.sug-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.textContent.replace(/^[^\w]+/, '').trim();
      win.classList.add('open');
      input.focus();
      send();
    });
  });

  function addMsg(text, role) {
    const el = document.createElement('div');
    el.className = 'msg ' + (role === 'user' ? 'user' : 'bot');
    const label = document.createElement('div');
    label.className = 'msg-label';
    label.textContent = role === 'user' ? 'YOU' : 'URBANGI';
    el.appendChild(label);
    const body = document.createElement('span');
    body.textContent = text;
    el.appendChild(body);
    msgList.appendChild(el);
    msgList.scrollTop = msgList.scrollHeight;
    return el;
  }

  async function send() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    sendBtn.disabled = true;

    // Hide suggestions after first use
    const sug = document.getElementById('chat-suggestions');
    if (sug) sug.style.display = 'none';

    addMsg(text, 'user');
    history.push({ role: 'user', content: text });
    const typing = addMsg('...', 'bot');

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are UrbanGuide, an intelligent city and travel assistant. You help users navigate and explore cities with expert knowledge on:
- Public transport (metro, buses, trams, shared bikes, taxis)
- City districts, neighbourhoods, and their character
- Tourist attractions, museums, parks, viewpoints
- Local food, restaurants, markets, and culinary culture
- Infrastructure updates: road works, construction, utility outages
- Local events: festivals, concerts, markets, sports
- Practical travel tips: safety, etiquette, scams to avoid, best times to visit
- Accommodation: hotels, hostels, areas to stay

Rules:
- IMPORTANT: Detect the user's language and always respond in that same language.
- Be concise, practical, and specific. Use bullet points or short paragraphs.
- When relevant, suggest nearby transport options or neighbourhoods.
- Mention that real-time data should be verified with official sources.
- Be warm and knowledgeable, like a well-travelled local friend.
- If asked about a specific city, focus answers on that city. Default context is Almaty, Kazakhstan.`,
          messages: history
        })
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Could not retrieve city data. Please try again.';
      typing.remove();
      addMsg(reply, 'bot');
      history.push({ role: 'assistant', content: reply });
    } catch {
      typing.remove();
      addMsg('Connection error. Check your network and try again.', 'bot');
    }

    sendBtn.disabled = false;
  }

  // ─── Tooltip ─────────────────────────────────────────────
  const tipStyle = document.createElement('style');
  tipStyle.textContent = `
    #chat-tip {
      position: fixed; bottom: 40px; right: 100px;
      background: rgba(8,12,16,0.97);
      border: 1px solid rgba(232,168,48,0.4);
      border-left: 2px solid #e8a830;
      border-radius: 2px; padding: 10px 14px; z-index: 9997;
      color: #eef2f7; font-size: 11px;
      font-family: 'Space Mono', monospace;
      letter-spacing: 0.06em;
      white-space: nowrap; pointer-events: none;
      animation: tip-slide 0.35s ease forwards;
    }
    #chat-tip span { color: #e8a830; font-weight: 700; }
    #chat-tip::after {
      content: ''; position: absolute; right: -7px; top: 50%;
      transform: translateY(-50%);
      border: 7px solid transparent;
      border-left-color: rgba(232,168,48,0.4);
      border-right: none;
    }
    @keyframes tip-slide {
      from { opacity: 0; transform: translateX(-8px); }
      to   { opacity: 1; transform: translateX(0); }
    }
  `;
  document.head.appendChild(tipStyle);

  const tip = document.createElement('div');
  tip.id = 'chat-tip';
  tip.innerHTML = '📍 Ask <span>UrbanGuide</span> anything about your city';
  document.body.appendChild(tip);

  setTimeout(() => { if (tip.parentNode) tip.remove(); }, 5000);
  fab.addEventListener('click', () => { if (tip.parentNode) tip.remove(); });

})();