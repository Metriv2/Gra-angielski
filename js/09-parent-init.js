/* ============================================================================
   PLIK: js/09-parent-init.js
   PIN RODZICA, AUTOMATYCZNY GENERATOR LEKCJI, CENTRUM TESTOWE I INICJALIZACJA
   ============================================================================ */

let _pendingPinAction = "dashboard";
let _selectedManagerLessonId = null;

const AUTO_LESSON_TOPICS_DB = [
  {
    keywords: ["pojazd", "aut", "samoch", "maszyn", "transport", "vehicle", "car", "pociag", "pociąg", "samolot"],
    icon: "🚒🚜",
    words: [
      { en: "Car", pl: "Samochód", phonetic: "kar", icon: "🚗", age: [4, 6] },
      { en: "Bus", pl: "Autobus", phonetic: "bas", icon: "🚌", age: [4, 6] },
      { en: "Train", pl: "Pociąg", phonetic: "trejn", icon: "🚂", age: [4, 6] },
      { en: "Airplane", pl: "Samolot", phonetic: "erplejn", icon: "✈️", age: [4, 6] },
      { en: "Fire truck", pl: "Wóz strażacki", phonetic: "fajer trak", icon: "🚒", age: [4, 6] },
      { en: "Police car", pl: "Radiowóz", phonetic: "polis kar", icon: "🚓", age: [4, 6] },
      { en: "Tractor", pl: "Traktor", phonetic: "traktor", icon: "🚜", age: [4, 6] },
      { en: "Bicycle", pl: "Rower", phonetic: "bajsykl", icon: "🚲", age: [4, 6] },
      { en: "Helicopter", pl: "Helikopter", phonetic: "helikopter", icon: "🚁", age: [6] },
      { en: "Rocket", pl: "Rakieta", phonetic: "roket", icon: "🚀", age: [4, 6] },
      { en: "Boat", pl: "Łódka", phonetic: "bołt", icon: "⛵", age: [4, 6] },
      { en: "Ambulance", pl: "Karetka", phonetic: "ambjulans", icon: "🚑", age: [6] }
    ]
  },
  {
    keywords: ["ubran", "odzie", "ciuch", "garderob", "clothe", "shirt", "czapk", "but"],
    icon: "👕👟",
    words: [
      { en: "T-shirt", pl: "Koszulka", phonetic: "ti-szert", icon: "👕", age: [4, 6] },
      { en: "Trousers", pl: "Spodnie", phonetic: "trałzers", icon: "👖", age: [4, 6] },
      { en: "Shoes", pl: "Buty", phonetic: "szuz", icon: "👟", age: [4, 6] },
      { en: "Cap", pl: "Czapka", phonetic: "kap", icon: "🧢", age: [4, 6] },
      { en: "Jacket", pl: "Kurtka", phonetic: "dżaket", icon: "🧥", age: [4, 6] },
      { en: "Socks", pl: "Skarpetki", phonetic: "soks", icon: "🧦", age: [4, 6] },
      { en: "Dress", pl: "Sukienka", phonetic: "dres", icon: "👗", age: [4, 6] },
      { en: "Shorts", pl: "Krótkie spodenki", phonetic: "szorts", icon: "🩳", age: [4, 6] },
      { en: "Gloves", pl: "Rękawiczki", phonetic: "glaws", icon: "🧤", age: [6] },
      { en: "Scarf", pl: "Szalik", phonetic: "skarf", icon: "🧣", age: [6] },
      { en: "Glasses", pl: "Okulary", phonetic: "glases", icon: "👓", age: [4, 6] },
      { en: "Crown", pl: "Korona", phonetic: "krałn", icon: "👑", age: [4, 6] }
    ]
  },
  {
    keywords: ["dom", "poko", "pokó", "mebl", "kuchn", "łazien", "house", "home", "room"],
    icon: "🏠🛋️",
    words: [
      { en: "House", pl: "Dom", phonetic: "hałs", icon: "🏠", age: [4, 6] },
      { en: "Bed", pl: "Łóżko", phonetic: "bed", icon: "🛏️", age: [4, 6] },
      { en: "Chair", pl: "Krzesło", phonetic: "czer", icon: "🪑", age: [4, 6] },
      { en: "Door", pl: "Drzwi", phonetic: "dor", icon: "🚪", age: [4, 6] },
      { en: "Window", pl: "Okno", phonetic: "łindoł", icon: "🪟", age: [4, 6] },
      { en: "Lamp", pl: "Lampa", phonetic: "lamp", icon: "🛋️", age: [4, 6] },
      { en: "Clock", pl: "Zegar", phonetic: "klok", icon: "⏰", age: [4, 6] },
      { en: "Key", pl: "Klucz", phonetic: "ki", icon: "🗝️", age: [4, 6] },
      { en: "Mirror", pl: "Lustro", phonetic: "miror", icon: "🪞", age: [6] },
      { en: "Bathtub", pl: "Wanna", phonetic: "baftab", icon: "🛁", age: [6] },
      { en: "Sofa", pl: "Kanapa", phonetic: "sofa", icon: "🛋️", age: [4, 6] },
      { en: "Television", pl: "Telewizor", phonetic: "telewiżyn", icon: "📺", age: [6] }
    ]
  },
  {
    keywords: ["pogod", "pory roku", "wiosn", "lato", "jesie", "zima", "weather", "season", "deszcz", "śnieg"],
    icon: "☀️🌈",
    words: [
      { en: "Sun", pl: "Słońce", phonetic: "san", icon: "☀️", age: [4, 6] },
      { en: "Rain", pl: "Deszcz", phonetic: "rejn", icon: "🌧️", age: [4, 6] },
      { en: "Snow", pl: "Śnieg", phonetic: "snoł", icon: "❄️", age: [4, 6] },
      { en: "Cloud", pl: "Chmura", phonetic: "klałd", icon: "☁️", age: [4, 6] },
      { en: "Rainbow", pl: "Tęcza", phonetic: "rejnboł", icon: "🌈", age: [4, 6] },
      { en: "Wind", pl: "Wiatr", phonetic: "łind", icon: "💨", age: [4, 6] },
      { en: "Storm", pl: "Burza", phonetic: "storm", icon: "⛈️", age: [6] },
      { en: "Snowman", pl: "Bałwanek", phonetic: "snołmen", icon: "⛄", age: [4, 6] },
      { en: "Umbrella", pl: "Parasol", phonetic: "ambrela", icon: "☂️", age: [6] },
      { en: "Star", pl: "Gwiazda", phonetic: "star", icon: "⭐", age: [4, 6] },
      { en: "Moon", pl: "Księżyc", phonetic: "mun", icon: "🌙", age: [4, 6] },
      { en: "Lightning", pl: "Błyskawica", phonetic: "lajtning", icon: "⚡", age: [6] }
    ]
  },
  {
    keywords: ["rodzin", "ludzi", "mama", "tata", "brat", "siostr", "family", "people"],
    icon: "👨‍👩‍👦‍👦",
    words: [
      { en: "Mother", pl: "Mama", phonetic: "mader", icon: "👩", age: [4, 6] },
      { en: "Father", pl: "Tata", phonetic: "fader", icon: "👨", age: [4, 6] },
      { en: "Brother", pl: "Brat", phonetic: "brader", icon: "👦", age: [4, 6] },
      { en: "Sister", pl: "Siostra", phonetic: "sister", icon: "👧", age: [4, 6] },
      { en: "Baby", pl: "Dzidziuś", phonetic: "bejbi", icon: "👶", age: [4, 6] },
      { en: "Grandma", pl: "Babcia", phonetic: "granma", icon: "👵", age: [4, 6] },
      { en: "Grandpa", pl: "Dziadek", phonetic: "granpa", icon: "👴", age: [4, 6] },
      { en: "Family", pl: "Rodzina", phonetic: "famili", icon: "👨‍👩‍👦‍👦", age: [4, 6] },
      { en: "Friend", pl: "Przyjaciel", phonetic: "frend", icon: "🤝", age: [6] },
      { en: "Boy", pl: "Chłopiec", phonetic: "boj", icon: "🧑", age: [4, 6] },
      { en: "Girl", pl: "Dziewczynka", phonetic: "gerl", icon: "👧", age: [4, 6] },
      { en: "Twins", pl: "Bliźniaki", phonetic: "tłins", icon: "👯", age: [6] }
    ]
  },
  {
    keywords: ["zawod", "prac", "straż", "policj", "lekarz", "job", "profession", "hero"],
    icon: "🚒👨‍🚀",
    words: [
      { en: "Firefighter", pl: "Strażak", phonetic: "fajerfajter", icon: "🧑‍🚒", age: [4, 6] },
      { en: "Police officer", pl: "Policjant", phonetic: "polis ofiser", icon: "👮", age: [4, 6] },
      { en: "Doctor", pl: "Lekarz", phonetic: "doktor", icon: "🩺", age: [4, 6] },
      { en: "Astronaut", pl: "Astronauta", phonetic: "astronot", icon: "👨‍🚀", age: [4, 6] },
      { en: "Cook", pl: "Kucharz", phonetic: "kuk", icon: "👨‍🍳", age: [4, 6] },
      { en: "Teacher", pl: "Nauczyciel", phonetic: "ticzer", icon: "👩‍🏫", age: [4, 6] },
      { en: "Builder", pl: "Budowniczy", phonetic: "bilder", icon: "👷", age: [6] },
      { en: "Pilot", pl: "Pilot", phonetic: "pajlot", icon: "👨‍✈️", age: [6] },
      { en: "Farmer", pl: "Rolnik", phonetic: "farmer", icon: "🧑‍🌾", age: [4, 6] },
      { en: "Knight", pl: "Rycerz", phonetic: "najt", icon: "🛡️", age: [4, 6] },
      { en: "Artist", pl: "Malarz", phonetic: "artist", icon: "🧑‍🎨", age: [6] },
      { en: "Singer", pl: "Piosenkarz", phonetic: "singer", icon: "🧑‍🎤", age: [6] }
    ]
  },
  {
    keywords: ["sport", "zabaw", "piłk", "toy", "game", "ball"],
    icon: "⚽🧸",
    words: [
      { en: "Ball", pl: "Piłka", phonetic: "bol", icon: "⚽", age: [4, 6] },
      { en: "Teddy bear", pl: "Pluszowy miś", phonetic: "tedi ber", icon: "🧸", age: [4, 6] },
      { en: "Doll", pl: "Lalka", phonetic: "dol", icon: "🪆", age: [4, 6] },
      { en: "Blocks", pl: "Klocki", phonetic: "bloks", icon: "🧱", age: [4, 6] },
      { en: "Kite", pl: "Latawiec", phonetic: "kajt", icon: "🪁", age: [4, 6] },
      { en: "Puzzle", pl: "Puzzle", phonetic: "pazl", icon: "🧩", age: [4, 6] },
      { en: "Drum", pl: "Bębenek", phonetic: "dram", icon: "🥁", age: [4, 6] },
      { en: "Robot", pl: "Robot", phonetic: "robot", icon: "🤖", age: [4, 6] },
      { en: "Basketball", pl: "Koszykówka", phonetic: "basketbol", icon: "🏀", age: [6] },
      { en: "Tennis", pl: "Tenis", phonetic: "tenis", icon: "🎾", age: [6] },
      { en: "Skateboard", pl: "Deskorolka", phonetic: "skejt-bord", icon: "🛹", age: [6] },
      { en: "Balloon", pl: "Balon", phonetic: "balun", icon: "🎈", age: [4, 6] }
    ]
  },
  {
    keywords: ["kosmos", "planet", "gwiazd", "space", "ufo", "rakiet"],
    icon: "🚀🪐",
    words: [
      { en: "Rocket", pl: "Rakieta", phonetic: "roket", icon: "🚀", age: [4, 6] },
      { en: "Planet", pl: "Planeta", phonetic: "planet", icon: "🪐", age: [4, 6] },
      { en: "Star", pl: "Gwiazda", phonetic: "star", icon: "⭐", age: [4, 6] },
      { en: "Moon", pl: "Księżyc", phonetic: "mun", icon: "🌕", age: [4, 6] },
      { en: "Sun", pl: "Słońce", phonetic: "san", icon: "☀️", age: [4, 6] },
      { en: "Alien", pl: "Kosmita", phonetic: "ejlien", icon: "👽", age: [4, 6] },
      { en: "Astronaut", pl: "Astronauta", phonetic: "astronot", icon: "👨‍🚀", age: [4, 6] },
      { en: "Spaceship", pl: "Statek kosmiczny", phonetic: "spejsszip", icon: "🛸", age: [6] },
      { en: "Earth", pl: "Ziemia", phonetic: "erf", icon: "🌍", age: [6] },
      { en: "Comet", pl: "Kometa", phonetic: "komet", icon: "☄️", age: [6] },
      { en: "Telescope", pl: "Teleskop", phonetic: "teleskop", icon: "🔭", age: [6] },
      { en: "Galaxy", pl: "Galaktyka", phonetic: "galaksi", icon: "🌌", age: [6] }
    ]
  },
  {
    keywords: ["jedzen", "pic", "słodycz", "deser", "obiad", "śniad", "food", "drink", "sweet"],
    icon: "🍕🍦",
    words: [
      { en: "Pizza", pl: "Pizza", phonetic: "pica", icon: "🍕", age: [4, 6] },
      { en: "Ice cream", pl: "Lody", phonetic: "ajs krim", icon: "🍦", age: [4, 6] },
      { en: "Cake", pl: "Tort", phonetic: "kejk", icon: "🎂", age: [4, 6] },
      { en: "Water", pl: "Woda", phonetic: "łoter", icon: "💧", age: [4, 6] },
      { en: "Juice", pl: "Sok", phonetic: "dżus", icon: "🧃", age: [4, 6] },
      { en: "Soup", pl: "Zupa", phonetic: "sup", icon: "🍲", age: [4, 6] },
      { en: "Sandwich", pl: "Kanapka", phonetic: "sandłicz", icon: "🥪", age: [4, 6] },
      { en: "Egg", pl: "Jajko", phonetic: "eg", icon: "🥚", age: [4, 6] },
      { en: "Cheese", pl: "Ser", phonetic: "cziz", icon: "🧀", age: [4, 6] },
      { en: "Cookie", pl: "Ciastko", phonetic: "kuki", icon: "🍪", age: [4, 6] },
      { en: "Donut", pl: "Pączek", phonetic: "donat", icon: "🍩", age: [4, 6] },
      { en: "Pasta", pl: "Makaron", phonetic: "pasta", icon: "🍝", age: [6] }
    ]
  },
  {
    keywords: ["szkoł", "przedszkol", "książk", "kredk", "school", "book", "pen"],
    icon: "🎒✏️",
    words: [
      { en: "Book", pl: "Książka", phonetic: "buk", icon: "📘", age: [4, 6] },
      { en: "Pencil", pl: "Ołówek", phonetic: "pensyl", icon: "✏️", age: [4, 6] },
      { en: "Backpack", pl: "Plecak", phonetic: "bakpak", icon: "🎒", age: [4, 6] },
      { en: "Scissors", pl: "Nożyczki", phonetic: "sizors", icon: "✂️", age: [4, 6] },
      { en: "Ruler", pl: "Linijka", phonetic: "ruler", icon: "📏", age: [6] },
      { en: "Crayon", pl: "Kredka", phonetic: "krejon", icon: "🖍️", age: [4, 6] },
      { en: "Glue", pl: "Klej", phonetic: "glu", icon: "🧴", age: [4, 6] },
      { en: "School", pl: "Szkoła", phonetic: "skul", icon: "🏫", age: [4, 6] },
      { en: "Notebook", pl: "Zeszyt", phonetic: "nołtbuk", icon: "📓", age: [6] },
      { en: "Paintbrush", pl: "Pędzel", phonetic: "pejntbrasz", icon: "🖌️", age: [6] },
      { en: "Globe", pl: "Globus", phonetic: "glob", icon: "🌐", age: [6] },
      { en: "Bell", pl: "Dzwonek", phonetic: "bel", icon: "🔔", age: [4, 6] }
    ]
  },
  {
    keywords: ["natur", "las", "drzew", "kwiat", "morz", "nature", "forest", "tree", "flower"],
    icon: "🌲🌻",
    words: [
      { en: "Tree", pl: "Drzewo", phonetic: "tri", icon: "🌳", age: [4, 6] },
      { en: "Flower", pl: "Kwiat", phonetic: "flałer", icon: "🌻", age: [4, 6] },
      { en: "Leaf", pl: "Liść", phonetic: "lif", icon: "🍃", age: [4, 6] },
      { en: "Mushroom", pl: "Grzyb", phonetic: "maszrum", icon: "🍄", age: [4, 6] },
      { en: "Mountain", pl: "Góra", phonetic: "małntin", icon: "⛰️", age: [4, 6] },
      { en: "Sea", pl: "Morze", phonetic: "si", icon: "🌊", age: [4, 6] },
      { en: "Fire", pl: "Ogień", phonetic: "fajer", icon: "🔥", age: [4, 6] },
      { en: "Stone", pl: "Kamień", phonetic: "stołn", icon: "🪨", age: [4, 6] },
      { en: "Forest", pl: "Las", phonetic: "forest", icon: "🌲", age: [6] },
      { en: "River", pl: "Rzeka", phonetic: "riwer", icon: "🏞️", age: [6] },
      { en: "Island", pl: "Wyspa", phonetic: "ajland", icon: "🏝️", age: [6] },
      { en: "Grass", pl: "Trawa", phonetic: "gras", icon: "🌱", age: [4, 6] }
    ]
  }
];

