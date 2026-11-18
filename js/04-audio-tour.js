/* ============================================================================
   PLIK: js/04-audio-tour.js
   DŹWIĘKI, LEKTOR TTS, AUTOMATYCZNE OKNO "CO NOWEGO?" I RENDEROWANIE AWATARA
   ============================================================================ */

function playEffect(type) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const now = audioCtx.currentTime;

    if (type === "dragon_roar") {
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(520, now);
      filter.frequency.exponentialRampToValueAtTime(220, now + 0.95);
      filter.connect(audioCtx.destination);

      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc1.type = "sawtooth";
      osc2.type = "triangle";

      osc1.frequency.setValueAtTime(145, now);
      osc1.frequency.linearRampToValueAtTime(185, now + 0.25);
      osc1.frequency.exponentialRampToValueAtTime(72, now + 0.95);

      osc2.frequency.setValueAtTime(72, now);
      osc2.frequency.exponentialRampToValueAtTime(42, now + 0.95);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.26, now + 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.98);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(filter);

      osc1.start(now); osc2.start(now);
      osc1.stop(now + 1.0); osc2.stop(now + 1.0);
      return;
    }

    if (type === "sword_hit") {
      // Świst miecza
      const swoosh = audioCtx.createOscillator();
      const swooshGain = audioCtx.createGain();
      swoosh.type = "triangle";
      swoosh.frequency.setValueAtTime(520, now);
      swoosh.frequency.exponentialRampToValueAtTime(1450, now + 0.12);
      swoosh.frequency.exponentialRampToValueAtTime(190, now + 0.28);
      swooshGain.gain.setValueAtTime(0.22, now);
      swooshGain.gain.exponentialRampToValueAtTime(0.001, now + 0.29);
      swoosh.connect(swooshGain);
      swooshGain.connect(audioCtx.destination);
      swoosh.start(now);
      swoosh.stop(now + 0.3);

      // Uderzenie + bohaterski akord
      [110, 523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = idx === 0 ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(freq, now + 0.14);
        if (idx === 0) osc.frequency.exponentialRampToValueAtTime(45, now + 0.55);
        g.gain.setValueAtTime(idx === 0 ? 0.25 : 0.15, now + 0.14);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
        osc.connect(g);
        g.connect(audioCtx.destination);
        osc.start(now + 0.14);
        osc.stop(now + 0.66);
      });
      return;
    }

    if (type === "dragon_fire") {
      // Szum ognia (biały szum przez filtr)
      const bufferSize = Math.floor(audioCtx.sampleRate * 1.05);
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = audioCtx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(850, now);
      filter.frequency.exponentialRampToValueAtTime(240, now + 1.0);
      filter.Q.value = 1.4;

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.32, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.02);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start(now);
      noise.stop(now + 1.04);

      // Niskie dudnienie płomieni
      const rumble = audioCtx.createOscillator();
      const rGain = audioCtx.createGain();
      rumble.type = "sawtooth";
      rumble.frequency.setValueAtTime(92, now);
      rumble.frequency.exponentialRampToValueAtTime(44, now + 0.95);
      rGain.gain.setValueAtTime(0.2, now);
      rGain.gain.exponentialRampToValueAtTime(0.001, now + 0.96);
      rumble.connect(rGain);
      rGain.connect(audioCtx.destination);
      rumble.start(now);
      rumble.stop(now + 0.98);
      return;
    }

    const notes = type === "success" ? [523.25, 659.25, 783.99, 1046.5] : type === "wrong" ? [240, 180] : type === "beep" ? [880] : [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.type = type === "wrong" ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);
      gain.gain.setValueAtTime(0.18, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.24);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now + idx * 0.09); osc.stop(now + idx * 0.09 + 0.25);
    });
  } catch (e) {}
}

function cancelAllSpeechAndTimers() {
  activeSpeechToken++;
  if (pendingAdvanceTimer) { clearTimeout(pendingAdvanceTimer); pendingAdvanceTimer = null; }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  document.querySelectorAll(".tutorial-highlight").forEach(el => el.classList.remove("tutorial-highlight", "word-glow"));
  setOwlFloatingGuide(false);
  updateWhatsNewButtonGlow();
}

