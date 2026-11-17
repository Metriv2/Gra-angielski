/* ============================================================================
   PLIK: js/08-parent-panel.js
   PANEL RODZICA: SKRZYNIE DLA CHŁOPCÓW, TRWAŁE LEKCJE, POZIOMY I AUTO-SŁÓWKA
   ============================================================================ */

function openParentPanelModal() {
  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("modalContent");
  if (!overlay || !content) return;

  const igor = ensurePlayerStructure(state.stats.igor, "Igor", 4);
  const hubert = ensurePlayerStructure(state.stats.hubert, "Hubert", 6);
  const testLessons = state.lessons.filter(l => l.isTestLesson);

  content.innerHTML = `
    <div class="bg-white rounded-3xl shadow-2xl border-4 border-slate-700 p-5 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between border-b-2 border-slate-100 pb-3 mb-4">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">🔒 Panel Rodzica (v${typeof APP_CONFIG !== "undefined" ? APP_CONFIG.version : "14.0"})</h2>
          <p class="text-xs font-bold text-slate-500">Zarządzanie nagrodami, lekcjami i poziomem trudności chłopców</p>
        </div>
        <button onclick="closeModal()" class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 font-extrabold text-slate-700">✕</button>
      </div>

      <!-- 1. PRZYZNAWANIE SKRZYŃ CHŁOPCOM (TRAFIAJĄ DO KOLEJKI NA ICH PROFILU) -->
      <div class="bg-amber-50 rounded-2xl p-4 border-2 border-amber-300 mb-4">
        <div class="font-extrabold text-sm text-amber-950 mb-1">🎁 Przyznaj Skrzynię ze Skarbami</div>
        <p class="text-xs font-bold text-slate-600 mb-3">
          Skrzynia zapisze się w profilu chłopca – po wejściu na swój profil od razu będzie mógł ją otworzyć!
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <!-- IGOR -->
          <div class="bg-white p-3 rounded-xl border-2 border-amber-200">
            <div class="flex items-center justify-between mb-2">
              <span class="font-extrabold text-sm text-slate-900">👦 Igor (${igor.stars} ⭐)</span>
              <span class="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                W kolejce: ${igor.pendingChests.length}
              </span>
            </div>
            <div class="grid grid-cols-3 gap-1.5">
              <button onclick="parentGrantChestAction('igor','bronze')" class="kid-card py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs">📦 Brąz</button>
              <button onclick="parentGrantChestAction('igor','silver')" class="kid-card py-2 rounded-xl bg-slate-600 hover:bg-slate-700 text-white font-extrabold text-xs">🥈 Srebro</button>
              <button onclick="parentGrantChestAction('igor','gold')"   class="kid-card py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-yellow-950 font-extrabold text-xs">👑 Złoto</button>
            </div>
          </div>

          <!-- HUBERT -->
          <div class="bg-white p-3 rounded-xl border-2 border-sky-200">
            <div class="flex items-center justify-between mb-2">
              <span class="font-extrabold text-sm text-slate-900">🧑 Hubert (${hubert.stars} ⭐)</span>
              <span class="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-sky-100 text-sky-900">
                W kolejce: ${hubert.pendingChests.length}
              </span>
            </div>
            <div class="grid grid-cols-3 gap-1.5">
              <button onclick="parentGrantChestAction('hubert','bronze')" class="kid-card py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs">📦 Brąz</button>
              <button onclick="parentGrantChestAction('hubert','silver')" class="kid-card py-2 rounded-xl bg-slate-600 hover:bg-slate-700 text-white font-extrabold text-xs">🥈 Srebro</button>
              <button onclick="parentGrantChestAction('hubert','gold')"   class="kid-card py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-yellow-950 font-extrabold text-xs">👑 Złoto</button>
            </div>
          </div>
        </div>
        <div id="parentChestFeedback" class="text-xs font-extrabold text-emerald-700 mt-2 min-h-[18px]"></div>
      </div>

      <!-- 2. TRWAŁE ZATWIERDZANIE NOWYCH LEKCJI TESTOWYCH -->
      <div class="bg-indigo-50 rounded-2xl p-4 border-2 border-indigo-200 mb-4">
        <div class="font-extrabold text-sm text-indigo-950 mb-1">🚀 Nowe lekcje (Trwałe odblokowanie dla chłopców)</div>
        <p class="text-xs font-bold text-slate-600 mb-2.5">
          Zatwierdzone lekcje zapisują się na stałe w chmurze i nie znikają po odświeżeniu gry.
        </p>
        <div class="space-y-2">
          ${testLessons.map(lesson => {
            const isApproved = Array.isArray(state.approvedTestLessons) && state.approvedTestLessons.includes(lesson.id);
            return `
              <div class="bg-white p-3 rounded-xl border border-indigo-200 flex items-center justify-between gap-2">
                <div class="font-extrabold text-sm text-slate-900">${lesson.icon} ${lesson.title}</div>
                <button onclick="toggleParentTestLesson('${lesson.id}')"
                  class="kid-card px-3.5 py-1.5 rounded-xl font-extrabold text-xs ${
                    isApproved ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-700"
                  }">
                  ${isApproved ? "✅ Odblokowana dla chłopców" : "🔒 Ukryta (Kliknij aby włączyć)"}
                </button>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <!-- 3. WYRÓWNYWANIE LEKCJI IGORKA DO HUBERTA -->
      <div class="bg-sky-50 rounded-2xl p-4 border-2 border-sky-200 mb-4">
        <div class="font-extrabold text-sm text-sky-950 mb-1">📈 Poziom Igorka: Wyrównaj wybrane lekcje do Huberta</div>
        <p class="text-xs font-bold text-slate-600 mb-2.5">
          Gdy Igor opanuje podstawy, włącz mu pełny zestaw trudniejszych słówek Huberta w wybranej lekcji:
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
          ${state.lessons.map(lesson => {
            const isLeveled = state.lessonOverrides && state.lessonOverrides[lesson.id] === "equal_to_hubert";
            return `
              <button onclick="toggleIgorEqualToHubert('${lesson.id}')"
                class="p-2.5 rounded-xl border text-left flex items-center justify-between gap-2 ${
                  isLeveled ? "bg-sky-600 text-white border-sky-700" : "bg-white text-slate-800 border-sky-200 hover:bg-sky-100/50"
                }">
                <span class="font-extrabold text-xs truncate">${lesson.icon} ${lesson.title}</span>
                <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                  isLeveled ? "bg-white text-sky-800" : "bg-slate-100 text-slate-600"
                }">${isLeveled ? "Poziom Huberta ✓" : "Standard (4 l.)"}</span>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <!-- 4. DODAWANIE NOWYCH SŁÓWEK (RĘCZNIE LUB AUTOMATYCZNIE) -->
      <div class="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-200">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div class="font-extrabold text-sm text-emerald-950">➕ Dodaj nowe słówko do lekcji</div>
          <button onclick="autoAddSimpleWordFromParent()" class="kid-card px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow">
            🎲 Dodaj automatycznie (proste słówko)
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2">
          <select id="parentWordLesson" class="p-2 rounded-xl border-2 border-emerald-300 bg-white text-xs font-bold">
            ${state.lessons.map(l => `<option value="${l.id}">${l.icon} ${l.title}</option>`).join("")}
          </select>
          <input id="parentWordEn" type="text" placeholder="Po angielsku (np. Fox)" class="p-2 rounded-xl border-2 border-emerald-300 bg-white text-xs font-bold" />
          <input id="parentWordPl" type="text" placeholder="Po polsku (np. Lis)" class="p-2 rounded-xl border-2 border-emerald-300 bg-white text-xs font-bold" />
          <input id="parentWordIcon" type="text" placeholder="Ikona (np. 🦊)" class="p-2 rounded-xl border-2 border-emerald-300 bg-white text-xs font-bold" />
        </div>

        <button onclick="manualAddCustomWordFromParent()" class="kid-card w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs">
          💾 Zapisz własne słówko
        </button>
        <div id="parentWordFeedback" class="text-xs font-extrabold text-emerald-800 mt-2 min-h-[18px]"></div>
      </div>
    </div>
  `;

  overlay.classList.remove("hidden");
}

function parentGrantChestAction(profKey, chestType) {
  const names = { bronze: "Brązową Skrzynię 📦", silver: "Srebrną Skrzynię 🥈", gold: "Złotą Skrzynię 👑" };
  const boyName = profKey === "igor" ? "Igora" : "Huberta";
  grantChestFromParent(profKey, chestType, `Nagroda od Taty dla ${boyName}!`);
  playEffect("success");
  openParentPanelModal();
  const fb = document.getElementById("parentChestFeedback");
  if (fb) fb.textContent = `✅ Dodano ${names[chestType]} do profilu ${boyName}! Otworzy ją po przełączeniu na swój profil.`;

  // Jeśli aktywny jest teraz profil tego chłopca, od razu uruchom kolejkowanie skrzyni
  if (state.profile === profKey) {
    closeModal();
    checkPendingParentChests(profKey);
  }
}

function toggleParentTestLesson(lessonId) {
  const currentlyApproved = Array.isArray(state.approvedTestLessons) && state.approvedTestLessons.includes(lessonId);
  setTestLessonApproval(lessonId, !currentlyApproved);
  playEffect("beep");
  openParentPanelModal();
  if (typeof showLessonMenu === "function") showLessonMenu();
}

function toggleIgorEqualToHubert(lessonId) {
  if (!state.lessonOverrides) state.lessonOverrides = {};
  if (state.lessonOverrides[lessonId] === "equal_to_hubert") {
    delete state.lessonOverrides[lessonId];
  } else {
    state.lessonOverrides[lessonId] = "equal_to_hubert";
  }
  saveCloudData();
  playEffect("beep");
  openParentPanelModal();
}

function manualAddCustomWordFromParent() {
  const lessonId = document.getElementById("parentWordLesson").value;
  const en = (document.getElementById("parentWordEn").value || "").trim();
  const pl = (document.getElementById("parentWordPl").value || "").trim();
  const icon = (document.getElementById("parentWordIcon").value || "🌟").trim();
  const fb = document.getElementById("parentWordFeedback");

  if (!en || !pl) {
    playEffect("wrong");
    if (fb) fb.textContent = "❌ Wpisz słówko po angielsku oraz po polsku!";
    return;
  }

  const newWordObj = { lessonId, en, pl, phonetic: en.toLowerCase(), icon, age: [4, 6] };
  state.customWords.push(newWordObj);
  initializeLessonsData();
  saveCloudData();
  playEffect("success");

  document.getElementById("parentWordEn").value = "";
  document.getElementById("parentWordPl").value = "";
  document.getElementById("parentWordIcon").value = "";
  if (fb) fb.textContent = `✅ Dodano słówko "${en}" (${pl})! Trafiło też do Pojedynku Braci i Smoka.`;
}

function autoAddSimpleWordFromParent() {
  const fb = document.getElementById("parentWordFeedback");
  const unused = AUTO_SIMPLE_WORDS_POOL.filter(cand =>
    !state.lessons.some(l => l.items.some(it => it.en.toLowerCase() === cand.en.toLowerCase()))
  );

  if (unused.length === 0) {
    playEffect("beep");
    if (fb) fb.textContent = "ℹ️ Wszystkie automatyczne słówka z puli zostały już dodane!";
    return;
  }

  const chosen = unused[Math.floor(Math.random() * unused.length)];
  state.customWords.push({ ...chosen });
  initializeLessonsData();
  saveCloudData();
  playEffect("success");

  const lessonObj = state.lessons.find(l => l.id === chosen.lessonId);
  if (fb) {
    fb.textContent = `🎲 Automatycznie dodano: ${chosen.icon} ${chosen.en} (${chosen.pl}) do lekcji "${lessonObj ? lessonObj.title : chosen.lessonId}"!`;
  }
}
