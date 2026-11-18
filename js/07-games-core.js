/* ============================================================================
   PLIK: js/07-games-core.js
   PASEK GRY, PEŁNOEKRANOWA ANIMACJA SMOKA (3.4s), LIMIT 3 SKRZYŃ, LEKARZ, QUIZ
   ============================================================================ */

(function ensureDragonFullscreenStyles() {
  if (document.getElementById("dragonFullscreenStyles")) return;
  const style = document.createElement("style");
  style.id = "dragonFullscreenStyles";
  style.textContent = `
    @keyframes dragonStageAppear {
      0%   { opacity: 0; transform: scale(0.25) translateY(30px); filter: brightness(0.4); }
      65%  { opacity: 1; transform: scale(1.14) translateY(-6px); filter: brightness(1.15) drop-shadow(0 0 28px rgba(251,191,36,0.85)); }
      100% { opacity: 1; transform: scale(1.04) translateY(0); filter: brightness(1); }
    }
    @keyframes dragonClashZoomHit {
      0%   { transform: scale(1.04); filter: brightness(1); }
      22%  { transform: scale(1.30); filter: brightness(1.55) drop-shadow(0 0 36px rgba(239,68,68,1)); }
      45%  { transform: scale(1.14) rotate(-9deg); filter: sepia(1) saturate(8) hue-rotate(-38deg) brightness(1.3); }
      68%  { transform: scale(1.22) rotate(7deg); filter: sepia(0.8) saturate(6) hue-rotate(-25deg); }
      86%  { transform: scale(1.08) rotate(-3deg); filter: brightness(1.15); }
      100% { transform: scale(1.0) rotate(0deg); filter: brightness(1); }
    }
    @keyframes dragonClashLungeFire {
      0%   { transform: scale(1.04); }
      28%  { transform: scale(1.52) translateY(10px); filter: drop-shadow(0 0 46px rgba(249,115,22,1)); }
      52%  { transform: scale(1.40) rotate(-6deg); filter: drop-shadow(0 0 38px rgba(239,68,68,1)); }
      76%  { transform: scale(1.48) rotate(6deg); }
      100% { transform: scale(1.28) rotate(0deg); }
    }
    @keyframes dragonOverlayShake {
      0%, 100% { transform: translate(0, 0); }
      10% { transform: translate(-16px, 10px) rotate(-1.4deg); }
      20% { transform: translate(16px, -10px) rotate(1.4deg); }
      30% { transform: translate(-15px, -8px) rotate(-1.1deg); }
      40% { transform: translate(15px, 8px) rotate(1.1deg); }
      50% { transform: translate(-12px, 6px) rotate(-0.8deg); }
      60% { transform: translate(12px, -6px) rotate(0.8deg); }
      74% { transform: translate(-8px, 4px); }
      88% { transform: translate(8px, -4px); }
    }
    @keyframes dragonWeaponSlow {
      0%   { opacity: 0; transform: scale(0.3) rotate(-40deg); }
      22%  { opacity: 1; transform: scale(1.42) rotate(12deg); }
      68%  { opacity: 1; transform: scale(1.22) rotate(-6deg); }
      100% { opacity: 0; transform: scale(1.0) rotate(18deg); }
    }
    .dragon-fs-appear { animation: dragonStageAppear 1.35s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .dragon-fs-zoom-hit { animation: dragonClashZoomHit 2.3s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .dragon-fs-lunge-fire { animation: dragonClashLungeFire 2.3s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .dragon-fs-shake { animation: dragonOverlayShake 1.7s ease-in-out; }
    .dragon-weapon-slow { animation: dragonWeaponSlow 2.1s ease-out forwards; }
  `;
  document.head.appendChild(style);
})();

function hideDragonFullscreenClash() {
  clearTimeout(window._dragonStageTimer);
  clearTimeout(window._dragonHpAnimTimer);
  clearTimeout(window._dragonFsTimer);
  const ov = document.getElementById("dragonFullscreenOverlay");
  if (ov) {
    ov.className = "fixed inset-0 z-[70] hidden pointer-events-none";
    ov.innerHTML = "";
  }
}

function showDragonFullscreenClash(type) {
  hideDragonFullscreenClash();

  let ov = document.getElementById("dragonFullscreenOverlay");
  if (!ov) {
    ov = document.createElement("div");
    ov.id = "dragonFullscreenOverlay";
    document.body.appendChild(ov);
  }

  const db = state.dragonBattle || { dragonHp: 10, maxDragonHp: 10, teamHp: 4, maxTeamHp: 4 };
  const isHit = type === "hit";
  const isIgor = state.duelTurn === "igor";
  const heroKey = isIgor ? "igor" : "hubert";
  const heroName = isIgor ? "IGOR" : "HUBERT";

  const prevDragonHp = isHit ? Math.min(db.maxDragonHp, db.dragonHp + 1) : db.dragonHp;
  const startDragonPct = Math.max(0, Math.round((prevDragonHp / db.maxDragonHp) * 100));
  const endDragonPct = Math.max(0, Math.round((db.dragonHp / db.maxDragonHp) * 100));

  const prevTeamHp = !isHit ? Math.min(db.maxTeamHp, db.teamHp + 1) : db.teamHp;
  const startHearts = "❤️".repeat(Math.max(0, prevTeamHp)) + "🖤".repeat(Math.max(0, db.maxTeamHp - prevTeamHp));
  const endHearts = "❤️".repeat(Math.max(0, db.teamHp)) + "💔".repeat(Math.max(0, db.maxTeamHp - db.teamHp));

  // ETAP 1 (0.0s - 1.45s): Pojawienie się Smoka + ryk
  if (typeof playEffect === "function") playEffect("dragon_roar");

  ov.className = "fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 backdrop-blur-sm bg-gradient-to-b from-slate-950/94 via-purple-950/90 to-slate-950/96 transition-colors duration-500";

  ov.innerHTML = `
    <div id="dragonFsCard" class="max-w-md w-full rounded-3xl border-4 border-amber-400 bg-slate-900/90 p-5 text-center text-white shadow-2xl relative overflow-hidden transition-colors duration-500">
      <div id="dragonFsBadge" class="inline-block px-4 py-1.5 rounded-full font-extrabold text-xs uppercase tracking-wider mb-3 bg-amber-400 text-slate-950">
        🐉 GROŹNY SMOK POJAWIA SIĘ NA ARENIE!
      </div>

      <div class="relative my-3 flex items-center justify-center h-52">
        <div id="dragonFsSprite" class="text-[126px] leading-none select-none dragon-fs-appear">🐉</div>
        <div id="dragonFsWeaponFx" class="absolute inset-0 flex items-center justify-center pointer-events-none"></div>
      </div>

      <div class="mb-3">
        <div class="flex justify-between text-xs font-extrabold text-amber-300 mb-1">
          <span>🐉 Życie Smoka</span>
          <span id="dragonFsHpText">${prevDragonHp} / ${db.maxDragonHp} HP</span>
        </div>
        <div class="w-full h-4 bg-slate-800 rounded-full overflow-hidden border-2 border-amber-400">
          <div id="dragonFsHpBar" class="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 transition-all duration-1000 ease-out" style="width:${startDragonPct}%"></div>
        </div>
      </div>

      <div class="flex items-center justify-between bg-black/45 rounded-2xl p-2.5 border border-white/15">
        <div class="flex items-center gap-2">
          ${typeof renderBoyAvatarSvg === "function" ? renderBoyAvatarSvg(heroKey, 48) : ""}
          <div class="text-left">
            <div class="text-[10px] font-bold text-slate-300 uppercase">Życie Braci</div>
            <div id="dragonFsHearts" class="text-base tracking-wider transition-all duration-500">${startHearts}</div>
          </div>
        </div>
        <div id="dragonFsActionNote" class="text-xs font-extrabold text-amber-300">
          ${isHit ? `🛡️ ${heroName} szykuje atak!` : `⚠️ Uwaga! Smok bierze oddech!`}
        </div>
      </div>
    </div>
  `;

  // ETAP 2 (po 1.45s): Atak mieczem LUB zionięcie ogniem Smoka + dźwięk ataku
  window._dragonStageTimer = setTimeout(() => {
    const currentOv = document.getElementById("dragonFullscreenOverlay");
    if (!currentOv || currentOv.classList.contains("hidden")) return;

    if (typeof playEffect === "function") {
      playEffect(isHit ? "sword_hit" : "dragon_fire");
    }

    currentOv.className = `fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 backdrop-blur-sm transition-colors duration-300 ${
      isHit
        ? "bg-gradient-to-b from-red-950/94 via-rose-900/90 to-slate-950/96"
        : "bg-gradient-to-b from-red-900/96 via-orange-950/94 to-black/96 dragon-fs-shake"
    }`;

    const card = document.getElementById("dragonFsCard");
    const badge = document.getElementById("dragonFsBadge");
    const sprite = document.getElementById("dragonFsSprite");
    const weaponFx = document.getElementById("dragonFsWeaponFx");
    const actionNote = document.getElementById("dragonFsActionNote");

    if (card) {
      card.className = `max-w-md w-full rounded-3xl border-4 ${
        isHit ? "border-amber-400 bg-rose-950/90" : "border-red-500 bg-red-950/92"
      } p-5 text-center text-white shadow-2xl relative overflow-hidden transition-colors duration-300`;
    }
    if (badge) {
      badge.className = `inline-block px-4 py-1.5 rounded-full font-extrabold text-xs uppercase tracking-wider mb-3 ${
        isHit ? "bg-emerald-500 text-slate-950" : "bg-red-600 text-white animate-pulse"
      }`;
      badge.textContent = isHit
        ? `⚔️ TRAFIENIE! ${heroName} UDERZA W SMOKA!`
        : `🔥 SMOK ZIONIE OGNIEM NA DRUŻYNĘ!`;
    }
    if (sprite) {
      sprite.className = `text-[126px] leading-none select-none ${
        isHit ? "dragon-fs-zoom-hit" : "dragon-fs-lunge-fire"
      }`;
    }
    if (weaponFx) {
      weaponFx.innerHTML = `<span class="text-7xl dragon-weapon-slow">${isHit ? "⚔️💥" : "🔥🔥🔥"}</span>`;
    }
    if (actionNote) {
      actionNote.className = `text-xs font-extrabold ${isHit ? "text-emerald-300" : "text-rose-300"}`;
      actionNote.textContent = isHit ? "-1 HP Smoka!" : "-1 ❤️ Drużyny!";
    }
  }, 1450);

  // Aktualizacja paska HP / serduszek w trakcie ciosu (2.05s)
  window._dragonHpAnimTimer = setTimeout(() => {
    const bar = document.getElementById("dragonFsHpBar");
    const hpTxt = document.getElementById("dragonFsHpText");
    const heartsEl = document.getElementById("dragonFsHearts");
    if (bar) bar.style.width = `${endDragonPct}%`;
    if (hpTxt) hpTxt.textContent = `${db.dragonHp} / ${db.maxDragonHp} HP`;
    if (heartsEl) heartsEl.textContent = endHearts;
  }, 2050);

  // Zamknięcie ekranu walki po 4.6s
  window._dragonFsTimer = setTimeout(() => {
    hideDragonFullscreenClash();
  }, 4600);
}

