/**
 * Event Guide Chatbot — Google Cloud Summit 2026
 * Handles chat, floor maps, QR code, and venue navigation.
 */

(function () {
    'use strict';

    // ============================================================
    // Floor Map SVG Definitions
    // ============================================================
    const FLOOR_MAPS = {
        ground: `<svg viewBox="0 0 360 295" xmlns="http://www.w3.org/2000/svg">
  <!-- outer border -->
  <rect x="2" y="2" width="356" height="291" fill="#0a0d16" stroke="#1e293b" stroke-width="1.5" rx="8"/>

  <!-- Ballroom A — Sessions (large, right side) -->
  <rect id="zone-ballroom" x="192" y="12" width="158" height="165" fill="rgba(66,133,244,0.13)" stroke="#4285F4" stroke-width="1.5" rx="4"/>
  <text x="271" y="82" text-anchor="middle" fill="#4285F4" font-size="10" font-weight="700" font-family="Inter,sans-serif">🎤 Ballroom A</text>
  <text x="271" y="96" text-anchor="middle" fill="#93c5fd" font-size="8.5" font-family="Inter,sans-serif">Main Sessions</text>
  <text x="271" y="110" text-anchor="middle" fill="#475569" font-size="7.5" font-family="Inter,sans-serif">9:00 AM – 4:30 PM</text>

  <!-- Registration -->
  <rect id="zone-registration" x="12" y="12" width="108" height="56" fill="rgba(52,168,83,0.13)" stroke="#34A853" stroke-width="1.5" rx="4"/>
  <text x="66" y="36" text-anchor="middle" fill="#34A853" font-size="9" font-weight="700" font-family="Inter,sans-serif">📋 Registration</text>
  <text x="66" y="50" text-anchor="middle" fill="#86efac" font-size="7.5" font-family="Inter,sans-serif">8 AM – 10:30 AM</text>

  <!-- Coffee Corner -->
  <rect id="zone-coffee" x="126" y="12" width="60" height="56" fill="rgba(251,188,5,0.14)" stroke="#FBBC05" stroke-width="1.5" rx="4"/>
  <text x="156" y="36" text-anchor="middle" fill="#FBBC05" font-size="9" font-weight="700" font-family="Inter,sans-serif">☕ Coffee</text>
  <text x="156" y="50" text-anchor="middle" fill="#fde68a" font-size="7.5" font-family="Inter,sans-serif">All day</text>

  <!-- Sponsor Booths -->
  <rect x="12" y="74" width="174" height="70" fill="rgba(234,67,53,0.07)" stroke="#EA4335" stroke-width="1" stroke-dasharray="5,3" rx="4"/>
  <text x="99" y="112" text-anchor="middle" fill="#EA4335" font-size="9" font-weight="600" font-family="Inter,sans-serif">🏢 Sponsor Booths</text>

  <!-- Elevator block (mid) -->
  <rect x="192" y="183" width="44" height="40" fill="rgba(71,85,105,0.2)" stroke="#475569" stroke-width="1" rx="3"/>
  <text x="214" y="201" text-anchor="middle" fill="#94a3b8" font-size="8.5" font-family="Inter,sans-serif">🛗</text>
  <text x="214" y="213" text-anchor="middle" fill="#64748b" font-size="7" font-family="Inter,sans-serif">Lift</text>

  <!-- ATM -->
  <rect id="zone-atm" x="242" y="183" width="42" height="40" fill="rgba(71,85,105,0.2)" stroke="#475569" stroke-width="1" rx="3"/>
  <text x="263" y="201" text-anchor="middle" fill="#94a3b8" font-size="8.5" font-family="Inter,sans-serif">🏧</text>
  <text x="263" y="213" text-anchor="middle" fill="#64748b" font-size="7" font-family="Inter,sans-serif">ATM</text>

  <!-- Emergency Exit -->
  <rect id="zone-exit" x="290" y="183" width="62" height="40" fill="rgba(234,67,53,0.12)" stroke="#EA4335" stroke-width="1" stroke-dasharray="4,2" rx="3"/>
  <text x="321" y="200" text-anchor="middle" fill="#EA4335" font-size="8.5" font-family="Inter,sans-serif">🚨 Exit</text>
  <text x="321" y="214" text-anchor="middle" fill="#fca5a5" font-size="7" font-family="Inter,sans-serif">Emergency</text>

  <!-- First Aid -->
  <rect id="zone-first_aid" x="12" y="150" width="88" height="50" fill="rgba(234,67,53,0.15)" stroke="#EA4335" stroke-width="1.5" rx="4"/>
  <text x="56" y="173" text-anchor="middle" fill="#EA4335" font-size="9" font-weight="700" font-family="Inter,sans-serif">🏥 First Aid</text>
  <text x="56" y="187" text-anchor="middle" fill="#fca5a5" font-size="7.5" font-family="Inter,sans-serif">+ Help Desk</text>

  <!-- Cloakroom -->
  <rect id="zone-cloakroom" x="106" y="150" width="80" height="50" fill="rgba(100,116,139,0.14)" stroke="#475569" stroke-width="1" rx="4"/>
  <text x="146" y="172" text-anchor="middle" fill="#94a3b8" font-size="8.5" font-family="Inter,sans-serif">👜 Cloakroom</text>
  <text x="146" y="185" text-anchor="middle" fill="#64748b" font-size="7.5" font-family="Inter,sans-serif">Free service</text>

  <!-- Restrooms (left) -->
  <rect id="zone-restroom" x="12" y="208" width="78" height="42" fill="rgba(0,206,201,0.14)" stroke="#00CEC9" stroke-width="1.5" rx="4"/>
  <text x="51" y="227" text-anchor="middle" fill="#00CEC9" font-size="9" font-weight="700" font-family="Inter,sans-serif">🚻 WC</text>
  <text x="51" y="240" text-anchor="middle" fill="#67e8f9" font-size="7.5" font-family="Inter,sans-serif">M &amp; F</text>

  <!-- Main Entrance -->
  <rect x="110" y="216" width="128" height="34" fill="rgba(52,168,83,0.18)" stroke="#34A853" stroke-width="2" rx="4"/>
  <text x="174" y="237" text-anchor="middle" fill="#34A853" font-size="10" font-weight="700" font-family="Inter,sans-serif">🚪 MAIN ENTRANCE</text>

  <!-- Restrooms (right) -->
  <rect x="248" y="229" width="80" height="35" fill="rgba(0,206,201,0.14)" stroke="#00CEC9" stroke-width="1.5" rx="4"/>
  <text x="288" y="245" text-anchor="middle" fill="#00CEC9" font-size="9" font-weight="700" font-family="Inter,sans-serif">🚻 WC (M &amp; F)</text>

  <!-- Parking arrow / indicator -->
  <text x="14" y="262" fill="#475569" font-size="7" font-family="Inter,sans-serif">⬇ Basement B1/B2 — Parking</text>

  <!-- Floor label -->
  <text x="180" y="283" text-anchor="middle" fill="#1e293b" font-size="7.5" font-style="italic" font-family="Inter,sans-serif">GROUND FLOOR — HICC Hyderabad</text>
</svg>`,

        floor1: `<svg viewBox="0 0 360 295" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="356" height="291" fill="#0a0d16" stroke="#1e293b" stroke-width="1.5" rx="8"/>

  <!-- Hall B — Lunch Area -->
  <rect id="zone-lunch" x="12" y="12" width="210" height="130" fill="rgba(251,188,5,0.13)" stroke="#FBBC05" stroke-width="1.5" rx="4"/>
  <text x="117" y="64" text-anchor="middle" fill="#FBBC05" font-size="11" font-weight="700" font-family="Inter,sans-serif">🍽️ Hall B — Lunch</text>
  <text x="117" y="80" text-anchor="middle" fill="#fde68a" font-size="8.5" font-family="Inter,sans-serif">12:15 PM – 1:15 PM</text>
  <text x="117" y="94" text-anchor="middle" fill="#fde68a" font-size="8" font-family="Inter,sans-serif">Veg &amp; Non-Veg Buffet</text>

  <!-- Networking Lounge -->
  <rect x="228" y="12" width="120" height="130" fill="rgba(168,85,247,0.12)" stroke="#A855F7" stroke-width="1.5" rx="4"/>
  <text x="288" y="64" text-anchor="middle" fill="#A855F7" font-size="9.5" font-weight="700" font-family="Inter,sans-serif">✨ Networking</text>
  <text x="288" y="79" text-anchor="middle" fill="#d8b4fe" font-size="8.5" font-family="Inter,sans-serif">Lounge</text>
  <text x="288" y="93" text-anchor="middle" fill="#d8b4fe" font-size="7.5" font-family="Inter,sans-serif">☕ Coffee Breaks</text>

  <!-- Prayer Room -->
  <rect id="zone-prayer" x="12" y="150" width="88" height="56" fill="rgba(251,191,36,0.13)" stroke="#F59E0B" stroke-width="1.5" rx="4"/>
  <text x="56" y="175" text-anchor="middle" fill="#F59E0B" font-size="9" font-weight="700" font-family="Inter,sans-serif">🕌 Prayer Room</text>
  <text x="56" y="189" text-anchor="middle" fill="#fde68a" font-size="7.5" font-family="Inter,sans-serif">Room 103 • All day</text>

  <!-- Restrooms -->
  <rect id="zone-restroom" x="107" y="150" width="80" height="56" fill="rgba(0,206,201,0.13)" stroke="#00CEC9" stroke-width="1.5" rx="4"/>
  <text x="147" y="175" text-anchor="middle" fill="#00CEC9" font-size="9" font-weight="700" font-family="Inter,sans-serif">🚻 WC</text>
  <text x="147" y="189" text-anchor="middle" fill="#67e8f9" font-size="7.5" font-family="Inter,sans-serif">M &amp; F</text>

  <!-- Water Station -->
  <rect x="193" y="150" width="70" height="56" fill="rgba(66,133,244,0.13)" stroke="#4285F4" stroke-width="1" rx="4"/>
  <text x="228" y="175" text-anchor="middle" fill="#4285F4" font-size="9" font-family="Inter,sans-serif">💧 Water</text>
  <text x="228" y="189" text-anchor="middle" fill="#93c5fd" font-size="7.5" font-family="Inter,sans-serif">Station</text>

  <!-- Lifts -->
  <rect x="269" y="150" width="79" height="56" fill="rgba(71,85,105,0.18)" stroke="#475569" stroke-width="1" rx="4"/>
  <text x="308" y="175" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">🛗 Lifts</text>
  <text x="308" y="189" text-anchor="middle" fill="#64748b" font-size="7.5" font-family="Inter,sans-serif">&amp; Stairs</text>

  <!-- Corridor -->
  <rect x="12" y="213" width="336" height="25" fill="rgba(30,41,59,0.4)" stroke="#1e293b" stroke-width="1" rx="3"/>
  <text x="180" y="228" text-anchor="middle" fill="#334155" font-size="8" font-family="Inter,sans-serif">— MAIN CORRIDOR —</text>

  <text x="180" y="283" text-anchor="middle" fill="#1e293b" font-size="7.5" font-style="italic" font-family="Inter,sans-serif">FLOOR 1 (MEZZANINE) — HICC Hyderabad</text>
</svg>`,

        floor2: `<svg viewBox="0 0 360 295" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="356" height="291" fill="#0a0d16" stroke="#1e293b" stroke-width="1.5" rx="8"/>

  <!-- Speakers Lounge -->
  <rect x="12" y="12" width="155" height="110" fill="rgba(168,85,247,0.13)" stroke="#A855F7" stroke-width="1.5" rx="4"/>
  <text x="89" y="60" text-anchor="middle" fill="#A855F7" font-size="10" font-weight="700" font-family="Inter,sans-serif">🎤 Speakers Lounge</text>
  <text x="89" y="76" text-anchor="middle" fill="#d8b4fe" font-size="8.5" font-family="Inter,sans-serif">Room 201</text>
  <text x="89" y="90" text-anchor="middle" fill="#d8b4fe" font-size="7.5" font-family="Inter,sans-serif">Badge access required</text>

  <!-- VIP Lounge -->
  <rect x="173" y="12" width="175" height="110" fill="rgba(251,191,36,0.1)" stroke="#F59E0B" stroke-width="1.5" rx="4"/>
  <text x="260" y="60" text-anchor="middle" fill="#F59E0B" font-size="10" font-weight="700" font-family="Inter,sans-serif">⭐ VIP Lounge</text>
  <text x="260" y="76" text-anchor="middle" fill="#fde68a" font-size="8.5" font-family="Inter,sans-serif">Invitation only</text>

  <!-- Networking Terrace (outdoor) -->
  <rect x="12" y="130" width="218" height="90" fill="rgba(52,168,83,0.08)" stroke="#34A853" stroke-width="1" stroke-dasharray="6,3" rx="4"/>
  <text x="121" y="168" text-anchor="middle" fill="#34A853" font-size="10" font-weight="600" font-family="Inter,sans-serif">🌿 Networking Terrace</text>
  <text x="121" y="183" text-anchor="middle" fill="#86efac" font-size="8" font-family="Inter,sans-serif">Open-air area</text>

  <!-- Restrooms -->
  <rect id="zone-restroom" x="237" y="130" width="111" height="55" fill="rgba(0,206,201,0.13)" stroke="#00CEC9" stroke-width="1.5" rx="4"/>
  <text x="292" y="155" text-anchor="middle" fill="#00CEC9" font-size="9" font-weight="700" font-family="Inter,sans-serif">🚻 WC (M &amp; F)</text>

  <!-- Lifts -->
  <rect x="237" y="191" width="111" height="48" fill="rgba(71,85,105,0.18)" stroke="#475569" stroke-width="1" rx="4"/>
  <text x="292" y="213" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="Inter,sans-serif">🛗 Lifts &amp; Stairs</text>

  <!-- Corridor -->
  <rect x="12" y="227" width="218" height="22" fill="rgba(30,41,59,0.4)" stroke="#1e293b" stroke-width="1" rx="3"/>
  <text x="121" y="241" text-anchor="middle" fill="#334155" font-size="8" font-family="Inter,sans-serif">— CORRIDOR —</text>

  <text x="180" y="283" text-anchor="middle" fill="#1e293b" font-size="7.5" font-style="italic" font-family="Inter,sans-serif">FLOOR 2 — HICC Hyderabad</text>
</svg>`,

        basement: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="356" height="196" fill="#0a0d16" stroke="#1e293b" stroke-width="1.5" rx="8"/>
  <rect id="zone-parking" x="12" y="12" width="335" height="130" fill="rgba(100,116,139,0.14)" stroke="#64748b" stroke-width="1.5" rx="4"/>
  <text x="179" y="60" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="700" font-family="Inter,sans-serif">🅿️ Parking Levels B1 &amp; B2</text>
  <text x="179" y="78" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter,sans-serif">Entry from Main Gate on Cyber Hills Road</text>
  <text x="179" y="95" text-anchor="middle" fill="#64748b" font-size="9" font-family="Inter,sans-serif">Free for all delegates — Show badge at booth</text>
  <text x="179" y="112" text-anchor="middle" fill="#475569" font-size="8.5" font-family="Inter,sans-serif">Assembly Point A (emergencies) — near staircase B1</text>
  <text x="179" y="183" text-anchor="middle" fill="#1e293b" font-size="7.5" font-style="italic" font-family="Inter,sans-serif">BASEMENT — HICC Hyderabad</text>
</svg>`,
    };

    // ============================================================
    // State
    // ============================================================
    let isPanelOpen = false;
    let activeTab = 'chat';
    let activeFloor = 'ground';
    let pendingMapInfo = null;

    // ============================================================
    // DOM Elements
    // ============================================================
    const widget      = document.getElementById('chatbotWidget');
    const toggleBtn   = document.getElementById('chatToggleBtn');
    const chatPanel   = document.getElementById('chatPanel');
    const closeBtn    = document.getElementById('chatCloseBtn');
    const messagesEl  = document.getElementById('chatMessages');
    const quickReplEl = document.getElementById('chatQuickReplies');
    const inputEl     = document.getElementById('chatInput');
    const sendBtn     = document.getElementById('chatSendBtn');
    const badge       = document.getElementById('chatBadge');
    const floorMapEl  = document.getElementById('floorMapDisplay');
    const tabs        = document.querySelectorAll('.chat-tab');
    const tabContents = document.querySelectorAll('.chat-tab-content');
    const floorBtns   = document.querySelectorAll('.floor-btn');
    const qrImg       = document.getElementById('qrCodeImg');

    // ============================================================
    // Panel toggle
    // ============================================================
    function openPanel() {
        isPanelOpen = true;
        chatPanel.classList.add('open');
        document.getElementById('chatIconOpen').style.display = 'none';
        document.getElementById('chatIconClose').style.display = 'flex';
        if (badge) badge.style.opacity = '0';
        renderFloorMap(activeFloor);
    }

    function closePanel() {
        isPanelOpen = false;
        chatPanel.classList.remove('open');
        document.getElementById('chatIconOpen').style.display = 'flex';
        document.getElementById('chatIconClose').style.display = 'none';
    }

    toggleBtn.addEventListener('click', () => isPanelOpen ? closePanel() : openPanel());
    closeBtn.addEventListener('click', closePanel);

    // ============================================================
    // Tab switching
    // ============================================================
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            switchTab(target);
        });
    });

    function switchTab(name) {
        activeTab = name;
        tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
        tabContents.forEach(c => {
            c.classList.toggle('active', c.id === `tab-${name}`);
        });
        if (name === 'map') {
            renderFloorMap(activeFloor, pendingMapInfo);
            pendingMapInfo = null;
        }
    }

    // ============================================================
    // Floor map rendering
    // ============================================================
    floorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            floorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFloor = btn.dataset.floor;
            renderFloorMap(activeFloor);
        });
    });

    function renderFloorMap(floor, highlightZone) {
        const svgStr = FLOOR_MAPS[floor] || FLOOR_MAPS.ground;
        floorMapEl.innerHTML = svgStr;

        // Sync floor buttons
        floorBtns.forEach(b => b.classList.toggle('active', b.dataset.floor === floor));

        if (highlightZone) {
            setTimeout(() => highlightMapZone(highlightZone), 100);
        }
    }

    function highlightMapZone(zone) {
        // Remove prior highlights
        floorMapEl.querySelectorAll('.map-zone-highlight').forEach(el => {
            el.classList.remove('map-zone-highlight');
        });

        const el = floorMapEl.querySelector(`#zone-${zone}`);
        if (el) {
            el.classList.add('map-zone-highlight');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function switchFloorAndHighlight(floor, zone) {
        activeFloor = floor || 'ground';
        renderFloorMap(activeFloor, zone);
        switchTab('map');
    }

    // ============================================================
    // Messaging
    // ============================================================
    function sendMessage(text) {
        if (!text || !text.trim()) return;
        text = text.trim();

        // Remove quick-reply label prefix (emoji stripped version)
        const clean = text.replace(/^[\u{1F300}-\u{1F9FF}]\s*/u, '').trim() || text;

        appendMessage(text, 'user');
        clearQuickReplies();
        showTypingIndicator();
        inputEl.value = '';

        fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: clean }),
        })
            .then(r => r.json())
            .then(data => {
                removeTypingIndicator();
                appendBotMessage(data.reply, data.map, data.open_map);
                if (data.quick_replies && data.quick_replies.length) {
                    showQuickReplies(data.quick_replies);
                }
                if (data.map) {
                    pendingMapInfo = data.map;
                    // Badge the map tab
                    const mapTab = document.querySelector('.chat-tab[data-tab="map"]');
                    if (mapTab && !mapTab.querySelector('.tab-badge')) {
                        const dot = document.createElement('span');
                        dot.className = 'tab-badge';
                        mapTab.appendChild(dot);
                    }
                }
            })
            .catch(() => {
                removeTypingIndicator();
                appendBotMessage("⚠️ I'm having trouble connecting right now. Please visit the Help Desk on the Ground Floor.", null, false);
            });
    }

    function formatBotText(text) {
        // Simple markdown: **bold**, `code`, line breaks
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/_([^_]+)_/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    function appendMessage(text, role) {
        const msgEl = document.createElement('div');
        msgEl.className = `chat-message ${role}`;

        const avatarEl = document.createElement('div');
        avatarEl.className = 'msg-avatar';
        avatarEl.textContent = role === 'bot' ? '🤖' : '👤';

        const bubbleEl = document.createElement('div');
        bubbleEl.className = 'msg-bubble';
        bubbleEl.innerHTML = formatBotText(text);

        msgEl.appendChild(avatarEl);
        msgEl.appendChild(bubbleEl);
        messagesEl.appendChild(msgEl);
        scrollToBottom();
        return { msgEl, bubbleEl };
    }

    function appendBotMessage(text, mapInfo, openMap) {
        const { bubbleEl } = appendMessage(text, 'bot');

        if (mapInfo) {
            const mapLink = document.createElement('div');
            mapLink.className = 'msg-map-link';
            mapLink.innerHTML = '📍 View on Venue Map';
            mapLink.addEventListener('click', () => {
                switchFloorAndHighlight(mapInfo.floor, mapInfo.zone);
                // Remove badge
                document.querySelectorAll('.tab-badge').forEach(b => b.remove());
            });
            bubbleEl.appendChild(document.createElement('br'));
            bubbleEl.appendChild(mapLink);
        }

        if (openMap && mapInfo) {
            setTimeout(() => switchFloorAndHighlight(mapInfo.floor, mapInfo.zone), 600);
        }

        scrollToBottom();
    }

    function showTypingIndicator() {
        const el = document.createElement('div');
        el.className = 'typing-indicator';
        el.id = 'typingIndicator';

        const avatarEl = document.createElement('div');
        avatarEl.className = 'msg-avatar';
        avatarEl.textContent = '🤖';

        const dots = document.createElement('div');
        dots.className = 'typing-dots';
        dots.innerHTML = '<span></span><span></span><span></span>';

        el.appendChild(avatarEl);
        el.appendChild(dots);
        messagesEl.appendChild(el);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const el = document.getElementById('typingIndicator');
        if (el) el.remove();
    }

    function scrollToBottom() {
        setTimeout(() => {
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }, 50);
    }

    // ============================================================
    // Quick Replies
    // ============================================================
    function showQuickReplies(replies) {
        clearQuickReplies();
        replies.forEach(label => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply-btn';
            btn.textContent = label;
            btn.addEventListener('click', () => {
                sendMessage(label);
            });
            quickReplEl.appendChild(btn);
        });
    }

    function clearQuickReplies() {
        quickReplEl.innerHTML = '';
    }

    // ============================================================
    // Input events
    // ============================================================
    sendBtn.addEventListener('click', () => sendMessage(inputEl.value));
    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(inputEl.value);
        }
    });

    // ============================================================
    // QR Code fallback
    // ============================================================
    if (qrImg) {
        qrImg.addEventListener('error', () => {
            qrImg.style.display = 'none';
            const fallback = document.getElementById('qrFallback');
            if (fallback) fallback.style.display = 'flex';
        });
    }

    // ============================================================
    // Welcome message (on first open)
    // ============================================================
    let welcomed = false;

    toggleBtn.addEventListener('click', () => {
        if (!welcomed && isPanelOpen) {
            welcomed = true;
            setTimeout(() => {
                showTypingIndicator();
                setTimeout(() => {
                    removeTypingIndicator();
                    appendBotMessage(
                        "👋 **Welcome to Google Cloud Summit Hyderabad 2026!**\n\nI'm your event guide. Ask me about restrooms, food, WiFi, the schedule, or anything about the venue!\n\nWhat do you need?",
                        null, false
                    );
                    showQuickReplies(["🚻 Restrooms", "☕ Coffee", "🍽️ Lunch", "📶 WiFi", "🗓️ Schedule", "🅿️ Parking"]);
                    if (badge) badge.style.opacity = '0';
                }, 900);
            }, 300);
        }
    });

    // ============================================================
    // Initial floor map render
    // ============================================================
    renderFloorMap('ground');

})();
