/* ============================================================================
   PLIK: js/09-parent-init.js
   PIN, KAFELKOWY PANEL RODZICA, GENERATOR LEKCJI, EDYCJA SŁÓWEK I START
   ============================================================================ */

const BUILT_IN_TOPIC_BANK = [
  {
    keywords: ["pojazd", "auto", "samoch", "maszyn", "transport", "vehicle", "car", "straż", "pociąg", "rakiet"],
    icon: "🚒🚀",
    words: [
      { en: "Car", pl: "Samochód", phonetic: "kar", icon: "🚗", age: [4, 6] },
      { en: "Fire truck", pl: "Wóz strażacki", phonetic: "fajer trak", icon: "🚒", age: [4, 6] },
      { en: "Police car", pl: "Radiowóz", phonetic: "polis kar", icon: "🚓", age: [4, 6] },
      { en: "Train", pl: "Pociąg", phonetic: "trejn", icon: "🚂", age: [4, 6] },
      { en: "Airplane", pl: "Samolot", phonetic: "erplejn", icon: "✈️", age: [4, 6] },
      { en: "Helicopter", pl: "Helikopter", phonetic: "helikopter", icon: "🚁", age: [4, 6] },
      { en: "Tractor", pl: "Traktor", phonetic: "traktor", icon: "🚜", age: [4, 6] },
      { en: "Rocket", pl: "Rakieta", phonetic: "rokit", icon: "🚀", age: [4, 6] },
      { en: "Bicycle", pl: "Rower", phonetic: "bajsikl", icon: "🚲", age: [6] },
      { en: "Ambulance", pl: "Karetka", phonetic: "ambjulans", icon: "🚑", age: [6] },
      { en: "Bus", pl: "Autobus", phonetic: "bas", icon: "🚌", age: [4, 6] },
      { en: "Boat", pl: "Łódka", phonetic: "bołt", icon: "⛵", age: [4, 6] }
    ]
  },
  {
    keywords: ["zabawk", "toy", "klock", "miś", "lalk", "piłk", "robot"],
    icon: "🧸🤖",
    words: [
      { en: "Ball", pl: "Piłka", phonetic: "bol", icon: "⚽", age: [4, 6] },
      { en: "Teddy bear", pl: "Pluszowy miś", phonetic: "tedi ber", icon: "🧸", age: [4, 6] },
      { en: "Robot", pl: "Robot", phonetic: "robot", icon: "🤖", age: [4, 6] },
      { en: "Blocks", pl: "Klocki", phonetic: "bloks", icon: "🧱", age: [4, 6] },
      { en: "Doll", pl: "Lalka", phonetic: "dol", icon: "🪆", age: [4, 6] },
      { en: "Puzzle", pl: "Puzzle", phonetic: "pazl", icon: "🧩", age: [4, 6] },
      { en: "Kite", pl: "Latawiec", phonetic: "kajt", icon: "🪁", age: [6] },
      { en: "Drum", pl: "Bębenek", phonetic: "dram", icon: "🥁", age: [4, 6] },
      { en: "Balloon", pl: "Balon", phonetic: "balun", icon: "🎈", age: [4, 6] },
      { en: "Skateboard", pl: "Deskorolka", phonetic: "skejtbord", icon: "🛹", age: [6] }
    ]
  },
  {
    keywords: ["ubran", "odzież", "ciuch", "garderob", "clothe", "czapk", "kurtk", "buty"],
    icon: "👕🧢",
    words: [
      { en: "T-shirt", pl: "Koszulka", phonetic: "ti-szert", icon: "👕", age: [4, 6] },
      { en: "Cap", pl: "Czapka z daszkiem", phonetic: "kap", icon: "🧢", age: [4, 6] },
      { en: "Trousers", pl: "Spodnie", phonetic: "trałzers", icon: "👖", age: [4, 6] },
      { en: "Shorts", pl: "Krótkie spodenki", phonetic: "szorts", icon: "🩳", age: [4, 6] },
      { en: "Shoes", pl: "Buty", phonetic: "szuz", icon: "👟", age: [4, 6] },
      { en: "Socks", pl: "Skarpetki", phonetic: "soks", icon: "🧦", age: [4, 6] },
      { en: "Jacket", pl: "Kurtka", phonetic: "dżakit", icon: "🧥", age: [4, 6] },
      { en: "Hat", pl: "Kapelusz / Czapka", phonetic: "hat", icon: "🎩", age: [4, 6] },
      { en: "Gloves", pl: "Rękawiczki", phonetic: "glaws", icon: "🧤", age: [6] },
      { en: "Scarf", pl: "Szalik", phonetic: "skarf", icon: "🧣", age: [6] }
    ]
  },
  {
    keywords: ["pogod", "weather", "słońc", "deszcz", "śnieg", "wiatr", "pory roku"],
    icon: "☀️🌈",
    words: [
      { en: "Sun", pl: "Słońce", phonetic: "san", icon: "☀️", age: [4, 6] },
      { en: "Rain", pl: "Deszcz", phonetic: "rejn", icon: "🌧️", age: [4, 6] },
      { en: "Snow", pl: "Śnieg", phonetic: "snoł", icon: "❄️", age: [4, 6] },
      { en: "Cloud", pl: "Chmura", phonetic: "klałd", icon: "☁️", age: [4, 6] },
      { en: "Wind", pl: "Wiatr", phonetic: "łind", icon: "💨", age: [4, 6] },
      { en: "Rainbow", pl: "Tęcza", phonetic: "rejnboł", icon: "🌈", age: [4, 6] },
      { en: "Storm", pl: "Burza", phonetic: "storm", icon: "⛈️", age: [6] },
      { en: "Snowman", pl: "Bałwan", phonetic: "snołmen", icon: "⛄", age: [4, 6] },
      { en: "Umbrella", pl: "Parasol", phonetic: "ambrela", icon: "☂️", age: [6] },
      { en: "Lightning", pl: "Błyskawica", phonetic: "lajtning", icon: "⚡", age: [6] }
    ]
  },
  {
    keywords: ["dom", "pokój", "mieszkan", "house", "home", "room", "kuchn", "łazien"],
    icon: "🏠🛋️",
    words: [
      { en: "House", pl: "Dom", phonetic: "hałs", icon: "🏠", age: [4, 6] },
      { en: "Door", pl: "Drzwi", phonetic: "dor", icon: "🚪", age: [4, 6] },
      { en: "Window", pl: "Okno", phonetic: "łindoł", icon: "🪟", age: [4, 6] },
      { en: "Bed", pl: "Łóżko", phonetic: "bed", icon: "🛏️", age: [4, 6] },
      { en: "Chair", pl: "Krzesło", phonetic: "czer", icon: "🪑", age: [4, 6] },
      { en: "Table", pl: "Stół", phonetic: "tejbl", icon: "🪵", age: [4, 6] },
      { en: "Kitchen", pl: "Kuchnia", phonetic: "kiczen", icon: "🍳", age: [6] },
      { en: "Bathroom", pl: "Łazienka", phonetic: "bafrum", icon: "🛁", age: [6] },
      { en: "Bedroom", pl: "Sypialnia", phonetic: "bedrum", icon: "🛌", age: [6] },
      { en: "Lamp", pl: "Lampa", phonetic: "lamp", icon: "💡", age: [4, 6] }
    ]
  },
  {
    keywords: ["rodzin", "family", "mama", "tata", "brat", "siostr", "babci", "dziad"],
    icon: "👨‍👩‍👦‍👦❤️",
    words: [
      { en: "Mom", pl: "Mama", phonetic: "mam", icon: "👩", age: [4, 6] },
      { en: "Dad", pl: "Tata", phonetic: "dad", icon: "👨", age: [4, 6] },
      { en: "Brother", pl: "Brat", phonetic: "brafer", icon: "👦", age: [4, 6] },
      { en: "Sister", pl: "Siostra", phonetic: "sister", icon: "👧", age: [4, 6] },
      { en: "Baby", pl: "Dzidziuś", phonetic: "bejbi", icon: "👶", age: [4, 6] },
      { en: "Grandma", pl: "Babcia", phonetic: "granma", icon: "👵", age: [4, 6] },
      { en: "Grandpa", pl: "Dziadek", phonetic: "granpa", icon: "👴", age: [4, 6] },
      { en: "Family", pl: "Rodzina", phonetic: "famili", icon: "👨‍👩‍👦‍👦", age: [6] }
    ]
  },
  {
    keywords: ["kosmos", "space", "planet", "gwiazd", "księżyc", "astronaut", "ufo"],
    icon: "🚀🪐",
    words: [
      { en: "Rocket", pl: "Rakieta", phonetic: "rokit", icon: "🚀", age: [4, 6] },
      { en: "Star", pl: "Gwiazda", phonetic: "star", icon: "⭐", age: [4, 6] },
      { en: "Moon", pl: "Księżyc", phonetic: "mun", icon: "🌕", age: [4, 6] },
      { en: "Sun", pl: "Słońce", phonetic: "san", icon: "☀️", age: [4, 6] },
      { en: "Planet", pl: "Planeta", phonetic: "planet", icon: "🪐", age: [4, 6] },
      { en: "Astronaut", pl: "Astronauta", phonetic: "astronot", icon: "👨‍🚀", age: [6] },
      { en: "Earth", pl: "Ziemia", phonetic: "erf", icon: "🌍", age: [6] },
      { en: "Alien", pl: "Kosmita", phonetic: "ejlien", icon: "👽", age: [4, 6] },
      { en: "Telescope", pl: "Teleskop", phonetic: "teleskop", icon: "🔭", age: [6] },
      { en: "Comet", pl: "Kometa", phonetic: "komet", icon: "☄️", age: [6] }
    ]
  },
  {
    keywords: ["emocj", "uczuci", "nastr", "feeling", "wesoł", "smutn", "głodn"],
    icon: "😊🤩",
    words: [
      { en: "Happy", pl: "Wesoły / Szczęśliwy", phonetic: "hapi", icon: "😊", age: [4, 6] },
      { en: "Sad", pl: "Smutny", phonetic: "sad", icon: "😢", age: [4, 6] },
      { en: "Angry", pl: "Zły", phonetic: "angri", icon: "😠", age: [4, 6] },
      { en: "Sleepy", pl: "Śpiący", phonetic: "slipi", icon: "😴", age: [4, 6] },
      { en: "Hungry", pl: "Głodny", phonetic: "hangri", icon: "😋", age: [4, 6] },
      { en: "Scared", pl: "Wystraszony", phonetic: "skerd", icon: "😱", age: [6] },
      { en: "Surprised", pl: "Zaskoczony", phonetic: "serprajzd", icon: "😲", age: [6] },
      { en: "Tired", pl: "Zmęczony", phonetic: "tajerd", icon: "🥱", age: [6] }
    ]
  }
];

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