function speakSequence(segments, onComplete = null) {
  cancelAllSpeechAndTimers();
  const myToken = activeSpeechToken;
  if (!("speechSynthesis" in window) || !segments || !segments.length) {
    if (onComplete) pendingAdvanceTimer = setTimeout(onComplete, 800);
    return;
  }
  const voices = window.speechSynthesis.getVoices();
  let idx = 0;
  function next() {
    if (myToken !== activeSpeechToken) return;
    if (idx >= segments.length) {
      if (onComplete) pendingAdvanceTimer = setTimeout(() => { if (myToken === activeSpeechToken) onComplete(); }, 500);
      return;
    }
    const seg = segments[idx++];
    if (seg.onStart) seg.onStart();
    const utter = new SpeechSynthesisUtterance(seg.text.toLowerCase());
    window._activeUtterance = utter;
    if (seg.lang === "en") {
      utter.lang = "en-GB";
      const enV = voices.find(v => v.lang.startsWith("en-GB") || v.lang.startsWith("en-US") || v.lang.startsWith("en"));
      if (enV) utter.voice = enV;
      utter.rate = state.turtleMode ? 0.6 : 0.85;
    } else {
      utter.lang = "pl-PL";
      const plV = voices.find(v => v.lang.startsWith("pl"));
      if (plV) utter.voice = plV;
      utter.rate = 1.02;
    }
    let done = false;
    const finish = () => { if (done || myToken !== activeSpeechToken) return; done = true; if (seg.onEnd) seg.onEnd(); next(); };
    const safety = setTimeout(finish, Math.max(4200, seg.text.length * 145));
    utter.onend = () => { clearTimeout(safety); finish(); };
    utter.onerror = () => { clearTimeout(safety); finish(); };
    window.speechSynthesis.speak(utter);
  }
  next();
}

function getPetLevelInfo(xp) {
  const fed = xp || 0;
  const level = Math.floor(fed / 3) + 1;
  const inLevel = fed % 3;
  return { level, fed, inLevel, nextTarget: 3 };
}

function shouldGlowWhatsNew() {
  if (!state.profile || state.profile === "duel") return false;
  const profKey = (state.profile === "hubert" || state.profile === "tata") ? state.profile : "igor";
  const p = state.stats[profKey];
  return !p || p.seenVersion !== CURRENT_GAME_VERSION;
}

function updateWhatsNewButtonGlow() {
  const btn = document.getElementById("navWhatsNewBtn");
  if (!btn) return;
  if (state.profile === "duel") {
    btn.classList.add("hidden");
    btn.classList.remove("tutorial-highlight");
    return;
  }
  btn.classList.remove("hidden");
  btn.classList.toggle("tutorial-highlight", shouldGlowWhatsNew());
}

function checkAutoShowWhatsNewOnVersionChange(profKey) {
  if (!PROFILE_META[profKey]) return false;
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (p.seenVersion === CURRENT_GAME_VERSION) return false;
  setTimeout(() => {
    openWhatsNewModal(false);
  }, 350);
  return true;
}

function setOwlFloatingGuide(visible, titleText = "", stepText = "") {
  let bar = document.getElementById("owlTourFloatingBanner");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "owlTourFloatingBanner";
    bar.className = "fixed bottom-3 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[95%] bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 border-4 border-amber-500 rounded-3xl p-3.5 shadow-2xl hidden";
    document.body.appendChild(bar);
  }
  if (!visible) { bar.classList.add("hidden"); return; }
  bar.classList.remove("hidden");
  bar.innerHTML = `
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3 text-left">
        <span class="text-4xl float-anim shrink-0">🦉👉</span>
        <div>
          <div class="text-xs font-extrabold uppercase text-amber-900">${titleText}</div>
          <div class="text-xs md:text-sm font-bold text-slate-900 leading-snug mt-0.5">${stepText}</div>
        </div>
      </div>
      <button onclick="stopWhatsNewLiveTour()" class="shrink-0 px-3.5 py-2 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow">
        ⏹️ Zakończ pokaz
      </button>
    </div>
  `;
}

function stopWhatsNewLiveTour() {
  cancelAllSpeechAndTimers();
  setOwlFloatingGuide(false);
  if (typeof closeAvatarModal === "function") closeAvatarModal();
  if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
}

