/* ============================================================================
   PLIK: js/05-rewards-wardrobe.js
   SKRZYNIE NAGRÓD, GARDEROBA AWATARA, ZWIERZAKI, SPIŻARNIA, ODZNAKI I NAKLEJKI
   ============================================================================ */

const CHEST_TIERS_CONFIG = {
  bronze: {
    id: "bronze",
    name: "Brązowa Skrzynia",
    icon: "📦",
    costStars: 50,
    badgeCls: "bg-amber-100 text-amber-950 border-amber-400",
    outfitPool: [
      "grafiki/cap_red.png", "grafiki/cap_blue.png", "grafiki/cap_green.png", "grafiki/cap_yellow.png",
      "grafiki/cap_orange.png", "grafiki/cap_purple.png", "grafiki/cap_black.png", "grafiki/cap_white.png",
      "grafiki/shirt_blue.png", "grafiki/shirt_red.png", "grafiki/shirt_green.png", "grafiki/shirt_yellow.png",
      "grafiki/shirt_orange.png", "grafiki/shirt_purple.png", "grafiki/shirt_white.png", "grafiki/shirt_black.png",
      "grafiki/shirt_stripes.png", "grafiki/shirt_star.png", "grafiki/shirt_smile.png", "grafiki/shirt_car.png",
      "grafiki/jeans_blue.png", "grafiki/jeans_black.png", "grafiki/jeans_grey.png",
      "grafiki/shorts_blue.png", "grafiki/shorts_red.png", "grafiki/shorts_green.png", "grafiki/shorts_yellow.png",
      "grafiki/shorts_black.png", "grafiki/shorts_orange.png", "grafiki/shorts_camo.png"
    ]
  },
  silver: {
    id: "silver",
    name: "Srebrna Skrzynia",
    icon: "🥈",
    costStars: 120,
    badgeCls: "bg-slate-100 text-slate-900 border-slate-400",
    outfitPool: [
      "grafiki/srebrna/cap_silver.png", "grafiki/srebrna/cap_police.png", "grafiki/srebrna/cap_captain.png",
      "grafiki/srebrna/cap_chef.png", "grafiki/srebrna/cap_pirate.png", "grafiki/srebrna/cap_cowboy.png",
      "grafiki/srebrna/helmet_firefighter.png", "grafiki/srebrna/helmet_electrician.png", "grafiki/srebrna/helmet_bike.png",
      "grafiki/srebrna/shirt_pigeon.png", "grafiki/srebrna/shirt_T-Rex.png", "grafiki/srebrna/shirt_police.png",
      "grafiki/srebrna/shirt_firefighter.png", "grafiki/srebrna/shirt_paramedic.png", "grafiki/srebrna/shirt_pirate.png",
      "grafiki/srebrna/shirt_pilot.png", "grafiki/srebrna/shirt_chef.png", "grafiki/srebrna/shirt_rocket.png",
      "grafiki/srebrna/shirt_shark.png", "grafiki/srebrna/shirt_tiger.png", "grafiki/srebrna/shirt_dragon.png",
      "grafiki/srebrna/pants_grey.png", "grafiki/srebrna/pants_police.png", "grafiki/srebrna/pants_firefighter.png",
      "grafiki/srebrna/pants_paramedic.png", "grafiki/srebrna/pants_pirate.png", "grafiki/srebrna/pants_cargo.png",
      "grafiki/srebrna/shorts_sport.png", "grafiki/srebrna/shorts_dino.png", "grafiki/srebrna/shorts_shark.png"
    ]
  },
  gold: {
    id: "gold",
    name: "Złota Skrzynia",
    icon: "👑",
    costStars: 250,
    badgeCls: "bg-yellow-100 text-amber-950 border-amber-500",
    outfitPool: [
      "grafiki/zlota/helmet_astronaut.png", "grafiki/zlota/helmet_knight.png", "grafiki/zlota/helmet_robot.png",
      "grafiki/zlota/helmet_ninja.png", "grafiki/zlota/helmet_viking.png", "grafiki/zlota/helmet_dino.png",
      "grafiki/zlota/helmet_dragon.png", "grafiki/zlota/mask_superhero.png", "grafiki/zlota/mask_iron.png",
      "grafiki/zlota/mask_spider.png", "grafiki/zlota/mask_bat.png", "grafiki/zlota/cap_crown.png",
      "grafiki/zlota/cap_wizard.png", "grafiki/zlota/cap_king.png", "grafiki/zlota/helmet_hot-dog.png",
      "grafiki/zlota/armor_gold.png", "grafiki/zlota/armor_knight.png", "grafiki/zlota/armor_dragon.png",
      "grafiki/zlota/armor_robot.png", "grafiki/zlota/suit_astronaut.png", "grafiki/zlota/suit_superhero.png",
      "grafiki/zlota/suit_ninja.png", "grafiki/zlota/jacket_king.png", "grafiki/zlota/jacket_wizard.png",
      "grafiki/zlota/shirt_commando.png", "grafiki/zlota/shirt_soldier.png", "grafiki/zlota/shirt_barcelona.png",
      "grafiki/zlota/shirt_poland.png", "grafiki/zlota/pants_gold.png", "grafiki/zlota/pants_knight.png",
      "grafiki/zlota/pants_astronaut.png", "grafiki/zlota/pants_robot.png", "grafiki/zlota/pants_ninja.png",
      "grafiki/zlota/pants_superhero.png", "grafiki/zlota/pants_barcelona.png", "grafiki/zlota/pants_poland.png",
      "grafiki/zlota/shorts_gold.png"
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

const PET_FOOD_ITEMS = [
  { id: "food_apple",      name: "Jabłko",    icon: "🍎" },
  { id: "food_carrot",     name: "Marchewka", icon: "🥕" },
  { id: "food_banana",     name: "Banan",     icon: "🍌" },
  { id: "food_strawberry", name: "Truskawka", icon: "🍓" },
  { id: "food_watermelon", name: "Arbuz",     icon: "🍉" },
  { id: "food_honey",      name: "Miód",      icon: "🍯" }
];

const STICKERS_DATA = (() => {
  const cats = [
    { cat: "animals", label: "🐾 Zwierzęta", icons: ["🦁","🐯","🐘","🦒","🦓","🐒","🦍","🦏","🦛","🐊","🐢","🐍","🦎","🦖","🦕","🐬","🐳","🦈","🐙","🦀","🦞","🐠","🐡","🦅","🦉","🦜","🦩","🦚","🐧","🦢","🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐷","🐮","🐸","🦄","🐝","🦋","🐞","🐌","🦔","🐿️","🦌"] },
    { cat: "vehicles", label: "🚀 Pojazdy", icons: ["🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒","🚐","🚚","🚛","🚜","🏍️","🚲","🛴","🚂","🚆","🚇"," tram","✈️","🛫","🚁","🚀","🛸","⛵","🚤","🛳️","⛴️","⚓"] },
    { cat: "food", label: "🍓 Smakołyki", icons: ["🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🍍","🥝","🍅","🥕","🌽","🥦","🥔","🍞","🥐","🥞","🧀","🍕","🍔","🍟","🌭","🍿","🍩","🍪","🎂"] },
    { cat: "stars", label: "👑 Skarby i Sport", icons: ["⚽","🏀","🏈","⚾","🎾","🏐","🏆","🥇","🎖️","👑","💎","🎁","🎈","🎉","🎨","🎸","🎺","🥁","🧩","🧸"] }
  ];
  const list = [];
  let idx = 1;
  cats.forEach(c => {
    c.icons.forEach(ic => {
      if (idx <= 100) {
        list.push({ id: `st_${idx}`, cat: c.cat, catLabel: c.label, icon: ic.trim(), title: `Naklejka #${idx}` });
        idx++;
      }
    });
  });
  return list;
})();

const ACHIEVEMENTS_LIST = [
  { id: "stars_10",   cat: "stars",   name: "Pierwsze 10 Gwiazdek",   desc: "Zdobądź 10 złotych gwiazdek",       icon: "⭐", tier: 1, chest: "bronze", check: p => (p.stars || 0) >= 10 },
  { id: "stars_50",   cat: "stars",   name: "Kolekcjoner 50 Gwiazdek",desc: "Zdobądź 50 złotych gwiazdek",       icon: "🌟", tier: 2, chest: "silver", check: p => (p.stars || 0) >= 50 },
  { id: "stars_150",  cat: "stars",   name: "Mistrz 150 Gwiazdek",    desc: "Zdobądź 150 złotych gwiazdek",      icon: "💫", tier: 3, chest: "gold",   check: p => (p.stars || 0) >= 150 },
  { id: "stars_300",  cat: "stars",   name: "Legenda 300 Gwiazdek",   desc: "Zdobądź 300 złotych gwiazdek",      icon: "👑", tier: 4, chest: "gold",   check: p => (p.stars || 0) >= 300 },
  { id: "cups_1",     cat: "lessons", name: "Pierwszy Puchar",        desc: "Ukończ swoją pierwszą rundę",       icon: "🏆", tier: 1, chest: "bronze", check: p => (p.cups || 0) >= 1 },
  { id: "cups_5",     cat: "lessons", name: "5 Pucharów Nauki",       desc: "Ukończ 5 rund w lekcjach",          icon: "🥇", tier: 2, chest: "silver", check: p => (p.cups || 0) >= 5 },
  { id: "cups_15",    cat: "lessons", name: "15 Pucharów Mistrza",    desc: "Ukończ 15 rund w lekcjach",         icon: "🎖️", tier: 3, chest: "gold",   check: p => (p.cups || 0) >= 15 },
  { id: "perfect_1",  cat: "lessons", name: "Bezbłędna Runda",        desc: "Ukończ rundę bez ani jednego błędu",icon: "🎯", tier: 2, chest: "silver", check: p => (p.perfectRounds || 0) >= 1 },
  { id: "perfect_5",  cat: "lessons", name: "Sokole Oko (5x bez błędu)",desc: "Ukończ 5 rund bez błędu",         icon: "🦉", tier: 3, chest: "gold",   check: p => (p.perfectRounds || 0) >= 5 },
  { id: "exam_1",     cat: "lessons", name: "Zdany Wielki Sprawdzian",desc: "Ukończ Wielki Sprawdzian",          icon: "🎓", tier: 3, chest: "gold",   check: p => (p.examsDone || 0) >= 1 },
  { id: "mic_5",      cat: "lessons", name: "Odważny Mówca",          desc: "Powiedz 5 słówek do mikrofonu",     icon: "🎤", tier: 2, chest: "silver", check: p => (p.micCount || 0) >= 5 },
  { id: "streak_3",   cat: "streaks", name: "3 Dni z Rzędu",          desc: "Graj przez 3 kolejne dni",          icon: "🔥", tier: 2, chest: "silver", check: p => (p.streakDays || 0) >= 3 },
  { id: "streak_7",   cat: "streaks", name: "Tydzień Mistrza (7 dni)",desc: "Graj przez 7 dni z rzędu",          icon: "🚀", tier: 4, chest: "gold",   check: p => (p.streakDays || 0) >= 7 },
  { id: "duel_1",     cat: "battles", name: "Zwycięzca Pojedynku",    desc: "Wygraj Pojedynek Braci",            icon: "⚔️", tier: 2, chest: "silver", check: p => (p.duelsWon || 0) >= 1 },
  { id: "outfits_5",  cat: "battles", name: "Modny Bohater",          desc: "Zdobądź 5 przebrań do garderoby",   icon: "👕", tier: 2, chest: "silver", check: p => (p.unlockedItems || []).length >= 5 }
];

window._pendingPopupReward = null;
window._isOpeningChestAnim = false;

function getActiveProfileKey() {
  if (state.profile === "igor" || state.profile === "hubert" || state.profile === "tata") {
    return state.profile;
  }
  if (state.returnProfileAfterBrothers && PROFILE_META[state.returnProfileAfterBrothers]) {
    return state.returnProfileAfterBrothers;
  }
  return "igor";
}

function getRewardProfileKey(fallbackKey = null) {
  if (fallbackKey && PROFILE_META[fallbackKey]) return fallbackKey;
  return getActiveProfileKey();
}

function showRewardModalEl() {
  let modal = document.getElementById("rewardPopupModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "rewardPopupModal";
    modal.className = "fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4";
    modal.innerHTML = `<div id="rewardPopupContent" class="bg-white rounded-3xl max-w-md w-full p-6 border-4 border-amber-400 shadow-2xl text-center"></div>`;
    document.body.appendChild(modal);
  }
  modal.style.display = "flex";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  return modal;
}

function hideRewardModalEl() {
  const modal = document.getElementById("rewardPopupModal");
  if (!modal) return;
  modal.style.display = "none";
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  const content = document.getElementById("rewardPopupContent");
  if (content) content.innerHTML = "";
}

function guessOutfitSlotFromPath(src) {
  const s = String(src || "").toLowerCase();
  if (s.includes("cap") || s.includes("helmet") || s.includes("mask")) return "head";
  if (s.includes("jeans") || s.includes("pants") || s.includes("shorts")) return "legs";
  return "torso";
}

function formatOutfitDisplayName(src) {
  const raw = String(src || "").split("/").pop().replace(/\.png$/i, "");
  return raw.replace(/[_-]+/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function rollRewardForPlayer(profKey, chestType = "bronze") {
  const tierKey = CHEST_TIERS_CONFIG[chestType] ? chestType : "bronze";
  const tierCfg = CHEST_TIERS_CONFIG[tierKey];
  const p = ensurePlayerStructure(state.stats[profKey]);

  const availableOutfits = (tierCfg.outfitPool || [])
    .map(resolveOutfitPath)
    .filter(path => path && !p.unlockedItems.includes(path));

  const availablePets = COMPANION_PETS.filter(pet => !p.memoryAnimals.includes(pet.id));
  const ownedStickers = new Set(Array.isArray(state.stats.stickers) ? state.stats.stickers : []);
  const availableStickers = STICKERS_DATA.filter(st => !ownedStickers.has(st.id));

  const roll = Math.random();

  if (availableOutfits.length > 0 && roll < 0.45) {
    const pickedPath = availableOutfits[Math.floor(Math.random() * availableOutfits.length)];
    const slot = guessOutfitSlotFromPath(pickedPath);
    const slotPl = slot === "head" ? "Nakrycie głowy" : slot === "legs" ? "Spodnie / Spodenki" : "Koszulka / Strój";
    return {
      type: "outfit",
      slot,
      path: pickedPath,
      label: `${slotPl}: ${formatOutfitDisplayName(pickedPath)}`,
      icon: slot === "head" ? "🧢" : slot === "legs" ? "👖" : "👕"
    };
  }

  if (availablePets.length > 0 && roll < 0.72) {
    const pickedPet = availablePets[Math.floor(Math.random() * availablePets.length)];
    return {
      type: "pet",
      petId: pickedPet.id,
      label: `Nowy zwierzak towarzysz: ${pickedPet.pl} (${pickedPet.en})`,
      icon: pickedPet.icon
    };
  }

  if (availableStickers.length > 0 && roll < 0.90) {
    const pickedSticker = availableStickers[Math.floor(Math.random() * availableStickers.length)];
    return {
      type: "sticker",
      stickerId: pickedSticker.id,
      label: `Nowa naklejka do klasera: ${pickedSticker.title} (${pickedSticker.catLabel})`,
      icon: pickedSticker.icon
    };
  }

  const food = PET_FOOD_ITEMS[Math.floor(Math.random() * PET_FOOD_ITEMS.length)];
  const bonusStars = tierKey === "gold" ? 45 : tierKey === "silver" ? 25 : 15;
  return {
    type: "food_and_stars",
    foodId: food.id,
    foodName: food.name,
    foodIcon: food.icon,
    bonusStars,
    label: `Smakołyk do spiżarni: +1 ${food.name} oraz +${bonusStars} ⭐!`,
    icon: food.icon
  };
}

function applyRolledRewardToPlayer(profKey, reward) {
  if (!reward) return;
  const p = ensurePlayerStructure(state.stats[profKey]);

  if (reward.type === "outfit" && reward.path) {
    if (!p.unlockedItems.includes(reward.path)) p.unlockedItems.push(reward.path);
    if (!p.avatar) p.avatar = { head: "", torso: "", legs: "", pet: "" };
    p.avatar[reward.slot] = reward.path;
  } else if (reward.type === "pet" && reward.petId) {
    if (!p.memoryAnimals.includes(reward.petId)) p.memoryAnimals.push(reward.petId);
    if (!p.avatar) p.avatar = { head: "", torso: "", legs: "", pet: "" };
    p.avatar.pet = reward.petId;
  } else if (reward.type === "sticker" && reward.stickerId) {
    if (!Array.isArray(state.stats.stickers)) state.stats.stickers = [];
    if (!state.stats.stickers.includes(reward.stickerId)) state.stats.stickers.push(reward.stickerId);
  } else if (reward.type === "food_and_stars") {
    if (!p.petFood) p.petFood = {};
    p.petFood[reward.foodId] = (p.petFood[reward.foodId] || 0) + 1;
    p.stars = (p.stars || 0) + (reward.bonusStars || 15);
  }

  state.stats[profKey] = p;
  if (typeof saveCloudData === "function") saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
}

function renderChestOpeningInsidePopup(profKey, chestType = "bronze", reasonText = "Nagroda!") {
  const targetProf = getRewardProfileKey(profKey);
  const tierKey = CHEST_TIERS_CONFIG[chestType] ? chestType : "bronze";
  const tierCfg = CHEST_TIERS_CONFIG[tierKey];
  const modal = showRewardModalEl();
  const box = document.getElementById("rewardPopupContent");
  if (!modal || !box) return;

  window._pendingPopupReward = { profKey: targetProf, chestType: tierKey, reasonText };
  window._isOpeningChestAnim = false;

  const playerName = PROFILE_META[targetProf] ? PROFILE_META[targetProf].name : "GRACZ";

  box.innerHTML = `
    <div class="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs mb-2">
      🎁 Nagroda dla: ${playerName}
    </div>
    <h3 class="text-2xl font-extrabold text-slate-900 mb-1">${tierCfg.name}</h3>
    <p class="text-xs font-bold text-slate-600 mb-4">${reasonText}</p>
    <div onclick="triggerChestUnboxAnimation()"
      class="kid-card cursor-pointer w-48 h-48 mx-auto rounded-3xl bg-gradient-to-b from-amber-100 to-amber-300 border-4 border-amber-500 shadow-xl flex flex-col items-center justify-center p-3">
      <span class="text-7xl float-anim drop-shadow select-none">${tierCfg.icon}</span>
      <span class="mt-3 px-3.5 py-1.5 rounded-full bg-amber-600 text-white font-extrabold text-xs shadow animate-pulse">👆 Kliknij skrzynię!</span>
    </div>
    <button type="button" onclick="triggerChestUnboxAnimation()"
      class="kid-card mt-4 w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-base shadow-lg">
      🔓 Otwórz teraz!
    </button>
  `;
}

function triggerChestUnboxAnimation() {
  if (window._isOpeningChestAnim || !window._pendingPopupReward) return;
  window._isOpeningChestAnim = true;
  if (typeof playEffect === "function") playEffect("beep");

  const { profKey, chestType, reasonText } = window._pendingPopupReward;
  const tierCfg = CHEST_TIERS_CONFIG[chestType] || CHEST_TIERS_CONFIG.bronze;
  const rolled = rollRewardForPlayer(profKey, chestType);
  applyRolledRewardToPlayer(profKey, rolled);
  window._pendingPopupReward.rolled = rolled;

  const box = document.getElementById("rewardPopupContent");
  if (box) {
    const outfitPreviewHtml = (rolled.type === "outfit" && rolled.path)
      ? `<img src="${rolled.path}" class="w-24 h-24 object-contain mx-auto mb-2 drop-shadow-md pop-correct" onerror="this.style.display='none';" />`
      : `<div class="text-7xl mb-2 pop-correct">${rolled.icon}</div>`;

    box.innerHTML = `
      ${outfitPreviewHtml}
      <h3 class="text-2xl font-extrabold text-emerald-700 mb-1">Hurra! Zdobyto nagrodę!</h3>
      <p class="text-xs font-bold text-slate-500 mb-3">${tierCfg.name} • ${reasonText}</p>
      <div class="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 font-extrabold text-base md:text-lg text-slate-900 mb-5">
        ${rolled.label}
      </div>
      <button type="button" onclick="claimRewardAndClosePopup()"
        class="kid-card w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg">
        ✅ Super! Odbierz ▶
      </button>
    `;
  }
  if (typeof playEffect === "function") playEffect("fanfare");
  if (typeof speakSequence === "function") {
    speakSequence([{ lang: "pl", text: `Brawo! Otworzyłeś skrzynię! Twoja nagroda to: ${rolled.label}` }]);
  }
}

function claimRewardAndClosePopup() {
  window._pendingPopupReward = null;
  window._isOpeningChestAnim = false;
  hideRewardModalEl();

  if (Array.isArray(state.rewardQueue) && state.rewardQueue.length > 0) {
    setTimeout(() => processNextRewardInQueue(), 220);
    return;
  }

  const avatarModal = document.getElementById("avatarModal");
  if (avatarModal && !avatarModal.classList.contains("hidden") && typeof openAvatarModal === "function") {
    openAvatarModal();
  }
}

function processNextRewardInQueue() {
  if (!Array.isArray(state.rewardQueue) || state.rewardQueue.length === 0) {
    hideRewardModalEl();
    return;
  }
  const next = state.rewardQueue.shift();
  const profKey = getRewardProfileKey(next.profKey);
  const chestType = next.chestType || "bronze";
  const reason = (next.achievement && next.achievement.name) ? next.achievement.name : "Nagroda za postępy!";
  renderChestOpeningInsidePopup(profKey, chestType, reason);
}

function buyAndOpenChest(chestType) {
  const tierKey = CHEST_TIERS_CONFIG[chestType] ? chestType : "bronze";
  const tierCfg = CHEST_TIERS_CONFIG[tierKey];
  const profKey = getRewardProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);

  if ((p.stars || 0) < tierCfg.costStars) {
    if (typeof playEffect === "function") playEffect("wrong");
    if (typeof speakSequence === "function") {
      speakSequence([{ lang: "pl", text: `Masz ${p.stars || 0} gwiazdek, a ${tierCfg.name} kosztuje ${tierCfg.costStars} gwiazdek. Zdobądź jeszcze ${tierCfg.costStars - (p.stars || 0)} gwiazdek w lekcjach!` }]);
    }
    return;
  }

  p.stars -= tierCfg.costStars;
  state.stats[profKey] = p;
  if (typeof saveCloudData === "function") saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  renderChestOpeningInsidePopup(profKey, tierKey, `Zakupiono za ${tierCfg.costStars} ⭐`);
}

function openPendingChestByIndex(profKey, idx) {
  const targetProf = getRewardProfileKey(profKey);
  const p = ensurePlayerStructure(state.stats[targetProf]);
  if (!Array.isArray(p.pendingChests) || !p.pendingChests[idx]) return;
  const item = p.pendingChests.splice(idx, 1)[0];
  state.stats[targetProf] = p;
  if (typeof saveCloudData === "function") saveCloudData();
  const tierKey = typeof item === "string" ? item : (item.tier || "bronze");
  const reason = (typeof item === "object" && item.reason) ? item.reason : "Prezent od Taty! 🎁";
  renderChestOpeningInsidePopup(targetProf, tierKey, reason);
}

function checkAndUnlockAchievements(profKey) {
  if (!PROFILE_META[profKey] || !state.stats[profKey]) return;
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (!Array.isArray(p.badges)) p.badges = [];

  let unlockedAny = false;
  ACHIEVEMENTS_LIST.forEach(ach => {
    if (!p.badges.includes(ach.id) && ach.check(p)) {
      p.badges.push(ach.id);
      unlockedAny = true;
      state.rewardQueue.push({
        profKey,
        achievement: { name: `🏅 Odznaka: ${ach.name}` },
        chestType: ach.chest || "bronze"
      });
    }
  });

  state.stats[profKey] = p;
  if (unlockedAny && typeof saveCloudData === "function") {
    saveCloudData();
    if (typeof updateHeaderUI === "function") updateHeaderUI();
  }
}

function speakAvatarGreeting() {
  const profKey = getRewardProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  const name = PROFILE_META[profKey] ? PROFILE_META[profKey].name : "Bohaterze";
  const stars = p.stars || 0;

  let affordMsg = "Zbieraj gwiazdki w lekcjach, aby otworzyć Brązową Skrzynię za 50 gwiazdek!";
  if (stars >= 250) affordMsg = "Masz mnóstwo gwiazdek! Możesz otworzyć nawet Złotą Skrzynię za 250 gwiazdek!";
  else if (stars >= 120) affordMsg = "Wystarczy Ci już na Srebrną Skrzynię za 120 gwiazdek lub dwie Brązowe!";
  else if (stars >= 50) affordMsg = "Super! Możesz już otworzyć Brązową Skrzynię za 50 gwiazdek!";

  if (typeof speakSequence === "function") {
    speakSequence([{ lang: "pl", text: `Cześć ${name}! Masz teraz ${stars} złotych gwiazdek. ${affordMsg}` }]);
  }
}

function openAvatarModal() {
  const modal = document.getElementById("avatarModal");
  const itemsBox = document.getElementById("avatarItemsContainer");
  const previewBox = document.getElementById("avatarPreviewBox");
  const nameEl = document.getElementById("avatarModalPlayerName");
  if (!modal || !itemsBox || !previewBox) return;

  const profKey = getRewardProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (nameEl) nameEl.textContent = PROFILE_META[profKey] ? PROFILE_META[profKey].name : "GRACZ";

  const activePetObj = COMPANION_PETS.find(pet => pet.id === (p.avatar && p.avatar.pet));
  const petXp = activePetObj ? ((p.petXp && p.petXp[activePetObj.id]) || 0) : 0;
  const lvInfo = typeof getPetLevelInfo === "function" ? getPetLevelInfo(petXp) : { level: 1, inLevel: 0, nextTarget: 3 };

  previewBox.innerHTML = `
    <div onclick="speakAvatarGreeting()" class="cursor-pointer my-2">
      ${typeof renderBoyAvatarSvg === "function" ? renderBoyAvatarSvg(profKey, 150) : "👦"}
    </div>
    <div class="text-base font-extrabold text-indigo-950 mt-1">Masz: ⭐ ${p.stars || 0} gwiazdek</div>
    <button type="button" onclick="speakAvatarGreeting()" class="kid-card mt-2 px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs shadow">
      🦉💬 Zapytaj Sówkę o skrzynie
    </button>
    ${activePetObj ? `
      <div class="mt-3 p-2.5 rounded-2xl bg-white border border-indigo-200 w-full text-xs">
        <div class="font-extrabold text-slate-900">Towarzysz: ${activePetObj.icon} ${activePetObj.pl} (Poziom ${lvInfo.level})</div>
        <div class="text-[11px] text-slate-500 mt-0.5">Postęp przyjaźni: ${lvInfo.inLevel}/${lvInfo.nextTarget} nakarmień</div>
      </div>
    ` : ""}
  `;

  const pendingList = Array.isArray(p.pendingChests) ? p.pendingChests : [];
  const pendingChestsHtml = pendingList.length > 0
    ? `
      <div class="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-400">
        <div class="text-xs font-extrabold text-emerald-950 uppercase mb-2">🎁 Skrzynie czekające na otwarcie (${pendingList.length})</div>
        <div class="flex flex-wrap gap-2">
          ${pendingList.map((c, idx) => {
            const tierKey = typeof c === "string" ? c : (c.tier || "bronze");
            const tierCfg = CHEST_TIERS_CONFIG[tierKey] || CHEST_TIERS_CONFIG.bronze;
            const reason = (typeof c === "object" && c.reason) ? c.reason : "Prezent";
            return `
              <button type="button" onclick="openPendingChestByIndex('${profKey}', ${idx})"
                class="kid-card px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow flex items-center gap-1.5">
                <span>${tierCfg.icon}</span>
                <span>Otwórz: ${tierCfg.name}</span>
                <span class="opacity-90">(${reason})</span>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `
    : "";

  const activeTier = state.selectedWardrobeTier || "all";
  const tierTabs = [
    { id: "all", label: "Wszystkie" },
    { id: "bronze", label: "📦 Brązowe" },
    { id: "silver", label: "🥈 Srebrne" },
    { id: "gold", label: "👑 Złote" }
  ];

  let outfitsToShow = [];
  if (activeTier === "all") {
    outfitsToShow = Object.values(CHEST_TIERS_CONFIG).flatMap(t => t.outfitPool.map(resolveOutfitPath));
  } else if (CHEST_TIERS_CONFIG[activeTier]) {
    outfitsToShow = CHEST_TIERS_CONFIG[activeTier].outfitPool.map(resolveOutfitPath);
  }
  outfitsToShow = Array.from(new Set(outfitsToShow));

  const totalAllOutfits = Array.from(new Set(Object.values(CHEST_TIERS_CONFIG).flatMap(t => t.outfitPool.map(resolveOutfitPath)))).length;

  const foodTotalCount = Object.values(p.petFood || {}).reduce((acc, v) => acc + (v || 0), 0);

  itemsBox.innerHTML = `
    ${pendingChestsHtml}

    <div class="p-3 rounded-2xl bg-amber-50 border-2 border-amber-300">
      <div class="text-xs font-extrabold text-amber-950 uppercase mb-2">🎁 Sklepik ze Skrzyniami (masz ⭐ ${p.stars || 0})</div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
        ${Object.values(CHEST_TIERS_CONFIG).map(t => {
          const canAfford = (p.stars || 0) >= t.costStars;
          return `
            <button type="button" onclick="buyAndOpenChest('${t.id}')"
              class="kid-card p-3 rounded-2xl border-2 font-extrabold text-xs flex flex-col items-center gap-1 shadow-sm ${
                canAfford ? "bg-white hover:bg-amber-100 border-amber-400 text-slate-900 ring-2 ring-amber-300" : "bg-slate-100 border-slate-200 text-slate-400"
              }">
              <span class="text-3xl">${t.icon}</span>
              <span>${t.name}</span>
              <span class="px-2 py-0.5 rounded-lg ${canAfford ? "bg-emerald-500 text-white" : "bg-amber-200 text-amber-950"}">${t.costStars} ⭐</span>
            </button>
          `;
        }).join("")}
      </div>
    </div>

    <div class="p-3 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div class="text-xs font-extrabold text-indigo-950 uppercase">👕 Garderoba (${p.unlockedItems.length}/${totalAllOutfits})</div>
        <div class="flex flex-wrap gap-1">
          ${tierTabs.map(tb => `
            <button type="button" onclick="state.selectedWardrobeTier='${tb.id}'; openAvatarModal();"
              class="px-2 py-1 rounded-lg font-extrabold text-[11px] border ${activeTier === tb.id ? "bg-indigo-600 text-white border-indigo-700" : "bg-white text-slate-700 border-slate-300"}">
              ${tb.label}
            </button>
          `).join("")}
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
        ${outfitsToShow.map(src => {
          const unlocked = p.unlockedItems.includes(src);
          const slot = guessOutfitSlotFromPath(src);
          const equipped = p.avatar && p.avatar[slot] === src;
          const label = formatOutfitDisplayName(src);
          const fb = typeof getFallbackOutfitPath === "function" ? getFallbackOutfitPath(src) : src;
          return `
            <button type="button" ${unlocked ? `onclick="toggleEquipOutfit('${profKey}','${slot}','${src}')"` : "disabled"}
              class="p-2 rounded-xl border-2 text-xs font-bold flex items-center gap-2 text-left ${
                equipped ? "bg-emerald-100 border-emerald-500 text-emerald-950" : (unlocked ? "bg-white border-indigo-300 text-slate-800 hover:bg-indigo-50" : "bg-slate-100 border-slate-200 text-slate-400 opacity-60")
              }">
              ${unlocked
                ? `<img src="${src}" class="w-9 h-9 object-contain shrink-0" onerror="if(this.src.indexOf('srebrna/zlota')===-1 && '${fb}'!=='${src}'){this.src='${fb}';}else{this.style.display='none';}" />`
                : `<span class="text-xl shrink-0">🔒</span>`}
              <span class="truncate flex-1">${label}</span>
              ${equipped ? "<span class='text-xs font-extrabold text-emerald-700'>✓</span>" : ""}
            </button>
          `;
        }).join("")}
      </div>
    </div>

    <div class="p-3 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200">
      <div class="text-xs font-extrabold text-emerald-950 uppercase mb-2">🐾 Zwierzaki Towarzysze (${p.memoryAnimals.length}/${COMPANION_PETS.length})</div>
      <div class="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-44 overflow-y-auto pr-1">
        ${COMPANION_PETS.map(pet => {
          const unlocked = p.memoryAnimals.includes(pet.id);
          const equipped = p.avatar && p.avatar.pet === pet.id;
          return `
            <button type="button" ${unlocked ? `onclick="toggleEquipPet('${profKey}','${pet.id}')"` : "disabled"}
              class="p-2 rounded-xl border-2 text-center flex flex-col items-center ${
                equipped ? "bg-emerald-200 border-emerald-600 text-emerald-950 font-extrabold" : (unlocked ? "bg-white border-emerald-300 text-slate-800 hover:bg-emerald-50 font-bold" : "bg-slate-100 border-slate-200 text-slate-400 opacity-55")
              }">
              <span class="text-2xl">${unlocked ? pet.icon : "🔒"}</span>
              <span class="text-[10px] truncate w-full mt-0.5">${pet.pl}</span>
            </button>
          `;
        }).join("")}
      </div>
    </div>

    <div class="p-3 rounded-2xl bg-rose-50/70 border-2 border-rose-200">
      <div class="text-xs font-extrabold text-rose-950 uppercase mb-2">🍎 Spiżarnia Zwierzaka (Smakołyki: ${foodTotalCount})</div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        ${PET_FOOD_ITEMS.map(f => {
          const qty = (p.petFood && p.petFood[f.id]) || 0;
          return `
            <button type="button" ${qty > 0 ? `onclick="feedCompanionPet('${profKey}','${f.id}')"` : "disabled"}
              class="p-2 rounded-xl border-2 text-xs font-bold flex items-center justify-between ${
                qty > 0 ? "bg-white border-rose-400 text-slate-900 hover:bg-rose-100" : "bg-slate-100 border-slate-200 text-slate-400 opacity-60"
              }">
              <span>${f.icon} ${f.name}</span>
              <span class="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-900 font-extrabold">x${qty}</span>
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;

  modal.style.display = "flex";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeAvatarModal() {
  const modal = document.getElementById("avatarModal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function toggleEquipOutfit(profKey, slot, src) {
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (!p.unlockedItems.includes(src)) return;
  if (!p.avatar) p.avatar = { head: "", torso: "", legs: "", pet: "" };
  p.avatar[slot] = p.avatar[slot] === src ? "" : src;
  state.stats[profKey] = p;
  if (typeof saveCloudData === "function") saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  openAvatarModal();
}

function toggleEquipPet(profKey, petId) {
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (!p.memoryAnimals.includes(petId)) return;
  if (!p.avatar) p.avatar = { head: "", torso: "", legs: "", pet: "" };
  p.avatar.pet = p.avatar.pet === petId ? "" : petId;
  state.stats[profKey] = p;
  if (typeof saveCloudData === "function") saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  openAvatarModal();
}

function feedCompanionPet(profKey, foodId) {
  const p = ensurePlayerStructure(state.stats[profKey]);
  const petId = p.avatar && p.avatar.pet;
  if (!petId) {
    if (typeof speakSequence === "function") {
      speakSequence([{ lang: "pl", text: "Wybierz najpierw zwierzaka towarzysza z listy powyżej, aby go nakarmić!" }]);
    }
    return;
  }
  if (!p.petFood || (p.petFood[foodId] || 0) <= 0) return;
  p.petFood[foodId] -= 1;
  if (!p.petXp) p.petXp = {};
  p.petXp[petId] = (p.petXp[petId] || 0) + 1;
  state.stats[profKey] = p;
  if (typeof advanceDailyQuestProgress === "function") advanceDailyQuestProgress(profKey, "feed_pet", 1);
  if (typeof saveCloudData === "function") saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  if (typeof playEffect === "function") playEffect("success");
  openAvatarModal();
  const petObj = COMPANION_PETS.find(x => x.id === petId);
  if (typeof speakSequence === "function" && petObj) {
    speakSequence([{ lang: "pl", text: `Mniam! ${petObj.pl} zjadł smakołyk i rośnie Wasza przyjaźń!` }]);
  }
}

function openStickersModal() {
  const modal = document.getElementById("stickersModal");
  const grid = document.getElementById("stickersGrid");
  const tabs = document.getElementById("stickerCategoryTabs");
  const totalEl = document.getElementById("stickerModalTotal");
  if (!modal || !grid) return;

  const owned = new Set(Array.isArray(state.stats.stickers) ? state.stats.stickers : []);
  if (totalEl) totalEl.textContent = owned.size;

  const catList = [
    { id: "all", label: `Wszystkie (${owned.size}/100)` },
    { id: "animals", label: "🐾 Zwierzęta" },
    { id: "vehicles", label: "🚀 Pojazdy" },
    { id: "food", label: "🍓 Smakołyki" },
    { id: "stars", label: "👑 Skarby i Sport" }
  ];
  const activeCat = state.selectedStickerCat || "all";

  if (tabs) {
    tabs.innerHTML = catList.map(c => `
      <button type="button" onclick="state.selectedStickerCat='${c.id}'; openStickersModal();"
        class="px-3 py-1.5 rounded-xl font-extrabold text-xs border-2 ${activeCat === c.id ? "bg-pink-600 text-white border-pink-700" : "bg-white text-pink-900 border-pink-200"}">
        ${c.label}
      </button>
    `).join("");
  }

  const filtered = activeCat === "all" ? STICKERS_DATA : STICKERS_DATA.filter(s => s.cat === activeCat);
  grid.innerHTML = filtered.map(st => {
    const hasIt = owned.has(st.id);
    return `
      <div class="p-3 rounded-2xl border-2 flex flex-col items-center justify-center ${hasIt ? "bg-white border-pink-400 shadow-sm" : "bg-slate-100 border-slate-200 opacity-50"}">
        <span class="text-4xl mb-1">${hasIt ? st.icon : "❓"}</span>
        <span class="text-[11px] font-extrabold text-slate-800">${st.title}</span>
      </div>
    `;
  }).join("");

  modal.style.display = "flex";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeStickersModal() {
  const modal = document.getElementById("stickersModal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function openBadgesModal() {
  const modal = document.getElementById("badgesModal");
  const grid = document.getElementById("badgesGrid");
  const tabs = document.getElementById("badgeCategoryTabs");
  const nameEl = document.getElementById("badgesModalPlayerName");
  if (!modal || !grid) return;

  const profKey = getRewardProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (nameEl) nameEl.textContent = PROFILE_META[profKey] ? PROFILE_META[profKey].name : "GRACZ";

  const owned = new Set(Array.isArray(p.badges) ? p.badges : []);
  const catList = [
    { id: "all", label: `Wszystkie (${owned.size}/${ACHIEVEMENTS_LIST.length})` },
    { id: "stars", label: "⭐ Gwiazdki" },
    { id: "lessons", label: "🏆 Lekcje i Sprawdziany" },
    { id: "streaks", label: "🔥 Seria dni" },
    { id: "battles", label: "⚔️ Pojedynki i Garderoba" }
  ];
  const activeCat = state.selectedBadgeCat || "all";

  if (tabs) {
    tabs.innerHTML = catList.map(c => `
      <button type="button" onclick="state.selectedBadgeCat='${c.id}'; openBadgesModal();"
        class="px-3 py-1.5 rounded-xl font-extrabold text-xs border-2 ${activeCat === c.id ? "bg-amber-600 text-white border-amber-700" : "bg-white text-amber-900 border-amber-200"}">
        ${c.label}
      </button>
    `).join("");
  }

  const filtered = activeCat === "all" ? ACHIEVEMENTS_LIST : ACHIEVEMENTS_LIST.filter(a => a.cat === activeCat);
  grid.innerHTML = filtered.map(ach => {
    const unlocked = owned.has(ach.id);
    const chestLabel = ach.chest === "gold" ? "👑 Złota" : ach.chest === "silver" ? "🥈 Srebrna" : "📦 Brązowa";
    return `
      <div class="p-3.5 rounded-2xl border-2 flex items-start gap-3 ${unlocked ? "bg-white border-amber-400 shadow-sm" : "bg-slate-100 border-slate-200 opacity-65"}">
        <span class="text-4xl shrink-0">${unlocked ? ach.icon : "🔒"}</span>
        <div>
          <div class="font-extrabold text-sm text-slate-900">${ach.name}</div>
          <div class="text-xs text-slate-600 mt-0.5">${ach.desc}</div>
          <div class="mt-1.5 inline-block px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 font-bold text-[10px]">Nagroda: ${chestLabel} Skrzynia</div>
        </div>
      </div>
    `;
  }).join("");

  modal.style.display = "flex";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeBadgesModal() {
  const modal = document.getElementById("badgesModal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function openGuideModal() {
  const modal = document.getElementById("guideModal");
  if (!modal) return;
  if (typeof syncVersionLabelsInDom === "function") syncVersionLabelsInDom();
  modal.style.display = "flex";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeGuideModal() {
  const modal = document.getElementById("guideModal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function unlockAllOutfitsForTesting() {
  const allOutfits = Object.values(CHEST_TIERS_CONFIG).flatMap(t => (t.outfitPool || []).map(resolveOutfitPath));
  const uniqueOutfits = Array.from(new Set(allOutfits));
  const allPets = COMPANION_PETS.map(pet => pet.id);
  ["igor", "hubert", "tata"].forEach(k => {
    const p = ensurePlayerStructure(state.stats[k]);
    p.unlockedItems = Array.from(new Set([...p.unlockedItems, ...uniqueOutfits]));
    p.memoryAnimals = Array.from(new Set([...p.memoryAnimals, ...allPets]));
    state.stats[k] = p;
  });
  if (typeof saveCloudData === "function") saveCloudData();
  if (typeof showParentStatus === "function") showParentStatus("🔓 Odblokowano wszystkie ubranka i zwierzaki dla testów!");
}

function lockAllOutfitsAfterTesting() {
  ["igor", "hubert", "tata"].forEach(k => {
    const p = ensurePlayerStructure(state.stats[k]);
    p.unlockedItems = [];
    p.memoryAnimals = [];
    p.avatar = { head: "", torso: "", legs: "", pet: "" };
    state.stats[k] = p;
  });
  if (typeof saveCloudData === "function") saveCloudData();
  if (typeof showParentStatus === "function") showParentStatus("🔒 Zablokowano testowe ubranka i zwierzaki.");
}
