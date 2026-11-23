/* ============================================================================
   PLIK: js/02-database.js
   BAZA LEKCJI (1–20 + MEMORY + STUDIO WYMOWY), ZAGADEK SÓWKI I SŁÓWEK RODZICA
   ============================================================================ */

function getDayCalendarSvg(dayNum, shortPl, headerBg, borderCol) {
  return `<svg width="64" height="64" viewBox="0 0 64 64" class="inline-block drop-shadow-sm" aria-label="${shortPl}">
    <rect x="8" y="10" width="48" height="46" rx="8" fill="#ffffff" stroke="${borderCol}" stroke-width="3"/>
    <path d="M8 18 C8 13.5 11.5 10 16 10 L48 10 C52.5 10 56 13.5 56 18 L56 24 L8 24 Z" fill="${headerBg}"/>
    <rect x="19" y="5" width="5" height="9" rx="2.5" fill="#475569"/>
    <rect x="40" y="5" width="5" height="9" rx="2.5" fill="#475569"/>
    <text x="32" y="19.5" font-family="sans-serif" font-size="8.5" font-weight="900" fill="#ffffff" text-anchor="middle">${shortPl}</text>
    <text x="32" y="46" font-family="sans-serif" font-size="23" font-weight="900" fill="#0f172a" text-anchor="middle">${dayNum}</text>
  </svg>`;
}

