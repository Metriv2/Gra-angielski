/* ============================================================================
   PLIK: js/05-avatar-wardrobe.js
   GARDEROBA, ZWIERZAKI, SPIŻARNIA, SYSTEM SKRZYŃ ORAZ ASYSTENT ZAKUPOWY
   ============================================================================ */

const CHEST_PRICES = {
  bronze: 50,
  silver: 120,
  gold: 250
};

const WARDROBE_ITEMS = [
  // Koszulki
  { id: "shirt_basic",   slot: "shirt",     name: "Koszulka Odkrywcy", icon: "👕", rarity: "bronze" },
  { id: "shirt_hero",    slot: "shirt",     name: "Strój Superbohatera", icon: "🦸", rarity: "silver" },
  { id: "shirt_knight",  slot: "shirt",     name: "Zbroja Rycerza",    icon: "🛡️", rarity: "silver" },
  { id: "shirt_astro",   slot: "shirt",     name: "Skafander Kosmity", icon: "🧑‍🚀", rarity: "gold" },
  { id: "shirt_king",    slot: "shirt",     name: "Szata Królewska",   icon: "👘", rarity: "gold" },
  // Spodnie
  { id: "pants_basic",   slot: "pants",     name: "Wygodne Spodnie",   icon: "👖", rarity: "bronze" },
  { id: "pants_sport",   slot: "pants",     name: "Spodenki Sportowe", icon: "🩳", rarity: "bronze" },
  { id: "pants_magic",   slot: "pants",     name: "Magiczne Nogawice", icon: "✨", rarity: "silver" },
  // Buty
  { id: "shoes_basic",   slot: "shoes",     name: "Trampki",           icon: "👟", rarity: "bronze" },
  { id: "shoes_rocket",  slot: "shoes",     name: "Buty Rakietowe",    icon: "🚀", rarity: "silver" },
  { id: "shoes_gold",    slot: "shoes",     name: "Złote Sandały",     icon: "👑", rarity: "gold" },
  // Czapki
  { id: "hat_cap",       slot: "hat",       name: "Czapka z Daszkiem", icon: "🧢", rarity: "bronze" },
  { id: "hat_wizard",    slot: "hat",       name: "Kapelusz Czarodzieja",icon: "🧙", rarity: "silver" },
  { id: "hat_crown",     slot: "hat",       name: "Złota Korona",      icon: "👑", rarity: "gold" },
  { id: "hat_pirate",    slot: "hat",       name: "Kapelusz Pirata",   icon: "🏴‍☠️", rarity: "silver" },
  // Dodatki
  { id: "acc_glasses",   slot: "accessory", name: "Okulary Mądrali",   icon: "👓", rarity: "bronze" },
  { id: "acc_sword",     slot: "accessory", name: "Miecz Pogromcy Smoków", icon: "⚔️", rarity: "gold" },
  { id: "acc_wand",      slot: "accessory", name: "Czarodziejska Różdżka", icon: "🪄", rarity: "silver" }
];

const COMPANION_PETS = [
  { id: "owl",     en: "Owl",     pl: "Mądra Sówka",   icon: "🦉", rarity: "bronze" },
  { id: "dog",     en: "Puppy",   pl: "Szczeniaczek",  icon: "🐶", rarity: "bronze" },
  { id: "cat",     en: "Kitten",  pl: "Kotek",         icon: "🐱", rarity: "bronze" },
  { id: "fox",     en: "Fox",     pl: "Lisek",         icon: "🦊", rarity: "silver" },
  { id: "panda",   en: "Panda",   pl: "Panda",         icon: "🐼", rarity: "silver" },
  { id: "lion",    en: "Lion",    pl: "Lew",           icon: "🦁", rarity: "silver" },
  { id: "dragon",  en: "Dragon",  pl: "Mały Smok",     icon: "🐲", rarity: "gold" },
  { id: "unicorn", en: "Unicorn", pl: "Jednorożec",    icon: "🦄", rarity: "gold" }
];