function getPendingTestItemsCount() {
  let total = state.lessons.filter(l => l.testOnly).length;
  state.lessons.forEach(l => {
    if (!l.testOnly && Array.isArray(l.items)) {
      total += l.items.filter(it => it.testOnly).length;
    }
  });
  return total;
}

function backToParentMenu() {
  document.querySelectorAll(".parent-sub-section").forEach(el => el.classList.add("hidden"));
  const menu = document.getElementById("parentMenuGrid");
  if (menu) menu.classList.remove("hidden");
  const backBtn = document.getElementById("parentBackToMenuBtn");
  if (backBtn) backBtn.classList.add("hidden");
  const hdr = document.getElementById("parentModalHeaderTitle");
  if (hdr) hdr.innerHTML = `🛠️ Panel Rodzica (<span data-app-version>Wersja ${CURRENT_GAME_VERSION}</span>)`;
  const badge = document.getElementById("parentMenuPendingBadge");
  if (badge) badge.textContent = `${getPendingTestItemsCount()} oczekujących`;
  syncVersionLabelsInDom();
}

function openParentSection(sectionKey) {
  const menu = document.getElementById("parentMenuGrid");
  if (menu) menu.classList.add("hidden");
  document.querySelectorAll(".parent-sub-section").forEach(el => el.classList.add("hidden"));

  const target = document.getElementById(`parentSection_${sectionKey}`);
  if (target) target.classList.remove("hidden");
  const backBtn = document.getElementById("parentBackToMenuBtn");
  if (backBtn) backBtn.classList.remove("hidden");

  const titlesMap = {
    new_lesson: "✨ Nowa Lekcja (Automat)",
    add_word: "➕ Dodaj Nowe Słówko",
    test_center: "🧪 Centrum Testowe i Poziomy",
    manage_lessons: "🗂️ Przegląd i Edycja Lekcji",
    hard_words: "🎯 Trudne Słówka Synów",
    scanner_ai: "📷 Klucz AI i Skaner Zdjęć",
    rewards_settings: "🎁 Skrzynie, Runda i Tester",
    backup_reset: "💾 Kopia Zapasowa i Reset"
  };
  const hdr = document.getElementById("parentModalHeaderTitle");
  if (hdr) hdr.textContent = titlesMap[sectionKey] || "🛠️ Panel Rodzica";

  if (sectionKey === "test_center") renderParentTestCenter();
  if (sectionKey === "manage_lessons") renderParentLessonsManager();
  if (sectionKey === "hard_words") renderParentHardWordsView();
  if (sectionKey === "add_word") populateParentLessonSelect("parentSelectLesson");
}