const FULL_LESSONS_DATABASE = [
  {
    id: "prepositions",
    title: "1. Przyimki (In, On, Under)",
    subtitle: "Gdzie schował się zwierzak? W, na czy pod?",
    icon: "📦🐱",
    color: "from-sky-400 to-blue-600",
    borderColor: "border-sky-400",
    type: "prepositions",
    items: [
      { prep: "In",    animal: "🐱", container: "box",    en: "In the box",      pl: "W pudełku",    fullEn: "The cat is in the box",       plDesc: "Kot jest w pudełku",      icon: "📦🐱", age: [4, 6] },
      { prep: "On",    animal: "🐱", container: "box",    en: "On the box",      pl: "Na pudełku",   fullEn: "The cat is on the box",       plDesc: "Kot jest na pudełku",     icon: "🐱📦", age: [4, 6] },
      { prep: "Under", animal: "🐱", container: "box",    en: "Under the box",   pl: "Pod pudełkiem",fullEn: "The cat is under the box",    plDesc: "Kot jest pod pudełkiem",  icon: "📦⬇️🐱", age: [4, 6] },
      { prep: "In",    animal: "🐶", container: "bag",    en: "In the bag",      pl: "W plecaku",    fullEn: "The dog is in the bag",       plDesc: "Pies jest w plecaku",     icon: "🎒🐶", age: [4, 6] },
      { prep: "On",    animal: "🐸", container: "table",  en: "On the table",    pl: "Na stole",     fullEn: "The frog is on the table",    plDesc: "Żaba jest na stole",      icon: "🐸🪑", age: [4, 6] },
      { prep: "Under", animal: "🐰", container: "chair",  en: "Under the chair", pl: "Pod krzesłem", fullEn: "The rabbit is under the chair",plDesc: "Królik jest pod krzesłem",icon: "🪑⬇️🐰", age: [4, 6] },
      { prep: "In",    animal: "🐻", container: "basket", en: "In the basket",   pl: "W koszyku",    fullEn: "The bear is in the basket",   plDesc: "Miś jest w koszyku",      icon: "🧺🐻", age: [6] },
      { prep: "On",    animal: "🦊", container: "bed",    en: "On the bed",      pl: "Na łóżku",     fullEn: "The fox is on the bed",       plDesc: "Lis jest na łóżku",       icon: "🦊🛏️", age: [6] },
      { prep: "Under", animal: "🐶", container: "tree",   en: "Under the tree",  pl: "Pod drzewem",  fullEn: "The dog is under the tree",   plDesc: "Pies jest pod drzewem",   icon: "🌳⬇️🐶", age: [6] }
    ]
  },
  {
    id: "colors",
    title: "2. Kolory i Tęcza",
    subtitle: "Kolory oraz kolorowe owoce i zwierzęta",
    icon: "🎨🌈",
    color: "from-pink-400 to-rose-600",
    borderColor: "border-pink-400",
    type: "vocab",
    items: [
      { en: "Red",    pl: "Czerwony",     phonetic: "red",    icon: "🔴", age: [4, 6] },
      { en: "Blue",   pl: "Niebieski",    phonetic: "blu",    icon: "🔵", age: [4, 6] },
      { en: "Green",  pl: "Zielony",      phonetic: "grin",   icon: "🟢", age: [4, 6] },
      { en: "Yellow", pl: "Żółty",        phonetic: "jeloł",  icon: "🟡", age: [4, 6] },
      { en: "Orange", pl: "Pomarańczowy", phonetic: "oryndż", icon: "🟠", age: [4, 6] },
      { en: "Purple", pl: "Fioletowy",    phonetic: "perpl",  icon: "🟣", age: [4, 6] },
      { en: "Pink",   pl: "Różowy",       phonetic: "pink",   icon: "🌸", age: [4, 6] },
      { en: "Brown",  pl: "Brązowy",      phonetic: "brałn",  icon: "🟤", age: [6] },
      { en: "Black",  pl: "Czarny",       phonetic: "blak",   icon: "⚫", age: [6] },
      { en: "White",  pl: "Biały",        phonetic: "łajt",   icon: "⚪", age: [6] }
    ]
  },
  {
    id: "numbers",
    title: "3. Liczby i Liczenie",
    subtitle: "Od 1 do 20 dla Igora oraz aż do 100 dla Huberta",
    icon: "🔢🚀",
    color: "from-amber-400 to-orange-600",
    borderColor: "border-amber-400",
    type: "vocab",
    items: [
      { en: "One",         pl: "Jeden",           phonetic: "łan",         icon: "1️⃣",   age: [4, 6] },
      { en: "Two",         pl: "Dwa",             phonetic: "tu",          icon: "2️⃣",   age: [4, 6] },
      { en: "Three",       pl: "Trzy",            phonetic: "fri",         icon: "3️⃣",   age: [4, 6] },
      { en: "Four",        pl: "Cztery",          phonetic: "for",         icon: "4️⃣",   age: [4, 6] },
      { en: "Five",        pl: "Pięć",            phonetic: "fajw",        icon: "5️⃣",   age: [4, 6] },
      { en: "Six",         pl: "Sześć",           phonetic: "siks",        icon: "6️⃣",   age: [4, 6] },
      { en: "Seven",       pl: "Siedem",          phonetic: "sewen",       icon: "7️⃣",   age: [4, 6] },
      { en: "Eight",       pl: "Osiem",           phonetic: "ejt",         icon: "8️⃣",   age: [4, 6] },
      { en: "Nine",        pl: "Dziewięć",        phonetic: "najn",        icon: "9️⃣",   age: [4, 6] },
      { en: "Ten",         pl: "Dziesięć",        phonetic: "ten",         icon: "🔟",   age: [4, 6] },
      { en: "Eleven",      pl: "Jedenaście",      phonetic: "ilewen",      icon: "1️⃣1️⃣", age: [4, 6] },
      { en: "Twelve",      pl: "Dwanaście",       phonetic: "tłelw",       icon: "1️⃣2️⃣", age: [4, 6] },
      { en: "Thirteen",    pl: "Trzynaście",      phonetic: "fertin",      icon: "1️⃣3️⃣", age: [4, 6] },
      { en: "Fourteen",    pl: "Czternaście",     phonetic: "fortin",      icon: "1️⃣4️⃣", age: [4, 6] },
      { en: "Fifteen",     pl: "Piętnaście",      phonetic: "fiftin",      icon: "1️⃣5️⃣", age: [4, 6] },
      { en: "Sixteen",     pl: "Szesnaście",      phonetic: "sikstin",     icon: "1️⃣6️⃣", age: [4, 6] },
      { en: "Seventeen",   pl: "Siedemnaście",    phonetic: "sewentin",    icon: "1️⃣7️⃣", age: [4, 6] },
      { en: "Eighteen",    pl: "Osiemnaście",     phonetic: "ejtin",       icon: "1️⃣8️⃣", age: [4, 6] },
      { en: "Nineteen",    pl: "Dziewiętnaście", phonetic: "najntin",     icon: "1️⃣9️⃣", age: [4, 6] },
      { en: "Twenty",      pl: "Dwadzieścia",     phonetic: "tłenti",      icon: "2️⃣0️⃣", age: [4, 6] },
      { en: "Thirty",      pl: "Trzydzieści",     phonetic: "ferti",       icon: "3️⃣0️⃣", age: [6] },
      { en: "Forty",       pl: "Czterdzieści",    phonetic: "forti",       icon: "4️⃣0️⃣", age: [6] },
      { en: "Fifty",       pl: "Pięćdziesiąt",    phonetic: "fifti",       icon: "5️⃣0️⃣", age: [6] },
      { en: "Sixty",       pl: "Sześćdziesiąt",   phonetic: "siksti",      icon: "6️⃣0️⃣", age: [6] },
      { en: "Seventy",     pl: "Siedemdziesiąt",  phonetic: "sewenti",     icon: "7️⃣0️⃣", age: [6] },
      { en: "Eighty",      pl: "Osiemdziesiąt",   phonetic: "ejti",        icon: "8️⃣0️⃣", age: [6] },
      { en: "Ninety",      pl: "Dziewięćdziesiąt",phonetic: "najnti",     icon: "9️⃣0️⃣", age: [6] },
      { en: "One hundred", pl: "Sto",             phonetic: "łan handred", icon: "💯",   age: [6] }
    ]
  },
  {
    id: "jungle_animals",
    title: "4. Zwierzęta i Dżungla",
    subtitle: "Dzikie zwierzęta oraz Zagadki Detektywa Sówki",
    icon: "🦁🐒",
    color: "from-emerald-400 to-green-600",
    borderColor: "border-emerald-400",
    type: "vocab",
    items: [
      { en: "Lion",      pl: "Lew",        phonetic: "lajon",     icon: "🦁", age: [4, 6] },
      { en: "Tiger",     pl: "Tygrys",     phonetic: "tajger",    icon: "🐯", age: [4, 6] },
      { en: "Elephant",  pl: "Słoń",       phonetic: "elefant",   icon: "🐘", age: [4, 6] },
      { en: "Monkey",    pl: "Małpka",     phonetic: "manki",     icon: "🐒", age: [4, 6] },
      { en: "Giraffe",   pl: "Żyrafa",     phonetic: "dżiraf",    icon: "🦒", age: [4, 6] },
      { en: "Zebra",     pl: "Zebra",      phonetic: "zibra",     icon: "🦓", age: [4, 6] },
      { en: "Frog",      pl: "Żabka",      phonetic: "frog",      icon: "🐸", age: [4, 6] },
      { en: "Bear",      pl: "Niedźwiedź", phonetic: "ber",       icon: "🐻", age: [4, 6] },
      { en: "Crocodile", pl: "Krokodyl",   phonetic: "krokodajl", icon: "🐊", age: [6] },
      { en: "Snake",     pl: "Wąż",        phonetic: "snejk",     icon: "🐍", age: [6] },
      { en: "Parrot",    pl: "Papuga",     phonetic: "parot",     icon: "🦜", age: [6] },
      { en: "Hippo",     pl: "Hipopotam",  phonetic: "hipo",      icon: "🦛", age: [6] }
    ]
  },
  {
    id: "fruits_veggies",
    title: "5. Owoce i Warzywa",
    subtitle: "Zdrowe pyszności z ogrodu i sadu",
    icon: "🍓🥕",
    color: "from-lime-400 to-emerald-600",
    borderColor: "border-lime-400",
    type: "vocab",
    items: [
      { en: "Apple",      pl: "Jabłko",    phonetic: "apl",        icon: "🍎", age: [4, 6] },
      { en: "Banana",     pl: "Banan",     phonetic: "banana",     icon: "🍌", age: [4, 6] },
      { en: "Strawberry", pl: "Truskawka", phonetic: "stroberi",   icon: "🍓", age: [4, 6] },
      { en: "Pear",       pl: "Gruszka",   phonetic: "per",        icon: "🍐", age: [4, 6] },
      { en: "Watermelon", pl: "Arbuz",     phonetic: "łotermelon", icon: "🍉", age: [4, 6] },
      { en: "Grapes",     pl: "Winogrona", phonetic: "grejps",     icon: "🍇", age: [4, 6] },
      { en: "Carrot",     pl: "Marchewka", phonetic: "karot",      icon: "🥕", age: [4, 6] },
      { en: "Tomato",     pl: "Pomidor",   phonetic: "tomatoł",    icon: "🍅", age: [4, 6] },
      { en: "Cucumber",   pl: "Ogórek",    phonetic: "kjukamber",  icon: "🥒", age: [6] },
      { en: "Broccoli",   pl: "Brokuł",    phonetic: "brokoli",    icon: "🥦", age: [6] },
      { en: "Potato",     pl: "Ziemniak",  phonetic: "potejtoł",   icon: "🥔", age: [6] },
      { en: "Blueberry",  pl: "Jagoda",    phonetic: "bluberi",    icon: "🫐", age: [6] }
    ]
  },
  {
    id: "body_hurts",
    title: "6. Części Ciała i Mały Lekarz",
    subtitle: "Poznaj części ciała i przyklej plasterek pacjentowi",
    icon: "🩺🩹",
    color: "from-rose-400 to-red-600",
    borderColor: "border-rose-400",
    type: "vocab",
    items: [
      { en: "Head",  pl: "Głowa",  phonetic: "hed",   icon: "👦", hurtPhrase: "Ouch! My head hurts!",  age: [4, 6] },
      { en: "Eyes",  pl: "Oczy",   phonetic: "ajs",   icon: "👀", hurtPhrase: "Ouch! My eyes hurt!",   age: [4, 6] },
      { en: "Ears",  pl: "Uszy",   phonetic: "irs",   icon: "👂", hurtPhrase: "Ouch! My ears hurt!",   age: [4, 6] },
      { en: "Nose",  pl: "Nos",    phonetic: "nołz",  icon: "👃", hurtPhrase: "Ouch! My nose hurts!",  age: [4, 6] },
      { en: "Mouth", pl: "Usta",   phonetic: "małf",  icon: "👄", hurtPhrase: "Ouch! My mouth hurts!", age: [4, 6] },
      { en: "Arm",   pl: "Ręka",   phonetic: "arm",   icon: "💪", hurtPhrase: "Ouch! My arm hurts!",   age: [4, 6] },
      { en: "Leg",   pl: "Noga",   phonetic: "leg",   icon: "🦵", hurtPhrase: "Ouch! My leg hurts!",   age: [4, 6] },
      { en: "Foot",  pl: "Stopa",  phonetic: "fut",   icon: "🦶", hurtPhrase: "Ouch! My foot hurts!",  age: [4, 6] },
      { en: "Neck",  pl: "Szyja",  phonetic: "nek",   icon: "🧣", hurtPhrase: "Ouch! My neck hurts!",  age: [6] },
      { en: "Tummy", pl: "Brzuch", phonetic: "tami",  icon: "👕", hurtPhrase: "Ouch! My tummy hurts!", age: [6] },
      { en: "Hand",  pl: "Dłoń",   phonetic: "hand",  icon: "✋", hurtPhrase: "Ouch! My hand hurts!",  age: [6] },
      { en: "Knee",  pl: "Kolano", phonetic: "ni",    icon: "🩹", hurtPhrase: "Ouch! My knee hurts!",  age: [6] }
    ]
  },
  {
    id: "bakery_shop",
    title: "7. Sklep i Piekarnia",
    subtitle: "Zakupy do koszyka i uprzejme zwroty w sklepie",
    icon: "🛒🥐",
    color: "from-amber-500 to-yellow-600",
    borderColor: "border-amber-500",
    type: "vocab_and_shop",
    items: [
      { en: "Bread",          pl: "Chleb",               phonetic: "bred",         icon: "🍞", isProduct: true, age: [4, 6] },
      { en: "Crescent rolls", pl: "Rogaliki",            phonetic: "kresent rols", icon: "🥐", isProduct: true, age: [4, 6] },
      { en: "Cake",           pl: "Ciasto / Tort",       phonetic: "kejk",         icon: "🍰", isProduct: true, age: [4, 6] },
      { en: "Cookie",         pl: "Ciasteczko",          phonetic: "kuki",         icon: "🍪", isProduct: true, age: [4, 6] },
      { en: "Milk",           pl: "Mleko",               phonetic: "milk",         icon: "🥛", isProduct: true, age: [4, 6] },
      { en: "Cheese",         pl: "Ser",                 phonetic: "cziz",         icon: "🧀", isProduct: true, age: [4, 6] },
      { en: "Donut",          pl: "Pączek",              phonetic: "donat",        icon: "🍩", isProduct: true, age: [6] },
      { en: "Juice",          pl: "Sok",                 phonetic: "dżus",         icon: "🧃", isProduct: true, age: [6] },
      { en: "Hello",          pl: "Cześć / Dzień dobry", phonetic: "heloł",        icon: "👋", isPhrase: true,  age: [4, 6] },
      { en: "Please",         pl: "Proszę",              phonetic: "pliz",         icon: "🙏", isPhrase: true,  age: [4, 6] },
      { en: "Thank you",      pl: "Dziękuję",            phonetic: "fenk ju",      icon: "😊", isPhrase: true,  age: [4, 6] },
      { en: "Goodbye",        pl: "Do widzenia",         phonetic: "gudbaj",       icon: "🙋", isPhrase: true,  age: [4, 6] }
    ]
  },
  {
    id: "pancakes_cooking",
    title: "8. Kuchnia Pankejków",
    subtitle: "Kup składniki, wymieszaj ciasto i usmaż pankejksy!",
    icon: "🥞👨‍🍳",
    color: "from-orange-400 to-amber-600",
    borderColor: "border-orange-400",
    type: "vocab",
    items: [
      { en: "Flour",      pl: "Mąka",       phonetic: "flałer",   icon: "🌾", age: [4, 6] },
      { en: "Egg",        pl: "Jajko",      phonetic: "eg",       icon: "🥚", age: [4, 6] },
      { en: "Yoghurt",    pl: "Jogurt",     phonetic: "jogert",   icon: "🥛", age: [4, 6] },
      { en: "Honey",      pl: "Miód",       phonetic: "hani",     icon: "🍯", age: [4, 6] },
      { en: "Oil",        pl: "Olej",       phonetic: "ojl",      icon: "🫗", age: [4, 6] },
      { en: "Pancakes",   pl: "Pankejksy",  phonetic: "pankejks", icon: "🥞", age: [4, 6] },
      { en: "Strawberry", pl: "Truskawka",  phonetic: "stroberi", icon: "🍓", age: [4, 6] },
      { en: "Banana",     pl: "Banan",      phonetic: "banana",   icon: "🍌", age: [4, 6] }
    ]
  },
  {
    id: "days_of_week",
    title: "9. Dni tygodnia",
    subtitle: "Poznaj wszystkie dni od poniedziałku do niedzieli!",
    icon: "📅🗓️",
    color: "from-teal-400 to-emerald-600",
    borderColor: "border-teal-400",
    type: "vocab",
    testOnly: true,
    items: [
      { en: "Monday",    pl: "Poniedziałek", phonetic: "mandej",   icon: getDayCalendarSvg("1", "PON", "#ef4444", "#b91c1c"), age: [4, 6] },
      { en: "Tuesday",   pl: "Wtorek",       phonetic: "tjuzdej",  icon: getDayCalendarSvg("2", "WTO", "#f97316", "#c2410c"), age: [4, 6] },
      { en: "Wednesday", pl: "Środa",        phonetic: "łenzdej",  icon: getDayCalendarSvg("3", "ŚRO", "#eab308", "#a16207"), age: [4, 6] },
      { en: "Thursday",  pl: "Czwartek",     phonetic: "ferzdej",  icon: getDayCalendarSvg("4", "CZW", "#22c55e", "#15803d"), age: [4, 6] },
      { en: "Friday",    pl: "Piątek",       phonetic: "frajdej",  icon: getDayCalendarSvg("5", "PIĄ", "#06b6d4", "#0e7490"), age: [4, 6] },
      { en: "Saturday",  pl: "Sobota",       phonetic: "saterdej", icon: getDayCalendarSvg("6", "SOB", "#3b82f6", "#1d4ed8"), age: [4, 6] },
      { en: "Sunday",    pl: "Niedziela",    phonetic: "sandej",   icon: getDayCalendarSvg("7", "NIE", "#a855f7", "#7e22ce"), age: [4, 6] },
      { en: "Weekend",   pl: "Weekend",      phonetic: "łikend",   icon: "🎉🏖️", age: [6] },
      { en: "Today",     pl: "Dzisiaj",      phonetic: "tudej",    icon: "👇📅", age: [6] },
      { en: "Tomorrow",  pl: "Jutro",        phonetic: "tumoroł",  icon: "➡️🌅", age: [6] }
    ]
  },
  {
    id: "vehicles_world",
    title: "10. Pojazdy i Maszyny",
    subtitle: "Samochody, pociągi, rakiety i pojazdy ratunkowe",
    icon: "🚒🚀",
    color: "from-cyan-500 to-blue-700",
    borderColor: "border-cyan-400",
    type: "vocab",
    testOnly: true,
    items: [
      { en: "Car",        pl: "Samochód",      phonetic: "kar",        icon: "🚗", age: [4, 6] },
      { en: "Bus",        pl: "Autobus",       phonetic: "bas",        icon: "🚌", age: [4, 6] },
      { en: "Train",      pl: "Pociąg",        phonetic: "trejn",      icon: "🚂", age: [4, 6] },
      { en: "Airplane",   pl: "Samolot",       phonetic: "erplejn",    icon: "✈️", age: [4, 6] },
      { en: "Fire truck", pl: "Wóz strażacki", phonetic: "fajer trak", icon: "🚒", age: [4, 6] },
      { en: "Police car", pl: "Radiowóz",      phonetic: "polis kar",  icon: "🚓", age: [4, 6] },
      { en: "Tractor",    pl: "Traktor",       phonetic: "traktor",    icon: "🚜", age: [4, 6] },
      { en: "Bicycle",    pl: "Rower",         phonetic: "bajsykl",    icon: "🚲", age: [4, 6] },
      { en: "Rocket",     pl: "Rakieta",       phonetic: "roket",      icon: "🚀", age: [4, 6] },
      { en: "Helicopter", pl: "Helikopter",    phonetic: "helikopter", icon: "🚁", age: [6] },
      { en: "Ambulance",  pl: "Karetka",       phonetic: "ambjulans",  icon: "🚑", age: [6] },
      { en: "Boat",       pl: "Łódka",         phonetic: "bołt",       icon: "⛵", age: [6] }
    ]
  },
  {
    id: "family_home",
    title: "11. Rodzina i Dom",
    subtitle: "Bliscy oraz przedmioty w naszym domu",
    icon: "👨‍👩‍👦‍👦🏠",
    color: "from-violet-500 to-purple-700",
    borderColor: "border-violet-400",
    type: "vocab",
    testOnly: true,
    items: [
      { en: "Mother",  pl: "Mama",     phonetic: "mader",  icon: "👩", age: [4, 6] },
      { en: "Father",  pl: "Tata",     phonetic: "fader",  icon: "👨", age: [4, 6] },
      { en: "Brother", pl: "Brat",     phonetic: "brader", icon: "👦", age: [4, 6] },
      { en: "Sister",  pl: "Siostra",  phonetic: "sister", icon: "👧", age: [4, 6] },
      { en: "Baby",    pl: "Dzidziuś", phonetic: "bejbi",  icon: "👶", age: [4, 6] },
      { en: "House",   pl: "Dom",      phonetic: "hałs",   icon: "🏠", age: [4, 6] },
      { en: "Bed",     pl: "Łóżko",    phonetic: "bed",    icon: "🛏️", age: [4, 6] },
      { en: "Chair",   pl: "Krzesło",  phonetic: "czer",   icon: "🪑", age: [4, 6] },
      { en: "Grandma", pl: "Babcia",   phonetic: "granma", icon: "👵", age: [6] },
      { en: "Grandpa", pl: "Dziadek",  phonetic: "granpa", icon: "👴", age: [6] },
      { en: "Window",  pl: "Okno",     phonetic: "łindoł", icon: "🪟", age: [6] },
      { en: "Door",    pl: "Drzwi",    phonetic: "dor",    icon: "🚪", age: [6] }
    ]
  },
  {
    id: "health_illnesses",
    title: "12. Choroby i Zdrowie",
    subtitle: "Przeziębienie, gorączka, lekarz i wracanie do zdrowia",
    icon: "🤒🩺",
    color: "from-rose-500 to-pink-700",
    borderColor: "border-rose-400",
    type: "vocab",
    testOnly: true,
    items: [
      { en: "Fever",        pl: "Gorączka",      phonetic: "fiwer",      icon: "🤒", age: [4, 6] },
      { en: "Cough",        pl: "Kaszel",        phonetic: "kof",        icon: "😷", age: [4, 6] },
      { en: "Cold",         pl: "Przeziębienie", phonetic: "kold",       icon: "🤧", age: [4, 6] },
      { en: "Doctor",       pl: "Lekarz",        phonetic: "doktor",     icon: "🩺", age: [4, 6] },
      { en: "Bandage",      pl: "Plasterek",     phonetic: "bandydż",    icon: "🩹", age: [4, 6] },
      { en: "Medicine",     pl: "Lekarstwo",     phonetic: "medisyn",    icon: "💊", age: [4, 6] },
      { en: "Hospital",     pl: "Szpital",       phonetic: "hospital",   icon: "🏥", age: [4, 6] },
      { en: "Thermometer",  pl: "Termometr",     phonetic: "fermometer", icon: "🌡️", age: [6] },
      { en: "Headache",     pl: "Ból głowy",     phonetic: "hedejk",     icon: "🤕", age: [6] },
      { en: "Stomach ache", pl: "Ból brzucha",   phonetic: "stamak ejk", icon: "🤢", age: [6] },
      { en: "Healthy",      pl: "Zdrowy",        phonetic: "helfi",      icon: "💪", age: [6] }
    ]
  },
  {
    id: "clothes_wardrobe",
    title: "13. Ubrania i Garderoba",
    subtitle: "Koszulki, spodnie, buty, czapki i zimowe dodatki",
    icon: "👕👟",
    color: "from-sky-500 to-indigo-700",
    borderColor: "border-sky-400",
    type: "vocab",
    testOnly: true,
    items: [
      { en: "T-shirt",  pl: "Koszulka",         phonetic: "ti-szert", icon: "👕", age: [4, 6] },
      { en: "Trousers", pl: "Spodnie",          phonetic: "trałzers", icon: "👖", age: [4, 6] },
      { en: "Shoes",    pl: "Buty",             phonetic: "szuz",     icon: "👟", age: [4, 6] },
      { en: "Cap",      pl: "Czapka",           phonetic: "kap",      icon: "🧢", age: [4, 6] },
      { en: "Jacket",   pl: "Kurtka",           phonetic: "dżaket",   icon: "🧥", age: [4, 6] },
      { en: "Socks",    pl: "Skarpetki",        phonetic: "soks",     icon: "🧦", age: [4, 6] },
      { en: "Dress",    pl: "Sukienka",         phonetic: "dres",     icon: "👗", age: [4, 6] },
      { en: "Shorts",   pl: "Krótkie spodenki", phonetic: "szorts",   icon: "🩳", age: [4, 6] },
      { en: "Gloves",   pl: "Rękawiczki",       phonetic: "glaws",    icon: "🧤", age: [6] },
      { en: "Scarf",    pl: "Szalik",           phonetic: "skarf",    icon: "🧣", age: [6] },
      { en: "Glasses",  pl: "Okulary",          phonetic: "glases",   icon: "👓", age: [4, 6] },
      { en: "Crown",    pl: "Korona",           phonetic: "krałn",    icon: "👑", age: [4, 6] }
    ]
  },
  {
    id: "weather_seasons",
    title: "14. Pogoda i Pory Roku",
    subtitle: "Słońce, deszcz, śnieg, tęcza i zjawiska na niebie",
    icon: "☀️🌈",
    color: "from-amber-400 to-sky-600",
    borderColor: "border-amber-400",
    type: "vocab",
    testOnly: true,
    items: [
      { en: "Sun",       pl: "Słońce",      phonetic: "san",      icon: "☀️",  age: [4, 6] },
      { en: "Rain",      pl: "Deszcz",      phonetic: "rejn",     icon: "🌧️", age: [4, 6] },
      { en: "Snow",      pl: "Śnieg",       phonetic: "snoł",     icon: "❄️",  age: [4, 6] },
      { en: "Cloud",     pl: "Chmura",      phonetic: "klałd",    icon: "☁️",  age: [4, 6] },
      { en: "Rainbow",   pl: "Tęcza",       phonetic: "rejnboł",  icon: "🌈",  age: [4, 6] },
      { en: "Wind",      pl: "Wiatr",       phonetic: "łind",     icon: "💨",  age: [4, 6] },
      { en: "Snowman",   pl: "Bałwanek",    phonetic: "snołmen",  icon: "⛄",  age: [4, 6] },
      { en: "Star",      pl: "Gwiazda",     phonetic: "star",     icon: "⭐",  age: [4, 6] },
      { en: "Moon",      pl: "Księżyc",     phonetic: "mun",      icon: "🌙",  age: [4, 6] },
      { en: "Storm",     pl: "Burza",       phonetic: "storm",    icon: "⛈️", age: [6] },
      { en: "Umbrella",  pl: "Parasol",     phonetic: "ambrela",  icon: "☂️",  age: [6] },
      { en: "Lightning", pl: "Błyskawica",  phonetic: "lajtning", icon: "⚡",  age: [6] }
    ]
  },
  {
    id: "jobs_heroes",
    title: "15. Zawody i Bohaterowie",
    subtitle: "Strażak, policjant, lekarz, astronauta i inne zawody",
    icon: "🧑‍🚒👨‍🚀",
    color: "from-emerald-500 to-teal-700",
    borderColor: "border-emerald-400",
    type: "vocab",
    testOnly: true,
    items: [
      { en: "Firefighter",    pl: "Strażak",      phonetic: "fajerfajter",  icon: "🧑‍🚒", age: [4, 6] },
      { en: "Police officer", pl: "Policjant",    phonetic: "polis ofiser", icon: "👮",   age: [4, 6] },
      { en: "Doctor",         pl: "Lekarz",       phonetic: "doktor",       icon: "🩺",   age: [4, 6] },
      { en: "Astronaut",      pl: "Astronauta",   phonetic: "astronot",     icon: "👨‍🚀", age: [4, 6] },
      { en: "Cook",           pl: "Kucharz",      phonetic: "kuk",          icon: "👨‍🍳", age: [4, 6] },
      { en: "Teacher",        pl: "Nauczyciel",   phonetic: "ticzer",       icon: "👩‍🏫", age: [4, 6] },
      { en: "Farmer",         pl: "Rolnik",       phonetic: "farmer",       icon: "🧑‍🌾", age: [4, 6] },
      { en: "Knight",         pl: "Rycerz",       phonetic: "najt",         icon: "🛡️",   age: [4, 6] },
      { en: "Builder",        pl: "Budowniczy",   phonetic: "bilder",       icon: "👷",   age: [6] },
      { en: "Pilot",          pl: "Pilot",        phonetic: "pajlot",       icon: "👨‍✈️", age: [6] },
      { en: "Artist",         pl: "Malarz",       phonetic: "artist",       icon: "🧑‍🎨", age: [6] },
      { en: "Singer",         pl: "Piosenkarz",   phonetic: "singer",       icon: "🧑‍🎤", age: [6] }
    ]
  },
  {
    id: "toys_sports",
    title: "16. Zabawki i Sport",
    subtitle: "Piłka, miś, klocki, latawiec i gry sportowe",
    icon: "⚽🧸",
    color: "from-fuchsia-500 to-pink-700",
    borderColor: "border-fuchsia-400",
    type: "vocab",
    testOnly: true,
    items: [
      { en: "Ball",       pl: "Piłka",        phonetic: "bol",        icon: "⚽",  age: [4, 6] },
      { en: "Teddy bear", pl: "Pluszowy miś", phonetic: "tedi ber",   icon: "🧸",  age: [4, 6] },
      { en: "Doll",       pl: "Lalka",        phonetic: "dol",        icon: "🪆",  age: [4, 6] },
      { en: "Blocks",     pl: "Klocki",       phonetic: "bloks",      icon: "🧱",  age: [4, 6] },
      { en: "Kite",       pl: "Latawiec",     phonetic: "kajt",       icon: "🪁",  age: [4, 6] },
      { en: "Puzzle",     pl: "Puzzle",       phonetic: "pazl",       icon: "🧩",  age: [4, 6] },
      { en: "Drum",       pl: "Bębenek",      phonetic: "dram",       icon: "🥁",  age: [4, 6] },
      { en: "Robot",      pl: "Robot",        phonetic: "robot",      icon: "🤖",  age: [4, 6] },
      { en: "Balloon",    pl: "Balon",        phonetic: "balun",      icon: "🎈",  age: [4, 6] },
      { en: "Basketball", pl: "Koszykówka",   phonetic: "basketbol",  icon: "🏀",  age: [6] },
      { en: "Tennis",     pl: "Tenis",        phonetic: "tenis",      icon: "🎾",  age: [6] },
      { en: "Skateboard", pl: "Deskorolka",   phonetic: "skejt-bord", icon: "🛹",  age: [6] }
    ]
  },
  {
    id: "space_planets",
    title: "17. Kosmos i Planety",
    subtitle: "Rakieta, planety, gwiazdy, księżyc i kosmici",
    icon: "🚀🪐",
    color: "from-indigo-600 to-purple-800",
    borderColor: "border-indigo-400",
    type: "vocab",
    testOnly: true,
    items: [
      { en: "Rocket",    pl: "Rakieta",          phonetic: "roket",    icon: "🚀",  age: [4, 6] },
      { en: "Planet",    pl: "Planeta",          phonetic: "planet",   icon: "🪐",  age: [4, 6] },
      { en: "Star",      pl: "Gwiazda",          phonetic: "star",     icon: "⭐",  age: [4, 6] },
      { en: "Moon",      pl: "Księżyc",          phonetic: "mun",      icon: "🌕",  age: [4, 6] },
      { en: "Sun",       pl: "Słońce",           phonetic: "san",      icon: "☀️",  age: [4, 6] },
      { en: "Alien",     pl: "Kosmita",          phonetic: "ejlien",   icon: "👽",  age: [4, 6] },
      { en: "Astronaut", pl: "Astronauta",       phonetic: "astronot", icon: "👨‍🚀", age: [4, 6] },
      { en: "Spaceship", pl: "Statek kosmiczny", phonetic: "spejsszip",icon: "🛸",  age: [6] },
      { en: "Earth",     pl: "Ziemia",           phonetic: "erf",      icon: "🌍",  age: [6] },
      { en: "Comet",     pl: "Kometa",           phonetic: "komet",    icon: "☄️",  age: [6] },
      { en: "Telescope", pl: "Teleskop",         phonetic: "teleskop", icon: "🔭",  age: [6] },
      { en: "Galaxy",    pl: "Galaktyka",        phonetic: "galaksi",  icon: "🌌",  age: [6] }
    ]
  },
  {
    id: "food_drinks",
    title: "18. Jedzenie i Napoje",
    subtitle: "Pizza, lody, tort, zupa, kanapki i napoje",
    icon: "🍕🍦",
    color: "from-orange-500 to-rose-600",
    borderColor: "border-orange-400",
    type: "vocab",
    testOnly: true,
    items: [
      { en: "Pizza",     pl: "Pizza",    phonetic: "pica",     icon: "🍕", age: [4, 6] },
      { en: "Ice cream", pl: "Lody",     phonetic: "ajs krim", icon: "🍦", age: [4, 6] },
      { en: "Cake",      pl: "Tort",     phonetic: "kejk",     icon: "🎂", age: [4, 6] },
      { en: "Water",     pl: "Woda",     phonetic: "łoter",    icon: "💧", age: [4, 6] },
      { en: "Juice",     pl: "Sok",      phonetic: "dżus",     icon: "🧃", age: [4, 6] },
      { en: "Soup",      pl: "Zupa",     phonetic: "sup",      icon: "🍲", age: [4, 6] },
      { en: "Sandwich",  pl: "Kanapka",  phonetic: "sandłicz", icon: "🥪", age: [4, 6] },
      { en: "Egg",       pl: "Jajko",    phonetic: "eg",       icon: "🥚", age: [4, 6] },
      { en: "Cheese",    pl: "Ser",      phonetic: "cziz",     icon: "🧀", age: [4, 6] },
      { en: "Cookie",    pl: "Ciastko",  phonetic: "kuki",     icon: "🍪", age: [4, 6] },
      { en: "Donut",     pl: "Pączek",   phonetic: "donat",    icon: "🍩", age: [4, 6] },
      { en: "Pasta",     pl: "Makaron",  phonetic: "pasta",    icon: "🍝", age: [6] }
    ]
  },
  {
    id: "school_supplies",
    title: "19. Szkoła i Przedszkole",
    subtitle: "Książka, ołówek, plecak, kredki i przybory",
    icon: "🎒✏️",
    color: "from-blue-500 to-cyan-700",
    borderColor: "border-blue-400",
    type: "vocab",
    testOnly: true,
    items: [
      { en: "Book",       pl: "Książka",  phonetic: "buk",        icon: "📘", age: [4, 6] },
      { en: "Pencil",     pl: "Ołówek",   phonetic: "pensyl",     icon: "✏️", age: [4, 6] },
      { en: "Backpack",   pl: "Plecak",   phonetic: "bakpak",     icon: "🎒", age: [4, 6] },
      { en: "Scissors",   pl: "Nożyczki", phonetic: "sizors",     icon: "✂️", age: [4, 6] },
      { en: "Crayon",     pl: "Kredka",   phonetic: "krejon",     icon: "🖍️", age: [4, 6] },
      { en: "Glue",       pl: "Klej",     phonetic: "glu",        icon: "🧴", age: [4, 6] },
      { en: "School",     pl: "Szkoła",   phonetic: "skul",       icon: "🏫", age: [4, 6] },
      { en: "Bell",       pl: "Dzwonek",  phonetic: "bel",        icon: "🔔", age: [4, 6] },
      { en: "Ruler",      pl: "Linijka",  phonetic: "ruler",      icon: "📏", age: [6] },
      { en: "Notebook",   pl: "Zeszyt",   phonetic: "nołtbuk",    icon: "📓", age: [6] },
      { en: "Paintbrush", pl: "Pędzel",   phonetic: "pejntbrasz", icon: "🖌️", age: [6] },
      { en: "Globe",      pl: "Globus",   phonetic: "glob",       icon: "🌐", age: [6] }
    ]
  },
  {
    id: "nature_forest",
    title: "20. Natura, Las i Morze",
    subtitle: "Drzewa, kwiaty, liście, grzyby, góry i morze",
    icon: "🌲🌻",
    color: "from-green-500 to-emerald-700",
    borderColor: "border-green-400",
    type: "vocab",
    testOnly: true,
    items: [
      { en: "Tree",     pl: "Drzewo",  phonetic: "tri",     icon: "🌳",  age: [4, 6] },
      { en: "Flower",   pl: "Kwiat",   phonetic: "flałer",  icon: "🌻",  age: [4, 6] },
      { en: "Leaf",     pl: "Liść",    phonetic: "lif",     icon: "🍃",  age: [4, 6] },
      { en: "Mushroom", pl: "Grzyb",   phonetic: "maszrum", icon: "🍄",  age: [4, 6] },
      { en: "Mountain", pl: "Góra",    phonetic: "małntin", icon: "⛰️",  age: [4, 6] },
      { en: "Sea",      pl: "Morze",   phonetic: "si",      icon: "🌊",  age: [4, 6] },
      { en: "Fire",     pl: "Ogień",   phonetic: "fajer",   icon: "🔥",  age: [4, 6] },
      { en: "Stone",    pl: "Kamień",  phonetic: "stołn",   icon: "🪨",  age: [4, 6] },
      { en: "Grass",    pl: "Trawa",   phonetic: "gras",    icon: "🌱",  age: [4, 6] },
      { en: "Forest",   pl: "Las",     phonetic: "forest",  icon: "🌲",  age: [6] },
      { en: "River",    pl: "Rzeka",   phonetic: "riwer",   icon: "🏞️", age: [6] },
      { en: "Island",   pl: "Wyspa",   phonetic: "ajland",  icon: "🏝️", age: [6] }
    ]
  },
  {
    id: "memory_game",
    title: "🧠 Gra Memory (Pary)",
    subtitle: "Odkrywaj karty i łącz obrazki ze słowami",
    icon: "🃏🧠",
    color: "from-fuchsia-500 to-purple-700",
    borderColor: "border-fuchsia-400",
    type: "memory_game",
    items: []
  },
  {
    id: "pronunciation_studio",
    title: "🎤 Studio Wymowy (Mikrofon)",
    subtitle: "Ćwicz głośne mówienie po angielsku!",
    icon: "🎙️🌟",
    color: "from-rose-500 to-pink-700",
    borderColor: "border-rose-400",
    type: "mic_only",
    items: [
      { en: "Hello",      pl: "Cześć",         phonetic: "heloł",     icon: "👋",   age: [4, 6] },
      { en: "Thank you",  pl: "Dziękuję",      phonetic: "fenk ju",   icon: "😊",   age: [4, 6] },
      { en: "Apple",      pl: "Jabłko",        phonetic: "apl",       icon: "🍎",   age: [4, 6] },
      { en: "Lion",       pl: "Lew",           phonetic: "lajon",     icon: "🦁",   age: [4, 6] },
      { en: "Red",        pl: "Czerwony",      phonetic: "red",       icon: "🔴",   age: [4, 6] },
      { en: "Blue",       pl: "Niebieski",     phonetic: "blu",       icon: "🔵",   age: [4, 6] },
      { en: "Twenty",     pl: "Dwadzieścia",   phonetic: "tłenti",    icon: "2️⃣0️⃣", age: [4, 6] },
      { en: "One hundred",pl: "Sto",           phonetic: "łan handred",icon: "💯",  age: [6] },
      { en: "Elephant",   pl: "Słoń",          phonetic: "elefant",   icon: "🐘",   age: [6] },
      { en: "Strawberry", pl: "Truskawka",     phonetic: "stroberi",  icon: "🍓",   age: [6] }
    ]
  }
];

