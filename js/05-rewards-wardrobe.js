/* ============================================================================
   PLIK: js/05-rewards-wardrobe.js
   OSIĄGNIĘCIA, SKRZYNIE, GARDEROBA (131 UBRAŃ), SPIŻARNIA I ASYSTENT ZAKUPOWY
   ============================================================================ */

const OUTFITS_DB = {
  bronze: {
    head: [
      "cap_red.png", "cap_blue.png", "cap_green.png", "cap_yellow.png",
      "cap_orange.png", "cap_purple.png", "cap_black.png", "cap_white.png"
    ],
    torso: [
      "shirt_blue.png", "shirt_red.png", "shirt_green.png", "shirt_yellow.png",
      "shirt_orange.png", "shirt_purple.png", "shirt_white.png", "shirt_black.png",
      "shirt_stripes.png", "shirt_star.png", "shirt_smile.png", "shirt_car.png"
    ],
    legs: [
      "jeans_blue.png", "jeans_black.png", "jeans_grey.png",
      "shorts_blue.png", "shorts_red.png", "shorts_green.png", "shorts_yellow.png",
      "shorts_black.png", "shorts_orange.png", "shorts_camo.png"
    ]
  },
  silver: {
    head: [
      "cap_silver.png", "cap_police.png", "cap_captain.png", "cap_chef.png",
      "cap_pirate.png", "cap_cowboy.png", "cap_explorer.png", "cap_pilot.png",
      "cap_sailor.png", "cap_army.png", "cap_sport.png", "cap_winter.png",
      "helmet_firefighter.png", "helmet_electrician.png", "helmet_bike.png", "helmet_construction.png"
    ],
    torso: [
      "shirt_pigeon.png", "shirt_T-Rex.png", "shirt_police.png", "shirt_firefighter.png",
      "shirt_paramedic.png", "shirt_pirate.png", "shirt_pilot.png", "shirt_chef.png",
      "shirt_rocket.png", "shirt_shark.png", "shirt_tiger.png", "shirt_dragon.png",
      "shirt_dino.png", "shirt_lion.png", "shirt_wolf.png", "shirt_eagle.png",
      "shirt_robot.png", "shirt_space.png", "shirt_camo.png", "shirt_sport.png",
      "shirt_sailor.png", "shirt_explorer.png", "jacket_denim.png", "jacket_sport.png"
    ],
    legs: [
      "pants_grey.png", "pants_police.png", "pants_firefighter.png", "pants_paramedic.png",
      "pants_pirate.png", "pants_cargo.png", "pants_camo.png", "pants_sport.png",
      "pants_pilot.png", "pants_chef.png", "shorts_sport.png", "shorts_dino.png",
      "shorts_shark.png", "shorts_tiger.png", "shorts_rocket.png", "shorts_pirate.png"
    ]
  },
  gold: {
    head: [
      "helmet_astronaut.png", "helmet_knight.png", "helmet_robot.png", "helmet_ninja.png",
      "helmet_viking.png", "helmet_dino.png", "helmet_dragon.png", "helmet_hot-dog.png",
      "mask_superhero.png", "mask_iron.png", "mask_spider.png", "mask_bat.png",
      "cap_crown.png", "cap_wizard.png", "cap_king.png"
    ],
    torso: [
      "armor_gold.png", "armor_knight.png", "armor_dragon.png", "armor_robot.png",
      "armor_viking.png", "suit_astronaut.png", "suit_superhero.png", "suit_ninja.png",
      "suit_iron.png", "suit_spider.png", "suit_bat.png", "jacket_king.png",
      "jacket_wizard.png", "jacket_gold.png", "shirt_commando.png", "shirt_soldier.png",
      "shirt_barcelona.png", "shirt_poland.png"
    ],
    legs: [
      "pants_gold.png", "pants_knight.png", "pants_astronaut.png", "pants_robot.png",
      "pants_ninja.png", "pants_viking.png", "pants_superhero.png", "pants_iron.png",
      "pants_barcelona.png", "pants_poland.png", "shorts_gold.png", "shorts_king.png"
    ]
  }
};

const COMPANION_PETS = [
  { id: "p_dog", pl: "Piesek", en: "Dog", icon: "🐶" },
  { id: "p_cat", pl: "Kotek", en: "Cat", icon: "🐱" },
  { id: "p_rabbit", pl: "Królik", en: "Rabbit", icon: "🐰" },
  { id: "p_fox", pl: "Lisek", en: "Fox", icon: "🦊" },
  { id: "p_owl", pl: "Sówka", en: "Owl", icon: "🦉" },
  { id: "p_bear", pl: "Miś", en: "Bear", icon: "🐻" },
  { id: "p_panda", pl: "Panda", en: "Panda", icon: "🐼" },
  { id: "p_koala", pl: "Koala", en: "Koala", icon: "🐨" },
  { id: "p_tiger", pl: "Tygrysek", en: "Tiger", icon: "🐯" },
  { id: "p_lion", pl: "Lew", en: "Lion", icon: "🦁" },
  { id: "p_monkey", pl: "Małpka", en: "Monkey", icon: "🐵" },
  { id: "p_frog", pl: "Żabka", en: "Frog", icon: "🐸" },
  { id: "p_penguin", pl: "Pingwin", en: "Penguin", icon: "🐧" },
  { id: "p_chick", pl: "Kurczaczek", en: "Chick", icon: "🐥" },
  { id: "p_duck", pl: "Kaczuszka", en: "Duck", icon: "🦆" },
  { id: "p_eagle", pl: "Orzeł", en: "Eagle", icon: "🦅" },
  { id: "p_parrot", pl: "Papuga", en: "Parrot", icon: "🦜" },
  { id: "p_flamingo", pl: "Flaming", en: "Flamingo", icon: "🦩" },
  { id: "p_swan", pl: "Łabędź", en: "Swan", icon: "🦢" },
  { id: "p_peacock", pl: "Paw", en: "Peacock", icon: "🦚" },
  { id: "p_turtle", pl: "Żółwik", en: "Turtle", icon: "🐢" },
  { id: "p_snake", pl: "Wąż", en: "Snake", icon: "🐍" },
  { id: "p_croc", pl: "Krokodyl", en: "Crocodile", icon: "🐊" },
  { id: "p_dino", pl: "Dinozaur", en: "Dinosaur", icon: "🦕" },
  { id: "p_trex", pl: "Tyranozaur", en: "T-Rex", icon: "🦖" },
  { id: "p_dragon", pl: "Smoczek", en: "Dragon", icon: "🐲" },
  { id: "p_unicorn", pl: "Jednorożec", en: "Unicorn", icon: "🦄" },
  { id: "p_horse", pl: "Konik", en: "Horse", icon: "🐴" },
  { id: "p_zebra", pl: "Zebra", en: "Zebra", icon: "🦓" },
  { id: "p_giraffe", pl: "Żyrafa", en: "Giraffe", icon: "🦒" },
  { id: "p_elephant", pl: "Słonik", en: "Elephant", icon: "🐘" },
  { id: "p_hippo", pl: "Hipopotam", en: "Hippo", icon: "🦛" },
  { id: "p_rhino", pl: "Nosorożec", en: "Rhino", icon: "🦏" },
  { id: "p_pig", pl: "Świnka", en: "Pig", icon: "🐷" },
  { id: "p_cow", pl: "Krówka", en: "Cow", icon: "🐮" },
  { id: "p_sheep", pl: "Owieczka", en: "Sheep", icon: "🐑" },
  { id: "p_goat", pl: "Kózka", en: "Goat", icon: "🐐" },
  { id: "p_deer", pl: "Jelonek", en: "Deer", icon: "🦌" },
  { id: "p_hedgehog", pl: "Jeżyk", en: "Hedgehog", icon: "🦔" },
  { id: "p_squirrel", pl: "Wiewiórka", en: "Squirrel", icon: "🐿️" },
  { id: "p_hamster", pl: "Chomik", en: "Hamster", icon: "🐹" },
  { id: "p_mouse", pl: "Myszka", en: "Mouse", icon: "🐭" },
  { id: "p_bat", pl: "Nietoperz", en: "Bat", icon: "🦇" },
  { id: "p_dolphin", pl: "Delfin", en: "Dolphin", icon: "🐬" },
  { id: "p_whale", pl: "Wieloryb", en: "Whale", icon: "🐳" },
  { id: "p_shark", pl: "Rekin", en: "Shark", icon: "🦈" },
  { id: "p_octopus", pl: "Ośmiornica", en: "Octopus", icon: "🐙" },
  { id: "p_crab", pl: "Krab", en: "Crab", icon: "🦀" },
  { id: "p_bee", pl: "Pszczółka", en: "Bee", icon: "🐝" },
  { id: "p_butterfly", pl: "Motylek", en: "Butterfly", icon: "🦋" }
];

