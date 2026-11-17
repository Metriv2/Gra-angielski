/* ============================================================================
   PLIK: js/03-state-cloud.js
   STAN GRY, URODZINY, KOLEJKA SKRZYŃ SYNA, TRWAŁE LEKCJE I SYNCHRONIZACJA GAS
   ============================================================================ */

const PROFILE_META = {
  igor:   { name: "IGOR",   birthDate: "2022-06-29", icon: "👦" },
  hubert: { name: "HUBERT", birthDate: "2020-08-17", icon: "🧑" },
  tata:   { name: "TATA",   birthDate: "1989-08-06", icon: "👨‍💻" }
};

function getPlayerAge(profKey) {
  const meta = PROFILE_META[profKey];
  if (!meta || !meta.birthDate) return 0;
  const today = new Date();
  const [y, m, d] = meta.birthDate.split("-").map(Number);
  let age = today.getFullYear() - y;
  const mDiff = (today.getMonth() + 1) - m;
  if (mDiff < 0 || (mDiff === 0 && today.getDate() < d)) age--;
  return age;
}

function isPlayerBirthdayToday(profKey) {
  const meta = PROFILE_META[profKey];
  if (!meta || !meta.birthDate) return false;
  const today = new Date();
  const [y, m, d] = meta.birthDate.split("-").map(Number);
  return (today.getMonth() + 1) === m && today.getDate() === d;
}

function checkAndAwardBirthdayChest(profKey) {
  if (!PROFILE_META[profKey]) return;
  const p = ensurePlayerStructure(state.stats[profKey]);
  state.stats[profKey] = p;
  const currentYear = new Date().getFullYear();
  if (isPlayerBirthdayToday(profKey) && p.lastBirthdayRewardYear !== currentYear) {
    p.lastBirthdayRewardYear = currentYear;
    saveCloudData();
    const age = getPlayerAge(profKey);
    const name = PROFILE_META[profKey].name;
    setTimeout(() => {
      if (typeof renderChestOpeningInsidePopup === "function") {
        renderChestOpeningInsidePopup(profKey, "gold", `🎂 Sto lat ${name}! Dziś kończysz ${age} lat! Oto Urodzinowa Złota Skrzynia!`);
      }
      speakSequence([
        { lang: "pl", text: `Sto lat, sto lat! Wszystkiego najlepszego z okazji ${age} urodzin ${name}! W nagrodę otrzymujesz urodzinową złotą skrzynię!` }
      ]);
    }, 550);
  }
}

function checkPendingDadChestsForPlayer(profKey) {
  if (!PROFILE_META[profKey]) return;
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (!Array.isArray(p.pendingChests) || p.pendingChests.length === 0) return;

  const chestsToQueue = [...p.pendingChests];
  p.pendingChests = [];
  state.stats[profKey] = p;
  saveCloudData();

  chestsToQueue.forEach(item => {
    const tier = typeof item === "string" ? item : (item.tier || "bronze");
    const reason = (typeof item === "object" && item.reason) ? item.reason : "Nagroda od Taty!";
    state.rewardQueue.push({
      profKey,
      achievement: { name: reason, tier: tier === "gold" ? 4 : tier === "silver" ? 2 : 1 },
      chestType: tier,
      fromDad: true
    });
  });

  setTimeout(() => {
    if (typeof processNextRewardInQueue === "function") processNextRewardInQueue();
  }, 450);
}

const DEFAULT_AVATAR_CALIBRATION = {
  cap:         { label: "🧢 Czapki (Brązowa i Srebrna)", top: 2,  width: 34, height: 22, scaleX: 1.00, scaleY: 1.00 },
  goldCap:     { label: "👑 Czapki (Złota)",             top: -3, width: 48, height: 31, scaleX: 1.06, scaleY: 1.06 },
  helmet:      { label: "🪖 Pełne Maski (Złote)",        top: -2, width: 52, height: 36, scaleX: 1.08, scaleY: 1.08 },
  openHelmet:  { label: "👷 Hełmy otwarte (Strażak)",    top: -5, width: 50, height: 35, scaleX: 1.04, scaleY: 1.04 },
  shirt:       { label: "👕 Wszystkie Koszulki",         top: 31, width: 37, height: 27, scaleX: 0.88, scaleY: 0.92 },
  armor:       { label: "🛡️ Kurtki i Zbroje (Złote)",    top: 28, width: 45, height: 33, scaleX: 0.96, scaleY: 0.98 },
  jeans:       { label: "👖 Jeansy (Brązowa - 1:1)",     top: 0,  width: 100, height: 100, scaleX: 1.00, scaleY: 1.00 },
  silverPants: { label: "👖 Długie spodnie (Srebrna)",   top: 49, width: 54, height: 42, scaleX: 1.00, scaleY: 1.00 },
  shorts:      { label: "🩳 Krótkie spodenki",           top: 51, width: 42, height: 27, scaleX: 0.95, scaleY: 1.00 },
  goldShorts:  { label: "🩳 Spodenki piłkarskie",        top: 49, width: 50, height: 31, scaleX: 1.00, scaleY: 1.00 },
  goldPants:   { label: "🥾 Spodnie z butami",           top: 48, width: 56, height: 50, scaleX: 1.00, scaleY: 1.00 }
};