const RIDDLES_POOL = [
  { en: "Lion",      pl: "Lew",        icon: "🦁", clueEn: "I am the king of the jungle. I am yellow and I roar!",        cluePl: "Jestem królem dżungli, mam grzywę i głośno ryczę!" },
  { en: "Elephant",  pl: "Słoń",       icon: "🐘", clueEn: "I am very big and grey. I have a long trunk and big ears!",   cluePl: "Jestem bardzo duży i szary, mam długą trąbę i wielkie uszy!" },
  { en: "Giraffe",   pl: "Żyrafa",     icon: "🦒", clueEn: "I am very tall and I have a super long neck!",                cluePl: "Jestem bardzo wysoka i mam super długą szyję!" },
  { en: "Monkey",    pl: "Małpka",     icon: "🐒", clueEn: "I love bananas and I can jump from tree to tree!",            cluePl: "Uwielbiam banany i skaczę z drzewa na drzewo!" },
  { en: "Frog",      pl: "Żabka",      icon: "🐸", clueEn: "I am small and green. I can jump high and I say ribbit!",     cluePl: "Jestem mała i zielona, wysoko skaczę i kumkam!" },
  { en: "Crocodile", pl: "Krokodyl",   icon: "🐊", clueEn: "I am green, I live in the river and I have many sharp teeth!", cluePl: "Jestem zielony, mieszkam w rzece i mam mnóstwo ostrych zębów!" },
  { en: "Zebra",     pl: "Zebra",      icon: "🦓", clueEn: "I look like a horse, and I have black and white stripes!",    cluePl: "Wyglądam jak konik w czarno-białe paski!" },
  { en: "Parrot",    pl: "Papuga",     icon: "🦜", clueEn: "I am a colorful bird. I can fly and repeat words!",           cluePl: "Jestem kolorowym ptakiem, latam i potrafię powtarzać słowa!" }
];

