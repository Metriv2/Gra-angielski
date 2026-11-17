/* ============================================================================
   PLIK: js/06-games-core.js
   FISZKI, QUIZY, LITERKI, MIKROFON, POJEDYNEK BRACI ORAZ WALKA ZE SMOKIEM
   ============================================================================ */

// 1. GÓRNY PASEK POSTĘPU W TRAKCIE LEKCJI
function renderTopGameBar(lesson) {
  if (!lesson && !state.isCoopDragonMode && state.profile !== "duel") return "";

  if (state.isCoopDragonMode) {
    return `
      <div class="bg-slate-900 text-white rounded-2xl p-3 mb-3 border-2 border-amber-500 flex items-center justify-between shadow">
        <div class="font-extrabold text-sm text-amber-300">🐉 Wspólna Walka ze Smokiem (Igor + Hubert)</div>
        <button onclick="exitSpecialModeToMenu()" class="px-3 py-1 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-bold">Uciekaj do Menu 🏠</button>
      </div>
    `;
  }

  if (state.profile === "duel") {
    return `
      <div class="bg-indigo-900 text-white rounded-2xl p-3 mb-3 border-2 border-indigo-400 flex items-center justify-between shadow">
        <div class="font-extrabold text-sm">⚔️ Pojedynek Braci: Igor (${state.duelScores.igor}) vs Hubert (${state.duelScores.hubert})</div>
        <button onclick="exitSpecialModeToMenu()" class="px-3 py-1 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-xs font-bold">Zakończ 🏠</button>
      </div>
    `;
  }

  const totalQ = state.roundQuestions.length || 1;
  const flashBtn   = `<button onclick="startFlashcards('${lesson.id}')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'flashcards' ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-indigo-50 text-indigo-800 border-indigo-300'}">🃏 Fiszki</button>`;
  const quizBtn    = `<button onclick="startLesson('${lesson.id}','listen_pick')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'listen_pick' ? 'bg-sky-500 text-white border-sky-600' : 'bg-white text-slate-700 border-slate-200'}">👂 Quiz</button>`;
  const lettersBtn = `<button onclick="startLesson('${lesson.id}','letters_game')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'letters_game' ? 'bg-purple-600 text-white border-purple-700' : 'bg-purple-50 text-purple-900 border-purple-300'}">🧩 Literki</button>`;
  const micBtn     = `<button onclick="startLesson('${lesson.id}','mic_game')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'mic_game' ? 'bg-rose-600 text-white border-rose-700' : 'bg-white text-slate-700 border-slate-200'}">🎤 Wymowa</button>`;

  const specialBtn = lesson.id === "pancakes_cooking"
    ? `<button onclick="startLesson('pancakes_cooking','pancake_cooking_game')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 bg-amber-50 text-amber-900 border-amber-300">👨‍🍳 Kuchnia</button>`
    : "";

  const tataSwitchBar = state.profile === "tata"
    ? `<button onclick="toggleTataPreviewAge()" class="px-2.5 py-1 rounded-xl font-extrabold text-xs border-2 ${state.tataPreviewAsIgor ? 'bg-amber-400 text-amber-950 border-amber-600' : 'bg-sky-600 text-white border-sky-800'}">${state.tataPreviewAsIgor ? '👦 Widok: IGOR 🔄' : '🧑 Widok: HUBERT 🔄'}</button>`
    : "";

  let dotsHtml = "";
  if (state.currentSubMode !== "flashcards") {
    for (let i = 0; i < totalQ; i++) {
      let badgeTxt = `${i + 1}`;
      let bg = "bg-slate-200 text-slate-600 border-slate-300";
      if (i < state.roundIndex) {
        bg = state.roundResults[i] === "correct" ? "bg-emerald-500 text-white border-emerald-600" : "bg-amber-500 text-white border-amber-600";
        badgeTxt = state.roundResults[i] === "correct" ? "✓" : "✗";
      } else if (i === state.roundIndex) {
        bg = "bg-amber-400 text-amber-950 border-amber-600 ring-2 ring-amber-600 animate-pulse font-extrabold";
      }
      dotsHtml += `<div class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${bg}">${badgeTxt}</div>`;
    }
  }

  return `
    <div class="bg-white/95 rounded-2xl p-3 mb-3 border-2 border-sky-300 flex flex-col gap-2 shadow-sm">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex flex-wrap gap-1.5 items-center">${flashBtn}${quizBtn}${specialBtn}${lettersBtn}${micBtn}${tataSwitchBar}</div>
        <button onclick="showLessonMenu()" class="px-3 py-1 rounded-xl bg-slate-100 text-xs font-bold hover:bg-slate-200">Menu 🏠</button>
      </div>
      ${dotsHtml ? `<div class="flex flex-wrap items-center justify-center gap-1.5 pt-2 border-t border-slate-100"><span class="text-[10px] font-bold text-slate-500 mr-2 uppercase">Postęp:</span>${dotsHtml}</div>` : ""}
    </div>
  `;
}

function exitSpecialModeToMenu() {
  cancelAllSpeechAndTimers();
  state.isCoopDragonMode = false;
  state.isExamMode = false;
  state.isHardWordsMode = false;
  if (state.profile === "duel") state.profile = "igor";
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  showLessonMenu();
}