function triggerDragonBattleAnimation(type) {
  window._dragonAnimUntil = Date.now() + 4550;
  const hud = document.getElementById("dragonBattleHudBox");
  const icon = document.getElementById("dragonBossIcon");
  const fx = document.getElementById("dragonBattleFxOverlay");
  if (hud) {
    hud.classList.remove("dragon-hit-anim", "dragon-fire-anim");
    if (icon) icon.classList.remove("dragon-hit-anim");
    void hud.offsetWidth;

    if (type === "hit") {
      hud.classList.add("dragon-hit-anim");
      if (icon) icon.classList.add("dragon-hit-anim");
      if (fx) {
        fx.innerHTML = `<span class="text-5xl sword-slash-fx inline-block">⚔️💥</span>`;
        setTimeout(() => { if (fx) fx.innerHTML = ""; }, 1800);
      }
    } else if (type === "fire") {
      hud.classList.add("dragon-fire-anim");
      if (fx) {
        fx.innerHTML = `<span class="text-5xl sword-slash-fx inline-block">🔥🐉💥</span>`;
        setTimeout(() => { if (fx) fx.innerHTML = ""; }, 1800);
      }
    }
  }
  showDragonFullscreenClash(type);
}

function renderTopGameBar(lesson) {
  const totalQ = state.roundQuestions.length;
  let subModesHtml = "";

  if (!state.isExamMode && !state.isHardWordsMode && !state.isCoopDragonMode && lesson && state.profile !== "duel") {
    const micBtn = `<button onclick="startLesson('${lesson.id}','mic_game')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'mic_game' ? 'bg-rose-600 text-white' : 'bg-white text-slate-700'}">🎤 Wymowa</button>`;
    const flashBtn = `<button onclick="startFlashcards('${lesson.id}')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 bg-indigo-50 text-indigo-800 border-indigo-300">🃏 Fiszki</button>`;
    const lettersBtn = (lesson.type !== "prepositions" && lesson.type !== "mic_only")
      ? `<button id="subModeBtn_letters_game" onclick="startLesson('${lesson.id}','letters_game')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'letters_game' ? 'bg-purple-600 text-white border-purple-700' : 'bg-purple-50 text-purple-900 border-purple-300'}">🧩 Literki</button>`
      : "";

    if (lesson.type === "prepositions") {
      subModesHtml = `<button onclick="startPrepositionExplain(state.lessons.find(l=>l.id==='prepositions'))" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 bg-amber-100 border-amber-400 text-amber-900">🦉 Wyjaśnienie</button>` +
                     `<button onclick="startLesson('prepositions','prep_choose_word')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'prep_choose_word' ? 'bg-sky-500 text-white border-sky-600' : 'bg-white text-slate-700'}">🤔 Słówka</button>` +
                     `<button onclick="startLesson('prepositions','prep_choose_pic')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'prep_choose_pic' ? 'bg-sky-500 text-white border-sky-600' : 'bg-white text-slate-700'}">🖼️ Obrazki</button>` + flashBtn + micBtn;
    } else if (lesson.type === "vocab_and_shop") {
      subModesHtml = flashBtn +
                     `<button onclick="startLesson('${lesson.id}','listen_pick')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'listen_pick' ? 'bg-sky-500 text-white border-sky-600' : 'bg-white text-slate-700'}">👂 Quiz</button>` +
                     `<button id="subModeBtn_shop_cart_game" onclick="startLesson('${lesson.id}','shop_cart_game')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'shop_cart_game' ? 'bg-amber-500 text-white border-amber-600' : 'bg-amber-50 text-amber-900 border-amber-300'}">🛒 Koszyk</button>` +
                     `<button onclick="startLesson('${lesson.id}','shop_phrases_game')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'shop_phrases_game' ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-emerald-50 text-emerald-900 border-emerald-300'}">👋 Zwroty</button>` + lettersBtn + micBtn;
    } else if (lesson.id === "body_hurts") {
      subModesHtml = flashBtn +
                     `<button onclick="startLesson('${lesson.id}','listen_pick')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'listen_pick' ? 'bg-sky-500 text-white border-sky-600' : 'bg-white text-slate-700'}">👂 Quiz</button>` +
                     `<button id="subModeBtn_doctor_game" onclick="startLesson('${lesson.id}','doctor_game')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'doctor_game' ? 'bg-rose-500 text-white border-rose-600' : 'bg-rose-50 text-rose-900 border-rose-300'}">🩺 Mały Lekarz</button>` + lettersBtn + micBtn;
    } else if (lesson.id === "jungle_animals") {
      subModesHtml = flashBtn +
                     `<button onclick="startLesson('${lesson.id}','listen_pick')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'listen_pick' ? 'bg-sky-500 text-white border-sky-600' : 'bg-white text-slate-700'}">👂 Quiz</button>` +
                     `<button id="subModeBtn_riddles_game" onclick="startLesson('${lesson.id}','riddles_game')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'riddles_game' ? 'bg-amber-500 text-white border-amber-600' : 'bg-amber-50 text-amber-900 border-amber-300'}">🕵️‍♂️ Zagadki Sówki</button>` + lettersBtn + micBtn;
    } else if (lesson.id === "colors") {
      subModesHtml = flashBtn +
                     `<button onclick="startLesson('${lesson.id}','listen_pick')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'listen_pick' ? 'bg-sky-500 text-white border-sky-600' : 'bg-white text-slate-700'}">👂 Kolory</button>` +
                     `<button id="subModeBtn_color_mix_game" onclick="startLesson('${lesson.id}','color_mix_game')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'color_mix_game' ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-indigo-50 text-indigo-900 border-indigo-300'}">🎨 Kolorowe Przedmioty</button>` + lettersBtn + micBtn;
    } else {
      subModesHtml = flashBtn + `<button onclick="startLesson('${lesson.id}','listen_pick')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'listen_pick' ? 'bg-sky-500 text-white border-sky-600' : 'bg-white text-slate-700'}">👂 Quiz</button>` + lettersBtn + micBtn;
    }
  }

  let dragonHud = "";
  if (state.isCoopDragonMode) {
    const db = state.dragonBattle;
    const hearts = "❤️".repeat(Math.max(0, db.teamHp)) + "🖤".repeat(Math.max(0, db.maxTeamHp - db.teamHp));
    const dragonPct = Math.max(0, Math.round((db.dragonHp / db.maxDragonHp) * 100));
    const dailySt = getDailySpecialChestStatus("dragon");
    dragonHud = `
      <div id="dragonBattleHudBox" class="relative mb-3 p-3 rounded-3xl bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white border-4 border-amber-400 shadow-xl overflow-hidden">
        <div id="dragonBattleFxOverlay" class="pointer-events-none absolute inset-0 flex items-center justify-center z-30"></div>
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div class="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-2xl">
            <span class="text-xl">👦🧑🛡️</span>
            <div>
              <div class="text-[10px] font-bold text-amber-300 uppercase">Życie Braci</div>
              <div class="text-sm tracking-widest">${hearts}</div>
            </div>
          </div>
          <div class="flex flex-col items-center gap-1">
            <div class="px-3 py-1 rounded-xl font-extrabold text-xs ${state.duelTurn === 'igor' ? 'bg-amber-500 text-slate-950' : 'bg-sky-500 text-white'}">
              Teraz walczy: ${state.duelTurn === 'igor' ? '👦 IGOR' : '🧑 HUBERT'}
            </div>
            <span class="text-[10px] font-bold text-amber-200">Skrzynie dziś: ${dailySt.remaining}/${dailySt.limit}</span>
          </div>
          <div class="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-2xl">
            <div class="text-right">
              <div class="text-[10px] font-bold text-rose-300 uppercase">Groźny Smok (${db.dragonHp}/${db.maxDragonHp} HP)</div>
              <div class="w-28 sm:w-32 h-3 bg-slate-700 rounded-full overflow-hidden border border-rose-400 mt-0.5">
                <div class="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-500" style="width:${dragonPct}%"></div>
              </div>
            </div>
            <span id="dragonBossIcon" class="text-4xl float-anim inline-block">🐉🔥</span>
          </div>
        </div>
        <div class="text-center text-xs font-extrabold text-amber-200 bg-black/30 py-1.5 px-3 rounded-xl">${db.statusText}</div>
      </div>
    `;
  }

  let dotsHtml = "";
  const maxDots = state.isCoopDragonMode ? 12 : totalQ;
  for (let i = 0; i < Math.min(totalQ, maxDots); i++) {
    let badgeTxt = `${i + 1}`; let bg = "bg-slate-200 text-slate-600 border-slate-300";
    if (i < state.roundIndex) {
      if (state.roundResults[i] === "correct") { bg = "bg-emerald-500 text-white border-emerald-600"; badgeTxt = "✓"; }
      else { bg = "bg-amber-500 text-white border-amber-600"; badgeTxt = "✗"; }
    } else if (i === state.roundIndex) {
      bg = "bg-amber-400 text-amber-950 border-amber-600 ring-2 ring-amber-600 animate-pulse font-extrabold";
    }
    dotsHtml += `<div class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${bg}">${badgeTxt}</div>`;
  }

  const tataSwitchBar = state.profile === "tata"
    ? `<button onclick="toggleTataPreviewAge()" class="px-2.5 py-1 rounded-xl font-extrabold text-xs border-2 ${state.tataPreviewAsIgor ? 'bg-amber-400 text-amber-950 border-amber-600' : 'bg-sky-600 text-white border-sky-800'}">${state.tataPreviewAsIgor ? '👦 Widok: IGOR (4 l.) 🔄' : '🧑 Widok: HUBERT (6 l.) 🔄'}</button>`
    : "";

  const duelDaily = getDailySpecialChestStatus("duel");
  const duelBar = (state.profile === "duel" && !state.isCoopDragonMode) ? `<div class="mb-2 p-2.5 rounded-2xl bg-gradient-to-r from-amber-100 via-purple-100 to-sky-100 border-2 border-purple-400 flex flex-wrap justify-between items-center gap-1 font-extrabold text-[10px] md:text-xs"><div>👦 IGOR: ${state.duelScores.igor} pkt ⚡ VS ⚡ 🧑 HUBERT: ${state.duelScores.hubert} pkt</div><div class="px-2 py-0.5 rounded-lg bg-white/80 text-purple-900">🎁 Skrzynie dziś: ${duelDaily.remaining}/${duelDaily.limit}</div><div class="px-3 py-1 rounded-xl ${state.duelTurn === 'igor' ? 'bg-amber-500' : 'bg-sky-600'} text-white">Teraz: ${state.duelTurn === 'igor' ? 'IGOR' : 'HUBERT'}</div></div>` : "";
  const examBar = state.isExamMode ? `<div class="mb-2 p-2 rounded-2xl bg-orange-100 border-2 border-orange-400 text-orange-950 font-extrabold text-center text-xs shadow-sm uppercase">🎓 Wielki Sprawdzian (Pytanie ${state.roundIndex+1}/15)</div>` : "";
  const hardBar = state.isHardWordsMode ? `<div class="mb-2 p-2 rounded-2xl bg-rose-100 border-2 border-rose-400 text-rose-950 font-extrabold text-center text-xs shadow-sm uppercase">🎯 Trening Trudnych Słówek • Za odpowiedź bez błędu: +2 ⭐!</div>` : "";
  return `
    ${dragonHud} ${duelBar} ${examBar} ${hardBar}
    <div class="bg-white/95 rounded-2xl p-3 mb-3 border-2 border-sky-200 flex flex-col gap-2 shadow-sm">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex flex-wrap gap-1.5 items-center">${subModesHtml}${tataSwitchBar}</div>
        <button onclick="advanceNextQuestion(true)" class="px-3 py-1 rounded-xl bg-slate-100 text-xs font-bold hover:bg-slate-200">Pomiń ⏭️</button>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-1.5 pt-2 border-t border-slate-100">
        <span class="text-[10px] font-bold text-slate-500 mr-2 uppercase">Postęp:</span>${dotsHtml}
      </div>
    </div>
  `;
}

