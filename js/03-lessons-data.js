/* ============================================================================
   PLIK: js/03-lessons-data.js
   SŁOWNIKI LEKCJI, ZAGADKI, WŁASNE IKONY SVG PANKEJKÓW ORAZ PULE DO WALKI
   ============================================================================ */

// 1. WŁASNE GRAFIKI WEKTOROWE (SVG) DLA SKŁADNIKÓW PANKEJKÓW
function getCustomPancakeSvg(type, sizePx = 58) {
  if (type === "flour") {
    return `<svg width="${sizePx}" height="${sizePx}" viewBox="0 0 64 64" class="inline-block drop-shadow-sm">
      <rect x="14" y="10" width="36" height="48" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
      <polygon points="14,10 19,4 45,4 50,10" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
      <rect x="14" y="24" width="36" height="14" fill="#38bdf8"/>
      <text x="32" y="34" font-family="sans-serif" font-size="8.5" font-weight="900" fill="#ffffff" text-anchor="middle">FLOUR</text>
      <circle cx="32" cy="48" r="4" fill="#fde047"/>
    </svg>`;
  }
  if (type === "yoghurt") {
    return `<svg width="${sizePx}" height="${sizePx}" viewBox="0 0 64 64" class="inline-block drop-shadow-sm">
      <polygon points="15,18 49,18 44,54 20,54" fill="#ffffff" stroke="#94a3b8" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="12" y="13" width="40" height="5" rx="2.5" fill="#0ea5e9" stroke="#0369a1" stroke-width="1.5"/>
      <polygon points="17,29 47,29 45,43 19,43" fill="#e0f2fe"/>
      <text x="32" y="38.5" font-family="sans-serif" font-size="6.2" font-weight="900" fill="#0369a1" text-anchor="middle">YOGHURT</text>
    </svg>`;
  }
  if (type === "oil") {
    return `<svg width="${sizePx}" height="${sizePx}" viewBox="0 0 64 64" class="inline-block drop-shadow-sm">
      <rect x="26" y="5" width="12" height="6" rx="2" fill="#eab308" stroke="#a16207" stroke-width="1.5"/>
      <path d="M27 11 L27 18 L19 26 L19 54 C19 57 21 59 24 59 L40 59 C43 59 45 57 45 54 L45 26 L37 18 L37 11 Z" fill="#fef08a" fill-opacity="0.85" stroke="#ca8a04" stroke-width="2.5"/>
      <path d="M20 30 L44 30 L44 54 C44 56 42 58 40 58 L24 58 C22 58 20 56 20 54 Z" fill="#facc15"/>
      <rect x="23" y="36" width="18" height="12" rx="2" fill="#ffffff" stroke="#eab308" stroke-width="1.5"/>
      <text x="32" y="45" font-family="sans-serif" font-size="7.5" font-weight="900" fill="#a16207" text-anchor="middle">OIL</text>
    </svg>`;
  }
  return "";
}

