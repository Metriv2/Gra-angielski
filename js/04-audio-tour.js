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