const PET_FOOD_POOL = [
  { id: "food_apple",      pl: "Jabłko",    en: "Apple",      icon: "🍎" },
  { id: "food_carrot",     pl: "Marchewka", en: "Carrot",     icon: "🥕" },
  { id: "food_banana",     pl: "Banan",     en: "Banana",     icon: "🍌" },
  { id: "food_strawberry", pl: "Truskawka", en: "Strawberry", icon: "🍓" },
  { id: "food_watermelon", pl: "Arbuz",     en: "Watermelon", icon: "🍉" },
  { id: "food_honey",      pl: "Miód",      en: "Honey",      icon: "🍯" }
];

const STICKER_CATEGORIES = [
  { id: "all",      name: "Wszystkie",       icon: "🎁" },
  { id: "animals",  name: "Zwierzęta",       icon: "🐾" },
  { id: "vehicles", name: "Pojazdy",         icon: "🚀" },
  { id: "food",     name: "Smakołyki",       icon: "🍓" },
  { id: "stars",    name: "Skarby i Sport",  icon: "👑" }
];

const STICKER_POOL = (() => {
  const groups = [
    { cat: "animals", icons: ["🦁","🐯","🐘","🦒","🦓","🐒","🦍","🦏","🦛","🐊","🐢","🐍","🦎","🦖","🦕","🐬","🐳","🦈","🐙","🦀","🦞","🐠","🐡","🦅","🦉","🦜","🦩","🦚","🐧","🦢","🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐷","🐮","🐸","🦄","🐝","🦋","🐞","🐌","🦔","🐿️","🦌"] },
    { cat: "vehicles", icons: ["🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒","🚐","🚚","🚛","🚜","🏍️","🚲","🛴","🚂","🚆","🚇","🚊","✈️","🛫","🚁","🚀","🛸","⛵","🚤","🛳️","⛴️","⚓"] },
    { cat: "food", icons: ["🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🍍","🥝","🍅","🥕","🌽","🥦","🥔","🍞","🥐","🥞","🧀","🍕","🍔","🍟","🌭","🍿","🍩","🍪","🎂"] },
    { cat: "stars", icons: ["⚽","🏀","🏈","⚾","🎾","🏐","🏆","🥇","🎖️","👑","💎","🎁","🎈","🎉","🎨","🎸","🎺","🥁","🧩","🧸"] }
  ];
  const res = [];
  let idx = 1;
  groups.forEach(g => {
    g.icons.forEach(ic => {
      if (idx <= 100) {
        res.push({ id: `st_${idx}`, cat: g.cat, name: `Naklejka #${idx}`, icon: ic });
        idx++;
      }
    });
  });
  return res;
})();

function getActiveProfileKey() {
  if (state.profile === "hubert" || state.profile === "tata") return state.profile;
  if (state.profile === "igor") return "igor";
  if (state.returnProfileAfterBrothers && PROFILE_META[state.returnProfileAfterBrothers]) {
    return state.returnProfileAfterBrothers;
  }
  return "igor";
}

function getActiveProfileLabel() {
  const k = getActiveProfileKey();
  if (k === "hubert") return "HUBERT";
  if (k === "tata") return "TATA (TESTOWY)";
  return "IGOR";
}