// 2. BAZA LEKCJI PODSTAWOWYCH I TESTOWYCH
const DEFAULT_LESSONS = [
  {
    id: "animals",
    title: "Zwierzęta (Animals)",
    icon: "🦁",
    color: "amber",
    items: [
      { en: "Dog",      pl: "Pies",       phonetic: "dog",     icon: "🐶", age: [4, 6] },
      { en: "Cat",      pl: "Kot",        phonetic: "ket",     icon: "🐱", age: [4, 6] },
      { en: "Lion",     pl: "Lew",        phonetic: "lajon",   icon: "🦁", age: [4, 6] },
      { en: "Elephant", pl: "Słoń",       phonetic: "elefant", icon: "🐘", age: [4, 6] },
      { en: "Monkey",   pl: "Małpa",      phonetic: "manki",   icon: "🐵", age: [4, 6] },
      { en: "Bear",     pl: "Niedźwiedź", phonetic: "ber",     icon: "🐻", age: [4, 6] },
      { en: "Rabbit",   pl: "Królik",     phonetic: "rabit",   icon: "🐰", age: [4, 6] },
      { en: "Frog",     pl: "Żaba",       phonetic: "frog",    icon: "🐸", age: [4, 6] },
      { en: "Tiger",    pl: "Tygrys",     phonetic: "tajger",  icon: "🐯", age: [6] },
      { en: "Giraffe",  pl: "Żyrafa",     phonetic: "dżiraf",  icon: "🦒", age: [6] },
      { en: "Turtle",   pl: "Żółw",       phonetic: "tertl",   icon: "🐢", age: [6] },
      { en: "Butterfly",pl: "Motyl",      phonetic: "baterflaj",icon: "🦋", age: [6] }
    ]
  },
  {
    id: "colors",
    title: "Kolory (Colors)",
    icon: "🎨",
    color: "pink",
    items: [
      { en: "Red",    pl: "Czerwony",    phonetic: "red",    icon: "🔴", age: [4, 6] },
      { en: "Blue",   pl: "Niebieski",   phonetic: "blu",    icon: "🔵", age: [4, 6] },
      { en: "Green",  pl: "Zielony",     phonetic: "grin",   icon: "🟢", age: [4, 6] },
      { en: "Yellow", pl: "Żółty",       phonetic: "jelou",  icon: "🟡", age: [4, 6] },
      { en: "Orange", pl: "Pomarańczowy",phonetic: "oryndż", icon: "🟠", age: [4, 6] },
      { en: "Black",  pl: "Czarny",      phonetic: "blek",   icon: "⚫", age: [4, 6] },
      { en: "White",  pl: "Biały",       phonetic: "łajt",   icon: "⚪", age: [4, 6] },
      { en: "Purple", pl: "Fioletowy",   phonetic: "perpl",  icon: "🟣", age: [6] },
      { en: "Brown",  pl: "Brązowy",     phonetic: "braun",  icon: "🟤", age: [6] },
      { en: "Pink",   pl: "Różowy",      phonetic: "pink",   icon: "🩷", age: [6] }
    ]
  },
  {
    id: "numbers",
    title: "Liczby (Numbers)",
    icon: "🔢",
    color: "sky",
    items: [
      { en: "One",   pl: "Jeden",    phonetic: "łan",   icon: "1️⃣", age: [4, 6] },
      { en: "Two",   pl: "Dwa",      phonetic: "tu",    icon: "2️⃣", age: [4, 6] },
      { en: "Three", pl: "Trzy",     phonetic: "fri",   icon: "3️⃣", age: [4, 6] },
      { en: "Four",  pl: "Cztery",   phonetic: "for",   icon: "4️⃣", age: [4, 6] },
      { en: "Five",  pl: "Pięć",     phonetic: "fajw",  icon: "5️⃣", age: [4, 6] },
      { en: "Six",   pl: "Sześć",    phonetic: "siks",  icon: "6️⃣", age: [4, 6] },
      { en: "Seven", pl: "Siedem",   phonetic: "sewen", icon: "7️⃣", age: [6] },
      { en: "Eight", pl: "Osiem",    phonetic: "ejt",   icon: "8️⃣", age: [6] },
      { en: "Nine",  pl: "Dziewięć", phonetic: "najn",  icon: "9️⃣", age: [6] },
      { en: "Ten",   pl: "Dziesięć", phonetic: "ten",   icon: "🔟", age: [6] }
    ]
  },
  {
    id: "family",
    title: "Rodzina (Family)",
    icon: "👨‍👩‍👦‍👦",
    color: "emerald",
    items: [
      { en: "Mum",         pl: "Mama",    phonetic: "mam",        icon: "👩", age: [4, 6] },
      { en: "Dad",         pl: "Tata",    phonetic: "ded",        icon: "👨", age: [4, 6] },
      { en: "Brother",     pl: "Brat",    phonetic: "brader",     icon: "👦", age: [4, 6] },
      { en: "Baby",        pl: "Dzidziuś",phonetic: "bejbi",      icon: "👶", age: [4, 6] },
      { en: "Grandma",     pl: "Babcia",  phonetic: "grenma",     icon: "👵", age: [4, 6] },
      { en: "Grandpa",     pl: "Dziadek", phonetic: "grenpa",     icon: "👴", age: [4, 6] },
      { en: "Sister",      pl: "Siostra", phonetic: "sister",     icon: "👧", age: [6] },
      { en: "Family",      pl: "Rodzina", phonetic: "femili",     icon: "👪", age: [6] }
    ]
  },
  {
    id: "body",
    title: "Ciało i Lekarz (Body)",
    icon: "🩺",
    color: "rose",
    items: [
      { en: "Head",     pl: "Głowa",   phonetic: "hed",      icon: "🗣️", age: [4, 6] },
      { en: "Eyes",     pl: "Oczy",    phonetic: "ajz",      icon: "👀", age: [4, 6] },
      { en: "Nose",     pl: "Nos",     phonetic: "nouz",     icon: "👃", age: [4, 6] },
      { en: "Mouth",    pl: "Usta",    phonetic: "mauf",     icon: "👄", age: [4, 6] },
      { en: "Ears",     pl: "Uszy",    phonetic: "irz",      icon: "👂", age: [4, 6] },
      { en: "Hand",     pl: "Ręka",    phonetic: "hend",     icon: "✋", age: [4, 6] },
      { en: "Leg",      pl: "Noga",    phonetic: "leg",      icon: "🦵", age: [4, 6] },
      { en: "Tummy",    pl: "Brzuszek",phonetic: "tami",     icon: "🤰", age: [6] },
      { en: "Teeth",    pl: "Zęby",    phonetic: "tif",      icon: "🦷", age: [6] },
      { en: "Heart",    pl: "Serce",   phonetic: "hart",     icon: "❤️", age: [6] }
    ]
  },
  {
    id: "food",
    title: "Jedzenie (Food)",
    icon: "🍎",
    color: "orange",
    items: [
      { en: "Apple",      pl: "Jabłko",    phonetic: "epl",       icon: "🍎", age: [4, 6] },
      { en: "Banana",     pl: "Banan",     phonetic: "banana",    icon: "🍌", age: [4, 6] },
      { en: "Water",      pl: "Woda",      phonetic: "łoter",     icon: "💧", age: [4, 6] },
      { en: "Milk",       pl: "Mleko",     phonetic: "milk",      icon: "🥛", age: [4, 6] },
      { en: "Bread",      pl: "Chleb",     phonetic: "bred",      icon: "🍞", age: [4, 6] },
      { en: "Cheese",     pl: "Ser",       phonetic: "cziz",      icon: "🧀", age: [4, 6] },
      { en: "Strawberry", pl: "Truskawka", phonetic: "stroberi",  icon: "🍓", age: [6] },
      { en: "Carrot",     pl: "Marchewka", phonetic: "kerot",     icon: "🥕", age: [6] },
      { en: "Ice cream",  pl: "Lody",      phonetic: "ajs krim",  icon: "🍦", age: [6] },
      { en: "Pizza",      pl: "Pizza",     phonetic: "pica",      icon: "🍕", age: [6] }
    ]
  },
  {
    id: "clothes",
    title: "Ubrania i Pogoda",
    icon: "👕",
    color: "indigo",
    items: [
      { en: "T-shirt", pl: "Koszulka", phonetic: "ti szert", icon: "👕", age: [4, 6] },
      { en: "Shoes",   pl: "Buty",     phonetic: "szuz",     icon: "👟", age: [4, 6] },
      { en: "Hat",     pl: "Czapka",   phonetic: "het",      icon: "🧢", age: [4, 6] },
      { en: "Jacket",  pl: "Kurtka",   phonetic: "dżaket",   icon: "🧥", age: [4, 6] },
      { en: "Sun",     pl: "Słońce",   phonetic: "san",      icon: "☀️", age: [4, 6] },
      { en: "Rain",    pl: "Deszcz",   phonetic: "rejn",     icon: "🌧️", age: [4, 6] },
      { en: "Trousers",pl: "Spodnie",  phonetic: "trauzerz", icon: "👖", age: [6] },
      { en: "Socks",   pl: "Skarpetki",phonetic: "soks",     icon: "🧦", age: [6] },
      { en: "Snow",    pl: "Śnieg",    phonetic: "snou",     icon: "❄️", age: [6] }
    ]
  },
  {
    id: "prepositions",
    title: "Gdzie jest? (In, On, Under)",
    icon: "📦",
    color: "teal",
    items: [
      { en: "In",    pl: "W środku", phonetic: "in",    icon: "📥", age: [4, 6] },
      { en: "On",    pl: "Na górze",  phonetic: "on",    icon: "🔛", age: [4, 6] },
      { en: "Under", pl: "Pod spodem",phonetic: "ander", icon: "⬇️", age: [4, 6] },
      { en: "Box",   pl: "Pudełko",  phonetic: "boks",  icon: "📦", age: [4, 6] },
      { en: "Bed",   pl: "Łóżko",    phonetic: "bed",   icon: "🛏️", age: [4, 6] },
      { en: "Chair", pl: "Krzesło",  phonetic: "czer",  icon: "🪑", age: [6] },
      { en: "Table", pl: "Stół",     phonetic: "tejbl", icon: "🪵", age: [6] }
    ]
  },
  {
    id: "actions",
    title: "Ruch i Zabawa (Actions)",
    icon: "🏃",
    color: "purple",
    items: [
      { en: "Jump",  pl: "Skakać",  phonetic: "dżamp", icon: "🦘", age: [4, 6] },
      { en: "Run",   pl: "Biegać",  phonetic: "ran",   icon: "🏃", age: [4, 6] },
      { en: "Clap",  pl: "Klaskać", phonetic: "klep",  icon: "👏", age: [4, 6] },
      { en: "Sleep", pl: "Spać",    phonetic: "slip",  icon: "😴", age: [4, 6] },
      { en: "Dance", pl: "Tańczyć", phonetic: "dens",  icon: "💃", age: [6] },
      { en: "Swim",  pl: "Pływać",  phonetic: "słim",  icon: "🏊", age: [6] },
      { en: "Sing",  pl: "Śpiewać", phonetic: "sing",  icon: "🎤", age: [6] }
    ]
  },
  {
    id: "pancakes_cooking",
    title: "Gotowanie: Pankejki 🥞",
    icon: "🥞",
    color: "amber",
    isTestLesson: true,
    items: [
      { en: "Pancakes", pl: "Pankejksy", phonetic: "penkejks", icon: "🥞",                               age: [4, 6] },
      { en: "Flour",    pl: "Mąka",      phonetic: "flałer",   icon: getCustomPancakeSvg("flour", 64),   age: [4, 6] },
      { en: "Egg",      pl: "Jajko",     phonetic: "eg",       icon: "🥚",                               age: [4, 6] },
      { en: "Yoghurt",  pl: "Jogurt",    phonetic: "jogert",   icon: getCustomPancakeSvg("yoghurt", 64), age: [4, 6] },
      { en: "Honey",    pl: "Miód",      phonetic: "hani",     icon: "🍯",                               age: [4, 6] },
      { en: "Oil",      pl: "Olej",      phonetic: "ojl",      icon: getCustomPancakeSvg("oil", 64),     age: [4, 6] },
      { en: "Mix",      pl: "Mieszać",   phonetic: "miks",     icon: "🥣",                               age: [4, 6] },
      { en: "Add",      pl: "Dodać",     phonetic: "ad",       icon: "➕",                               age: [4, 6] }
    ]
  }
];