function openWhatsNewModal(startTourAfter = false) {
  cancelAllSpeechAndTimers();
  if (state.profile && state.profile !== "duel") {
    const profKey = (state.profile === "hubert" || state.profile === "tata") ? state.profile : "igor";
    state.stats[profKey] = ensurePlayerStructure(state.stats[profKey]);
    if (state.stats[profKey].seenVersion !== CURRENT_GAME_VERSION) {
      state.stats[profKey].seenVersion = CURRENT_GAME_VERSION;
      saveCloudData();
    }
  }
  updateWhatsNewButtonGlow();
  const menuBtn = document.getElementById("menuWhatsNewBtn");
  if (menuBtn) menuBtn.classList.remove("tutorial-highlight");

  const box = document.getElementById("whatsNewContentBox");
  if (box) {
    box.innerHTML = (APP_CONFIG.whatsNewItems || []).map(item => `
      <div class="p-3.5 rounded-2xl bg-rose-50/70 border-2 border-rose-200 flex items-start gap-3">
        <span class="text-3xl shrink-0">${item.icon}</span>
        <div>
          <div class="font-extrabold text-rose-950 text-sm md:text-base">${item.title}</div>
          <div class="text-xs md:text-sm font-bold text-slate-700 mt-0.5">${item.desc}</div>
        </div>
      </div>
    `).join("");
  }

  const m = document.getElementById("whatsNewModal");
  if (m) {
    m.classList.remove("hidden");
    m.classList.add("flex");
  }
  syncVersionLabelsInDom();

  const kidName = state.profile === "igor" ? "Igor" : state.profile === "hubert" ? "Hubert" : "Tato";
  const summaryText = (APP_CONFIG.whatsNewItems || []).map((it, i) => `${i + 1}. ${it.title} ${it.desc}`).join(" ");
  speakSequence([
    { lang: "pl", text: `Huhu! Cześć ${kidName}! Pojawiła się nowa Wersja ${CURRENT_GAME_VERSION}! Posłuchaj co nowego: ${summaryText}` }
  ], () => {
    if (startTourAfter) speakWhatsNewTour(0);
  });
}

function closeWhatsNewModal() {
  cancelAllSpeechAndTimers();
  setOwlFloatingGuide(false);
  const m = document.getElementById("whatsNewModal");
  if (m) { m.classList.add("hidden"); m.classList.remove("flex"); }
  if (state.profile && PROFILE_META[state.profile]) {
    checkPendingDadChestsForPlayer(state.profile);
  }
}

