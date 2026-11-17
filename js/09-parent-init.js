/* ============================================================================
   PLIK: js/09-parent-init.js
   PIN, CENTRUM TESTOWE TATY, KOLEJKA SKRZYŃ, ZRÓWNANIE LEKCJI IGORA I START
   ============================================================================ */

function initPinKeyboard() {
  const grid = document.getElementById("pinKeyboardGrid");
  if (!grid) return;
  grid.innerHTML = [1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "OK"].map(k => `
    <button onclick="handlePinKey('${k}')" class="kid-card h-14 rounded-2xl bg-slate-100 border-2 border-slate-300 font-extrabold text-xl text-slate-800 hover:bg-slate-200 active:bg-slate-300 shadow-sm">${k}</button>
  `).join("");
}

function handlePinKey(k) {
  const inp = document.getElementById("pinInputField");
  const err = document.getElementById("pinErrorMsg");
  if (!inp) return;
  err.textContent = "";
  if (k === "C") inp.value = "";
  else if (k === "OK") verifyParentPin();
  else {
    if (inp.value.length < 4) inp.value += k;
    if (inp.value.length === 4) verifyParentPin();
  }
}

function openParentPinModal(target = "dashboard") {
  cancelAllSpeechAndTimers();
  window._pinModalTarget = target;
  const title = document.getElementById("pinModalTitle");
  const desc = document.getElementById("pinModalDesc");
  if (title && desc) {
    if (target === "mic_approve") {
      title.textContent = "Zatwierdź Wymowę";
      desc.textContent = "Tato, wpisz PIN, aby uznać słowo za zaliczone:";
    } else if (target === "tata_login") {
      title.textContent = "🔒 Profil: TATA (Konto Testowe)";
      desc.textContent = "Wpisz 4-cyfrowy kod PIN, aby wejść na profil Taty:";
    } else {
      title.textContent = "Panel Rodzica";
      desc.textContent = "Wpisz 4-cyfrowy kod PIN:";
    }
  }
  const inp = document.getElementById("pinInputField");
  if (inp) inp.value = "";
  const err = document.getElementById("pinErrorMsg");
  if (err) err.textContent = "";
  initPinKeyboard();
  const m = document.getElementById("parentPinModal");
  if (m) { m.classList.remove("hidden"); m.classList.add("flex"); }
}

function verifyParentPin() {
  const inp = document.getElementById("pinInputField");
  if (!inp) return;
  if (inp.value === PARENT_PIN) {
    closeParentPinModal();
    if (window._pinModalTarget === "mic_approve") approveMicAnswer("Tata potwierdza!");
    else if (window._pinModalTarget === "tata_login") chooseProfile("tata");
    else openParentDashboard();
  } else {
    playEffect("wrong");
    const err = document.getElementById("pinErrorMsg");
    if (err) err.textContent = "❌ Błędny PIN! Spróbuj ponownie.";
    inp.value = "";
  }
}

function closeParentPinModal() {
  const m = document.getElementById("parentPinModal");
  if (m) { m.classList.add("hidden"); m.classList.remove("flex"); }
}

function parentToggleEqualizeLessonForIgor(lessonId) {
  if (!Array.isArray(state.equalizedLessonsForIgor)) state.equalizedLessonsForIgor = [];
  const idx = state.equalizedLessonsForIgor.indexOf(lessonId);
  if (idx >= 0) {
    state.equalizedLessonsForIgor.splice(idx, 1);
  } else {
    state.equalizedLessonsForIgor.push(lessonId);
  }
  saveCloudData();
  renderParentTestCenter();
  if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
  const l = state.lessons.find(x => x.id === lessonId);
  const title = l ? l.title : lessonId;
  const active = state.equalizedLessonsForIgor.includes(lessonId);
  showParentMsg(active ? `✓ Lekcja „${title}” dla Igorka została zrównana z poziomem Huberta!` : `✓ Przywrócono standardowy poziom (4 l.) dla lekcji „${title}”.`);
}