function renderCurrentQuestion() {
  cancelAllSpeechAndTimers();
  hideDragonFullscreenClash();
  state.answeredCurrent = false;
  state.currentQuestionMistakes = 0;
  state.riddleHintShown = false;
  state.riddleHintStep = 0;

  if (state.isCoopDragonMode && (state.dragonBattle.dragonHp <= 0 || state.dragonBattle.teamHp <= 0)) {
    return renderEndRoundScreen();
  }
  if (state.roundIndex >= state.roundQuestions.length) return renderEndRoundScreen();

  if ((state.profile === "duel" || state.isCoopDragonMode) && state.duelReadyWaiting) {
    const isIgor = state.duelTurn === "igor";
    const mc = document.getElementById("mainContainer");
    if (!mc) return;
    const modeSub = state.isCoopDragonMode
      ? `🐉 Smok ma jeszcze ${state.dragonBattle.dragonHp} HP • Drużyna ma ${state.dragonBattle.teamHp} ❤️`
      : `Pytanie ${state.roundIndex + 1} z 16 • Masz tylko 1 szansę!`;
    mc.innerHTML = `
      <div class="bg-white rounded-3xl shadow-xl border-4 ${isIgor ? 'border-amber-400 bg-amber-50' : 'border-sky-400 bg-sky-50'} p-6 text-center max-w-xl mx-auto flex flex-col items-center">
        ${renderBoyAvatarSvg(isIgor ? 'igor' : 'hubert', 115)}
        <h2 class="text-3xl font-extrabold mt-3 mb-1 text-slate-900">Teraz kolej: ${isIgor ? 'IGOR' : 'HUBERT'}!</h2>
        <p class="text-sm font-bold text-slate-600 mb-5">${modeSub}</p>
        <button onclick="state.duelReadyWaiting=false;renderCurrentQuestion();" class="w-full py-4 rounded-2xl ${isIgor ? 'bg-amber-500 hover:bg-amber-600' : 'bg-sky-600 hover:bg-sky-700'} text-white font-extrabold text-xl shadow-lg">▶️ Gotowy do akcji!</button>
      </div>
    `;
    speakSequence([{ lang: "pl", text: `Teraz kolej ${isIgor ? 'Igora' : 'Huberta'}!` }]);
    return;
  }

  const q = state.roundQuestions[state.roundIndex];
  const isDragonHubertMic = state.isCoopDragonMode && state.duelTurn === "hubert" && q._dragonMicQuestion;
  const activeMode = isDragonHubertMic
    ? "mic_game"
    : (state.isExamMode && q._examModeType ? q._examModeType : state.currentSubMode);

  const lesson = state.lessons.find(l => l.id === state.currentLessonId) || { id: "mix", type: "vocab", items: state.roundQuestions };

  if (activeMode === "letters_game") {
    const rawTarget = (q.en || "").trim().toUpperCase();
    if (window._letterTargetWord !== rawTarget) {
      window._letterTargetWord = "";
      window._letterRoundIdx = -1;
    }
  }

  if (activeMode === "prep_explain" && typeof startPrepositionExplain === "function") return startPrepositionExplain(lesson);
  if (activeMode === "prep_choose_word" && typeof renderPrepChooseWord === "function") return renderPrepChooseWord(lesson);
  if (activeMode === "prep_choose_pic" && typeof renderPrepChoosePic === "function") return renderPrepChoosePic(lesson);
  if (activeMode === "mic_game" && typeof renderMicGame === "function") return renderMicGame(lesson);
  if (activeMode === "letters_game" && typeof renderLettersGame === "function") return renderLettersGame(lesson);
  if (activeMode === "shop_cart_game") return renderShopCartGame(lesson);
  if (activeMode === "doctor_game") return renderDoctorGame(lesson);
  if (activeMode === "riddles_game") return renderRiddlesGame(lesson);
  if (activeMode === "color_mix_game") return renderColorMixGame(lesson);
  
  renderUniversalVisualQuiz(lesson);
}

function renderColorMixGame(lesson) {
  const q = state.roundQuestions[state.roundIndex];
  const choices = buildColorMixChoicesForQuestion(q);
  window._currentChoices = choices;

  const mc = document.getElementById("mainContainer");
  if (!mc) return;

  mc.innerHTML = `
    ${renderTopGameBar(lesson)}
    <div class="bg-white rounded-3xl shadow-xl border-4 border-indigo-400 p-4 md:p-6 text-center">
      <div class="text-xs font-extrabold text-indigo-700 uppercase mb-1">🎨 Kolorowe Przedmioty (Zwróć uwagę na kolor ORAZ na przedmiot!)</div>
      <div class="flex items-center justify-between bg-indigo-50 p-3 rounded-2xl border-2 border-indigo-200 mb-3 drop-shadow-sm">
        <button onclick="speakSequence([{lang:'en',text:'${q.en.replace(/'/g,"\\'")}'}])" class="kid-card w-12 h-12 rounded-2xl bg-indigo-600 text-white text-2xl shadow flex items-center justify-center">🔊</button>
        <div class="text-xl md:text-3xl font-extrabold text-slate-900 flex-1 px-2 tracking-wide">"${q.en}"</div>
        <span class="px-2.5 py-1.5 rounded-xl bg-white text-xs font-bold border border-indigo-300 text-indigo-900">3 kolory × 2 przedmioty</span>
      </div>
      <div id="feedbackBanner" class="min-h-[34px] font-bold text-base mb-2 flex items-center justify-center"></div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
        ${choices.map((it, idx) => `
          <div id="vCard_${idx}" onclick="checkUniversalAnswer(${idx}, false)" class="kid-card cursor-pointer rounded-3xl border-4 border-slate-200 bg-slate-50 hover:border-indigo-400 p-4 shadow flex flex-col items-center justify-between">
            <div class="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center relative my-1 shadow-inner float-anim" style="background-color: ${it.colorBg}; border: 5px solid ${it.colorBorder};">
              <span class="text-5xl md:text-6xl drop-shadow">${it.objIcon}</span>
              <span class="absolute -top-2 -right-2 text-2xl drop-shadow">${it.colorDot}</span>
            </div>
            <div id="vLabel_${idx}" class="w-full py-2 px-2 mt-2 rounded-xl bg-white border font-bold text-slate-700 text-sm shadow-sm uppercase tracking-wide">Wybierz</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
  speakSequence([{ lang: "pl", text: "Wskaż:" }, { lang: "en", text: q.en }]);
}