const AUTO_SIMPLE_WORDS_POOL = [
  { lessonId: "jungle_animals", en: "Penguin",    pl: "Pingwin",      phonetic: "pengłin",   icon: "🐧", age: [4, 6] },
  { lessonId: "jungle_animals", en: "Dolphin",    pl: "Delfin",       phonetic: "dolfin",    icon: "🐬", age: [4, 6] },
  { lessonId: "jungle_animals", en: "Turtle",     pl: "Żółw",         phonetic: "tertl",     icon: "🐢", age: [4, 6] },
  { lessonId: "fruits_veggies", en: "Cherry",     pl: "Wiśnia",       phonetic: "czeri",     icon: "🍒", age: [4, 6] },
  { lessonId: "fruits_veggies", en: "Pineapple",  pl: "Ananas",       phonetic: "pajnapl",   icon: "🍍", age: [4, 6] },
  { lessonId: "fruits_veggies", en: "Corn",       pl: "Kukurydza",    phonetic: "korn",      icon: "🌽", age: [4, 6] },
  { lessonId: "colors",         en: "Gold",       pl: "Złoty",        phonetic: "gold",      icon: "🌟", age: [4, 6] },
  { lessonId: "colors",         en: "Silver",     pl: "Srebrny",      phonetic: "silwer",    icon: "🥈", age: [4, 6] },
  { lessonId: "body_hurts",     en: "Tooth",      pl: "Ząb",          phonetic: "tuf",       icon: "🦷", age: [4, 6] },
  { lessonId: "days_of_week",   en: "Yesterday",  pl: "Wczoraj",      phonetic: "jesterdej", icon: "⬅️📅", age: [6] },
  { lessonId: "bakery_shop",    en: "Ice cream",  pl: "Lody",         phonetic: "ajs krim",  icon: "🍦", age: [4, 6] }
];