function speakWhatsNewTour(onlyStep = 0) {
  const m = document.getElementById("whatsNewModal");
  if (m) { m.classList.add("hidden"); m.classList.remove("flex"); }
  if (typeof closeAvatarModal === "function") closeAvatarModal();
  if (typeof closeBadgesModal === "function") closeBadgesModal();
  if (typeof closeStickersModal === "function") closeStickersModal();
  if (typeof showLessonMenu === "function") showLessonMenu();

  const kidName = state.profile === "igor" ? "Igor" : state.profile === "hubert" ? "Hubert" : "Tato";
  const hl = (elOrId, on) => {
    const el = typeof elOrId === "string" ? document.getElementById(elOrId) : elOrId;
    if (el) {
      el.classList.toggle("tutorial-highlight", on);
      if (on) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const allSteps = [
    {
      stepId: 1, lang: "pl",
      text: `Cześć ${kidName}! Już pokazuję nowości w wersji ${CURRENT_GAME_VERSION}! Po pierwsze: Pojedynek Braci oraz Walka ze Smokiem są teraz zawsze pod ręką w menu głównym!`,
      onStart: () => { setOwlFloatingGuide(true, "⚔️🐉 Krok 1 z 4: Pojedynek Braci i Smok w Menu", "Przycisk Pojedynku Braci jest zawsze widoczny!"); hl("btnDuelMenuAlways", true); hl("btnCoopDragonMenu", true); },
      onEnd: () => { hl("btnDuelMenuAlways", false); hl("btnCoopDragonMenu", false); }
    },
    {
      stepId: 2, lang: "pl",
      text: "Po drugie: Asystent Zakupowy w Awatarze! Kiedy wejdziesz w Awatar na górze i klikniesz swojego bohatera lub przycisk sprawdzenia gwiazdek, Sówka powie ile masz gwiazdek, jaką skrzynię możesz już kupić i ile brakuje do droższych skrzyń!",
      onStart: () => { setOwlFloatingGuide(true, "👑💬 Krok 2 z 4: Asystent Zakupowy w Awatarze", "Kliknij „👑 Awatar” na górze, aby sprawdzić na jakie skrzynie wystarczą Twoje gwiazdki!"); hl("navAvatarBtn", true); },
      onEnd: () => hl("navAvatarBtn", false)
    },
    {
      stepId: 3, lang: "pl",
      text: "Po trzecie: w walce ze Smokiem dodaliśmy animację ognia i miecza, trudniejsze zadania z mikrofonem dla Huberta, cztery opcje dla Igora oraz głosowe ogłaszanie kto i jaką skrzynię zdobył!",
      onStart: () => { setOwlFloatingGuide(true, "🔥🗡️ Krok 3 z 4: Walka ze Smokiem", "Smok atakuje ogniem, a lektor ogłasza kto jaką skrzynię zdobył!"); hl("btnCoopDragonMenu", true); },
      onEnd: () => hl("btnCoopDragonMenu", false)
    },
    {
      stepId: 4, lang: "pl",
      text: "I po czwarte: w lekcji Pieczenie Pankejków mąka, jogurt naturalny i olej mają swoje własne rysunki, a nowe słówka automatycznie trafiają do Pojedynku i walki ze Smokiem! Miłej zabawy!",
      onStart: () => { setOwlFloatingGuide(true, "🥞🥣 Krok 4 z 4: Pankejki i nowe słówka", "Nowe lekcje automatycznie zasilają Pojedynek Braci i Smoka!"); hl("lessonCard_pancakes_cooking", true); },
      onEnd: () => hl("lessonCard_pancakes_cooking", false)
    }
  ];

  const stepsToRun = onlyStep > 0 ? allSteps.filter(s => s.stepId === onlyStep) : allSteps;
  speakSequence(stepsToRun, () => setOwlFloatingGuide(false));
}

function toggleTurtle() {
  state.turtleMode = !state.turtleMode;
  const lbl = document.getElementById("turtleLabel");
  if (lbl) lbl.textContent = state.turtleMode ? "Żółwik" : "Normalnie";
}

function startKidVoiceTour() {
  if (!state.profile) return;
  if (typeof closeBadgesModal === "function") closeBadgesModal();
  if (typeof closeStickersModal === "function") closeStickersModal();
  if (typeof closeAvatarModal === "function") closeAvatarModal();
  if (state.currentLessonId && typeof showLessonMenu === "function") showLessonMenu();
  const kidName = state.profile === "igor" ? "Igor" : state.profile === "hubert" ? "Hubert" : state.profile === "tata" ? "Tato" : "Chłopaki";
  const hl = (id, on) => { const el = document.getElementById(id); if (el) { el.classList.toggle("tutorial-highlight", on); if (on) el.scrollIntoView({ behavior: "smooth", block: "center" }); } };
  speakSequence([
    { lang: "pl", text: `Cześć ${kidName}! Pokażę Ci co gdzie jest! Na środku ekranu masz kolorowe kafelki z lekcjami oraz Pojedynek Braci. Kliknij lekcję, aby zbierać gwiazdki!`, onStart: () => hl("lessonsGridBox", true), onEnd: () => hl("lessonsGridBox", false) },
    { lang: "pl", text: "Teraz wchodzimy w Odznaki! Im więcej dni z rzędu grasz i im dokładniej odpowiadasz, tym większą masz szansę na srebrną lub złotą skrzynię!", onStart: () => { hl("navBadgesBtn", true); if (state.profile !== "duel" && typeof openBadgesModal === "function") openBadgesModal(); }, onEnd: () => { hl("navBadgesBtn", false); if (typeof closeBadgesModal === "function") closeBadgesModal(); } },
    { lang: "pl", text: "Obok świeci przycisk Naklejki! Tam zobaczysz swój klaser ze stoma naklejkami.", onStart: () => hl("navStickersBtn", true), onEnd: () => hl("navStickersBtn", false) },
    { lang: "pl", text: "A teraz wchodzimy w Awatar! Tutaj możesz ubierać swojego bohatera, zapytać asystenta ile masz gwiazdek i na jakie skrzynie Ci wystarczy, oraz karmić zwierzaka!", onStart: () => { hl("navAvatarBtn", true); if (state.profile !== "duel" && typeof openAvatarModal === "function") openAvatarModal(); }, onEnd: () => { hl("navAvatarBtn", false); if (typeof closeAvatarModal === "function") closeAvatarModal(); } }
  ]);
}

function classifyHeadItem(src) {
  if (!src) return "none";
  const fn = src.split("/").pop().toLowerCase();
  if (fn === "helmet_firefighter.png" || fn === "helmet_electrician.png") return "openHelmet";
  if (fn.startsWith("helmet_") || fn.startsWith("mask_") || fn.includes("hot-dog")) return "helmet";
  if (src.includes("/zlota/")) return "goldCap";
  return "cap";
}
function classifyTorsoItem(src) {
  if (!src) return "none";
  const fn = src.split("/").pop().toLowerCase();
  if (fn.startsWith("armor_") || fn.startsWith("jacket_") || fn.startsWith("suit_") || fn === "shirt_commando.png" || fn === "shirt_soldier.png" || fn === "shirt_police.png") return "armor";
  return "shirt";
}
function classifyLegsItem(src) {
  if (!src) return "none";
  const fn = src.split("/").pop().toLowerCase();
  if (fn.startsWith("jeans_")) return "jeans";
  if (fn === "pants_barcelona.png" || fn === "pants_poland.png") return "goldShorts";
  if (fn.startsWith("short_") || fn.startsWith("shorts_")) return "shorts";
  if (fn === "pants_paramedic.png" || fn === "pants_police.png" || fn === "pants_firefighter.png") return "silverPants";
  if (src.includes("/zlota/")) return "goldPants";
  return "silverPants";
}

function renderBoyAvatarSvg(playerKey, size = 80) {
  const key = PROFILE_META[playerKey] ? playerKey : "igor";
  const p = ensurePlayerStructure(state.stats[key]);
  state.stats[key] = p;
  const avatar = p.avatar || {};
  const cal = getAvatarCalibration();

  const headImg = resolveOutfitPath(avatar.head); const torsoImg = resolveOutfitPath(avatar.torso); const legsImg = resolveOutfitPath(avatar.legs);
  const headFb = getFallbackOutfitPath(headImg); const torsoFb = getFallbackOutfitPath(torsoImg); const legsFb = getFallbackOutfitPath(legsImg);
  const headType = classifyHeadItem(headImg); const torsoType = classifyTorsoItem(torsoImg); const legsType = classifyLegsItem(legsImg);
  const hCfg = cal[headType] || cal.cap; const tCfg = cal[torsoType] || cal.shirt; const lCfg = cal[legsType] || cal.jeans;

  let baseClip = "none";
  if (headType === "helmet") { if (headImg && !(headImg.includes("hot-dog"))) baseClip = "inset(28% 0% 0% 0%)"; }
  else if (headType === "openHelmet") baseClip = "inset(15% 0% 0% 0%)";
  else if (headType === "cap" || headType === "goldCap") baseClip = "inset(12% 0% 0% 0%)";

  let petHtml = "";
  if (avatar.pet) {
    const memoryPool = typeof COMPANION_PETS !== "undefined" ? COMPANION_PETS : [];
    const petObj = memoryPool.find(a => a.id === avatar.pet);
    if (petObj) {
      const petSize = Math.max(16, Math.floor(size * 0.40));
      const lvInfo = getPetLevelInfo((p.petXp && p.petXp[avatar.pet]) || 0);
      const badgeHtml = size >= 65 && lvInfo.fed > 0
        ? `<span class="block text-[9px] font-extrabold bg-amber-400 text-amber-950 px-1 rounded-full border border-amber-600 leading-tight -mt-1">${lvInfo.level >= 3 ? '👑' : '❤️'} Lv.${lvInfo.level}</span>`
        : "";
      petHtml = `<div class="absolute bottom-0 -right-4 z-50 float-anim drop-shadow-md flex flex-col items-center" style="font-size: ${petSize}px; line-height: 1;"><span>${petObj.icon}</span>${badgeHtml}</div>`;
    }
  }

  return `
    <div class="relative mx-auto select-none pointer-events-none overflow-visible shrink-0" style="width: ${size}px; height: ${size}px; min-width: ${size}px; min-height: ${size}px;">
      <img src="grafiki/boy_base.png" class="absolute inset-0 w-full h-full object-contain z-10" style="clip-path: ${baseClip};" onerror="this.style.display='none';" />
      ${legsImg ? `<img src="${legsImg}" class="absolute left-1/2 object-fill z-20" style="top: ${lCfg.top}%; width: ${lCfg.width}%; height: ${lCfg.height}%; transform: translateX(-50%) scale(${lCfg.scaleX}, ${lCfg.scaleY});" onerror="if(this.src.indexOf('srebrna/zlota')===-1 && '${legsFb}'!=='${legsImg}'){this.src='${legsFb}';}else{this.style.display='none';}" />` : ""}
      ${torsoImg ? `<img src="${torsoImg}" class="absolute left-1/2 object-fill z-30" style="top: ${tCfg.top}%; width: ${tCfg.width}%; height: ${tCfg.height}%; transform: translateX(-50%) scale(${tCfg.scaleX}, ${tCfg.scaleY});" onerror="if(this.src.indexOf('srebrna/zlota')===-1 && '${torsoFb}'!=='${torsoImg}'){this.src='${torsoFb}';}else{this.style.display='none';}" />` : ""}
      ${headImg ? `<img src="${headImg}" class="absolute left-1/2 object-fill z-40" style="top: ${hCfg.top}%; width: ${hCfg.width}%; height: ${hCfg.height}%; transform: translateX(-50%) scale(${hCfg.scaleX}, ${hCfg.scaleY});" onerror="if(this.src.indexOf('srebrna/zlota')===-1 && '${headFb}'!=='${headImg}'){this.src='${headFb}';}else{this.style.display='none';}" />` : ""}
      ${petHtml}
    </div>
  `;
}
