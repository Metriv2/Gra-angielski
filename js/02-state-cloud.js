/* ============================================================================
   PLIK: js/02-state-cloud.js
   STAN GRY, ZAPIS W CHMURZE I LOCALSTORAGE, TRWAŁOŚĆ LEKCJI I SKRZYŃ RODZICA
   ============================================================================ */

const STORAGE_KEY_STATS = "akademia_ang_stats_v14";
const STORAGE_KEY_GLOBAL = "akademia_ang_global_v14";

function createDefaultPlayerStats(name, age) {
  return {
    name,
    age,
    stars: 0,
    cups: 0,
    perfectRounds: 0,
    examsDone: 0,
    duelsWon: 0,
    streakDays: 1,
    lastPlayDate: new Date().toISOString().slice(0, 10),
    unlockedClothes: ["shirt_basic", "pants_basic", "shoes_basic"],
    unlockedPets: ["owl"],
    unlockedStickers: [],
    pantry: { apple: 2, banana: 2, carrot: 2 },
    petXp: { owl: 0 },
    equipped: {
      hat: null,
      shirt: "shirt_basic",
      pants: "pants_basic",
      shoes: "shoes_basic",
      accessory: null,
      pet: "owl",
      doctorCalib: null
    },
    lessonCounts: {},
    hardWords: [],
    achievements: [],
    pendingChests: [], // Skrzynie przyznane przez Tatę z Panelu Rodzica czekające na otwarcie
    dailyQuests: { date: "", list: [] }
  };
}

const state = {
  profile: "igor", // "igor" | "hubert" | "tata" | "duel"
  tataPreviewAsIgor: false,
  lessons: [],
  customWords: [],
  // Trwała lista zatwierdzonych przez Rodzica lekcji (nie resetuje się przy poprawkach kodu):
  approvedTestLessons: ["pancakes_cooking"],
  // Ewentualne nadpisania poziomów lekcji (np. wyrównanie lekcji Igora do Huberta):
  lessonOverrides: {},
  stats: {
    igor: createDefaultPlayerStats("Igor", 4),
    hubert: createDefaultPlayerStats("Hubert", 6),
    tata: createDefaultPlayerStats("Tata (Tester)", 6)
  },
  // Stan aktywnej rundy
  currentLessonId: null,
  lastPlayedLessonId: null,
  currentSubMode: "listen_pick",
  lastPlayedSubMode: "listen_pick",
  roundQuestions: [],
  roundIndex: 0,
  roundScore: 0,
  roundMistakes: 0,
  roundResults: [],
  answeredCurrent: false,
  currentQuestionMistakes: 0,
  // Tryby specjalne
  isExamMode: false,
  isHardWordsMode: false,
  isCoopDragonMode: false,
  duelTurn: "igor",
  duelScores: { igor: 0, hubert: 0 },
  duelReadyWaiting: false,
  dragonBattle: {
    dragonHp: 10,
    maxDragonHp: 10,
    teamHp: 5,
    maxTeamHp: 5,
    micQuestionsDone: 0,
    statusText: "🐉 Groźny Smok strzeże skarbu! Odpowiadajcie poprawnie, aby zadać mu cios!"
  },
  shopCart: [],
  pancakeState: null,
  rewardQueue: [],
  isSpeaking: false
};

function ensurePlayerStructure(raw, fallbackName = "Gracz", fallbackAge = 5) {
  const base = createDefaultPlayerStats(fallbackName, fallbackAge);
  if (!raw || typeof raw !== "object") return base;
  return {
    ...base,
    ...raw,
    unlockedClothes: Array.isArray(raw.unlockedClothes) ? raw.unlockedClothes : base.unlockedClothes,
    unlockedPets: Array.isArray(raw.unlockedPets) ? raw.unlockedPets : base.unlockedPets,
    unlockedStickers: Array.isArray(raw.unlockedStickers) ? raw.unlockedStickers : [],
    pantry: { ...base.pantry, ...(raw.pantry || {}) },
    petXp: { ...base.petXp, ...(raw.petXp || {}) },
    equipped: { ...base.equipped, ...(raw.equipped || {}) },
    lessonCounts: { ...(raw.lessonCounts || {}) },
    hardWords: Array.isArray(raw.hardWords) ? raw.hardWords : [],
    achievements: Array.isArray(raw.achievements) ? raw.achievements : [],
    pendingChests: Array.isArray(raw.pendingChests) ? raw.pendingChests : [],
    dailyQuests: raw.dailyQuests && Array.isArray(raw.dailyQuests.list) ? raw.dailyQuests : base.dailyQuests
  };
}

function getActiveProfileKey() {
  if (state.profile === "hubert" || state.profile === "tata") return state.profile;
  return "igor";
}

