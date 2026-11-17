/* ============================================================================
   PLIK: js/04-audio-speech.js
   LEKTOR (TTS), EFEKTY DŹWIĘKOWE, MIKROFON ORAZ OKNO "CO NOWEGO?"
   ============================================================================ */

let _speechQueueToken = 0;
let _activeRecognition = null;
let _audioCtx = null;

function getAudioContext() {
  if (!_audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) _audioCtx = new AudioCtx();
  }
  if (_audioCtx && _audioCtx.state === "suspended") {
    _audioCtx.resume().catch(() => {});
  }
  return _audioCtx;
}

// 1. ZATRZYMANIE WSZYSTKICH DŹWIĘKÓW, LEKTORA I MIKROFONU
function cancelAllSpeechAndTimers() {
  _speechQueueToken++;
  state.isSpeaking = false;
  if ("speechSynthesis" in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
  if (_activeRecognition) {
    try { _activeRecognition.abort(); } catch (e) {}
    _activeRecognition = null;
  }
}

// 2. SEKWENCYJNY LEKTOR (ANGIELSKI + POLSKI Z CALLBACKIEM PO ZAKOŃCZENIU)
function speakSequence(items, onComplete = null) {
  cancelAllSpeechAndTimers();
  const myToken = _speechQueueToken;

  if (!Array.isArray(items) || items.length === 0 || !("speechSynthesis" in window)) {
    if (typeof onComplete === "function") onComplete();
    return;
  }

  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith("en-GB") && v.name.includes("Google"))
               || voices.find(v => v.lang.startsWith("en-US") && v.name.includes("Google"))
               || voices.find(v => v.lang.startsWith("en"));
  const plVoice = voices.find(v => v.lang.startsWith("pl") && v.name.includes("Google"))
               || voices.find(v => v.lang.startsWith("pl"));

  let idx = 0;
  state.isSpeaking = true;

  function speakNext() {
    if (myToken !== _speechQueueToken) return;
    if (idx >= items.length) {
      state.isSpeaking = false;
      if (typeof onComplete === "function") onComplete();
      return;
    }

    const part = items[idx++];
    if (!part || !part.text) {
      speakNext();
      return;
    }

    const utter = new SpeechSynthesisUtterance(part.text);
    const isEn = part.lang === "en";
    utter.lang = isEn ? "en-US" : "pl-PL";
    if (isEn && enVoice) utter.voice = enVoice;
    if (!isEn && plVoice) utter.voice = plVoice;

    utter.rate = isEn ? 0.88 : 0.98;
    utter.pitch = isEn ? 1.05 : 1.02;

    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      setTimeout(speakNext, 140);
    };

    utter.onend = done;
    utter.onerror = done;

    // Zabezpieczenie na wypadek zawieszenia się TTS w przeglądarce mobilnej
    const safetyMs = Math.max(2500, part.text.length * 95 + 1500);
    setTimeout(done, safetyMs);

    try {
      window.speechSynthesis.speak(utter);
    } catch (e) {
      done();
    }
  }

  speakNext();
}

// 3. EFEKTY DŹWIĘKOWE (WEB AUDIO API - BEZ ZEWNĘTRZNYCH PLIKÓW MP3)
function playEffect(type) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === "beep") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.start(now);
    osc.stop(now + 0.09);
  } else if (type === "success") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(523.25, now);       // C5
    osc.frequency.setValueAtTime(659.25, now + 0.09); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.18); // G5
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);
    osc.start(now);
    osc.stop(now + 0.36);
  } else if (type === "wrong") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(150, now + 0.25);
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.27);
    osc.start(now);
    osc.stop(now + 0.27);
  } else if (type === "sword_hit") {
    osc.type = "square";
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.22);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    osc.start(now);
    osc.stop(now + 0.24);
  } else if (type === "dragon_roar") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(65, now + 0.45);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
    osc.start(now);
    osc.stop(now + 0.48);
  } else if (type === "fanfare") {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.setValueAtTime(freq, now + i * 0.11);
      g.gain.setValueAtTime(0.2, now + i * 0.11);
      g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.11 + 0.35);
      o.start(now + i * 0.11);
      o.stop(now + i * 0.11 + 0.36);
    });
  }
}