function toggleTataPreviewAge() {
  state.tataPreviewAsIgor = !state.tataPreviewAsIgor;
  playEffect("beep");
  if (state.currentLessonId) {
    if (state.currentSubMode === "flashcards") startFlashcards(state.currentLessonId);
    else startLesson(state.currentLessonId, state.currentSubMode);
  }
}

// 2. TRYB FISZEK (NAUKA SŁÓWEK PRZED QUIZEM)
function startFlashcards(lessonId) {
  cancelAllSpeechAndTimers();
  const lesson = state.lessons.find(l => l.id === lessonId);
  if (!lesson) return;

  state.currentLessonId = lessonId;
  state.lastPlayedLessonId = lessonId;
  state.currentSubMode = "flashcards";
  state.lastPlayedSubMode = "flashcards";

  const items = getItemsForPlayerAndLesson(lessonId);
  const mc = document.getElementById("mainContainer");
  if (!mc) return;

  mc.innerHTML = `
    ${renderTopGameBar(lesson)}
    <div class="bg-white rounded-3xl shadow-xl border-4 border-indigo-300 p-4 md:p-6">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h2 class="text-xl md:text-2xl font-extrabold text-slate-900">${lesson.icon} Fiszki: ${lesson.title}</h2>
          <p class="text-xs font-bold text-slate-500">Kliknij dowolną kartę, aby posłuchać wymowy!</p>
        </div>
        <button onclick="startLesson('${lesson.id}','listen_pick')" class="kid-card px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow">
          Przejdź do Quizu ➔
        </button>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        ${items.map(it => `
          <div onclick="speakSequence([{lang:'en',text:'${it.en.replace(/'/g,"\\'")}'},{lang:'pl',text:'${it.pl.replace(/'/g,"\\'")}'}])"
            class="kid-card cursor-pointer rounded-2xl border-3 border-indigo-100 hover:border-indigo-400 bg-indigo-50/30 p-3 text-center flex flex-col items-center justify-between shadow-sm">
            <div class="text-5xl my-2 flex items-center justify-center h-16">${it.icon}</div>
            <div class="font-extrabold text-base text-slate-900">${it.en}</div>
            <div class="text-[11px] font-bold text-indigo-600">[${it.phonetic || it.en.toLowerCase()}]</div>
            <div class="text-xs font-bold text-slate-500 mt-0.5">${it.pl}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

// 3. START LEKCJI (QUIZ / LITERKI / MIKROFON / KUCHNIA)
function startLesson(lessonId, subMode = "listen_pick") {
  cancelAllSpeechAndTimers();
  const lesson = state.lessons.find(l => l.id === lessonId);
  if (!lesson) return;

  state.isCoopDragonMode = false;
  state.isExamMode = false;
  state.isHardWordsMode = false;
  state.currentLessonId = lessonId;
  state.lastPlayedLessonId = lessonId;
  state.currentSubMode = subMode;
  state.lastPlayedSubMode = subMode;

  if (subMode === "pancake_cooking_game" && typeof startPancakeCookingGame === "function") {
    startPancakeCookingGame(lesson);
    return;
  }

  const items = getItemsForPlayerAndLesson(lessonId);
  state.roundQuestions = shuffleArray(items).slice(0, Math.min(8, items.length));
  state.roundIndex = 0;
  state.roundScore = 0;
  state.roundMistakes = 0;
  state.roundResults = [];
  state.answeredCurrent = false;

  renderCurrentQuestion();
}

function startNextSequentialLesson() {
  const available = state.lessons.filter(l => !l.isTestLesson || isTestLessonApproved(l.id));
  if (available.length === 0) { showLessonMenu(); return; }
  const idx = available.findIndex(l => l.id === state.currentLessonId);
  const next = available[(idx + 1) % available.length];
  startLesson(next.id, next.id === "pancakes_cooking" ? "pancake_cooking_game" : "listen_pick");
}