window._calibOpen = false;
window._calibActiveType = "shirt";

function mergeCalibrationWithDefaults(rawCal) {
  const merged = {};
  Object.keys(DEFAULT_AVATAR_CALIBRATION).forEach(k => {
    merged[k] = { ...DEFAULT_AVATAR_CALIBRATION[k], ...((rawCal && rawCal[k]) || {}) };
  });
  return merged;
}

function loadInitialCalibrationFromStorage() {
  try {
    const saved = localStorage.getItem("akademia_avatar_calib_v4");
    if (saved) return mergeCalibrationWithDefaults(JSON.parse(saved));
  } catch (e) {}
  return mergeCalibrationWithDefaults(null);
}

const PARENT_PIN = APP_CONFIG.parentPin;
const GAS_API_URL = APP_CONFIG.gasApiUrl;

let audioCtx = null;
let activeSpeechToken = 0;
let pendingAdvanceTimer = null;
let cloudSyncReady = false;

function createDefaultPlayerStats() {
  return {
    stars: 0, cups: 0, perfectRounds: 0, examsDone: 0, duelsWon: 0, streakDays: 0, lastPlayDate: "", micCount: 0,
    lastBirthdayRewardYear: 0, nakedStartMigrated: true, seenVersion: "",
    badges: [], avatar: { head: "", torso: "", legs: "", pet: "" },
    unlockedItems: [], memoryAnimals: [], hardWords: [],
    pendingChests: [],
    petFood: {}, petXp: {},
    dailyQuest: { date: "", type: "", title: "", target: 1, progress: 0, rewardStars: 30, claimed: false },
    lessonCounts: {}, equipped: {}
  };
}

function resolveOutfitPath(pathOrId) {
  if (!pathOrId) return "";
  const legacyMap = {
    red_cap: "grafiki/cap_red.png",
    hero_shirt: "grafiki/shirt_blue.png",
    "grafiki/Shirt_blue.png": "grafiki/shirt_blue.png",
    "grafiki/srebrna/Shirt_pigeon.png": "grafiki/srebrna/shirt_pigeon.png",
    "grafiki/srebrna/Shirt_T-Rex.png": "grafiki/srebrna/shirt_T-Rex.png",
    jeans: "grafiki/jeans_blue.png",
    space_helmet: "grafiki/zlota/helmet_astronaut.png"
  };
  if (legacyMap[pathOrId]) return legacyMap[pathOrId];
  if (pathOrId.includes("/")) return pathOrId;
  return "grafiki/" + pathOrId.replace(/\.png$/i, "") + ".png";
}

function getFallbackOutfitPath(src) {
  if (!src) return "";
  if (src.startsWith("grafiki/zlota/")) return src.replace("grafiki/zlota/", "grafiki/srebrna/zlota/");
  return src;
}

