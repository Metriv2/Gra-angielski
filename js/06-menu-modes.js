/* ============================================================================
   PLIK: js/06-menu-modes.js
   EKRAN STARTOWY, MENU LEKCJI (LICZNIK SKRZYŃ 3/3), ZADANIE DNIA I START TRYBÓW
   ============================================================================ */

const COLOR_MIX_COLORS = [
  { en: "Red",    dot: "🔴", bg: "#fee2e2", border: "#ef4444", m: "Czerwony",     f: "Czerwona",     n: "Czerwone" },
  { en: "Blue",   dot: "🔵", bg: "#dbeafe", border: "#3b82f6", m: "Niebieski",    f: "Niebieska",    n: "Niebieskie" },
  { en: "Green",  dot: "🟢", bg: "#dcfce7", border: "#22c55e", m: "Zielony",      f: "Zielona",      n: "Zielone" },
  { en: "Yellow", dot: "🟡", bg: "#fef9c3", border: "#eab308", m: "Żółty",        f: "Żółta",        n: "Żółte" },
  { en: "Orange", dot: "🟠", bg: "#ffedd5", border: "#f97316", m: "Pomarańczowy", f: "Pomarańczowa", n: "Pomarańczowe" },
  { en: "Purple", dot: "🟣", bg: "#f3e8ff", border: "#a855f7", m: "Fioletowy",    f: "Fioletowa",    n: "Fioletowe" },
  { en: "Pink",   dot: "🌸", bg: "#fce7f3", border: "#ec4899", m: "Różowy",       f: "Różowa",       n: "Różowe" },
  { en: "Brown",  dot: "🟤", bg: "#f5ebe6", border: "#78350f", m: "Brązowy",      f: "Brązowa",      n: "Brązowe" },
  { en: "Black",  dot: "⚫", bg: "#e2e8f0", border: "#1e293b", m: "Czarny",       f: "Czarna",       n: "Czarne" },
  { en: "White",  dot: "⚪", bg: "#f8fafc", border: "#94a3b8", m: "Biały",        f: "Biała",        n: "Białe" }
];

const COLOR_MIX_OBJECTS = [
  { en: "carrot",     pl: "marchewka",  gender: "f", icon: "🥕" },
  { en: "apple",      pl: "jabłko",     gender: "n", icon: "🍎" },
  { en: "banana",     pl: "banan",      gender: "m", icon: "🍌" },
  { en: "strawberry", pl: "truskawka",  gender: "f", icon: "🍓" },
  { en: "broccoli",   pl: "brokuł",     gender: "m", icon: "🥦" },
  { en: "tomato",     pl: "pomidor",    gender: "m", icon: "🍅" },
  { en: "cucumber",   pl: "ogórek",     gender: "m", icon: "🥒" },
  { en: "pear",       pl: "gruszka",    gender: "f", icon: "🍐" },
  { en: "watermelon", pl: "arbuz",      gender: "m", icon: "🍉" },
  { en: "grapes",     pl: "winogrono",  gender: "n", icon: "🍇" },
  { en: "frog",       pl: "żabka",      gender: "f", icon: "🐸" },
  { en: "bear",       pl: "niedźwiedź", gender: "m", icon: "🐻" },
  { en: "pig",        pl: "świnka",     gender: "f", icon: "🐷" },
  { en: "whale",      pl: "wieloryb",   gender: "m", icon: "🐳" }
];

function buildColorMixEntry(colorObj, itemObj) {
  const adjPl = colorObj[itemObj.gender] || colorObj.m;
  return {
    en: `${colorObj.en} ${itemObj.en}`,
    pl: `${adjPl} ${itemObj.pl}`,
    colorEn: colorObj.en,
    objEn: itemObj.en,
    colorBg: colorObj.bg,
    colorBorder: colorObj.border,
    colorDot: colorObj.dot,
    objIcon: itemObj.icon,
    icon: `${colorObj.dot}${itemObj.icon}`,
    age: [4, 6]
  };
}

function generateColorMixRoundQuestions(count) {
  const list = [];
  for (let i = 0; i < count; i++) {
    const col = COLOR_MIX_COLORS[Math.floor(Math.random() * COLOR_MIX_COLORS.length)];
    const obj = COLOR_MIX_OBJECTS[Math.floor(Math.random() * COLOR_MIX_OBJECTS.length)];
    list.push(buildColorMixEntry(col, obj));
  }
  return list;
}

function buildColorMixChoicesForQuestion(q) {
  const targetColor = COLOR_MIX_COLORS.find(c => c.en === q.colorEn) || COLOR_MIX_COLORS[0];
  const targetObj = COLOR_MIX_OBJECTS.find(o => o.en === q.objEn) || COLOR_MIX_OBJECTS[0];
  const otherColors = shuffleArray(COLOR_MIX_COLORS.filter(c => c.en !== targetColor.en)).slice(0, 2);
  const threeColors = [targetColor, ...otherColors];
  const otherObj = shuffleArray(COLOR_MIX_OBJECTS.filter(o => o.en !== targetObj.en))[0] || COLOR_MIX_OBJECTS[1];
  const twoObjects = [targetObj, otherObj];
  const choices = [];
  twoObjects.forEach(obj => {
    threeColors.forEach(col => choices.push(buildColorMixEntry(col, obj)));
  });
  return shuffleArray(choices);
}