function renderCurrentQuestion() {
  if (state.isCoopDragonMode) {
    renderDragonBattleQuestion();
    return;
  }
  if (state.profile === "duel") {
    renderDuelQuestion();
    return;
  }

  const lesson = state.lessons.find(l => l.id === state.currentLessonId);
  const q = state.roundQuestions[state.roundIndex];
  const mc = document.getElementById("mainContainer");
  if (!lesson || !q || !mc) return;

  state.answeredCurrent = false;

  // TRYB: UKŁADANIE LITEREK
  if (state.currentSubMode === "letters_game") {
    const letters = q.en.toUpperCase().replace(/[^A-Z]/g, "").split("");
    const scrambled = shuffleArray(letters.map((ch, idx) => ({ ch, idx })));
    window._letterState = { target: letters.join(""), picked: [], scrambled };
    renderLettersStage(lesson, q);
    return;
  }

  // TRYB: MIKROFON (WYMOWA)
  if (state.currentSubMode === "mic_game") {
    mc.innerHTML = `
      ${renderTopGameBar(lesson)}
      <div class="bg-white rounded-3xl shadow-xl border-4 border-rose-400 p-6 text-center max-w-xl mx-auto">
        <div class="text-xs font-extrabold text-rose-700 uppercase mb-2">🎤 Powiedz słówko po angielsku!</div>
        <div class="text-7xl my-3 float-anim flex items-center justify-center h-20">${q.icon}</div>
        <div class="text-3xl font-extrabold text-slate-900">${q.en}</div>
        <div class="text-sm font-bold text-rose-600 mb-1">[${q.phonetic || q.en.toLowerCase()}]</div>
        <div class="text-sm font-bold text-slate-500 mb-4">${q.pl}</div>

        <div id="micStatusBox" class="min-h-[36px] text-sm font-extrabold text-slate-700 mb-3">Naciśnij przycisk i powiedz głośno!</div>

        <div class="flex flex-wrap justify-center gap-2.5">
          <button onclick="speakSequence([{lang:'en',text:'${q.en.replace(/'/g,"\\'")}'}])" class="kid-card px-4 py-3 rounded-2xl bg-sky-500 text-white font-extrabold text-sm shadow">🔊 Posłuchaj</button>
          <button onclick="triggerMicAnswer('${q.en.replace(/'/g,"\\'")}')" class="kid-card px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base shadow-lg">🎤 Mówię teraz!</button>
          <button onclick="resolveQuestionAnswer(true)" class="kid-card px-3.5 py-3 rounded-2xl bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-400">🔒 Zalicz (Tata)</button>
        </div>
      </div>
    `;
    speakSequence([{ lang: "en", text: q.en }]);
    return;
  }

  // STANDARDOWY QUIZ ZE SŁUCHU (Igor: 3 odpowiedzi, Hubert: 6 odpowiedzi)
  const isIgor = isEffectiveIgorMode();
  const numOptions = isIgor ? 3 : 6;
  const allItems = getItemsForPlayerAndLesson(lesson.id);
  const distractors = shuffleArray(allItems.filter(it => it.en !== q.en)).slice(0, numOptions - 1);
  const options = shuffleArray([q, ...distractors]);
  window._currentQuizOptions = options;

  mc.innerHTML = `
    ${renderTopGameBar(lesson)}
    <div class="bg-white rounded-3xl shadow-xl border-4 border-sky-300 p-4 md:p-6 text-center max-w-3xl mx-auto">
      <div class="flex items-center justify-center gap-3 bg-sky-50 p-3.5 rounded-2xl border-2 border-sky-200 mb-4">
        <button onclick="speakSequence([{lang:'en',text:'${q.en.replace(/'/g,"\\'")}'}])" class="kid-card w-14 h-14 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-3xl shadow flex items-center justify-center shrink-0">🔊</button>
        <div class="text-left">
          <div class="text-xs font-extrabold text-sky-800 uppercase">Wskaż obrazek:</div>
          <div class="text-2xl md:text-3xl font-extrabold text-slate-900">${q.en}</div>
        </div>
      </div>

      <div id="quizFeedback" class="min-h-[28px] font-extrabold text-sm mb-2"></div>

      <div class="grid ${isIgor ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-3'} gap-3">
        ${options.map((opt, idx) => `
          <button onclick="handleQuizChoice(${idx})" id="quizOpt_${idx}"
            class="kid-card rounded-3xl border-4 border-slate-200 hover:border-sky-400 bg-white p-4 shadow flex flex-col items-center justify-between">
            <div class="text-5xl md:text-6xl my-2 flex items-center justify-center h-16">${opt.icon}</div>
            <div class="text-xs font-extrabold text-slate-600">${isIgor ? opt.pl : opt.en}</div>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  speakSequence([{ lang: "en", text: q.en }]);
}

function handleQuizChoice(idx) {
  if (state.answeredCurrent) return;
  const q = state.roundQuestions[state.roundIndex];
  const chosen = window._currentQuizOptions[idx];
  const btn = document.getElementById(`quizOpt_${idx}`);
  const fb = document.getElementById("quizFeedback");
  if (!q || !chosen) return;

  if (chosen.en === q.en) {
    if (btn) btn.classList.add("border-emerald-500", "bg-emerald-50", "pop-correct");
    if (fb) fb.innerHTML = `<span class="text-emerald-600">✅ Brawo! ${q.en} = ${q.pl}!</span>`;
    resolveQuestionAnswer(true);
  } else {
    state.roundMistakes++;
    playEffect("wrong");
    if (btn) {
      btn.classList.add("border-rose-500", "bg-rose-50", "shake-wrong");
      setTimeout(() => btn.classList.remove("shake-wrong"), 400);
    }
    if (fb) fb.innerHTML = `<span class="text-rose-600">❌ To jest ${chosen.pl} (${chosen.en}). Spróbuj jeszcze raz!</span>`;
    speakSequence([{ lang: "pl", text: `To jest ${chosen.pl}. Szukamy:` }, { lang: "en", text: q.en }]);
  }
}

function triggerMicAnswer(targetEn) {
  const st = document.getElementById("micStatusBox");
  playEffect("beep");
  startSpeechRecognitionForWord(targetEn, {
    onListening: () => { if (st) st.innerHTML = `🎙️ Słucham... Powiedz: <strong>"${targetEn}"</strong>`; },
    onSuccess: () => {
      if (st) st.innerHTML = `<span class="text-emerald-600">✅ Świetna wymowa!</span>`;
      resolveQuestionAnswer(true);
    },
    onFail: () => {
      playEffect("wrong");
      if (st) st.innerHTML = `<span class="text-rose-600">🎧 Nie dosłyszałem. Spróbuj jeszcze raz lub poproś Tatę o zaliczenie!</span>`;
    },
    onUnsupported: () => {
      if (st) st.innerHTML = `<span class="text-amber-700">⚠️ Brak mikrofonu w tej przeglądarce – użyj przycisku Tata.</span>`;
    }
  });
}