// ------------------------------------------------------------------------
// GABINET MAŁEGO LEKARZA: SUWAKI KALIBRACJI STREF
// ------------------------------------------------------------------------
const DEFAULT_DOCTOR_CALIB = {
  Head:    { label: "👦 Głowa / Włosy (Head)",     en: "Head",  pl: "Głowa",  paired: false, top: 7.0,  left: 50.0, w: 30.0, h: 9.0,  z: 30 },
  Eyes:    { label: "👀 Oczy (Eyes)",              en: "Eyes",  pl: "Oczy",   paired: false, top: 18.5, left: 50.0, w: 22.0, h: 4.5,  z: 30 },
  Ears:    { label: "👂 Uszy - Oba (Ears)",        en: "Ears",  pl: "Uszy",   paired: true,  top: 19.5, dx: 14.5,   w: 6.5,  h: 6.0,  z: 35 },
  Nose:    { label: "👃 Nos (Nose)",               en: "Nose",  pl: "Nos",    paired: false, top: 22.5, left: 50.0, w: 7.5,  h: 3.5,  z: 40 },
  Mouth:   { label: "👄 Usta (Mouth)",             en: "Mouth", pl: "Usta",   paired: false, top: 26.5, left: 50.0, w: 12.0, h: 3.8,  z: 35 },
  Neck:    { label: "🧣 Szyja (Neck)",             en: "Neck",  pl: "Szyja",  paired: false, top: 31.0, left: 50.0, w: 12.0, h: 4.0,  z: 35 },
  Tummy:   { label: "👕 Brzuch / Tułów (Tummy)",   en: "Tummy", pl: "Brzuch", paired: false, top: 40.0, left: 50.0, w: 18.0, h: 15.0, z: 30 },
  Arm:     { label: "💪 Ręce - Obie (Arm)",        en: "Arm",   pl: "Ręka",   paired: true,  top: 36.0, dx: 14.5,   w: 8.5,  h: 18.0, z: 30 },
  Hand:    { label: "✋ Dłonie - Obie (Hand)",     en: "Hand",  pl: "Dłoń",   paired: true,  top: 55.0, dx: 16.5,   w: 9.5,  h: 8.0,  z: 35 },
  Leg:     { label: "🦵 Nogi - Obie (Leg)",        en: "Leg",   pl: "Noga",   paired: true,  top: 68.0, dx: 6.2,    w: 10.0, h: 17.5, z: 30 },
  Knee:    { label: "🦵 Kolana - Oba (Knee)",      en: "Knee",  pl: "Kolano", paired: true,  top: 72.5, dx: 6.2,    w: 10.5, h: 6.5,  z: 40 },
  Foot:    { label: "🦶 Stopy - Obie (Foot)",      en: "Foot",  pl: "Stopa",  paired: true,  top: 86.0, dx: 7.5,    w: 12.5, h: 7.0,  z: 35 }
};

window._docCalibOpen = false;
window._docCalibKey = "Head";

function mergeDocCalibWithDefaults(raw) {
  const merged = {};
  Object.keys(DEFAULT_DOCTOR_CALIB).forEach(k => {
    merged[k] = { ...DEFAULT_DOCTOR_CALIB[k], ...((raw && raw[k]) || {}) };
  });
  return merged;
}

function getDoctorCalibration() {
  const fromCloud = (state.stats.tata && state.stats.tata.equipped && state.stats.tata.equipped.doctorCalib) ||
                    (state.stats.igor && state.stats.igor.equipped && state.stats.igor.equipped.doctorCalib) ||
                    (state.stats.hubert && state.stats.hubert.equipped && state.stats.hubert.equipped.doctorCalib);
  if (fromCloud) return mergeDocCalibWithDefaults(fromCloud);
  try {
    const saved = localStorage.getItem("akademia_doc_calib_v1");
    if (saved) return mergeDocCalibWithDefaults(JSON.parse(saved));
  } catch (e) {}
  return mergeDocCalibWithDefaults(null);
}

function saveDoctorCalibration(cal) {
  const merged = mergeDocCalibWithDefaults(cal);
  ["igor", "hubert", "tata"].forEach(k => {
    if (state.stats[k]) {
      if (!state.stats[k].equipped) state.stats[k].equipped = {};
      state.stats[k].equipped.doctorCalib = merged;
    }
  });
  try { localStorage.setItem("akademia_doc_calib_v1", JSON.stringify(merged)); } catch (e) {}
  saveCloudData();
}

function getDoctorZonesForActivePlayer() {
  const isAdvanced = !isEffectiveIgorMode();
  const cal = getDoctorCalibration();
  const keys = isAdvanced
    ? ["Head", "Eyes", "Ears", "Nose", "Mouth", "Neck", "Tummy", "Arm", "Hand", "Leg", "Knee", "Foot"]
    : ["Head", "Eyes", "Ears", "Nose", "Mouth", "Arm", "Leg", "Foot"];

  const zones = [];
  keys.forEach(k => {
    const c = cal[k];
    if (!c) return;
    if (c.paired) {
      zones.push({ id: `${k}_L`, groupKey: k, en: c.en, pl: c.pl, top: c.top, left: +(50 - c.dx).toFixed(1), w: c.w, h: c.h, z: c.z });
      zones.push({ id: `${k}_R`, groupKey: k, en: c.en, pl: c.pl, top: c.top, left: +(50 + c.dx).toFixed(1), w: c.w, h: c.h, z: c.z });
    } else {
      zones.push({ id: k, groupKey: k, en: c.en, pl: c.pl, top: c.top, left: c.left, w: c.w, h: c.h, z: c.z });
    }
  });
  return zones;
}

function renderDoctorZonesInnerHtml() {
  const activeZones = getDoctorZonesForActivePlayer();
  const activeKey = window._docCalibKey || "Head";
  return activeZones.map(z => {
    const isCalibSelected = window._docCalibOpen && z.groupKey === activeKey;
    const borderCls = isCalibSelected
      ? "border-sky-600 bg-sky-300/50 ring-2 ring-sky-500"
      : (z.en === "Knee" ? "border-amber-500/85 hover:bg-rose-300/40" : "border-rose-500/75 hover:bg-rose-300/40");
    return `
      <div id="docZone_${z.id}" data-en="${z.en}" data-pl="${z.pl}" onclick="applyBandAidToZone('${z.id}')"
           ondragover="event.preventDefault(); this.classList.add('ring-2','ring-rose-500','bg-rose-300/50');"
           ondragleave="this.classList.remove('ring-2','ring-rose-500','bg-rose-300/50');"
           ondrop="event.preventDefault(); this.classList.remove('ring-2','ring-rose-500','bg-rose-300/50'); applyBandAidToZone('${z.id}');"
           class="doc-drop-zone absolute -translate-x-1/2 cursor-pointer rounded-lg border-2 border-dashed ${borderCls} transition-colors flex items-center justify-center"
           style="top:${z.top}%; left:${z.left}%; width:${z.w}%; height:${z.h}%; z-index:${isCalibSelected ? 45 : (z.z || 30)};" title="${z.pl}">
        ${isCalibSelected ? `<span class="text-[9px] font-extrabold bg-sky-700 text-white px-1 rounded shadow pointer-events-none">${z.pl}</span>` : ""}
      </div>
    `;
  }).join("");
}

function renderDoctorCalibSlidersHtml() {
  if (!window._docCalibOpen) return "";
  const cal = getDoctorCalibration();
  const activeKey = window._docCalibKey || "Head";
  const cfg = cal[activeKey] || cal.Head;
  return `
    <div class="w-full max-w-md mx-auto mt-3 p-3 bg-indigo-50/90 rounded-2xl border-2 border-indigo-300 text-left text-xs space-y-2 shadow-sm">
      <div class="font-extrabold text-indigo-950">🔧 Wybierz część ciała do dopasowania:</div>
      <select onchange="window._docCalibKey=this.value; refreshDoctorZonesAndSliders();" class="w-full p-1.5 rounded-xl border border-indigo-300 font-bold text-xs bg-white">
        ${Object.keys(cal).map(k => `<option value="${k}" ${k === activeKey ? "selected" : ""}>${cal[k].label}</option>`).join("")}
      </select>
      <div><div class="flex justify-between font-bold"><span>⬆️⬇️ Pozycja Góra/Dół (top):</span><span id="lblDocTop">${cfg.top}%</span></div><input type="range" min="0" max="94" step="0.5" value="${cfg.top}" oninput="changeDocCalibVal('${activeKey}','top',this.value)" class="w-full accent-indigo-600" /></div>
      ${cfg.paired ? `<div><div class="flex justify-between font-bold"><span>↔️ Rozstaw na boki od środka (dx):</span><span id="lblDocPos">${cfg.dx}%</span></div><input type="range" min="2" max="35" step="0.5" value="${cfg.dx}" oninput="changeDocCalibVal('${activeKey}','dx',this.value)" class="w-full accent-indigo-600" /></div>` : `<div><div class="flex justify-between font-bold"><span>⬅️➡️ Pozycja Lewo/Prawo (left):</span><span id="lblDocPos">${cfg.left}%</span></div><input type="range" min="20" max="80" step="0.5" value="${cfg.left}" oninput="changeDocCalibVal('${activeKey}','left',this.value)" class="w-full accent-indigo-600" /></div>`}
      <div><div class="flex justify-between font-bold"><span>↔️ Szerokość ramki (w):</span><span id="lblDocW">${cfg.w}%</span></div><input type="range" min="3" max="45" step="0.5" value="${cfg.w}" oninput="changeDocCalibVal('${activeKey}','w',this.value)" class="w-full accent-indigo-600" /></div>
      <div><div class="flex justify-between font-bold"><span>↕️ Wysokość ramki (h):</span><span id="lblDocH">${cfg.h}%</span></div><input type="range" min="2" max="35" step="0.5" value="${cfg.h}" oninput="changeDocCalibVal('${activeKey}','h',this.value)" class="w-full accent-indigo-600" /></div>
      <div class="pt-1 flex justify-between items-center"><button onclick="resetDocCalibDefaults()" class="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-lg text-[10px]">Resetuj domyślne</button><span class="text-[10px] text-emerald-700 font-extrabold">✓ Zapisano w chmurze (Laptop = Telefon)</span></div>
    </div>
  `;
}