function populateParentLessonSelect(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = state.lessons
    .filter(l => l.type !== "memory_game")
    .map(l => `<option value="${l.id}">${l.title}${l.testOnly ? ' (🧪 TEST)' : ''}</option>`)
    .join("");
}

function openParentDashboard() {
  const m = document.getElementById("parentDashboardModal");
  if (m) { m.classList.remove("hidden"); m.classList.add("flex"); }
  backToParentMenu();

  const keyInput = document.getElementById("parentGeminiKey");
  if (keyInput && !keyInput.value) {
    try { keyInput.value = localStorage.getItem("akademia_gemini_key") || ""; } catch (e) {}
  }

  populateParentLessonSelect("parentSelectLesson");
  const lenBox = document.getElementById("roundLengthButtons");
  if (lenBox) {
    lenBox.innerHTML = [5, 8, 10, 15, 20].map(v => `
      <button onclick="parentSetQuestionsPerRound(${v})" class="px-3.5 py-2 rounded-xl text-xs font-extrabold border-2 ${state.questionsPerRound === v ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-slate-700 border-slate-300'}">${v} pytań</button>
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
  m.textContent = txt;
  m.className = `mb-3 p-3 rounded-2xl border-2 font-bold text-sm text-center ${isErr ? 'bg-rose-100 border-rose-400 text-rose-900' : 'bg-emerald-100 border-emerald-400 text-emerald-900'}`;
  m.classList.remove("hidden");
  setTimeout(() => m.classList.add("hidden"), 5000);
}

// ------------------------------------------------------------------------
// AUTOMATYCZNY GENERATOR LEKCJI Z TYTUŁU I OPISU
// ------------------------------------------------------------------------
async function parentAutoGenerateLesson() {
  const titleEl = document.getElementById("newLessonTitle");
  const descEl = document.getElementById("newLessonDesc");
  const iconEl = document.getElementById("newLessonIcon");
  const ageMode = document.getElementById("newLessonTargetAge").value;
  const wordCount = parseInt(document.getElementById("newLessonWordCount").value) || 8;
  const linesEl = document.getElementById("newLessonLines");
  const previewBox = document.getElementById("generatedLessonPreviewBox");

  const title = (titleEl ? titleEl.value : "").trim();
  const desc = (descEl ? descEl.value : "").trim();
  if (!title && !desc) {
    return showParentMsg("Wpisz chociaż tytuł lub krótki opis nowej lekcji!", true);
  }

  let apiKey = "";
  try { apiKey = (document.getElementById("parentGeminiKey")?.value || localStorage.getItem("akademia_gemini_key") || "").trim(); } catch (e) {}

  let generatedWords = [];
  let suggestedIcon = (iconEl ? iconEl.value : "").trim();

  if (apiKey) {
    showParentMsg("✨ Generuję lekcję przez Gemini AI (słówka, ikony, wymowa i poziomy)...", false);
    try {
      const prompt = `Stwórz zestaw ${wordCount} słówek do nauki angielskiego dla dzieci (Igor 4 lata, Hubert 6 lat).
Tytuł lekcji: "${title}". Opis tematu: "${desc}". Preferencja wieku: "${ageMode}".
Zwróć wynik WYŁĄCZNIE jako czysty obiekt JSON bez markdowna:
{"lessonIcon":"2 emoji","items":[{"en":"English word","pl":"Polskie tłumaczenie","phonetic":"zapis fonetyczny po polsku","icon":"1 emoji","age":[4,6]}]}`;

      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await resp.json();
      const rawText = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(rawText);
      if (parsed && Array.isArray(parsed.items) && parsed.items.length > 0) {
        if (!suggestedIcon && parsed.lessonIcon) suggestedIcon = parsed.lessonIcon;
        generatedWords = parsed.items.slice(0, wordCount).map((it, idx) => ({
          en: String(it.en || "").trim(),
          pl: String(it.pl || "").trim(),
          phonetic: String(it.phonetic || "").trim(),
          icon: String(it.icon || "📘").trim(),
          age: ageMode === "4" ? [4] : ageMode === "6" ? [6] : ageMode === "4,6" ? [4, 6] : (Array.isArray(it.age) ? it.age : (idx >= Math.ceil(wordCount * 0.7) ? [6] : [4, 6]))
        }));
      }
    } catch (e) {
      generatedWords = [];
    }
  }

  // Fallback / tryb bez klucza API – dopasowanie z wbudowanej bazy tematycznej + wszystkich słów
  if (generatedWords.length === 0) {
    const query = `${title} ${desc}`.toLowerCase();
    let matchedTopic = BUILT_IN_TOPIC_BANK.find(t => t.keywords.some(kw => query.includes(kw)));

    if (!matchedTopic) {
      matchedTopic = BUILT_IN_TOPIC_BANK[Math.floor(Math.random() * BUILT_IN_TOPIC_BANK.length)];
    }

    if (!suggestedIcon) suggestedIcon = matchedTopic.icon;

    // Jeśli użytkownik wymienił konkretne polskie słowa w opisie, sortujemy je na początek
    const prioritized = [...matchedTopic.words].sort((a, b) => {
      const aHit = query.includes(a.pl.toLowerCase().slice(0, 4)) ? -1 : 0;
      const bHit = query.includes(b.pl.toLowerCase().slice(0, 4)) ? -1 : 0;
      return aHit - bHit;
    });

    generatedWords = prioritized.slice(0, wordCount).map((w, idx) => ({
      en: w.en,
      pl: w.pl,
      phonetic: w.phonetic || "",
      icon: w.icon || "📘",
      age: ageMode === "4" ? [4] : ageMode === "6" ? [6] : ageMode === "4,6" ? [4, 6] : (w.age || (idx >= Math.ceil(wordCount * 0.7) ? [6] : [4, 6]))
    }));
  }

  if (iconEl && !iconEl.value.trim()) iconEl.value = suggestedIcon || "📚✨";
  if (titleEl && !titleEl.value.trim()) titleEl.value = `${state.lessons.length + 1}. Nowa lekcja`;

  if (linesEl) {
    linesEl.value = generatedWords.map(w => `${w.en} - ${w.pl} - ${w.icon} - ${w.age.join(",")} - ${w.phonetic}`).join("\n");
  }

  if (previewBox) {
    previewBox.classList.remove("hidden");
    previewBox.innerHTML = `
      <div class="flex items-center justify-between border-b border-emerald-200 pb-1.5">
        <span class="text-xs font-extrabold text-emerald-900">✅ Wygenerowano ${generatedWords.length} słówek (${suggestedIcon}):</span>
        <span class="text-[10px] font-bold text-slate-500">Gotowe do zapisu!</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        ${generatedWords.map(w => `
          <div class="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-left">
            <span class="text-2xl">${w.icon}</span>
            <div class="min-w-0">
              <div class="font-extrabold text-xs text-slate-900 truncate">${w.en}</div>
              <div class="text-[10px] text-slate-600 truncate">${w.pl}</div>
              <span class="text-[9px] font-bold px-1.5 rounded bg-indigo-100 text-indigo-800">${w.age.length > 1 ? '4 i 6 l.' : w.age[0] + ' l.'}</span>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  playEffect("success");
  showParentMsg(`✨ Wygenerowano automatycznie ${generatedWords.length} słówek! Sprawdź podgląd i kliknij „Zapisz nową lekcję”.`);
}

function parentCreateNewLesson() {
  const t = document.getElementById("newLessonTitle").value.trim();
  const ic = document.getElementById("newLessonIcon").value.trim();
  const text = document.getElementById("newLessonLines").value.trim();
  if (!t || !text) return showParentMsg("Wpisz tytuł i kliknij „Wygeneruj lekcję automatycznie”!", true);

  const lines = text.split("\n").filter(l => l.trim().length > 0);
  const items = [];
  lines.forEach(l => {
    const p = l.split("-").map(x => x.trim());
    if (p.length >= 2) {
      const rawAge = p[3] || "4,6";
      const ageArr = rawAge === "4" ? [4] : rawAge === "6" ? [6] : [4, 6];
      items.push({ en: p[0], pl: p[1], icon: p[2] || "📝", age: ageArr, phonetic: p[4] || "" });
    }
  });
  if (items.length === 0) return showParentMsg("Nie rozpoznałem słówek. Użyj generatora lub formatu: En - Pl - Ikona", true);

  const nid = "custom_" + Date.now();
  state.lessons.push({
    id: nid,
    title: t,
    subtitle: `${items.length} słówek • Dodano przez Rodzica`,
    icon: ic || "📚✨",
    color: "from-sky-400 to-indigo-500",
    borderColor: "border-sky-400",
    type: "vocab",
    testOnly: true,
    items
  });
  saveCloudData();
  playEffect("success");
  showParentMsg(`✓ Utworzono lekcję "${t}" (${items.length} słówek) w Centrum Testowym Taty!`);
  document.getElementById("newLessonTitle").value = "";
  document.getElementById("newLessonDesc").value = "";
  document.getElementById("newLessonIcon").value = "";
  document.getElementById("newLessonLines").value = "";
  const pb = document.getElementById("generatedLessonPreviewBox");
  if (pb) pb.classList.add("hidden");
}

// ------------------------------------------------------------------------
// CENTRUM TESTOWE I PRZEGLĄD / EDYCJA LEKCJI
// ------------------------------------------------------------------------
function parentToggleEqualizeLessonForIgor(lessonId) {
  if (!Array.isArray(state.equalizedLessonsForIgor)) state.equalizedLessonsForIgor = [];
  const idx = state.equalizedLessonsForIgor.indexOf(lessonId);
  if (idx >= 0) state.equalizedLessonsForIgor.splice(idx, 1);
  else state.equalizedLessonsForIgor.push(lessonId);
  saveCloudData();
  renderParentTestCenter();
  if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
  const l = state.lessons.find(x => x.id === lessonId);
  const active = state.equalizedLessonsForIgor.includes(lessonId);
  showParentMsg(active ? `✓ Lekcja „${l ? l.title : lessonId}” dla Igorka ma teraz poziom Huberta!` : `✓ Przywrócono standardowy poziom (4 l.).`);
}

function renderParentTestCenter() {
  const box = document.getElementById("parentTestCenterBox");
  if (!box) return;

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

  const pendingListHtml = totalPending === 0
    ? `<div class="text-xs font-bold text-teal-800 bg-white/80 p-3 rounded-2xl border border-teal-200">✓ Wszystkie lekcje i słówka są zatwierdzone dla Igora i Huberta!</div>`
    : `<div class="space-y-1.5 mb-3 max-h-44 overflow-y-auto pr-1">
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
      </button>`;

  box.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
      <h3 class="font-extrabold text-teal-950 text-base">🧪 Centrum Testowe Taty</h3>
      <span class="px-2.5 py-0.5 rounded-full bg-teal-200 text-teal-950 font-extrabold text-xs">Oczekujące: ${totalPending}</span>
    </div>
    ${pendingListHtml}
    <div class="mt-3 p-3 rounded-2xl bg-white border-2 border-indigo-200">
      <div class="text-xs font-extrabold text-indigo-950 mb-1.5">👦➔🧑 Zrównanie poziomu wybranej lekcji Igorka z Hubertem (6 opcji i pełne słówka):</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-44 overflow-y-auto pr-1">
        ${state.lessons.map(l => {
          const isEq = eqList.includes(l.id);
          return `
            <button onclick="parentToggleEqualizeLessonForIgor('${l.id}')" class="flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-left text-xs font-bold ${isEq ? 'bg-indigo-600 text-white border-indigo-800' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-indigo-50'}">
              <span class="truncate pr-1">${l.title}</span>
              <span class="shrink-0 text-[10px] px-1.5 py-0.5 rounded-md ${isEq ? 'bg-white text-indigo-900 font-extrabold' : 'bg-slate-200 text-slate-600'}">${isEq ? 'Poziom Huberta ✓' : 'Standard (4 l.)'}</span>
            </button>
          `;
        }).join("")}
      </div>
    </div>
    <div class="mt-3 pt-3 border-t border-teal-200 flex flex-wrap gap-2">
      <button onclick="unlockAllForTataOnly()" class="kid-card py-2 px-3 bg-emerald-700 text-white font-bold rounded-xl text-xs">🔓 Odblokuj wszystko TYLKO u Taty</button>
      <button onclick="parentGiveTestChest('tata','gold')" class="kid-card py-2 px-3 bg-amber-400 text-amber-950 font-bold rounded-xl text-xs">👑 Złota Skrzynia (Tata)</button>
      <button onclick="parentResetWhatsNewGlow()" class="kid-card py-2 px-3 bg-rose-100 text-rose-900 border border-rose-300 font-bold rounded-xl text-xs">🔄 Zresetuj "Co nowego?"</button>
    </div>
  `;
}

function renderParentLessonsManager() {
  const box = document.getElementById("parentLessonsManagerBox");
  if (!box) return;
  const editableLessons = state.lessons.filter(l => Array.isArray(l.items) && l.items.length > 0);
  if (!window._managedLessonId || !editableLessons.some(l => l.id === window._managedLessonId)) {
    window._managedLessonId = editableLessons[0]?.id || "";
  }
  const activeLesson = editableLessons.find(l => l.id === window._managedLessonId);
  const isCustom = activeLesson && activeLesson.id.startsWith("custom_");

  box.innerHTML = `
    <div class="space-y-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <select onchange="window._managedLessonId=this.value; renderParentLessonsManager();" class="flex-1 p-2.5 rounded-xl border-2 border-purple-300 bg-white font-extrabold text-sm">
          ${editableLessons.map(l => `<option value="${l.id}" ${l.id === window._managedLessonId ? "selected" : ""}>${l.title} (${l.items.length} słówek)</option>`).join("")}
        </select>
        ${isCustom ? `<button onclick="parentDeleteCustomLesson('${activeLesson.id}')" class="px-3.5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs">🗑️ Usuń całą lekcję</button>` : ""}
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
        ${(activeLesson ? activeLesson.items : []).map((it, idx) => {
          const ageArr = Array.isArray(it.age) ? it.age : [4, 6];
          const ageLabel = ageArr.includes(4) && ageArr.includes(6) ? "4 i 6 lat" : ageArr.includes(4) ? "Tylko 4 l." : "Tylko 6 l.";
          return `
            <div class="p-2.5 rounded-2xl bg-white border border-purple-200 flex items-center justify-between gap-2 text-xs">
              <div class="flex items-center gap-2 min-w-0">
                <span class="text-2xl shrink-0">${it.icon || it.animal || "📘"}</span>
                <div class="min-w-0">
                  <div class="font-extrabold text-slate-900 truncate">${it.en}</div>
                  <div class="text-slate-600 truncate">${it.pl}</div>
                </div>
              </div>
              <div class="flex items-center gap-1 shrink-0">
                <button onclick="parentToggleWordAge('${activeLesson.id}', ${idx})" class="px-2 py-1 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold text-[10px]" title="Kliknij, aby zmienić grupę wiekową">${ageLabel}</button>
                <button onclick="parentDeleteLessonWord('${activeLesson.id}', ${idx})" class="px-2 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-[10px]">✖</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function parentToggleWordAge(lessonId, wordIdx) {
  const l = state.lessons.find(x => x.id === lessonId);
  if (!l || !l.items[wordIdx]) return;
  const cur = l.items[wordIdx].age || [4, 6];
  if (cur.includes(4) && cur.includes(6)) l.items[wordIdx].age = [6];
  else if (cur.includes(6)) l.items[wordIdx].age = [4];
  else l.items[wordIdx].age = [4, 6];
  saveCloudData();
  renderParentLessonsManager();
}

function parentDeleteLessonWord(lessonId, wordIdx) {
  const l = state.lessons.find(x => x.id === lessonId);
  if (!l || !l.items[wordIdx] || l.items.length <= 1) return showParentMsg("Lekcja musi zawierać przynajmniej 1 słówko!", true);
  if (!confirm(`Usunąć słówko "${l.items[wordIdx].en}"?`)) return;
  l.items.splice(wordIdx, 1);
  saveCloudData();
  renderParentLessonsManager();
  showParentMsg("✓ Usunięto słówko.");
}

function parentDeleteCustomLesson(lessonId) {
  if (!confirm("Czy na pewno usunąć całą własną lekcję?")) return;
  state.lessons = state.lessons.filter(l => l.id !== lessonId);
  window._managedLessonId = "";
  saveCloudData();
  renderParentLessonsManager();
  showParentMsg("✓ Usunięto lekcję.");
}

function renderParentHardWordsView() {
  const box = document.getElementById("parentHardWordsBox");
  if (!box) return;
  const renderCol = (key, label, borderCls) => {
    const list = (state.stats[key] && Array.isArray(state.stats[key].hardWords)) ? state.stats[key].hardWords : [];
    return `
      <div class="p-3 rounded-2xl bg-white border-2 ${borderCls} flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="font-extrabold text-sm text-slate-900">${label} (${list.length})</span>
            ${list.length ? `<button onclick="parentClearHardWords('${key}')" class="px-2 py-1 rounded-lg bg-rose-100 text-rose-800 font-bold text-[10px]">Wyczyść</button>` : ""}
          </div>
          ${list.length === 0 ? `<p class="text-xs text-slate-500">Brak trudnych słówek – wszystko opanowane! 🎉</p>` : `<div class="space-y-1 max-h-56 overflow-y-auto">${list.map(w => `<div class="text-xs font-bold bg-slate-50 px-2.5 py-1.5 rounded-xl flex justify-between"><span>${w.icon || "⭐"} ${w.en}</span><span class="text-slate-500">${w.pl}</span></div>`).join("")}</div>`}
        </div>
      </div>
    `;
  };
  box.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${renderCol("igor", "👦 IGOR", "border-amber-300")}${renderCol("hubert", "🧑 HUBERT", "border-sky-300")}</div>`;
}

function parentClearHardWords(profKey) {
  if (!confirm("Wyczyścić listę trudnych słówek?")) return;
  if (state.stats[profKey]) state.stats[profKey].hardWords = [];
  saveCloudData();
  renderParentHardWordsView();
  showParentMsg("✓ Wyczyszczono listę trudnych słówek.");
}

function parentResetWhatsNewGlow() {
  if (!confirm("Zresetować powiadomienie 'Co nowego?' dla wszystkich profili?")) return;
  ["igor", "hubert", "tata"].forEach(k => { if (state.stats[k]) state.stats[k].seenVersion = ""; });
  saveCloudData();
  if (typeof updateWhatsNewButtonGlow === "function") updateWhatsNewButtonGlow();
  showParentMsg("✓ Zresetowano okno 'Co nowego?'!");
}

function parentPublishAllTestItems() {
  if (!confirm("Trwale zatwierdzić wszystkie lekcje i słówka dla Igora i Huberta?")) return;
  let count = 0;
  const approvedIds = new Set([...(state.approvedLessonIds || []), ...getStoredApprovedLessonIds()]);
  state.lessons.forEach(l => {
    if (l.testOnly) { delete l.testOnly; approvedIds.add(l.id); count++; }
    if (Array.isArray(l.items)) {
      l.items.forEach(it => {
        if (it.testOnly) { delete it.testOnly; approvedIds.add(`${l.id}::${(it.en || "").toLowerCase()}`); count++; }
      });
    }
  });
  persistApprovedLessonIds(Array.from(approvedIds));
  saveCloudData();
  renderParentTestCenter();
  if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
  showParentMsg(`✓ Trwale zatwierdzono ${count} nowości dla Igora i Huberta!`);
}

function parentDeleteTestLesson(lessonId) {
  if (!confirm("Usunąć tę testową lekcję?")) return;
  state.lessons = state.lessons.filter(l => l.id !== lessonId);
  saveCloudData(); renderParentTestCenter();
  showParentMsg("✓ Usunięto testową lekcję.");
}

function parentDeleteTestWord(lessonId, wordIdx) {
  if (!confirm("Usunąć to testowe słówko?")) return;
  const l = state.lessons.find(x => x.id === lessonId);
  if (l && l.items[wordIdx]) l.items.splice(wordIdx, 1);
  saveCloudData(); renderParentTestCenter();
  showParentMsg("✓ Usunięto testowe słówko.");
}

function unlockAllForTataOnly() {
  if (!confirm("Odblokować wszystkie 131 ubrań, 50 zwierzaków i Spiżarnię na koncie TATA?")) return;
  state.stats.tata = ensurePlayerStructure(state.stats.tata);
  state.stats.tata.unlockedItems = getAll131OutfitsFlat().map(o => o.src);
  state.stats.tata.memoryAnimals = (typeof COMPANION_PETS !== "undefined" ? COMPANION_PETS : []).map(a => a.id);
  if (typeof PET_FOOD_POOL !== "undefined") PET_FOOD_POOL.forEach(f => { state.stats.tata.petFood[f.id] = 3; });
  saveCloudData();
  showParentMsg("✓ Odblokowano wszystko na profilu TATA!");
}

function parentExportBackupJson() {
  const backupObj = {
    version: CURRENT_GAME_VERSION, exportedAt: new Date().toISOString(), stats: state.stats,
    calibration: state.calibration, questionsPerRound: state.questionsPerRound,
    approvedLessonIds: state.approvedLessonIds, equalizedLessonsForIgor: state.equalizedLessonsForIgor, lessons: state.lessons
  };
  const blob = new Blob([JSON.stringify(backupObj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `akademia_kopia_v${CURRENT_GAME_VERSION}_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showParentMsg("✓ Pobrano plik kopii zapasowej (.json)!");
}

function parentImportBackupJson(input) {
  if (!input.files || input.files.length === 0) return;
  if (!confirm("Wczytać kopię zapasową z pliku (.json)?")) { input.value = ""; return; }
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!parsed || !parsed.stats) throw new Error("Nieprawidłowy plik");
      state.stats.igor = mergePlayerProgressSafe(state.stats.igor, parsed.stats.igor);
      state.stats.hubert = mergePlayerProgressSafe(state.stats.hubert, parsed.stats.hubert);
      state.stats.tata = mergePlayerProgressSafe(state.stats.tata, parsed.stats.tata);
      state.stats.stickers = Array.from(new Set([...(state.stats.stickers || []), ...(parsed.stats.stickers || [])]));
      if (Array.isArray(parsed.approvedLessonIds)) persistApprovedLessonIds([...state.approvedLessonIds, ...parsed.approvedLessonIds]);
      if (Array.isArray(parsed.equalizedLessonsForIgor)) state.equalizedLessonsForIgor = Array.from(new Set([...state.equalizedLessonsForIgor, ...parsed.equalizedLessonsForIgor]));
      if (parsed.calibration) state.calibration = mergeCalibrationWithDefaults(parsed.calibration);
      if (parsed.questionsPerRound) state.questionsPerRound = parseInt(parsed.questionsPerRound) || 8;
      if (Array.isArray(parsed.lessons) && parsed.lessons.length) state.lessons = parsed.lessons;
      applyApprovedLessonsPersistence(state.lessons);
      normalizePancakesIconsInLessons(state.lessons);
      saveCloudData();
      if (typeof updateHeaderUI === "function") updateHeaderUI();
      showParentMsg("✓ Pomyślnie wczytano kopię zapasową!");
    } catch (err) {
      showParentMsg("❌ Błąd wczytywania pliku JSON!", true);
    }
    input.value = "";
  };
  reader.readAsText(input.files[0]);
}

function parentSetQuestionsPerRound(v) {
  state.questionsPerRound = v; saveCloudData();
  const lenBox = document.getElementById("roundLengthButtons");
  if (lenBox) {
    lenBox.innerHTML = [5, 8, 10, 15, 20].map(val => `
      <button onclick="parentSetQuestionsPerRound(${val})" class="px-3.5 py-2 rounded-xl text-xs font-extrabold border-2 ${state.questionsPerRound === val ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-slate-700 border-slate-300'}">${val} pytań</button>
    `).join("");
  }
  showParentMsg(`✓ Ustawiono długość rundy: ${v} pytań`);
}

function parentAutoSuggestSimpleWord() {
  const selectedLessonId = document.getElementById("parentSelectLesson")?.value || "";
  const existingWords = new Set();
  state.lessons.forEach(l => (l.items || []).forEach(it => existingWords.add((it.en || "").toLowerCase())));
  const pool = typeof AUTO_SIMPLE_WORDS_POOL !== "undefined" ? AUTO_SIMPLE_WORDS_POOL : [];
  let candidates = pool.filter(w => !existingWords.has(w.en.toLowerCase()) && w.lessonId === selectedLessonId);
  if (candidates.length === 0) candidates = pool.filter(w => !existingWords.has(w.en.toLowerCase()));
  if (candidates.length === 0) return showParentMsg("Wszystkie proponowane słówka z puli zostały już dodane!", true);

  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  const selEl = document.getElementById("parentSelectLesson");
  if (selEl && Array.from(selEl.options).some(o => o.value === picked.lessonId)) selEl.value = picked.lessonId;
  document.getElementById("parentWordEn").value = picked.en;
  document.getElementById("parentWordPl").value = picked.pl;
  document.getElementById("parentWordPhonetic").value = picked.phonetic || "";
  document.getElementById("parentWordIcon").value = picked.icon || "⭐";
  document.getElementById("parentWordAge").value = "4,6";
  playEffect("beep");
  showParentMsg(`✨ Dobrałem słówko: ${picked.icon} ${picked.en} (${picked.pl}). Kliknij „Zapisz słówko”!`)
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
  lesson.items.push({ en, pl, phonetic: ph, icon: ic || "📝", age: age.includes(",") ? [4, 6] : [parseInt(age)], testOnly: true });
  saveCloudData();
  showParentMsg(`✓ Dodano słówko "${en}" do lekcji "${lesson.title}" (Centrum Testowe)!`);
  document.getElementById("parentWordEn").value = ""; document.getElementById("parentWordPl").value = "";
  document.getElementById("parentWordPhonetic").value = ""; document.getElementById("parentWordIcon").value = "";
}

function parentScanWorksheetAI(input) {
  if (!input.files || input.files.length === 0) return;
  const key = document.getElementById("parentGeminiKey").value.trim();
  if (!key) return showParentMsg("Wpisz klucz API Gemini, aby użyć skanera!", true);
  try { localStorage.setItem("akademia_gemini_key", key); } catch (e) {}
  const age = document.getElementById("parentAiTargetAge").value;
  showParentMsg("Wysyłam zdjęcie do Gemini AI...", false);
  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target.result.split(',')[1];
    try {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Przeanalizuj zdjęcie karty pracy z angielskiego. Wyodrębnij maks. 15 słówek dla dzieci (${age}). Zwróć TYLKO tekst: SłowoEn - TłumaczeniePl - Emoji - 4,6` }, { inline_data: { mime_type: input.files[0].type, data: base64 } }] }]
        })
      });
      const data = await resp.json();
      const raw = data.candidates[0].content.parts[0].text.trim();
      openParentSection("new_lesson");
      document.getElementById("newLessonLines").value = raw;
      if (!document.getElementById("newLessonTitle").value) document.getElementById("newLessonTitle").value = "Lekcja z karty (" + new Date().toLocaleDateString() + ")";
      showParentMsg("✓ Słówka rozpoznane! Przeniesiono do kreatora nowej lekcji.");
    } catch (err) {
      showParentMsg("Błąd połączenia z AI. Sprawdź klucz.", true);
    }
    input.value = "";
  };
  reader.readAsDataURL(input.files[0]);
}

function parentGiveTestChest(profKey, tier) {
  const kidName = profKey === "hubert" ? "Huberta" : profKey === "tata" ? "Taty" : "Igora";
  const tierName = tier === "gold" ? "Złotą" : tier === "silver" ? "Srebrną" : "Brązową";
  if (profKey === "igor" || profKey === "hubert") {
    const p = ensurePlayerStructure(state.stats[profKey]);
    if (!Array.isArray(p.pendingChests)) p.pendingChests = [];
    p.pendingChests.push({ tier, reason: "Prezent od Taty!", addedAt: new Date().toISOString() });
    state.stats[profKey] = p; saveCloudData();
    showParentMsg(`✓ Wysłano ${tierName} skrzynię do kolejki gracza ${kidName}!`);
    if (state.profile === profKey) { closeParentDashboard(); checkPendingDadChestsForPlayer(profKey); }
    return;
  }
  closeParentDashboard();
  renderChestOpeningInsidePopup(profKey, tier, `🛠️ Testowa Skrzynia (${tierName} - ${kidName})`);
}

function unlockAllOutfitsForTesting() {
  if (!confirm("Odblokować wszystkie 131 przebrań i 50 zwierzaków u WSZYSTKICH graczy?")) return;
  ["igor", "hubert", "tata"].forEach(p => {
    state.stats[p] = ensurePlayerStructure(state.stats[p]);
    state.stats[p].unlockedItems = getAll131OutfitsFlat().map(o => o.src);
    state.stats[p].memoryAnimals = (typeof COMPANION_PETS !== "undefined" ? COMPANION_PETS : []).map(a => a.id);
  });
  saveCloudData();
  showParentMsg("✓ Odblokowano 131 przebrań i 50 zwierzaków u wszystkich!");
}

function lockAllOutfitsAfterTesting() {
  if (!confirm("Zablokować ubrania i zwierzaki u wszystkich graczy?")) return;
  ["igor", "hubert", "tata"].forEach(p => {
    state.stats[p] = ensurePlayerStructure(state.stats[p]);
    state.stats[p].unlockedItems = []; state.stats[p].memoryAnimals = [];
    state.stats[p].avatar = { head: "", torso: "", legs: "", pet: "" };
  });
  saveCloudData();
  showParentMsg("✓ Zablokowano ubrania i zwierzaki.");
}

function resetEverythingAll() {
  if (confirm("⚠️ OSTRZEŻENIE: Usunąć WSZYSTKIE postępy obu chłopców oraz Taty?") && confirm("Tej operacji nie można cofnąć! Kontynuować?")) {
    state.stats = { igor: createDefaultPlayerStats(), hubert: createDefaultPlayerStats(), tata: createDefaultPlayerStats(), stickers: [] };
    saveCloudData(); location.reload();
  }
}

function openGuideModal() { const m = document.getElementById("guideModal"); if (m) { m.classList.remove("hidden"); m.classList.add("flex"); } }
function closeGuideModal() { const m = document.getElementById("guideModal"); if (m) { m.classList.add("hidden"); m.classList.remove("flex"); } }

window.addEventListener("DOMContentLoaded", () => {
  syncVersionLabelsInDom();
  loadCloudData();
});