function ensurePlayerStructure(p) {
  const def = createDefaultPlayerStats();
  if (!p) return def;

  if (!p.nakedStartMigrated) {
    const oldStarter = ["grafiki/cap_red.png", "grafiki/shirt_blue.png", "grafiki/Shirt_blue.png", "grafiki/jeans_blue.png"];
    p.unlockedItems = (p.unlockedItems || []).filter(it => !oldStarter.includes(it));
    p.memoryAnimals = (p.memoryAnimals || []).filter(id => !["mem_dog", "mem_cat", "mem_rabbit", "mem_fox", "p_dog", "p_cat", "p_rabbit", "p_fox"].includes(id));
    p.avatar = { head: "", torso: "", legs: "", pet: "" };
    p.nakedStartMigrated = true;
  }

  const rawUnlocked = Array.isArray(p.unlockedItems) ? p.unlockedItems.map(resolveOutfitPath).filter(Boolean) : [];
  const rawAnimals = Array.isArray(p.memoryAnimals)
    ? p.memoryAnimals.map(id => String(id).replace(/^mem_/, "p_")).filter(Boolean)
    : [];
  const rawAvatar = p.avatar || def.avatar;

  return {
    ...def, ...p, lessonCounts: p.lessonCounts || {},
    lastBirthdayRewardYear: p.lastBirthdayRewardYear || 0,
    nakedStartMigrated: true,
    seenVersion: p.seenVersion || "",
    badges: Array.isArray(p.badges) ? p.badges : [],
    unlockedItems: Array.from(new Set(rawUnlocked)),
    memoryAnimals: Array.from(new Set(rawAnimals)),
    hardWords: Array.isArray(p.hardWords) ? p.hardWords : [],
    pendingChests: Array.isArray(p.pendingChests) ? p.pendingChests : [],
    petFood: (p.petFood && typeof p.petFood === "object") ? p.petFood : {},
    petXp: (p.petXp && typeof p.petXp === "object") ? p.petXp : {},
    dailyQuest: (p.dailyQuest && typeof p.dailyQuest === "object") ? { ...def.dailyQuest, ...p.dailyQuest } : def.dailyQuest,
    avatar: {
      head: rawAvatar.head ? resolveOutfitPath(rawAvatar.head) : "",
      torso: rawAvatar.torso ? resolveOutfitPath(rawAvatar.torso) : "",
      legs: rawAvatar.legs ? resolveOutfitPath(rawAvatar.legs) : "",
      pet: rawAvatar.pet ? String(rawAvatar.pet).replace(/^mem_/, "p_") : ""
    },
    equipped: { ...def.equipped, ...(p.equipped || {}) }
  };
}

function mergePlayerProgressSafe(localRaw, cloudRaw) {
  const loc = ensurePlayerStructure(localRaw);
  const cld = ensurePlayerStructure(cloudRaw);
  if (!cloudRaw) return loc;
  if (!localRaw) return cld;

  const mergedLessonCounts = { ...loc.lessonCounts };
  Object.keys(cld.lessonCounts || {}).forEach(k => {
    mergedLessonCounts[k] = Math.max(mergedLessonCounts[k] || 0, cld.lessonCounts[k] || 0);
  });

  const mergedPetXp = { ...loc.petXp };
  Object.keys(cld.petXp || {}).forEach(k => {
    mergedPetXp[k] = Math.max(mergedPetXp[k] || 0, cld.petXp[k] || 0);
  });

  const mergedPetFood = { ...cld.petFood };
  Object.keys(loc.petFood || {}).forEach(k => {
    if (mergedPetFood[k] === undefined) mergedPetFood[k] = loc.petFood[k];
  });

  return {
    ...loc,
    ...cld,
    stars: Math.max(loc.stars || 0, cld.stars || 0),
    cups: Math.max(loc.cups || 0, cld.cups || 0),
    perfectRounds: Math.max(loc.perfectRounds || 0, cld.perfectRounds || 0),
    examsDone: Math.max(loc.examsDone || 0, cld.examsDone || 0),
    duelsWon: Math.max(loc.duelsWon || 0, cld.duelsWon || 0),
    streakDays: Math.max(loc.streakDays || 0, cld.streakDays || 0),
    micCount: Math.max(loc.micCount || 0, cld.micCount || 0),
    lastPlayDate: (cld.lastPlayDate || "") >= (loc.lastPlayDate || "") ? cld.lastPlayDate : loc.lastPlayDate,
    lastBirthdayRewardYear: Math.max(loc.lastBirthdayRewardYear || 0, cld.lastBirthdayRewardYear || 0),
    seenVersion: cld.seenVersion || loc.seenVersion || "",
    badges: Array.from(new Set([...(loc.badges || []), ...(cld.badges || [])])),
    unlockedItems: Array.from(new Set([...(loc.unlockedItems || []), ...(cld.unlockedItems || [])])),
    memoryAnimals: Array.from(new Set([...(loc.memoryAnimals || []), ...(cld.memoryAnimals || [])])),
    hardWords: (cld.hardWords && cld.hardWords.length > 0) ? cld.hardWords : (loc.hardWords || []),
    pendingChests: [...(cld.pendingChests || []), ...(loc.pendingChests || [])].filter((v, i, arr) => arr.findIndex(x => JSON.stringify(x) === JSON.stringify(v)) === i),
    petFood: mergedPetFood,
    petXp: mergedPetXp,
    lessonCounts: mergedLessonCounts,
    avatar: {
      head: cld.avatar.head || loc.avatar.head || "",
      torso: cld.avatar.torso || loc.avatar.torso || "",
      legs: cld.avatar.legs || loc.avatar.legs || "",
      pet: cld.avatar.pet || loc.avatar.pet || ""
    },
    equipped: { ...(loc.equipped || {}), ...(cld.equipped || {}) }
  };
}

