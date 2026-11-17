/* ============================================================================
   PLIK: js/09-main-ui.js
   GŁÓWNE MENU, NAGŁÓWEK PROFILI, STAŁY POJEDYNEK BRACI I START APLIKACJI
   ============================================================================ */

function updateHeaderUI() {
  const header = document.getElementById("appHeader");
  if (!header) return;

  const profKey = getActiveProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  const petObj = (typeof COMPANION_PETS !== "undefined" ? COMPANION_PETS : []).find(x => x.id === (p.equipped && p.equipped.pet)) || { icon: "🦉", pl: "Sówka" };

  header.innerHTML = `
    <div class="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
      <!-- PRZEŁĄCZNIK PROFILI -->
      <div class="flex items-center gap-1.5">
        <button onclick="switchUserProfile('igor')"
          class="kid-card px-3 py-1.5 rounded-2xl font-extrabold text-xs md:text-sm border-2 flex items-center gap-1 ${
            state.profile === 'igor' ? 'bg-amber-400 text-amber-950 border-amber-600 shadow' : 'bg-white text-slate-600 border-slate-200 hover:bg-amber-50'
          }">
          <span>👦</span><span>Igor (4 l.)</span>
        </button>

        <button onclick="switchUserProfile('hubert')"
          class="kid-card px-3 py-1.5 rounded-2xl font-extrabold text-xs md:text-sm border-2 flex items-center gap-1 ${
            state.profile === 'hubert' ? 'bg-sky-600 text-white border-sky-800 shadow' : 'bg-white text-slate-600 border-slate-200 hover:bg-sky-50'
          }">
          <span>🧑</span><span>Hubert (6 l.)</span>
        </button>

        <button onclick="switchUserProfile('tata')"
          class="kid-card px-2.5 py-1.5 rounded-2xl font-extrabold text-xs border-2 ${
            state.profile === 'tata' ? 'bg-slate-800 text-white border-slate-950 shadow' : 'bg-slate-100 text-slate-600 border-slate-300'
          }" title="Tryb podglądu i testów Taty">
          <span>🛠️ Tata</span>
        </button>
      </div>

      <!-- STATYSTYKI, AWATAR I PANEL RODZICA -->
      <div class="flex items-center gap-2">
        <button onclick="openAvatarWardrobeModal('wardrobe')"
          class="kid-card px-3 py-1.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-300 flex items-center gap-1.5 shadow-sm">
          <span class="text-lg">${petObj.icon}</span>
          <span class="font-extrabold text-xs text-indigo-950">Awatar</span>
        </button>

        <div class="px-3 py-1.5 rounded-2xl bg-amber-50 border-2 border-amber-300 font-extrabold text-xs md:text-sm text-amber-900 flex items-center gap-2">
          <span>⭐ ${p.stars || 0}</span>
          <span class="text-amber-300">|</span>
          <span>🏆 ${p.cups || 0}</span>
        </div>

        <button onclick="openParentPanelModal()"
          class="kid-card px-2.5 py-1.5 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs shadow" title="Panel Rodzica">
          🔒 Rodzic
        </button>
      </div>
    </div>
  `;
}

function switchUserProfile(newProf) {
  cancelAllSpeechAndTimers();
  state.profile = newProf;
  state.isCoopDragonMode = false;
  state.isExamMode = false;
  state.isHardWordsMode = false;
  playEffect("beep");

  updateHeaderUI();
  showLessonMenu();

  // Sprawdź, czy dla Igora lub Huberta czekają skrzynie przyznane przez Tatę z Panelu Rodzica
  if (newProf === "igor" || newProf === "hubert") {
    checkPendingParentChests(newProf);
  }
}