// 3. PULA PROSTYCH SŁÓWEK DO FUNKCJI "DODAJ AUTOMATYCZNIE" W PANELU RODZICA
const AUTO_SIMPLE_WORDS_POOL = [
  { lessonId: "animals", en: "Duck",   pl: "Kaczka",   phonetic: "dak",    icon: "🦆", age: [4, 6] },
  { lessonId: "animals", en: "Pig",    pl: "Świnka",   phonetic: "pig",    icon: "🐷", age: [4, 6] },
  { lessonId: "animals", en: "Cow",    pl: "Krowa",    phonetic: "kau",    icon: "🐮", age: [4, 6] },
  { lessonId: "animals", en: "Horse",  pl: "Koń",      phonetic: "hors",   icon: "🐴", age: [4, 6] },
  { lessonId: "animals", en: "Fish",   pl: "Ryba",     phonetic: "fisz",   icon: "🐟", age: [4, 6] },
  { lessonId: "food",    en: "Pear",   pl: "Gruszka",  phonetic: "per",    icon: "🍐", age: [4, 6] },
  { lessonId: "food",    en: "Cookie", pl: "Ciastko",  phonetic: "kuki",   icon: "🍪", age: [4, 6] },
  { lessonId: "food",    en: "Juice",  pl: "Sok",      phonetic: "dżus",   icon: "🧃", age: [4, 6] },
  { lessonId: "clothes", en: "Star",   pl: "Gwiazda",  phonetic: "star",   icon: "⭐", age: [4, 6] },
  { lessonId: "clothes", en: "Moon",   pl: "Księżyc",  phonetic: "mun",    icon: "🌙", age: [4, 6] },
  { lessonId: "actions", en: "Smile",  pl: "Uśmiech",  phonetic: "smajl",  icon: "😊", age: [4, 6] },
  { lessonId: "actions", en: "Drink",  pl: "Pić",      phonetic: "drink",  icon: "🥤", age: [4, 6] }
];