var state = {
  profile: null, tataPreviewAsIgor: false,
  turtleMode: false, questionsPerRound: 8, currentLessonId: null, currentSubMode: "listen_pick",
  isExamMode: false, isHardWordsMode: false, isCoopDragonMode: false,
  roundIndex: 0, roundQuestions: [], roundResults: [], currentQuestionMistakes: 0,
  roundScore: 0, roundMistakes: 0, answeredCurrent: false, flashcardIndex: 0, shopCart: [], riddleHintShown: false,
  letterBuilt: "", letterPool: [],
  duelScores: { igor: 0, hubert: 0 }, duelTurn: "igor", duelReadyWaiting: false,
  dragonBattle: { dragonHp: 10, maxDragonHp: 10, teamHp: 4, maxTeamHp: 4, statusText: "", animClass: "" },
  selectedStickerCat: "all", selectedBadgeCat: "all", selectedWardrobeTier: "all", rewardQueue: [],
  featuresPublishedForKids: true,
  approvedLessonIds: [],
  equalizedLessonsForIgor: [],
  lessons: JSON.parse(JSON.stringify(FULL_LESSONS_DATABASE)),
  calibration: loadInitialCalibrationFromStorage(),
  stats: {
    igor: createDefaultPlayerStats(),
    hubert: createDefaultPlayerStats(),
    tata: createDefaultPlayerStats(),
    stickers: []
  },
  memoryGameCards: [], memoryFlippedIndexes: [], memoryMatchedPairs: 0
};