function renderLettersStage(lesson, q) {
  const ls = window._letterState;
  const mc = document.getElementById("mainContainer");
  if (!mc || !ls) return;

  mc.innerHTML = `
    ${renderTopGameBar(lesson)}
    <div class="bg-white rounded-3xl shadow-xl border-4 border-purple-300 p-5 text-center max-w-2xl mx-auto">
      <div class="text-xs font-extrabold text-purple-700 uppercase mb-1">🧩 Ułóż angielskie słowo z literek:</div>
      <div class="text-6xl my-2 flex items-center justify-center h-16">${q.icon}</div>
      <div class="text-sm font-bold text-slate-600 mb-3">${q.pl}</div>

      <div class="min-h-[52px] p-2.5 rounded-2xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center gap-1.5 mb-4">
        ${ls.target.split("").map((_, i) => `
          <div class="w-10 h-11 rounded-xl border-2 ${ls.picked[i] ? 'bg-purple-600 text-white border-purple-700' : 'bg-white border-purple-300'} font-extrabold text-xl flex items-center justify-center">
            ${ls.picked[i] ? ls.picked[i].ch : ""}
          </div>
        `).join("")}
      </div>

      <div class="flex flex-wrap justify-center gap-2 mb-4">
        ${ls.scrambled.map((item, sIdx) => {
          const used = ls.picked.some(p => p.sIdx === sIdx);
          return `
            <button onclick="pickScrambledLetter(${sIdx})" ${used ? "disabled" : ""}
              class="kid-card w-12 h-12 rounded-2xl border-3 font-extrabold text-xl ${used ? 'opacity-30 bg-slate-100 border-slate-200' : 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-950 shadow'}">
              ${item.ch}
            </button>
          `;
        }).join("")}
      </div>

      <div class="flex justify-center gap-2">
        <button onclick="speakSequence([{lang:'en',text:'${q.en.replace(/'/g,"\\'")}'}])" class="px-4 py-2 rounded-xl bg-sky-500 text-white font-bold text-xs">🔊 Posłuchaj</button>
        <button onclick="resetScrambledLetters()" class="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs">↩️ Wyczyść</button>
      </div>
    </div>
  `;
}

function pickScrambledLetter(sIdx) {
  const ls = window._letterState;
  const lesson = state.lessons.find(l => l.id === state.currentLessonId);
  const q = state.roundQuestions[state.roundIndex];
  if (!ls || !q) return;

  ls.picked.push({ ch: ls.scrambled[sIdx].ch, sIdx });
  playEffect("beep");

  if (ls.picked.length === ls.target.length) {
    const formed = ls.picked.map(p => p.ch).join("");
    if (formed === ls.target) {
      resolveQuestionAnswer(true);
      return;
    } else {
      playEffect("wrong");
      ls.picked = [];
    }
  }
  renderLettersStage(lesson, q);
}

function resetScrambledLetters() {
  const ls = window._letterState;
  const lesson = state.lessons.find(l => l.id === state.currentLessonId);
  const q = state.roundQuestions[state.roundIndex];
  if (!ls || !q) return;
  ls.picked = [];
  renderLettersStage(lesson, q);
}

function resolveQuestionAnswer(isCorrect) {
  if (state.answeredCurrent) return;
  state.answeredCurrent = true;
  const q = state.roundQuestions[state.roundIndex];

  if (isCorrect) {
    playEffect("success");
    state.roundScore++;
    state.roundResults.push("correct");
  } else {
    state.roundResults.push("wrong");
  }

  speakSequence([{ lang: "en", text: q.en }], () => {
    state.roundIndex++;
    if (state.roundIndex >= state.roundQuestions.length) {
      finishStandardLessonRound();
    } else {
      renderCurrentQuestion();
    }
  });
}

function finishStandardLessonRound() {
  const profKey = getActiveProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  const earnedStars = Math.max(2, state.roundScore);
  p.stars = (p.stars || 0) + earnedStars;
  p.lessonCounts[state.currentLessonId] = (p.lessonCounts[state.currentLessonId] || 0) + 1;
  if (state.roundMistakes === 0) p.perfectRounds = (p.perfectRounds || 0) + 1;

  state.stats[profKey] = p;
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  playEffect("fanfare");

  const mc = document.getElementById("mainContainer");
  if (mc) {
    mc.innerHTML = `
      <div class="bg-white rounded-3xl shadow-2xl border-4 border-emerald-400 p-6 text-center max-w-xl mx-auto">
        <div class="text-6xl mb-2">🎉⭐🏆</div>
        <h2 class="text-3xl font-extrabold text-slate-900 mb-2">Świetna robota, ${p.name}!</h2>
        <p class="text-slate-700 font-bold mb-4">Zdobywasz <strong>+${earnedStars} ⭐</strong> za ukończenie rundy!</p>
        <div class="flex flex-col gap-2.5">
          <button onclick="startLesson('${state.currentLessonId}','${state.currentSubMode}')" class="kid-card w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base shadow">🔄 Zagraj jeszcze raz</button>
          <button onclick="startNextSequentialLesson()" class="kid-card w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base shadow">⏭️ Następna lekcja</button>
          <button onclick="showLessonMenu()" class="kid-card w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-base shadow">🏠 Wróć do Lekcji</button>
        </div>
      </div>
    `;
  }
  speakSequence([{ lang: "pl", text: `Brawo ${p.name}! Zdobywasz ${earnedStars} złotych gwiazdek!` }]);
}