function toggleDocCalibPanel() { window._docCalibOpen = !window._docCalibOpen; refreshDoctorZonesAndSliders(); }
function refreshDoctorZonesAndSliders() {
  const zCont = document.getElementById("doctorZonesLayer"); if (zCont) zCont.innerHTML = renderDoctorZonesInnerHtml();
  const sCont = document.getElementById("doctorCalibSlidersBox"); if (sCont) sCont.innerHTML = renderDoctorCalibSlidersHtml();
}
function changeDocCalibVal(partKey, prop, val) {
  const cal = getDoctorCalibration(); if (!cal[partKey]) return;
  cal[partKey][prop] = parseFloat(val); saveDoctorCalibration(cal);
  const zCont = document.getElementById("doctorZonesLayer"); if (zCont) zCont.innerHTML = renderDoctorZonesInnerHtml();
  if (prop === "top") { const el = document.getElementById("lblDocTop"); if (el) el.textContent = val + "%"; }
  if (prop === "dx" || prop === "left") { const el = document.getElementById("lblDocPos"); if (el) el.textContent = val + "%"; }
  if (prop === "w") { const el = document.getElementById("lblDocW"); if (el) el.textContent = val + "%"; }
  if (prop === "h") { const el = document.getElementById("lblDocH"); if (el) el.textContent = val + "%"; }
}
function resetDocCalibDefaults() {
  if (!confirm("Czy na pewno przywrócić domyślne pozycje ramek części ciała?")) return;
  localStorage.removeItem("akademia_doc_calib_v1"); saveDoctorCalibration(DEFAULT_DOCTOR_CALIB); refreshDoctorZonesAndSliders();
}

function renderDoctorGame(lesson) {
  const q = state.roundQuestions[state.roundIndex];
  const phrase = q.hurtPhrase || `Ouch! My ${q.en.toLowerCase()} hurts!`;
  const isAdvanced = !isEffectiveIgorMode();
  const mc = document.getElementById("mainContainer");
  if (!mc) return;

  mc.innerHTML = `
    ${renderTopGameBar(lesson)}
    <div class="bg-white rounded-3xl shadow-xl border-4 border-rose-400 p-4 md:p-6 text-center max-w-4xl mx-auto w-full">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
        <span class="text-xs font-extrabold text-rose-700 uppercase">🩺 Gabinet Małego Lekarza</span>
        <span class="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 font-bold text-xs border border-rose-300">${isAdvanced ? '🧑 Tryb Huberta: 12 części ciała' : '👦 Tryb Igora: 8 części ciała'}</span>
      </div>
      <div class="flex items-center justify-between bg-rose-50 p-3 rounded-2xl border-2 border-rose-200 mb-2">
        <button onclick="speakSequence([{lang:'en',text:'${phrase.replace(/'/g,"\\'")}'}])" class="kid-card w-12 h-12 rounded-2xl bg-rose-500 text-white text-2xl shadow flex items-center justify-center">🔊</button>
        <div class="flex-1 px-2">
          <div class="text-lg md:text-2xl font-extrabold text-rose-950">Pacjent mówi: "${phrase}"</div>
          <div class="text-xs font-bold text-slate-600">Przeciągnij plasterek 🩹 na właściwą część ciała na postaci (lub kliknij w nią palcem)!</div>
        </div>
      </div>
      <div id="feedbackBanner" class="min-h-[32px] font-bold text-sm md:text-base mb-2 flex items-center justify-center"></div>
      <div class="flex flex-col md:flex-row items-center justify-center gap-6 my-1">
        <div id="doctorPatientBox" class="relative select-none bg-gradient-to-b from-sky-50 to-rose-50 rounded-3xl border-4 border-rose-300 shadow-inner overflow-hidden shrink-0" style="width: 280px; height: 340px; min-width: 280px; min-height: 340px;">
          <img src="grafiki/boy_base.png" class="absolute inset-0 w-full h-full object-fill pointer-events-none z-10" />
          <div id="doctorZonesLayer" class="absolute inset-0 w-full h-full z-20">${renderDoctorZonesInnerHtml()}</div>
        </div>
        <div class="flex flex-col items-center justify-center">
          <div class="flex flex-col items-center justify-center p-5 rounded-3xl bg-rose-50 border-3 border-rose-300 shadow-md w-52">
            <div class="text-xs font-extrabold text-rose-900 uppercase mb-2">🧰 Apteczka Lekarza</div>
            <div id="draggableBandAid" draggable="true" ondragstart="if(event.dataTransfer) event.dataTransfer.setData('text/plain','bandaid');" ontouchstart="startBandAidTouch(event)" ontouchmove="moveBandAidTouch(event)" ontouchend="endBandAidTouch(event)" class="cursor-grab active:cursor-grabbing w-28 h-28 rounded-3xl bg-white border-4 border-rose-400 shadow-lg flex flex-col items-center justify-center hover:scale-110 transition-transform select-none" style="touch-action: none;">
              <span class="text-6xl">🩹</span>
              <span class="text-[11px] font-extrabold text-rose-800 mt-1">Chwyć plaster!</span>
            </div>
            <p class="text-[11px] font-bold text-slate-600 mt-3 leading-snug">Przeciągnij plasterek na bolącą część ciała lub dotknij jej bezpośrednio na chłopcu!</p>
          </div>
          <button onclick="toggleDocCalibPanel()" class="mt-3 px-3 py-1.5 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold text-xs border border-indigo-300">🔧 Dopasuj ramki części ciała (Suwaki)</button>
        </div>
      </div>
      <div id="doctorCalibSlidersBox">${renderDoctorCalibSlidersHtml()}</div>
    </div>
  `;
  speakSequence([{ lang: "pl", text: "Przyklej plasterek! Pacjent mówi:" }, { lang: "en", text: phrase }]);
}

function startBandAidTouch(e) {
  if (state.answeredCurrent) return;
  const touch = e.touches[0];
  let ghost = document.getElementById("bandAidTouchGhost");
  if (!ghost) {
    ghost = document.createElement("div"); ghost.id = "bandAidTouchGhost";
    ghost.className = "fixed pointer-events-none z-50 text-5xl drop-shadow-2xl -translate-x-1/2 -translate-y-1/2";
    ghost.textContent = "🩹"; document.body.appendChild(ghost);
  }
  ghost.style.left = touch.clientX + "px"; ghost.style.top = touch.clientY + "px"; ghost.classList.remove("hidden");
}
function moveBandAidTouch(e) {
  const ghost = document.getElementById("bandAidTouchGhost");
  if (!ghost || ghost.classList.contains("hidden")) return;
  e.preventDefault(); const touch = e.touches[0];
  ghost.style.left = touch.clientX + "px"; ghost.style.top = touch.clientY + "px";
}
function endBandAidTouch(e) {
  const ghost = document.getElementById("bandAidTouchGhost"); if (ghost) ghost.classList.add("hidden");
  if (state.answeredCurrent || !e.changedTouches || !e.changedTouches.length) return;
  const touch = e.changedTouches[0]; const el = document.elementFromPoint(touch.clientX, touch.clientY);
  if (!el) return; const zoneEl = el.closest(".doc-drop-zone");
  if (zoneEl && zoneEl.id) applyBandAidToZone(zoneEl.id.replace("docZone_", ""));
}

function applyBandAidToZone(zoneId) {
  if (state.answeredCurrent) return;
  const q = state.roundQuestions[state.roundIndex];
  const zone = getDoctorZonesForActivePlayer().find(z => z.id === zoneId);
  if (!zone) return;
  const zoneEl = document.getElementById(`docZone_${zoneId}`), patientBox = document.getElementById("doctorPatientBox"), fb = document.getElementById("feedbackBanner");

  const isMatch = zone.en.toLowerCase() === q.en.toLowerCase() || (q.en.toLowerCase() === "leg" && zone.en.toLowerCase() === "knee");
  if (isMatch) {
    state.answeredCurrent = true; playEffect("success");
    if (zoneEl) { zoneEl.className = "absolute -translate-x-1/2 flex items-center justify-center z-50 pop-correct"; zoneEl.innerHTML = `<span class="text-3xl drop-shadow-lg">🩹</span>`; }
    const dragBtn = document.getElementById("draggableBandAid");
    if (dragBtn) dragBtn.innerHTML = `<span class="text-4xl">✅</span><span class="text-[10px] font-extrabold text-emerald-700">Przyklejony!</span>`;
    if (fb) fb.innerHTML = `<span class="text-emerald-600 font-extrabold">🩹🌟 Brawo! Plasterek przyklejony na: ${q.pl} (${q.en})! Pacjent wyleczony!</span>`;
    awardCorrectAnswer();
    speakSequence([{ lang: "en", text: q.en }, { lang: "pl", text: `Super! Plasterek przyklejony! To jest ${q.pl}!` }], () => advanceNextQuestion());
  } else {
    state.roundMistakes++; state.currentQuestionMistakes++; playEffect("wrong");
    if (patientBox) { patientBox.classList.add("shake-wrong"); setTimeout(() => patientBox.classList.remove("shake-wrong"), 550); }
    recordHardWordForActivePlayer(q);
    if (fb) fb.innerHTML = `<span class="text-rose-600">❌ To jest ${zone.pl} (${zone.en})! Posłuchaj pacjenta i przyklej plaster w dobre miejsce!</span>`;
    speakSequence([{ lang: "pl", text: `Oj nie! To jest ${zone.pl}. Pacjent prosi o plaster na:` }, { lang: "en", text: q.en }]);
  }
}