function getStoredApprovedLessonIds() {
  try {
    const raw = localStorage.getItem("akademia_approved_lessons_v1");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
}

function persistApprovedLessonIds(idsArr) {
  const unique = Array.from(new Set((idsArr || []).filter(Boolean)));
  state.approvedLessonIds = unique;
  state.stats.approvedLessonIds = unique;
  try { localStorage.setItem("akademia_approved_lessons_v1", JSON.stringify(unique)); } catch (e) {}
}

function applyApprovedLessonsPersistence(lessonsArr) {
  const approvedSet = new Set([
    ...(state.approvedLessonIds || []),
    ...((state.stats && state.stats.approvedLessonIds) || []),
    ...getStoredApprovedLessonIds()
  ]);
  persistApprovedLessonIds(Array.from(approvedSet));
  (lessonsArr || []).forEach(l => {
    if (approvedSet.has(l.id) && l.testOnly) {
      delete l.testOnly;
    }
    if (Array.isArray(l.items)) {
      l.items.forEach(it => {
        if (approvedSet.has(`${l.id}::${(it.en || "").toLowerCase()}`) && it.testOnly) {
          delete it.testOnly;
        }
      });
    }
  });
}

function normalizePancakesIconsInLessons(lessonsArr) {
  const pLesson = (lessonsArr || []).find(l => l.id === "pancakes_cooking");
  if (!pLesson || !Array.isArray(pLesson.items)) return;
  pLesson.items.forEach(it => {
    const k = (it.en || "").toLowerCase();
    if (k === "flour") it.icon = getCustomPancakeSvg("flour", 64);
    if (k === "yoghurt") it.icon = getCustomPancakeSvg("yoghurt", 64);
    if (k === "oil") it.icon = getCustomPancakeSvg("oil", 64);
  });
}

function isEffectiveIgorMode(lessonIdOverride = null) {
  const activeLid = lessonIdOverride || state.currentLessonId;
  const eqList = Array.isArray(state.equalizedLessonsForIgor)
    ? state.equalizedLessonsForIgor
    : ((state.stats && Array.isArray(state.stats.equalizedLessonsForIgor)) ? state.stats.equalizedLessonsForIgor : []);

  if (activeLid && eqList.includes(activeLid)) {
    return false; // Zrównane z poziomem Huberta!
  }
  if (state.profile === "igor") return true;
  if (state.profile === "tata" && state.tataPreviewAsIgor) return true;
  if ((state.profile === "duel" || state.isCoopDragonMode) && state.duelTurn === "igor") return true;
  return false;
}

function toggleTataPreviewAge() {
  if (state.profile !== "tata") return;
  state.tataPreviewAsIgor = !state.tataPreviewAsIgor;
  playEffect("beep");
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  if (state.currentLessonId && typeof startLesson === "function" && state.currentLessonId !== "grand_exam" && state.currentLessonId !== "hard_words_training" && state.currentLessonId !== "dragon_coop") {
    startLesson(state.currentLessonId, state.currentSubMode);
  } else if (typeof showLessonMenu === "function") {
    showLessonMenu();
  }
}

function getAvatarCalibration() {
  if (typeof state !== "undefined" && state && state.calibration) return state.calibration;
  return loadInitialCalibrationFromStorage();
}

function saveAvatarCalibration(cal) {
  state.calibration = mergeCalibrationWithDefaults(cal);
  state.stats.calibration = state.calibration;
  try { localStorage.setItem("akademia_avatar_calib_v4", JSON.stringify(state.calibration)); } catch (e) {}
  saveCloudData();
}

function areNewFeaturesActive() {
  return true;
}

// ------------------------------------------------------------------------
// KOMUNIKACJA Z CHMURĄ (ZAPIS / ODCZYT Z OCHRONĄ POSTĘPÓW I LEKCJI)
// ------------------------------------------------------------------------
function loadCloudData() {
  let localStatsCache = null;
  let localLessonsCache = null;
  try {
    const localSaved = localStorage.getItem("akademia_save_v14") || localStorage.getItem("akademia_save_v12") || localStorage.getItem("akademia_save_v10");
    if (localSaved) {
      const parsed = JSON.parse(localSaved);
      if (parsed.stats) {
        localStatsCache = parsed.stats;
        state.stats.igor = ensurePlayerStructure(parsed.stats.igor);
        state.stats.hubert = ensurePlayerStructure(parsed.stats.hubert);
        state.stats.tata = ensurePlayerStructure(parsed.stats.tata);
        if (Array.isArray(parsed.stats.stickers)) state.stats.stickers = parsed.stats.stickers;
        if (Array.isArray(parsed.stats.approvedLessonIds)) persistApprovedLessonIds(parsed.stats.approvedLessonIds);
        if (Array.isArray(parsed.stats.equalizedLessonsForIgor)) state.equalizedLessonsForIgor = parsed.stats.equalizedLessonsForIgor;
        if (parsed.stats.calibration) state.calibration = mergeCalibrationWithDefaults(parsed.stats.calibration);
      }
      if (Array.isArray(parsed.lessons)) localLessonsCache = parsed.lessons;
      if (parsed.calibration) state.calibration = mergeCalibrationWithDefaults(parsed.calibration);
      if (parsed.questionsPerRound) state.questionsPerRound = parseInt(parsed.questionsPerRound) || 8;
    }
  } catch (e) {}

  fetch(GAS_API_URL)
    .then(res => res.json())
    .then(data => {
      if (data.stats) {
        const pStats = JSON.parse(data.stats);
        state.stats.igor = mergePlayerProgressSafe(localStatsCache && localStatsCache.igor, pStats.igor);
        state.stats.hubert = mergePlayerProgressSafe(localStatsCache && localStatsCache.hubert, pStats.hubert);
        state.stats.tata = mergePlayerProgressSafe(localStatsCache && localStatsCache.tata, pStats.tata);
        const localStickers = (localStatsCache && Array.isArray(localStatsCache.stickers)) ? localStatsCache.stickers : [];
        const cloudStickers = Array.isArray(pStats.stickers) ? pStats.stickers : [];
        state.stats.stickers = Array.from(new Set([...localStickers, ...cloudStickers]));

        const cloudApproved = Array.isArray(pStats.approvedLessonIds) ? pStats.approvedLessonIds : [];
        persistApprovedLessonIds([...state.approvedLessonIds, ...cloudApproved, ...getStoredApprovedLessonIds()]);

        const cloudEq = Array.isArray(pStats.equalizedLessonsForIgor) ? pStats.equalizedLessonsForIgor : [];
        state.equalizedLessonsForIgor = Array.from(new Set([...(state.equalizedLessonsForIgor || []), ...cloudEq]));

        if (pStats.calibration) {
          state.calibration = mergeCalibrationWithDefaults(pStats.calibration);
          state.stats.calibration = state.calibration;
          try { localStorage.setItem("akademia_avatar_calib_v4", JSON.stringify(state.calibration)); } catch (err) {}
        }
      }

      const mergeLessonLists = (incomingLessons) => {
        if (!Array.isArray(incomingLessons)) return;
        const baseIds = FULL_LESSONS_DATABASE.map(l => l.id);
        incomingLessons.forEach(cl => {
          if (baseIds.includes(cl.id)) {
            const target = state.lessons.find(l => l.id === cl.id);
            if (target && Array.isArray(cl.items)) {
              const knownEn = new Set(target.items.map(x => x.en.toLowerCase()));
              cl.items.forEach(it => {
                if (!knownEn.has(it.en.toLowerCase())) target.items.push(it);
              });
            }
          } else {
            const existingCustom = state.lessons.find(l => l.id === cl.id);
            if (!existingCustom) {
              state.lessons.push(cl);
            } else if (!cl.testOnly && existingCustom.testOnly) {
              delete existingCustom.testOnly;
            }
          }
        });
      };

      state.lessons = JSON.parse(JSON.stringify(FULL_LESSONS_DATABASE));
      if (localLessonsCache) mergeLessonLists(localLessonsCache);
      if (data.lessons) mergeLessonLists(JSON.parse(data.lessons));

      applyApprovedLessonsPersistence(state.lessons);
      normalizePancakesIconsInLessons(state.lessons);

      if (data.questionsPerRound) state.questionsPerRound = parseInt(data.questionsPerRound) || 8;
      cloudSyncReady = true;
      saveCloudData();
      if (typeof updateHeaderUI === "function") updateHeaderUI();
      if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
      else if (typeof showStartScreen === "function") showStartScreen();
    })
    .catch(err => {
      console.error("Błąd pobierania danych:", err);
      applyApprovedLessonsPersistence(state.lessons);
      normalizePancakesIconsInLessons(state.lessons);
      cloudSyncReady = true;
      if (typeof updateHeaderUI === "function") updateHeaderUI();
      if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
      else if (typeof showStartScreen === "function") showStartScreen();
    });
}

function saveCloudData() {
  state.stats.featuresPublishedForKids = true;
  state.stats.approvedLessonIds = Array.from(new Set([...(state.approvedLessonIds || []), ...getStoredApprovedLessonIds()]));
  state.stats.equalizedLessonsForIgor = Array.isArray(state.equalizedLessonsForIgor) ? state.equalizedLessonsForIgor : [];
  state.stats.calibration = state.calibration;
  try {
    const serialized = JSON.stringify({
      stats: state.stats,
      lessons: state.lessons,
      questionsPerRound: state.questionsPerRound,
      calibration: state.calibration
    });
    localStorage.setItem("akademia_save_v14", serialized);
    localStorage.setItem("akademia_save_v12", serialized);
  } catch (e) {}
  if (!cloudSyncReady) return;
  const payload = {
    action: "save",
    data: {
      stats: state.stats,
      calibration: state.calibration,
      lessons: state.lessons,
      questionsPerRound: state.questionsPerRound
    }
  };
  fetch(GAS_API_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "text/plain;charset=utf-8" }
  }).catch(err => console.error("Błąd zapisu:", err));
}

function updateDailyStreakForPlayer(profKey) {
  const p = state.stats[profKey];
  if (!p) return;
  const today = new Date().toISOString().slice(0, 10);
  if (p.lastPlayDate === today) return;
  if (!p.lastPlayDate) p.streakDays = 1;
  else {
    const diffDays = Math.round((new Date(today) - new Date(p.lastPlayDate)) / (1000 * 60 * 60 * 24));
    p.streakDays = diffDays === 1 ? (p.streakDays || 1) + 1 : (diffDays > 1 ? 1 : p.streakDays);
  }
  p.lastPlayDate = today;
}