function getVisibleLessonItems(items, applyAgeFilter = true, lessonIdOverride = null) {
  if (state && state.lessons) {
    normalizePancakesIconsInLessons(state.lessons);
  }
  if (!Array.isArray(items)) return [];
  let list = state.profile === "tata" ? [...items] : items.filter(it => !it.testOnly);

  if (applyAgeFilter) {
    if (isEffectiveIgorMode(lessonIdOverride)) {
      const ageFiltered = list.filter(it => !Array.isArray(it.age) || it.age.includes(4));
      if (ageFiltered.length > 0) list = ageFiltered;
    }
  }
  return list;
}

function collectAllWordsForBrothersModes() {
  let all = [];
  state.lessons.filter(l => !l.testOnly || state.profile === "tata").forEach(l => {
    if (l.type !== "prepositions" && l.type !== "mic_only" && l.type !== "memory_game") {
      getVisibleLessonItems(l.items, false, l.id).forEach(it => {
        if (it && it.en) all.push(it);
      });
    }
  });
  return all;
}

function recordHardWordForActivePlayer(q) {
  if (!q || !q.en || state.profile === "duel" || state.isCoopDragonMode) return;
  const profKey = (state.profile === "hubert" || state.profile === "tata") ? state.profile : "igor";
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (!Array.isArray(p.hardWords)) p.hardWords = [];
  if (!p.hardWords.some(w => w.en === q.en)) {
    p.hardWords.push({ en: q.en, pl: q.pl || "", phonetic: q.phonetic || "", icon: q.icon || q.animal || "⭐" });
    state.stats[profKey] = p;
    saveCloudData();
  }
}

function removeHardWordIfMastered(q) {
  if (!q || !q.en || state.profile === "duel" || state.isCoopDragonMode) return;
  const profKey = (state.profile === "hubert" || state.profile === "tata") ? state.profile : "igor";
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (!Array.isArray(p.hardWords)) return;
  const before = p.hardWords.length;
  p.hardWords = p.hardWords.filter(w => w.en !== q.en);
  if (p.hardWords.length !== before) {
    state.stats[profKey] = p;
    saveCloudData();
  }
}

function ensureDailyQuestForPlayer(profKey) {
  if (!PROFILE_META[profKey]) return;
  const p = ensurePlayerStructure(state.stats[profKey]);
  const today = new Date().toISOString().slice(0, 10);
  if (!p.dailyQuest || p.dailyQuest.date !== today || !p.dailyQuest.type) {
    const quests = [
      { type: "stars", title: "Zdobądź dzisiaj 10 złotych gwiazdek ⭐", speakPl: "Zadanie dnia od Sówki! Zdobądź dzisiaj dziesięć złotych gwiazdek w dowolnych lekcjach, a w nagrodę dostaniesz trzydzieści dodatkowych gwiazdek!", target: 10, rewardStars: 30 },
      { type: "perfect", title: "Ukończ dzisiaj 1 rundę bez żadnego błędu 🎯", speakPl: "Zadanie dnia od Sówki! Ukończ dzisiaj jedną całą lekcję bez ani jednego błędu, a w nagrodę otrzymasz trzydzieści złotych gwiazdek!", target: 1, rewardStars: 30 },
      { type: "rounds", title: "Ukończ dzisiaj 2 dowolne lekcje 🏆", speakPl: "Zadanie dnia od Sówki! Zagraj i ukończ dzisiaj dwie dowolne lekcje, a w nagrodę otrzymasz trzydzieści złotych gwiazdek!", target: 2, rewardStars: 30 },
      { type: "feed_pet", title: "Nakarm dzisiaj swojego zwierzaka w Garderobie 🍎", speakPl: "Zadanie dnia od Sówki! Wejdź u góry w Awatar, zjedź na dół do spiżarni i nakarm swojego zwierzaka owocem lub warzywem, a dostaniesz trzydzieści gwiazdek!", target: 1, rewardStars: 30 }
    ];
    const picked = quests[Math.floor(Math.random() * quests.length)];
    p.dailyQuest = { date: today, type: picked.type, title: picked.title, speakPl: picked.speakPl, target: picked.target, progress: 0, rewardStars: picked.rewardStars, claimed: false };
    state.stats[profKey] = p;
  }
}

function speakDailyQuestInstruction() {
  const profKey = (state.profile === "hubert" || state.profile === "tata") ? state.profile : "igor";
  ensureDailyQuestForPlayer(profKey);
  const dq = state.stats[profKey].dailyQuest;
  if (!dq) return;
  const isDone = dq.progress >= dq.target;
  if (dq.claimed) {
    speakSequence([{ lang: "pl", text: "Dzisiejsze zadanie dnia zostało już wykonane i nagroda została odebrana! Wróć jutro po kolejne zadanie!" }]);
  } else if (isDone) {
    speakSequence([{ lang: "pl", text: "Brawo! Wykonałeś już dzisiejsze zadanie dnia! Kliknij zielony przycisk Odbierz, aby dostać trzydzieści złotych gwiazdek!" }]);
  } else {
    const desc = dq.speakPl || `Zadanie dnia od Sówki: ${dq.title}. Twój aktualny postęp to ${dq.progress} z ${dq.target}.`;
    speakSequence([{ lang: "pl", text: `${desc} Aktualny postęp: ${dq.progress} z ${dq.target}.` }]);
  }
}