function openParentPinModal(action = "dashboard") {
  _pendingPinAction = action || "dashboard";
  const modal = document.getElementById("parentPinModal");
  const titleEl = document.getElementById("pinModalTitle");
  const descEl = document.getElementById("pinModalDesc");
  const input = document.getElementById("pinInputField");
  const err = document.getElementById("pinErrorMsg");
  const kb = document.getElementById("pinKeyboardGrid");
  if (!modal || !input) return;

  if (titleEl) {
    titleEl.textContent = _pendingPinAction === "tata_login"
      ? "🔒 Konto Testowe TATA"
      : (_pendingPinAction === "mic_approve" ? "🔒 Zatwierdzenie Wymowy" : "🔒 Panel Rodzica");
  }
  if (descEl) {
    descEl.textContent = "Wpisz 4-cyfrowy kod PIN rodziców:";
  }
  input.value = "";
  if (err) err.textContent = "";

  if (kb) {
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "OK"];
    kb.innerHTML = keys.map(k => {
      const cls = k === "OK"
        ? "bg-emerald-600 text-white border-emerald-700"
        : (k === "C" ? "bg-rose-100 text-rose-800 border-rose-300" : "bg-slate-100 hover:bg-sky-100 text-slate-900 border-slate-300");
      return `<button type="button" onclick="handlePinKeypadPress('${k}')" class="kid-card py-3 rounded-2xl border-2 font-extrabold text-xl shadow-sm ${cls}">${k === "OK" ? "✓" : k}</button>`;
    }).join("");
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  setTimeout(() => input.focus(), 80);
}