// 4. INICJALIZACJA I ŁĄCZENIE LEKCJI Z DODATKOWYMI SŁÓWKAMI RODZICA
function initializeLessonsData() {
  state.lessons = JSON.parse(JSON.stringify(DEFAULT_LESSONS));

  // Przywróć grafiki SVG pankejków (JSON.stringify zachowuje stringi HTML, więc SVG są nienaruszone)
  if (Array.isArray(state.customWords)) {
    state.customWords.forEach(cw => {
      const targetLesson = state.lessons.find(l => l.id === cw.lessonId);
      if (targetLesson && !targetLesson.items.some(i => i.en.toLowerCase() === cw.en.toLowerCase())) {
        targetLesson.items.push({
          en: cw.en,
          pl: cw.pl,
          phonetic: cw.phonetic || cw.en.toLowerCase(),
          icon: cw.icon || "🌟",
          age: Array.isArray(cw.age) ? cw.age : [4, 6],
          isCustom: true
        });
      }
    });
  }
}

// 5. POBIERANIE SŁÓWEK DLA DANEGO GRACZA (Z UWZGLĘDNIENIEM WYRÓWNANIA POZIOMU IGORA DO HUBERTA)
function getItemsForPlayerAndLesson(lessonId, forceAge = null) {
  const lesson = state.lessons.find(l => l.id === lessonId);
  if (!lesson) return [];

  // Sprawdź czy Tata zrównał tę lekcję Igorkowi z Hubertem
  const isLeveledUpForIgor = state.lessonOverrides && state.lessonOverrides[lessonId] === "equal_to_hubert";

  let targetAge = forceAge;
  if (targetAge === null) {
    if (isLeveledUpForIgor) {
      targetAge = 6; // Igor ma pełny zestaw słówek Huberta dla tej lekcji
    } else {
      targetAge = isEffectiveIgorMode() ? 4 : 6;
    }
  }

  const filtered = lesson.items.filter(item => !item.age || item.age.includes(targetAge));
  return filtered.length > 0 ? filtered : lesson.items;
}

// 6. AUTOMATYCZNA PULA WSZYSTKICH AKTYWNYCH SŁÓWEK DO POJEDYNKU BRACI I WALKI ZE SMOKIEM
function getAllActiveVocabularyPool(forAge = null) {
  const pool = [];
  state.lessons.forEach(lesson => {
    // Pomijamy niezatwierdzone lekcje testowe, ale wszystkie zatwierdzone (w tym Pankejki!) wchodzą automatycznie
    if (lesson.isTestLesson && !isTestLessonApproved(lesson.id)) return;

    const items = getItemsForPlayerAndLesson(lesson.id, forAge);
    items.forEach(item => {
      pool.push({
        ...item,
        lessonId: lesson.id,
        lessonTitle: lesson.title
      });
    });
  });
  return pool;
}

// Proste narzędzia tablicowe
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
