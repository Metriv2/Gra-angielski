/* ============================================================================
   PLIK: js/04-audio-tour.js
   DŹWIĘKI (EFEKTY SMOKA), LEKTOR TTS, "CO NOWEGO?" (V15.0 TYLKO DLA CHŁOPCÓW)
   ============================================================================ */

function playEffect(type) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const now = audioCtx.currentTime;

    const compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-12, now);
    compressor.knee.setValueAtTime(18, now);
    compressor.ratio.setValueAtTime(6, now);
    compressor.attack.setValueAtTime(0.005, now);
    compressor.release.setValueAtTime(0.2, now);
    compressor.connect(audioCtx.destination);

    if (type === "dragon_roar") {
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(620, now);
      filter.frequency.exponentialRampToValueAtTime(240, now + 1.15);
      filter.connect(compressor);

      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const osc3 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc1.type = "sawtooth";
      osc2.type = "triangle";
      osc3.type = "sawtooth";

      osc1.frequency.setValueAtTime(150, now);
      osc1.frequency.linearRampToValueAtTime(195, now + 0.28);
      osc1.frequency.exponentialRampToValueAtTime(68, now + 1.15);

      osc2.frequency.setValueAtTime(75, now);
      osc2.frequency.exponentialRampToValueAtTime(40, now + 1.15);

      osc3.frequency.setValueAtTime(112, now);
      osc3.frequency.exponentialRampToValueAtTime(52, now + 1.15);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.72, now + 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.18);

      osc1.connect(gain);
      osc2.connect(gain);
      osc3.connect(gain);
      gain.connect(filter);

      osc1.start(now); osc2.start(now); osc3.start(now);
      osc1.stop(now + 1.2); osc2.stop(now + 1.2); osc3.stop(now + 1.2);
      return;
    }

    if (type === "sword_hit") {
      const swoosh = audioCtx.createOscillator();
      const swooshGain = audioCtx.createGain();
      swoosh.type = "triangle";
      swoosh.frequency.setValueAtTime(540, now);
      swoosh.frequency.exponentialRampToValueAtTime(1600, now + 0.14);
      swoosh.frequency.exponentialRampToValueAtTime(180, now + 0.34);
      swooshGain.gain.setValueAtTime(0.65, now);
      swooshGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      swoosh.connect(swooshGain);
      swooshGain.connect(compressor);
      swoosh.start(now);
      swoosh.stop(now + 0.36);

      [95, 523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = idx === 0 ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(freq, now + 0.15);
        if (idx === 0) osc.frequency.exponentialRampToValueAtTime(38, now + 0.7);
        g.gain.setValueAtTime(idx === 0 ? 0.75 : 0.36, now + 0.15);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.78);
        osc.connect(g);
        g.connect(compressor);
        osc.start(now + 0.15);
        osc.stop(now + 0.8);
      });
      return;
    }

    if (type === "dragon_fire") {
      const bufferSize = Math.floor(audioCtx.sampleRate * 1.25);
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noise = audioCtx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(920, now);
      filter.frequency.exponentialRampToValueAtTime(220, now + 1.2);
      filter.Q.value = 1.2;

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.linearRampToValueAtTime(0.85, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.22);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(compressor);
      noise.start(now);
      noise.stop(now + 1.24);

      const rumble = audioCtx.createOscillator();
      const rGain = audioCtx.createGain();
      rumble.type = "sawtooth";
      rumble.frequency.setValueAtTime(95, now);
      rumble.frequency.exponentialRampToValueAtTime(40, now + 1.15);
      rGain.gain.setValueAtTime(0.62, now);
      rGain.gain.exponentialRampToValueAtTime(0.001, now + 1.18);
      rumble.connect(rGain);
      rGain.connect(compressor);
      rumble.start(now);
      rumble.stop(now + 1.2);
      return;
    }

    const notes = type === "success" ? [523.25, 659.25, 783.99, 1046.5] : type === "wrong" ? [240, 180] : type === "beep" ? [880] : [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.type = type === "wrong" ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);
      gain.gain.setValueAtTime(0.24, now + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.24);
      osc.connect(gain); gain.connect(compressor);
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
      if (onComplete) pendingAdvanceTimer = setTimeout(() => { if (myToken === activeSpeechToken) onComplete(); }, 450);
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
  const ver = typeof CURRENT_GAME_VERSION !== "undefined" ? CURRENT_GAME_VERSION : "15.0";
  return !p || p.seenVersion !== ver;
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
  const ver = typeof CURRENT_GAME_VERSION !== "undefined" ? CURRENT_GAME_VERSION : "15.0";
  if (p.seenVersion === ver) return false;
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
    bar.className = "fixed bottom-3 left-1/2 -translate-x-1/2 z-[80] max-w-2xl w-[95%] bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 border-4 border-amber-500 rounded-3xl p-3.5 shadow-2xl hidden";
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