function closeParentPinModal() {
  const modal = document.getElementById("parentPinModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function handlePinKeypadPress(key) {
  const input = document.getElementById("pinInputField");
  const err = document.getElementById("pinErrorMsg");
  if (!input) return;
  if (err) err.textContent = "";

  if (key === "C") {
    input.value = "";
    return;
  }
  if (key === "OK") {
    verifyParentPinAndProceed();
    return;
  }
  if (input.value.length < 4) {
    input.value += key;
  }
  if (input.value.length === 4) {
    verifyParentPinAndProceed();
  }
}

function verifyParentPinAndProceed() {
  const input = document.getElementById("pinInputField");
  const err = document.getElementById("pinErrorMsg");
  if (!input) return;
  const val = input.value.trim();
  if (val === String(PARENT_PIN)) {
    closeParentPinModal();
    if (_pendingPinAction === "tata_login") {
      chooseProfile("tata");
    } else if (_pendingPinAction === "mic_approve") {
      approveMicAnswer("Zatwierdzone przez Rodzica!");
    } else {
      openParentDashboard();
    }
  } else {
    playEffect("wrong");
    if (err) err.textContent = "❌ Nieprawidłowy kod PIN!";
    input.value = "";
  }
}

function showParentStatus(msg, isError = false) {
  const box = document.getElementById("parentStatusMsg");
  if (!box) return;
  box.className = `mb-3 p-3 rounded-2xl border-2 font-bold text-sm text-center ${
    isError ? "bg-rose-100 border-rose-400 text-rose-900" : "bg-emerald-100 border-emerald-400 text-emerald-900"
  }`;
  box.innerHTML = msg;
  box.classList.remove("hidden");
}

function openParentDashboard() {
  const modal = document.getElementById("parentDashboardModal");
  if (!modal) return;
  const keyInput = document.getElementById("parentGeminiKey");
  if (keyInput) {
    try { keyInput.value = localStorage.getItem("akademia_gemini_key") || ""; } catch (e) {}
  }
  const st = document.getElementById("parentStatusMsg");
  if (st) st.classList.add("hidden");
  backToParentMenu();
  refreshAllParentWidgets();
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeParentDashboard() {
  const modal = document.getElementById("parentDashboardModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
  if (state.profile && typeof showLessonMenu === "function") {
    showLessonMenu();
  }
}

function backToParentMenu() {
  const menu = document.getElementById("parentMenuGrid");
  const backBtn = document.getElementById("parentBackToMenuBtn");
  const titleEl = document.getElementById("parentModalHeaderTitle");
  document.querySelectorAll(".parent-sub-section").forEach(el => el.classList.add("hidden"));
  if (menu) menu.classList.remove("hidden");
  if (backBtn) backBtn.classList.add("hidden");
  if (titleEl) titleEl.innerHTML = `🛠️ Panel Rodzica (<span data-app-version>Wersja ${CURRENT_GAME_VERSION}</span>)`;
  refreshAllParentWidgets();
}

function openParentSection(sectionKey) {
  const menu = document.getElementById("parentMenuGrid");
  const backBtn = document.getElementById("parentBackToMenuBtn");
  document.querySelectorAll(".parent-sub-section").forEach(el => el.classList.add("hidden"));
  if (menu) menu.classList.add("hidden");
  if (backBtn) backBtn.classList.remove("hidden");
  const target = document.getElementById(`parentSection_${sectionKey}`);
  if (target) target.classList.remove("hidden");
  refreshAllParentWidgets();
}

function refreshAllParentWidgets() {
  populateParentLessonSelect();
  renderParentTestCenter();
  renderParentLessonsManager();
  renderParentHardWordsBox();
  renderRoundLengthButtons();
}

function populateParentLessonSelect() {
  const sel = document.getElementById("parentSelectLesson");
  if (!sel) return;
  const editableLessons = state.lessons.filter(l => l.type !== "memory_game");
  sel.innerHTML = editableLessons.map(l => `<option value="${l.id}">${l.title}${l.testOnly ? " (🧪 Testowa)" : ""}</option>`).join("");
}

function parseAgeSpecToArray(ageStr) {
  const clean = String(ageStr || "4,6").replace(/\s+/g, "");
  if (clean === "4") return [4];
  if (clean === "6") return [6];
  return [4, 6];
}

function parseLessonLinesText(rawText) {
  const lines = String(rawText || "").split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const parsed = [];
  lines.forEach(line => {
    // Dzielimy wyłącznie po myślniku otoczonym spacjami, aby nie psuć słów typu "T-shirt" ani wymowy "ti-szert"
    const parts = line.split(/\s+[-–—]\s+/).map(p => p.trim()).filter(Boolean);
    if (parts.length < 2) return;
    const en = parts[0];
    const pl = parts[1];
    let phonetic = "";
    let icon = "⭐";
    let age = [4, 6];

    if (parts.length === 3) {
      if (/^[46,\s]+$/.test(parts[2])) age = parseAgeSpecToArray(parts[2]);
      else icon = parts[2];
    } else if (parts.length === 4) {
      if (/^[46,\s]+$/.test(parts[3])) {
        icon = parts[2];
        age = parseAgeSpecToArray(parts[3]);
      } else {
        phonetic = parts[2];
        icon = parts[3];
      }
    } else if (parts.length >= 5) {
      phonetic = parts[2];
      icon = parts[3];
      age = parseAgeSpecToArray(parts[4]);
    }

    parsed.push({ en, pl, phonetic, icon, age });
  });
  return parsed;
}

function formatWordsToLessonLines(wordsArr) {
  return (wordsArr || []).map(w => {
    const ageStr = Array.isArray(w.age) ? w.age.join(",") : "4,6";
    return w.phonetic
      ? `${w.en} - ${w.pl} - ${w.phonetic} - ${w.icon || "⭐"} - ${ageStr}`
      : `${w.en} - ${w.pl} - ${w.icon || "⭐"} - ${ageStr}`;
  }).join("\n");
}

function parentAutoGenerateLesson() {
  const titleInput = document.getElementById("newLessonTitle");
  const iconInput = document.getElementById("newLessonIcon");
  const descInput = document.getElementById("newLessonDesc");
  const ageSel = document.getElementById("newLessonTargetAge");
  const countSel = document.getElementById("newLessonWordCount");
  const linesArea = document.getElementById("newLessonLines");
  const previewBox = document.getElementById("generatedLessonPreviewBox");

  const rawTitle = (titleInput && titleInput.value.trim()) || "";
  const rawDesc = (descInput && descInput.value.trim()) || "";
  if (!rawTitle && !rawDesc) {
    showParentStatus("⚠️ Wpisz przynajmniej tytuł lub krótki opis nowej lekcji!", true);
    return;
  }

  const targetAgeMode = ageSel ? ageSel.value : "auto";
  const desiredCount = parseInt(countSel ? countSel.value : "8", 10) || 8;
  const searchBlob = `${rawTitle} ${rawDesc}`.toLowerCase();

  let matchedTopic = null;
  let bestScore = 0;
  AUTO_LESSON_TOPICS_DB.forEach(topic => {
    let score = 0;
    topic.keywords.forEach(kw => {
      if (searchBlob.includes(kw)) score += 2;
    });
    if (score > bestScore) {
      bestScore = score;
      matchedTopic = topic;
    }
  });

  let candidateWords = [];
  if (matchedTopic) {
    candidateWords = [...matchedTopic.words];
    if (iconInput && !iconInput.value.trim()) {
      iconInput.value = matchedTopic.icon;
    }
  } else {
    if (iconInput && !iconInput.value.trim()) iconInput.value = "📚✨";
    const pool = [...AUTO_SIMPLE_WORDS_POOL];
    state.lessons.forEach(l => {
      if (l.type === "vocab" && Array.isArray(l.items)) {
        l.items.forEach(it => {
          if (it && it.en && it.pl && typeof it.icon === "string" && !it.icon.startsWith("<svg")) {
            pool.push(it);
          }
        });
      }
    });
    candidateWords = shuffleArray(pool);
  }

  // Jeśli w opisie podano konkretne polskie nazwy z bazy, wysuń je na początek
  const prioritized = [];
  const rest = [];
  candidateWords.forEach(w => {
    if (rawDesc && searchBlob.includes(w.pl.toLowerCase())) prioritized.push(w);
    else rest.push(w);
  });

  const uniqueList = [];
  const seenEn = new Set();
  [...prioritized, ...rest].forEach(w => {
    const key = w.en.toLowerCase();
    if (!seenEn.has(key)) {
      seenEn.add(key);
      let finalAge = Array.isArray(w.age) ? [...w.age] : [4, 6];
      if (targetAgeMode === "4,6") finalAge = [4, 6];
      else if (targetAgeMode === "4") finalAge = [4];
      else if (targetAgeMode === "6") finalAge = [6];
      uniqueList.push({
        en: w.en,
        pl: w.pl,
        phonetic: w.phonetic || "",
        icon: w.icon || "⭐",
        age: finalAge
      });
    }
  });

  const finalWords = uniqueList.slice(0, desiredCount);
  if (titleInput && !titleInput.value.trim()) {
    titleInput.value = `${state.lessons.length + 1}. Nowa Lekcja`;
  }
  if (linesArea) {
    linesArea.value = formatWordsToLessonLines(finalWords);
  }

  if (previewBox) {
    previewBox.classList.remove("hidden");
    previewBox.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="text-xs font-extrabold text-emerald-900">✅ Wygenerowano ${finalWords.length} słówek! Gotowe do wszystkich trybów (Fiszki, Quiz, 🎧 Ze słuchu, Literki, Wymowa, Memory, Sprawdzian, VS i Smok):</span>
      </div>
      <div class="flex flex-wrap gap-1.5">
        ${finalWords.map(w => `<span class="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-slate-800">${w.icon} ${w.en} (${w.pl}) <span class="text-[10px] text-indigo-700">[${w.age.join(",")}]</span></span>`).join("")}
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        <button onclick="parentCreateNewLesson(true)" class="kid-card py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow">🚀 Zapisz i udostępnij od razu synom</button>
        <button onclick="parentCreateNewLesson(false)" class="kid-card py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-amber-950 font-extrabold rounded-xl text-xs shadow">🧪 Zapisz najpierw jako testową (tylko Tata)</button>
      </div>
    `;
  }
  showParentStatus(`✨ Gotowe! Wygenerowano ${finalWords.length} słówek. Kliknij zielony przycisk, aby od razu dodać lekcję dla chłopców.`);
}

function parentCreateNewLesson(publishImmediately = false) {
  const titleEl = document.getElementById("newLessonTitle");
  const iconEl = document.getElementById("newLessonIcon");
  const descEl = document.getElementById("newLessonDesc");
  const linesEl = document.getElementById("newLessonLines");

  const title = (titleEl && titleEl.value.trim()) || "";
  const icon = (iconEl && iconEl.value.trim()) || "📚✨";
  const desc = (descEl && descEl.value.trim()) || "Własna lekcja utworzona przez Rodzica";
  const items = parseLessonLinesText(linesEl ? linesEl.value : "");

  if (!title) {
    showParentStatus("⚠️ Podaj tytuł nowej lekcji!", true);
    return;
  }
  if (items.length === 0) {
    showParentStatus("⚠️ Kliknij najpierw „Wygeneruj lekcję automatycznie” lub wpisz słówka!", true);
    return;
  }

  const palettes = [
    { color: "from-sky-400 to-indigo-600", borderColor: "border-sky-400" },
    { color: "from-emerald-400 to-teal-600", borderColor: "border-emerald-400" },
    { color: "from-amber-400 to-orange-500", borderColor: "border-amber-400" },
    { color: "from-purple-400 to-pink-600", borderColor: "border-purple-400" }
  ];
  const pal = palettes[state.lessons.length % palettes.length];
  const newId = "custom_" + Date.now();

  const newLessonObj = {
    id: newId,
    title,
    subtitle: desc.slice(0, 64),
    icon,
    color: pal.color,
    borderColor: pal.borderColor,
    type: "vocab",
    items
  };

  if (publishImmediately) {
    persistApprovedLessonIds([...(state.approvedLessonIds || []), newId]);
  } else {
    newLessonObj.testOnly = true;
  }

  state.lessons.push(newLessonObj);
  saveCloudData();
  refreshAllParentWidgets();

  if (titleEl) titleEl.value = "";
  if (iconEl) iconEl.value = "";
  if (descEl) descEl.value = "";
  if (linesEl) linesEl.value = "";
  const previewBox = document.getElementById("generatedLessonPreviewBox");
  if (previewBox) previewBox.classList.add("hidden");

  if (state.profile && typeof showLessonMenu === "function") {
    showLessonMenu();
  }

  if (publishImmediately) {
    showParentStatus(`✅ Lekcja „${title}” (${items.length} słówek) została zapisana i jest już widoczna we wszystkich trybach dla Igora i Huberta!`);
  } else {
    showParentStatus(`🧪 Zapisano lekcję testową „${title}” (widoczna dla Taty). <button onclick="parentApproveTestLesson('${newId}')" class="ml-2 px-3 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow">🚀 Zatwierdź teraz dla chłopców</button>`);
  }
}

function parentAutoSuggestSimpleWord() {
  const existing = new Set();
  state.lessons.forEach(l => (l.items || []).forEach(it => existing.add((it.en || "").toLowerCase())));
  const unused = AUTO_SIMPLE_WORDS_POOL.filter(w => !existing.has(w.en.toLowerCase()));
  const pool = unused.length > 0 ? unused : AUTO_SIMPLE_WORDS_POOL;
  const pick = pool[Math.floor(Math.random() * pool.length)];

  const sel = document.getElementById("parentSelectLesson");
  const enEl = document.getElementById("parentWordEn");
  const plEl = document.getElementById("parentWordPl");
  const phEl = document.getElementById("parentWordPhonetic");
  const icEl = document.getElementById("parentWordIcon");
  const ageEl = document.getElementById("parentWordAge");

  if (sel && pick.lessonId) sel.value = pick.lessonId;
  if (enEl) enEl.value = pick.en;
  if (plEl) plEl.value = pick.pl;
  if (phEl) phEl.value = pick.phonetic || "";
  if (icEl) icEl.value = pick.icon || "⭐";
  if (ageEl) ageEl.value = Array.isArray(pick.age) ? pick.age.join(",") : "4,6";
}

function parentAddSingleWord() {
  const sel = document.getElementById("parentSelectLesson");
  const ageEl = document.getElementById("parentWordAge");
  const enEl = document.getElementById("parentWordEn");
  const plEl = document.getElementById("parentWordPl");
  const phEl = document.getElementById("parentWordPhonetic");
  const icEl = document.getElementById("parentWordIcon");

  const lessonId = sel ? sel.value : "";
  const en = (enEl && enEl.value.trim()) || "";
  const pl = (plEl && plEl.value.trim()) || "";
  const phonetic = (phEl && phEl.value.trim()) || "";
  const icon = (icEl && icEl.value.trim()) || "⭐";
  const age = parseAgeSpecToArray(ageEl ? ageEl.value : "4,6");

  if (!en || !pl) {
    showParentStatus("⚠️ Wpisz nazwę po angielsku oraz po polsku!", true);
    return;
  }
  const lesson = state.lessons.find(l => l.id === lessonId);
  if (!lesson) return;
  if (!Array.isArray(lesson.items)) lesson.items = [];

  lesson.items.push({ en, pl, phonetic, icon, age });
  saveCloudData();
  refreshAllParentWidgets();

  if (enEl) enEl.value = "";
  if (plEl) plEl.value = "";
  if (phEl) phEl.value = "";
  if (icEl) icEl.value = "";
  if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
  showParentStatus(`✅ Dodano słówko „${en} (${pl})” do lekcji „${lesson.title}”! Działa we wszystkich trybach (w tym 🎧 Ze słuchu).`);
}

function parentApproveTestLesson(lessonId) {
  const lesson = state.lessons.find(l => l.id === lessonId);
  if (!lesson) return;
  delete lesson.testOnly;
  persistApprovedLessonIds([...(state.approvedLessonIds || []), lessonId]);
  saveCloudData();
  refreshAllParentWidgets();
  if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
  showParentStatus(`✅ Lekcja „${lesson.title}” została zatwierdzona i jest już dostępna dla Igora i Huberta!`);
}

function parentToggleEqualizeLessonForIgor(lessonId) {
  if (!Array.isArray(state.equalizedLessonsForIgor)) state.equalizedLessonsForIgor = [];
  if (state.equalizedLessonsForIgor.includes(lessonId)) {
    state.equalizedLessonsForIgor = state.equalizedLessonsForIgor.filter(id => id !== lessonId);
  } else {
    state.equalizedLessonsForIgor.push(lessonId);
  }
  saveCloudData();
  renderParentTestCenter();
  if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
}

function renderParentTestCenter() {
  const box = document.getElementById("parentTestCenterBox");
  const badge = document.getElementById("parentMenuPendingBadge");
  const testLessons = state.lessons.filter(l => l.testOnly);
  if (badge) badge.textContent = `${testLessons.length} oczekujących`;
  if (!box) return;

  const eqSet = new Set(Array.isArray(state.equalizedLessonsForIgor) ? state.equalizedLessonsForIgor : []);
  const regularLessons = state.lessons.filter(l => l.type !== "memory_game");

  box.innerHTML = `
    <h3 class="font-extrabold text-teal-950 text-lg mb-2">🧪 Centrum Testowe i Poziomy</h3>
    <div class="mb-4">
      <div class="text-xs font-extrabold text-teal-900 uppercase mb-1.5">Lekcje testowe (widoczne tylko na koncie Taty):</div>
      ${testLessons.length === 0
        ? `<div class="p-3 rounded-2xl bg-white border border-teal-200 text-xs font-bold text-slate-500">Brak oczekujących lekcji testowych – wszystkie lekcje są aktywne dla chłopców.</div>`
        : `<div class="space-y-2">${testLessons.map(l => `
            <div class="p-3 rounded-2xl bg-white border-2 border-amber-300 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div class="font-extrabold text-sm text-slate-900">${l.icon} ${l.title} (${(l.items || []).length} słówek)</div>
                <div class="text-[11px] text-slate-500">${l.subtitle || ""}</div>
              </div>
              <div class="flex gap-2">
                <button onclick="parentApproveTestLesson('${l.id}')" class="kid-card px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs">✅ Zatwierdź dla synów</button>
                <button onclick="parentDeleteLesson('${l.id}')" class="kid-card px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 font-bold text-xs">🗑️ Usuń</button>
              </div>
            </div>
          `).join("")}</div>`}
    </div>
    <div>
      <div class="text-xs font-extrabold text-teal-900 uppercase mb-1.5">Zrównanie poziomu Igora (4 l.) do Huberta (6 l.) w wybranych lekcjach:</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        ${regularLessons.map(l => {
          const isEq = eqSet.has(l.id);
          return `
            <div class="p-2.5 rounded-2xl bg-white border border-teal-200 flex items-center justify-between gap-2">
              <span class="text-xs font-extrabold text-slate-800 truncate">${l.icon} ${l.title}</span>
              <button onclick="parentToggleEqualizeLessonForIgor('${l.id}')" class="px-2.5 py-1 rounded-xl font-extrabold text-[11px] shrink-0 ${isEq ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}">
                ${isEq ? "🧑 Poziom Huberta ✓" : "👦 Poziom Igora"}
              </button>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderParentLessonsManager() {
  const box = document.getElementById("parentLessonsManagerBox");
  if (!box) return;
  const manageable = state.lessons.filter(l => l.type !== "memory_game");
  if (!_selectedManagerLessonId || !manageable.some(l => l.id === _selectedManagerLessonId)) {
    _selectedManagerLessonId = manageable[0] ? manageable[0].id : null;
  }
  const current = manageable.find(l => l.id === _selectedManagerLessonId);
  const isCustom = current && String(current.id).startsWith("custom_");

  box.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="font-extrabold text-purple-950 text-lg">🗂️ Przegląd i edycja lekcji</h3>
      ${isCustom ? `<button onclick="parentDeleteLesson('${current.id}')" class="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs">🗑️ Usuń całą tę lekcję</button>` : ""}
    </div>
    <select onchange="_selectedManagerLessonId=this.value; renderParentLessonsManager();" class="w-full p-2.5 rounded-xl border-2 border-purple-300 bg-white font-extrabold text-sm mb-3">
      ${manageable.map(l => `<option value="${l.id}" ${l.id === _selectedManagerLessonId ? "selected" : ""}>${l.title} (${(l.items || []).length} elem.)${l.testOnly ? " [TESTOWA]" : ""}</option>`).join("")}
    </select>
    ${current ? `
      <div class="space-y-1.5 max-h-72 overflow-y-auto pr-1">
        ${(current.items || []).map((it, idx) => {
          const ageLabel = Array.isArray(it.age) ? it.age.join(",") : "4,6";
          return `
            <div class="p-2 rounded-xl bg-white border border-purple-200 flex items-center justify-between gap-2 text-xs">
              <div class="flex items-center gap-2 min-w-0">
                <span class="text-xl shrink-0">${it.icon || it.animal || "⭐"}</span>
                <span class="font-extrabold text-slate-900 truncate">${it.en}</span>
                <span class="text-slate-500 truncate">– ${it.pl}</span>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <button onclick="parentCycleWordAge('${current.id}', ${idx})" class="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-900 font-bold border border-indigo-200">Wiek: ${ageLabel}</button>
                <button onclick="parentDeleteWordFromLesson('${current.id}', ${idx})" class="px-2 py-1 rounded-lg bg-rose-100 text-rose-800 font-bold">✖</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    ` : ""}
  `;
}

function parentCycleWordAge(lessonId, idx) {
  const lesson = state.lessons.find(l => l.id === lessonId);
  if (!lesson || !lesson.items[idx]) return;
  const cur = Array.isArray(lesson.items[idx].age) ? lesson.items[idx].age.join(",") : "4,6";
  lesson.items[idx].age = cur === "4,6" ? [4] : (cur === "4" ? [6] : [4, 6]);
  saveCloudData();
  renderParentLessonsManager();
}

function parentDeleteWordFromLesson(lessonId, idx) {
  const lesson = state.lessons.find(l => l.id === lessonId);
  if (!lesson || !lesson.items[idx]) return;
  if (lesson.items.length <= 1) {
    showParentStatus("⚠️ W lekcji musi pozostać przynajmniej 1 słówko!", true);
    return;
  }
  lesson.items.splice(idx, 1);
  saveCloudData();
  renderParentLessonsManager();
}

function parentDeleteLesson(lessonId) {
  if (!confirm("Czy na pewno usunąć tę lekcję?")) return;
  state.lessons = state.lessons.filter(l => l.id !== lessonId);
  saveCloudData();
  refreshAllParentWidgets();
  if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
  showParentStatus("🗑️ Usunięto lekcję.");
}

function renderParentHardWordsBox() {
  const box = document.getElementById("parentHardWordsBox");
  if (!box) return;
  const renderCol = (key, label) => {
    const list = (state.stats[key] && Array.isArray(state.stats[key].hardWords)) ? state.stats[key].hardWords : [];
    return `
      <div class="p-3 rounded-2xl bg-white border border-rose-200">
        <div class="flex justify-between items-center mb-2">
          <span class="font-extrabold text-sm text-slate-900">${label} (${list.length})</span>
          ${list.length > 0 ? `<button onclick="parentClearHardWords('${key}')" class="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 font-bold text-xs">Wyczyść</button>` : ""}
        </div>
        ${list.length === 0
          ? `<div class="text-xs text-slate-400">Brak trudnych słówek! 🎉</div>`
          : `<div class="flex flex-wrap gap-1.5">${list.map(w => `<span class="px-2 py-1 rounded-lg bg-rose-50 border border-rose-200 text-xs font-bold">${w.icon || "⭐"} ${w.en} (${w.pl})</span>`).join("")}</div>`}
      </div>
    `;
  };
  box.innerHTML = `
    <h3 class="font-extrabold text-rose-950 text-lg mb-3">🎯 Trudne słówka synów</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      ${renderCol("igor", "👦 Igor")}
      ${renderCol("hubert", "🧑 Hubert")}
    </div>
  `;
}

function parentClearHardWords(profKey) {
  if (!state.stats[profKey]) return;
  state.stats[profKey].hardWords = [];
  saveCloudData();
  renderParentHardWordsBox();
  showParentStatus(`✅ Wyczyszczono listę trudnych słówek (${PROFILE_META[profKey].name}).`);
}

function renderRoundLengthButtons() {
  const box = document.getElementById("roundLengthButtons");
  if (!box) return;
  const lengths = [5, 8, 10, 12, 15];
  box.innerHTML = lengths.map(n => `
    <button onclick="parentSetRoundLength(${n})" class="kid-card px-4 py-2 rounded-xl font-extrabold text-xs border-2 ${state.questionsPerRound === n ? "bg-amber-500 text-white border-amber-700" : "bg-white text-slate-800 border-slate-300"}">
      ${n} pytań
    </button>
  `).join("");
}

function parentSetRoundLength(n) {
  state.questionsPerRound = n;
  saveCloudData();
  renderRoundLengthButtons();
  showParentStatus(`✅ Ustawiono długość rundy: ${n} pytań.`);
}

function parentGiveTestChest(profKey, tier) {
  if (!state.stats[profKey]) return;
  const p = ensurePlayerStructure(state.stats[profKey]);
  p.pendingChests.push({ tier, reason: "Specjalna skrzynia od Taty! 🎁", date: new Date().toISOString() });
  state.stats[profKey] = p;
  saveCloudData();
  const names = { bronze: "Brązową", silver: "Srebrną", gold: "Złotą" };
  showParentStatus(`🎁 Wysłano ${names[tier] || ""} Skrzynię do ${PROFILE_META[profKey].name}! Otworzy ją po wejściu na swój profil.`);
}

function parentScanWorksheetAI(inputEl) {
  const file = inputEl && inputEl.files && inputEl.files[0];
  if (!file) return;
  let apiKey = "";
  try { apiKey = (document.getElementById("parentGeminiKey")?.value || localStorage.getItem("akademia_gemini_key") || "").trim(); } catch (e) {}
  if (!apiKey) {
    showParentStatus("⚠️ Wklej najpierw swój klucz Gemini API!", true);
    return;
  }
  const targetAge = document.getElementById("parentAiTargetAge")?.value || "4 i 6 lat";
  showParentStatus("⏳ Analizuję zdjęcie karty pracy przez Gemini AI...");

  const reader = new FileReader();
  reader.onload = () => {
    const base64Data = String(reader.result || "").split(",")[1];
    const prompt = `Wyciągnij słówka angielskie ze zdjęcia karty pracy dla dziecka (${targetAge}). Zwróć wyłącznie linie w formacie: Angielski - Polski - Emoji - 4,6 (bez nagłówków i markdown).`;
    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inline_data: { mime_type: file.type || "image/jpeg", data: base64Data } }
          ]
        }]
      })
    })
      .then(r => r.json())
      .then(data => {
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        if (!text.trim()) {
          showParentStatus("❌ Nie udało się odczytać słówek ze zdjęcia.", true);
          return;
        }
        openParentSection("new_lesson");
        const titleEl = document.getElementById("newLessonTitle");
        const linesEl = document.getElementById("newLessonLines");
        if (titleEl && !titleEl.value.trim()) titleEl.value = `${state.lessons.length + 1}. Karta pracy ze zdjęcia`;
        if (linesEl) linesEl.value = text.trim();
        showParentStatus("✅ Słówka odczytane ze zdjęcia! Sprawdź listę i zapisz lekcję.");
      })
      .catch(() => showParentStatus("❌ Błąd połączenia z Gemini API.", true));
  };
  reader.readAsDataURL(file);
}

function parentExportBackupJson() {
  const payload = {
    version: CURRENT_GAME_VERSION,
    exportedAt: new Date().toISOString(),
    stats: state.stats,
    lessons: state.lessons,
    questionsPerRound: state.questionsPerRound,
    calibration: state.calibration
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `akademia_angielskiego_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showParentStatus("⬇️ Pobrano plik kopii zapasowej (.json).");
}

function parentImportBackupJson(inputEl) {
  const file = inputEl && inputEl.files && inputEl.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      if (parsed.stats) {
        state.stats.igor = ensurePlayerStructure(parsed.stats.igor);
        state.stats.hubert = ensurePlayerStructure(parsed.stats.hubert);
        state.stats.tata = ensurePlayerStructure(parsed.stats.tata);
        if (Array.isArray(parsed.stats.stickers)) state.stats.stickers = parsed.stats.stickers;
      }
      if (Array.isArray(parsed.lessons)) state.lessons = parsed.lessons;
      if (parsed.questionsPerRound) state.questionsPerRound = parsed.questionsPerRound;
      if (parsed.calibration) state.calibration = mergeCalibrationWithDefaults(parsed.calibration);
      saveCloudData();
      refreshAllParentWidgets();
      showParentStatus("⬆️ Wczytano kopię zapasową i zapisano w chmurze!");
    } catch (e) {
      showParentStatus("❌ Nieprawidłowy plik kopii zapasowej JSON.", true);
    }
  };
  reader.readAsText(file);
}

function resetEverythingAll() {
  if (!confirm("⚠️ UWAGA! Czy na pewno zresetować wszystkie postępy, gwiazdki, ubrania i własne lekcje?")) return;
  localStorage.removeItem("akademia_save_v14");
  localStorage.removeItem("akademia_save_v12");
  localStorage.removeItem("akademia_save_v10");
  localStorage.removeItem("akademia_approved_lessons_v1");
  state.lessons = JSON.parse(JSON.stringify(FULL_LESSONS_DATABASE));
  state.approvedLessonIds = [];
  state.equalizedLessonsForIgor = [];
  state.stats = {
    igor: createDefaultPlayerStats(),
    hubert: createDefaultPlayerStats(),
    tata: createDefaultPlayerStats(),
    stickers: []
  };
  saveCloudData();
  closeParentDashboard();
  showStartScreen();
}

window.addEventListener("DOMContentLoaded", () => {
  syncVersionLabelsInDom();
  const pinInput = document.getElementById("pinInputField");
  if (pinInput) {
    pinInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") verifyParentPinAndProceed();
    });
  }
  if (typeof loadCloudData === "function") {
    loadCloudData();
  }
});
