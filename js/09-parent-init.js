/* ============================================================================
   PLIK: js/09-parent-init.js
   PIN RODZICA (BEZ KLAWIATURY TELEFONU), GENERATOR AI, CENTRUM TESTOWE I GARDEROBA
   ============================================================================ */

let _pendingPinAction = "dashboard";
let _selectedManagerLessonId = null;
let _selectedWardrobePlayerKey = "tata";
let _selectedWardrobeAdminTier = "all";
let _selectedWardrobeAdminCat = "all";

const AUTO_LESSON_TOPICS_DB = [
  {
    keywords: ["chorob", "zdrow", "lekarz", "szpital", "przezięb", "gorączk", "kaszel", "katar", "ból", "illness", "sick", "health", "doctor"],
    icon: "🤒🩺",
    words: [
      { en: "Fever", pl: "Gorączka", phonetic: "fiwer", icon: "🤒", age: [4, 6] },
      { en: "Cough", pl: "Kaszel", phonetic: "kof", icon: "😷", age: [4, 6] },
      { en: "Cold", pl: "Przeziębienie", phonetic: "kold", icon: "🤧", age: [4, 6] },
      { en: "Doctor", pl: "Lekarz", phonetic: "doktor", icon: "🩺", age: [4, 6] },
      { en: "Bandage", pl: "Plasterek", phonetic: "bandydż", icon: "🩹", age: [4, 6] },
      { en: "Medicine", pl: "Lekarstwo", phonetic: "medisyn", icon: "💊", age: [4, 6] },
      { en: "Thermometer", pl: "Termometr", phonetic: "fermometer", icon: "🌡️", age: [6] },
      { en: "Headache", pl: "Ból głowy", phonetic: "hedejk", icon: "🤕", age: [6] },
      { en: "Stomach ache", pl: "Ból brzucha", phonetic: "stamak ejk", icon: "🤢", age: [6] },
      { en: "Hospital", pl: "Szpital", phonetic: "hospital", icon: "🏥", age: [4, 6] },
      { en: "Ambulance", pl: "Karetka", phonetic: "ambjulans", icon: "🚑", age: [4, 6] },
      { en: "Healthy", pl: "Zdrowy", phonetic: "helfi", icon: "💪", age: [6] }
    ]
  },
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
    keywords: ["zawod", "prac", "straż", "policj", "job", "profession", "hero"],
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

function getStoredGeminiApiKey() {
  try {
    const k1 = document.getElementById("parentGeminiKey")?.value?.trim();
    const k2 = document.getElementById("quickGeminiKeyInput")?.value?.trim();
    const saved = localStorage.getItem("akademia_gemini_key") || "";
    return k1 || k2 || saved.trim();
  } catch (e) {
    return "";
  }
}

function saveGeminiApiKeyEverywhere(val) {
  const clean = String(val || "").trim();
  try { localStorage.setItem("akademia_gemini_key", clean); } catch (e) {}
  const f1 = document.getElementById("parentGeminiKey");
  const f2 = document.getElementById("quickGeminiKeyInput");
  if (f1 && f1.value !== clean) f1.value = clean;
  if (f2 && f2.value !== clean) f2.value = clean;
  updateAiKeyStatusBadge();
}

function updateAiKeyStatusBadge() {
  const badge = document.getElementById("aiGeneratorModeBadge");
  if (!badge) return;
  const hasKey = Boolean(getStoredGeminiApiKey());
  if (hasKey) {
    badge.className = "px-2.5 py-1 rounded-xl bg-emerald-100 border border-emerald-400 text-xs font-extrabold text-emerald-900";
    badge.textContent = "🤖 Gemini AI: AKTYWNY (dowolny temat!)";
  } else {
    badge.className = "px-2.5 py-1 rounded-xl bg-amber-100 border border-amber-400 text-xs font-extrabold text-amber-950";
    badge.textContent = "📦 Tryb bez klucza AI (12 tematów)";
  }
}

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
    descEl.textContent = "Wpisz 4-cyfrowy kod PIN (klawiaturą poniżej):";
  }

  input.readOnly = true;
  input.setAttribute("readonly", "readonly");
  input.setAttribute("inputmode", "none");
  input.value = "";
  if (document.activeElement && typeof document.activeElement.blur === "function") {
    document.activeElement.blur();
  }
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
  const savedKey = getStoredGeminiApiKey();
  saveGeminiApiKeyEverywhere(savedKey);
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
  if (state.profile && PROFILE_META[state.profile] && typeof checkPendingDadChestsForPlayer === "function") {
    checkPendingDadChestsForPlayer(state.profile);
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
  renderParentWardrobeManager();
  renderParentLessonsManager();
  renderParentHardWordsBox();
  renderRoundLengthButtons();
  updateAiKeyStatusBadge();
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

function renderGeneratedLessonPreview(finalWords, sourceLabel = "Gemini AI") {
  const previewBox = document.getElementById("generatedLessonPreviewBox");
  if (!previewBox) return;
  previewBox.classList.remove("hidden");
  previewBox.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-2">
      <span class="text-xs font-extrabold text-emerald-900">✅ Wygenerowano ${finalWords.length} słówek (${sourceLabel})! Gotowe do wszystkich trybów (Fiszki, Quiz, 🎧 Ze słuchu, Literki, Wymowa, Memory, Sprawdzian, VS i Smok):</span>
    </div>
    <div class="flex flex-wrap gap-1.5">
      ${finalWords.map(w => `<span class="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-slate-800">${w.icon} ${w.en} (${w.pl}) <span class="text-[10px] text-indigo-700">[${w.age.join(",")}]</span></span>`).join("")}
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
      <button onclick="parentCreateNewLesson(false)" class="kid-card py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-amber-950 font-extrabold rounded-xl text-xs shadow">🧪 Zapisz do testów na koncie TATA (Zalecane)</button>
      <button onclick="parentCreateNewLesson(true)" class="kid-card py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs shadow">🚀 Zapisz i udostępnij od razu synom</button>
    </div>
  `;
}

function parseGeminiLessonJsonResponse(rawText) {
  const cleaned = String(rawText || "").replace(/```json\s*/gi, "").replace(/```/g, "").trim();
  const data = JSON.parse(cleaned);
  if (!data || !Array.isArray(data.words)) return null;
  const words = data.words
    .filter(w => w && w.en && w.pl)
    .map(w => {
      let ageArr = [4, 6];
      if (Array.isArray(w.age)) {
        const filtered = w.age.map(Number).filter(n => n === 4 || n === 6);
        if (filtered.length > 0) ageArr = filtered;
      } else if (String(w.age || "").includes("6") && !String(w.age || "").includes("4")) {
        ageArr = [6];
      } else if (String(w.age || "").includes("4") && !String(w.age || "").includes("6")) {
        ageArr = [4];
      }
      return {
        en: String(w.en).trim(),
        pl: String(w.pl).trim(),
        phonetic: String(w.phonetic || "").trim(),
        icon: String(w.icon || "⭐").trim(),
        age: ageArr
      };
    });
  return {
    title: String(data.title || "").trim(),
    icon: String(data.icon || "📚✨").trim(),
    words
  };
}

async function parentAutoGenerateLesson() {
  const titleInput = document.getElementById("newLessonTitle");
  const iconInput = document.getElementById("newLessonIcon");
  const descInput = document.getElementById("newLessonDesc");
  const ageSel = document.getElementById("newLessonTargetAge");
  const countSel = document.getElementById("newLessonWordCount");
  const linesArea = document.getElementById("newLessonLines");

  const rawTitle = (titleInput && titleInput.value.trim()) || "";
  const rawDesc = (descInput && descInput.value.trim()) || "";
  if (!rawTitle && !rawDesc) {
    showParentStatus("⚠️ Wpisz temat lub opis lekcji (np. „Stwórz lekcję o chorobach”)!", true);
    return;
  }

  const targetAgeMode = ageSel ? ageSel.value : "auto";
  const desiredCount = parseInt(countSel ? countSel.value : "8", 10) || 8;
  const apiKey = getStoredGeminiApiKey();

  if (apiKey) {
    showParentStatus("🤖 Gemini AI układa lekcję, dobiera słówka, wymowę i poziomy dla Igora (4 l.) i Huberta (6 l.)...");
    const ageInstruction = targetAgeMode === "auto"
      ? "Proste, konkretne słowa ustaw jako [4, 6] (dla obu braci), a trudniejsze lub bardziej abstrakcyjne jako [6] (tylko dla 6-letniego Huberta)."
      : (targetAgeMode === "4,6" ? "Wszystkie słowa ustaw jako [4, 6]." : (targetAgeMode === "4" ? "Wszystkie słowa ustaw jako [4]." : "Wszystkie słowa ustaw jako [6]."));

    const aiPrompt = `Jesteś nauczycielem języka angielskiego dla dwóch chłopców z Polski: Igora (4 lata) i Huberta (6 lat).
Zadanie rodzica:
Tytuł: "${rawTitle || "brak - wymyśl krótki polski tytuł z numerem " + (state.lessons.length + 1)}"
Opis / polecenie: "${rawDesc || rawTitle}"
Liczba słówek: ${desiredCount}.
Reguły:
- Wybierz ${desiredCount} najważniejszych, naturalnych słówek/wyrażeń angielskich dokładnie na temat podany przez rodzica.
- ${ageInstruction}
- Dla każdego słówka podaj:
  * "en": słowo po angielsku (z wielkiej litery, np. "Fever"),
  * "pl": tłumaczenie po polsku (np. "Gorączka"),
  * "phonetic": uproszczony polski zapis wymowy dla dziecka (np. "fiwer"),
  * "icon": 1 lub 2 pasujące emoji (np. "🤒"),
  * "age": tablica [4, 6] lub [6] lub [4].
Zwróć wyłącznie czysty obiekt JSON w formacie:
{"title": "Tytuł lekcji po polsku", "icon": "2 emoji", "words": [{"en":"...", "pl":"...", "phonetic":"...", "icon":"...", "age":[4,6]}]}`;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: aiPrompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error.message || "Błąd klucza Gemini API");
      }
      const rawReply = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const parsed = parseGeminiLessonJsonResponse(rawReply);
      if (parsed && parsed.words.length > 0) {
        const finalWords = parsed.words.slice(0, desiredCount);
        if (titleInput && !titleInput.value.trim()) {
          titleInput.value = parsed.title || `${state.lessons.length + 1}. ${rawDesc.slice(0, 32)}`;
        }
        if (iconInput && !iconInput.value.trim()) {
          iconInput.value = parsed.icon || "🤖📚";
        }
        if (linesArea) {
          linesArea.value = formatWordsToLessonLines(finalWords);
        }
        renderGeneratedLessonPreview(finalWords, "🤖 Gemini AI");
        showParentStatus(`🤖✨ Gemini AI wygenerowało ${finalWords.length} słówek! Zapisz do testów na koncie TATA lub udostępnij od razu synom.`);
        return;
      }
    } catch (err) {
      showParentStatus(`⚠️ Nie udało się połączyć z Gemini AI (${err.message}). Używam generatora wbudowanego...`, true);
    }
  }

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

  if (!matchedTopic) {
    showParentStatus("⚠️ Temat spoza 12 wbudowanych działów! Wklej darmowy klucz <strong>Gemini AI</strong> powyżej (AIza...), aby AI mogło stworzyć lekcję na dowolny temat!", true);
    return;
  }

  let candidateWords = [...matchedTopic.words];
  if (iconInput && !iconInput.value.trim()) {
    iconInput.value = matchedTopic.icon;
  }

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
    titleInput.value = `${state.lessons.length + 1}. ${rawDesc.slice(0, 32)}`;
  }
  if (linesArea) {
    linesArea.value = formatWordsToLessonLines(finalWords);
  }

  renderGeneratedLessonPreview(finalWords, "📦 Baza wbudowana");
  showParentStatus(`✅ Wygenerowano ${finalWords.length} słówek z bazy tematycznej! Zapisz najpierw na koncie TATA do testów lub udostępnij synom.`);
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
    showParentStatus("⚠️ Kliknij najpierw „Wygeneruj lekcję” lub wpisz słówka!", true);
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
    showParentStatus(`🧪 Zapisano lekcję testową „${title}” (widoczna wyłącznie na koncie TATA). Po sprawdzeniu zatwierdź ją w Centrum Testowym. <button onclick="parentApproveTestLesson('${newId}')" class="ml-2 px-3 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow">🚀 Zatwierdź teraz dla chłopców</button>`);
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

  lesson.items.push({ en, pl, phonetic, icon, age, testOnly: true });
  saveCloudData();
  refreshAllParentWidgets();

  if (enEl) enEl.value = "";
  if (plEl) plEl.value = "";
  if (phEl) phEl.value = "";
  if (icEl) icEl.value = "";
  if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
  showParentStatus(`🧪 Dodano słówko testowe „${en} (${pl})” do lekcji „${lesson.title}” (widoczne najpierw tylko na koncie TATA).`);
}

function parentApproveTestLesson(lessonId) {
  const lesson = state.lessons.find(l => l.id === lessonId);
  if (!lesson) return;
  delete lesson.testOnly;
  if (Array.isArray(lesson.items)) {
    lesson.items.forEach(it => { if (it.testOnly) delete it.testOnly; });
  }
  persistApprovedLessonIds([...(state.approvedLessonIds || []), lessonId]);
  saveCloudData();
  refreshAllParentWidgets();
  if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
  showParentStatus(`✅ Lekcja „${lesson.title}” została zatwierdzona i jest już dostępna dla Igora i Huberta!`);
}

function parentToggleFortuneWheelForKids() {
  const nextVal = !isFortuneWheelPublishedForKids();
  setFortuneWheelPublishedForKids(nextVal);
  renderParentTestCenter();
  if (state.profile && typeof showLessonMenu === "function") showLessonMenu();
  showParentStatus(nextVal
    ? "✅ Koło Fortuny zostało zatwierdzone i jest już widoczne dla Igora i Huberta!"
    : "🧪 Koło Fortuny zostało wycofane do trybu testowego (widoczne tylko na koncie TATA).");
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
  const fwPublished = isFortuneWheelPublishedForKids();
  const pendingCount = testLessons.length + (fwPublished ? 0 : 1);
  if (badge) badge.textContent = `${pendingCount} oczekujących`;
  if (!box) return;

  const eqSet = new Set(Array.isArray(state.equalizedLessonsForIgor) ? state.equalizedLessonsForIgor : []);
  const regularLessons = state.lessons.filter(l => l.type !== "memory_game");

  box.innerHTML = `
    <h3 class="font-extrabold text-teal-950 text-lg mb-2">🧪 Centrum Testowe i Poziomy</h3>

    <div class="mb-4">
      <div class="text-xs font-extrabold text-teal-900 uppercase mb-1.5">Nowe funkcje w testach (widoczne najpierw tylko u Taty):</div>
      <div class="p-3 rounded-2xl bg-white border-2 ${fwPublished ? "border-emerald-300" : "border-amber-300"} flex flex-wrap items-center justify-between gap-2">
        <div>
          <div class="font-extrabold text-sm text-slate-900">🎡 Codzienne Koło Fortuny (10–200 ⭐ raz dziennie)</div>
          <div class="text-[11px] text-slate-500">${fwPublished ? "✅ Zatwierdzone i aktywne dla Igora oraz Huberta" : "🧪 Obecnie widoczne wyłącznie na koncie TATA"}</div>
        </div>
        <button onclick="parentToggleFortuneWheelForKids()" class="kid-card px-3.5 py-1.5 rounded-xl font-extrabold text-xs ${fwPublished ? "bg-slate-200 text-slate-800" : "bg-emerald-600 text-white"}">
          ${fwPublished ? "Cofnij do testów Taty" : "✅ Zatwierdź dla synów"}
        </button>
      </div>
    </div>

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

// ------------------------------------------------------------------------
// GARDEROBA I PRZEBRANIA (OSOBNO DLA TATY, IGORA I HUBERTA)
// ------------------------------------------------------------------------
function parentUnlockAllOutfitsForProfile(profKey) {
  if (!state.stats[profKey]) return;
  const p = ensurePlayerStructure(state.stats[profKey]);
  const all131 = typeof getAll131OutfitsFlat === "function" ? getAll131OutfitsFlat().map(o => o.src) : [];
  p.unlockedItems = Array.from(new Set([...(p.unlockedItems || []), ...all131]));
  p.wardrobeUpdatedAt = Date.now();
  state.stats[profKey] = p;
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  renderParentWardrobeManager();
  showParentStatus(`🔓 Odblokowano wszystkie ${all131.length} przebrań wyłącznie dla: <strong>${PROFILE_META[profKey].name}</strong>!`);
}

function parentLockAllOutfitsForProfile(profKey) {
  if (!state.stats[profKey]) return;
  const p = ensurePlayerStructure(state.stats[profKey]);
  p.unlockedItems = [];
  if (p.avatar) {
    p.avatar.head = "";
    p.avatar.torso = "";
    p.avatar.legs = "";
  }
  p.wardrobeUpdatedAt = Date.now();
  state.stats[profKey] = p;
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  renderParentWardrobeManager();
  showParentStatus(`🔒 Zablokowano wszystkie przebrania dla: <strong>${PROFILE_META[profKey].name}</strong>.`);
}

function parentUnlockAllPetsForProfile(profKey) {
  if (!state.stats[profKey]) return;
  const p = ensurePlayerStructure(state.stats[profKey]);
  const allPets = (typeof COMPANION_PETS !== "undefined" ? COMPANION_PETS : []).map(pet => pet.id);
  p.memoryAnimals = Array.from(new Set([...(p.memoryAnimals || []), ...allPets]));
  p.wardrobeUpdatedAt = Date.now();
  state.stats[profKey] = p;
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  renderParentWardrobeManager();
  showParentStatus(`🐾 Odblokowano wszystkie ${allPets.length} zwierzaków wyłącznie dla: <strong>${PROFILE_META[profKey].name}</strong>!`);
}

function parentLockAllPetsForProfile(profKey) {
  if (!state.stats[profKey]) return;
  const p = ensurePlayerStructure(state.stats[profKey]);
  p.memoryAnimals = [];
  if (p.avatar) p.avatar.pet = "";
  p.wardrobeUpdatedAt = Date.now();
  state.stats[profKey] = p;
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  renderParentWardrobeManager();
  showParentStatus(`🔒 Zablokowano wszystkie zwierzaki dla: <strong>${PROFILE_META[profKey].name}</strong>.`);
}

function parentToggleSingleOutfitForProfile(profKey, src) {
  if (!state.stats[profKey]) return;
  const p = ensurePlayerStructure(state.stats[profKey]);
  const cleanSrc = resolveOutfitPath(src);
  const exists = p.unlockedItems.includes(cleanSrc);

  if (exists) {
    p.unlockedItems = p.unlockedItems.filter(it => it !== cleanSrc);
    if (p.avatar) {
      if (p.avatar.head === cleanSrc) p.avatar.head = "";
      if (p.avatar.torso === cleanSrc) p.avatar.torso = "";
      if (p.avatar.legs === cleanSrc) p.avatar.legs = "";
    }
  } else {
    p.unlockedItems.push(cleanSrc);
  }
  p.wardrobeUpdatedAt = Date.now();
  state.stats[profKey] = p;
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  renderParentWardrobeManager();
}

function parentToggleSinglePetForProfile(profKey, petId) {
  if (!state.stats[profKey]) return;
  const p = ensurePlayerStructure(state.stats[profKey]);
  const exists = (p.memoryAnimals || []).includes(petId);
  if (exists) {
    p.memoryAnimals = p.memoryAnimals.filter(id => id !== petId);
    if (p.avatar && p.avatar.pet === petId) p.avatar.pet = "";
  } else {
    p.memoryAnimals.push(petId);
  }
  p.wardrobeUpdatedAt = Date.now();
  state.stats[profKey] = p;
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  renderParentWardrobeManager();
}

function renderParentWardrobeManager() {
  const box = document.getElementById("parentWardrobeManagerBox");
  if (!box) return;

  const profKey = PROFILE_META[_selectedWardrobePlayerKey] ? _selectedWardrobePlayerKey : "tata";
  const p = ensurePlayerStructure(state.stats[profKey]);
  state.stats[profKey] = p;

  const all131 = typeof getAll131OutfitsFlat === "function" ? getAll131OutfitsFlat() : [];
  const allPets = typeof COMPANION_PETS !== "undefined" ? COMPANION_PETS : [];
  const ownedOutfitsCount = all131.filter(o => p.unlockedItems.includes(o.src)).length;
  const ownedPetsCount = allPets.filter(pet => (p.memoryAnimals || []).includes(pet.id)).length;

  const profiles = [
    { key: "tata",   label: "👨‍💻 TATA (Konto testowe)", activeCls: "bg-emerald-600 text-white border-emerald-800" },
    { key: "igor",   label: "👦 IGOR (4 l.)",           activeCls: "bg-amber-500 text-white border-amber-700" },
    { key: "hubert", label: "🧑 HUBERT (6 l.)",         activeCls: "bg-sky-600 text-white border-sky-800" }
  ];

  const catTabs = [
    { id: "all",   label: "👕 Wszystkie ubrania" },
    { id: "head",  label: "🧢 Głowa" },
    { id: "torso", label: "👕 Tułów" },
    { id: "legs",  label: "👖 Nogi" },
    { id: "pets",  label: `🐾 Zwierzaki (${ownedPetsCount}/${allPets.length})` }
  ];

  const tierTabs = [
    { id: "all",    label: "Wszystkie skrzynie" },
    { id: "bronze", label: "📦 Brązowa" },
    { id: "silver", label: "🥈 Srebrna" },
    { id: "gold",   label: "👑 Złota" }
  ];

  let gridHtml = "";
  if (_selectedWardrobeAdminCat === "pets") {
    gridHtml = `
      <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-80 overflow-y-auto pr-1">
        ${allPets.map(pet => {
          const unlocked = (p.memoryAnimals || []).includes(pet.id);
          return `
            <button type="button" onclick="parentToggleSinglePetForProfile('${profKey}', '${pet.id}')"
              class="kid-card p-2 rounded-2xl border-2 text-center flex flex-col items-center justify-between ${
                unlocked ? "bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm" : "bg-slate-100 border-slate-300 text-slate-500 opacity-75"
              }">
              <span class="text-3xl">${pet.icon}</span>
              <span class="text-[10px] font-extrabold leading-tight mt-1">${pet.pl}</span>
              <span class="mt-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold ${unlocked ? "bg-emerald-600 text-white" : "bg-slate-300 text-slate-700"}">
                ${unlocked ? "✓ Odblokowane" : "🔒 Zablokowane"}
              </span>
            </button>
          `;
        }).join("")}
      </div>
    `;
  } else {
    const filtered = all131.filter(it => {
      const matchTier = _selectedWardrobeAdminTier === "all" || it.tier === _selectedWardrobeAdminTier;
      const matchCat = _selectedWardrobeAdminCat === "all" || it.slot === _selectedWardrobeAdminCat;
      return matchTier && matchCat;
    });

    gridHtml = `
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-80 overflow-y-auto pr-1">
        ${filtered.map(item => {
          const unlocked = p.unlockedItems.includes(item.src);
          const tierBadge = item.tier === "gold" ? "bg-amber-400 text-amber-950" : item.tier === "silver" ? "bg-slate-300 text-slate-900" : "bg-amber-700 text-white";
          return `
            <button type="button" onclick="parentToggleSingleOutfitForProfile('${profKey}', '${item.src}')"
              class="kid-card p-2 rounded-2xl border-2 text-center flex flex-col items-center justify-between ${
                unlocked ? "bg-emerald-50 border-emerald-500 text-slate-900 shadow-sm" : "bg-slate-100 border-slate-300 text-slate-500 opacity-75"
              }">
              <span class="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${tierBadge} mb-1">${item.tierLabel}</span>
              <img src="${item.src}?v=${CURRENT_GAME_VERSION}" loading="lazy" decoding="async" class="w-12 h-12 object-contain my-0.5" onerror="handleOutfitImgError(this, '${item.src}', '${item.fallbackSrc}')" />
              <span class="text-[10px] font-bold leading-tight break-all">${item.name}</span>
              <span class="mt-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold ${unlocked ? "bg-emerald-600 text-white" : "bg-slate-300 text-slate-700"}">
                ${unlocked ? "✓ Ma to" : "🔒 Brak"}
              </span>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  box.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <h3 class="font-extrabold text-indigo-950 text-lg">👕 Garderoba i Przebrania (Osobno na każdy profil)</h3>
      <span class="px-3 py-1 rounded-full bg-white border border-indigo-300 text-xs font-extrabold text-indigo-900">
        ${PROFILE_META[profKey].name}: 👕 ${ownedOutfitsCount}/${all131.length} • 🐾 ${ownedPetsCount}/${allPets.length}
      </span>
    </div>

    <div class="mb-3">
      <div class="text-xs font-extrabold text-indigo-900 uppercase mb-1.5">1. Wybierz profil, dla którego zmieniasz garderobę:</div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
        ${profiles.map(pr => {
          const isSel = pr.key === profKey;
          return `
            <button type="button" onclick="_selectedWardrobePlayerKey='${pr.key}'; renderParentWardrobeManager();"
              class="kid-card py-2.5 px-3 rounded-2xl border-3 font-extrabold text-xs md:text-sm shadow-sm ${
                isSel ? pr.activeCls : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }">
              ${pr.label} ${isSel ? "✓" : ""}
            </button>
          `;
        }).join("")}
      </div>
    </div>

    <div class="p-3 rounded-2xl bg-white border-2 border-indigo-200 mb-3 space-y-2">
      <div class="text-xs font-extrabold text-slate-800">2. Szybkie akcje wyłącznie dla profilu <strong>${PROFILE_META[profKey].name}</strong>:</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button type="button" onclick="parentUnlockAllOutfitsForProfile('${profKey}')" class="kid-card py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow">
          🔓 Odblokuj wszystkie ubrania (${PROFILE_META[profKey].name})
        </button>
        <button type="button" onclick="parentLockAllOutfitsForProfile('${profKey}')" class="kid-card py-2 px-3 rounded-xl bg-slate-600 hover:bg-slate-700 text-white font-bold text-xs">
          🔒 Zablokuj wszystkie ubrania (${PROFILE_META[profKey].name})
        </button>
        <button type="button" onclick="parentUnlockAllPetsForProfile('${profKey}')" class="kid-card py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-extrabold text-xs shadow">
          🐾 Odblokuj wszystkie zwierzaki (${PROFILE_META[profKey].name})
        </button>
        <button type="button" onclick="parentLockAllPetsForProfile('${profKey}')" class="kid-card py-2 px-3 rounded-xl bg-slate-500 hover:bg-slate-600 text-white font-bold text-xs">
          🔒 Zablokuj wszystkie zwierzaki (${PROFILE_META[profKey].name})
        </button>
      </div>
    </div>

    <div class="space-y-2">
      <div class="text-xs font-extrabold text-indigo-900 uppercase">3. Kliknij konkretne przebranie lub zwierzaka, aby odblokować / zablokować tylko dla ${PROFILE_META[profKey].name}:</div>
      <div class="flex flex-wrap gap-1.5">
        ${catTabs.map(ct => `
          <button type="button" onclick="_selectedWardrobeAdminCat='${ct.id}'; renderParentWardrobeManager();"
            class="px-2.5 py-1 rounded-xl font-extrabold text-xs border-2 ${_selectedWardrobeAdminCat === ct.id ? "bg-indigo-600 text-white border-indigo-800" : "bg-white text-slate-700 border-slate-200"}">
            ${ct.label}
          </button>
        `).join("")}
      </div>
      ${_selectedWardrobeAdminCat !== "pets" ? `
        <div class="flex flex-wrap gap-1.5">
          ${tierTabs.map(tt => `
            <button type="button" onclick="_selectedWardrobeAdminTier='${tt.id}'; renderParentWardrobeManager();"
              class="px-2.5 py-1 rounded-xl font-bold text-[11px] border ${_selectedWardrobeAdminTier === tt.id ? "bg-amber-500 text-white border-amber-700" : "bg-white text-slate-600 border-slate-200"}">
              ${tt.label}
            </button>
          `).join("")}
        </div>
      ` : ""}
      ${gridHtml}
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
  const isCurrentUser = state.profile === profKey;
  const openNowBtn = isCurrentUser
    ? ` <button onclick="closeParentDashboard()" class="ml-2 px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow">🎁 Otwórz teraz!</button>`
    : "";
  showParentStatus(`🎁 Wysłano ${names[tier] || ""} Skrzynię do ${PROFILE_META[profKey].name}! ${isCurrentUser ? "Zamknij panel lub kliknij obok, aby otworzyć:" : "Otworzy ją po wejściu na swój profil."}${openNowBtn}`);
}

function parentScanWorksheetAI(inputEl) {
  const file = inputEl && inputEl.files && inputEl.files[0];
  if (!file) return;
  const apiKey = getStoredGeminiApiKey();
  if (!apiKey) {
    showParentStatus("⚠️ Wklej najpierw swój klucz Gemini API!", true);
    return;
  }
  const targetAge = document.getElementById("parentAiTargetAge")?.value || "4 i 6 lat";
  const customNote = document.getElementById("parentWorksheetCustomPrompt")?.value?.trim() || "";
  showParentStatus("🤖📷 Analizuję zdjęcie karty pracy przez Gemini AI...");

  const reader = new FileReader();
  reader.onload = () => {
    const base64Data = String(reader.result || "").split(",")[1];
    const prompt = `Jesteś nauczycielem angielskiego dla Igora (4 lata) i Huberta (6 lat).
Przeanalizuj zdjęcie karty pracy / notatki oraz dodatkowe wskazówki rodzica: "${customNote || "brak dodatkowych uwag"}".
Docelowy poziom: ${targetAge}.
Reguły:
- Wyciągnij słówka/wyrażenia angielskie ze zdjęcia (lub dopasuj je zgodnie ze wskazówkami rodzica).
- Prostsze, obrazkowe słowa ustaw jako [4, 6], a trudniejsze jako [6].
- Dla każdego słówka podaj uproszczoną polską wymowę ("phonetic") i pasujące emoji ("icon").
Zwróć wyłącznie czysty obiekt JSON:
{"title": "Tytuł lekcji po polsku", "icon": "2 emoji", "words": [{"en":"...", "pl":"...", "phonetic":"...", "icon":"...", "age":[4,6]}]}`;

    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inline_data: { mime_type: file.type || "image/jpeg", data: base64Data } }
          ]
        }],
        generationConfig: { responseMimeType: "application/json" }
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          showParentStatus(`❌ Błąd Gemini AI: ${data.error.message}`, true);
          return;
        }
        const rawReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const parsed = parseGeminiLessonJsonResponse(rawReply);
        if (!parsed || parsed.words.length === 0) {
          showParentStatus("❌ Nie udało się odczytać słówek ze zdjęcia.", true);
          return;
        }
        openParentSection("new_lesson");
        const titleEl = document.getElementById("newLessonTitle");
        const iconEl = document.getElementById("newLessonIcon");
        const descEl = document.getElementById("newLessonDesc");
        const linesEl = document.getElementById("newLessonLines");
        if (titleEl) titleEl.value = parsed.title || `${state.lessons.length + 1}. Karta pracy ze zdjęcia`;
        if (iconEl) iconEl.value = parsed.icon || "📷📚";
        if (descEl && customNote) descEl.value = customNote;
        if (linesEl) linesEl.value = formatWordsToLessonLines(parsed.words);
        renderGeneratedLessonPreview(parsed.words, "📷🤖 Skaner AI");
        showParentStatus(`✅ Skaner AI rozpoznał ${parsed.words.length} słówek! Zapisz do testów na koncie TATA lub udostępnij synom.`);
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
  localStorage.removeItem("akademia_fw_published_v1");
  state.lessons = JSON.parse(JSON.stringify(FULL_LESSONS_DATABASE));
  state.approvedLessonIds = [];
  state.equalizedLessonsForIgor = [];
  state.fortuneWheelPublishedForKids = false;
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

  document.addEventListener("keydown", (e) => {
    const pinModal = document.getElementById("parentPinModal");
    if (!pinModal || pinModal.classList.contains("hidden")) return;
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      handlePinKeypadPress(e.key);
    } else if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      handlePinKeypadPress("C");
    } else if (e.key === "Enter") {
      e.preventDefault();
      handlePinKeypadPress("OK");
    }
  });

  if (typeof loadCloudData === "function") {
    loadCloudData();
  }
});