// 4. POJEDYNEK BRACI (HUBERT VS IGOR - Z AUTOMATYCZNYMI SŁÓWKAMI ZE WSZYSTKICH LEKCJI)
function startBrothersDuel() {
  cancelAllSpeechAndTimers();
  state.profile = "duel";
  state.isCoopDragonMode = false;
  state.duelTurn = "igor";
  state.duelScores = { igor: 0, hubert: 0 };
  state.roundIndex = 0;

  const pool = shuffleArray(getAllActiveVocabularyPool());
  state.roundQuestions = pool.slice(0, Math.min(10, pool.length));
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  renderDuelQuestion();
}

function renderDuelQuestion() {
  const mc = document.getElementById("mainContainer");
  const q = state.roundQuestions[state.roundIndex];
  if (!mc || !q) { finishBrothersDuel(); return; }

  const isIgorTurn = state.duelTurn === "igor";
  const playerName = isIgorTurn ? "IGOR (4 l.)" : "HUBERT (6 l.)";
  const numOptions = isIgorTurn ? 3 : 6;
  const pool = getAllActiveVocabularyPool(isIgorTurn ? 4 : 6);
  const distractors = shuffleArray(pool.filter(it => it.en !== q.en)).slice(0, numOptions - 1);
  const options = shuffleArray([q, ...distractors]);
  window._duelOptions = options;
  state.answeredCurrent = false;

  mc.innerHTML = `
    ${renderTopGameBar(null)}
    <div class="bg-white rounded-3xl shadow-xl border-4 ${isIgorTurn ? 'border-amber-400' : 'border-sky-500'} p-5 text-center max-w-3xl mx-auto">
      <div class="inline-block px-4 py-1.5 rounded-full font-extrabold text-sm mb-3 ${isIgorTurn ? 'bg-amber-400 text-amber-950' : 'bg-sky-600 text-white'}">
        🎯 Kolej gracza: ${playerName} (Pytanie ${state.roundIndex + 1}/${state.roundQuestions.length})
      </div>

      <div class="flex items-center justify-center gap-3 bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-200 mb-4">
        <button onclick="speakSequence([{lang:'en',text:'${q.en.replace(/'/g,"\\'")}'}])" class="kid-card w-14 h-14 rounded-2xl bg-indigo-600 text-white text-3xl shadow flex items-center justify-center">🔊</button>
        <div class="text-2xl md:text-3xl font-extrabold text-slate-900">${q.en}</div>
      </div>

      <div id="duelFeedback" class="min-h-[28px] font-extrabold text-sm mb-2"></div>

      <div class="grid ${isIgorTurn ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-3'} gap-3">
        ${options.map((opt, idx) => `
          <button onclick="handleDuelChoice(${idx})" class="kid-card rounded-3xl border-4 border-slate-200 hover:border-indigo-400 bg-white p-4 shadow flex flex-col items-center">
            <div class="text-5xl my-2 flex items-center justify-center h-16">${opt.icon}</div>
            <div class="text-xs font-extrabold text-slate-600">${isIgorTurn ? opt.pl : opt.en}</div>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  speakSequence([{ lang: "pl", text: `Kolej: ${isIgorTurn ? "Igor" : "Hubert"}!` }, { lang: "en", text: q.en }]);
}

function handleDuelChoice(idx) {
  if (state.answeredCurrent) return;
  state.answeredCurrent = true;
  const q = state.roundQuestions[state.roundIndex];
  const chosen = window._duelOptions[idx];
  const fb = document.getElementById("duelFeedback");

  if (chosen.en === q.en) {
    playEffect("success");
    state.duelScores[state.duelTurn]++;
    if (fb) fb.innerHTML = `<span class="text-emerald-600">✅ Punkt dla ${state.duelTurn === "igor" ? "Igora" : "Huberta"}!</span>`;
  } else {
    playEffect("wrong");
    if (fb) fb.innerHTML = `<span class="text-rose-600">❌ Pudło! Poprawna odpowiedź to ${q.pl}.</span>`;
  }

  speakSequence([{ lang: "en", text: q.en }], () => {
    state.duelTurn = state.duelTurn === "igor" ? "hubert" : "igor";
    state.roundIndex++;
    if (state.roundIndex >= state.roundQuestions.length) finishBrothersDuel();
    else renderDuelQuestion();
  });
}