function showLessonMenu() {
  cancelAllSpeechAndTimers();
  const mc = document.getElementById("mainContainer");
  if (!mc) return;

  const profKey = getActiveProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  const isIgor = isEffectiveIgorMode();

  // Filtrowanie lekcji: widoczne są wszystkie standardowe + zatwierdzone lekcje testowe (lub wszystkie w profilu Taty)
  const visibleLessons = state.lessons.filter(l => !l.isTestLesson || isTestLessonApproved(l.id));

  const colorMap = {
    amber:   "border-amber-300 bg-amber-50/50 hover:border-amber-500",
    pink:    "border-pink-300 bg-pink-50/50 hover:border-pink-500",
    sky:     "border-sky-300 bg-sky-50/50 hover:border-sky-500",
    emerald: "border-emerald-300 bg-emerald-50/50 hover:border-emerald-500",
    rose:    "border-rose-300 bg-rose-50/50 hover:border-rose-500",
    orange:  "border-orange-300 bg-orange-50/50 hover:border-orange-500",
    indigo:  "border-indigo-300 bg-indigo-50/50 hover:border-indigo-500",
    teal:    "border-teal-300 bg-teal-50/50 hover:border-teal-500",
    purple:  "border-purple-300 bg-purple-50/50 hover:border-purple-500"
  };

  mc.innerHTML = `
    <div class="space-y-4">
      <!-- POWITANIE I STAŁE TRYBY SPECJALNE (POJEDYNEK BRACI + WALKA ZE SMOKIEM) -->
      <div class="bg-white rounded-3xl shadow-md border-3 border-sky-200 p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div class="text-center md:text-left">
          <h1 class="text-xl md:text-2xl font-extrabold text-slate-900">
            Cześć, ${p.name}! ${isIgor ? "👦" : "🧑"}
          </h1>
          <p class="text-xs font-bold text-slate-500">
            Wybierz lekcję poniżej albo zagraj razem z bratem!
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-2.5 w-full md:w-auto">
          <!-- STAŁY PRZYCISK POJEDYNKU BRACI -->
          <button onclick="startBrothersDuel()"
            class="kid-card flex-1 md:flex-initial px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs md:text-sm shadow-lg flex items-center justify-center gap-2">
            <span class="text-xl">⚔️</span>
            <span>Pojedynek Braci (VS)</span>
          </button>

          <!-- WSPÓLNA WALKA ZE SMOKIEM -->
          <button onclick="startCoopDragonBattle()"
            class="kid-card flex-1 md:flex-initial px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-extrabold text-xs md:text-sm shadow-lg flex items-center justify-center gap-2">
            <span class="text-xl">🐉</span>
            <span>Walka ze Smokiem!</span>
          </button>
        </div>
      </div>

      <!-- SIATKA LEKCJI -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        ${visibleLessons.map(lesson => {
          const completedCount = (p.lessonCounts && p.lessonCounts[lesson.id]) || 0;
          const cardColors = colorMap[lesson.color] || "border-slate-200 bg-white hover:border-sky-400";
          const isPancake = lesson.id === "pancakes_cooking";
          const isLeveledUp = state.lessonOverrides && state.lessonOverrides[lesson.id] === "equal_to_hubert";

          return `
            <div class="rounded-3xl border-3 ${cardColors} bg-white p-4 shadow-sm flex flex-col justify-between">
              <div class="flex items-start justify-between gap-2 mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="text-4xl">${lesson.icon}</div>
                  <div>
                    <h3 class="font-extrabold text-base text-slate-900 leading-tight">${lesson.title}</h3>
                    <div class="text-[11px] font-bold text-slate-500">
                      Ukończono: ${completedCount}x ${isLeveledUp ? '• <span class="text-sky-700">Poziom Huberta</span>' : ''}
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid ${isPancake ? 'grid-cols-3' : 'grid-cols-2'} gap-1.5">
                <button onclick="startFlashcards('${lesson.id}')"
                  class="kid-card py-2 px-2 rounded-xl bg-white hover:bg-indigo-50 border-2 border-indigo-200 text-indigo-900 font-extrabold text-xs">
                  🃏 Fiszki
                </button>

                <button onclick="startLesson('${lesson.id}','listen_pick')"
                  class="kid-card py-2 px-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs shadow-sm">
                  👂 Quiz
                </button>

                ${isPancake ? `
                  <button onclick="startLesson('pancakes_cooking','pancake_cooking_game')"
                    class="kid-card py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-sm">
                    👨‍🍳 Kuchnia
                  </button>
                ` : ""}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

// INICJALIZACJA CAŁEJ APLIKACJI PO ZAŁADOWANIU STRONY
async function bootstrapAkademiaApp() {
  if (typeof applyAppVersionToDom === "function") {
    applyAppVersionToDom();
  }

  await loadCloudData();
  initializeLessonsData();

  updateHeaderUI();
  showLessonMenu();

  // Sprawdź skrzynie od Taty na starcie oraz okno "Co nowego?"
  checkPendingParentChests(getActiveProfileKey());
  checkAndShowWhatsNewOnStartup();
}

document.addEventListener("DOMContentLoaded", bootstrapAkademiaApp);