function renderParentTestCenter() {
  const statusEl = document.getElementById("parentStatusMsg");
  if (!statusEl) return;
  let box = document.getElementById("parentTestCenterBox");
  if (!box) {
    box = document.createElement("div");
    box.id = "parentTestCenterBox";
    box.className = "mb-5 p-4 rounded-3xl bg-teal-50/95 border-2 border-teal-400 shadow-sm";
    statusEl.parentNode.insertBefore(box, statusEl.nextSibling);
  }

  const testLessons = state.lessons.filter(l => l.testOnly);
  const testWords = [];
  state.lessons.forEach(l => {
    if (!l.testOnly && Array.isArray(l.items)) {
      l.items.forEach((it, idx) => {
        if (it.testOnly) testWords.push({ lessonId: l.id, lessonTitle: l.title, wordIdx: idx, en: it.en, pl: it.pl, icon: it.icon || "📝" });
      });
    }
  });

  const totalPending = testLessons.length + testWords.length;
  const eqList = Array.isArray(state.equalizedLessonsForIgor) ? state.equalizedLessonsForIgor : [];

  let pendingListHtml = "";
  if (totalPending === 0) {
    pendingListHtml = `<div class="text-xs font-bold text-teal-800 bg-white/80 p-3 rounded-2xl border border-teal-200">✓ Wszystkie lekcje (w tym Pankejki) są trwale zatwierdzone i zapisane w chmurze dla Igora i Huberta!</div>`;
  } else {
    pendingListHtml = `
      <div class="space-y-1.5 mb-3 max-h-40 overflow-y-auto pr-1">
        ${testLessons.map(l => `
          <div class="flex items-center justify-between bg-white p-2 rounded-xl border border-teal-300 text-xs font-bold">
            <span>📚 Nowa lekcja: <strong>${l.title}</strong> (${l.items.length} słówek)</span>
            <button onclick="parentDeleteTestLesson('${l.id}')" class="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-[10px]">🗑️ Usuń</button>
          </div>
        `).join("")}
        ${testWords.map(w => `
          <div class="flex items-center justify-between bg-white p-2 rounded-xl border border-teal-300 text-xs font-bold">
            <span>${w.icon} Nowe słówko: <strong>${w.en}</strong> (${w.pl}) w „${w.lessonTitle}”</span>
            <button onclick="parentDeleteTestWord('${w.lessonId}', ${w.wordIdx})" class="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-[10px]">🗑️ Usuń</button>
          </div>
        `).join("")}
      </div>
      <button onclick="parentPublishAllTestItems()" class="kid-card w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl text-xs shadow">
        ✅ Zatwierdź trwale lekcje i słówka (${totalPending}) dla Igora i Huberta
      </button>
    `;
  }

  const equalizeLessonsHtml = `
    <div class="mt-3 p-3 rounded-2xl bg-white border-2 border-indigo-200">
      <div class="text-xs font-extrabold text-indigo-950 mb-1.5">👦➔🧑 Zrównanie poziomu wybranej lekcji Igorka z Hubertem (6 opcji i pełne słówka):</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-44 overflow-y-auto pr-1">
        ${state.lessons.map(l => {
          const isEq = eqList.includes(l.id);
          return `
            <button onclick="parentToggleEqualizeLessonForIgor('${l.id}')" class="flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-left text-xs font-bold transition-colors ${isEq ? 'bg-indigo-600 text-white border-indigo-800' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-indigo-50'}">
              <span class="truncate pr-1">${l.title}</span>
              <span class="shrink-0 text-[10px] px-1.5 py-0.5 rounded-md ${isEq ? 'bg-white text-indigo-900 font-extrabold' : 'bg-slate-200 text-slate-600'}">${isEq ? 'Poziom Huberta ✓' : 'Standard (4 l.)'}</span>
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;

  box.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
      <h3 class="font-extrabold text-teal-950 text-base">🧪 Centrum Testowe Taty (<span data-app-version>Wersja ${CURRENT_GAME_VERSION}</span>)</h3>
      <span class="px-2.5 py-0.5 rounded-full bg-teal-200 text-teal-950 font-extrabold text-xs">Oczekujące: ${totalPending}</span>
    </div>
    ${pendingListHtml}
    ${equalizeLessonsHtml}
    <div class="mt-3 pt-3 border-t border-teal-200 flex flex-wrap gap-2">
      <button onclick="unlockAllForTataOnly()" class="kid-card py-2 px-3 bg-emerald-700 text-white font-bold rounded-xl text-xs">🔓 Odblokuj 131 ubrań, 50 zwierzaków i Spiżarnię TYLKO u Taty</button>
      <button onclick="parentGiveTestChest('tata','gold')" class="kid-card py-2 px-3 bg-amber-400 text-amber-950 font-bold rounded-xl text-xs">👑 Złota Skrzynia (Tata)</button>
      <button onclick="parentResetWhatsNewGlow()" class="kid-card py-2 px-3 bg-rose-100 text-rose-900 border border-rose-300 font-bold rounded-xl text-xs">🔄 Zresetuj powiadomienie "Co nowego?"</button>
    </div>
  `;
}

function parentResetWhatsNewGlow() {
  if (!confirm("Czy na pewno zresetować status 'Co nowego?', aby okno i lektor ponownie uruchomiły się na profilach?")) return;
  ["igor", "hubert", "tata"].forEach(k => { if (state.stats[k]) state.stats[k].seenVersion = ""; });
  saveCloudData();
  if (typeof updateWhatsNewButtonGlow === "function") updateWhatsNewButtonGlow();
  showParentMsg("✓ Zresetowano okno 'Co nowego?' dla wszystkich profili!");
}

function parentPublishAllTestItems() {
  if (!confirm("Czy na pewno trwale zatwierdzić wszystkie lekcje i słówka dla Igora i Huberta?")) return;
  let count = 0;
  const approvedIds = new Set([...(state.approvedLessonIds || []), ...getStoredApprovedLessonIds()]);

  state.lessons.forEach(l => {
    if (l.testOnly) {
      delete l.testOnly;
      approvedIds.add(l.id);
      count++;
    }
    if (Array.isArray(l.items)) {
      l.items.forEach(it => {
        if (it.testOnly) {
          delete it.testOnly;
          approvedIds.add(`${l.id}::${(it.en || "").toLowerCase()}`);
          count++;
        }
      });
    }
  });

  persistApprovedLessonIds(Array.from(approvedIds));
  saveCloudData();
  renderParentTestCenter();
  if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
  showParentMsg(`✓ Trwale zatwierdzono ${count} nowości i zapisano w chmurze!`);
  alert(`✓ Wykonano! Zatwierdzone lekcje i słówka są teraz trwale zapisane na profilach chłopców.`);
}

function parentDeleteTestLesson(lessonId) {
  if (!confirm("Czy na pewno usunąć tę testową lekcję?")) return;
  state.lessons = state.lessons.filter(l => l.id !== lessonId);
  saveCloudData(); renderParentTestCenter();
  showParentMsg("✓ Usunięto testową lekcję.");
}

function parentDeleteTestWord(lessonId, wordIdx) {
  if (!confirm("Czy na pewno usunąć to testowe słówko?")) return;
  const l = state.lessons.find(x => x.id === lessonId);
  if (l && l.items[wordIdx]) l.items.splice(wordIdx, 1);
  saveCloudData(); renderParentTestCenter();
  showParentMsg("✓ Usunięto testowe słówko.");
}

function unlockAllForTataOnly() {
  if (!confirm("Czy na pewno odblokować wszystkie 131 ubrań, 50 zwierzaków oraz owoce i warzywa w Spiżarni na koncie testowym TATA?")) return;
  state.stats.tata = ensurePlayerStructure(state.stats.tata);
  state.stats.tata.unlockedItems = getAll131OutfitsFlat().map(o => o.src);
  state.stats.tata.memoryAnimals = (typeof COMPANION_PETS !== "undefined" ? COMPANION_PETS : []).map(a => a.id);
  if (typeof PET_FOOD_POOL !== "undefined") {
    PET_FOOD_POOL.forEach(f => { state.stats.tata.petFood[f.id] = 3; });
  }
  saveCloudData();
  showParentMsg("✓ Odblokowano wszystko (wraz ze Spiżarnią) na profilu TATA!");
}

function parentExportBackupJson() {
  if (!confirm("Czy na pewno pobrać plik kopii zapasowej (.json) ze wszystkimi postępami i lekcjami?")) return;
  const backupObj = {
    version: CURRENT_GAME_VERSION,
    exportedAt: new Date().toISOString(),
    stats: state.stats,
    calibration: state.calibration,
    questionsPerRound: state.questionsPerRound,
    approvedLessonIds: state.approvedLessonIds,
    equalizedLessonsForIgor: state.equalizedLessonsForIgor,
    lessons: state.lessons
  };
  const blob = new Blob([JSON.stringify(backupObj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `akademia_kopia_v${CURRENT_GAME_VERSION}_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showParentMsg("✓ Pobrano plik kopii zapasowej (.json)!");
}