function finishBrothersDuel() {
  const iScore = state.duelScores.igor;
  const hScore = state.duelScores.hubert;
  state.stats.igor.stars += 3 + iScore;
  state.stats.hubert.stars += 3 + hScore;
  saveCloudData();
  playEffect("fanfare");

  const winnerText = iScore > hScore ? "Wygrywa Igor! 🏆" : hScore > iScore ? "Wygrywa Hubert! 🏆" : "Remis! Obaj bracia są mistrzami! 🤝";
  const mc = document.getElementById("mainContainer");
  if (mc) {
    mc.innerHTML = `
      <div class="bg-white rounded-3xl shadow-2xl border-4 border-indigo-400 p-6 text-center max-w-xl mx-auto">
        <div class="text-6xl mb-2">⚔️🏆🎉</div>
        <h2 class="text-3xl font-extrabold text-slate-900 mb-2">${winnerText}</h2>
        <p class="text-lg font-extrabold text-indigo-800 mb-4">Igor: ${iScore} pkt | Hubert: ${hScore} pkt</p>
        <div class="flex flex-col gap-2.5">
          <button onclick="startBrothersDuel()" class="kid-card w-full py-3 rounded-2xl bg-indigo-600 text-white font-extrabold text-base shadow">🔄 Rewanż!</button>
          <button onclick="exitSpecialModeToMenu()" class="kid-card w-full py-3 rounded-2xl bg-slate-200 text-slate-800 font-bold text-base">🏠 Wróć do Menu</button>
        </div>
      </div>
    `;
  }
  speakSequence([{ lang: "pl", text: `Koniec pojedynku! ${winnerText}` }]);
}

// 5. WSPÓLNA WALKA ZE SMOKIEM (ANIMACJA WALKI + 4 OPCJE DLA IGORA + 2 MIKROFONY DLA HUBERTA + GŁOS NAGRODY)
function startCoopDragonBattle() {
  cancelAllSpeechAndTimers();
  state.isCoopDragonMode = true;
  state.duelTurn = "igor";
  state.roundIndex = 0;

  const pool = shuffleArray(getAllActiveVocabularyPool());
  state.roundQuestions = pool.slice(0, Math.min(12, pool.length));
  state.dragonBattle = {
    dragonHp: 10,
    maxDragonHp: 10,
    teamHp: 5,
    maxTeamHp: 5,
    micQuestionsDone: 0,
    lastAnim: "", // "player_hit" | "dragon_hit"
    statusText: "🐉 Smok rzucił wyzwanie! Pokonajcie go razem!"
  };

  renderDragonBattleQuestion();
}