function hideModalSilently(modalId) {
  const m = document.getElementById(modalId);
  if (m) {
    m.classList.add("hidden");
    m.classList.remove("flex");
  }
}

function stopWhatsNewLiveTour() {
  cancelAllSpeechAndTimers();
  setOwlFloatingGuide(false);
  hideModalSilently("avatarModal");
  if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
}

function openWhatsNewModal(startTourAfter = false) {
  cancelAllSpeechAndTimers();
  const ver = typeof CURRENT_GAME_VERSION !== "undefined" ? CURRENT_GAME_VERSION : "15.0";
  if (state.profile && state.profile !== "duel") {
    const profKey = (state.profile === "hubert" || state.profile === "tata") ? state.profile : "igor";
    state.stats[profKey] = ensurePlayerStructure(state.stats[profKey]);
    if (state.stats[profKey].seenVersion !== ver) {
      state.stats[profKey].seenVersion = ver;
      saveCloudData();
    }
  }
  updateWhatsNewButtonGlow();
  const menuBtn = document.getElementById("menuWhatsNewBtn");
  if (menuBtn) menuBtn.classList.remove("tutorial-highlight");

  const itemsList = (typeof APP_CONFIG !== "undefined" && Array.isArray(APP_CONFIG.whatsNewItems)) ? APP_CONFIG.whatsNewItems : [];
  const box = document.getElementById("whatsNewContentBox");
  if (box) {
    const wardrobeTourBtnHtml = state.profile && state.profile !== "duel"
      ? `<button onclick="runWardrobeNewButtonsTour()" class="kid-card w-full mt-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-600 hover:opacity-95 text-white font-extrabold text-sm shadow-lg border-2 border-white/60 flex items-center justify-center gap-2">
           <span>🦉👉</span> Pokaż mi dokładnie, gdzie kliknąć w Garderobie!
         </button>`
      : "";

    box.innerHTML = itemsList.map(item => `
      <div class="p-3.5 rounded-2xl bg-rose-50/70 border-2 border-rose-200 flex items-start gap-3">
        <span class="text-3xl shrink-0">${item.icon}</span>
        <div>
          <div class="font-extrabold text-rose-950 text-sm md:text-base">${item.title}</div>
          <div class="text-xs md:text-sm font-bold text-slate-700 mt-0.5">${item.desc}</div>
        </div>
      </div>
    `).join("") + wardrobeTourBtnHtml;
  }

  const m = document.getElementById("whatsNewModal");
  if (m) {
    m.classList.remove("hidden");
    m.classList.add("flex");
  }
  if (typeof syncVersionLabelsInDom === "function") syncVersionLabelsInDom();

  const kidName = state.profile === "igor" ? "Igor" : state.profile === "hubert" ? "Hubert" : "Tato";
  const summaryText = itemsList.map((it, i) => `${i + 1}. ${it.title} ${it.desc}`).join(" ");
  speakSequence([
    { lang: "pl", text: `Huhu! Cześć ${kidName}! Pojawiła się nowa Wersja ${ver}! Posłuchaj co nowego dla Ciebie: ${summaryText}` }
  ], () => {
    if (startTourAfter) speakWhatsNewTour(0);
  });
}