function advanceDailyQuestProgress(profKey, questType, amount = 1) {
  if (!PROFILE_META[profKey]) return;
  ensureDailyQuestForPlayer(profKey);
  const p = state.stats[profKey];
  if (!p || !p.dailyQuest || p.dailyQuest.claimed) return;
  if (p.dailyQuest.type === questType) {
    p.dailyQuest.progress = Math.min(p.dailyQuest.target, (p.dailyQuest.progress || 0) + amount);
  }
}

function claimDailyQuestReward() {
  const profKey = (state.profile === "hubert" || state.profile === "tata") ? state.profile : "igor";
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (!p.dailyQuest || p.dailyQuest.claimed || p.dailyQuest.progress < p.dailyQuest.target) return;
  p.dailyQuest.claimed = true;
  p.stars = (p.stars || 0) + (p.dailyQuest.rewardStars || 30);
  state.stats[profKey] = p;
  saveCloudData();
  playEffect("fanfare");
  updateHeaderUI();
  showLessonMenu();
  speakSequence([{ lang: "pl", text: `Brawo! Zadanie Dnia wykonane! Otrzymujesz trzydzieści dodatkowych gwiazdek!` }]);
}

function updateHeaderUI() {
  syncVersionLabelsInDom();
  const badge = document.getElementById("activeProfileBadge");
  const stBadge = document.getElementById("stickerCountBadge");
  const bdTop = document.getElementById("badgeCountTop");
  if (stBadge) stBadge.textContent = (state.stats.stickers || []).length;
  const activeProf = (state.profile === "hubert" || state.profile === "tata") ? state.profile : "igor";
  if (bdTop && state.stats[activeProf]) bdTop.textContent = (state.stats[activeProf].badges || []).length;
  if (typeof updateWhatsNewButtonGlow === "function") updateWhatsNewButtonGlow();
  if (!badge || !state.profile) return;

  if (state.profile !== "duel") {
    badge.onclick = () => { if (typeof openAvatarModal === "function") openAvatarModal(); };
    badge.title = "Kliknij awatar, aby otworzyć Garderobę i Asystenta Gwiazdek!";
  }

  if (state.profile === "igor") {
    const age = getPlayerAge("igor");
    const bday = isPlayerBirthdayToday("igor") ? " 🎂" : "";
    badge.innerHTML = `${renderBoyAvatarSvg('igor', 26)} 👦 IGOR (${age} l.)${bday} • ⭐ ${state.stats.igor.stars} | 🏆 ${state.stats.igor.cups} | 🔥 ${state.stats.igor.streakDays} dni`;
  } else if (state.profile === "hubert") {
    const age = getPlayerAge("hubert");
    const bday = isPlayerBirthdayToday("hubert") ? " 🎂" : "";
    badge.innerHTML = `${renderBoyAvatarSvg('hubert', 26)} 🧑 HUBERT (${age} l.)${bday} • ⭐ ${state.stats.hubert.stars} | 🏆 ${state.stats.hubert.cups} | 🔥 ${state.stats.hubert.streakDays} dni`;
  } else if (state.profile === "tata") {
    const age = getPlayerAge("tata");
    const bday = isPlayerBirthdayToday("tata") ? " 🎂" : "";
    const simTag = state.tataPreviewAsIgor ? "👦 Widok: IGOR (4 l.)" : "🧑 Widok: HUBERT (6 l.)";
    badge.innerHTML = `${renderBoyAvatarSvg('tata', 26)} 👨‍💻 TATA (${age} l.)${bday} • ⭐ ${state.stats.tata.stars} | 🏆 ${state.stats.tata.cups} | <span class="px-2 py-0.5 rounded-lg bg-indigo-600 text-white text-[11px] font-extrabold">${simTag}</span>`;
  } else {
    badge.innerHTML = state.isCoopDragonMode ? `🐉 WSPÓLNA WALKA ZE SMOKIEM` : `⚔️ POJEDYNEK BRACI (16 pytań)`;
  }
}