const STICKERS_BOOK = [
  { id: "st_star",    name: "Złota Gwiazda",   icon: "🌟" },
  { id: "st_rocket",  name: "Kosmiczny Lot",   icon: "🚀" },
  { id: "st_dino",    name: "T-Rex",           icon: "🦖" },
  { id: "st_pancake", name: "Mistrz Pankejków",icon: "🥞" },
  { id: "st_dragon",  name: "Pogromca Smoka",  icon: "🐉" },
  { id: "st_trophy",  name: "Super Puchar",    icon: "🏆" }
];

const PANTRY_FOODS = [
  { id: "apple",  en: "Apple",  pl: "Jabłko",    icon: "🍎" },
  { id: "banana", en: "Banana", pl: "Banan",     icon: "🍌" },
  { id: "carrot", en: "Carrot", pl: "Marchewka", icon: "🥕" }
];

// 1. ASYSTENT ZAKUPOWY W AWATARZE (MÓWI ILE MASZ GWIAZDEK, CO KUPISZ I ILE BRAKUJE)
function getShoppingAssistantReport(profKey) {
  const p = ensurePlayerStructure(state.stats[profKey || getActiveProfileKey()]);
  const stars = p.stars || 0;

  let canBuyList = [];
  if (stars >= CHEST_PRICES.bronze) canBuyList.push("Brązową Skrzynię (50 ⭐)");
  if (stars >= CHEST_PRICES.silver) canBuyList.push("Srebrną Skrzynię (120 ⭐)");
  if (stars >= CHEST_PRICES.gold)   canBuyList.push("Złotą Skrzynię (250 ⭐)");

  let missingTextPl = "";
  let missingVoicePl = "";

  if (stars < CHEST_PRICES.bronze) {
    const diff = CHEST_PRICES.bronze - stars;
    missingTextPl = `Masz <strong>${stars} ⭐</strong>. Do Brązowej Skrzyni (50 ⭐) brakuje Ci jeszcze tylko <strong>${diff} ⭐</strong>!`;
    missingVoicePl = `Masz ${stars} gwiazdek. Do brązowej skrzyni brakuje Ci jeszcze tylko ${diff} gwiazdek!`;
  } else if (stars < CHEST_PRICES.silver) {
    const diff = CHEST_PRICES.silver - stars;
    missingTextPl = `Masz <strong>${stars} ⭐</strong>! Możesz już kupić <strong>Brązową Skrzynię</strong>, a do Srebrnej (120 ⭐) brakuje Ci <strong>${diff} ⭐</strong>.`;
    missingVoicePl = `Masz ${stars} gwiazdek! Możesz już otworzyć brązową skrzynię, a do srebrnej brakuje Ci ${diff} gwiazdek.`;
  } else if (stars < CHEST_PRICES.gold) {
    const diff = CHEST_PRICES.gold - stars;
    missingTextPl = `Masz <strong>${stars} ⭐</strong>! Stać Cię na <strong>Brązową lub Srebrną Skrzynię</strong>! Do Złotej Skrzyni (250 ⭐) brakuje Ci <strong>${diff} ⭐</strong>.`;
    missingVoicePl = `Masz ${stars} gwiazdek! Możesz kupić brązową albo srebrną skrzynię! Do złotej skrzyni brakuje Ci jeszcze ${diff} gwiazdek.`;
  } else {
    missingTextPl = `Wow! Masz aż <strong>${stars} ⭐</strong>! Stać Cię na <strong>każdą skrzynię – nawet Złotą (250 ⭐)</strong>!`;
    missingVoicePl = `Wow! Masz aż ${stars} gwiazdek! Możesz kupić dowolną skrzynię, nawet złotą!`;
  }

  return { stars, canBuyList, missingTextPl, missingVoicePl };
}

function speakShoppingAssistant() {
  const profKey = getActiveProfileKey();
  const report = getShoppingAssistantReport(profKey);
  const bubble = document.getElementById("avatarAssistantBubble");
  if (bubble) {
    bubble.innerHTML = `🦉 ${report.missingTextPl}`;
    bubble.classList.remove("hidden");
  }
  playEffect("beep");
  speakSequence([{ lang: "pl", text: report.missingVoicePl }]);
}

