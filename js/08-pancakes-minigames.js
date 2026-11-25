/* ============================================================================
   PLIK: js/08-pancakes-minigames.js
   KUCHNIA PANKEJKÓW (1 KLIK/DODATEK), LITERKI, MEMORY, MIKROFON (FIX SMOKA)
   ============================================================================ */

const _origRenderTopGameBarV14 = typeof renderTopGameBar === "function" ? renderTopGameBar : null;

renderTopGameBar = function(lesson) {
  if (!state.isExamMode && !state.isHardWordsMode && !state.isCoopDragonMode && lesson && lesson.id === "pancakes_cooking" && state.profile !== "duel") {
    const totalQ = state.roundQuestions.length || 1;
    const isFlashcards = state.currentSubMode === "flashcards";
    const micBtn = `<button onclick="startLesson('${lesson.id}','mic_game')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'mic_game' ? 'bg-rose-600 text-white border-rose-700' : 'bg-white text-slate-700'}">🎤 Wymowa</button>`;
    const flashBtn = `<button onclick="startFlashcards('${lesson.id}')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${isFlashcards ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-indigo-50 text-indigo-800 border-indigo-300'}">🃏 Fiszki</button>`;
    const audioOnlyBtn = `<button onclick="startLesson('${lesson.id}','audio_only_quiz')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'audio_only_quiz' ? 'bg-teal-600 text-white border-teal-700' : 'bg-teal-50 text-teal-900 border-teal-300'}">🎧 Ze słuchu</button>`;
    const lettersBtn = `<button id="subModeBtn_letters_game" onclick="startLesson('${lesson.id}','letters_game')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'letters_game' ? 'bg-purple-600 text-white border-purple-700' : 'bg-purple-50 text-purple-900 border-purple-300'}">🧩 Literki</button>`;
    const cookBtn = `<button id="subModeBtn_pancake_cooking_game" onclick="startLesson('${lesson.id}','pancake_cooking_game')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'pancake_cooking_game' ? 'bg-amber-500 text-white border-amber-600' : 'bg-amber-50 text-amber-900 border-amber-300'}">👨‍🍳 Kuchnia Pankejków</button>`;
    const quizBtn = `<button onclick="startLesson('${lesson.id}','listen_pick')" class="px-2.5 py-1 rounded-xl font-bold text-xs border-2 ${state.currentSubMode === 'listen_pick' ? 'bg-sky-500 text-white border-sky-600' : 'bg-white text-slate-700'}">👂 Quiz</button>`;
    const tataSwitchBar = state.profile === "tata"
      ? `<button onclick="toggleTataPreviewAge()" class="px-2.5 py-1 rounded-xl font-extrabold text-xs border-2 ${state.tataPreviewAsIgor ? 'bg-amber-400 text-amber-950 border-amber-600' : 'bg-sky-600 text-white border-sky-800'}">${state.tataPreviewAsIgor ? '👦 Widok: IGOR (4 l.) 🔄' : '🧑 Widok: HUBERT (6 l.) 🔄'}</button>`
      : "";

    let dotsHtml = "";
    for (let i = 0; i < totalQ; i++) {
      let badgeTxt = `${i + 1}`; let bg = "bg-slate-200 text-slate-600 border-slate-300";
      if (i < state.roundIndex) {
        bg = state.roundResults[i] === "correct" ? "bg-emerald-500 text-white border-emerald-600" : "bg-amber-500 text-white border-amber-600";
        badgeTxt = state.roundResults[i] === "correct" ? "✓" : "✗";
      } else if (i === state.roundIndex) {
        bg = "bg-amber-400 text-amber-950 border-amber-600 ring-2 ring-amber-600 animate-pulse font-extrabold";
      }
      dotsHtml += `<div class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${bg}">${badgeTxt}</div>`;
    }

    const comboBadge = (state.roundCombo >= 2 && !isFlashcards && state.currentSubMode !== "pancake_cooking_game")
      ? `<span class="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-xs shadow animate-pulse">🔥 Seria x${state.roundCombo}</span>`
      : "";
    const rematchBanner = state.isRematchPhase
      ? `<div class="mb-2 p-2 rounded-2xl bg-indigo-100 border-2 border-indigo-400 text-indigo-950 font-extrabold text-center text-xs shadow-sm uppercase">🦉🎯 Szybka dogrywka! Poprawiamy pomylone słówka (${state.roundIndex + 1}/${totalQ})</div>`
      : "";

    const rightBtn = isFlashcards
      ? `<button onclick="startLesson('pancakes_cooking')" class="px-3 py-1 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 text-xs font-extrabold border border-rose-300">Zakończ fiszki ⏹️</button>`
      : `<button onclick="showLessonMenu()" class="px-3 py-1 rounded-xl bg-slate-100 text-xs font-bold hover:bg-slate-200">Menu 🏠</button>`;

    return `
      ${rematchBanner}
      <div class="bg-white/95 rounded-2xl p-3 mb-3 border-2 border-amber-300 flex flex-col gap-2 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex flex-wrap gap-1.5 items-center">${flashBtn}${quizBtn}${audioOnlyBtn}${cookBtn}${lettersBtn}${micBtn}${tataSwitchBar}</div>
          ${rightBtn}
        </div>
        ${(state.currentSubMode !== "pancake_cooking_game" && !isFlashcards) ? `<div class="flex flex-wrap items-center justify-center gap-1.5 pt-2 border-t border-slate-100"><span class="text-[10px] font-bold text-slate-500 mr-2 uppercase">Postęp:</span>${dotsHtml}${comboBadge}</div>` : ""}
      </div>
    `;
  }
  return _origRenderTopGameBarV14 ? _origRenderTopGameBarV14(lesson) : "";
};

const SPEECH_HOMOPHONES_MAP = {
  "one": ["1", "won", "wan"],
  "two": ["2", "to", "too", "tu"],
  "three": ["3", "tree", "free", "fri"],
  "four": ["4", "for", "fore", "ford"],
  "five": ["5", "fife", "fine"],
  "six": ["6", "sex", "sicks", "siks"],
  "seven": ["7", "sewen"],
  "eight": ["8", "ate", "ait", "hate"],
  "nine": ["9", "najn", "mine"],
  "ten": ["10", "tin", "tan"],
  "eleven": ["11"],
  "twelve": ["12"],
  "thirteen": ["13"],
  "fourteen": ["14"],
  "fifteen": ["15"],
  "sixteen": ["16"],
  "seventeen": ["17"],
  "eighteen": ["18"],
  "nineteen": ["19"],
  "twenty": ["20"],
  "thirty": ["30", "dirty"],
  "forty": ["40", "fourty"],
  "fifty": ["50"],
  "one hundred": ["100", "hundred"],
  "flour": ["flower", "flauer", "floor"],
  "yoghurt": ["yogurt", "joghurt", "jogurt"],
  "oil": ["boil", "soil", "all"],
  "honey": ["hunny", "sunny", "money"],
  "egg": ["eggs", "ek"],
  "red": ["read", "ret"],
  "blue": ["blew", "blu"],
  "green": ["grin"],
  "white": ["wide", "light", "right"],
  "black": ["back", "block"],
  "brown": ["braun"],
  "eyes": ["eye", "ice", "i"],
  "ears": ["ear", "years", "year"],
  "nose": ["knows", "no"],
  "mouth": ["mouse", "south"],
  "head": ["hat", "had"],
  "leg": ["legs", "lake"],
  "foot": ["food", "put"],
  "hand": ["hands", "and"],
  "knee": ["ne", "me", "need"],
  "pear": ["pair", "bear"],
  "thank you": ["thanks", "thank", "thank u"],
  "hello": ["hallo", "helo", "low"],
  "goodbye": ["good bye", "bye", "bye bye"],
  "crescent rolls": ["crescent", "rolls", "croissant"],
  "strawberry": ["strawberries"],
  "blueberry": ["blueberries"],
  "grapes": ["grape", "great"]
};