function renderDragonBattleQuestion() {
  const mc = document.getElementById("mainContainer");
  const db = state.dragonBattle;
  const q = state.roundQuestions[state.roundIndex % state.roundQuestions.length];
  if (!mc || !db || !q) return;

  const isIgorTurn = state.duelTurn === "igor";
  // Hubert ma 2 obowiązkowe zadania z mikrofonem podczas walki ze Smokiem (np. w rundach index 1 i 5)
  const isMandatoryMicForHubert = !isIgorTurn && db.micQuestionsDone < 2 && (state.roundIndex === 1 || state.roundIndex === 5 || state.roundIndex >= 7);

  state.answeredCurrent = false;

  const dragonHearts = "❤️".repeat(Math.max(0, db.dragonHp)) + "🖤".repeat(Math.max(0, db.maxDragonHp - db.dragonHp));
  const teamHearts   = "🛡️".repeat(Math.max(0, db.teamHp)) + "💔".repeat(Math.max(0, db.maxTeamHp - db.teamHp));

  const dragonAnimClass = db.lastAnim === "player_hit" ? "dragon-hit-anim" : "float-anim";
  const teamAnimClass   = db.lastAnim === "dragon_hit" ? "shake-wrong" : "";
  const clashOverlay    = db.lastAnim === "player_hit"
    ? `<div class="text-3xl font-extrabold text-amber-500 animate-bounce">⚔️💥 TRAFIENIE! -1 HP SMOKA!</div>`
    : db.lastAnim === "dragon_hit"
    ? `<div class="text-3xl font-extrabold text-rose-600 animate-bounce">🔥🐉 SMOK ZIEJE OGNIEM! -1 TARCZA!</div>`
    : "";

  if (isMandatoryMicForHubert) {
    mc.innerHTML = `
      ${renderTopGameBar(null)}
      <div class="bg-white rounded-3xl shadow-2xl border-4 border-rose-500 p-5 text-center max-w-3xl mx-auto">
        <div class="grid grid-cols-2 gap-3 bg-slate-900 text-white p-3 rounded-2xl mb-3 ${teamAnimClass}">
          <div>
            <div class="text-xs font-bold text-sky-300">Drużyna Braci</div>
            <div class="text-lg tracking-wider">${teamHearts}</div>
          </div>
          <div>
            <div class="text-xs font-bold text-rose-400">Smok (${db.dragonHp}/${db.maxDragonHp})</div>
            <div class="text-sm tracking-tighter">${dragonHearts}</div>
          </div>
        </div>

        <div class="my-2">
          <div class="text-6xl inline-block ${dragonAnimClass}">🐉</div>
          ${clashOverlay}
        </div>

        <div class="bg-rose-50 border-2 border-rose-400 rounded-2xl p-4 mb-3">
          <div class="inline-block px-3 py-1 rounded-full bg-rose-600 text-white font-extrabold text-xs mb-1">
            🔥 ATAK SPECJALNY SMOKA – HUBERT UŻYWA MIKROFONU! (${db.micQuestionsDone + 1}/2)
          </div>
          <div class="text-5xl my-2 flex items-center justify-center h-16">${q.icon}</div>
          <div class="text-2xl font-extrabold text-slate-900">Powiedz po angielsku: "${q.en}"</div>
          <div class="text-xs font-bold text-slate-500">(${q.pl})</div>
        </div>

        <div id="dragonMicStatus" class="min-h-[30px] text-sm font-extrabold text-rose-800 mb-3">Naciśnij mikrofon i wypowiedz zaklęcie!</div>

        <div class="flex flex-wrap justify-center gap-2.5">
          <button onclick="speakSequence([{lang:'en',text:'${q.en.replace(/'/g,"\\'")}'}])" class="kid-card px-4 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-xs shadow">🔊 Podpowiedz</button>
          <button onclick="triggerDragonHubertMic('${q.en.replace(/'/g,"\\'")}')" class="kid-card px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base shadow-lg">🎤 Rzuć Zaklęcie (Mów!)</button>
          <button onclick="handleDragonBattleOutcome(true, true)" class="kid-card px-3.5 py-2.5 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-400">🔒 Zalicz (Tata)</button>
        </div>
      </div>
    `;
    speakSequence([
      { lang: "pl", text: "Uwaga! Smok szykuje ogień! Hubert, powiedz głośno po angielsku:" },
      { lang: "en", text: q.en }
    ]);
    return;
  }

  // STANDARDOWA TURA WALKI (IGOR MA TERAZ 4 ODPOWIEDZI, HUBERT MA 6 ODPOWIEDZI)
  const numOptions = isIgorTurn ? 4 : 6;
  const pool = getAllActiveVocabularyPool(isIgorTurn ? 4 : 6);
  const distractors = shuffleArray(pool.filter(it => it.en !== q.en)).slice(0, numOptions - 1);
  const options = shuffleArray([q, ...distractors]);
  window._dragonOptions = options;

  mc.innerHTML = `
    ${renderTopGameBar(null)}
    <div class="bg-white rounded-3xl shadow-2xl border-4 border-amber-500 p-4 md:p-5 text-center max-w-3xl mx-auto">
      <div class="grid grid-cols-2 gap-3 bg-slate-900 text-white p-3 rounded-2xl mb-3 ${teamAnimClass}">
        <div>
          <div class="text-xs font-bold text-sky-300">Drużyna Braci</div>
          <div class="text-lg tracking-wider">${teamHearts}</div>
        </div>
        <div>
          <div class="text-xs font-bold text-rose-400">Smok (${db.dragonHp}/${db.maxDragonHp})</div>
          <div class="text-sm tracking-tighter">${dragonHearts}</div>
        </div>
      </div>

      <div class="my-1">
        <div class="text-6xl inline-block ${dragonAnimClass}">🐉</div>
        ${clashOverlay}
      </div>

      <div class="inline-block px-4 py-1 rounded-full font-extrabold text-xs mb-2 ${isIgorTurn ? 'bg-amber-400 text-amber-950' : 'bg-sky-600 text-white'}">
        ⚔️ Atakuje: ${isIgorTurn ? "IGOR (4 opcje)" : "HUBERT (6 opcji)"}
      </div>

      <div class="flex items-center justify-center gap-3 bg-amber-50 p-3 rounded-2xl border-2 border-amber-200 mb-3">
        <button onclick="speakSequence([{lang:'en',text:'${q.en.replace(/'/g,"\\'")}'}])" class="kid-card w-12 h-12 rounded-2xl bg-amber-500 text-white text-2xl shadow flex items-center justify-center">🔊</button>
        <div class="text-2xl font-extrabold text-slate-900">${q.en}</div>
      </div>

      <div class="grid ${isIgorTurn ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3'} gap-2.5">
        ${options.map((opt, idx) => `
          <button onclick="handleDragonQuizChoice(${idx})" class="kid-card rounded-2xl border-3 border-slate-200 hover:border-amber-500 bg-white p-3 shadow flex flex-col items-center">
            <div class="text-4xl md:text-5xl my-1 flex items-center justify-center h-14">${opt.icon}</div>
            <div class="text-xs font-extrabold text-slate-700">${isIgorTurn ? opt.pl : opt.en}</div>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  speakSequence([
    { lang: "pl", text: `${isIgorTurn ? "Igor" : "Hubert"}, atakuj!` },
    { lang: "en", text: q.en }
  ]);
}

function triggerDragonHubertMic(targetEn) {
  const st = document.getElementById("dragonMicStatus");
  playEffect("beep");
  startSpeechRecognitionForWord(targetEn, {
    onListening: () => { if (st) st.innerHTML = `🎙️ Słucham zaklęcia: <strong>"${targetEn}"</strong>...`; },
    onSuccess: () => handleDragonBattleOutcome(true, true),
    onFail: () => {
      playEffect("wrong");
      if (st) st.innerHTML = `🎧 Smok nie usłyszał wyraźnie! Spróbuj jeszcze raz lub użyj przycisku Tata!`;
    },
    onUnsupported: () => {
      if (st) st.innerHTML = `⚠️ Brak mikrofonu – użyj przycisku Tata.`;
    }
  });
}

function handleDragonQuizChoice(idx) {
  if (state.answeredCurrent) return;
  state.answeredCurrent = true;
  const q = state.roundQuestions[state.roundIndex % state.roundQuestions.length];
  const chosen = window._dragonOptions[idx];
  const isCorrect = chosen && chosen.en === q.en;
  handleDragonBattleOutcome(isCorrect, false);
}