function isEffectiveIgorMode() {
  if (state.profile === "igor") return true;
  if (state.profile === "hubert") return false;
  if (state.profile === "tata") return !!state.tataPreviewAsIgor;
  if (state.profile === "duel" || state.isCoopDragonMode) return state.duelTurn === "igor";
  return true;
}

// Sprawdzanie, czy lekcja testowa jest odblokowana dla chłopców (trwałe)
function isTestLessonApproved(lessonId) {
  if (state.profile === "tata") return true;
  return Array.isArray(state.approvedTestLessons) && state.approvedTestLessons.includes(lessonId);
}

// Zatwierdzanie lub ukrywanie lekcji testowej z Panelu Rodzica (zapis trwały)
function setTestLessonApproval(lessonId, approved) {
  if (!Array.isArray(state.approvedTestLessons)) state.approvedTestLessons = [];
  if (approved && !state.approvedTestLessons.includes(lessonId)) {
    state.approvedTestLessons.push(lessonId);
  } else if (!approved) {
    state.approvedTestLessons = state.approvedTestLessons.filter(id => id !== lessonId);
  }
  saveCloudData();
}

// Dodanie skrzyni z Panelu Rodzica bezpośrednio do profilu Igora lub Huberta
function grantChestFromParent(targetProfKey, chestType = "gold", reason = "Nagroda od Taty!") {
  if (!state.stats[targetProfKey]) return;
  const p = ensurePlayerStructure(state.stats[targetProfKey]);
  p.pendingChests.push({
    id: "chest_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
    type: chestType,
    reason,
    grantedAt: new Date().toISOString()
  });
  state.stats[targetProfKey] = p;
  saveCloudData();
}

// Sprawdzenie po wejściu na profil, czy czekają skrzynie przyznane przez Rodzica
function checkPendingParentChests(profKey) {
  if (profKey !== "igor" && profKey !== "hubert") return;
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (p.pendingChests.length > 0) {
    while (p.pendingChests.length > 0) {
      const ch = p.pendingChests.shift();
      state.rewardQueue.push({
        profKey,
        achievement: { name: ch.reason || "Skrzynia od Taty!" },
        chestType: ch.type || "gold"
      });
    }
    state.stats[profKey] = p;
    saveCloudData();
    if (typeof processNextRewardInQueue === "function") {
      setTimeout(processNextRewardInQueue, 350);
    }
  }
}

// Zapis lokalny i synchronizacja z Google Apps Script
function saveCloudData() {
  const payload = {
    stats: state.stats,
    approvedTestLessons: state.approvedTestLessons,
    lessonOverrides: state.lessonOverrides,
    customWords: state.customWords,
    updatedAt: Date.now()
  };

  try {
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(payload));
  } catch (e) {
    console.warn("Błąd zapisu localStorage:", e);
  }

  const url = (typeof APP_CONFIG !== "undefined" && APP_CONFIG.gasWebAppUrl) || "";
  if (url && url.startsWith("http")) {
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "save", data: payload })
    }).catch(err => console.warn("Błąd synchronizacji z chmurą GAS:", err));
  }
}

async function loadCloudData() {
  // 1. Odczyt natychmiastowy z localStorage
  try {
    const rawLocal = localStorage.getItem(STORAGE_KEY_STATS);
    if (rawLocal) {
      const parsed = JSON.parse(rawLocal);
      applyLoadedPayload(parsed);
    }
  } catch (e) {
    console.warn("Błąd odczytu localStorage:", e);
  }

  // 2. Odczyt z chmury Google Apps Script (jeśli skonfigurowany)
  const url = (typeof APP_CONFIG !== "undefined" && APP_CONFIG.gasWebAppUrl) || "";
  if (url && url.startsWith("http")) {
    try {
      const res = await fetch(`${url}?action=load&t=${Date.now()}`);
      if (res.ok) {
        const cloudJson = await res.json();
        if (cloudJson && cloudJson.data) {
          applyLoadedPayload(cloudJson.data);
          localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(cloudJson.data));
        }
      }
    } catch (e) {
      console.warn("Tryb offline – używam danych lokalnych:", e);
    }
  }
}

function applyLoadedPayload(data) {
  if (!data || typeof data !== "object") return;
  if (data.stats) {
    state.stats.igor = ensurePlayerStructure(data.stats.igor, "Igor", 4);
    state.stats.hubert = ensurePlayerStructure(data.stats.hubert, "Hubert", 6);
    state.stats.tata = ensurePlayerStructure(data.stats.tata, "Tata (Tester)", 6);
  }
  if (Array.isArray(data.approvedTestLessons)) {
    state.approvedTestLessons = data.approvedTestLessons;
  }
  if (data.lessonOverrides && typeof data.lessonOverrides === "object") {
    state.lessonOverrides = data.lessonOverrides;
  }
  if (Array.isArray(data.customWords)) {
    state.customWords = data.customWords;
  }
}