function showStartScreen() {
  cancelAllSpeechAndTimers();
  state.profile = null;
  state.currentLessonId = null;
  state.isCoopDragonMode = false;
  const topH = document.getElementById("topHeader");
  if (topH) topH.classList.add("hidden");

  const mc = document.getElementById("mainContainer");
  if (!mc) return;

  const igorAge = getPlayerAge("igor");
  const hubertAge = getPlayerAge("hubert");
  const tataAge = getPlayerAge("tata");

  const igorPendingCount = ((state.stats.igor && state.stats.igor.pendingChests) || []).length;
  const hubertPendingCount = ((state.stats.hubert && state.stats.hubert.pendingChests) || []).length;

  const igorGiftBadge = igorPendingCount > 0 ? `<div class="mt-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold animate-bounce">🎁 Czeka skrzynia od Taty (${igorPendingCount})!</div>` : "";
  const hubertGiftBadge = hubertPendingCount > 0 ? `<div class="mt-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold animate-bounce">🎁 Czeka skrzynia od Taty (${hubertPendingCount})!</div>` : "";

  const igorBday = isPlayerBirthdayToday("igor") ? `<div class="mt-1 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold animate-bounce">🎂 DZIŚ URODZINY! ZŁOTA SKRZYNIA!</div>` : `<div class="text-[10px] font-bold text-amber-700">🎂 ur. 29.06.2022</div>`;
  const hubertBday = isPlayerBirthdayToday("hubert") ? `<div class="mt-1 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold animate-bounce">🎂 DZIŚ URODZINY! ZŁOTA SKRZYNIA!</div>` : `<div class="text-[10px] font-bold text-sky-700">🎂 ur. 17.08.2020</div>`;
  const tataBday = isPlayerBirthdayToday("tata") ? `<div class="mt-1 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold animate-bounce">🎂 DZIŚ URODZINY!</div>` : `<div class="text-[10px] font-bold text-emerald-700">🧪 Konto Testowe (PIN)</div>`;

  const duelDaily = getDailySpecialChestStatus("duel");
  const dragonDaily = getDailySpecialChestStatus("dragon");

  mc.innerHTML = `
    <div class="bg-white/95 rounded-3xl shadow-2xl border-4 border-sky-300 p-5 md:p-7 text-center max-w-6xl mx-auto w-full">
      <div class="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-900 font-bold text-xs mb-2">
        🌟 Akademia Angielskiego • <span data-app-version>Wersja ${CURRENT_GAME_VERSION}</span>
      </div>
      <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Kto dzisiaj gra? 👇</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div onclick="chooseProfile('igor')" class="kid-card cursor-pointer rounded-3xl border-4 border-amber-400 bg-gradient-to-b from-amber-50 to-amber-100 p-4 shadow-lg flex flex-col items-center justify-between">
          ${renderBoyAvatarSvg('igor', 90)}
          <div class="mt-1"><h2 class="text-xl font-extrabold text-amber-950">IGOR (${igorAge} l.)</h2>${igorBday}${igorGiftBadge}</div>
          <div class="text-[11px] font-bold text-amber-900 my-2 bg-white px-2.5 py-1.5 rounded-xl border border-amber-300 w-full">⭐ ${state.stats.igor.stars} | 🏆 ${state.stats.igor.cups} | 🔥 ${state.stats.igor.streakDays} dni</div>
          <span class="w-full py-2.5 bg-amber-500 text-white font-extrabold rounded-2xl shadow text-sm">Graj jako Igor ▶</span>
        </div>

        <div onclick="chooseProfile('hubert')" class="kid-card cursor-pointer rounded-3xl border-4 border-sky-400 bg-gradient-to-b from-sky-50 to-sky-100 p-4 shadow-lg flex flex-col items-center justify-between">
          ${renderBoyAvatarSvg('hubert', 90)}
          <div class="mt-1"><h2 class="text-xl font-extrabold text-sky-950">HUBERT (${hubertAge} l.)</h2>${hubertBday}${hubertGiftBadge}</div>
          <div class="text-[11px] font-bold text-sky-900 my-2 bg-white px-2.5 py-1.5 rounded-xl border border-sky-300 w-full">⭐ ${state.stats.hubert.stars} | 🏆 ${state.stats.hubert.cups} | 🔥 ${state.stats.hubert.streakDays} dni</div>
          <span class="w-full py-2.5 bg-sky-600 text-white font-extrabold rounded-2xl shadow text-sm">Graj jako Hubert ▶</span>
        </div>

        <div onclick="chooseProfile('duel')" class="kid-card cursor-pointer rounded-3xl border-4 border-purple-400 bg-gradient-to-b from-purple-50 to-indigo-100 p-4 shadow-lg flex flex-col items-center justify-between">
          <div class="text-5xl my-3 float-anim drop-shadow-md">⚔️🐉</div>
          <div><h2 class="text-xl font-extrabold text-purple-950">BRACIA RAZEM</h2><div class="text-[10px] font-bold text-purple-700">Pojedynek VS lub Walka ze Smokiem!</div></div>
          <div class="text-[11px] font-bold text-purple-900 my-2 bg-white px-2.5 py-1.5 rounded-xl border border-purple-300 w-full">Skrzynie dziś: VS ${duelDaily.remaining}/${duelDaily.limit} • Smok ${dragonDaily.remaining}/${dragonDaily.limit}</div>
          <span class="w-full py-2.5 bg-purple-600 text-white font-extrabold rounded-2xl shadow text-sm">Wybierz tryb braci ▶</span>
        </div>

        <div onclick="openParentPinModal('tata_login')" class="kid-card cursor-pointer rounded-3xl border-4 border-emerald-400 bg-gradient-to-b from-emerald-50 to-teal-100 p-4 shadow-lg flex flex-col items-center justify-between">
          ${renderBoyAvatarSvg('tata', 90)}
          <div class="mt-1"><h2 class="text-xl font-extrabold text-emerald-950">🔒 TATA (${tataAge} l.)</h2>${tataBday}</div>
          <div class="text-[11px] font-bold text-emerald-900 my-2 bg-white px-2.5 py-1.5 rounded-xl border border-emerald-300 w-full">⭐ ${state.stats.tata.stars} | 🏆 ${state.stats.tata.cups} | 🔥 ${state.stats.tata.streakDays} dni</div>
          <span class="w-full py-2.5 bg-emerald-600 text-white font-extrabold rounded-2xl shadow text-sm">Konto Testowe 🔒</span>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-3 pt-4 border-t border-slate-200">
        <button onclick="openGuideModal()" class="kid-card px-5 py-2.5 bg-sky-100 text-sky-900 font-bold rounded-2xl border-2 border-sky-300 text-sm">📘 Instrukcja</button>
        <button onclick="openParentPinModal('dashboard')" class="kid-card px-5 py-2.5 bg-slate-100 text-slate-800 font-bold rounded-2xl border-2 border-slate-300 text-sm">🔒 Panel Rodzica</button>
      </div>
    </div>
  `;
}