function parentImportBackupJson(input) {
  if (!input.files || input.files.length === 0) return;
  if (!confirm("Czy na pewno wczytać kopię zapasową z pliku (.json)? Obecne postępy zostaną połączone/zaktualizowane!")) {
    input.value = ""; return;
  }
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!parsed || !parsed.stats) throw new Error("Nieprawidłowy plik");
      state.stats.igor = mergePlayerProgressSafe(state.stats.igor, parsed.stats.igor);
      state.stats.hubert = mergePlayerProgressSafe(state.stats.hubert, parsed.stats.hubert);
      state.stats.tata = mergePlayerProgressSafe(state.stats.tata, parsed.stats.tata);
      const importedStickers = Array.isArray(parsed.stats.stickers) ? parsed.stats.stickers : [];
      state.stats.stickers = Array.from(new Set([...(state.stats.stickers || []), ...importedStickers]));
      if (Array.isArray(parsed.approvedLessonIds)) persistApprovedLessonIds([...state.approvedLessonIds, ...parsed.approvedLessonIds]);
      if (Array.isArray(parsed.equalizedLessonsForIgor)) state.equalizedLessonsForIgor = Array.from(new Set([...state.equalizedLessonsForIgor, ...parsed.equalizedLessonsForIgor]));
      if (parsed.calibration) state.calibration = mergeCalibrationWithDefaults(parsed.calibration);
      if (parsed.questionsPerRound) state.questionsPerRound = parseInt(parsed.questionsPerRound) || 8;
      if (Array.isArray(parsed.lessons) && parsed.lessons.length) state.lessons = parsed.lessons;
      applyApprovedLessonsPersistence(state.lessons);
      normalizePancakesIconsInLessons(state.lessons);
      saveCloudData();
      if (typeof updateHeaderUI === "function") updateHeaderUI();
      openParentDashboard();
      showParentMsg("✓ Pomyślnie wczytano kopię zapasową z pliku!");
    } catch (err) {
      showParentMsg("❌ Błąd wczytywania pliku JSON! Sprawdź poprawność pliku.", true);
    }
    input.value = "";
  };
  reader.readAsText(file);
}