// 2. OTWARCIE PANELU AWATARA, GARDEROBY, ZWIERZAKÓW I SKLEPIKU ZE SKRZYNIAMI
function openAvatarWardrobeModal(activeTab = "wardrobe") {
  const profKey = getActiveProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("modalContent");
  if (!overlay || !content) return;

  const petObj = COMPANION_PETS.find(x => x.id === p.equipped.pet) || COMPANION_PETS[0];
  const petLevel = Math.floor(((p.petXp && p.petXp[petObj.id]) || 0) / 3) + 1;
  const report = getShoppingAssistantReport(profKey);

  // Automatyczne sortowanie: odblokowane przedmioty na samej górze
  const sortedClothes = [...WARDROBE_ITEMS].sort((a, b) => {
    const aUn = p.unlockedClothes.includes(a.id) ? 0 : 1;
    const bUn = p.unlockedClothes.includes(b.id) ? 0 : 1;
    return aUn - bUn;
  });

  const sortedPets = [...COMPANION_PETS].sort((a, b) => {
    const aUn = p.unlockedPets.includes(a.id) ? 0 : 1;
    const bUn = p.unlockedPets.includes(b.id) ? 0 : 1;
    return aUn - bUn;
  });

  const getEquippedIcon = (slot) => {
    const item = WARDROBE_ITEMS.find(i => i.id === p.equipped[slot]);
    return item ? item.icon : "";
  };

  let tabBodyHtml = "";

  if (activeTab === "wardrobe") {
    tabBodyHtml = `
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
        ${sortedClothes.map(item => {
          const unlocked = p.unlockedClothes.includes(item.id);
          const equipped = p.equipped[item.slot] === item.id;
          return `
            <button onclick="${unlocked ? `equipWardrobeItem('${item.id}')` : `playEffect('wrong')`}"
              class="kid-card p-3 rounded-2xl border-2 text-center flex flex-col items-center justify-between ${
                equipped ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400"
                : unlocked ? "border-sky-200 bg-white hover:border-sky-400"
                : "border-slate-200 bg-slate-100 opacity-55"
              }">
              <span class="text-3xl mb-1">${unlocked ? item.icon : "🔒"}</span>
              <span class="font-extrabold text-xs text-slate-800 leading-tight">${item.name}</span>
              <span class="text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full ${
                equipped ? "bg-emerald-500 text-white" : unlocked ? "bg-sky-100 text-sky-800" : "bg-slate-200 text-slate-600"
              }">${equipped ? "Założone ✓" : unlocked ? "Załóż" : "Ze skrzyni"}</span>
            </button>
          `;
        }).join("")}
      </div>
    `;
  } else if (activeTab === "pets") {
    tabBodyHtml = `
      <div class="mb-3 p-3 rounded-2xl bg-amber-50 border-2 border-amber-200 flex flex-wrap items-center justify-between gap-2">
        <div class="text-xs font-extrabold text-amber-900">🍎 Spiżarnia (nakarm ${petObj.pl}, Poziom ${petLevel}):</div>
        <div class="flex gap-1.5">
          ${PANTRY_FOODS.map(f => {
            const qty = (p.pantry && p.pantry[f.id]) || 0;
            return `
              <button onclick="feedActivePet('${f.id}')" ${qty <= 0 ? "disabled" : ""}
                class="kid-card px-2.5 py-1.5 rounded-xl border-2 text-xs font-extrabold flex items-center gap-1 ${
                  qty > 0 ? "bg-white border-amber-400 hover:bg-amber-100 text-slate-800" : "bg-slate-100 border-slate-200 opacity-45"
                }">
                <span>${f.icon}</span><span>${qty}</span>
              </button>
            `;
          }).join("")}
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto pr-1">
        ${sortedPets.map(pet => {
          const unlocked = p.unlockedPets.includes(pet.id);
          const equipped = p.equipped.pet === pet.id;
          return `
            <button onclick="${unlocked ? `equipCompanionPet('${pet.id}')` : `playEffect('wrong')`}"
              class="kid-card p-3 rounded-2xl border-2 text-center flex flex-col items-center ${
                equipped ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400"
                : unlocked ? "border-purple-200 bg-white hover:border-purple-400"
                : "border-slate-200 bg-slate-100 opacity-55"
              }">
              <span class="text-4xl mb-1">${unlocked ? pet.icon : "🔒"}</span>
              <span class="font-extrabold text-xs text-slate-800">${pet.pl}</span>
              <span class="text-[10px] text-slate-500 font-bold">${pet.en}</span>
            </button>
          `;
        }).join("")}
      </div>
    `;
  } else if (activeTab === "chests") {
    tabBodyHtml = `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="p-4 rounded-2xl border-3 border-amber-600/40 bg-amber-50/70 text-center flex flex-col justify-between">
          <div>
            <div class="text-5xl mb-1">📦</div>
            <div class="font-extrabold text-amber-950 text-base">Brązowa Skrzynia</div>
            <div class="text-xs text-slate-600 font-bold mb-3">Ubrania, naklejki i smakołyki</div>
          </div>
          <button onclick="buyChestWithStars('bronze')" class="kid-card w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm shadow">
            Kup za 50 ⭐
          </button>
        </div>

        <div class="p-4 rounded-2xl border-3 border-slate-400 bg-slate-100 text-center flex flex-col justify-between">
          <div>
            <div class="text-5xl mb-1">🥈</div>
            <div class="font-extrabold text-slate-900 text-base">Srebrna Skrzynia</div>
            <div class="text-xs text-slate-600 font-bold mb-3">Większa szansa na rzadkie stroje i zwierzaki!</div>
          </div>
          <button onclick="buyChestWithStars('silver')" class="kid-card w-full py-2.5 rounded-xl bg-slate-600 hover:bg-slate-700 text-white font-extrabold text-sm shadow">
            Kup za 120 ⭐
          </button>
        </div>

        <div class="p-4 rounded-2xl border-3 border-yellow-500 bg-yellow-50 text-center flex flex-col justify-between">
          <div>
            <div class="text-5xl mb-1">👑</div>
            <div class="font-extrabold text-yellow-950 text-base">Złota Skrzynia</div>
            <div class="text-xs text-slate-600 font-bold mb-3">Najlepsze legendarne nagrody i smoki!</div>
          </div>
          <button onclick="buyChestWithStars('gold')" class="kid-card w-full py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-yellow-950 font-extrabold text-sm shadow">
            Kup za 250 ⭐
          </button>
        </div>
      </div>
    `;
  }

  content.innerHTML = `
    <div class="bg-white rounded-3xl shadow-2xl border-4 border-indigo-400 p-5 relative">
      <div class="flex items-center justify-between border-b-2 border-slate-100 pb-3 mb-3">
        <div>
          <h2 class="text-xl font-extrabold text-slate-900">🦸 Awatar i Sklepik – ${p.name}</h2>
          <div class="text-xs font-extrabold text-amber-600">Twoje gwiazdki: ${p.stars} ⭐ | Puchary: ${p.cups} 🏆</div>
        </div>
        <button onclick="closeModal()" class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 font-extrabold text-slate-700">✕</button>
      </div>

      <!-- PODGLĄD BOHATERA + PRZYCISK ASYSTENTA ZAKUPOWEGO -->
      <div class="bg-gradient-to-r from-indigo-50 via-sky-50 to-amber-50 rounded-2xl p-3.5 border-2 border-indigo-200 mb-3 flex flex-col sm:flex-row items-center gap-3">
        <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border-2 border-indigo-200 shadow-sm shrink-0">
          <div class="flex flex-col items-center leading-none">
            <span class="text-2xl">${getEquippedIcon("hat") || "🙂"}</span>
            <span class="text-3xl">${getEquippedIcon("shirt") || "👕"}</span>
            <span class="text-2xl">${getEquippedIcon("pants") || "👖"} ${getEquippedIcon("shoes") || "👟"}</span>
          </div>
          <div class="text-2xl">${getEquippedIcon("accessory")}</div>
          <div class="text-4xl float-anim ml-1" title="${petObj.pl}">${petObj.icon}</div>
        </div>

        <div class="flex-1 text-center sm:text-left">
          <button onclick="speakShoppingAssistant()" class="kid-card px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs shadow inline-flex items-center gap-1.5 mb-1.5">
            <span>🦉🔊</span>
            <span>Co mogę kupić za moje gwiazdki?</span>
          </button>
          <div id="avatarAssistantBubble" class="text-xs font-bold text-slate-700 bg-white/90 p-2 rounded-xl border border-amber-200">
            ${report.missingTextPl}
          </div>
        </div>
      </div>

      <!-- ZAKŁADKI -->
      <div class="flex gap-2 mb-3">
        <button onclick="openAvatarWardrobeModal('wardrobe')" class="flex-1 py-2 rounded-xl font-extrabold text-xs border-2 ${activeTab === 'wardrobe' ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-slate-50 text-slate-700 border-slate-200'}">👕 Garderoba</button>
        <button onclick="openAvatarWardrobeModal('pets')" class="flex-1 py-2 rounded-xl font-extrabold text-xs border-2 ${activeTab === 'pets' ? 'bg-purple-600 text-white border-purple-700' : 'bg-slate-50 text-slate-700 border-slate-200'}">🐾 Zwierzaki i Jedzenie</button>
        <button onclick="openAvatarWardrobeModal('chests')" class="flex-1 py-2 rounded-xl font-extrabold text-xs border-2 ${activeTab === 'chests' ? 'bg-amber-500 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'}">🎁 Skrzynie ze Skarbami</button>
      </div>

      ${tabBodyHtml}
    </div>
  `;

  overlay.classList.remove("hidden");
}