function closeWhatsNewModal() {
  cancelAllSpeechAndTimers();
  setOwlFloatingGuide(false);
  hideModalSilently("whatsNewModal");
  if (state.profile && PROFILE_META[state.profile]) {
    checkPendingDadChestsForPlayer(state.profile);
  }
}

function speakWhatsNewTour(onlyStep = 0) {
  hideModalSilently("whatsNewModal");
  hideModalSilently("avatarModal");
  hideModalSilently("badgesModal");
  hideModalSilently("stickersModal");
  if (typeof showLessonMenu === "function") showLessonMenu();

  const ver = typeof CURRENT_GAME_VERSION !== "undefined" ? CURRENT_GAME_VERSION : "15.0";
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
      text: `Cześć ${kidName}! Już pokazuję nowości w wersji ${ver}! Pierwsza nowość jest w Twojej Garderobie! Żeby tam wejść, zawsze klikaj tutaj na górze przycisk Awatar z koroną! Zaraz tam zajrzymy!`,
      onStart: () => {
        setOwlFloatingGuide(true, "👑 Krok 1 z 4: Wejście do Garderoby", "Klikaj u góry przycisk „👑 Awatar”, żeby otworzyć swoją Garderobę!");
        hl("navAvatarBtn", true);
      },
      onEnd: () => hl("navAvatarBtn", false)
    },
    {
      stepId: 2, lang: "pl",
      text: "Jesteśmy w Garderobie! Popatrz pod swojego bohatera – świeci się teraz zielony przycisk z kostką: Wylosuj strój! Kliknij go, a gra sama ubierze Cię w zabawne połączenie z Twoich ubrań!",
      onStart: () => {
        if (state.profile !== "duel" && typeof openAvatarModal === "function") openAvatarModal();
        setOwlFloatingGuide(true, "🎲 Krok 2 z 4: Zielony przycisk Wylosuj strój", "Zaraz pod Twoim bohaterem kliknij „🎲 Wylosuj strój”!");
        hl("avatarRandomOutfitBtn", true);
      },
      onEnd: () => hl("avatarRandomOutfitBtn", false)
    },
    {
      stepId: 3, lang: "pl",
      text: "A tuż obok świeci fioletowy przycisk z błyskawicą: Cały zestaw! Kliknij go, żeby jednym kliknięciem założyć cały komplet, na przykład Strażaka, Batmana albo Kosmonautę!",
      onStart: () => {
        setOwlFloatingGuide(true, "⚡ Krok 3 z 4: Fioletowy przycisk Cały zestaw", "Obok losowania kliknij „⚡ Cały zestaw”, żeby ubrać pełny strój!");
        hl("avatarFullSetBtn", true);
      },
      onEnd: () => {
        hl("avatarFullSetBtn", false);
        hideModalSilently("avatarModal");
      }
    },
    {
      stepId: 4, lang: "pl",
      text: "I jeszcze dwie super rzeczy podczas lekcji! Po pierwsze: Seria bez błędu, czyli Combo – za trzy trafienia pod rząd dostajesz dwie, za pięć trafień pięć, a za osiem trafień aż dziesięć dodatkowych gwiazdek! Po drugie: jeśli zdarzy się mała pomyłka, na końcu rundy zrobimy szybką dogrywkę z pomylonych słówek! Miłej zabawy!",
      onStart: () => {
        setOwlFloatingGuide(true, "🔥⭐ Krok 4 z 4: Combo Gwiazdek i Szybka Dogrywka", "Odpowiadaj pod rząd bez błędu po dodatkowe ⭐ i poprawiaj pomyłki w dogrywce!");
        hl("lessonsGridBox", true);
      },
      onEnd: () => hl("lessonsGridBox", false)
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
  hideModalSilently("badgesModal");
  hideModalSilently("stickersModal");
  hideModalSilently("avatarModal");
  if (state.currentLessonId && typeof showLessonMenu === "function") showLessonMenu();
  const kidName = state.profile === "igor" ? "Igor" : state.profile === "hubert" ? "Hubert" : state.profile === "tata" ? "Tato" : "Chłopaki";
  const hl = (id, on) => { const el = document.getElementById(id); if (el) { el.classList.toggle("tutorial-highlight", on); if (on) el.scrollIntoView({ behavior: "smooth", block: "center" }); } };
  speakSequence([
    { lang: "pl", text: `Cześć ${kidName}! Pokażę Ci co gdzie jest! Na środku ekranu masz kolorowe kafelki z lekcjami oraz Pojedynek Braci. Kliknij lekcję, aby zbierać gwiazdki!`, onStart: () => hl("lessonsGridBox", true), onEnd: () => hl("lessonsGridBox", false) },
    { lang: "pl", text: "Teraz wchodzimy w Odznaki! Im więcej dni z rzędu grasz i im dokładniej odpowiadasz, tym większą masz szansę na srebrną lub złotą skrzynię!", onStart: () => { hl("navBadgesBtn", true); if (state.profile !== "duel" && typeof openBadgesModal === "function") openBadgesModal(); }, onEnd: () => { hl("navBadgesBtn", false); hideModalSilently("badgesModal"); } },
    { lang: "pl", text: "Obok świeci przycisk Naklejki! Tam zobaczysz swój klaser ze stoma naklejkami.", onStart: () => hl("navStickersBtn", true), onEnd: () => hl("navStickersBtn", false) },
    { lang: "pl", text: "A teraz wchodzimy w Awatar! Tutaj możesz ubierać swojego bohatera, wylosować fajny strój, założyć cały zestaw jednym kliknięciem oraz karmić zwierzaka!", onStart: () => { hl("navAvatarBtn", true); if (state.profile !== "duel" && typeof openAvatarModal === "function") openAvatarModal(); }, onEnd: () => { hl("navAvatarBtn", false); hideModalSilently("avatarModal"); } }
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
  const ver = typeof CURRENT_GAME_VERSION !== "undefined" ? CURRENT_GAME_VERSION : "15.0";

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

  const mkErr = (src, fb) => `if(typeof handleOutfitImgError==='function'){handleOutfitImgError(this,'${src}','${fb}');}else if(this.src.indexOf('srebrna/zlota')===-1&&'${fb}'!=='${src}'){this.src='${fb}';}else{this.style.display='none';}`;

  return `
    <div class="relative mx-auto select-none pointer-events-none overflow-visible shrink-0" style="width: ${size}px; height: ${size}px; min-width: ${size}px; min-height: ${size}px;">
      <img src="grafiki/boy_base.png" class="absolute inset-0 w-full h-full object-contain z-10" style="clip-path: ${baseClip};" onerror="this.style.display='none';" />
      ${legsImg ? `<img src="${legsImg}?v=${ver}" class="absolute left-1/2 object-fill z-20" style="top: ${lCfg.top}%; width: ${lCfg.width}%; height: ${lCfg.height}%; transform: translateX(-50%) scale(${lCfg.scaleX}, ${lCfg.scaleY});" onerror="${mkErr(legsImg, legsFb)}" />` : ""}
      ${torsoImg ? `<img src="${torsoImg}?v=${ver}" class="absolute left-1/2 object-fill z-30" style="top: ${tCfg.top}%; width: ${tCfg.width}%; height: ${tCfg.height}%; transform: translateX(-50%) scale(${tCfg.scaleX}, ${tCfg.scaleY});" onerror="${mkErr(torsoImg, torsoFb)}" />` : ""}
      ${headImg ? `<img src="${headImg}?v=${ver}" class="absolute left-1/2 object-fill z-40" style="top: ${hCfg.top}%; width: ${hCfg.width}%; height: ${hCfg.height}%; transform: translateX(-50%) scale(${hCfg.scaleX}, ${hCfg.scaleY});" onerror="${mkErr(headImg, headFb)}" />` : ""}
      ${petHtml}
    </div>
  `;
}