function openParentDashboard() {
  const m = document.getElementById("parentDashboardModal");
  if (m) { m.classList.remove("hidden"); m.classList.add("flex"); }
  renderParentTestCenter();
  syncVersionLabelsInDom();

  const keyInput = document.getElementById("parentGeminiKey");
  if (keyInput && !keyInput.value) {
    try { keyInput.value = localStorage.getItem("akademia_gemini_key") || ""; } catch (e) {}
  }

  const sel = document.getElementById("parentSelectLesson");
  if (sel) {
    sel.innerHTML = state.lessons
      .filter(l => l.type === "vocab" || l.type === "vocab_and_shop" || l.type === "vocab_and_pancakes")
      .map(l => `<option value="${l.id}">${l.title}${l.testOnly ? ' (🧪 TEST)' : ''}</option>`)
      .join("");
  }
  const lenBox = document.getElementById("roundLengthButtons");
  if (lenBox) {
    lenBox.innerHTML = [5, 8, 10, 15, 20].map(v => `
      <button onclick="parentSetQuestionsPerRound(${v})" class="px-3 py-1.5 rounded-xl text-xs font-bold border-2 ${state.questionsPerRound === v ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-slate-700 border-slate-300'}">${v}</button>
    `).join("");
  }
}

function closeParentDashboard() {
  const m = document.getElementById("parentDashboardModal");
  if (m) { m.classList.add("hidden"); m.classList.remove("flex"); }
}