function equipWardrobeItem(itemId) {
  const profKey = getActiveProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  const item = WARDROBE_ITEMS.find(i => i.id === itemId);
  if (!item || !p.unlockedClothes.includes(itemId)) return;
  p.equipped[item.slot] = itemId;
  state.stats[profKey] = p;
  saveCloudData();
  playEffect("beep");
  openAvatarWardrobeModal("wardrobe");
  if (typeof updateHeaderUI === "function") updateHeaderUI();
}

function equipCompanionPet(petId) {
  const profKey = getActiveProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (!p.unlockedPets.includes(petId)) return;
  p.equipped.pet = petId;
  state.stats[profKey] = p;
  saveCloudData();
  playEffect("success");
  const petObj = COMPANION_PETS.find(x => x.id === petId);
  if (petObj) speakSequence([{ lang: "en", text: petObj.en }]);
  openAvatarWardrobeModal("pets");
  if (typeof updateHeaderUI === "function") updateHeaderUI();
}

function feedActivePet(foodId) {
  const profKey = getActiveProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (!p.pantry || (p.pantry[foodId] || 0) <= 0) return;

  p.pantry[foodId]--;
  const petId = p.equipped.pet || "owl";
  if (!p.petXp) p.petXp = {};
  p.petXp[petId] = (p.petXp[petId] || 0) + 1;
  state.stats[profKey] = p;
  saveCloudData();
  playEffect("success");

  const foodObj = PANTRY_FOODS.find(f => f.id === foodId);
  speakSequence([
    { lang: "en", text: `Yummy ${foodObj ? foodObj.en.toLowerCase() : "food"}!` },
    { lang: "pl", text: "Mniam! Zwierzak bardzo dziękuje!" }
  ]);
  openAvatarWardrobeModal("pets");
}