function chooseProfile(prof) {
  state.profile = prof;
  state.isCoopDragonMode = false;
  let openedAutoWhatsNew = false;

  if (prof === "igor" || prof === "hubert" || prof === "tata") {
    state.stats[prof] = ensurePlayerStructure(state.stats[prof]);
    updateDailyStreakForPlayer(prof);
    ensureDailyQuestForPlayer(prof);
    checkAndUnlockAchievements(prof);
    checkAndAwardBirthdayChest(prof);
    openedAutoWhatsNew = checkAutoShowWhatsNewOnVersionChange(prof);
    if (!openedAutoWhatsNew) {
      checkPendingDadChestsForPlayer(prof);
    }
  } else {
    updateDailyStreakForPlayer("igor");
    updateDailyStreakForPlayer("hubert");
  }
  saveCloudData();
  const topH = document.getElementById("topHeader");
  if (topH) topH.classList.remove("hidden");
  updateHeaderUI();
  showLessonMenu();
}

function showLessonMenu() {
  cancelAllSpeechAndTimers();
  if (!state.profile) { showStartScreen(); return; }
  normalizePancakesIconsInLessons(state.lessons);
  state.currentLessonId = null;
  state.isExamMode = false;
  state.isHardWordsMode = false;
  state.isCoopDragonMode = false;
  window._letterTargetWord = "";
  window._letterRoundIdx = -1;
  updateHeaderUI();

  const baseVisible = state.lessons.filter(l => !l.testOnly || state.profile === "tata");
  const visibleLessons = state.profile === "duel"
    ? baseVisible.filter(l => l.type !== "mic_only" && l.type !== "memory_game")
    : baseVisible;

  const pKey = (state.profile === "hubert" || state.profile === "tata") ? state.profile : "igor";
  const hardList = (state.stats[pKey] && Array.isArray(state.stats[pKey].hardWords)) ? state.stats[pKey].hardWords : [];

  let hardWordsBtnHtml = "";
  if (state.profile !== "duel" && hardList.length > 0) {
    hardWordsBtnHtml = `<button onclick="startHardWordsTraining()" class="kid-card px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs md:text-sm shadow-lg flex items-center gap-2 border-2 border-rose-300"><span>🎯🔥</span> Trudne Słówka (${hardList.length}) • 2x ⭐!</button>`;
  }

  const whatsNewGlow = shouldGlowWhatsNew() ? "tutorial-highlight" : "";
  const whatsNewBtnMenu = state.profile !== "duel"
    ? `<button id="menuWhatsNewBtn" onclick="openWhatsNewModal(true)" class="kid-card px-4 py-2.5 rounded-2xl bg-rose-100 border-3 border-rose-400 text-rose-900 font-extrabold text-sm flex items-center gap-2 shadow-sm ${whatsNewGlow}"><span>🆕🦉</span> Co nowego w Wersji ${CURRENT_GAME_VERSION}?</button>`
    : "";

  const tataSimSwitchHtml = state.profile === "tata"
    ? `<button onclick="toggleTataPreviewAge()" class="kid-card px-4 py-2.5 rounded-2xl ${state.tataPreviewAsIgor ? 'bg-amber-400 text-amber-950 border-amber-600' : 'bg-sky-600 text-white border-sky-800'} border-3 font-extrabold text-xs md:text-sm shadow-md flex items-center gap-2">
         <span>${state.tataPreviewAsIgor ? '👦 Podgląd: IGOR (4 l.)' : '🧑 Podgląd: HUBERT (6 l.)'}</span>
         <span class="px-2 py-0.5 rounded-lg bg-white/80 text-slate-900 text-[10px]">Przełącz 🔄</span>
       </button>`
    : "";

  let dailyQuestBanner = "";
  if (state.profile !== "duel") {
    ensureDailyQuestForPlayer(pKey);
    const dq = state.stats[pKey].dailyQuest;
    if (dq && dq.title) {
      const isDone = dq.progress >= dq.target;
      dailyQuestBanner = `
        <div id="dailyQuestBannerBox" onclick="speakDailyQuestInstruction()" class="cursor-pointer hover:brightness-95 transition-all mb-4 p-3 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-emerald-50 border-2 ${isDone ? 'border-emerald-400' : 'border-amber-300'} flex flex-wrap items-center justify-between gap-2 shadow-sm" title="Kliknij, aby Sówka przeczytała zadanie!">
          <div class="flex items-center gap-2.5">
            <span class="text-3xl">${dq.claimed ? '✅' : isDone ? '🎁' : '🦉🔊'}</span>
            <div>
              <div class="text-[11px] font-extrabold uppercase text-amber-800">Zadanie Dnia od Sówki (+${dq.rewardStars} ⭐) • Kliknij, aby posłuchać 🔊</div>
              <div class="text-xs md:text-sm font-extrabold text-slate-900">${dq.title}</div>
            </div>
          </div>
          <div onclick="event.stopPropagation()">
            ${dq.claimed ? `<span class="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-xs border border-emerald-300">Odebrano nagrodę ✓</span>` : isDone ? `<button onclick="claimDailyQuestReward()" class="kid-card px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow animate-bounce">🎁 Odbierz +${dq.rewardStars} ⭐!</button>` : `<button onclick="speakDailyQuestInstruction()" class="px-3 py-1.5 rounded-xl bg-white text-slate-700 font-extrabold text-xs border border-amber-300">🔊 Posłuchaj (${dq.progress}/${dq.target})</button>`}
          </div>
        </div>
      `;
    }
  }

  // STAŁY DOSTĘP DO POJEDYNKU BRACI (VS) I WALKI ZE SMOKIEM W MENU GŁÓWNYM Z LICZNIKIEM SKRZYŃ 3/3
  const duelDaily = getDailySpecialChestStatus("duel");
  const dragonDaily = getDailySpecialChestStatus("dragon");
  const alwaysBrothersButtons = `
    <button id="btnDuelMenuAlways" onclick="startDuelAllWords()" class="kid-card px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-xs md:text-sm shadow-lg border-2 border-purple-300 flex items-center gap-1.5">
      <span>⚔️</span> Pojedynek Braci (VS)
      <span class="px-1.5 py-0.5 rounded-lg bg-white/20 text-[10px]">🎁 ${duelDaily.remaining}/${duelDaily.limit}</span>
    </button>
    <button id="btnCoopDragonMenu" onclick="startCoopDragonBattle()" class="kid-card px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-extrabold text-xs md:text-sm shadow-lg border-2 border-emerald-300 flex items-center gap-1.5">
      <span>🐉🛡️</span> Walka ze Smokiem
      <span class="px-1.5 py-0.5 rounded-lg bg-white/20 text-[10px]">🎁 ${dragonDaily.remaining}/${dragonDaily.limit}</span>
    </button>
  `;

  let topActionHtml = "";
  if (state.profile === "duel") {
    topActionHtml = `<div class="flex flex-wrap gap-2 items-center">${alwaysBrothersButtons}</div>`;
  } else if (state.profile === "hubert" || state.profile === "tata") {
    const examLabel = state.profile === "tata" ? (state.tataPreviewAsIgor ? "🎓👑 Sprawdzian (Igor)" : "🎓👑 Sprawdzian (Hubert)") : "🎓👑 Sprawdzian Huberta";
    const examSub = (state.profile === "tata" && state.tataPreviewAsIgor) ? "15 pytań obrazkowych!" : "10 pytań + 5 x Wymowa!";
    topActionHtml = `<div class="flex flex-wrap gap-2 items-center">${hardWordsBtnHtml}${alwaysBrothersButtons}<button onclick="startGrandExam()" class="kid-card px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-xs md:text-sm shadow-lg flex flex-col"><span class="text-center">${examLabel}</span><span class="text-[10px] font-bold text-center text-amber-100">${examSub}</span></button></div>`;
  } else {
    topActionHtml = `<div class="flex flex-wrap gap-2 items-center">${hardWordsBtnHtml}${alwaysBrothersButtons}<button onclick="startGrandExam()" class="kid-card px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-xs md:text-sm shadow-lg flex items-center gap-1.5">🎓👑 Wielki Sprawdzian</button></div>`;
  }

  const eqList = Array.isArray(state.equalizedLessonsForIgor) ? state.equalizedLessonsForIgor : [];

  const mc = document.getElementById("mainContainer");
  if (!mc) return;

  mc.innerHTML = `
    <div class="bg-white/95 rounded-3xl shadow-xl border-4 border-sky-200 p-4 md:p-6">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div class="flex flex-wrap gap-2 items-center">
          <button onclick="startKidVoiceTour()" class="kid-card px-4 py-2.5 rounded-2xl bg-amber-100 border-3 border-amber-400 text-amber-950 font-extrabold text-sm flex items-center gap-2 shadow-sm"><span class="text-xl">🦉🔊</span> Posłuchaj Sówki</button>
          ${whatsNewBtnMenu}
          ${tataSimSwitchHtml}
        </div>
        ${topActionHtml}
      </div>
      ${dailyQuestBanner}
      <div id="lessonsGridBox" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 rounded-2xl p-1">
        ${visibleLessons.map(l => {
          const doneCount = (state.stats[pKey].lessonCounts && state.stats[pKey].lessonCounts[l.id]) || 0;
          const testWordsCount = Array.isArray(l.items) ? l.items.filter(it => it.testOnly).length : 0;
          const isEqualized = eqList.includes(l.id);
          const eqBadge = isEqualized
            ? `<span class="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-extrabold text-[10px] border border-indigo-400">🧑 Poziom Huberta (6 opcji)</span>`
            : "";
          const testBadge = l.testOnly
            ? `<span class="px-2 py-0.5 rounded-full bg-amber-300 text-amber-950 font-extrabold text-[10px] border border-amber-500">🧪 TESTOWA (TYLKO TATA)</span>`
            : (state.profile === "tata" && testWordsCount > 0 ? `<span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] border border-amber-400">🧪 +${testWordsCount} słówek testowych</span>` : "");
          return `
            <div id="lessonCard_${l.id}" onclick="startLesson('${l.id}')" class="kid-card cursor-pointer rounded-3xl border-4 ${l.borderColor} bg-white hover:bg-slate-50 p-4 shadow-md flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-center mb-2 gap-1 flex-wrap">
                  <span class="text-4xl drop-shadow-sm">${l.icon}</span>
                  <div class="flex flex-col items-end gap-1">
                    <span class="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">Powtórki: ${doneCount}x</span>
                    ${eqBadge}
                    ${testBadge}
                  </div>
                </div>
                <h3 class="text-lg font-extrabold text-slate-900 leading-tight">${l.title}</h3>
                <p class="text-[11px] text-slate-500 mt-1">${l.subtitle}</p>
              </div>
              <div class="mt-3 pt-2 border-t border-slate-100 flex justify-end items-center">
                <span class="px-4 py-1.5 rounded-xl bg-gradient-to-r ${l.color} text-white font-bold text-xs shadow drop-shadow-md">Start ▶</span>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function shuffleArray(arr) {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; }
  return c;
}

function startHardWordsTraining() {
  cancelAllSpeechAndTimers();
  const profKey = (state.profile === "hubert" || state.profile === "tata") ? state.profile : "igor";
  const hardList = (state.stats[profKey] && Array.isArray(state.stats[profKey].hardWords)) ? state.stats[profKey].hardWords : [];
  if (hardList.length === 0) return showLessonMenu();
  state.currentLessonId = "hard_words_training";
  state.lastPlayedLessonId = "hard_words_training";
  state.currentSubMode = "listen_pick";
  state.isExamMode = false; state.isHardWordsMode = true; state.isCoopDragonMode = false;
  state.roundIndex = 0; state.roundScore = 0; state.roundMistakes = 0; state.roundResults = []; state.currentQuestionMistakes = 0;
  window._letterTargetWord = ""; window._letterRoundIdx = -1;
  const shuffled = shuffleArray(hardList);
  const totalQ = Math.min(state.questionsPerRound, Math.max(shuffled.length, 5));
  state.roundQuestions = [];
  for (let i = 0; i < totalQ; i++) state.roundQuestions.push(shuffled[i % shuffled.length]);
  renderCurrentQuestion();
}

function startCoopDragonBattle() {
  cancelAllSpeechAndTimers();
  const topH = document.getElementById("topHeader");
  if (topH) topH.classList.remove("hidden");
  state.currentLessonId = "dragon_coop";
  state.lastPlayedLessonId = "dragon_coop";
  state.currentSubMode = "listen_pick";
  state.isExamMode = false; state.isHardWordsMode = false; state.isCoopDragonMode = true;
  state.roundIndex = 0; state.roundScore = 0; state.roundMistakes = 0; state.roundResults = []; state.currentQuestionMistakes = 0;
  state.duelTurn = "igor";
  state.duelReadyWaiting = true;
  window._letterTargetWord = ""; window._letterRoundIdx = -1;
  state.dragonBattle = {
    dragonHp: 10,
    maxDragonHp: 10,
    teamHp: 4,
    maxTeamHp: 4,
    statusText: "🐉 Smok szykuje ognisty atak! Odpowiedzcie poprawnie, aby zablokować ogień tarczą 🛡️ i zadać cios ⚔️!",
    animClass: ""
  };

  const all = collectAllWordsForBrothersModes();
  const shuffled = shuffleArray(all);
  state.roundQuestions = [];
  for (let i = 0; i < 24; i++) {
    const item = Object.assign({}, shuffled[i % shuffled.length]);
    item._dragonMicQuestion = false;
    item._dragonMicTries = 0;
    state.roundQuestions.push(item);
  }

  // 2 obowiązkowe pytania z mikrofonem dla Huberta (tury nieparzyste: indeksy 1, 3, 5, 7, 9, 11)
  const hubertTurnIndices = [1, 3, 5, 7, 9, 11];
  const pickedMicIndices = shuffleArray(hubertTurnIndices).slice(0, 2);
  pickedMicIndices.forEach(idx => {
    if (state.roundQuestions[idx]) {
      state.roundQuestions[idx]._dragonMicQuestion = true;
      state.roundQuestions[idx]._dragonMicTries = 0;
    }
  });

  updateHeaderUI();
  renderCurrentQuestion();
}

function startLesson(lessonId, subMode = null) {
  cancelAllSpeechAndTimers();
  state.currentLessonId = lessonId;
  state.lastPlayedLessonId = lessonId;
  state.isExamMode = false; state.isHardWordsMode = false; state.isCoopDragonMode = false;
  window._letterTargetWord = ""; window._letterRoundIdx = -1;
  state.letterBuilt = ""; state.letterPool = [];

  normalizePancakesIconsInLessons(state.lessons);
  const lesson = state.lessons.find(l => l.id === lessonId);
  if (!lesson) return;

  if (lesson.type === "memory_game") {
    if (typeof startMemoryGame === "function") return startMemoryGame();
  }

  if (!subMode) {
    if (lesson.type === "prepositions") subMode = "prep_explain";
    else if (lesson.type === "mic_only") subMode = "mic_game";
    else subMode = "listen_pick";
  }
  if (state.profile === "duel" && subMode === "mic_game") subMode = "listen_pick";

  state.currentSubMode = subMode;
  state.lastPlayedSubMode = subMode;
  state.shopCart = []; state.riddleHintShown = false; state.riddleHintStep = 0;
  state.roundIndex = 0; state.roundScore = 0; state.roundMistakes = 0; state.roundResults = []; state.currentQuestionMistakes = 0;
  state.duelScores = { igor: 0, hubert: 0 }; state.duelTurn = "igor"; state.duelReadyWaiting = state.profile === "duel";

  if (subMode === "pancake_cooking_game") {
    state.roundQuestions = [{ en: "Pancakes", pl: "Pankejksy", icon: "🥞" }];
    if (typeof startPancakeCookingGame === "function") return startPancakeCookingGame(lesson);
  }

  const totalQ = state.profile === "duel" ? 16 : state.questionsPerRound;
  if (subMode === "color_mix_game") {
    state.roundQuestions = generateColorMixRoundQuestions(totalQ);
    return renderCurrentQuestion();
  }

  const visibleItems = getVisibleLessonItems(lesson.items, true, lesson.id);
  let pool = visibleItems;

  if (subMode === "shop_cart_game") pool = visibleItems.filter(i => i.isProduct);
  else if (subMode === "shop_phrases_game") pool = visibleItems.filter(i => i.isPhrase);
  else if (subMode === "riddles_game" && typeof RIDDLES_POOL !== "undefined") pool = RIDDLES_POOL;
  else if (subMode === "letters_game") pool = visibleItems.filter(i => /^[a-zA-Z]+$/.test(i.en.trim()));

  if (!pool || !pool.length) pool = visibleItems.length ? visibleItems : lesson.items;

  const shuffled = shuffleArray(pool);
  state.roundQuestions = [];
  for (let i = 0; i < totalQ; i++) state.roundQuestions.push(shuffled[i % shuffled.length]);
  renderCurrentQuestion();
}

function startDuelAllWords() {
  cancelAllSpeechAndTimers();
  const topH = document.getElementById("topHeader");
  if (topH) topH.classList.remove("hidden");
  state.profile = "duel"; state.currentLessonId = "duel_all"; state.lastPlayedLessonId = "duel_all"; state.currentSubMode = "listen_pick";
  state.isExamMode = false; state.isHardWordsMode = false; state.isCoopDragonMode = false;
  state.roundIndex = 0; state.roundScore = 0; state.roundMistakes = 0;
  state.roundResults = []; state.currentQuestionMistakes = 0; state.duelScores = { igor: 0, hubert: 0 };
  state.duelTurn = "igor"; state.duelReadyWaiting = true;
  window._letterTargetWord = ""; window._letterRoundIdx = -1;

  const all = collectAllWordsForBrothersModes();
  const shuffled = shuffleArray(all);
  state.roundQuestions = [];
  for (let i = 0; i < 16; i++) state.roundQuestions.push(shuffled[i % shuffled.length]);
  updateHeaderUI();
  renderCurrentQuestion();
}

function startGrandExam() {
  cancelAllSpeechAndTimers();
  state.currentLessonId = "grand_exam"; state.lastPlayedLessonId = "grand_exam"; state.currentSubMode = "listen_pick";
  state.isExamMode = true; state.isHardWordsMode = false; state.isCoopDragonMode = false;
  state.roundIndex = 0; state.roundScore = 0; state.roundMistakes = 0; state.roundResults = []; state.currentQuestionMistakes = 0;
  window._letterTargetWord = ""; window._letterRoundIdx = -1;

  let allListen = [];
  state.lessons.filter(l => !l.testOnly || state.profile === "tata").forEach(l => {
    if (l.type !== "prepositions" && l.type !== "mic_only" && l.type !== "memory_game") getVisibleLessonItems(l.items, true, l.id).forEach(it => allListen.push(it));
  });
  let allMic = [];
  const pStudio = state.lessons.find(l => l.id === "pronunciation_studio");
  if (pStudio) getVisibleLessonItems(pStudio.items, true, pStudio.id).forEach(it => allMic.push(it));

  state.roundQuestions = [];
  const shuffledListen = shuffleArray(allListen);
  const shuffledMic = shuffleArray(allMic);

  if (!isEffectiveIgorMode()) {
    for (let i = 0; i < 10; i++) { let q = Object.assign({}, shuffledListen[i % shuffledListen.length]); q._examModeType = "listen_pick"; state.roundQuestions.push(q); }
    for (let i = 0; i < 5; i++) { let q = Object.assign({}, shuffledMic[i % shuffledMic.length]); q._examModeType = "mic_game"; state.roundQuestions.push(q); }
    state.roundQuestions = shuffleArray(state.roundQuestions);
  } else {
    for (let i = 0; i < 15; i++) { let q = Object.assign({}, shuffledListen[i % shuffledListen.length]); q._examModeType = "listen_pick"; state.roundQuestions.push(q); }
  }
  renderCurrentQuestion();
}