function showParentMsg(txt, isErr = false) {
  const m = document.getElementById("parentStatusMsg");
  if (!m) return;
  m.textContent = txt; m.className = `mb-4 p-3 rounded-2xl border-2 font-bold text-sm text-center ${isErr ? 'bg-rose-100 border-rose-400 text-rose-900' : 'bg-emerald-100 border-emerald-400 text-emerald-900'}`;
  m.classList.remove("hidden");
  setTimeout(() => m.classList.add("hidden"), 4500);
}

function parentSetQuestionsPerRound(v) {
  if (!confirm(`Czy na pewno zmienić liczbę pytań w rundzie na ${v}?`)) return;
  state.questionsPerRound = v; saveCloudData(); openParentDashboard();
  showParentMsg(`✓ Ustawiono liczbę pytań w rundzie na: ${v}`);
}

function parentAutoSuggestSimpleWord() {
  const selectedLessonId = document.getElementById("parentSelectLesson") ? document.getElementById("parentSelectLesson").value : "";
  const existingWords = new Set();
  state.lessons.forEach(l => (l.items || []).forEach(it => existingWords.add((it.en || "").toLowerCase())));

  const pool = typeof AUTO_SIMPLE_WORDS_POOL !== "undefined" ? AUTO_SIMPLE_WORDS_POOL : [];
  let candidates = pool.filter(w => !existingWords.has(w.en.toLowerCase()) && w.lessonId === selectedLessonId);
  if (candidates.length === 0) {
    candidates = pool.filter(w => !existingWords.has(w.en.toLowerCase()));
  }
  if (candidates.length === 0) {
    return showParentMsg("Wszystkie proponowane proste słówka z puli zostały już dodane!", true);
  }

  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  const selEl = document.getElementById("parentSelectLesson");
  if (selEl && Array.from(selEl.options).some(o => o.value === picked.lessonId)) {
    selEl.value = picked.lessonId;
  }
  document.getElementById("parentWordEn").value = picked.en;
  document.getElementById("parentWordPl").value = picked.pl;
  document.getElementById("parentWordPhonetic").value = picked.phonetic || "";
  document.getElementById("parentWordIcon").value = picked.icon || "⭐";
  document.getElementById("parentWordAge").value = "4,6";
  playEffect("beep");
  showParentMsg(`✨ Dobrałem proste słówko: ${picked.icon} ${picked.en} (${picked.pl}). Kliknij „Zapisz słówko”!`)
}

function parentAddSingleWord() {
  const lid = document.getElementById("parentSelectLesson").value;
  const en = document.getElementById("parentWordEn").value.trim();
  const pl = document.getElementById("parentWordPl").value.trim();
  const ph = document.getElementById("parentWordPhonetic").value.trim();
  const ic = document.getElementById("parentWordIcon").value.trim();
  const age = document.getElementById("parentWordAge").value;

  if (!en || !pl) return showParentMsg("Wypełnij Angielski i Polski!", true);
  const lesson = state.lessons.find(l => l.id === lid);
  if (!lesson) return;
  if (!confirm(`Czy na pewno dodać nowe słówko "${en}" (${pl}) do lekcji "${lesson.title}" (w trybie testowym na koncie TATA)?`)) return;

  lesson.items.push({ en, pl, phonetic: ph, icon: ic || "📝", age: age.includes(",") ? [4, 6] : [parseInt(age)], testOnly: true });
  saveCloudData(); renderParentTestCenter();
  showParentMsg(`✓ Dodano słówko "${en}" na konto testowe TATA!`);
  document.getElementById("parentWordEn").value = ""; document.getElementById("parentWordPl").value = "";
  document.getElementById("parentWordPhonetic").value = ""; document.getElementById("parentWordIcon").value = "";
}