function handleRiddleHintClick() {
  const q = state.roundQuestions[state.roundIndex]; if (!q) return;
  const firstLetter = (q.en || "?")[0].toUpperCase();
  const hintBox = document.getElementById("riddleHintBox"), hintBtn = document.getElementById("riddleHintBtn");
  if (!state.riddleHintStep || state.riddleHintStep === 0) {
    state.riddleHintStep = 1;
    if (hintBox) { hintBox.classList.remove("hidden"); hintBox.innerHTML = `💡 Podpowiedź 1: Szukane słowo po angielsku zaczyna się na literę <strong>"${firstLetter}"</strong>!`; }
    if (hintBtn) hintBtn.innerHTML = `💡 Druga podpowiedź (po polsku)`;
    speakSequence([{ lang: "pl", text: `Podpowiedź! Szukane słowo zaczyna się na literę: ${firstLetter}!` }]);
  } else {
    state.riddleHintStep = 2;
    if (hintBox) { hintBox.classList.remove("hidden"); hintBox.innerHTML = `💡 Litera: <strong>"${firstLetter}"</strong> &nbsp;•&nbsp; Podpowiedź po polsku: <strong>"${q.cluePl || ''}"</strong>`; }
    speakSequence([{ lang: "pl", text: `Druga podpowiedź po polsku: ${q.cluePl || ''}` }]);
  }
}

function renderRiddlesGame(lesson) {
  const q = state.roundQuestions[state.roundIndex];
  const pool = typeof RIDDLES_POOL !== "undefined" ? RIDDLES_POOL : lesson.items;
  const choices = shuffleArray([q, ...shuffleArray(pool.filter(it => it.en !== q.en)).slice(0, 2)]);
  window._currentChoices = choices; state.riddleHintStep = 0;

  const mc = document.getElementById("mainContainer"); if (!mc) return;
  mc.innerHTML = `
    ${renderTopGameBar(lesson)}
    <div class="bg-white rounded-3xl shadow-xl border-4 border-amber-400 p-4 md:p-6 text-center">
      <div class="text-xs font-extrabold text-amber-800 uppercase mb-1">🕵️‍♂️ Zagadka Detektywa Sówki (Listen in English!)</div>
      <div class="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 mb-3">
        <div class="text-xl md:text-2xl font-extrabold text-slate-900 mb-2">🦉 "${q.clueEn}"</div>
        <div class="mt-2 flex flex-wrap justify-center gap-2">
          <button onclick="speakSequence([{lang:'en',text:'${q.clueEn.replace(/'/g,"\\'")}'}])" class="kid-card px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow">🔊 Posłuchaj po angielsku</button>
          <button id="riddleHintBtn" onclick="handleRiddleHintClick()" class="kid-card px-4 py-1.5 rounded-xl bg-white border-2 border-amber-400 text-amber-900 font-bold text-xs">💡 Podpowiedź (1. Litera / 2. Opis PL)</button>
        </div>
        <div id="riddleHintBox" class="hidden mt-2.5 text-xs font-extrabold text-emerald-800 bg-emerald-100 py-1.5 px-3 rounded-xl inline-block border border-emerald-300"></div>
      </div>
      <div id="feedbackBanner" class="min-h-[34px] font-bold text-base mb-2 flex items-center justify-center"></div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        ${choices.map((it, idx) => `<div id="vCard_${idx}" onclick="checkUniversalAnswer(${idx}, false)" class="kid-card cursor-pointer rounded-3xl border-4 border-slate-200 bg-slate-50 hover:border-amber-400 p-4 shadow flex flex-col items-center justify-between"><div class="text-6xl md:text-7xl my-2 float-anim">${it.icon || '🐾'}</div><div id="vLabel_${idx}" class="w-full py-2 px-2 rounded-xl bg-white border font-bold text-slate-700 text-sm shadow-sm uppercase">To ja!</div></div>`).join("")}
      </div>
    </div>
  `;
  speakSequence([{ lang: "en", text: q.clueEn }]);
}

function renderShopCartGame(lesson) {
  const q = state.roundQuestions[state.roundIndex];
  const products = getVisibleLessonItems(lesson.items, true, lesson.id).filter(i => i.isProduct);
  const choices = shuffleArray([q, ...shuffleArray(products.filter(it => it.en !== q.en)).slice(0, 2)]);
  window._currentChoices = choices;
  const cartIcons = (state.shopCart && state.shopCart.length > 0) ? state.shopCart.map(ic => `<span class="text-2xl pop-correct">${ic}</span>`).join(" ") : `<span class="text-xs text-amber-700">Koszyk jest jeszcze pusty...</span>`;
  const mc = document.getElementById("mainContainer"); if (!mc) return;
  mc.innerHTML = `
    ${renderTopGameBar(lesson)}
    <div class="bg-white rounded-3xl shadow-xl border-4 border-amber-400 p-4 md:p-6 text-center">
      <div class="flex flex-wrap items-center justify-between bg-amber-50 p-3 rounded-2xl border-2 border-amber-200 mb-3 gap-2">
        <div class="flex items-center gap-2 font-extrabold text-amber-950 text-sm"><span class="text-2xl">🛒</span> Twój koszyk (${(state.shopCart || []).length}):</div>
        <div class="flex flex-wrap items-center gap-1.5 bg-white px-3 py-1 rounded-xl border border-amber-300 min-h-[36px]">${cartIcons}</div>
      </div>
      <div class="flex items-center justify-between bg-sky-50 p-3 rounded-2xl border border-sky-200 mb-3">
        <button onclick="speakSequence([{lang:'en',text:'Please give me ${q.en.replace(/'/g,"\\'")}'}])" class="kid-card w-12 h-12 rounded-2xl bg-amber-500 text-white text-2xl shadow flex items-center justify-center">🔊</button>
        <div class="text-lg md:text-2xl font-extrabold text-slate-900 flex-1 px-2">Włóż do koszyka: <span class="text-amber-700">"${q.en}"</span></div>
      </div>
      <div id="feedbackBanner" class="min-h-[34px] font-bold text-base mb-2 flex items-center justify-center"></div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        ${choices.map((it, idx) => `<div id="vCard_${idx}" onclick="checkUniversalAnswer(${idx}, true)" class="kid-card cursor-pointer rounded-3xl border-4 border-amber-200 bg-amber-50/40 hover:border-amber-500 p-4 shadow flex flex-col items-center justify-between"><div class="text-6xl md:text-7xl my-2 float-anim drop-shadow-sm">${it.icon || '🥐'}</div><div id="vLabel_${idx}" class="w-full py-2 px-2 rounded-xl bg-white border border-amber-300 font-bold text-amber-950 text-sm shadow-sm uppercase">🛒 Do koszyka</div></div>`).join("")}
      </div>
    </div>
  `;
  speakSequence([{ lang: "pl", text: "Włóż do koszyka:" }, { lang: "en", text: q.en }]);
}

function renderUniversalVisualQuiz(lesson) {
  const q = state.roundQuestions[state.roundIndex];
  const isIgorTurn = isEffectiveIgorMode();
  const numChoices = !isIgorTurn ? 6 : (state.isCoopDragonMode ? 4 : 3);
  const gridColsClass = numChoices === 4 ? "grid-cols-2 sm:grid-cols-2 max-w-2xl mx-auto" : "grid-cols-2 sm:grid-cols-3";

  let allPool = [];
  state.lessons.filter(l => !l.testOnly || state.profile === "tata").forEach(l => {
    if (l.type !== "prepositions" && l.type !== "mic_only" && l.type !== "memory_game") getVisibleLessonItems(l.items, true, l.id).forEach(it => allPool.push(it));
  });
  const visLessonItems = getVisibleLessonItems(lesson.items, true, lesson.id);
  let src = visLessonItems.length >= numChoices ? visLessonItems : allPool;
  const choices = shuffleArray([q, ...shuffleArray(src.filter(it => it.en !== q.en)).slice(0, numChoices - 1)]);
  window._currentChoices = choices;
  const mc = document.getElementById("mainContainer"); if (!mc) return;
  mc.innerHTML = `
    ${renderTopGameBar(lesson)}
    <div class="bg-white rounded-3xl shadow-xl border-4 border-sky-300 p-4 md:p-6 text-center">
      <div class="flex items-center justify-between bg-sky-50 p-3 rounded-2xl border border-sky-200 mb-3 drop-shadow-sm">
        <button onclick="speakSequence([{lang:'en',text:'${q.en.replace(/'/g,"\\'")}'}])" class="kid-card w-12 h-12 rounded-2xl bg-sky-500 text-white text-2xl shadow flex items-center justify-center">🔊</button>
        <div class="text-xl md:text-3xl font-extrabold text-slate-900 flex-1 px-2 tracking-wide">"${q.en}" ${q.phonetic ? '[' + q.phonetic + ']' : ''}</div>
        <span class="px-2.5 py-1.5 rounded-xl bg-white text-xs font-bold border border-sky-300 text-slate-600">${!isIgorTurn ? '🧑 6 opcji' : `👦 ${numChoices} opcje`}</span>
      </div>
      <div id="feedbackBanner" class="min-h-[34px] font-bold text-base mb-2 flex items-center justify-center"></div>
      <div class="grid ${gridColsClass} gap-3.5">
        ${choices.map((it, idx) => `<div id="vCard_${idx}" onclick="checkUniversalAnswer(${idx}, false)" class="kid-card cursor-pointer rounded-3xl border-4 border-slate-200 bg-slate-50 hover:border-sky-400 p-4 shadow flex flex-col items-center justify-between"><div class="text-6xl md:text-7xl my-2 float-anim drop-shadow-sm flex justify-center">${it.icon || '⭐'}</div><div id="vLabel_${idx}" class="w-full py-2 px-2 mt-2 rounded-xl bg-white border font-bold text-slate-700 text-sm shadow-sm uppercase tracking-wide">Wybierz</div></div>`).join("")}
      </div>
    </div>
  `;
  speakSequence([{ lang: "pl", text: "Wskaż:" }, { lang: "en", text: q.en }]);
}