// 3. ZAKUP I OTWIERANIE SKRZYŃ ZE SKARBAMI
function buyChestWithStars(chestType) {
  const profKey = getActiveProfileKey();
  const p = ensurePlayerStructure(state.stats[profKey]);
  const cost = CHEST_PRICES[chestType] || 50;

  if ((p.stars || 0) < cost) {
    playEffect("wrong");
    const diff = cost - (p.stars || 0);
    speakSequence([{ lang: "pl", text: `Masz za mało gwiazdek. Brakuje Ci jeszcze ${diff} gwiazdek!` }]);
    return;
  }

  p.stars -= cost;
  state.stats[profKey] = p;
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();

  openRewardChestAnimation(profKey, chestType, "Zakupiona skrzynia!");
}

function openRewardChestAnimation(profKey, chestType = "bronze", reasonTitle = "Nagroda!") {
  const p = ensurePlayerStructure(state.stats[profKey]);
  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("modalContent");
  if (!overlay || !content) return;

  // Losowanie głównej nagrody
  const lockedClothes = WARDROBE_ITEMS.filter(i => !p.unlockedClothes.includes(i.id));
  const lockedPets = COMPANION_PETS.filter(pet => !p.unlockedPets.includes(pet.id));
  const lockedStickers = STICKERS_BOOK.filter(st => !p.unlockedStickers.includes(st.id));

  let mainRewardHtml = "";
  let mainRewardSpeech = "";

  const roll = Math.random();
  if (roll < 0.45 && lockedClothes.length > 0) {
    const won = lockedClothes[Math.floor(Math.random() * lockedClothes.length)];
    p.unlockedClothes.push(won.id);
    mainRewardHtml = `<div class="text-5xl mb-1 pop-correct">${won.icon}</div><div class="font-extrabold text-base text-indigo-900">Nowe ubranie: ${won.name}!</div>`;
    mainRewardSpeech = `Nowe ubranie: ${won.name}!`;
  } else if (roll < 0.75 && lockedPets.length > 0) {
    const won = lockedPets[Math.floor(Math.random() * lockedPets.length)];
    p.unlockedPets.push(won.id);
    mainRewardHtml = `<div class="text-5xl mb-1 pop-correct">${won.icon}</div><div class="font-extrabold text-base text-purple-900">Nowy zwierzak: ${won.pl}!</div>`;
    mainRewardSpeech = `Nowy zwierzak: ${won.pl}!`;
  } else if (lockedStickers.length > 0) {
    const won = lockedStickers[Math.floor(Math.random() * lockedStickers.length)];
    p.unlockedStickers.push(won.id);
    mainRewardHtml = `<div class="text-5xl mb-1 pop-correct">${won.icon}</div><div class="font-extrabold text-base text-amber-900">Nowa naklejka: ${won.name}!</div>`;
    mainRewardSpeech = `Nowa naklejka: ${won.name}!`;
  } else {
    p.stars = (p.stars || 0) + 25;
    mainRewardHtml = `<div class="text-5xl mb-1 pop-correct">⭐</div><div class="font-extrabold text-base text-amber-700">Bonus: +25 Złotych Gwiazdek!</div>`;
    mainRewardSpeech = `Bonus: dwadzieścia pięć złotych gwiazdek!`;
  }

  // Gwarantowany dodatek jedzenia do spiżarni (1-4 szt.)
  const foodObj = PANTRY_FOODS[Math.floor(Math.random() * PANTRY_FOODS.length)];
  const foodQty = Math.floor(Math.random() * 4) + 1;
  if (!p.pantry) p.pantry = {};
  p.pantry[foodObj.id] = (p.pantry[foodObj.id] || 0) + foodQty;

  state.stats[profKey] = p;
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  playEffect("fanfare");

  const chestNames = { bronze: "Brązowej Skrzyni 📦", silver: "Srebrnej Skrzyni 🥈", gold: "Złotej Skrzyni 👑" };

  content.innerHTML = `
    <div class="bg-white rounded-3xl shadow-2xl border-4 border-amber-400 p-6 text-center">
      <div class="text-xs font-extrabold text-amber-700 uppercase mb-1">${reasonTitle}</div>
      <h2 class="text-2xl font-extrabold text-slate-900 mb-3">Otwierasz zawartość ${chestNames[chestType] || "Skrzyni"}!</h2>
      <div class="bg-gradient-to-b from-amber-50 to-yellow-100 rounded-2xl p-5 border-2 border-amber-300 mb-3">
        ${mainRewardHtml}
        <div class="mt-3 pt-3 border-t border-amber-200 text-xs font-extrabold text-emerald-800">
          + Dodatek do spiżarni: ${foodQty}x ${foodObj.icon} (${foodObj.pl})
        </div>
      </div>
      <button onclick="finishCurrentChestAndCheckNext()" class="kid-card w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base shadow-lg">
        Super! Odbieram nagrodę 🎉
      </button>
    </div>
  `;

  overlay.classList.remove("hidden");
  speakSequence([{ lang: "pl", text: `Brawo ${p.name}! Otwierasz skrzynię i zdobywasz: ${mainRewardSpeech}` }]);
}

function processNextRewardInQueue() {
  if (!Array.isArray(state.rewardQueue) || state.rewardQueue.length === 0) return;
  const next = state.rewardQueue.shift();
  openRewardChestAnimation(next.profKey, next.chestType, next.achievement ? next.achievement.name : "Skrzynia!");
}

function finishCurrentChestAndCheckNext() {
  closeModal();
  if (Array.isArray(state.rewardQueue) && state.rewardQueue.length > 0) {
    setTimeout(processNextRewardInQueue, 300);
  }
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  if (overlay) overlay.classList.add("hidden");
}
