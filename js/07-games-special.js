/* ============================================================================
   PLIK: js/07-games-special.js
   SPECJALNE MINI-GRY TEMATYCZNE: KUCHNIA PANKEJKÓW (5 ETAPÓW + IKONY SVG)
   ============================================================================ */

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
    stage: "bakery_shop",
    shopIdx: 0,
    boughtItems: [],
    addIdx: 0,
    addedIds: [],
    addedItems: [],
    mixClicks: 0,
    addedToppings: [],
    selectedFruitForVoice: PANCAKE_TOPPING_FRUITS[0].id
  };
  renderPancakeCookingStage(lesson);
}

function renderPancakeCookingStage(lesson) {
  const activeLesson = lesson || state.lessons.find(l => l.id === "pancakes_cooking");
  const ps = state.pancakeState;
  const mc = document.getElementById("mainContainer");
  if (!mc || !ps) return;

  const isIgor = isEffectiveIgorMode();

  // ETAP 1: ZAKUPY W PIEKARNI / SKLEPIE ZE ZWROTAMI
  if (ps.stage === "bakery_shop") {
    const targetIng = PANCAKE_BASE_INGREDIENTS[ps.shopIdx];
    const choices = shuffleArray([
      targetIng,
      ...shuffleArray(PANCAKE_BASE_INGREDIENTS.filter(i => i.id !== targetIng.id)).slice(0, 2)
    ]);
    window._pancakeShopChoices = choices;

    const askPhrase = ps.shopIdx === 0
      ? `Good morning! Please give me ${targetIng.en.toLowerCase()}!`
      : `Please give me ${targetIng.en.toLowerCase()}!`;

    mc.innerHTML = `
      ${renderTopGameBar(activeLesson)}
      <div class="bg-white rounded-3xl shadow-xl border-4 border-amber-400 p-4 md:p-6 text-center max-w-3xl mx-auto">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs">🏪 Etap 1/5: Zakupy w Sklepie (${ps.shopIdx + 1}/5)</span>
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

        <div class="grid grid-cols-3 gap-3">
          ${choices.map((it, idx) => `
            <div onclick="pickPancakeShopItem(${idx})" class="kid-card cursor-pointer rounded-3xl border-4 border-amber-200 bg-amber-50/40 hover:border-amber-500 p-4 shadow flex flex-col items-center">
              <div class="text-6xl my-2 float-anim flex items-center justify-center h-16">${it.icon}</div>
              <div class="w-full py-1.5 px-2 rounded-xl bg-white border border-amber-300 font-extrabold text-xs text-amber-950 uppercase">${it.en}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    speakSequence([
      { lang: "pl", text: ps.shopIdx === 0 ? "Wchodzimy do sklepu po składniki na pankejki! Powiedz:" : "Poproś o kolejny składnik:" },
      { lang: "en", text: askPhrase }
    ]);
    return;
  }

  // ETAP 2: WRZUCANIE WSZYSTKICH 5 SKŁADNIKÓW DO MISKI ("ADD ...")
  if (ps.stage === "bowl_add") {
    const targetIng = PANCAKE_BASE_INGREDIENTS[ps.addIdx];
    const cmdEn = `Add ${targetIng.en.toLowerCase()}!`;

    mc.innerHTML = `
      ${renderTopGameBar(activeLesson)}
      <div class="bg-white rounded-3xl shadow-xl border-4 border-sky-400 p-4 md:p-6 text-center max-w-3xl mx-auto">
        <div class="text-xs font-extrabold text-sky-800 uppercase mb-1">🥣 Etap 2/5: Dodajemy składniki do miski (${ps.addIdx + 1}/5)</div>
        <div class="bg-sky-50 p-3.5 rounded-2xl border-2 border-sky-200 mb-3 flex items-center justify-between gap-2">
          <button onclick="speakSequence([{lang:'en',text:'${cmdEn}'}])" class="kid-card w-12 h-12 rounded-2xl bg-sky-500 text-white text-2xl shadow flex items-center justify-center">🔊</button>
          <div class="flex-1">
            <div class="text-xl md:text-3xl font-extrabold text-slate-900">"${cmdEn}"</div>
            <div class="text-xs font-bold text-slate-600">Kliknij właściwy składnik, aby dodać go do miski!</div>
          </div>
        </div>

        <div id="pancakeFeedback" class="min-h-[30px] font-extrabold text-sm mb-2"></div>

        <div class="w-48 h-28 mx-auto mb-4 rounded-b-full bg-gradient-to-b from-amber-100 to-amber-300 border-4 border-amber-500 shadow-inner flex flex-wrap items-center justify-center gap-1.5 p-2">
          ${ps.addedItems.length ? ps.addedItems.map(ic => `<span class="text-2xl pop-correct inline-flex items-center">${ic}</span>`).join("") : `<span class="text-xs font-bold text-amber-800">🥣 Pusta miska</span>`}
        </div>

        <div class="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          ${PANCAKE_BASE_INGREDIENTS.map(ing => {
            const alreadyIn = (ps.addedIds || []).includes(ing.id);
            return `
              <button onclick="addIngredientToBowl('${ing.id}')" ${alreadyIn ? "disabled" : ""} class="kid-card rounded-2xl border-3 ${alreadyIn ? 'border-emerald-300 bg-emerald-50 opacity-45 cursor-not-allowed' : 'border-sky-300 bg-white hover:bg-sky-50'} p-3 shadow flex flex-col items-center">
                <span class="text-4xl mb-1 flex items-center justify-center h-14">${ing.icon}</span>
                <span class="font-extrabold text-xs text-slate-900">${ing.en}</span>
                <span class="text-[10px] font-bold text-slate-500">${ing.pl}</span>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `;
    speakSequence([{ lang: "en", text: cmdEn }, { lang: "pl", text: `Dodaj: ${targetIng.pl}!` }]);
    return;
  }

  // ETAP 3: MIESZANIE CIASTA ("MIX!") I SMAŻENIE PANKEJKÓW ("PANCAKES!")
  if (ps.stage === "bowl_mix") {
    const isMixed = ps.mixClicks >= 3;
    mc.innerHTML = `
      ${renderTopGameBar(activeLesson)}
      <div class="bg-white rounded-3xl shadow-xl border-4 border-purple-400 p-5 text-center max-w-2xl mx-auto">
        <div class="text-xs font-extrabold text-purple-700 uppercase mb-1">🥄🍳 Etap 3/5: Mieszamy i smażymy pankejki!</div>
        <div class="bg-purple-50 p-3.5 rounded-2xl border-2 border-purple-200 mb-4 flex items-center justify-between">
          <button onclick="speakSequence([{lang:'en',text:'${isMixed ? 'Fry the pancakes!' : 'Mix! Mix the ingredients!'}'}])" class="kid-card w-12 h-12 rounded-2xl bg-purple-600 text-white text-2xl shadow flex items-center justify-center">🔊</button>
          <div class="flex-1">
            <div class="text-xl md:text-2xl font-extrabold text-slate-900">${isMixed ? '"Pancakes! Fry the pancakes!"' : '"Mix! Mix the ingredients!"'}</div>
            <div class="text-xs font-bold text-slate-600">${isMixed ? "Ciasto gotowe! Kliknij patelnię, aby usmażyć pankejksy!" : `Kliknij miskę 3 razy, aby wymieszać składniki (${ps.mixClicks}/3)!`}</div>
          </div>
        </div>

        ${!isMixed ? `
          <div onclick="clickMixBowl()" class="kid-card cursor-pointer w-52 h-40 mx-auto rounded-b-full bg-gradient-to-b from-yellow-100 to-amber-300 border-4 border-amber-500 shadow-xl flex flex-col items-center justify-center relative">
            <div class="text-5xl mb-1">🥄🥣</div>
            <div class="font-extrabold text-sm text-amber-950">Kliknij, aby mieszać! (${ps.mixClicks}/3)</div>
          </div>
        ` : `
          <div onclick="fryPancakesOnPan()" class="kid-card cursor-pointer w-56 h-44 mx-auto rounded-3xl bg-gradient-to-b from-slate-700 to-slate-900 border-4 border-amber-400 shadow-xl flex flex-col items-center justify-center text-white">
            <div class="text-6xl mb-1 float-anim">🍳🥞</div>
            <div class="font-extrabold text-base text-amber-300">Usmaż Pankejksy! 🔥</div>
          </div>
        `}
      </div>
    `;
    speakSequence([
      { lang: "en", text: isMixed ? "Pancakes!" : "Mix!" },
      { lang: "pl", text: isMixed ? "Ciasto wymieszane! Kliknij patelnię, aby usmażyć pankejksy!" : "Mieszamy! Kliknij trzy razy w miskę!" }
    ]);
    return;
  }

  // ETAP 4: DEKOROWANIE OWOCAMI
  if (ps.stage === "decorate_fruits") {
    const toppingsHtml = ps.addedToppings.length
      ? ps.addedToppings.map(ic => `<span class="text-3xl pop-correct">${ic}</span>`).join(" ")
      : `<span class="text-xs text-slate-400">Dodaj ulubione owoce na górę!</span>`;

    mc.innerHTML = `
      ${renderTopGameBar(activeLesson)}
      <div class="bg-white rounded-3xl shadow-xl border-4 border-pink-400 p-4 md:p-6 text-center max-w-3xl mx-auto">
        <div class="text-xs font-extrabold text-pink-700 uppercase mb-1">🍓🍌 Etap 4/5: Dekorujemy Pankejksy! (${isIgor ? "Tryb Igora: kliknij owoc lub powiedz" : "Tryb Huberta: powiedz po angielsku jaki owoc dodać!"})</div>
        
        <div class="my-3 p-4 rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50 border-3 border-amber-300 max-w-md mx-auto shadow-inner">
          <div class="flex justify-center gap-1 min-h-[38px] mb-1">${toppingsHtml}</div>
          <div class="text-7xl drop-shadow-md">🥞</div>
          <div class="text-xs font-extrabold text-amber-900 mt-1">Twoje Pankejksy (${ps.addedToppings.length} dodatków)</div>
        </div>

        <div id="pancakeFruitStatus" class="min-h-[34px] font-extrabold text-sm text-rose-800 mb-2 flex items-center justify-center"></div>

        ${isIgor ? `
          <p class="text-xs font-bold text-slate-600 mb-2">Kliknij dowolny owoc, aby położyć go na pankejkach (możesz też poćwiczyć wymowę mikrofonem 🎤):</p>
          <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
            ${PANCAKE_TOPPING_FRUITS.map(f => `
              <div class="rounded-2xl border-2 border-pink-300 bg-pink-50/40 p-2 flex flex-col items-center shadow-sm">
                <button onclick="igorClickFruitTopping('${f.id}')" class="kid-card flex flex-col items-center w-full">
                  <span class="text-4xl">${f.icon}</span>
                  <span class="font-extrabold text-xs text-slate-900 mt-1">${f.en}</span>
                  <span class="text-[10px] text-slate-500">${f.pl}</span>
                </button>
                <button onclick="voiceAddFruitTopping('${f.id}')" class="mt-1.5 w-full py-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px]">🎤 Powiedz</button>
              </div>
            `).join("")}
          </div>
        ` : `
          <p class="text-xs font-bold text-slate-600 mb-2">Wybierz owoc i naciśnij <strong>🎤 Powiedz po angielsku</strong>, aby dodać go na pankejksy!</p>
          <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
            ${PANCAKE_TOPPING_FRUITS.map(f => {
              const sel = ps.selectedFruitForVoice === f.id;
              return `
                <div onclick="selectFruitForHubertVoice('${f.id}')" class="kid-card cursor-pointer rounded-2xl border-3 ${sel ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-400' : 'border-slate-200 bg-white'} p-2.5 flex flex-col items-center shadow-sm">
                  <span class="text-4xl">${f.icon}</span>
                  <span class="font-extrabold text-xs text-slate-900 mt-1">${f.en}</span>
                  <span class="text-[10px] text-slate-500">${f.pl}</span>
                </div>
              `;
            }).join("")}
          </div>
          <div class="flex flex-wrap justify-center gap-2 mb-4">
            <button onclick="speakSelectedFruitHint()" class="kid-card px-4 py-2 rounded-xl bg-sky-500 text-white font-bold text-xs shadow">🔊 Podpowiedz wymowę</button>
            <button onclick="voiceAddFruitTopping(state.pancakeState.selectedFruitForVoice)" class="kid-card px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-lg">🎤 Powiedz nazwę owocu!</button>
            <button onclick="parentApprovePancakeFruit()" class="kid-card px-3.5 py-2 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs border border-emerald-700">🔒 Zalicz (Tata)</button>
          </div>
        `}

        <button onclick="goToFeedPetWithPancakes()" class="kid-card w-full max-w-md py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg">
          🍽️ Gotowe! Podaj Pankejksy Zwierzakowi ➔
        </button>
      </div>
    `;
    speakSequence([
      { lang: "pl", text: isIgor ? "Pankejksy usmażone! Kliknij owoce, które chcesz położyć na górze!" : "Pankejksy usmażone! Wybierz owoc i powiedz jego nazwę po angielsku do mikrofonu!" }
    ]);
    return;
  }

  // ETAP 5: FINAŁ – POCZĘSTUNEK DLA ZWIERZAKA-TOWARZYSZA
  if (ps.stage === "feed_pet") {
    const profKey = getActiveProfileKey();
    const p = ensurePlayerStructure(state.stats[profKey]);
    const petObj = (typeof COMPANION_PETS !== "undefined" ? COMPANION_PETS : []).find(a => a.id === (p.equipped && p.equipped.pet));
    const petIcon = petObj ? petObj.icon : "🦉";
    const petNamePl = petObj ? petObj.pl : "Sówka";

    mc.innerHTML = `
      ${renderTopGameBar(activeLesson)}
      <div class="bg-white rounded-3xl shadow-xl border-4 border-emerald-400 p-6 text-center max-w-2xl mx-auto">
        <div class="text-xs font-extrabold text-emerald-700 uppercase mb-2">🐾 Etap 5/5: Czas na poczęstunek!</div>
        <div class="text-7xl my-2 float-anim">${petIcon}</div>
        <div class="bg-emerald-50 p-3.5 rounded-2xl border-2 border-emerald-300 mb-4">
          <div class="text-lg md:text-2xl font-extrabold text-emerald-950">${petNamePl} mówi: "I'm hungry! Please give me pancakes!"</div>
          <div class="text-xs font-bold text-slate-600 mt-0.5">Jestem głodny! Poproszę pankejksy!</div>
        </div>

        <div onclick="servePancakesToPet()" class="kid-card cursor-pointer p-4 rounded-3xl bg-amber-50 hover:bg-amber-100 border-4 border-amber-400 max-w-xs mx-auto shadow-lg">
          <div class="flex justify-center gap-1 mb-1">${ps.addedToppings.map(ic => `<span class="text-2xl">${ic}</span>`).join("")}</div>
          <div class="text-6xl">🥞</div>
          <div class="mt-2 py-2 px-4 rounded-xl bg-emerald-600 text-white font-extrabold text-sm">🍽️ Podaj i powiedz: "Thank you! Goodbye!"</div>
        </div>
      </div>
    `;
    speakSequence([
      { lang: "en", text: "I am hungry! Please give me pancakes!" },
      { lang: "pl", text: `${petNamePl} jest głodny! Kliknij talerz z pankejkami, aby go poczęstować!` }
    ]);
  }
}

function psSkipToKitchen() { state.pancakeState.stage = "bowl_add"; renderPancakeCookingStage(); }

function pickPancakeShopItem(idx) {
  const ps = state.pancakeState, targetIng = PANCAKE_BASE_INGREDIENTS[ps.shopIdx], chosen = window._pancakeShopChoices[idx], fb = document.getElementById("pancakeFeedback");
  if (chosen.id === targetIng.id) {
    playEffect("success"); ps.boughtItems.push(chosen.smallIcon || chosen.icon);
    if (fb) fb.innerHTML = `<span class="text-emerald-600">✅ Thank you! Masz: ${chosen.pl} (${chosen.en})!</span>`;
    ps.shopIdx++;
    if (ps.shopIdx >= PANCAKE_BASE_INGREDIENTS.length) {
      speakSequence([{ lang: "en", text: "Thank you! Goodbye!" }, { lang: "pl", text: "Wszystkie składniki kupione! Idziemy do kuchni!" }], () => { ps.stage = "bowl_add"; renderPancakeCookingStage(); });
    } else speakSequence([{ lang: "en", text: "Thank you!" }], () => renderPancakeCookingStage());
  } else {
    playEffect("wrong");
    if (fb) fb.innerHTML = `<span class="text-rose-600">❌ To jest ${chosen.pl} (${chosen.en}). Poprosiliśmy o: ${targetIng.en}!</span>`;
    speakSequence([{ lang: "pl", text: `Oj nie, to jest ${chosen.pl}. Poproś o:` }, { lang: "en", text: targetIng.en }]);
  }
}

function addIngredientToBowl(ingId) {
  const ps = state.pancakeState, targetIng = PANCAKE_BASE_INGREDIENTS[ps.addIdx], chosen = PANCAKE_BASE_INGREDIENTS.find(i => i.id === ingId), fb = document.getElementById("pancakeFeedback");
  if (!chosen || !targetIng) return;
  if (chosen.id === targetIng.id) {
    playEffect("success");
    if (!ps.addedIds) ps.addedIds = [];
    ps.addedIds.push(chosen.id);
    ps.addedItems.push(chosen.smallIcon || chosen.icon);
    ps.addIdx++;
    if (ps.addIdx >= PANCAKE_BASE_INGREDIENTS.length) {
      if (fb) fb.innerHTML = `<span class="text-emerald-600">✅ Wszystkie składniki w misce!</span>`;
      speakSequence([{ lang: "pl", text: "Super! Wszystkie składniki są już w misce! Teraz czas na mieszanie!" }], () => { ps.stage = "bowl_mix"; renderPancakeCookingStage(); });
    } else renderPancakeCookingStage();
  } else {
    playEffect("wrong");
    if (fb) fb.innerHTML = `<span class="text-rose-600">❌ Najpierw dodaj: ${targetIng.en} (${targetIng.pl})!</span>`;
    speakSequence([{ lang: "pl", text: "Najpierw dodaj:" }, { lang: "en", text: targetIng.en }]);
  }
}

function clickMixBowl() {
  const ps = state.pancakeState; ps.mixClicks++; playEffect("beep");
  if (ps.mixClicks >= 3) { playEffect("success"); speakSequence([{ lang: "en", text: "Mix, mix, mix!" }], () => renderPancakeCookingStage()); }
  else renderPancakeCookingStage();
}

function fryPancakesOnPan() { playEffect("fanfare"); state.pancakeState.stage = "decorate_fruits"; renderPancakeCookingStage(); }

function igorClickFruitTopping(fruitId) {
  const f = PANCAKE_TOPPING_FRUITS.find(x => x.id === fruitId); if (!f) return;
  state.pancakeState.addedToppings.push(f.icon); playEffect("success"); renderPancakeCookingStage();
  speakSequence([{ lang: "en", text: `Add ${f.en.toLowerCase()}!` }, { lang: "pl", text: `Dodano: ${f.pl}!` }]);
}

function selectFruitForHubertVoice(fruitId) { state.pancakeState.selectedFruitForVoice = fruitId; playEffect("beep"); renderPancakeCookingStage(); }
function speakSelectedFruitHint() { const f = PANCAKE_TOPPING_FRUITS.find(x => x.id === state.pancakeState.selectedFruitForVoice); if (f) speakSequence([{ lang: "pl", text: "Powiedz:" }, { lang: "en", text: f.en }]); }
function parentApprovePancakeFruit() {
  const f = PANCAKE_TOPPING_FRUITS.find(x => x.id === state.pancakeState.selectedFruitForVoice); if (!f) return;
  state.pancakeState.addedToppings.push(f.icon); playEffect("success"); renderPancakeCookingStage();
  speakSequence([{ lang: "en", text: `Yummy ${f.en.toLowerCase()}!` }, { lang: "pl", text: `Tata zalicza! Dodano: ${f.pl}!` }]);
}

function voiceAddFruitTopping(fruitId) {
  const f = PANCAKE_TOPPING_FRUITS.find(x => x.id === fruitId); if (!f) return;
  const stBox = document.getElementById("pancakeFruitStatus");
  playEffect("beep");
  startSpeechRecognitionForWord(f.en, {
    onListening: () => { if (stBox) stBox.innerHTML = `🎙️ MÓW TERAZ PO ANGIELSKU: <strong>"${f.en}"</strong>!`; },
    onSuccess: () => {
      state.pancakeState.addedToppings.push(f.icon);
      playEffect("success");
      renderPancakeCookingStage();
      speakSequence([{ lang: "en", text: `Add ${f.en.toLowerCase()}!` }, { lang: "pl", text: `Brawo! Dodano: ${f.pl}!` }]);
    },
    onFail: () => {
      playEffect("wrong");
      if (stBox) stBox.innerHTML = `🎧 Nie usłyszałem "${f.en}". Spróbuj jeszcze raz lub kliknij 🔒 Zalicz (Tata)!`;
    },
    onUnsupported: () => {
      if (stBox) stBox.innerHTML = `❌ Brak obsługi mikrofonu. Kliknij 🔒 Zalicz (Tata).`;
    }
  });
}

function goToFeedPetWithPancakes() { playEffect("beep"); state.pancakeState.stage = "feed_pet"; renderPancakeCookingStage(); }

function servePancakesToPet() {
  const profKey = getActiveProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  const petId = p.equipped && p.equipped.pet;
  if (petId) {
    if (!p.petXp) p.petXp = {};
    p.petXp[petId] = (p.petXp[petId] || 0) + 1;
  }
  p.stars = (p.stars || 0) + 5;
  p.cups = (p.cups || 0) + 1;
  p.lessonCounts["pancakes_cooking"] = (p.lessonCounts["pancakes_cooking"] || 0) + 1;
  state.stats[profKey] = p;
  state.lastPlayedLessonId = "pancakes_cooking";
  state.lastPlayedSubMode = "pancake_cooking_game";
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  playEffect("fanfare");

  const mc = document.getElementById("mainContainer");
  if (mc) {
    mc.innerHTML = `
      <div class="bg-white rounded-3xl shadow-2xl border-4 border-amber-400 p-6 text-center max-w-xl mx-auto">
        <div class="text-6xl mb-2">🥞🎉🏆</div>
        <h2 class="text-3xl font-extrabold text-amber-950 mb-2">Yummy! Thank you! Goodbye!</h2>
        <p class="text-slate-700 font-bold mb-4">Pankejksy zjedzone ze smakiem! Zdobywasz <strong>+5 ⭐</strong> oraz Puchar Mistrza Kuchni!</p>
        <div class="flex flex-col gap-2.5">
          <button onclick="startPancakeCookingGame()" class="kid-card w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base shadow">🔄 Zagraj jeszcze raz</button>
          <button onclick="startNextSequentialLesson()" class="kid-card w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base shadow">⏭️ Następna lekcja</button>
          <button onclick="showLessonMenu()" class="kid-card w-full py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-base shadow">🏠 Wróć do Lekcji</button>
        </div>
      </div>
    `;
  }
  speakSequence([
    { lang: "en", text: "Yummy pancakes! Thank you! Goodbye!" },
    { lang: "pl", text: "Brawo! Upiekłeś pyszne pankejksy i zdobywasz pięć złotych gwiazdek!" }
  ]);
}