function handleDragonBattleOutcome(isCorrect, wasMicTask) {
  const db = state.dragonBattle;
  if (isCorrect) {
    playEffect("sword_hit");
    db.dragonHp--;
    db.lastAnim = "player_hit";
    if (wasMicTask) db.micQuestionsDone++;
  } else {
    playEffect("dragon_roar");
    db.teamHp--;
    db.lastAnim = "dragon_hit";
  }

  state.duelTurn = state.duelTurn === "igor" ? "hubert" : "igor";
  state.roundIndex++;

  if (db.dragonHp <= 0) {
    finishCoopDragonBattle(true);
    return;
  }
  if (db.teamHp <= 0) {
    finishCoopDragonBattle(false);
    return;
  }

  renderDragonBattleQuestion();
}

function finishCoopDragonBattle(victory) {
  state.isCoopDragonMode = false;
  const db = state.dragonBattle;
  const mc = document.getElementById("mainContainer");

  if (!victory) {
    playEffect("dragon_roar");
    if (mc) {
      mc.innerHTML = `
        <div class="bg-white rounded-3xl shadow-2xl border-4 border-rose-400 p-6 text-center max-w-xl mx-auto">
          <div class="text-6xl mb-2">🐉🔥🛡️</div>
          <h2 class="text-3xl font-extrabold text-slate-900 mb-2">Smok tym razem obronił jaskinię!</h2>
          <p class="text-slate-600 font-bold mb-4">Odpocznijcie chwilę i spróbujcie ponownie pokonać Smoka!</p>
          <div class="flex flex-col gap-2.5">
            <button onclick="startCoopDragonBattle()" class="kid-card w-full py-3 rounded-2xl bg-amber-500 text-white font-extrabold text-base shadow">⚔️ Walcz jeszcze raz!</button>
            <button onclick="showLessonMenu()" class="kid-card w-full py-3 rounded-2xl bg-slate-200 text-slate-800 font-bold text-base">🏠 Wróć do Menu</button>
          </div>
        </div>
      `;
    }
    speakSequence([{ lang: "pl", text: "Smok tym razem obronił skarbiec! Spróbujcie jeszcze raz!" }]);
    return;
  }

  // ZWYCIĘSTWO ZE SMOKIEM – PRZYZNANIE SKRZYŃ I GŁOŚNE PRZECZYTANIE NAGRODY PRZEZ LEKTORA
  playEffect("fanfare");
  const wonChestType = db.teamHp >= 3 ? "gold" : "silver";
  const chestNamePl = wonChestType === "gold" ? "Złotą Skrzynię" : "Srebrną Skrzynię";
  const chestBadge  = wonChestType === "gold" ? "👑 Złota Skrzynia" : "🥈 Srebrna Skrzynia";

  state.stats.igor.stars += 5;
  state.stats.hubert.stars += 5;
  state.stats.igor.cups = (state.stats.igor.cups || 0) + 1;
  state.stats.hubert.cups = (state.stats.hubert.cups || 0) + 1;
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();

  // Dodajemy obie skrzynie do kolejki otwierania
  state.rewardQueue.push({ profKey: "igor", achievement: { name: "Pokonanie Smoka – Nagroda dla Igora!" }, chestType: wonChestType });
  state.rewardQueue.push({ profKey: "hubert", achievement: { name: "Pokonanie Smoka – Nagroda dla Huberta!" }, chestType: wonChestType });

  if (mc) {
    mc.innerHTML = `
      <div class="bg-white rounded-3xl shadow-2xl border-4 border-amber-400 p-6 text-center max-w-xl mx-auto">
        <div class="text-6xl mb-2">🐉🏆👑</div>
        <h2 class="text-3xl font-extrabold text-amber-950 mb-2">ZWYCIĘSTWO! Smok Pokonany!</h2>
        <div class="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 mb-4 space-y-1.5">
          <div class="font-extrabold text-base text-slate-900">👦 Igor zdobywa: <span class="text-amber-700">${chestBadge}</span> oraz +5 ⭐!</div>
          <div class="font-extrabold text-base text-slate-900">🧑 Hubert zdobywa: <span class="text-amber-700">${chestBadge}</span> oraz +5 ⭐!</div>
        </div>
        <div class="flex flex-col gap-2.5">
          <button onclick="processNextRewardInQueue()" class="kid-card w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-lg shadow-lg animate-bounce">
            🎁 Otwórz Wygrane Skrzynie!
          </button>
          <button onclick="showLessonMenu()" class="kid-card w-full py-2.5 rounded-2xl bg-slate-200 text-slate-800 font-bold text-sm">🏠 Wróć do Menu</button>
        </div>
      </div>
    `;
  }

  // Lektor wyraźnie czyta, kto i jaką skrzynkę dostał
  speakSequence([
    { lang: "pl", text: `Ogromne gratulacje! Pokonaliście Smoka! Igor zdobywa ${chestNamePl} i pięć gwiazdek, oraz Hubert zdobywa ${chestNamePl} i pięć gwiazdek! Kliknijcie przycisk, aby otworzyć swoje skrzynie!` }
  ]);
}