function levenshteinDistance(a, b) {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

function isSpeechMatchForWord(heardRaw, targetRaw) {
  const clean = s => String(s || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  const heard = clean(heardRaw);
  const target = clean(targetRaw);
  if (!heard || !target) return false;
  if (heard.includes(target)) return true;

  const aliases = SPEECH_HOMOPHONES_MAP[target] || [];
  for (const al of aliases) {
    if (heard === al || heard.split(" ").includes(al) || (al.length >= 4 && heard.includes(al))) return true;
  }

  const heardWords = heard.split(" ");
  const targetWords = target.split(" ");
  if (targetWords.length > 1) {
    const matchedParts = targetWords.filter(tw => tw.length >= 3 && heardWords.some(hw => hw === tw || levenshteinDistance(hw, tw) <= 1));
    if (matchedParts.length >= 1) return true;
  }

  if (target.length >= 4) {
    const maxDist = target.length >= 7 ? 2 : 1;
    for (const hw of heardWords) {
      if (Math.abs(hw.length - target.length) <= maxDist && levenshteinDistance(hw, target) <= maxDist) {
        return true;
      }
    }
  }
  return false;
}

// ------------------------------------------------------------------------
// KUCHNIA PANKEJKÓW (5 ETAPÓW + 1 KLIK NA KAŻDY DODATEK W DEKORACJI)
// ------------------------------------------------------------------------
const PANCAKE_BASE_INGREDIENTS = [
  { id: "flour",   en: "Flour",   pl: "Mąka",   icon: getCustomPancakeSvg("flour", 58),   smallIcon: getCustomPancakeSvg("flour", 28) },
  { id: "egg",     en: "Egg",     pl: "Jajko",  icon: "🥚",                               smallIcon: "🥚" },
  { id: "yoghurt", en: "Yoghurt", pl: "Jogurt", icon: getCustomPancakeSvg("yoghurt", 58), smallIcon: getCustomPancakeSvg("yoghurt", 28) },
  { id: "honey",   en: "Honey",   pl: "Miód",   icon: "🍯",                               smallIcon: "🍯" },
  { id: "oil",     en: "Oil",     pl: "Olej",   icon: getCustomPancakeSvg("oil", 58),     smallIcon: getCustomPancakeSvg("oil", 28) }
];

const PANCAKE_TOPPING_FRUITS = [
  { id: "strawberry", en: "Strawberry", pl: "Truskawka", icon: "🍓" },
  { id: "banana",     en: "Banana",     pl: "Banan",     icon: "🍌" },
  { id: "apple",      en: "Apple",      pl: "Jabłko",    icon: "🍎" },
  { id: "grapes",     en: "Grapes",     pl: "Winogrona", icon: "🍇" },
  { id: "blueberry",  en: "Blueberry",  pl: "Jagody",    icon: "🫐" },
  { id: "honey_top",  en: "Honey",      pl: "Miód",      icon: "🍯" }
];

function startPancakeCookingGame(lesson) {
  cancelAllSpeechAndTimers();
  state.currentLessonId = "pancakes_cooking";
  state.lastPlayedLessonId = "pancakes_cooking";
  state.currentSubMode = "pancake_cooking_game";
  state.lastPlayedSubMode = "pancake_cooking_game";
  state.pancakeState = {
    stage: "bakery_shop", shopIdx: 0, boughtItems: [],
    addOrder: shuffleArray(PANCAKE_BASE_INGREDIENTS),
    addIdx: 0, addedIds: [], addedItems: [], _addingLock: false, mixClicks: 0,
    addedToppings: [], addedToppingIds: [], selectedFruitForVoice: PANCAKE_TOPPING_FRUITS[0].id
  };
  renderPancakeCookingStage(lesson);
}

function addPancakeToppingOnce(fruitId) {
  const ps = state.pancakeState;
  if (!ps) return null;
  if (!Array.isArray(ps.addedToppingIds)) ps.addedToppingIds = [];
  if (ps.addedToppingIds.includes(fruitId)) return null;
  const f = PANCAKE_TOPPING_FRUITS.find(x => x.id === fruitId);
  if (!f) return null;

  ps.addedToppingIds.push(f.id);
  ps.addedToppings.push(f.icon);

  const nextRemaining = PANCAKE_TOPPING_FRUITS.find(x => !ps.addedToppingIds.includes(x.id));
  ps.selectedFruitForVoice = nextRemaining ? nextRemaining.id : "";
  return f;
}

function renderPancakeCookingStage(lesson, skipIntroSpeech = false) {
  const activeLesson = lesson || state.lessons.find(l => l.id === "pancakes_cooking");
  const ps = state.pancakeState;
  const mc = document.getElementById("mainContainer");
  if (!mc || !ps) return;
  const isIgor = isEffectiveIgorMode("pancakes_cooking");

  if (ps.stage === "bakery_shop") {
    const targetIng = PANCAKE_BASE_INGREDIENTS[ps.shopIdx];
    const choices = shuffleArray([targetIng, ...shuffleArray(PANCAKE_BASE_INGREDIENTS.filter(i => i.id !== targetIng.id)).slice(0, 3)]);
    window._pancakeShopChoices = choices;
    const askPhrase = ps.shopIdx === 0 ? `Good morning! Please give me ${targetIng.en.toLowerCase()}!` : `Please give me ${targetIng.en.toLowerCase()}!`;

    mc.innerHTML = `
      ${renderTopGameBar(activeLesson)}
      <div class="bg-white rounded-3xl shadow-xl border-4 border-amber-400 p-4 md:p-6 text-center max-w-3xl mx-auto">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs">🏪 Etap 1/5: Zakupy w Piekarni i Sklepie (${ps.shopIdx + 1}/5)</span>
          <button onclick="psSkipToKitchen()" class="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs">Mam już składniki ➔ Kuchnia ⏭️</button>
        </div>
        <div class="bg-amber-50 p-3.5 rounded-2xl border-2 border-amber-300 mb-3 flex items-center justify-between gap-2">
          <button onclick="speakSequence([{lang:'en',text:'${askPhrase.replace(/'/g,"\\'")}'}])" class="kid-card w-12 h-12 rounded-2xl bg-amber-500 text-white text-2xl shadow flex items-center justify-center shrink-0">🔊</button>
          <div class="flex-1 text-left px-2">
            <div class="text-xs font-extrabold text-amber-800 uppercase">Powiedz sprzedawcy:</div>
            <div class="text-base md:text-xl font-extrabold text-slate-900">"${askPhrase}"</div>
            <div class="text-xs font-bold text-slate-600">${ps.shopIdx === 0 ? "Dzień dobry! Poproszę mąkę!" : `Poproszę: ${targetIng.pl.toLowerCase()}!`}</div>
          </div>
          <div class="text-4xl">🧑‍🍳</div>
        </div>
        <div class="mb-3 p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
          <span>Koszyk na pankejki:</span>
          ${ps.boughtItems.length ? ps.boughtItems.map(ic => `<span class="text-2xl pop-correct inline-flex items-center">${ic}</span>`).join("") : `<span class="text-slate-400">pusty</span>`}
        </div>
        <div id="pancakeFeedback" class="min-h-[30px] font-extrabold text-sm mb-2"></div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${choices.map((it, idx) => `
            <div onclick="pickPancakeShopItem(${idx})" class="kid-card cursor-pointer rounded-3xl border-4 border-amber-200 bg-amber-50/40 hover:border-amber-500 p-4 shadow flex flex-col items-center">
              <div class="text-6xl my-2 float-anim flex items-center justify-center h-16">${it.icon}</div>
              <div class="w-full py-1.5 px-2 rounded-xl bg-white border border-amber-300 font-extrabold text-xs text-amber-950 uppercase">${it.en}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    if (!skipIntroSpeech) {
      speakSequence([{ lang: "pl", text: ps.shopIdx === 0 ? "Wchodzimy do sklepu po składniki na pankejki! Powiedz:" : "Poproś o kolejny składnik:" }, { lang: "en", text: askPhrase }]);
    }
    return;
  }

  if (ps.stage === "bowl_add") {
    ps._addingLock = false;
    if (!Array.isArray(ps.addOrder) || ps.addOrder.length !== PANCAKE_BASE_INGREDIENTS.length) {
      ps.addOrder = shuffleArray(PANCAKE_BASE_INGREDIENTS);
    }
    const targetIng = ps.addOrder[ps.addIdx];
    const cmdEn = `Add ${targetIng.en.toLowerCase()}!`;
    mc.innerHTML = `
      ${renderTopGameBar(activeLesson)}
      <div class="bg-white rounded-3xl shadow-xl border-4 border-sky-400 p-4 md:p-6 text-center max-w-3xl mx-auto">
        <div class="text-xs font-extrabold text-sky-800 uppercase mb-1">🥣 Etap 2/5: Dodajemy składniki do miski (${ps.addIdx + 1}/5)</div>
        <div class="bg-sky-50 p-3.5 rounded-2xl border-2 border-sky-200 mb-3 flex items-center justify-between gap-2">
          <button onclick="speakSequence([{lang:'en',text:'${cmdEn}'},{lang:'pl',text:'Dodaj: ${targetIng.pl}!'}])" class="kid-card w-12 h-12 rounded-2xl bg-sky-500 text-white text-2xl shadow flex items-center justify-center">🔊</button>
          <div class="flex-1"><div class="text-xl md:text-3xl font-extrabold text-slate-900">"${cmdEn}"</div><div class="text-xs font-bold text-slate-600">Kliknij właściwy składnik, aby dodać go do miski!</div></div>
        </div>
        <div id="pancakeFeedback" class="min-h-[30px] font-extrabold text-sm mb-2"></div>
        <div class="w-48 h-28 mx-auto mb-4 rounded-b-full bg-gradient-to-b from-amber-100 to-amber-300 border-4 border-amber-500 shadow-inner flex flex-wrap items-center justify-center gap-1.5 p-2">
          ${ps.addedItems.length ? ps.addedItems.map(ic => `<span class="text-2xl pop-correct inline-flex items-center">${ic}</span>`).join("") : `<span class="text-xs font-bold text-amber-800">🥣 Pusta miska</span>`}
        </div>
        <div class="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          ${PANCAKE_BASE_INGREDIENTS.map(ing => {
            const alreadyIn = (ps.addedIds || []).includes(ing.id);
            return `<button onclick="addIngredientToBowl('${ing.id}')" ${alreadyIn ? "disabled" : ""} class="kid-card rounded-2xl border-3 ${alreadyIn ? 'border-emerald-300 bg-emerald-50 opacity-45 cursor-not-allowed' : 'border-sky-300 bg-white hover:bg-sky-50'} p-3 shadow flex flex-col items-center"><span class="text-4xl mb-1 flex items-center justify-center h-14">${ing.icon}</span><span class="font-extrabold text-xs text-slate-900">${ing.en}</span><span class="text-[10px] font-bold text-slate-500">${ing.pl}</span></button>`;
          }).join("")}
        </div>
      </div>
    `;
    if (!skipIntroSpeech) {
      speakSequence([{ lang: "en", text: cmdEn }, { lang: "pl", text: `Dodaj: ${targetIng.pl}!` }]);
    }
    return;
  }

  if (ps.stage === "bowl_mix") {
    const isMixed = ps.mixClicks >= 3;
    mc.innerHTML = `
      ${renderTopGameBar(activeLesson)}
      <div class="bg-white rounded-3xl shadow-xl border-4 border-purple-400 p-5 text-center max-w-2xl mx-auto">
        <div class="text-xs font-extrabold text-purple-700 uppercase mb-1">🥄🍳 Etap 3/5: Mieszamy i smażymy pankejki!</div>
        <div class="bg-purple-50 p-3.5 rounded-2xl border-2 border-purple-200 mb-4 flex items-center justify-between">
          <button onclick="speakSequence([{lang:'en',text:'${isMixed ? 'Fry the pancakes!' : 'Mix! Mix the ingredients!'}'}])" class="kid-card w-12 h-12 rounded-2xl bg-purple-600 text-white text-2xl shadow flex items-center justify-center">🔊</button>
          <div class="flex-1"><div class="text-xl md:text-2xl font-extrabold text-slate-900">${isMixed ? '"Pancakes! Fry the pancakes!"' : '"Mix! Mix the ingredients!"'}</div><div class="text-xs font-bold text-slate-600">${isMixed ? "Ciasto gotowe! Kliknij patelnię, aby usmażyć pankejksy!" : `Kliknij miskę 3 razy, aby wymieszać składniki (${ps.mixClicks}/3)!`}</div></div>
        </div>
        ${!isMixed ? `<div onclick="clickMixBowl()" class="kid-card cursor-pointer w-52 h-40 mx-auto rounded-b-full bg-gradient-to-b from-yellow-100 to-amber-300 border-4 border-amber-500 shadow-xl flex flex-col items-center justify-center relative"><div class="text-5xl mb-1">🥄🥣</div><div class="font-extrabold text-sm text-amber-950">Kliknij, aby mieszać! (${ps.mixClicks}/3)</div></div>` : `<div onclick="fryPancakesOnPan()" class="kid-card cursor-pointer w-56 h-44 mx-auto rounded-3xl bg-gradient-to-b from-slate-700 to-slate-900 border-4 border-amber-400 shadow-xl flex flex-col items-center justify-center text-white"><div class="text-6xl mb-1 float-anim">🍳🥞</div><div class="font-extrabold text-base text-amber-300">Usmaż Pankejksy! 🔥</div></div>`}
      </div>
    `;
    if (!skipIntroSpeech) {
      speakSequence([{ lang: "en", text: isMixed ? "Pancakes!" : "Mix!" }, { lang: "pl", text: isMixed ? "Ciasto wymieszane! Kliknij patelnię, aby usmażyć pankejksy!" : "Mieszamy! Kliknij trzy razy w miskę!" }]);
    }
    return;
  }

  if (ps.stage === "decorate_fruits") {
    if (!Array.isArray(ps.addedToppingIds)) ps.addedToppingIds = [];
    const remainingFruits = PANCAKE_TOPPING_FRUITS.filter(f => !ps.addedToppingIds.includes(f.id));
    if (remainingFruits.length > 0 && (!ps.selectedFruitForVoice || ps.addedToppingIds.includes(ps.selectedFruitForVoice))) {
      ps.selectedFruitForVoice = remainingFruits[0].id;
    } else if (remainingFruits.length === 0) {
      ps.selectedFruitForVoice = "";
    }

    const toppingsHtml = ps.addedToppings.length
      ? ps.addedToppings.map(ic => `<span class="text-3xl pop-correct">${ic}</span>`).join(" ")
      : `<span class="text-xs text-slate-400">Dodaj ulubione owoce na górę (każdy po 1 razie)!</span>`;

    mc.innerHTML = `
      ${renderTopGameBar(activeLesson)}
      <div class="bg-white rounded-3xl shadow-xl border-4 border-pink-400 p-4 md:p-6 text-center max-w-3xl mx-auto">
        <div class="text-xs font-extrabold text-pink-700 uppercase mb-1">🍓🍌 Etap 4/5: Dekorujemy Pankejksy!</div>
        <div class="my-3 p-4 rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50 border-3 border-amber-300 max-w-md mx-auto shadow-inner">
          <div class="flex justify-center flex-wrap gap-1 min-h-[38px] mb-1">${toppingsHtml}</div>
          <div class="text-7xl drop-shadow-md">🥞</div>
          <div class="text-xs font-extrabold text-amber-900 mt-1">Twoje Pankejksy (${ps.addedToppings.length}/${PANCAKE_TOPPING_FRUITS.length} dodatków)</div>
        </div>
        <div id="pancakeFruitStatus" class="min-h-[34px] font-extrabold text-sm text-rose-800 mb-2 flex items-center justify-center"></div>
        ${isIgor ? `
          <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
            ${PANCAKE_TOPPING_FRUITS.map(f => {
              const isAdded = ps.addedToppingIds.includes(f.id);
              return `
                <div class="rounded-2xl border-2 ${isAdded ? 'border-emerald-400 bg-emerald-50 opacity-70' : 'border-pink-300 bg-pink-50/40'} p-2 flex flex-col items-center shadow-sm">
                  <button onclick="igorClickFruitTopping('${f.id}')" ${isAdded ? "disabled" : ""} class="${isAdded ? 'cursor-not-allowed' : 'kid-card'} flex flex-col items-center w-full">
                    <span class="text-4xl">${f.icon}</span>
                    <span class="font-extrabold text-xs text-slate-900 mt-1">${f.en}</span>
                    <span class="text-[10px] text-slate-500">${f.pl}</span>
                  </button>
                  ${isAdded
                    ? `<span class="mt-1.5 w-full py-1 rounded-lg bg-emerald-600 text-white font-extrabold text-[10px]">✓ Dodano</span>`
                    : `<button onclick="voiceAddFruitTopping('${f.id}')" class="mt-1.5 w-full py-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px]">🎤 Powiedz</button>`}
                </div>
              `;
            }).join("")}
          </div>
        ` : `
          <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
            ${PANCAKE_TOPPING_FRUITS.map(f => {
              const isAdded = ps.addedToppingIds.includes(f.id);
              const sel = !isAdded && ps.selectedFruitForVoice === f.id;
              return isAdded
                ? `<div class="rounded-2xl border-2 border-emerald-400 bg-emerald-50 opacity-70 p-2.5 flex flex-col items-center shadow-sm cursor-not-allowed">
                     <span class="text-4xl">${f.icon}</span>
                     <span class="font-extrabold text-xs text-slate-900 mt-1">${f.en}</span>
                     <span class="mt-1 px-2 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[9px]">✓ Dodano</span>
                   </div>`
                : `<div onclick="selectFruitForHubertVoice('${f.id}')" class="kid-card cursor-pointer rounded-2xl border-3 ${sel ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-400' : 'border-slate-200 bg-white'} p-2.5 flex flex-col items-center shadow-sm">
                     <span class="text-4xl">${f.icon}</span>
                     <span class="font-extrabold text-xs text-slate-900 mt-1">${f.en}</span>
                     <span class="text-[10px] text-slate-500">${f.pl}</span>
                   </div>`;
            }).join("")}
          </div>
          ${remainingFruits.length > 0 ? `
            <div class="flex flex-wrap justify-center gap-2 mb-4">
              <button onclick="speakSelectedFruitHint()" class="kid-card px-4 py-2 rounded-xl bg-sky-500 text-white font-bold text-xs shadow">🔊 Podpowiedz wymowę</button>
              <button onclick="voiceAddFruitTopping(state.pancakeState.selectedFruitForVoice)" class="kid-card px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-lg">🎤 Powiedz nazwę owocu!</button>
              <button onclick="parentApprovePancakeFruit()" class="kid-card px-3.5 py-2 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs border border-emerald-700">🔒 Zalicz (Tata)</button>
            </div>
          ` : `
            <div class="mb-4 p-2.5 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-extrabold text-xs">
              🌟 Wszystkie dodatki są już na pankejkach! Czas poczęstować zwierzaka!
            </div>
          `}
        `}
        <button onclick="goToFeedPetWithPancakes()" class="kid-card w-full max-w-md py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg">🍽️ Gotowe! Podaj Pankejksy Zwierzakowi ➔</button>
      </div>
    `;
    if (!skipIntroSpeech) {
      speakSequence([{ lang: "pl", text: isIgor ? "Pankejksy usmażone! Kliknij owoce, które chcesz położyć na górze!" : "Pankejksy usmażone! Wybierz owoc i powiedz jego nazwę po angielsku do mikrofonu!" }]);
    }
    return;
  }

  if (ps.stage === "feed_pet") {
    const profKey = getActiveProfileKey(), p = ensurePlayerStructure(state.stats[profKey]);
    const petObj = (typeof COMPANION_PETS !== "undefined" ? COMPANION_PETS : []).find(a => a.id === (p.avatar && p.avatar.pet));
    const petIcon = petObj ? petObj.icon : "🦉", petNamePl = petObj ? petObj.pl : "Sówka";
    mc.innerHTML = `
      ${renderTopGameBar(activeLesson)}
      <div class="bg-white rounded-3xl shadow-xl border-4 border-emerald-400 p-6 text-center max-w-2xl mx-auto">
        <div class="text-xs font-extrabold text-emerald-700 uppercase mb-2">🐾 Etap 5/5: Czas na poczęstunek!</div>
        <div class="text-7xl my-2 float-anim">${petIcon}</div>
        <div class="bg-emerald-50 p-3.5 rounded-2xl border-2 border-emerald-300 mb-4"><div class="text-lg md:text-2xl font-extrabold text-emerald-950">${petNamePl} mówi: "I'm hungry! Please give me pancakes!"</div><div class="text-xs font-bold text-slate-600 mt-0.5">Jestem głodny! Poproszę pankejksy!</div></div>
        <div onclick="servePancakesToPet()" class="kid-card cursor-pointer p-4 rounded-3xl bg-amber-50 hover:bg-amber-100 border-4 border-amber-400 max-w-xs mx-auto shadow-lg"><div class="flex justify-center flex-wrap gap-1 mb-1">${ps.addedToppings.map(ic => `<span class="text-2xl">${ic}</span>`).join("")}</div><div class="text-6xl">🥞</div><div class="mt-2 py-2 px-4 rounded-xl bg-emerald-600 text-white font-extrabold text-sm">🍽️ Podaj i powiedz: "Thank you! Goodbye!"</div></div>
      </div>
    `;
    if (!skipIntroSpeech) {
      speakSequence([{ lang: "en", text: "I am hungry! Please give me pancakes!" }, { lang: "pl", text: `${petNamePl} jest głodny! Kliknij talerz z pankejkami, aby go poczęstować!` }]);
    }
  }
}

function psSkipToKitchen() {
  state.pancakeState.addOrder = shuffleArray(PANCAKE_BASE_INGREDIENTS);
  state.pancakeState.addIdx = 0;
  state.pancakeState.stage = "bowl_add";
  renderPancakeCookingStage();
}

function pickPancakeShopItem(idx) {
  const ps = state.pancakeState, targetIng = PANCAKE_BASE_INGREDIENTS[ps.shopIdx], chosen = window._pancakeShopChoices[idx], fb = document.getElementById("pancakeFeedback");
  if (chosen.id === targetIng.id) {
    playEffect("success"); ps.boughtItems.push(chosen.smallIcon || chosen.icon);
    if (fb) fb.innerHTML = `<span class="text-emerald-600">✅ Thank you! Masz: ${chosen.pl} (${chosen.en})!</span>`;
    ps.shopIdx++;
    if (ps.shopIdx >= PANCAKE_BASE_INGREDIENTS.length) speakSequence([{ lang: "en", text: "Thank you! Goodbye!" }, { lang: "pl", text: "Wszystkie składniki kupione! Idziemy do kuchni!" }], () => { ps.stage = "bowl_add"; renderPancakeCookingStage(); });
    else speakSequence([{ lang: "en", text: "Thank you!" }], () => renderPancakeCookingStage());
  } else {
    playEffect("wrong");
    if (fb) fb.innerHTML = `<span class="text-rose-600">❌ To jest ${chosen.pl} (${chosen.en}). Poprosiliśmy o: ${targetIng.en}!</span>`;
    speakSequence([{ lang: "pl", text: `Oj nie, to jest ${chosen.pl}. Poproś o:` }, { lang: "en", text: targetIng.en }]);
  }
}

function addIngredientToBowl(ingId) {
  const ps = state.pancakeState;
  if (ps._addingLock) return;
  if (!Array.isArray(ps.addOrder) || ps.addOrder.length !== PANCAKE_BASE_INGREDIENTS.length) {
    ps.addOrder = shuffleArray(PANCAKE_BASE_INGREDIENTS);
  }
  const targetIng = ps.addOrder[ps.addIdx];
  const chosen = PANCAKE_BASE_INGREDIENTS.find(i => i.id === ingId);
  const fb = document.getElementById("pancakeFeedback");
  if (!chosen || !targetIng) return;

  if (chosen.id === targetIng.id) {
    ps._addingLock = true;
    playEffect("success");
    if (!ps.addedIds) ps.addedIds = [];
    ps.addedIds.push(chosen.id);
    ps.addedItems.push(chosen.smallIcon || chosen.icon);
    ps.addIdx++;
    if (fb) fb.innerHTML = `<span class="text-emerald-600">✅ Dodano: ${chosen.pl} (${chosen.en})!</span>`;

    if (ps.addIdx >= ps.addOrder.length) {
      speakSequence([
        { lang: "en", text: chosen.en },
        { lang: "pl", text: `Super! Dodano ${chosen.pl.toLowerCase()}. Wszystkie składniki są już w misce! Teraz czas na mieszanie!` }
      ], () => {
        ps.stage = "bowl_mix";
        renderPancakeCookingStage();
      });
    } else {
      speakSequence([
        { lang: "en", text: chosen.en },
        { lang: "pl", text: `Brawo! Dodajemy ${chosen.pl.toLowerCase()}!` }
      ], () => {
        renderPancakeCookingStage();
      });
    }
  } else {
    playEffect("wrong");
    if (fb) fb.innerHTML = `<span class="text-rose-600">❌ Najpierw dodaj: ${targetIng.en} (${targetIng.pl})!</span>`;
    speakSequence([{ lang: "pl", text: "Najpierw dodaj:" }, { lang: "en", text: targetIng.en }]);
  }
}

function clickMixBowl() {
  const ps = state.pancakeState;
  ps.mixClicks++;
  playEffect("beep");
  if (ps.mixClicks >= 3) {
    playEffect("success");
    speakSequence([{ lang: "en", text: "Mix, mix, mix!" }], () => renderPancakeCookingStage());
  } else {
    renderPancakeCookingStage(null, true);
  }
}

function fryPancakesOnPan() {
  playEffect("fanfare");
  state.pancakeState.stage = "decorate_fruits";
  renderPancakeCookingStage();
}

function igorClickFruitTopping(fruitId) {
  const f = addPancakeToppingOnce(fruitId);
  if (!f) return;
  playEffect("success");
  renderPancakeCookingStage(null, true);
  speakSequence([{ lang: "en", text: `Add ${f.en.toLowerCase()}!` }, { lang: "pl", text: `Dodano: ${f.pl}!` }]);
}

function selectFruitForHubertVoice(fruitId) {
  const ps = state.pancakeState;
  if (!ps || (ps.addedToppingIds || []).includes(fruitId)) return;
  ps.selectedFruitForVoice = fruitId;
  playEffect("beep");
  renderPancakeCookingStage(null, true);
}

function speakSelectedFruitHint() {
  const f = PANCAKE_TOPPING_FRUITS.find(x => x.id === state.pancakeState.selectedFruitForVoice);
  if (f) speakSequence([{ lang: "pl", text: "Powiedz:" }, { lang: "en", text: f.en }]);
}

function parentApprovePancakeFruit() {
  const f = addPancakeToppingOnce(state.pancakeState.selectedFruitForVoice);
  if (!f) return;
  playEffect("success");
  renderPancakeCookingStage(null, true);
  speakSequence([{ lang: "en", text: `Yummy ${f.en.toLowerCase()}!` }, { lang: "pl", text: `Tata zalicza! Dodano: ${f.pl}!` }]);
}

function voiceAddFruitTopping(fruitId) {
  const ps = state.pancakeState;
  if (!ps || !fruitId || (ps.addedToppingIds || []).includes(fruitId)) return;
  const f = PANCAKE_TOPPING_FRUITS.find(x => x.id === fruitId);
  if (!f) return;

  cancelAllSpeechAndTimers(); playEffect("beep");
  const stBox = document.getElementById("pancakeFruitStatus");
  if (stBox) stBox.innerHTML = `🎙️ MÓW TERAZ PO ANGIELSKU: <strong>"${f.en}"</strong> (lub "Add ${f.en.toLowerCase()}")!`;
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) { if (stBox) stBox.innerHTML = `❌ Brak obsługi mikrofonu w przeglądarce. Kliknij 🔒 Zalicz (Tata).`; return; }
  let handled = false, lastHeard = "";
  setTimeout(() => {
    try {
      const rec = new SpeechRec(); rec.lang = "en-US"; rec.interimResults = true; rec.maxAlternatives = 5;
      rec.onresult = (e) => {
        if (handled) return;
        for (let i = e.resultIndex; i < e.results.length; i++) {
          for (let a = 0; a < e.results[i].length; a++) {
            const alt = e.results[i][a].transcript.trim();
            if (alt) lastHeard = alt;
            if (isSpeechMatchForWord(alt, f.en)) {
              handled = true; try { rec.stop(); } catch (err) {}
              const added = addPancakeToppingOnce(f.id);
              if (!added) return;
              playEffect("success");
              renderPancakeCookingStage(null, true);
              setTimeout(() => {
                speakSequence([{ lang: "en", text: `Add ${f.en.toLowerCase()}!` }, { lang: "pl", text: `Brawo! Pięknie powiedziane! Dodano: ${f.pl}!` }]);
              }, 140);
              return;
            }
          }
        }
      };
      rec.onend = () => { if (!handled && stBox) stBox.innerHTML = lastHeard ? `🎧 Usłyszałem: "${lastHeard}". Spróbuj jeszcze raz lub kliknij 🔒 Zalicz (Tata)!` : `🎧 Nie usłyszałem "${f.en}". Spróbuj jeszcze raz lub kliknij 🔒 Zalicz (Tata)!`; };
      rec.start(); setTimeout(() => { if (!handled) { handled = true; try { rec.stop(); } catch (err) {} } }, 6500);
    } catch (err) {}
  }, 160);
}

function goToFeedPetWithPancakes() { playEffect("beep"); state.pancakeState.stage = "feed_pet"; renderPancakeCookingStage(); }

function servePancakesToPet() {
  const profKey = getActiveProfileKey(), p = ensurePlayerStructure(state.stats[profKey]), petId = p.avatar && p.avatar.pet;
  if (petId) { if (!p.petXp) p.petXp = {}; p.petXp[petId] = (p.petXp[petId] || 0) + 1; }
  p.stars = (p.stars || 0) + 5; p.cups = (p.cups || 0) + 1; p.lessonCounts["pancakes_cooking"] = (p.lessonCounts["pancakes_cooking"] || 0) + 1;
  state.stats[profKey] = p; state.lastPlayedLessonId = "pancakes_cooking"; state.lastPlayedSubMode = "pancake_cooking_game";
  if (typeof recordPlayerActivity === "function") recordPlayerActivity(profKey, "pancakes_cooking");
  advanceDailyQuestProgress(profKey, "stars", 5); advanceDailyQuestProgress(profKey, "rounds", 1);
  if (petId) advanceDailyQuestProgress(profKey, "feed_pet", 1);
  checkAndUnlockAchievements(profKey); saveCloudData(); if (typeof updateHeaderUI === "function") updateHeaderUI(); playEffect("fanfare");
  const mc = document.getElementById("mainContainer");
  if (mc) {
    mc.innerHTML = `<div class="bg-white rounded-3xl shadow-2xl border-4 border-amber-400 p-6 text-center max-w-xl mx-auto"><div class="text-6xl mb-2">🥞🎉🏆</div><h2 class="text-3xl font-extrabold text-amber-950 mb-2">Yummy! Thank you! Goodbye!</h2><p class="text-slate-700 font-bold mb-4">Pankejksy zjedzone ze smakiem! Zdobywasz <strong>+5 ⭐</strong> oraz Puchar Mistrza Kuchni${petId ? " + punkt przyjaźni dla Twojego zwierzaka" : ""}!</p><div class="flex flex-col gap-2.5"><button onclick="startPancakeCookingGame()" class="kid-card w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base shadow">🔄 Zagraj jeszcze raz</button><button onclick="startNextSequentialLesson()" class="kid-card w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base shadow">⏭️ Następna lekcja</button><button onclick="showLessonMenu()" class="kid-card w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-base shadow">🏠 Wróć do Lekcji</button></div></div>`;
  }
  speakSequence([{ lang: "en", text: "Yummy pancakes! Thank you! Goodbye!" }, { lang: "pl", text: "Brawo! Upiekłeś pyszne pankejksy i zdobywasz pięć złotych gwiazdek!" }]);
}

// ------------------------------------------------------------------------
// UKŁADANKA LITERKOWA (4 LITERKI DO WYBORU DLA IGORA)
// ------------------------------------------------------------------------
function renderLettersGame(lesson) {
  const q = state.roundQuestions[state.roundIndex], rawWord = (q.en || "CAT").trim().toUpperCase(), isIgor = isEffectiveIgorMode();
  if (!window._letterTargetWord || window._letterRoundIdx !== state.roundIndex || window._letterModeIgor !== isIgor) {
    window._letterTargetWord = rawWord; window._letterRoundIdx = state.roundIndex; window._letterModeIgor = isIgor;
    if (isIgor) {
      state.letterBuilt = ""; const firstChar = rawWord[0];
      const distractors = shuffleArray("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter(c => c !== firstChar)).slice(0, 3);
      state.letterPool = shuffleArray([firstChar, ...distractors]).map((ch, i) => ({ id: i, char: ch, used: false }));
    } else {
      state.letterBuilt = ""; state.letterPool = shuffleArray(rawWord.split("").map((ch, i) => ({ id: i, char: ch, used: false })));
    }
  }
  const mc = document.getElementById("mainContainer"); if (!mc) return;
  let slotsHtml = isIgor
    ? `<div class="flex flex-wrap justify-center gap-1.5 my-3"><div class="w-12 h-14 md:w-14 md:h-16 rounded-2xl border-4 ${state.letterBuilt ? 'border-emerald-500 bg-emerald-50' : 'border-purple-500 bg-purple-50'} flex items-center justify-center text-2xl md:text-3xl font-extrabold shadow">${state.letterBuilt ? `<span class="text-emerald-700">${state.letterBuilt}</span>` : `<span class="text-purple-600 animate-pulse">?</span>`}</div>${rawWord.slice(1).split("").map(ch => `<div class="w-12 h-14 md:w-14 md:h-16 rounded-2xl border-2 ${state.letterBuilt ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-slate-300 bg-slate-100 text-slate-700'} flex items-center justify-center text-2xl md:text-3xl font-extrabold">${ch}</div>`).join("")}</div>`
    : `<div class="flex flex-wrap justify-center gap-1.5 my-3">${rawWord.split("").map((ch, idx) => ch === " " ? `<div class="w-6 h-14"></div>` : `<div class="w-11 h-14 md:w-13 md:h-16 rounded-2xl border-4 ${idx < state.letterBuilt.length ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : idx === state.letterBuilt.length ? 'border-purple-500 bg-purple-50 text-purple-400 animate-pulse' : 'border-slate-300 bg-slate-50 text-slate-300'} flex items-center justify-center text-2xl md:text-3xl font-extrabold shadow-sm">${idx < state.letterBuilt.length ? rawWord[idx] : '_'}</div>`).join("")}</div>`;

  mc.innerHTML = `${renderTopGameBar(lesson)}<div class="bg-white rounded-3xl shadow-xl border-4 border-purple-400 p-4 md:p-6 text-center max-w-2xl mx-auto w-full"><div class="text-xs font-extrabold text-purple-700 uppercase mb-1">🧩 Układanka Literkowa (${isIgor ? 'Wskaż brakującą pierwszą literę (4 opcje)' : 'Posłuchaj i ułóż słowo'})</div><div class="flex items-center justify-center gap-4 my-2"><button onclick="speakSequence([{lang:'en',text:'${q.en.replace(/'/g,"\\'")}'}])" class="kid-card w-14 h-14 rounded-2xl bg-purple-600 text-white text-3xl shadow flex items-center justify-center">🔊</button><div class="text-6xl md:text-7xl float-anim drop-shadow-sm">${q.icon || '⭐'}</div><div class="text-left"><div class="text-xl md:text-2xl font-extrabold text-slate-800">${q.pl}</div><div class="text-xs font-bold text-purple-600">Kliknij 🔊 aby usłyszeć po angielsku</div></div></div>${slotsHtml}<div id="feedbackBanner" class="min-h-[30px] font-bold text-sm mb-2 flex items-center justify-center"></div><div class="flex flex-wrap justify-center gap-2.5 mt-2">${state.letterPool.map((tile, idx) => `<button id="letTile_${idx}" onclick="pickLetterTile(${idx})" ${tile.used ? 'disabled' : ''} class="kid-card w-14 h-14 md:w-16 md:h-16 rounded-2xl border-4 ${tile.used ? 'border-slate-200 bg-slate-100 text-slate-300 opacity-40 cursor-not-allowed' : 'border-purple-400 bg-white hover:bg-purple-50 text-purple-950 shadow-md'} font-extrabold text-2xl md:text-3xl">${tile.char}</button>`).join("")}</div></div>`;
  if (state.letterBuilt.length === 0 && state.currentQuestionMistakes === 0) {
    if (typeof lockQuestionInputBriefly === "function") lockQuestionInputBriefly(650);
    speakSequence([{ lang: "pl", text: isIgor ? `Posłuchaj i wskaż pierwszą literę słowa:` : `Posłuchaj i ułóż z liter słowo:` }, { lang: "en", text: q.en }]);
  }
}

function pickLetterTile(poolIdx) {
  if (state.answeredCurrent) return;
  if (typeof isQuestionInputLocked === "function" && isQuestionInputLocked()) return;
  const q = state.roundQuestions[state.roundIndex], rawWord = window._letterTargetWord || q.en.trim().toUpperCase(), isIgor = isEffectiveIgorMode(), tile = state.letterPool[poolIdx];
  if (!tile || tile.used) return;
  const expectedChar = isIgor ? rawWord[0] : rawWord[state.letterBuilt.length], btn = document.getElementById(`letTile_${poolIdx}`), fb = document.getElementById("feedbackBanner");
  if (tile.char === expectedChar) {
    tile.used = true; playEffect("beep");
    if (isIgor) state.letterBuilt = rawWord[0];
    else { state.letterBuilt += tile.char; while (state.letterBuilt.length < rawWord.length && rawWord[state.letterBuilt.length] === " ") state.letterBuilt += " "; }
    if (isIgor || state.letterBuilt.length >= rawWord.length) {
      state.answeredCurrent = true; window._letterTargetWord = ""; renderLettersGame(state.lessons.find(l => l.id === state.currentLessonId)); playEffect("success");
      const comboInfo = awardCorrectAnswer();
      const fbAfter = document.getElementById("feedbackBanner");
      if (fbAfter) fbAfter.innerHTML = `<span class="text-emerald-600 font-extrabold">🌟 Brawo! Ułożono słowo: ${rawWord} (${q.pl})!${comboInfo && comboInfo.bonusText ? " " + comboInfo.bonusText : ""}</span>`;
      const speechSegs = [{ lang: "en", text: q.en }, { lang: "pl", text: `Super! To jest ${q.pl}!` }];
      if (comboInfo && comboInfo.bonusSpeech) speechSegs.push({ lang: "pl", text: comboInfo.bonusSpeech });
      speakSequence(speechSegs, () => advanceNextQuestion());
    } else renderLettersGame(state.lessons.find(l => l.id === state.currentLessonId));
  } else {
    state.roundMistakes++; state.currentQuestionMistakes++;
    if (typeof resetRoundCombo === "function") resetRoundCombo();
    if (typeof recordMistakeForRematch === "function") recordMistakeForRematch(q);
    playEffect("wrong"); if (btn) btn.classList.add("shake-wrong");
    if (fb) fb.innerHTML = `<span class="text-rose-600">❌ Szukamy innej litery! Kliknij 🔊 i spróbuj jeszcze raz!</span>`;
  }
}

// ------------------------------------------------------------------------
// GRA MEMORY
// ------------------------------------------------------------------------
function startMemoryGame() {
  cancelAllSpeechAndTimers(); state.currentLessonId = "memory_game"; state.isExamMode = false; state.isHardWordsMode = false; state.isCoopDragonMode = false;
  state.isRematchPhase = false; state.rematchQueue = []; state.roundCombo = 0; state.roundBonusStars = 0;
  const isAdvanced = !isEffectiveIgorMode(), numPairs = isAdvanced ? 8 : 6;
  let pool = [];
  state.lessons.filter(l => !l.testOnly || state.profile === "tata").forEach(l => {
    if (l.type === "vocab" && l.id !== "memory_game" && !l.audioQuizOnly) getVisibleLessonItems(l.items, true, l.id).forEach(it => pool.push(it));
  });
  pool = shuffleArray(pool).slice(0, numPairs);
  let cards = [];
  pool.forEach(item => {
    cards.push({ id: (item.id || item.en) + "_1", matchId: item.en, type: 'pic', content: item.icon, en: item.en, pl: item.pl });
    cards.push({ id: (item.id || item.en) + "_2", matchId: item.en, type: isAdvanced ? 'text' : 'pic', content: isAdvanced ? item.en : item.icon, en: item.en, pl: item.pl });
  });
  state.memoryGameCards = shuffleArray(cards); state.memoryFlippedIndexes = []; state.memoryMatchedPairs = 0; renderMemoryGame();
}

function renderMemoryGame() {
  const isAdvanced = !isEffectiveIgorMode(), mc = document.getElementById("mainContainer"); if (!mc) return;
  mc.innerHTML = `<div class="bg-white/95 rounded-2xl p-3 mb-3 border-2 border-fuchsia-300 flex justify-between items-center shadow-sm"><div class="font-extrabold text-fuchsia-900 text-sm md:text-base px-2">🧠 Trening Pamięci</div><div class="px-4 py-1.5 bg-fuchsia-100 text-fuchsia-800 rounded-xl font-bold border border-fuchsia-200">Znaleziono: ${state.memoryMatchedPairs} / ${state.memoryGameCards.length / 2}</div><button onclick="showLessonMenu()" class="px-3 py-1.5 rounded-xl bg-slate-100 font-bold text-xs hover:bg-slate-200">Koniec ⏹️</button></div><div class="bg-white rounded-3xl shadow-xl border-4 border-fuchsia-300 p-4 md:p-6 text-center"><p class="text-xs font-bold text-slate-500 mb-4">${isAdvanced ? "Połącz słowo z obrazkiem!" : "Znajdź dwie takie same karty!"}</p><div class="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-2xl mx-auto" id="memoryGrid">${state.memoryGameCards.map((card, idx) => `<div id="memCard_${idx}" onclick="flipMemoryCard(${idx})" class="memory-card h-24 sm:h-32"><div class="memory-card-inner shadow"><div class="memory-card-front text-4xl">❓</div><div class="memory-card-back ${card.type === 'text' ? 'text-lg md:text-xl font-extrabold text-slate-800' : 'text-5xl md:text-6xl'} flex items-center justify-center p-2">${card.content}</div></div></div>`).join("")}</div></div>`;
  speakSequence([{ lang: "pl", text: isAdvanced ? "Znajdź obrazek pasujący do słowa!" : "Znajdź dwie takie same karty!" }]);
}

function flipMemoryCard(idx) {
  if (state.memoryFlippedIndexes.length >= 2 || state.memoryFlippedIndexes.includes(idx)) return;
  const el = document.getElementById(`memCard_${idx}`); if (el.classList.contains("matched")) return;
  el.classList.add("flipped"); playEffect("beep"); state.memoryFlippedIndexes.push(idx);
  const card = state.memoryGameCards[idx]; speakSequence([{ lang: "en", text: card.en }]);
  if (state.memoryFlippedIndexes.length === 2) {
    const [idx1, idx2] = state.memoryFlippedIndexes, card1 = state.memoryGameCards[idx1], card2 = state.memoryGameCards[idx2];
    if (card1.matchId === card2.matchId) {
      state.memoryMatchedPairs++;
      setTimeout(() => {
        document.getElementById(`memCard_${idx1}`).classList.add("matched"); document.getElementById(`memCard_${idx2}`).classList.add("matched");
        playEffect("success"); speakSequence([{ lang: "pl", text: "Brawo! Para!" }, { lang: "en", text: card1.en }]); state.memoryFlippedIndexes = [];
        if (state.memoryMatchedPairs === state.memoryGameCards.length / 2) setTimeout(renderEndRoundScreen, 1500);
      }, 700);
    } else {
      setTimeout(() => {
        document.getElementById(`memCard_${idx1}`).classList.remove("flipped"); document.getElementById(`memCard_${idx2}`).classList.remove("flipped");
        playEffect("wrong"); state.memoryFlippedIndexes = [];
      }, 1200);
    }
  }
}

// ------------------------------------------------------------------------
// STUDIO WYMOWY (Z NAPRAWIONYM PRZESKAKIWANIEM W WALCE ZE SMOKIEM)
// ------------------------------------------------------------------------
function stopActiveSpeechRecSafely() {
  if (window._activeSpeechRec) {
    try { window._activeSpeechRec.abort(); } catch (e) {}
    window._activeSpeechRec = null;
  }
}

function renderMicGame(lesson) {
  stopActiveSpeechRecSafely();
  const q = state.roundQuestions[state.roundIndex];
  const isAdvanced = !isEffectiveIgorMode();
  const isDragonMic = state.isCoopDragonMode && state.duelTurn === "hubert" && q._dragonMicQuestion;
  const isTranslation = isAdvanced && !isDragonMic && (state.roundIndex % 2 === 1);
  window._micTranslationMode = isTranslation;

  const mc = document.getElementById("mainContainer");
  if (!mc) return;

  const triesCount = q._dragonMicTries || 0;
  const badgeTitle = isDragonMic
    ? `🐉🎤 ATAK GŁOSOWY HUBERTA NA SMOKA! (<span id="dragonMicTriesBadge">Próba: ${triesCount + 1}</span>)`
    : "🎤 Studio Wymowy";
  const displayTitle = isTranslation ? `<span class="text-slate-500 font-normal">Jak powiesz: </span>"${q.pl}"?` : `"${q.en}"`;
  const subTitle = isTranslation ? `<span class="text-rose-600">Nie podglądaj! Przetłumacz i wymów.</span>` : `${q.pl} ${q.phonetic ? '[' + q.phonetic + ']' : ''}`;

  const initialBoxClass = (isDragonMic && triesCount >= 5)
    ? "p-4 rounded-3xl bg-amber-100 border-4 border-amber-500 font-extrabold text-sm text-amber-950 mb-5 flex flex-col items-center justify-center gap-2 text-center"
    : "p-4 rounded-3xl bg-slate-50 border-2 border-slate-200 font-bold text-sm text-slate-700 mb-5 flex flex-col items-center justify-center gap-2 text-center";

  const initialBoxHtml = (isDragonMic && triesCount >= 5)
    ? `👨‍💻 Tato, posłuchaj Huberta! Jeśli powiedział dobrze, kliknij zielony przycisk <strong>🔒 Zalicz (Tata)</strong>!`
    : `<div>1. Kliknij 🔊 Posłuchaj &nbsp;➔&nbsp; 2. Kliknij 🎤 Mów!</div>
       <div id="eqVisualizer" class="hidden items-end gap-1 h-10 my-1">
         <div class="w-1.5 bg-rose-500 rounded-full eq-bar-1"></div><div class="w-1.5 bg-rose-500 rounded-full eq-bar-2"></div>
         <div class="w-1.5 bg-rose-500 rounded-full eq-bar-3"></div><div class="w-1.5 bg-rose-500 rounded-full eq-bar-4"></div>
         <div class="w-1.5 bg-rose-500 rounded-full eq-bar-5"></div>
       </div>`;

  const dadBtnHighlight = (isDragonMic && triesCount >= 5) ? "tutorial-highlight" : "";

  mc.innerHTML = `
    ${renderTopGameBar(lesson)}
    <div class="bg-white rounded-3xl shadow-xl border-4 border-rose-400 p-5 text-center max-w-2xl mx-auto w-full">
      <div class="text-xs font-extrabold text-rose-700 uppercase mb-1">${badgeTitle}</div>
      <div class="text-6xl md:text-7xl my-3 float-anim drop-shadow-sm flex justify-center">${q.icon || '⭐'}</div>
      <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1 tracking-wide">${displayTitle}</h2>
      <p class="text-sm font-bold text-slate-500 mb-4">${subTitle}</p>
      <div id="micStatusBox" class="${initialBoxClass}">
        ${initialBoxHtml}
      </div>
      <div class="flex flex-wrap justify-center gap-3">
        <button onclick="speakSequence([{lang:'en',text:'${q.en.replace(/'/g,"\\'")}'}])" class="kid-card px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-base shadow">🔊 Posłuchaj</button>
        <button id="btnStartMic" onclick="startSpeechCheck()" class="kid-card px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base shadow-lg">🎤 Mów!</button>
        <button id="btnParentMicApprove" onclick="requestParentMicApproval()" class="kid-card px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-emerald-950 font-bold text-sm shadow border-2 border-emerald-600 ${dadBtnHighlight}">🔒 Zalicz (Tata)</button>
      </div>
    </div>
  `;
  if (isDragonMic) {
    speakSequence([{ lang: "pl", text: "Uwaga Hubert! Specjalny atak głosowy na Smoka! Kliknij Mów i powiedz:" }, { lang: "en", text: q.en }]);
  } else if (isTranslation) {
    speakSequence([{ lang: "pl", text: `Powiedz głośno po angielsku: ${q.pl}!` }]);
  } else {
    speakSequence([{ lang: "pl", text: "Posłuchaj i powtórz:" }, { lang: "en", text: q.en }]);
  }
}

function startSpeechCheck() {
  if (state.answeredCurrent) return;
  stopActiveSpeechRecSafely();
  cancelAllSpeechAndTimers();
  playEffect("beep");

  const q = state.roundQuestions[state.roundIndex];
  const box = document.getElementById("micStatusBox");
  const isDragonMic = state.isCoopDragonMode && state.duelTurn === "hubert" && q._dragonMicQuestion;

  if (box) {
    box.className = "p-4 rounded-3xl bg-emerald-100 border-4 border-emerald-500 font-extrabold text-base text-emerald-950 mb-5 flex flex-col items-center justify-center gap-2 text-center";
    const helperTxt = window._micTranslationMode ? `Tłumaczysz: "${q.pl}"` : `Powiedz słowo: "${q.en}"`;
    box.innerHTML = `🟢 SŁUCHAM! MÓW GŁOŚNO PO ANGIELSKU 🎙️<br><span class="text-xs font-bold text-emerald-800">${helperTxt}</span><div id="eqVisualizer" class="flex items-end gap-1 h-10 mt-1"><div class="w-1.5 bg-emerald-600 rounded-full eq-bar-1"></div><div class="w-1.5 bg-emerald-600 rounded-full eq-bar-2"></div><div class="w-1.5 bg-emerald-600 rounded-full eq-bar-3"></div><div class="w-1.5 bg-emerald-600 rounded-full eq-bar-4"></div><div class="w-1.5 bg-emerald-600 rounded-full eq-bar-5"></div></div>`;
  }

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    if (box) box.innerHTML = "❌ Przeglądarka nie wspiera mikrofonu. Kliknij 🔒 Zalicz (Tata).";
    return fallbackMicTimer(box);
  }

  let handled = false;
  let finalHeard = "";

  setTimeout(() => {
    if (state.answeredCurrent) return;
    try {
      const rec = new SpeechRec();
      window._activeSpeechRec = rec;
      rec.lang = "en-US";
      rec.interimResults = true;
      rec.continuous = false;
      rec.maxAlternatives = 5;

      rec.onresult = (e) => {
        if (handled || state.answeredCurrent) return;
        for (let i = e.resultIndex; i < e.results.length; i++) {
          for (let a = 0; a < e.results[i].length; a++) {
            const candidate = (e.results[i][a].transcript || "").trim();
            if (candidate) finalHeard = candidate;
            if (isSpeechMatchForWord(candidate, q.en)) {
              handled = true;
              stopActiveSpeechRecSafely();
              approveMicAnswer(`Zrozumiałem: "${candidate}"!`);
              return;
            }
          }
        }
      };

      rec.onend = () => {
        window._activeSpeechRec = null;
        if (handled || state.answeredCurrent) return;
        handled = true;

        if (isDragonMic) {
          q._dragonMicTries = (q._dragonMicTries || 0) + 1;
          const badgeEl = document.getElementById("dragonMicTriesBadge");
          if (badgeEl) badgeEl.textContent = `Próba: ${q._dragonMicTries + 1}`;

          if (q._dragonMicTries >= 5) {
            const dadBtn = document.getElementById("btnParentMicApprove");
            if (dadBtn) dadBtn.classList.add("tutorial-highlight");
            if (box) {
              box.className = "p-4 rounded-3xl bg-amber-100 border-4 border-amber-500 font-extrabold text-sm text-amber-950 mb-5 text-center";
              box.innerHTML = `👨‍💻 Tato, posłuchaj Huberta! Jeśli powiedział dobrze, kliknij zielony przycisk <strong>🔒 Zalicz (Tata)</strong>!<br><span class="text-xs font-bold text-slate-700">${finalHeard ? `(Mikrofon usłyszał: "${finalHeard}", szukamy: "${q.en}")` : `Możecie też spróbować ponownie klikając 🎤 Mów!`}</span>`;
            }
            if (q._dragonMicTries === 5) {
              speakSequence([{ lang: "pl", text: "Tato, posłuchaj proszę Huberta i jeśli powiedział dobrze, kliknij przycisk Zalicz!" }]);
            }
            return;
          }

          if (box) {
            box.className = "p-4 rounded-3xl bg-amber-100 border-2 border-amber-400 font-extrabold text-sm text-amber-950 mb-5 text-center";
            box.innerHTML = finalHeard
              ? `🎧 Usłyszałem: "${finalHeard}" (szukamy: "${q.en}").<br>Spróbuj jeszcze raz! Kliknij 🎤 Mów! (Próba ${q._dragonMicTries + 1})`
              : `🎧 Cicho... Nic nie usłyszałem. Zbliż telefon i kliknij 🎤 Mów! (Próba ${q._dragonMicTries + 1})`;
          }
          return;
        }

        if (box) {
          box.className = "p-4 rounded-3xl bg-amber-100 border-2 border-amber-400 font-bold text-sm text-amber-950 mb-5 flex flex-col items-center justify-center text-center";
          box.innerHTML = finalHeard
            ? `🎧 Usłyszałem: "${finalHeard}".<br>Kliknij 🎤 Mów! jeszcze raz lub niech Tata kliknie 🔒 Zalicz!`
            : `🎧 Cicho... Nic nie usłyszałem. Zbliż telefon i kliknij 🎤 Mów! jeszcze raz!`;
        }
        fallbackMicTimer(box);
      };

      rec.onerror = (err) => {
        window._activeSpeechRec = null;
        if (handled || state.answeredCurrent) return;
        handled = true;
        const reason = (err && err.error === "not-allowed")
          ? "Brak zgody na mikrofon w przeglądarce! Zezwól na mikrofon lub kliknij 🔒 Zalicz (Tata)."
          : "Błąd mikrofonu. Kliknij 🎤 Mów! jeszcze raz lub 🔒 Zalicz (Tata).";
        if (box) {
          box.className = "p-4 rounded-3xl bg-rose-100 border-2 border-rose-400 font-bold text-sm text-rose-950 mb-5";
          box.innerHTML = `❌ ${reason}`;
        }
        fallbackMicTimer(box);
      };

      rec.start();
      setTimeout(() => {
        if (!handled) {
          try { rec.stop(); } catch (e) {}
        }
      }, 7500);
    } catch (e) {
      if (box) box.innerHTML = `❌ Błąd uruchamiania mikrofonu. Kliknij 🔒 Zalicz (Tata).`;
      fallbackMicTimer(box);
    }
  }, 180);
}

function fallbackMicTimer(box) {
  setTimeout(() => { if (!state.answeredCurrent && box) box.innerHTML += `<div class="mt-2 text-xs text-rose-600 font-bold">Spróbuj ponownie lub poproś Tatę!</div>`; }, 2000);
}

function requestParentMicApproval() {
  if (state.answeredCurrent) return;
  stopActiveSpeechRecSafely();
  openParentPinModal("mic_approve");
}

function approveMicAnswer(msg) {
  if (state.answeredCurrent) return;
  state.answeredCurrent = true;
  stopActiveSpeechRecSafely();

  const q = state.roundQuestions[state.roundIndex];
  const isSandbox = typeof isBrothersTestSandbox === "function" && isBrothersTestSandbox();
  const profKey = state.isCoopDragonMode
    ? (isSandbox ? "tata" : "hubert")
    : ((state.profile === "hubert" || state.profile === "tata") ? state.profile : "igor");

  if (state.stats[profKey]) {
    state.stats[profKey].micCount = (state.stats[profKey].micCount || 0) + 1;
  }

  if (!state.isCoopDragonMode && state.profile !== "duel" && typeof removeHardWordIfMastered === "function") {
    try { removeHardWordIfMastered(q); } catch (e) {}
  }

  const box = document.getElementById("micStatusBox");
  if (box) {
    box.className = "p-4 rounded-3xl bg-emerald-500 text-white font-extrabold text-base mb-5 drop-shadow-md";
    box.innerHTML = `✅🌟 Brawo! ${msg} (${q.en} = ${q.pl})`;
  }

  if (state.isCoopDragonMode) {
    state.dragonBattle.dragonHp = Math.max(0, state.dragonBattle.dragonHp - 1);
    state.dragonBattle.statusText = `🎤⚔️ POTĘŻNY OKRZYK HUBERTA! Zadałeś Smokowi obrażenie głosem! (Smok ma ${state.dragonBattle.dragonHp} HP)`;
    try { awardCorrectAnswer(); } catch (e) {}

    setTimeout(() => {
      if (typeof playDragonAttackSequence === "function") {
        playDragonAttackSequence("hit", "Super! Zaatakujemy teraz smoka!");
      } else {
        if (typeof triggerDragonBattleAnimation === "function") triggerDragonBattleAnimation("hit");
        setTimeout(() => advanceNextQuestion(true), 4650);
      }
    }, 160);
    return;
  }

  playEffect("success");
  const comboInfo = awardCorrectAnswer();
  const speechSegs = [{ lang: "en", text: q.en }, { lang: "pl", text: `Piękna wymowa! To znaczy ${q.pl}!` }];
  if (comboInfo && comboInfo.bonusSpeech) speechSegs.push({ lang: "pl", text: comboInfo.bonusSpeech });
  setTimeout(() => {
    speakSequence(speechSegs, () => advanceNextQuestion());
  }, 160);
}

// ------------------------------------------------------------------------
// LEKCJA 1: PRZYIMKI (IN, ON, UNDER) + FISZKI (Z POLSKIM LEKTOREM I NAWIGACJĄ)
// ------------------------------------------------------------------------
function startPrepositionExplain(lesson) {
  const mc = document.getElementById("mainContainer"); if (!mc) return;
  mc.innerHTML = `${renderTopGameBar(lesson)}<div class="bg-white rounded-3xl shadow-xl border-4 border-sky-300 p-4 md:p-6 text-center max-w-2xl mx-auto w-full"><h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-wide">In, On, Under!</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-3"><div id="exp_in" class="kid-card p-4 rounded-2xl bg-amber-50 border-2 border-amber-200"><div class="text-5xl mb-2 float-anim relative"><span class="absolute z-20 text-3xl left-4 bottom-2">🐱</span>📦</div><div class="font-extrabold text-xl">In</div><div class="text-sm font-bold text-slate-600">W (w środku)</div></div><div id="exp_on" class="kid-card p-4 rounded-2xl bg-sky-50 border-2 border-sky-200"><div class="text-5xl mb-2 float-anim relative"><span class="absolute z-20 text-3xl left-4 -top-3">🐱</span>📦</div><div class="font-extrabold text-xl">On</div><div class="text-sm font-bold text-slate-600">Na (na górze)</div></div><div id="exp_un" class="kid-card p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200"><div class="text-5xl mb-2 float-anim relative"><span class="absolute z-20 text-3xl left-4 -bottom-3">🐱</span>📦</div><div class="font-extrabold text-xl">Under</div><div class="text-sm font-bold text-slate-600">Pod (pod spodem)</div></div></div><div class="mt-5 border-t border-slate-100 pt-4 flex gap-2 justify-center"><button onclick="startLesson('prepositions','prep_choose_word')" class="px-5 py-2.5 rounded-2xl bg-sky-500 text-white font-bold">Start: Słówka</button><button onclick="startLesson('prepositions','prep_choose_pic')" class="px-5 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold">Start: Obrazki</button></div></div>`;
  const hl = (id, on) => { const el = document.getElementById(id); if(el) el.classList.toggle("word-glow", on); };
  speakSequence([
    { lang: "pl", text: "in znaczy w środku. na przykład kot w pudełku.", onStart: ()=>hl("exp_in",true), onEnd: ()=>hl("exp_in",false) },
    { lang: "pl", text: "on znaczy na górze. na przykład kot na pudełku.", onStart: ()=>hl("exp_on",true), onEnd: ()=>hl("exp_on",false) },
    { lang: "pl", text: "under znaczy pod spodem. na przykład kot pod pudełkiem.", onStart: ()=>hl("exp_un",true), onEnd: ()=>hl("exp_un",false) }
  ]);
}

function renderPrepChooseWord(lesson) {
  const q = state.roundQuestions[state.roundIndex], choices = ["In", "On", "Under"];
  let emojiHtml = q.prep === "In" ? `<span class="absolute z-20 text-3xl md:text-5xl left-6 bottom-4 md:bottom-8">${q.animal}</span>` : q.prep === "On" ? `<span class="absolute z-20 text-3xl md:text-5xl left-6 -top-4 md:-top-8">${q.animal}</span>` : `<span class="absolute z-20 text-3xl md:text-5xl left-6 -bottom-5 md:-bottom-10">${q.animal}</span>`;
  const bObj = { box: "📦", bag: "🎒", table: "🪑", chair: "🪑", basket: "🧺", bed: "🛏️", tree: "🌳" }, mc = document.getElementById("mainContainer"); if (!mc) return;
  mc.innerHTML = `${renderTopGameBar(lesson)}<div class="bg-white rounded-3xl shadow-xl border-4 border-sky-300 p-4 md:p-6 text-center"><div id="feedbackBanner" class="min-h-[34px] font-bold text-base mb-2"></div><div class="relative text-7xl md:text-9xl mb-8 float-anim mt-4 mx-auto w-32 md:w-48 flex items-center justify-center">${bObj[q.container] || "📦"} ${emojiHtml}</div><h2 class="text-xl md:text-2xl font-extrabold text-slate-800 mb-6">Wybierz słowo:</h2><div class="flex justify-center gap-3">${choices.map(c => `<button id="pBtn_${c}" onclick="checkPrepWord('${c}')" class="kid-card px-6 py-4 rounded-2xl border-4 border-slate-200 bg-slate-50 hover:bg-sky-50 font-extrabold text-2xl shadow w-32 uppercase tracking-wider">${c}</button>`).join("")}</div></div>`;
  if (typeof lockQuestionInputBriefly === "function") lockQuestionInputBriefly(650);
  speakSequence([{ lang: "pl", text: `gdzie jest ${q.plDesc.split(' ')[0].toLowerCase()}? in, on czy under?` }]);
}

function checkPrepWord(chosen) {
  if (state.answeredCurrent) return;
  if (typeof isQuestionInputLocked === "function" && isQuestionInputLocked()) return;
  const q = state.roundQuestions[state.roundIndex], fb = document.getElementById("feedbackBanner"), btn = document.getElementById(`pBtn_${chosen}`);
  if (chosen === q.prep) {
    state.answeredCurrent = true; playEffect("success"); btn.classList.add("pop-correct");
    const comboInfo = awardCorrectAnswer();
    fb.innerHTML = `<span class="text-emerald-600">✅ Dobrze! ${q.fullEn}${comboInfo && comboInfo.bonusText ? " " + comboInfo.bonusText : ""}</span>`;
    const speechSegs = [{ lang: "en", text: q.fullEn }, { lang: "pl", text: `super! to znaczy: ${q.plDesc.toLowerCase()}` }];
    if (comboInfo && comboInfo.bonusSpeech) speechSegs.push({ lang: "pl", text: comboInfo.bonusSpeech });
    speakSequence(speechSegs, () => advanceNextQuestion());
  } else {
    state.roundMistakes++; state.currentQuestionMistakes++;
    if (typeof resetRoundCombo === "function") resetRoundCombo();
    if (typeof recordMistakeForRematch === "function") recordMistakeForRematch(q);
    playEffect("wrong"); btn.classList.add("shake-wrong"); recordHardWordForActivePlayer(q);
    if (state.profile === "duel") { state.answeredCurrent = true; fb.innerHTML = `<span class="text-rose-600">❌ Pudło! To było ${q.prep}!</span>`; speakSequence([{ lang: "pl", text: "pudło! kolej brata!" }], () => advanceNextQuestion()); }
    else { fb.innerHTML = `<span class="text-rose-600">❌ Nie, spróbuj jeszcze raz!</span>`; speakSequence([{ lang: "pl", text: "nie to, pomyśl jeszcze raz!" }]); }
  }
}

function renderPrepChoosePic(lesson) {
  const q = state.roundQuestions[state.roundIndex], choices = shuffleArray(["In", "On", "Under"]); window._currentChoices = choices;
  const bObj = { box: "📦", bag: "🎒", table: "🪑", chair: "🪑", basket: "🧺", bed: "🛏️", tree: "🌳" }, mc = document.getElementById("mainContainer"); if (!mc) return;
  mc.innerHTML = `${renderTopGameBar(lesson)}<div class="bg-white rounded-3xl shadow-xl border-4 border-sky-300 p-4 md:p-6 text-center"><div class="flex items-center justify-center bg-sky-50 p-3 rounded-2xl border border-sky-200 mb-3 drop-shadow-sm gap-3"><button onclick="speakSequence([{lang:'en',text:'${q.fullEn.replace(/'/g,"\\'")}'}])" class="kid-card w-12 h-12 rounded-2xl bg-sky-500 text-white text-2xl shadow flex items-center justify-center">🔊</button><div class="text-2xl md:text-3xl font-extrabold text-slate-900">"${q.fullEn}"</div></div><div id="feedbackBanner" class="min-h-[34px] font-bold text-base mb-2"></div><div class="grid grid-cols-3 gap-3">${choices.map((c, idx) => { let html = c === "In" ? `<span class="absolute z-20 text-3xl left-2 bottom-1 md:left-4 md:bottom-2">${q.animal}</span>` : c === "On" ? `<span class="absolute z-20 text-3xl left-2 -top-4 md:left-4 md:-top-5">${q.animal}</span>` : `<span class="absolute z-20 text-3xl left-2 -bottom-5 md:left-4 md:-bottom-6">${q.animal}</span>`; return `<div id="pCard_${idx}" onclick="checkPrepPic(${idx})" class="kid-card cursor-pointer rounded-2xl border-4 border-slate-200 bg-slate-50 hover:border-sky-400 py-6 px-2 shadow flex items-center justify-center relative"><div class="text-6xl md:text-7xl relative mx-auto w-16 md:w-20 float-anim">${bObj[q.container] || "📦"}${html}</div></div>`; }).join("")}</div></div>`;
  if (typeof lockQuestionInputBriefly === "function") lockQuestionInputBriefly(650);
  speakSequence([{ lang: "pl", text: "wskaż obrazek dla:" }, { lang: "en", text: q.fullEn }]);
}

function checkPrepPic(idx) {
  if (state.answeredCurrent) return;
  if (typeof isQuestionInputLocked === "function" && isQuestionInputLocked()) return;
  const q = state.roundQuestions[state.roundIndex], chosen = window._currentChoices[idx], card = document.getElementById(`pCard_${idx}`), fb = document.getElementById("feedbackBanner");
  if (chosen === q.prep) {
    state.answeredCurrent = true; playEffect("success"); card.classList.add("pop-correct");
    const comboInfo = awardCorrectAnswer();
    fb.innerHTML = `<span class="text-emerald-600">✅ Dobrze! ${q.plDesc}${comboInfo && comboInfo.bonusText ? " " + comboInfo.bonusText : ""}</span>`;
    const speechSegs = [{ lang: "en", text: q.fullEn }, { lang: "pl", text: `tak! ${q.plDesc.toLowerCase()}` }];
    if (comboInfo && comboInfo.bonusSpeech) speechSegs.push({ lang: "pl", text: comboInfo.bonusSpeech });
    speakSequence(speechSegs, () => advanceNextQuestion());
  } else {
    state.roundMistakes++; state.currentQuestionMistakes++;
    if (typeof resetRoundCombo === "function") resetRoundCombo();
    if (typeof recordMistakeForRematch === "function") recordMistakeForRematch(q);
    playEffect("wrong"); card.classList.add("shake-wrong"); recordHardWordForActivePlayer(q);
    if (state.profile === "duel") { state.answeredCurrent = true; fb.innerHTML = `<span class="text-rose-600">❌ Pudło! Powinno być ${q.prep}!</span>`; speakSequence([{ lang: "pl", text: "pudło! kolej brata!" }], () => advanceNextQuestion()); }
    else { fb.innerHTML = `<span class="text-rose-600">❌ Nie ten obrazek!</span>`; speakSequence([{ lang: "pl", text: "nie! pomyśl jeszcze raz!" }]); }
  }
}

function startFlashcards(lessonId) {
  cancelAllSpeechAndTimers();
  const lesson = state.lessons.find(l => l.id === lessonId);
  if (!lesson) return;
  state.flashcardIndex = 0;
  state.currentLessonId = lessonId;
  state.lastPlayedLessonId = lessonId;
  state.currentSubMode = "flashcards";
  renderFlashcard(lesson);
}

function renderFlashcard(lesson) {
  const visItems = getVisibleLessonItems(lesson.items, true, lesson.id);
  const list = visItems.length ? visItems : lesson.items;
  if (!list || !list.length) return;
  if (state.flashcardIndex < 0) state.flashcardIndex = list.length - 1;
  if (state.flashcardIndex >= list.length) state.flashcardIndex = 0;

  const item = list[state.flashcardIndex];
  const mc = document.getElementById("mainContainer");
  if (!mc) return;

  const safeEn = (item.en || "").replace(/'/g, "\\'");
  const safePl = (item.pl || "").replace(/'/g, "\\'");

  mc.innerHTML = `
    ${renderTopGameBar(lesson)}
    <div class="bg-white rounded-3xl shadow-xl border-4 border-indigo-300 p-5 md:p-7 text-center max-w-2xl mx-auto flex flex-col items-center justify-between min-h-[370px]">
      <div class="w-full flex items-center justify-between text-xs font-extrabold text-indigo-800 bg-indigo-50 px-3.5 py-2 rounded-2xl border border-indigo-200">
        <span>🃏 Fiszki: ${lesson.title}</span>
        <span>Karta ${state.flashcardIndex + 1} / ${list.length}</span>
      </div>

      <div class="text-8xl drop-shadow-md my-4 float-anim cursor-pointer flex justify-center" onclick="speakSequence([{lang:'en',text:'${safeEn}'},{lang:'pl',text:'${safePl}'}])" title="Kliknij, aby posłuchać po angielsku i po polsku">
        ${item.icon || item.animal || '📘'}
      </div>

      <div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1">"${item.en}"</h2>
        <p class="text-sm font-bold text-slate-400 mb-3">${item.phonetic ? '[' + item.phonetic + ']' : ''}</p>
        <p class="text-2xl md:text-3xl font-extrabold text-indigo-900">${item.pl}</p>
      </div>

      <div class="mt-6 flex flex-wrap justify-center gap-2.5">
        <button onclick="speakSequence([{lang:'en',text:'${safeEn}'},{lang:'pl',text:'${safePl}'}])" class="kid-card px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-sm shadow">
          🦉🔊 Posłuchaj (EN + PL)
        </button>
        <button onclick="speakSequence([{lang:'en',text:'${safeEn}'}])" class="kid-card px-3.5 py-2.5 rounded-2xl bg-indigo-100 hover:bg-indigo-200 text-indigo-950 font-bold text-xs border-2 border-indigo-300">
          🇬🇧 Po angielsku
        </button>
        <button onclick="speakSequence([{lang:'pl',text:'${safePl}'}])" class="kid-card px-3.5 py-2.5 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs border-2 border-emerald-300">
          🇵🇱 Po polsku
        </button>
      </div>

      <div class="mt-5 pt-4 border-t border-slate-100 w-full flex items-center justify-between gap-3">
        <button onclick="prevFlashcard()" class="kid-card px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm border-2 border-slate-300">
          ⬅️ Poprzednie
        </button>
        <button onclick="nextFlashcard()" class="kid-card px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg">
          Następne ▶
        </button>
      </div>
    </div>
  `;
  speakSequence([{ lang: "en", text: item.en }, { lang: "pl", text: item.pl }]);
}

function prevFlashcard() {
  state.flashcardIndex--;
  renderFlashcard(state.lessons.find(l => l.id === state.currentLessonId));
}

function nextFlashcard() {
  state.flashcardIndex++;
  renderFlashcard(state.lessons.find(l => l.id === state.currentLessonId));
}