function parentCreateNewLesson() {
  const t = document.getElementById("newLessonTitle").value.trim();
  const ic = document.getElementById("newLessonIcon").value.trim();
  const text = document.getElementById("newLessonLines").value.trim();
  if (!t || !text) return showParentMsg("Wypełnij tytuł i słówka!", true);

  const lines = text.split("\n").filter(l => l.trim().length > 0);
  const items = [];
  lines.forEach(l => {
    const p = l.split("-").map(x => x.trim());
    if (p.length >= 2) items.push({ en: p[0], pl: p[1], icon: p[2] || "📝", age: [4, 6] });
  });
  if (items.length === 0) return showParentMsg("Nie rozpoznałem słówek. Użyj formatu: En - Pl - Ikona", true);
  if (!confirm(`Czy na pewno utworzyć nową lekcję "${t}" (${items.length} słówek) najpierw w trybie testowym na profilu TATA?`)) return;

  const nid = "custom_" + Date.now();
  state.lessons.push({ id: nid, title: t, subtitle: "Nowa lekcja (Rodzic)", icon: ic || "📚", color: "from-sky-400 to-indigo-500", borderColor: "border-sky-400", type: "vocab", testOnly: true, items });
  saveCloudData(); openParentDashboard();
  showParentMsg(`✓ Utworzono lekcję testową "${t}" na profilu TATA!`);
  document.getElementById("newLessonTitle").value = ""; document.getElementById("newLessonIcon").value = ""; document.getElementById("newLessonLines").value = "";
}