function setShopChestHighlight(tiersArr) {
  let scrolled = false;
  ["bronze", "silver", "gold"].forEach(t => {
    const el = document.getElementById(`avatarShopChest_${t}`);
    if (el) {
      const active = Array.isArray(tiersArr) && tiersArr.includes(t);
      el.classList.toggle("tutorial-highlight", active);
      if (active && !scrolled) {
        scrolled = true;
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  });
}

function setShopStarsHighlight(on) {
  const sb = document.getElementById("avatarShopStarsBadge");
  if (sb) sb.classList.toggle("tutorial-highlight", Boolean(on));
}

function getAvatarShoppingAdvisorSummary(profKey = null) {
  const key = profKey || getActiveProfileKey();
  const p = ensurePlayerStructure(state.stats[key]);
  const kidName = PROFILE_META[key] ? PROFILE_META[key].name : "Bohaterze";
  const stars = p.stars || 0;

  let canBuyText = "";
  let missingText = "";

  if (stars >= 250) {
    canBuyText = "Możesz za to kupić każdą skrzynię: Brązową za 50, Srebrną za 120 albo najlepszą Złotą Skrzynię za 250 gwiazdek!";
    missingText = "Masz już wystarczająco dużo gwiazdek nawet na najdroższą Złotą Skrzynię!";
  } else if (stars >= 120) {
    const missGold = 250 - stars;
    canBuyText = "Możesz już kupić Brązową Skrzynię za 50 gwiazdek albo Srebrną Skrzynię za 120 gwiazdek!";
    missingText = `Do najdroższej Złotej Skrzyni brakuje Ci jeszcze ${missGold} gwiazdek.`;
  } else if (stars >= 50) {
    const missSilver = 120 - stars;
    const missGold = 250 - stars;
    canBuyText = "Możesz już kupić Brązową Skrzynię za 50 gwiazdek!";
    missingText = `Do Srebrnej Skrzyni brakuje Ci ${missSilver} gwiazdek, a do Złotej ${missGold} gwiazdek.`;
  } else {
    const missBronze = 50 - stars;
    const missSilver = 120 - stars;
    const missGold = 250 - stars;
    canBuyText = "Na razie zbierasz gwiazdki i jeszcze nie możesz kupić skrzyni.";
    missingText = `Do Brązowej Skrzyni brakuje Ci ${missBronze} gwiazdek, do Srebrnej ${missSilver}, a do Złotej ${missGold} gwiazdek.`;
  }

  return {
    kidName,
    stars,
    canBuyText,
    missingText,
    fullSpeech: `Cześć ${kidName}! Masz teraz ${stars} złotych gwiazdek. ${canBuyText} ${missingText}`
  };
}

function speakAvatarShoppingAdvisor() {
  if (!state.profile || state.profile === "duel") return;

  const avModal = document.getElementById("avatarModal");
  if (avModal && avModal.classList.contains("hidden")) {
    openAvatarModal();
  }

  const profKey = getActiveProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  const info = getAvatarShoppingAdvisorSummary(profKey);
  const stars = info.stars;
  playEffect("success");

  const segments = [
    {
      lang: "pl",
      text: `Cześć ${info.kidName}! Masz teraz ${stars} złotych gwiazdek.`,
      onStart: () => { setShopChestHighlight([]); setShopStarsHighlight(true); },
      onEnd: () => setShopStarsHighlight(false)
    }
  ];

  if (stars >= 250) {
    segments.push({
      lang: "pl",
      text: "Masz już wystarczająco gwiazdek na każdą skrzynię! Możesz kupić Brązową za 50, Srebrną za 120 albo najlepszą Złotą Skrzynię za 250 gwiazdek!",
      onStart: () => setShopChestHighlight(["bronze", "silver", "gold"]),
      onEnd: () => setShopChestHighlight([])
    });
  } else if (stars >= 120) {
    segments.push({
      lang: "pl",
      text: "Możesz już kupić Brązową Skrzynię za 50 gwiazdek albo Srebrną Skrzynię za 120 gwiazdek!",
      onStart: () => setShopChestHighlight(["bronze", "silver"]),
      onEnd: () => setShopChestHighlight([])
    });
    segments.push({
      lang: "pl",
      text: `Do najdroższej Złotej Skrzyni brakuje Ci jeszcze ${250 - stars} gwiazdek.`,
      onStart: () => setShopChestHighlight(["gold"]),
      onEnd: () => setShopChestHighlight([])
    });
  } else if (stars >= 50) {
    segments.push({
      lang: "pl",
      text: "Możesz już kupić Brązową Skrzynię za 50 gwiazdek!",
      onStart: () => setShopChestHighlight(["bronze"]),
      onEnd: () => setShopChestHighlight([])
    });
    segments.push({
      lang: "pl",
      text: `Do Srebrnej Skrzyni brakuje Ci jeszcze ${120 - stars} gwiazdek.`,
      onStart: () => setShopChestHighlight(["silver"]),
      onEnd: () => setShopChestHighlight([])
    });
    segments.push({
      lang: "pl",
      text: `A do Złotej Skrzyni brakuje Ci ${250 - stars} gwiazdek.`,
      onStart: () => setShopChestHighlight(["gold"]),
      onEnd: () => setShopChestHighlight([])
    });
  } else {
    segments.push({
      lang: "pl",
      text: `Na razie zbierasz gwiazdki. Do Brązowej Skrzyni brakuje Ci jeszcze ${50 - stars} gwiazdek.`,
      onStart: () => setShopChestHighlight(["bronze"]),
      onEnd: () => setShopChestHighlight([])
    });
    segments.push({
      lang: "pl",
      text: `Do Srebrnej Skrzyni brakuje Ci jeszcze ${120 - stars} gwiazdek.`,
      onStart: () => setShopChestHighlight(["silver"]),
      onEnd: () => setShopChestHighlight([])
    });
    segments.push({
      lang: "pl",
      text: `A do Złotej Skrzyni brakuje Ci ${250 - stars} gwiazdek.`,
      onStart: () => setShopChestHighlight(["gold"]),
      onEnd: () => setShopChestHighlight([])
    });
  }

  const av = p.avatar || {};
  if (av.pet) {
    const petObj = (typeof COMPANION_PETS !== "undefined" ? COMPANION_PETS : []).find(a => a.id === av.pet);
    if (petObj) {
      const lvInfo = getPetLevelInfo((p.petXp && p.petXp[av.pet]) || 0);
      segments.push({ lang: "pl", text: `Twój towarzysz to ${petObj.pl}, poziom przyjaźni ${lvInfo.level}. Po angielsku:` });
      segments.push({ lang: "en", text: `My friend is a ${petObj.en}!` });
    }
  }

  speakSequence(segments, () => {
    setShopStarsHighlight(false);
    setShopChestHighlight([]);
  });
}

function speakAvatarGreeting() {
  speakAvatarShoppingAdvisor();
}

function getAll131OutfitsFlat() {
  const flat = [];
  ["bronze", "silver", "gold"].forEach(tier => {
    ["head", "torso", "legs"].forEach(slot => {
      if (OUTFITS_DB[tier] && OUTFITS_DB[tier][slot]) {
        OUTFITS_DB[tier][slot].forEach(file => {
          const fn = file.replace(/\.png$/i, "");
          const tierLabel = tier === "gold" ? "Złota" : tier === "silver" ? "Srebrna" : "Brązowa";
          flat.push({
            src: `grafiki/${tier === 'bronze' ? '' : (tier === 'silver' ? 'srebrna/' : 'zlota/')}${file}`,
            fallbackSrc: tier === "gold" ? `grafiki/srebrna/zlota/${file}` : "",
            name: fn, tier, tierLabel, slot
          });
        });
      }
    });
  });
  return flat;
}

function getAllAchievements() {
  const list = [];
  [10, 25, 50, 100, 200, 350, 500, 750, 1000].forEach(t => {
    const tier = t <= 25 ? 1 : t <= 100 ? 2 : t <= 500 ? 3 : 4;
    list.push({ id: `stars_${t}`, cat: "stars", tier, icon: t >= 350 ? "🌟" : "⭐", name: `${t} Gwiazdek`, desc: `Zbierz łącznie ${t} złotych gwiazdek`, check: p => p.stars >= t, progress: p => `${Math.min(p.stars, t)}/${t}` });
  });
  [{ d: 2, n: "2 Dni z rzędu", tier: 1 }, { d: 3, n: "3 Dni z rzędu", tier: 1 }, { d: 5, n: "5 Dni z rzędu", tier: 2 }, { d: 7, n: "Tydzień (7 dni)", tier: 2 }, { d: 14, n: "2 Tygodnie (14 dni)", tier: 3 }, { d: 21, n: "3 Tygodnie (21 dni)", tier: 3 }, { d: 30, n: "Miesiąc (30 dni)", tier: 3 }, { d: 60, n: "2 Miesiące (60 dni)", tier: 4 }, { d: 90, n: "3 Miesiące (90 dni)", tier: 4 }].forEach(st => {
    list.push({ id: `streak_${st.d}`, cat: "streak", tier: st.tier, icon: "🔥", name: st.n, desc: `Ćwicz angielski przez ${st.d} dni pod rząd!`, check: p => (p.streakDays || 1) >= st.d, progress: p => `${Math.min(p.streakDays || 1, st.d)}/${st.d}` });
  });
  const visibleLessons = (state.lessons || []).filter(l => !l.testOnly || state.profile === "tata");
  [1, 2, 3, 5, 8, 13, 21, 35].forEach(cnt => {
    const tier = cnt <= 2 ? 1 : cnt <= 5 ? 2 : cnt <= 21 ? 3 : 4;
    visibleLessons.forEach(lesson => {
      const shortTitle = lesson.title.replace(/^\d+\.\s*/, "");
      list.push({ id: `lesson_${lesson.id}_${cnt}`, cat: "lessons", tier, icon: lesson.icon ? Array.from(lesson.icon)[0] : "📘", name: `${shortTitle} (${cnt}x)`, desc: `Ukończ lekcję „${shortTitle}” ${cnt} razy!`, check: p => ((p.lessonCounts && p.lessonCounts[lesson.id]) || 0) >= cnt, progress: p => `${Math.min((p.lessonCounts && p.lessonCounts[lesson.id]) || 0, cnt)}/${cnt}` });
    });
  });
  [1, 3, 7, 15, 30].forEach(n => {
    const tier = n === 1 ? 1 : n <= 7 ? 2 : n === 15 ? 3 : 4;
    list.push({ id: `perf_${n}`, cat: "special", tier, icon: "🎯", name: `Snajper 100% (${n}x)`, desc: `Ukończ ${n} rund bez żadnego błędu!`, check: p => p.perfectRounds >= n, progress: p => `${Math.min(p.perfectRounds, n)}/${n}` });
  });
  [5, 15, 30, 60, 100].forEach(n => {
    const tier = n === 5 ? 1 : n === 15 ? 2 : n <= 60 ? 3 : 4;
    list.push({ id: `mic_${n}`, cat: "special", tier, icon: "🎤", name: `Mistrz Wymowy (${n}x)`, desc: `Powiedz poprawnie ${n} słówek do mikrofonu!`, check: p => p.micCount >= n, progress: p => `${Math.min(p.micCount, n)}/${n}` });
  });
  [1, 3, 7, 15].forEach(n => {
    const tier = n === 1 ? 1 : n === 3 ? 2 : n === 7 ? 3 : 4;
    list.push({ id: `ex_${n}`, cat: "special", tier, icon: "🎓", name: `Bohater Sprawdzianu (${n}x)`, desc: `Ukończ Wielki Sprawdzian ${n} razy!`, check: p => p.examsDone >= n, progress: p => `${Math.min(p.examsDone, n)}/${n}` });
  });
  [1, 5, 10, 20].forEach(n => {
    const tier = n === 1 ? 1 : n === 5 ? 2 : n === 10 ? 3 : 4;
    list.push({ id: `duel_${n}`, cat: "special", tier, icon: "⚔️", name: `Mistrz Pojedynków (${n}x)`, desc: `Wygraj Pojedynek Braci ${n} razy!`, check: p => p.duelsWon >= n, progress: p => `${Math.min(p.duelsWon, n)}/${n}` });
  });
  [10, 25, 45, 60].forEach(n => {
    const tier = n === 10 ? 1 : n === 25 ? 2 : n === 45 ? 3 : 4;
    list.push({ id: `st_${n}`, cat: "special", tier, icon: "🎁", name: `Kolekcjoner Naklejek (${n})`, desc: `Zbierz ${n} naklejek!`, check: () => (state.stats.stickers || []).length >= n, progress: () => `${Math.min((state.stats.stickers || []).length, n)}/${n}` });
  });
  [{ k: "stars", n: "Arcymistrz Gwiazdek", d: "Zbierz wszystkie odznaki za Gwiazdki!" }, { k: "streak", n: "Arcymistrz Systematyczności", d: "Zbierz wszystkie odznaki za Dni z rzędu!" }, { k: "lessons", n: "Arcymistrz Lekcji", d: "Zbierz wszystkie odznaki za Powtórki lekcji!" }, { k: "special", n: "Arcymistrz Wyzwań", d: "Zbierz wszystkie odznaki w kategorii Wyzwania!" }].forEach(mc => {
    const subIds = list.filter(a => a.cat === mc.k).map(a => a.id);
    list.push({ id: `master_${mc.k}`, cat: "masters", tier: 5, icon: "👑", name: mc.n, d: mc.d, check: p => subIds.length > 0 && subIds.every(id => p.badges.includes(id)), progress: p => `${subIds.filter(id => p.badges.includes(id)).length}/${subIds.length}` });
  });
  return list;
}

function rollChestForAchievement(ach) {
  const tier = ach.tier || 1;
  if (tier >= 5 || ach.cat === "masters") return "gold";
  const rnd = Math.random() * 100;
  if (tier === 4) return rnd < 65 ? "gold" : "silver";
  if (tier === 3) { if (rnd < 30) return "gold"; if (rnd < 80) return "silver"; return "bronze"; }
  if (tier === 2) { if (rnd < 15) return "gold"; if (rnd < 55) return "silver"; return "bronze"; }
  if (rnd < 5) return "gold";
  if (rnd < 30) return "silver";
  return "bronze";
}

function checkAndUnlockAchievements(profKey) {
  const p = state.stats[profKey];
  if (!p) return;
  const allAch = getAllAchievements();
  let newly = [];
  for (let pass = 0; pass < 2; pass++) {
    allAch.forEach(ach => {
      if (!p.badges.includes(ach.id) && ach.check(p)) { p.badges.push(ach.id); newly.push(ach); }
    });
  }
  if (newly.length > 0) {
    newly.forEach(ach => {
      const rolledChest = rollChestForAchievement(ach);
      state.rewardQueue.push({ profKey, achievement: ach, chestType: rolledChest });
    });
    saveCloudData();
    processNextRewardInQueue();
  }
}

function buyChestWithStars(tier, cost) {
  const profKey = getActiveProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  state.stats[profKey] = p;

  if ((p.stars || 0) < cost) {
    playEffect("wrong");
    const missing = cost - (p.stars || 0);
    speakSequence([{ lang: "pl", text: `Masz za mało gwiazdek! Masz ${p.stars || 0}, więc brakuje Ci jeszcze ${missing} gwiazdek. Rozwiąż więcej zadań!` }]);
    return;
  }

  p.stars -= cost;
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  updateAvatarPreviewWithCalibrator();
  renderAvatarItems();

  const tierLabel = tier === "gold" ? "👑 Złota Skrzynia" : tier === "silver" ? "🥈 Srebrna Skrzynia" : "📦 Brązowa Skrzynia";
  const tierSpeak = tier === "gold" ? "złotą skrzynię" : tier === "silver" ? "srebrną skrzynię" : "brązową skrzynię";
  renderChestOpeningInsidePopup(profKey, tier, `🛒 Kupiono za ${cost} ⭐: ${tierLabel}`);
  setTimeout(() => {
    speakSequence([{ lang: "pl", text: `Super! Wymieniono ${cost} gwiazdek na ${tierSpeak}! Kliknij skrzynię, aby ją otworzyć!` }]);
  }, 120);
}

function openPendingChestByIndex(profKey, idx) {
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (!Array.isArray(p.pendingChests) || !p.pendingChests[idx]) return;
  const item = p.pendingChests.splice(idx, 1)[0];
  state.stats[profKey] = p;
  saveCloudData();
  const tier = typeof item === "string" ? item : (item.tier || "bronze");
  const reason = (typeof item === "object" && item.reason) ? item.reason : "Nagroda od Taty!";
  const kidName = PROFILE_META[profKey] ? PROFILE_META[profKey].name : "Bohater";
  const chestLabel = tier === "gold" ? "👑 Złota Skrzynia!" : tier === "silver" ? "🥈 Srebrna Skrzynia!" : "📦 Brązowa Skrzynia!";
  renderChestOpeningInsidePopup(profKey, tier, `🎁 Nagroda dla: ${kidName} (${reason}) • ${chestLabel}`);
}

function processNextRewardInQueue() {
  if (state.rewardQueue.length === 0) return;
  const reward = state.rewardQueue[0];
  const chestType = reward.chestType || rollChestForAchievement(reward.achievement);
  const kidName = PROFILE_META[reward.profKey] ? PROFILE_META[reward.profKey].name : "Bohater";
  const chestLabel = chestType === "gold" ? "👑 Złota Skrzynia!" : chestType === "silver" ? "🥈 Srebrna Skrzynia!" : "📦 Brązowa Skrzynia!";
  const chestSpeak = chestType === "gold" ? "złota skrzynia" : chestType === "silver" ? "srebrna skrzynia" : "brązowa skrzynia";
  const prefixTitle = reward.fromDad ? `🎁 Nagroda dla: ${kidName} (${reward.achievement.name})` : `Zdobyto: ${reward.achievement.name} (${kidName})`;
  renderChestOpeningInsidePopup(reward.profKey, chestType, `${prefixTitle} • ${chestLabel}`);
  setTimeout(() => {
    if (typeof speakSequence === "function") {
      const introSpeak = reward.fromDad
        ? `${kidName}! Czeka na Ciebie prezent od Taty: ${chestSpeak}! Kliknij skrzynię, aby ją otworzyć!`
        : `Gratulacje ${kidName}! Nagroda: ${reward.achievement.name}! Twoja nagroda to ${chestSpeak}! Kliknij skrzynię, aby ją otworzyć!`;
      speakSequence([{ lang: "pl", text: introSpeak }]);
    }
  }, 150);
}

function renderChestOpeningInsidePopup(profKey, tier, title) {
  const modal = document.getElementById("rewardPopupModal");
  const content = document.getElementById("rewardPopupContent");
  if (!modal || !content) return;
  modal.classList.remove("hidden"); modal.classList.add("flex");
  const p = ensurePlayerStructure(state.stats[profKey]);
  state.stats[profKey] = p;
  const bg = tier === "gold" ? "from-amber-200 to-yellow-500" : tier === "silver" ? "from-slate-200 to-slate-400" : "from-orange-200 to-amber-700";
  const border = tier === "gold" ? "border-amber-400" : tier === "silver" ? "border-slate-400" : "border-amber-800";
  content.className = `bg-gradient-to-b ${bg} rounded-3xl max-w-md w-full p-6 border-4 ${border} shadow-2xl text-center transform transition-all duration-500 scale-95`;
  content.innerHTML = `
    <h3 class="text-xl font-extrabold text-white drop-shadow-md mb-2">${title}</h3>
    <div class="text-8xl my-6 float-anim cursor-pointer drop-shadow-2xl hover:scale-110 transition-transform" onclick="openChestReal('${profKey}','${tier}')">
      ${tier === 'gold' ? '🎁' : tier === 'silver' ? '🎁' : '🧰'}
    </div>
    <p class="text-white font-bold text-lg drop-shadow">Kliknij skrzynię, aby otworzyć!</p>
  `;
  setTimeout(() => content.classList.replace("scale-95", "scale-100"), 50);
  playEffect("success");
}

function openChestReal(profKey, tier) {
  const content = document.getElementById("rewardPopupContent");
  const p = ensurePlayerStructure(state.stats[profKey]);
  const kidName = PROFILE_META[profKey] ? PROFILE_META[profKey].name : "Bohater";
  
  const missingStickers = STICKER_POOL.filter(s => !(state.stats.stickers || []).includes(s.id));
  const missingPets = COMPANION_PETS.filter(a => !(p.memoryAnimals || []).includes(a.id));
  const foodPool = typeof PET_FOOD_POOL !== "undefined" ? PET_FOOD_POOL : [];
  
  let outfitTier = "bronze";
  const rnd = Math.random() * 100;
  if (tier === "bronze") { if (rnd < 5) outfitTier = "gold"; else if (rnd < 20) outfitTier = "silver"; }
  else if (tier === "silver") { if (rnd < 10) outfitTier = "gold"; else if (rnd < 45) outfitTier = "silver"; }
  else if (tier === "gold") { if (rnd < 15) outfitTier = "gold"; else if (rnd < 60) outfitTier = "silver"; }

  const allOutfits = typeof getAll131OutfitsFlat === "function" ? getAll131OutfitsFlat() : [];
  let unownedOutfits = allOutfits.filter(o => o.tier === outfitTier && !p.unlockedItems.includes(o.src));
  if (unownedOutfits.length === 0) unownedOutfits = allOutfits.filter(o => !p.unlockedItems.includes(o.src));

  const canDropOutfit = unownedOutfits.length > 0;
  const canDropPet = missingPets.length > 0;
  const canDropSticker = missingStickers.length > 0;

  let poolChoices = [];
  if (canDropOutfit) poolChoices.push(...Array(45).fill("outfit"));
  if (canDropPet) poolChoices.push(...Array(30).fill("pet"));
  if (canDropSticker) poolChoices.push(...Array(25).fill("sticker"));

  let dropType = poolChoices.length > 0 ? poolChoices[Math.floor(Math.random() * poolChoices.length)] : "coins";
  let rewardHtml = ""; let rewardName = "";
  let speechSegments = [];

  if (dropType === "pet") {
    const animal = missingPets[Math.floor(Math.random() * missingPets.length)];
    p.memoryAnimals.push(animal.id);
    rewardName = `Towarzysz: ${animal.pl}`;
    rewardHtml = `<div class="my-2 drop-shadow-lg pop-correct bg-white/70 rounded-full w-28 h-28 mx-auto flex items-center justify-center" style="font-size: 62px;">${animal.icon}</div>`;
    speechSegments.push({ lang: "pl", text: `Brawo ${kidName}! Ze skrzynki wylosowano nowego towarzysza! To jest ${animal.pl}, po angielsku` }, { lang: "en", text: animal.en });
  } else if (dropType === "sticker") {
    const sticker = missingStickers[Math.floor(Math.random() * missingStickers.length)];
    if (!state.stats.stickers) state.stats.stickers = [];
    state.stats.stickers.push(sticker.id);
    rewardName = `Naklejka: ${sticker.name}`;
    rewardHtml = `<div class="my-2 drop-shadow-lg pop-correct bg-white/70 rounded-full w-28 h-28 mx-auto flex items-center justify-center" style="font-size: 62px;">${sticker.icon}</div>`;
    speechSegments.push({ lang: "pl", text: `Super ${kidName}! Wylosowano nową naklejkę do klasera: ${sticker.name}!` });
  } else if (dropType === "outfit") {
    const outfit = unownedOutfits[Math.floor(Math.random() * unownedOutfits.length)];
    p.unlockedItems.push(outfit.src);
    rewardName = `Ubranie: ${outfit.name}`;
    rewardHtml = `<img src="${outfit.src}" class="w-28 h-28 object-contain mx-auto my-2 drop-shadow-xl pop-correct bg-white/70 rounded-full p-2" onerror="if(this.src.indexOf('srebrna/zlota')===-1){this.src='${outfit.fallbackSrc}';}else{this.style.display='none';}" />`;
    speechSegments.push({ lang: "pl", text: `Ekstra ${kidName}! Wylosowano nowe przebranie do garderoby:` }, { lang: "en", text: outfit.name.replace(/[_-]/g, " ") });
  } else {
    p.stars = (p.stars || 0) + 25;
    rewardName = "Bonus: +25 Złotych Gwiazdek!";
    rewardHtml = `<div class="my-2 drop-shadow-lg pop-correct bg-white/70 rounded-full w-28 h-28 mx-auto flex items-center justify-center" style="font-size: 62px;">⭐</div>`;
    speechSegments.push({ lang: "pl", text: `Brawo ${kidName}! Masz już całą kolekcję, więc otrzymujesz dwadzieścia pięć złotych gwiazdek!` });
  }

  let bonusFoodHtml = "";
  if (foodPool.length > 0) {
    const food = foodPool[Math.floor(Math.random() * foodPool.length)];
    const qty = Math.floor(Math.random() * 5) + 1;
    if (!p.petFood) p.petFood = {};
    p.petFood[food.id] = (p.petFood[food.id] || 0) + qty;
    bonusFoodHtml = `
      <div class="my-3 p-2.5 rounded-2xl bg-emerald-600/90 border-2 border-emerald-200 text-white flex items-center justify-center gap-3 shadow-md">
        <span class="text-4xl">${food.icon}</span>
        <div class="text-left">
          <div class="text-[10px] font-extrabold uppercase text-emerald-100">🍎 Dodatek do Spiżarni Zwierzaka:</div>
          <div class="text-sm font-extrabold">+${qty}x ${food.pl} (${food.en})</div>
        </div>
      </div>
    `;
    speechSegments.push({ lang: "pl", text: `Oraz dodatkowo do spiżarni wpada jedzenie dla zwierzaka: ${qty} razy ${food.pl}!` });
  }

  state.stats[profKey] = p;
  saveCloudData();
  playEffect("fanfare");

  content.innerHTML = `
    <h3 class="text-2xl font-extrabold text-white drop-shadow-md mb-1">${kidName} zdobywa:</h3>
    ${rewardHtml}
    <p class="text-white font-extrabold text-lg drop-shadow mb-2">${rewardName}</p>
    ${bonusFoodHtml}
    <button onclick="closeRewardPopup()" class="w-full py-3 mt-1 bg-white text-slate-800 font-extrabold text-lg rounded-2xl shadow-lg hover:bg-slate-100">Super! Odbierz</button>
  `;

  if (typeof speakSequence === "function" && speechSegments.length > 0) speakSequence(speechSegments);
}

function closeRewardPopup() {
  if (typeof cancelAllSpeechAndTimers === "function") cancelAllSpeechAndTimers();
  const modal = document.getElementById("rewardPopupModal");
  if (modal) { modal.classList.remove("flex"); modal.classList.add("hidden"); }
  const avModal = document.getElementById("avatarModal");
  if (avModal && !avModal.classList.contains("hidden")) { updateAvatarPreviewWithCalibrator(); renderAvatarItems(); }
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  if (state.rewardQueue.length > 0) {
    state.rewardQueue.shift();
    if (state.rewardQueue.length > 0) setTimeout(processNextRewardInQueue, 500);
  }
}

function openStickersModal() { if (!state.profile || state.profile === "duel") return; state.selectedStickerCat = "all"; renderStickers(); const m = document.getElementById("stickersModal"); if (m) { m.classList.remove("hidden"); m.classList.add("flex"); } }
function closeStickersModal() { const m = document.getElementById("stickersModal"); if (m) { m.classList.add("hidden"); m.classList.remove("flex"); } }
function renderStickers() {
  const tabs = document.getElementById("stickerCategoryTabs"), grid = document.getElementById("stickersGrid"), total = document.getElementById("stickerModalTotal");
  if (!tabs || !grid || !total) return;
  total.textContent = (state.stats.stickers || []).length;
  tabs.innerHTML = STICKER_CATEGORIES.map(c => `<button onclick="state.selectedStickerCat='${c.id}'; renderStickers();" class="px-3 py-1.5 rounded-xl font-bold text-xs border-2 ${state.selectedStickerCat === c.id ? 'bg-pink-500 text-white border-pink-600' : 'bg-white text-pink-700 border-pink-200'} shadow-sm">${c.icon} ${c.name}</button>`).join("");
  const filtered = state.selectedStickerCat === "all" ? STICKER_POOL : STICKER_POOL.filter(s => s.cat === state.selectedStickerCat);
  grid.innerHTML = filtered.map(s => {
    const owns = (state.stats.stickers || []).includes(s.id);
    if (owns) return `<div class="bg-white rounded-2xl p-2 flex flex-col items-center justify-center border-2 border-pink-300 shadow-sm"><div class="text-4xl drop-shadow-md float-anim">${s.icon}</div><div class="text-[9px] font-bold text-pink-800 mt-2 text-center leading-tight">${s.name}</div></div>`;
    return `<div class="bg-slate-200/50 rounded-2xl p-2 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 opacity-60"><div class="text-3xl grayscale">❓</div><div class="text-[9px] font-bold text-slate-500 mt-2 text-center leading-tight">Nieodkryte</div></div>`;
  }).join("");
}

function openBadgesModal() { if (!state.profile || state.profile === "duel") return; state.selectedBadgeCat = "all"; document.getElementById("badgesModalPlayerName").textContent = getActiveProfileLabel(); renderBadges(); const m = document.getElementById("badgesModal"); if (m) { m.classList.remove("hidden"); m.classList.add("flex"); } }
function closeBadgesModal() { const m = document.getElementById("badgesModal"); if (m) { m.classList.add("hidden"); m.classList.remove("flex"); } }
function renderBadges() {
  const tabs = document.getElementById("badgeCategoryTabs"), grid = document.getElementById("badgesGrid");
  if (!tabs || !grid) return;
  const p = state.stats[getActiveProfileKey()];
  if (!p) return;
  const cats = [{id:"all", n:"Wszystkie"}, {id:"stars", n:"⭐ Gwiazdki"}, {id:"streak", n:"🔥 Dni"}, {id:"lessons", n:"📘 Lekcje"}, {id:"special", n:"🏆 Wyzwania"}, {id:"masters", n:"👑 Arcymistrz"}];
  tabs.innerHTML = cats.map(c => `<button onclick="state.selectedBadgeCat='${c.id}'; renderBadges();" class="px-3 py-1.5 rounded-xl font-bold text-xs border-2 ${state.selectedBadgeCat === c.id ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-amber-800 border-amber-200'} shadow-sm">${c.n}</button>`).join("");
  const allAch = getAllAchievements();
  const filtered = state.selectedBadgeCat === "all" ? allAch : allAch.filter(a => a.cat === state.selectedBadgeCat);
  grid.innerHTML = filtered.map(a => {
    const owns = p.badges.includes(a.id);
    if (owns) return `<div onclick="speakSequence([{lang:'pl', text:'Odznaka zdobyta! ${a.name}. ${a.desc}'}])" class="cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-amber-100 to-yellow-50 rounded-2xl p-3 border-2 border-amber-400 shadow-sm flex items-center gap-3"><div class="text-4xl drop-shadow-md float-anim">${a.icon}</div><div><div class="font-extrabold text-amber-900 text-sm leading-tight">${a.name}</div><div class="text-[10px] text-amber-700 mt-0.5 leading-tight">${a.desc}</div></div></div>`;
    return `<div onclick="speakSequence([{lang:'pl', text:'Zablokowana odznaka. Co musisz zrobić? ${a.desc}'}])" class="cursor-pointer hover:scale-105 transition-transform bg-slate-100 rounded-2xl p-3 border-2 border-dashed border-slate-300 opacity-70 flex items-center gap-3"><div class="text-3xl grayscale opacity-50">🔒</div><div><div class="font-bold text-slate-600 text-sm leading-tight">${a.name}</div><div class="text-[10px] text-slate-500 mt-0.5 leading-tight">Postęp: ${a.progress(p)}</div></div></div>`;
  }).join("");
}

function openAvatarModal() { if (!state.profile || state.profile === "duel") return; document.getElementById("avatarModalPlayerName").textContent = getActiveProfileLabel(); updateAvatarPreviewWithCalibrator(); renderAvatarItems(); const m = document.getElementById("avatarModal"); if (m) { m.classList.remove("hidden"); m.classList.add("flex"); } }
function closeAvatarModal() { cancelAllSpeechAndTimers(); saveCloudData(); updateHeaderUI(); const m = document.getElementById("avatarModal"); if (m) { m.classList.add("hidden"); m.classList.remove("flex"); } }

function updateAvatarPreviewWithCalibrator() {
  const box = document.getElementById("avatarPreviewBox");
  if (!box || !state.profile) return;
  const profKey = getActiveProfileKey();
  const cal = getAvatarCalibration(), activeKey = window._calibActiveType || "shirt", cfg = cal[activeKey];
  const advisor = getAvatarShoppingAdvisorSummary(profKey);

  box.innerHTML = `
    <div class="flex flex-col items-center w-full">
      <div onclick="speakAvatarShoppingAdvisor()" class="cursor-pointer hover:scale-105 transition-transform" title="Kliknij bohatera, aby usłyszeć ile masz gwiazdek i na co wystarczy!">${renderBoyAvatarSvg(profKey, 155)}</div>
      <button onclick="speakAvatarShoppingAdvisor()" class="kid-card mt-3 w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-amber-950 font-extrabold text-xs border-2 border-amber-600 shadow-md flex items-center justify-center gap-1.5">
        <span>🦉🔊</span> Ile mam ⭐ i na co wystarczy?
      </button>
      <div class="mt-2 p-2.5 rounded-2xl bg-white/95 border border-amber-300 text-left text-[11px] text-slate-800 shadow-sm w-full">
        <div class="font-extrabold text-amber-900">⭐ Masz: ${advisor.stars} gwiazdek</div>
        <div class="font-bold text-emerald-700 mt-0.5">${advisor.canBuyText}</div>
        <div class="text-slate-600 mt-0.5">${advisor.missingText}</div>
      </div>
      <button onclick="window._calibOpen=!window._calibOpen;updateAvatarPreviewWithCalibrator();" class="mt-2.5 px-3 py-1.5 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold text-xs border border-indigo-300">🔧 ${window._calibOpen ? "Ukryj suwaki dopasowania" : "Dopasuj wymiary (Suwaki)"}</button>
      ${window._calibOpen ? `
        <div class="w-full mt-2 p-2.5 bg-white rounded-2xl border-2 border-indigo-300 text-left text-[11px] space-y-1.5 shadow-sm">
          <div class="font-extrabold text-indigo-950 mb-1">Wybierz typ ubrania do regulacji:</div>
          <select onchange="window._calibActiveType=this.value;updateAvatarPreviewWithCalibrator();" class="w-full p-1 rounded-lg border border-slate-300 font-bold text-xs mb-1 bg-slate-50">${Object.keys(cal).map(k => `<option value="${k}" ${k === activeKey ? "selected" : ""}>${cal[k].label}</option>`).join("")}</select>
          <div><div class="flex justify-between font-bold"><span>⬆️⬇️ Pozycja Góra/Dół (top):</span><span>${cfg.top}%</span></div><input type="range" min="-15" max="75" step="1" value="${cfg.top}" oninput="changeCalibVal('${activeKey}','top',this.value)" class="w-full accent-indigo-600" /></div>
          <div><div class="flex justify-between font-bold"><span>↔️ Szerokość (scaleX):</span><span>${cfg.scaleX}</span></div><input type="range" min="0.45" max="1.60" step="0.02" value="${cfg.scaleX}" oninput="changeCalibVal('${activeKey}','scaleX',this.value)" class="w-full accent-indigo-600" /></div>
          <div><div class="flex justify-between font-bold"><span>↕️ Wysokość (scaleY):</span><span>${cfg.scaleY}</span></div><input type="range" min="0.50" max="1.60" step="0.02" value="${cfg.scaleY}" oninput="changeCalibVal('${activeKey}','scaleY',this.value)" class="w-full accent-indigo-600" /></div>
          <div class="pt-1 flex justify-between gap-1"><button onclick="resetCalibDefaults()" class="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded-lg text-[10px]">Resetuj wymiary</button><span class="text-[10px] text-emerald-700 font-bold self-center">✓ Zapisano w chmurze</span></div>
        </div>
      ` : ""}
    </div>
  `;
}

function changeCalibVal(typeKey, prop, val) { const cal = getAvatarCalibration(); cal[typeKey][prop] = parseFloat(val); saveAvatarCalibration(cal); updateAvatarPreviewWithCalibrator(); if (typeof updateHeaderUI === "function") updateHeaderUI(); }
function resetCalibDefaults() { state.calibration = JSON.parse(JSON.stringify(DEFAULT_AVATAR_CALIBRATION)); localStorage.removeItem("akademia_avatar_calib_v4"); saveCloudData(); updateAvatarPreviewWithCalibrator(); if (typeof updateHeaderUI === "function") updateHeaderUI(); }

function feedCompanionPet(foodId) {
  const profKey = getActiveProfileKey(), p = ensurePlayerStructure(state.stats[profKey]), petId = p.avatar && p.avatar.pet;
  if (!petId) { playEffect("wrong"); speakSequence([{ lang: "pl", text: "Najpierw wybierz swojego zwierzaka towarzysza z listy powyżej!" }]); return; }
  const currentQty = (p.petFood && p.petFood[foodId]) || 0;
  if (currentQty <= 0) return;
  const foodObj = (typeof PET_FOOD_POOL !== "undefined" ? PET_FOOD_POOL : []).find(f => f.id === foodId);
  const petObj = (typeof COMPANION_PETS !== "undefined" ? COMPANION_PETS : []).find(a => a.id === petId);
  if (!foodObj || !petObj) return;
  p.petFood[foodId] = currentQty - 1;
  if (p.petFood[foodId] <= 0) delete p.petFood[foodId];
  if (!p.petXp) p.petXp = {};
  const oldLv = getPetLevelInfo(p.petXp[petId] || 0).level;
  p.petXp[petId] = (p.petXp[petId] || 0) + 1;
  const newLvInfo = getPetLevelInfo(p.petXp[petId]);
  state.stats[profKey] = p;
  if (typeof advanceDailyQuestProgress === "function") advanceDailyQuestProgress(profKey, "feed_pet", 1);
  saveCloudData(); playEffect("success");
  updateAvatarPreviewWithCalibrator(); renderAvatarItems(); if (typeof updateHeaderUI === "function") updateHeaderUI();
  const segs = [{ lang: "pl", text: `Mniam mniam! ${petObj.pl} zjada ze smakiem: ${foodObj.pl}!` }, { lang: "en", text: `Yummy ${foodObj.en}!` }];
  if (newLvInfo.level > oldLv) segs.push({ lang: "pl", text: `Brawo! ${petObj.pl} awansuje na poziom przyjaźni ${newLvInfo.level}!` });
  speakSequence(segs);
}

function renderAvatarItems() {
  const profKey = getActiveProfileKey(), p = ensurePlayerStructure(state.stats[profKey]);
  state.stats[profKey] = p;
  const container = document.getElementById("avatarItemsContainer");
  if (!container) return;
  const all131 = typeof getAll131OutfitsFlat === "function" ? getAll131OutfitsFlat() : [];
  const countOwned = list => list.filter(it => p.unlockedItems.includes(it.src)).length;
  const tierTabs = [
    { id: "all", label: `Wszystkie (${countOwned(all131)}/131)` },
    { id: "bronze", label: `📦 Brązowa (${countOwned(all131.filter(i => i.tier === "bronze"))}/30)` },
    { id: "silver", label: `🥈 Srebrna (${countOwned(all131.filter(i => i.tier === "silver"))}/56)` },
    { id: "gold", label: `👑 Złota (${countOwned(all131.filter(i => i.tier === "gold"))}/45)` }
  ];
  const stars = p.stars || 0;

  const pendingList = Array.isArray(p.pendingChests) ? p.pendingChests : [];
  const pendingHtml = pendingList.length > 0
    ? `<div class="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-400 shadow-sm mb-3">
         <div class="text-xs font-extrabold text-emerald-950 uppercase mb-2">🎁 Skrzynie oczekujące na otwarcie (${pendingList.length})</div>
         <div class="flex flex-wrap gap-2">
           ${pendingList.map((c, idx) => {
             const t = typeof c === "string" ? c : (c.tier || "bronze");
             const r = (typeof c === "object" && c.reason) ? c.reason : "Nagroda od Taty!";
             const lbl = t === "gold" ? "👑 Złota Skrzynia" : t === "silver" ? "🥈 Srebrna Skrzynia" : "📦 Brązowa Skrzynia";
             return `<button onclick="openPendingChestByIndex('${profKey}', ${idx})" class="kid-card px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow">Otwórz: ${lbl} (${r})</button>`;
           }).join("")}
         </div>
       </div>`
    : "";

  let shopHtml = `
    ${pendingHtml}
    <div class="p-3 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-300 shadow-sm mb-3">
      <div class="flex flex-wrap items-center justify-between gap-1 mb-2"><div class="text-xs font-extrabold text-amber-950">🛒 Sklepik ze Skrzyniami</div><span id="avatarShopStarsBadge" class="px-2.5 py-0.5 rounded-full bg-white border border-amber-400 text-amber-900 font-extrabold text-xs">Twoje Gwiazdki: ⭐ ${stars}</span></div>
      <div class="grid grid-cols-3 gap-2">
        <button id="avatarShopChest_bronze" onclick="buyChestWithStars('bronze', 50)" class="kid-card py-2 px-2 rounded-xl ${stars >= 50 ? 'bg-amber-700 hover:bg-amber-800 text-white' : 'bg-amber-700/70 text-amber-100'} font-extrabold text-[11px] shadow flex flex-col items-center"><span class="text-lg">📦 Brązowa</span><span>Koszt: 50 ⭐</span><span class="text-[9px] mt-0.5">${stars >= 50 ? '✅ Możesz kupić!' : `Brakuje ${50 - stars} ⭐`}</span></button>
        <button id="avatarShopChest_silver" onclick="buyChestWithStars('silver', 120)" class="kid-card py-2 px-2 rounded-xl ${stars >= 120 ? 'bg-slate-600 hover:bg-slate-700 text-white' : 'bg-slate-500/70 text-slate-100'} font-extrabold text-[11px] shadow flex flex-col items-center"><span class="text-lg">🥈 Srebrna</span><span>Koszt: 120 ⭐</span><span class="text-[9px] mt-0.5">${stars >= 120 ? '✅ Możesz kupić!' : `Brakuje ${120 - stars} ⭐`}</span></button>
        <button id="avatarShopChest_gold" onclick="buyChestWithStars('gold', 250)" class="kid-card py-2 px-2 rounded-xl ${stars >= 250 ? 'bg-amber-400 hover:bg-amber-500 text-amber-950' : 'bg-amber-300/70 text-amber-900'} font-extrabold text-[11px] shadow flex flex-col items-center border border-amber-600"><span class="text-lg">👑 Złota</span><span>Koszt: 250 ⭐</span><span class="text-[9px] mt-0.5">${stars >= 250 ? '✅ Możesz kupić!' : `Brakuje ${250 - stars} ⭐`}</span></button>
      </div>
    </div>`;
  let html = `${shopHtml}<div class="flex flex-wrap gap-1.5 mb-3 pb-2 border-b border-indigo-100">${tierTabs.map(t => `<button onclick="setWardrobeTierFilter('${t.id}')" class="px-3 py-1.5 rounded-xl font-bold text-xs border-2 ${state.selectedWardrobeTier === t.id ? 'bg-indigo-600 text-white border-indigo-800' : 'bg-white text-slate-700 border-slate-200'}">${t.label}</button>`).join("")}</div>`;
  const categories = [{ key: "head", title: "🧢 Nakrycia głowy i Hełmy" }, { key: "torso", title: "👕 Koszulki, Kurtki i Zbroje" }, { key: "legs", title: "👖 Spodnie i Szorty" }];
  const filteredOutfits = state.selectedWardrobeTier === "all" ? all131 : all131.filter(it => it.tier === state.selectedWardrobeTier);
  categories.forEach(cat => {
    const rawCatItems = filteredOutfits.filter(it => it.slot === cat.key);
    const unlockedCatItems = rawCatItems.filter(it => p.unlockedItems.includes(it.src)).sort((a, b) => p.unlockedItems.indexOf(b.src) - p.unlockedItems.indexOf(a.src));
    const lockedCatItems = rawCatItems.filter(it => !p.unlockedItems.includes(it.src));
    const catItems = [...unlockedCatItems, ...lockedCatItems];

    html += `<div class="mb-4"><h3 class="text-sm font-extrabold text-slate-700 mb-2 border-b pb-1">${cat.title} (${unlockedCatItems.length}/${catItems.length})</h3><div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">`;
    catItems.forEach(item => {
      const isUnlocked = p.unlockedItems.includes(item.src), isEquipped = p.avatar && p.avatar[cat.key] === item.src;
      const tierBadgeColor = item.tier === "gold" ? "bg-amber-400 text-amber-950" : item.tier === "silver" ? "bg-slate-300 text-slate-800" : "bg-amber-700 text-white";
      html += isUnlocked
        ? `<div onclick="equipAvatarItem('${cat.key}', '${item.src}')" class="cursor-pointer rounded-2xl border-3 ${isEquipped ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400' : 'border-slate-200 bg-slate-50 hover:bg-white'} p-2 flex flex-col items-center justify-between text-center shadow-sm"><span class="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${tierBadgeColor} mb-1">${item.tierLabel}</span><img src="${item.src}" class="w-14 h-14 object-contain mb-1 drop-shadow" onerror="if(this.src.indexOf('srebrna/zlota')===-1){this.src='${item.fallbackSrc}';}" /><div class="text-[10px] font-bold text-slate-700 leading-tight break-all">${item.name}</div>${isEquipped ? `<div class="text-[9px] mt-1 bg-emerald-500 text-white px-2 py-0.5 rounded-full font-extrabold">Założone ✓</div>` : ``}</div>`
        : `<div class="rounded-2xl border-2 border-slate-200 bg-slate-100 p-2 flex flex-col items-center justify-between text-center opacity-55"><span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full ${tierBadgeColor} mb-1">${item.tierLabel}</span><div class="text-2xl my-2">🔒</div><div class="text-[10px] font-bold text-slate-500 leading-tight break-all">${item.name}</div></div>`;
    });
    html += `</div></div>`;
  });

  const allPets = typeof COMPANION_PETS !== "undefined" ? COMPANION_PETS : [];
  const unlockedPets = allPets.filter(a => (p.memoryAnimals || []).includes(a.id)).sort((a, b) => p.memoryAnimals.indexOf(b.id) - p.memoryAnimals.indexOf(a.id));
  const lockedPets = allPets.filter(a => !(p.memoryAnimals || []).includes(a.id));
  const sortedPets = [...unlockedPets, ...lockedPets];

  html += `<div id="companionPetsSection" class="mb-4 pt-2"><div class="flex items-center justify-between border-b border-amber-200 pb-1 mb-2"><h3 class="text-sm font-extrabold text-amber-800">🐾 Twój Towarzysz (Zwierzak)</h3><span class="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">${unlockedPets.length}/${allPets.length}</span></div>`;
  const foodPool = typeof PET_FOOD_POOL !== "undefined" ? PET_FOOD_POOL : [];
  const ownedFoods = foodPool.filter(f => (p.petFood && p.petFood[f.id]) > 0);
  const activePetObj = allPets.find(a => a.id === (p.avatar && p.avatar.pet));
  const lvInfo = activePetObj ? getPetLevelInfo((p.petXp && p.petXp[activePetObj.id]) || 0) : null;
  html += `<div id="petPantrySection" class="mb-3 p-3 rounded-2xl bg-emerald-50/90 border-2 border-emerald-300 shadow-sm"><div class="text-xs font-extrabold text-emerald-950 mb-2">🍎 Spiżarnia Zwierzaka ${activePetObj ? `• Karmisz: ${activePetObj.icon} ${activePetObj.pl} (Poziom ${lvInfo.level} • ${lvInfo.inLevel}/3 🍎)` : `• (Wybierz zwierzaka poniżej!)`}</div>${ownedFoods.length === 0 ? `<div class="text-[11px] font-bold text-slate-500 bg-white/80 p-2.5 rounded-xl border border-emerald-200">Koszyk w spiżarni jest pusty! Otwieraj skrzynie z nagrodami, aby wylosować owoce i warzywa (po 1–5 sztuk)!</div>` : `<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">${ownedFoods.map(f => `<button onclick="feedCompanionPet('${f.id}')" class="kid-card cursor-pointer p-2 rounded-xl bg-white hover:bg-emerald-100 border-2 border-emerald-300 flex flex-col items-center shadow-sm"><div class="text-2xl">${f.icon}</div><div class="text-[10px] font-extrabold text-slate-800 mt-0.5">${f.pl}</div><span class="mt-0.5 px-2 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[9px]">Ilość: ${p.petFood[f.id]}x</span></button>`).join("")}</div>`}</div>`;
  html += `<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2"><div onclick="equipAvatarItem('pet', '')" class="cursor-pointer rounded-2xl border-3 ${!p.avatar.pet ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400' : 'border-slate-200 bg-slate-50 hover:bg-white'} p-2 flex flex-col items-center justify-center text-center shadow-sm h-full min-h-[75px]"><div class="text-xl opacity-50 mb-1">❌</div><div class="text-[9px] font-bold text-slate-600">Schowaj</div></div>`;
  sortedPets.forEach(an => {
    const isUnlocked = (p.memoryAnimals || []).includes(an.id), isEquipped = p.avatar && p.avatar.pet === an.id, lv = getPetLevelInfo((p.petXp && p.petXp[an.id]) || 0);
    html += isUnlocked
      ? `<div onclick="equipAvatarItem('pet', '${an.id}')" class="cursor-pointer rounded-2xl border-3 ${isEquipped ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400' : 'border-slate-200 bg-slate-50 hover:bg-white'} p-2 flex flex-col items-center justify-center text-center shadow-sm h-full min-h-[75px]"><div class="text-3xl float-anim mb-1">${an.icon}</div><div class="text-[10px] font-extrabold text-slate-800 leading-tight">${an.pl}</div><div class="text-[8px] font-bold text-amber-700">${lv.fed > 0 ? `❤️ Lv.${lv.level} (${lv.inLevel}/3)` : an.en}</div>${isEquipped ? `<div class="text-[8px] mt-1 bg-emerald-500 text-white px-2 py-0.5 rounded-full font-extrabold">Towarzyszy ✓</div>` : ``}</div>`
      : `<div class="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100/70 p-2 flex flex-col items-center justify-center text-center opacity-60 h-full min-h-[75px]"><div class="text-xl grayscale opacity-50 mb-1">🔒</div><div class="text-[10px] font-bold text-slate-500 leading-tight">${an.pl}</div><div class="text-[8px] text-slate-400">Ze skrzyni</div></div>`;
  });
  html += `</div></div>`;
  container.innerHTML = html;
}

function equipAvatarItem(category, itemSrc) {
  const profKey = getActiveProfileKey(), p = ensurePlayerStructure(state.stats[profKey]);
  if (!p.avatar) p.avatar = { head: "", torso: "", legs: "", pet: "" };
  p.avatar[category] = p.avatar[category] === itemSrc ? "" : itemSrc;
  state.stats[profKey] = p;
  if (typeof classifyHeadItem === "function" && category !== "pet") {
    if (category === "head") window._calibActiveType = classifyHeadItem(itemSrc);
    if (category === "torso") window._calibActiveType = classifyTorsoItem(itemSrc);
    if (category === "legs") window._calibActiveType = classifyLegsItem(itemSrc);
  }
  playEffect("beep"); updateAvatarPreviewWithCalibrator(); renderAvatarItems(); saveCloudData(); updateHeaderUI();
}
function setWardrobeTierFilter(tier) { state.selectedWardrobeTier = tier; renderAvatarItems(); }

function openGuideModal() {
  const modal = document.getElementById("guideModal");
  if (!modal) return;
  if (typeof syncVersionLabelsInDom === "function") syncVersionLabelsInDom();
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeGuideModal() {
  const modal = document.getElementById("guideModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function unlockAllOutfitsForTesting() {
  const all131 = typeof getAll131OutfitsFlat === "function" ? getAll131OutfitsFlat().map(o => o.src) : [];
  const allPets = COMPANION_PETS.map(pet => pet.id);
  ["igor", "hubert", "tata"].forEach(k => {
    const p = ensurePlayerStructure(state.stats[k]);
    p.unlockedItems = Array.from(new Set([...p.unlockedItems, ...all131]));
    p.memoryAnimals = Array.from(new Set([...p.memoryAnimals, ...allPets]));
    state.stats[k] = p;
  });
  saveCloudData();
  if (typeof showParentStatus === "function") showParentStatus("🔓 Odblokowano wszystkie 131 przebrań i 50 zwierzaków dla testów!");
}

function lockAllOutfitsAfterTesting() {
  ["igor", "hubert", "tata"].forEach(k => {
    const p = ensurePlayerStructure(state.stats[k]);
    p.unlockedItems = [];
    p.memoryAnimals = [];
    p.avatar = { head: "", torso: "", legs: "", pet: "" };
    state.stats[k] = p;
  });
  saveCloudData();
  if (typeof showParentStatus === "function") showParentStatus("🔒 Zablokowano testowe ubranka i zwierzaki.");
}