function checkUniversalAnswer(idx, isShopCart = false) {
  if (state.answeredCurrent) return;
  const q = state.roundQuestions[state.roundIndex], chosen = window._currentChoices[idx];
  const card = document.getElementById(`vCard_${idx}`), lbl = document.getElementById(`vLabel_${idx}`), fb = document.getElementById("feedbackBanner");

  if (chosen.en === q.en) {
    state.answeredCurrent = true; playEffect("success"); card.classList.add("pop-correct");
    if (isShopCart) { if (!Array.isArray(state.shopCart)) state.shopCart = []; state.shopCart.push(chosen.icon || "🥐"); }
    lbl.textContent = `✅ ${chosen.pl}`;
    if (state.isCoopDragonMode) {
      state.dragonBattle.dragonHp = Math.max(0, state.dragonBattle.dragonHp - 1);
      state.dragonBattle.statusText = `🛡️⚔️ TARCZA I CIOS! Zablokowano ogień Smoka i zadano mu 1 obrażenie! (Smok ma ${state.dragonBattle.dragonHp} HP)`;
      triggerDragonBattleAnimation("hit");
      fb.innerHTML = `<span class="text-emerald-600 font-extrabold">🛡️⚔️ Brawo! Zablokowałeś atak Smoka i trafiłeś go mieczem!</span>`;
      awardCorrectAnswer();
      speakSequence([{ lang: "en", text: q.en }, { lang: "pl", text: "Tarcza zablokowała ogień! Smok traci punkt życia!" }], () => advanceNextQuestion());
    } else {
      fb.innerHTML = `<span class="text-emerald-600 drop-shadow-sm">🌟 Brawo! ${state.isHardWordsMode && state.currentQuestionMistakes === 0 ? 'Opanowano trudne słówko (+2 ⭐)!' : 'O to chodziło!'}</span>`;
      awardCorrectAnswer();
      speakSequence([{ lang: "en", text: q.en }, { lang: "pl", text: `Brawo! To znaczy ${q.pl}!` }], () => advanceNextQuestion());
    }
  } else {
    state.roundMistakes++; state.currentQuestionMistakes++; playEffect("wrong"); card.classList.add("shake-wrong");
    recordHardWordForActivePlayer(q);
    lbl.textContent = `❌ ${chosen.pl}`;
    if (state.isCoopDragonMode) {
      state.answeredCurrent = true;
      state.dragonBattle.teamHp = Math.max(0, state.dragonBattle.teamHp - 1);
      state.dragonBattle.statusText = `🔥💥 ZIONIĘCIE OGNIEM! Smok trafia drużynę! Tracicie 1 serduszko! (Zostało: ${state.dragonBattle.teamHp} ❤️)`;
      triggerDragonBattleAnimation("fire");
      fb.innerHTML = `<span class="text-rose-600 font-extrabold">🔥💥 O nie! Smok zionął ogniem! Szukaliśmy: ${q.en} (${q.pl})</span>`;
      speakSequence([{ lang: "pl", text: "O nie! Smok zionął ogniem! Drużyna traci serduszko!" }], () => advanceNextQuestion());
    } else if (state.profile === "duel") {
      state.answeredCurrent = true;
      fb.innerHTML = `<span class="text-rose-600">❌ Pudło w pojedynku (0 pkt)! Szukaliśmy: ${q.en}</span>`;
      speakSequence([{ lang: "pl", text: "Pudło! Kolej brata!" }], () => advanceNextQuestion());
    } else {
      fb.innerHTML = `<span class="text-rose-600">❌ To jest ${chosen.pl}. Spróbuj jeszcze raz!</span>`;
      speakSequence([{ lang: "pl", text: `Oj nie! To jest ${chosen.pl}. Szukamy:` }, { lang: "en", text: q.en }]);
    }
  }
}

function awardCorrectAnswer() {
  state.roundScore++;
  const q = state.roundQuestions[state.roundIndex];
  const starBonus = (state.isHardWordsMode && state.currentQuestionMistakes === 0) ? 2 : 1;
  if (state.currentQuestionMistakes === 0) { state.roundResults.push("correct"); if (state.isHardWordsMode) removeHardWordIfMastered(q); }
  else state.roundResults.push("wrong");

  if (state.profile === "igor") { state.stats.igor.stars += starBonus; advanceDailyQuestProgress("igor", "stars", starBonus); }
  else if (state.profile === "hubert") { state.stats.hubert.stars += starBonus; advanceDailyQuestProgress("hubert", "stars", starBonus); }
  else if (state.profile === "tata") { state.stats.tata.stars += starBonus; advanceDailyQuestProgress("tata", "stars", starBonus); }
  else if (state.profile === "duel" || state.isCoopDragonMode) {
    if (state.duelTurn === "igor") { state.duelScores.igor++; state.stats.igor.stars++; advanceDailyQuestProgress("igor", "stars", 1); }
    else { state.duelScores.hubert++; state.stats.hubert.stars++; advanceDailyQuestProgress("hubert", "stars", 1); }
  }
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  saveCloudData();
}

function advanceNextQuestion(forceSkip = false) {
  if (!forceSkip && state.isCoopDragonMode && window._dragonAnimUntil && Date.now() < window._dragonAnimUntil) {
    const waitMs = window._dragonAnimUntil - Date.now();
    clearTimeout(window._dragonPendingNextTimer);
    window._dragonPendingNextTimer = setTimeout(() => {
      window._dragonAnimUntil = 0;
      advanceNextQuestion(true);
    }, waitMs);
    return;
  }
  clearTimeout(window._dragonPendingNextTimer);
  window._dragonAnimUntil = 0;

  cancelAllSpeechAndTimers();
  hideDragonFullscreenClash();
  window._letterTargetWord = ""; window._letterRoundIdx = -1;
  if (!state.answeredCurrent) {
    state.roundResults.push("wrong"); state.roundMistakes++;
    if (state.isCoopDragonMode) state.dragonBattle.teamHp = Math.max(0, state.dragonBattle.teamHp - 1);
  }
  if (state.isCoopDragonMode && (state.dragonBattle.dragonHp <= 0 || state.dragonBattle.teamHp <= 0)) return renderEndRoundScreen();
  if (state.profile === "duel" || state.isCoopDragonMode) {
    state.duelTurn = state.duelTurn === "igor" ? "hubert" : "igor";
    state.duelReadyWaiting = true;
  }
  state.roundIndex++;
  renderCurrentQuestion();
}

function playAgainCurrentLesson() {
  const lid = state.lastPlayedLessonId || state.currentLessonId;
  const sub = state.lastPlayedSubMode || state.currentSubMode;
  if (lid === "memory_game" && typeof startMemoryGame === "function") return startMemoryGame();
  if (lid === "grand_exam") return startGrandExam();
  if (lid === "hard_words_training") return startHardWordsTraining();
  if (lid === "duel_all") return startDuelAllWords();
  if (lid === "dragon_coop") return startCoopDragonBattle();
  if (lid) return startLesson(lid, sub);
  showLessonMenu();
}

function startNextSequentialLesson() {
  const visible = state.lessons.filter(l => !l.testOnly || state.profile === "tata");
  const curId = state.lastPlayedLessonId || state.currentLessonId;
  const idx = visible.findIndex(l => l.id === curId);
  const nextLesson = idx >= 0 ? visible[(idx + 1) % visible.length] : visible[0];
  if (nextLesson) return startLesson(nextLesson.id);
  showLessonMenu();
}