function parentScanWorksheetAI(input) {
  if (!input.files || input.files.length === 0) return;
  const key = document.getElementById("parentGeminiKey").value.trim();
  if (!key) return showParentMsg("Wpisz klucz API Gemini, aby użyć skanera!", true);
  try { localStorage.setItem("akademia_gemini_key", key); } catch (e) {}

  const age = document.getElementById("parentAiTargetAge").value;
  if (!confirm("Czy na pewno przesłać zdjęcie do analizy przez Gemini AI?")) { input.value = ""; return; }
  showParentMsg("Wysyłam do Gemini AI... To zajmie ok. 5-10 sekund.", false);

  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target.result.split(',')[1];
    try {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Jesteś asystentem edukacyjnym. Przeanalizuj to zdjęcie podręcznika/karty pracy z angielskiego. Wyodrębnij maksymalnie 15 najważniejszych słówek. Target: chłopcy ${age}. Zwróć wynik TYLKO jako czysty tekst w formacie: SłowoPoAngielsku - TłumaczeniePoPolsku - JednoEmoji (np. Apple - Jabłko - 🍎). Żadnego innego tekstu.` }, { inline_data: { mime_type: file.type, data: base64 } }] }]
        })
      });
      const data = await resp.json();
      const raw = data.candidates[0].content.parts[0].text;
      document.getElementById("newLessonLines").value = raw.trim();
      const title = document.getElementById("newLessonTitle");
      if (!title.value) title.value = "Lekcja z karty (" + new Date().toLocaleDateString() + ")";
      showParentMsg("✓ Sukces! Słówka zostały rozpoznane i wstawione do pola.");
    } catch (err) {
      showParentMsg("Błąd połączenia z AI. Sprawdź klucz i internet.", true);
    }
    input.value = "";
  };
  reader.readAsDataURL(file);
}

function parentGiveTestChest(profKey, tier) {
  const kidName = profKey === "hubert" ? "Huberta" : profKey === "tata" ? "Taty" : "Igora";
  const tierName = tier === "gold" ? "Złotą" : tier === "silver" ? "Srebrną" : "Brązową";
  if (!confirm(`Czy na pewno wysłać ${tierName} skrzynię dla gracza: ${kidName}?`)) return;

  // Jeśli przyznajemy skrzynię synowi (Igor lub Hubert), trafia ona bezpośrednio do jego kolejki nagród,
  // aby otworzył ją po wejściu na swój profil!
  if (profKey === "igor" || profKey === "hubert") {
    const p = ensurePlayerStructure(state.stats[profKey]);
    if (!Array.isArray(p.pendingChests)) p.pendingChests = [];
    p.pendingChests.push({ tier, reason: "Prezent od Taty!", addedAt: new Date().toISOString() });
    state.stats[profKey] = p;
    saveCloudData();
    showParentMsg(`✓ Wysłano ${tierName} skrzynię do kolejki nagród gracza ${kidName}! Otworzy ją po wejściu na swój profil.`);
    if (state.profile === profKey) {
      closeParentDashboard();
      checkPendingDadChestsForPlayer(profKey);
    }
    return;
  }

  closeParentDashboard();
  renderChestOpeningInsidePopup(profKey, tier, `🛠️ Testowa Skrzynia (${tierName} - ${kidName})`);
}

function unlockAllOutfitsForTesting() {
  if (!confirm("Czy na pewno odblokować wszystkie 131 przebrań i 50 zwierzaków u WSZYSTKICH graczy (Igor, Hubert, Tata)?")) return;
  ["igor", "hubert", "tata"].forEach(p => {
    state.stats[p] = ensurePlayerStructure(state.stats[p]);
    state.stats[p].unlockedItems = getAll131OutfitsFlat().map(o => o.src);
    state.stats[p].memoryAnimals = (typeof COMPANION_PETS !== "undefined" ? COMPANION_PETS : []).map(a => a.id);
  });
  saveCloudData();
  showParentMsg("✓ Odblokowano 131 przebrań i 50 zwierzaków u wszystkich graczy!");
}

function lockAllOutfitsAfterTesting() {
  if (!confirm("Czy na pewno zablokować wszystkie ubrania oraz zwierzaki i przywrócić gołego awatara u wszystkich graczy?")) return;
  ["igor", "hubert", "tata"].forEach(p => {
    state.stats[p] = ensurePlayerStructure(state.stats[p]);
    state.stats[p].unlockedItems = [];
    state.stats[p].memoryAnimals = [];
    state.stats[p].avatar = { head: "", torso: "", legs: "", pet: "" };
  });
  saveCloudData();
  showParentMsg("✓ Zablokowano ubrania i zwierzaki (awatary są teraz bez przebrań).");
}

function resetEverythingAll() {
  if (confirm("⚠️ OSTRZEŻENIE: Czy na pewno usunąć WSZYSTKIE postępy, gwiazdki, puchary i naklejki obu chłopców oraz Taty?")) {
    if (confirm("Czy jesteś w 100% pewien? Tej operacji nie można cofnąć!")) {
      state.stats = {
        igor: createDefaultPlayerStats(),
        hubert: createDefaultPlayerStats(),
        tata: createDefaultPlayerStats(),
        stickers: []
      };
      saveCloudData();
      alert("✓ Wykonano! Cała gra została zresetowana do stanu początkowego.");
      location.reload();
    }
  }
}

function openGuideModal() { const m = document.getElementById("guideModal"); if (m) { m.classList.remove("hidden"); m.classList.add("flex"); } }
function closeGuideModal() { const m = document.getElementById("guideModal"); if (m) { m.classList.add("hidden"); m.classList.remove("flex"); } }

window.addEventListener("DOMContentLoaded", () => {
  syncVersionLabelsInDom();
  loadCloudData();
});
