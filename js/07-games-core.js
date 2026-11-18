/* ============================================================================
   PLIK: js/07-games-core.js
   PASEK GRY, ANIMACJA SMOKA (LEKTOR PRZED ANIMACJĄ), LIMIT 3 SKRZYŃ I GRY
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
  clearTimeout(window._dragonPostAnimTimer);
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

  window._dragonHpAnimTimer = setTimeout(() => {
    const bar = document.getElementById("dragonFsHpBar");
    const hpTxt = document.getElementById("dragonFsHpText");
    const heartsEl = document.getElementById("dragonFsHearts");
    if (bar) bar.style.width = `${endDragonPct}%`;
    if (hpTxt) hpTxt.textContent = `${db.dragonHp} / ${db.maxDragonHp} HP`;
    if (heartsEl) heartsEl.textContent = endHearts;
  }, 2050);

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