function renderEndRoundScreen() {
  cancelAllSpeechAndTimers();
  hideDragonFullscreenClash();
  const finishedLessonId = state.currentLessonId || state.lastPlayedLessonId;
  if (finishedLessonId) state.lastPlayedLessonId = finishedLessonId;

  const profKey = (state.profile === "hubert" || state.profile === "tata") ? state.profile : "igor";
  const p = state.stats[profKey];
  const mc = document.getElementById("mainContainer");
  if (!mc) return;

  if (state.isCoopDragonMode) {
    const dragonDefeated = state.dragonBattle.dragonHp <= 0 && state.dragonBattle.teamHp > 0;
    if (dragonDefeated) {
      playEffect("fanfare");
      state.stats.igor.cups++; state.stats.hubert.cups++;
      const dailyDragon = getDailySpecialChestStatus("dragon");

      if (dailyDragon.canEarn) {
        recordDailySpecialChestAwarded("dragon");
        const updatedDragon = getDailySpecialChestStatus("dragon");
        const chestType = state.dragonBattle.teamHp >= 3 ? "gold" : "silver";
        const chestNamePl = chestType === "gold" ? "Złotą Skrzynię" : "Srebrną Skrzynię";
        const chestBadgeLabel = chestType === "gold" ? "👑 Złota Skrzynia" : "🥈 Srebrna Skrzynia";

        state.rewardQueue.push({ profKey: "igor", achievement: { name: "Pogromca Smoka (Igor)" }, chestType });
        state.rewardQueue.push({ profKey: "hubert", achievement: { name: "Pogromca Smoka (Hubert)" }, chestType });
        saveCloudData();

        mc.innerHTML = `
          <div class="bg-white rounded-3xl shadow-2xl border-4 border-emerald-400 p-6 text-center max-w-xl mx-auto">
            <div class="text-6xl mb-2">🐉🏳️🏆</div>
            <h2 class="text-3xl font-extrabold text-emerald-900 mb-2">SMOK POKONANY!</h2>
            <p class="text-slate-700 font-bold mb-3">Wspólnymi siłami pokonaliście Groźnego Smoka! Zostało Wam ${state.dragonBattle.teamHp} ❤️!</p>
            <div class="mb-4 p-3 rounded-2xl bg-amber-50 border-2 border-amber-400 text-sm font-extrabold text-amber-950">
              🎁 Nagrody za zwycięstwo (Skrzynie dziś: ${updatedDragon.used}/${updatedDragon.limit}):<br>
              👦 IGOR otrzymuje: ${chestBadgeLabel}<br>
              🧑 HUBERT otrzymuje: ${chestBadgeLabel}
            </div>
            <div class="flex flex-col gap-2">
              <button onclick="processNextRewardInQueue()" class="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold shadow-lg text-base">🎁 Otwórz Skrzynie!</button>
              <button onclick="startCoopDragonBattle()" class="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-lg text-base">🔄 Zagraj jeszcze raz</button>
              <button onclick="showLessonMenu()" class="w-full py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-base">🏠 Wróć do Menu</button>
            </div>
          </div>
        `;

        speakSequence([
          {
            lang: "pl",
            text: `Hurra! Smok pokonany! Gratulacje chłopaki! Nagrodę za pokonanie smoka zdobywa Igor – otrzymuje ${chestNamePl}, oraz Hubert – również otrzymuje ${chestNamePl}! Zaraz otworzycie swoje skrzynki!`
          }
        ], () => {
          processNextRewardInQueue();
        });
      } else {
        state.stats.igor.stars += 10;
        state.stats.hubert.stars += 10;
        saveCloudData();

        mc.innerHTML = `
          <div class="bg-white rounded-3xl shadow-2xl border-4 border-emerald-400 p-6 text-center max-w-xl mx-auto">
            <div class="text-6xl mb-2">🐉🏳️⭐</div>
            <h2 class="text-3xl font-extrabold text-emerald-900 mb-2">SMOK POKONANY!</h2>
            <p class="text-slate-700 font-bold mb-3">Brawo chłopaki! Pokonaliście Smoka jeszcze raz!</p>
            <div class="mb-4 p-3 rounded-2xl bg-sky-50 border-2 border-sky-300 text-xs md:text-sm font-extrabold text-sky-950">
              ℹ️ Dzisiejszy limit skrzyń u Smoka (${dailyDragon.limit}/${dailyDragon.limit}) został już zdobyty!<br>
              W nagrodę otrzymujecie po <strong>+10 ⭐</strong> oraz Puchar! Kolejne skrzynie u Smoka będą dostępne jutro lub teraz w lekcjach!
            </div>
            <div class="flex flex-col gap-2">
              <button onclick="startCoopDragonBattle()" class="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-lg text-base">🔄 Zagraj jeszcze raz</button>
              <button onclick="showLessonMenu()" class="w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-base">🏠 Wróć do Lekcji</button>
            </div>
          </div>
        `;

        speakSequence([
          {
            lang: "pl",
            text: `Brawo chłopaki! Smok znów pokonany! Dzisiejszy limit trzech skrzyń u smoka został już zdobyty, więc otrzymujecie po dziesięć złotych gwiazdek! Kolejne skrzynki czekają w lekcjach lub jutro!`
          }
        ]);
      }
    } else {
      playEffect("wrong");
      mc.innerHTML = `<div class="bg-white rounded-3xl shadow-2xl border-4 border-rose-500 p-6 text-center max-w-xl mx-auto"><div class="text-6xl mb-2">🐉🔥💥</div><h2 class="text-3xl font-extrabold text-rose-900 mb-2">Smok wygrał walkę!</h2><p class="text-slate-600 font-bold mb-4">Straciliście wszystkie serduszka! Smokowi zostało jeszcze ${state.dragonBattle.dragonHp} HP. Spróbujcie jeszcze raz!</p><div class="flex flex-col gap-2"><button onclick="startCoopDragonBattle()" class="w-full px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold shadow-lg text-lg">🔄⚔️ Zagraj jeszcze raz!</button><button onclick="showLessonMenu()" class="w-full px-6 py-3 rounded-2xl bg-slate-200 text-slate-800 font-bold text-base">🏠 Wróć do Menu</button></div></div>`;
      speakSequence([{ lang: "pl", text: "O nie! Smok okazał się zbyt silny i wygrał walkę! Kliknijcie zagraj jeszcze raz!" }]);
    }
    return;
  }

  playEffect("fanfare");
  let duelChestBannerHtml = "";
  if (state.profile === "duel") {
    state.stats.igor.cups++; state.stats.hubert.cups++;
    if (state.duelScores.igor > state.duelScores.hubert) state.stats.igor.duelsWon++;
    else if (state.duelScores.hubert > state.duelScores.igor) state.stats.hubert.duelsWon++;
    checkAndUnlockAchievements("igor"); checkAndUnlockAchievements("hubert");

    const dailyDuel = getDailySpecialChestStatus("duel");
    if (dailyDuel.canEarn) {
      recordDailySpecialChestAwarded("duel");
      const updatedDuel = getDailySpecialChestStatus("duel");
      if (state.duelScores.igor > state.duelScores.hubert) {
        state.rewardQueue.push({ profKey: "igor", achievement: { name: "Zwycięzca Pojedynku (Igor)" }, chestType: "silver" });
        duelChestBannerHtml = `<div class="mt-2 p-2.5 rounded-xl bg-amber-100 border border-amber-400 text-xs font-extrabold text-amber-950">🎁 Nagroda za Pojedynek (${updatedDuel.used}/${updatedDuel.limit} dziś): 👦 IGOR zdobywa 🥈 Srebrną Skrzynię!</div>`;
      } else if (state.duelScores.hubert > state.duelScores.igor) {
        state.rewardQueue.push({ profKey: "hubert", achievement: { name: "Zwycięzca Pojedynku (Hubert)" }, chestType: "silver" });
        duelChestBannerHtml = `<div class="mt-2 p-2.5 rounded-xl bg-amber-100 border border-amber-400 text-xs font-extrabold text-amber-950">🎁 Nagroda za Pojedynek (${updatedDuel.used}/${updatedDuel.limit} dziś): 🧑 HUBERT zdobywa 🥈 Srebrną Skrzynię!</div>`;
      } else {
        state.rewardQueue.push({ profKey: "igor", achievement: { name: "Remis w Pojedynku (Igor)" }, chestType: "bronze" });
        state.rewardQueue.push({ profKey: "hubert", achievement: { name: "Remis w Pojedynku (Hubert)" }, chestType: "bronze" });
        duelChestBannerHtml = `<div class="mt-2 p-2.5 rounded-xl bg-amber-100 border border-amber-400 text-xs font-extrabold text-amber-950">🎁 Remis (${updatedDuel.used}/${updatedDuel.limit} dziś): Obaj bracia zdobywają 📦 Brązową Skrzynię!</div>`;
      }
      setTimeout(processNextRewardInQueue, 450);
    } else {
      state.stats.igor.stars += 5;
      state.stats.hubert.stars += 5;
      duelChestBannerHtml = `<div class="mt-2 p-2.5 rounded-xl bg-sky-100 border border-sky-300 text-xs font-bold text-sky-950">ℹ️ Dzisiejszy limit skrzyń w Pojedynku VS (${dailyDuel.limit}/${dailyDuel.limit}) został już zdobyty! W nagrodę dostajecie po +5 ⭐!</div>`;
    }
  } else {
    p.cups++;
    advanceDailyQuestProgress(profKey, "rounds", 1);
    if (state.roundMistakes === 0) { p.perfectRounds++; advanceDailyQuestProgress(profKey, "perfect", 1); }
    if (state.isExamMode) p.examsDone++;
    if (finishedLessonId && finishedLessonId !== "grand_exam" && finishedLessonId !== "hard_words_training") {
      p.lessonCounts[finishedLessonId] = (p.lessonCounts[finishedLessonId] || 0) + 1;
    }
    checkAndUnlockAchievements(profKey);
  }
  saveCloudData();

  if (state.isExamMode) {
    const chest = state.roundMistakes <= 2 ? "gold" : state.roundMistakes <= 5 ? "silver" : "bronze";
    if (typeof renderChestOpeningInsidePopup === "function") renderChestOpeningInsidePopup(profKey, chest, `🎓 Nagroda za Sprawdzian (Błędów: ${state.roundMistakes})`);
  }

  const isMemory = finishedLessonId === "memory_game";
  const duelInfo = state.profile === "duel"
    ? `<div class="my-3 p-4 rounded-2xl bg-purple-50 border-2 border-purple-300 font-extrabold text-lg">${state.duelScores.igor > state.duelScores.hubert ? '🏆 Zwycięża IGOR!' : state.duelScores.hubert > state.duelScores.igor ? '🏆 Zwycięża HUBERT!' : '🤝 Zasłużony REMIS!'}<div class="text-sm mt-1">👦 Igor: ${state.duelScores.igor}/8 pkt &nbsp;|&nbsp; 🧑 Hubert: ${state.duelScores.hubert}/8 pkt</div>${duelChestBannerHtml}</div>`
    : (isMemory
        ? `<p class="text-slate-700 font-bold mb-4">Brawo! Znaleziono wszystkie pary (${state.memoryMatchedPairs}/${state.memoryMatchedPairs})! 🎉</p>`
        : `<p class="text-slate-600 mb-4">Wynik: <strong>${state.roundScore}/${state.roundQuestions.length}</strong> (Błędy: ${state.roundMistakes})</p>`);

  const nextLessonBtnHtml = state.profile !== "duel" && !state.isExamMode
    ? `<button onclick="startNextSequentialLesson()" class="kid-card w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold shadow-lg text-base">⏭️ Następna lekcja</button>`
    : "";

  mc.innerHTML = `
    <div class="bg-white rounded-3xl shadow-2xl border-4 border-amber-400 p-6 text-center max-w-xl mx-auto">
      <div class="text-6xl mb-2">🏆🎉</div>
      <h2 class="text-3xl font-extrabold mb-2">Koniec Rundy!</h2>
      ${duelInfo}
      <div class="flex flex-col gap-2.5 mt-3">
        <button onclick="playAgainCurrentLesson()" class="kid-card w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold shadow-lg text-base">🔄 Zagraj jeszcze raz</button>
        ${nextLessonBtnHtml}
        <button onclick="showLessonMenu()" class="kid-card w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold shadow text-base">🏠 Wróć do Lekcji</button>
      </div>
    </div>
  `;
}