// 4. ROZPOZNAWANIE MOWY (MIKROFON DLA DZIECI)
function startSpeechRecognitionForWord(targetWordEn, { onListening, onSuccess, onFail, onUnsupported } = {}) {
  cancelAllSpeechAndTimers();
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    if (typeof onUnsupported === "function") onUnsupported();
    return;
  }

  const cleanTarget = (targetWordEn || "").toLowerCase().replace(/[^a-z\s]/g, "").trim();
  let resolved = false;

  try {
    const rec = new SpeechRec();
    _activeRecognition = rec;
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.maxAlternatives = 3;

    if (typeof onListening === "function") onListening();

    rec.onresult = (event) => {
      if (resolved) return;
      let transcriptAll = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        for (let a = 0; a < event.results[i].length; a++) {
          transcriptAll += " " + event.results[i][a].transcript.toLowerCase();
        }
      }
      const cleanHeard = transcriptAll.replace(/[^a-z\s]/g, " ").trim();
      const isMatch = cleanHeard.includes(cleanTarget) ||
        (cleanTarget.length >= 4 && cleanHeard.includes(cleanTarget.slice(0, cleanTarget.length - 1)));

      if (isMatch) {
        resolved = true;
        try { rec.stop(); } catch (e) {}
        _activeRecognition = null;
        if (typeof onSuccess === "function") onSuccess(cleanHeard);
      }
    };

    rec.onerror = () => {
      if (!resolved) {
        resolved = true;
        _activeRecognition = null;
        if (typeof onFail === "function") onFail();
      }
    };

    rec.onend = () => {
      if (!resolved) {
        resolved = true;
        _activeRecognition = null;
        if (typeof onFail === "function") onFail();
      }
    };

    rec.start();
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        try { rec.stop(); } catch (e) {}
        _activeRecognition = null;
        if (typeof onFail === "function") onFail();
      }
    }, 6500);
  } catch (e) {
    if (typeof onUnsupported === "function") onUnsupported();
  }
}

// 5. AUTOMATYCZNE OKNO "CO NOWEGO?" Z GŁOSEM SÓWKI PRZY ZMIANIE WERSJI
function openWhatsNewModal(readAloud = true) {
  const wn = (typeof APP_CONFIG !== "undefined" && APP_CONFIG.whatsNew) || {
    version: APP_CONFIG ? APP_CONFIG.version : "14.0",
    title: "Nowości w Akademii Angielskiego",
    voiceSummaryPl: "Witajcie w nowej wersji Akademii Angielskiego!",
    changes: ["Ulepszenia i nowe zadania!"]
  };

  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("modalContent");
  if (!overlay || !content) return;

  content.innerHTML = `
    <div class="bg-white rounded-3xl shadow-2xl border-4 border-indigo-400 p-6 text-center relative animate-fade-in">
      <div class="text-6xl mb-2 float-anim">🦉✨</div>
      <div class="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-extrabold text-xs mb-2">
        WERSJA ${wn.version}
      </div>
      <h2 class="text-2xl font-extrabold text-slate-900 mb-3">${wn.title}</h2>
      <div class="bg-indigo-50/70 rounded-2xl p-4 border-2 border-indigo-200 text-left space-y-2 mb-5">
        ${wn.changes.map(c => `<div class="text-sm font-bold text-slate-800 leading-snug">${c}</div>`).join("")}
      </div>
      <div class="flex flex-wrap justify-center gap-2.5">
        <button onclick="speakSequence([{lang:'pl', text: '${wn.voiceSummaryPl.replace(/'/g, "\\'")}'}])" class="kid-card px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-sm shadow">
          🔊 Posłuchaj Sówki
        </button>
        <button onclick="closeModal()" class="kid-card px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg">
          Super! Zaczynamy 🚀
        </button>
      </div>
    </div>
  `;

  overlay.classList.remove("hidden");
  localStorage.setItem("akademia_last_seen_version", APP_CONFIG.version);

  if (readAloud && wn.voiceSummaryPl) {
    speakSequence([{ lang: "pl", text: wn.voiceSummaryPl }]);
  }
}

function checkAndShowWhatsNewOnStartup() {
  if (typeof APP_CONFIG === "undefined") return;
  const seen = localStorage.getItem("akademia_last_seen_version");
  if (seen !== APP_CONFIG.version) {
    setTimeout(() => openWhatsNewModal(true), 600);
  }
}
