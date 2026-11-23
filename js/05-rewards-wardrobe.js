/* ============================================================================
   PLIK: js/05-rewards-wardrobe.js
   SKRZYNIE NAGRÓD, KOLEJKA NAGRÓD, GARDEROBA AWATARA, ZWIERZAKI I NAKLEJKI
   ============================================================================ */

const CHEST_TIERS_CONFIG = {
  bronze: {
    id: "bronze",
    name: "Brązowa Skrzynia",
    icon: "📦",
    costStars: 50,
    outfitPool: [
      "grafiki/cap_red.png",
      "grafiki/shirt_blue.png",
      "grafiki/jeans_blue.png",
      "grafiki/cap_blue.png",
      "grafiki/shirt_green.png",
      "grafiki/shirt_yellow.png",
      "grafiki/shorts_blue.png"
    ]
  },
  silver: {
    id: "silver",
    name: "Srebrna Skrzynia",
    icon: "🥈",
    costStars: 120,
    outfitPool: [
      "grafiki/srebrna/shirt_pigeon.png",
      "grafiki/srebrna/shirt_T-Rex.png",
      "grafiki/srebrna/pants_grey.png",
      "grafiki/srebrna/cap_silver.png"
    ]
  },
  gold: {
    id: "gold",
    name: "Złota Skrzynia",
    icon: "👑",
    costStars: 250,
    outfitPool: [
      "grafiki/zlota/helmet_astronaut.png",
      "grafiki/zlota/armor_gold.png",
      "grafiki/zlota/pants_gold.png",
      "grafiki/zlota/shorts_gold.png"
    ]
  }
};

const COMPANION_PETS = [
  { id: "p_dog",     en: "Dog",     pl: "Piesek",   icon: "🐶" },
  { id: "p_cat",     en: "Cat",     pl: "Kotek",    icon: "🐱" },
  { id: "p_rabbit",  en: "Rabbit",  pl: "Królik",   icon: "🐰" },
  { id: "p_fox",     en: "Fox",     pl: "Lisek",    icon: "🦊" },
  { id: "p_owl",     en: "Owl",     pl: "Sówka",    icon: "🦉" },
  { id: "p_dino",    en: "Dino",    pl: "Dinozaur", icon: "🦕" },
  { id: "p_unicorn", en: "Unicorn", pl: "Jednorożec",icon: "🦄" },
  { id: "p_dragon",  en: "Dragon",  pl: "Smoczek",  icon: "🐲" }
];

const PET_FOOD_ITEMS = [
  { id: "food_apple",  name: "Jabłko",    icon: "🍎" },
  { id: "food_carrot", name: "Marchewka", icon: "🥕" },
  { id: "food_banana", name: "Banan",     icon: "🍌" },
  { id: "food_cookie", name: "Ciastko",   icon: "🍪" }
];

window._pendingPopupReward = null;
window._isOpeningChestAnim = false;

function getRewardProfileKey(fallbackKey = null) {
  if (fallbackKey && PROFILE_META[fallbackKey]) return fallbackKey;
  if (state.profile === "igor" || state.profile === "hubert" || state.profile === "tata") {
    return state.profile;
  }
  if (state.returnProfileAfterBrothers && PROFILE_META[state.returnProfileAfterBrothers]) {
    return state.returnProfileAfterBrothers;
  }
  return "igor";
}

function showRewardModalEl() {
  const modal = document.getElementById("rewardPopupModal");
  if (!modal) return null;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  return modal;
}

function hideRewardModalEl() {
  const modal = document.getElementById("rewardPopupModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  const content = document.getElementById("rewardPopupContent");
  if (content) content.innerHTML = "";
}

function guessOutfitSlotFromPath(src) {
  const s = String(src || "").toLowerCase();
  if (s.includes("cap") || s.includes("helmet")) return "head";
  if (s.includes("jeans") || s.includes("pants") || s.includes("shorts")) return "legs";
  return "torso";
}

function rollRewardForPlayer(profKey, chestType = "bronze") {
  const tierKey = CHEST_TIERS_CONFIG[chestType] ? chestType : "bronze";
  const tierCfg = CHEST_TIERS_CONFIG[tierKey];
  const p = ensurePlayerStructure(state.stats[profKey]);

  const availableOutfits = (tierCfg.outfitPool || [])
    .map(resolveOutfitPath)
    .filter(path => path && !p.unlockedItems.includes(path));

  const availablePets = COMPANION_PETS
    .filter(pet => !p.memoryAnimals.includes(pet.id));

  if (availableOutfits.length > 0 && (Math.random() < 0.55 || availablePets.length === 0)) {
    const pickedPath = availableOutfits[Math.floor(Math.random() * availableOutfits.length)];
    const slot = guessOutfitSlotFromPath(pickedPath);
    return {
      type: "outfit",
      slot,
      path: pickedPath,
      label: `Nowe ubranko (${slot === "head" ? "Głowa" : slot === "legs" ? "Nogi" : "Tułów"})`,
      icon: slot === "head" ? "🧢" : slot === "legs" ? "👖" : "👕"
    };
  }

  if (availablePets.length > 0) {
    const pickedPet = availablePets[Math.floor(Math.random() * availablePets.length)];
    return {
      type: "pet",
      petId: pickedPet.id,
      label: `Nowy zwierzak: ${pickedPet.pl} (${pickedPet.en})`,
      icon: pickedPet.icon
    };
  }

  const food = PET_FOOD_ITEMS[Math.floor(Math.random() * PET_FOOD_ITEMS.length)];
  const bonusStars = tierKey === "gold" ? 40 : tierKey === "silver" ? 25 : 15;
  return {
    type: "food_and_stars",
    foodId: food.id,
    foodName: food.name,
    foodIcon: food.icon,
    bonusStars,
    label: `${food.icon} +1 ${food.name} oraz +${bonusStars} ⭐!`,
    icon: food.icon
  };
}

function applyRolledRewardToPlayer(profKey, reward) {
  if (!reward) return;
  const p = ensurePlayerStructure(state.stats[profKey]);

  if (reward.type === "outfit" && reward.path) {
    if (!p.unlockedItems.includes(reward.path)) {
      p.unlockedItems.push(reward.path);
    }
    if (!p.avatar) p.avatar = { head: "", torso: "", legs: "", pet: "" };
    p.avatar[reward.slot] = reward.path;
  } else if (reward.type === "pet" && reward.petId) {
    if (!p.memoryAnimals.includes(reward.petId)) {
      p.memoryAnimals.push(reward.petId);
    }
    if (!p.avatar) p.avatar = { head: "", torso: "", legs: "", pet: "" };
    p.avatar.pet = reward.petId;
  } else if (reward.type === "food_and_stars") {
    if (!p.petFood) p.petFood = {};
    p.petFood[reward.foodId] = (p.petFood[reward.foodId] || 0) + 1;
    p.stars = (p.stars || 0) + (reward.bonusStars || 15);
  }

  state.stats[profKey] = p;
  saveCloudData();
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

  box.innerHTML = `
    <div class="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs mb-2">
      ${PROFILE_META[targetProf] ? PROFILE_META[targetProf].name : "GRACZ"}
    </div>
    <h3 class="text-2xl font-extrabold text-slate-900 mb-1">${tierCfg.name}</h3>
    <p class="text-xs font-bold text-slate-600 mb-4">${reasonText}</p>
    <button id="btnOpenChestPopup" type="button" onclick="triggerChestUnboxAnimation()"
      class="kid-card cursor-pointer w-44 h-44 mx-auto rounded-3xl bg-gradient-to-b from-amber-100 to-amber-300 border-4 border-amber-500 shadow-xl flex flex-col items-center justify-center">
      <span class="text-7xl float-anim drop-shadow">${tierCfg.icon}</span>
      <span class="mt-2 px-3 py-1 rounded-full bg-amber-600 text-white font-extrabold text-xs shadow animate-pulse">Kliknij, aby otworzyć!</span>
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
    box.innerHTML = `
      <div class="text-6xl mb-2 pop-correct">${rolled.icon}</div>
      <h3 class="text-2xl font-extrabold text-emerald-700 mb-1">Zdobyto nagrodę!</h3>
      <p class="text-xs font-bold text-slate-500 mb-3">${tierCfg.name} • ${reasonText}</p>
      <div class="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 font-extrabold text-lg text-slate-900 mb-5">
        ${rolled.label}
      </div>
      <button type="button" onclick="claimRewardAndClosePopup()"
        class="kid-card w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-lg">
        ✅ Super! Odbierz ▶
      </button>
    `;
  }
  if (typeof playEffect === "function") playEffect("fanfare");
}

function claimRewardAndClosePopup() {
  window._pendingPopupReward = null;
  window._isOpeningChestAnim = false;
  hideRewardModalEl();

  if (Array.isArray(state.rewardQueue) && state.rewardQueue.length > 0) {
    setTimeout(() => processNextRewardInQueue(), 200);
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
      speakSequence([{ lang: "pl", text: `Potrzebujesz ${tierCfg.costStars} złotych gwiazdek, aby otworzyć tę skrzynię.` }]);
    }
    return;
  }

  p.stars -= tierCfg.costStars;
  state.stats[profKey] = p;
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  renderChestOpeningInsidePopup(profKey, tierKey, `Zakupiono za ${tierCfg.costStars} ⭐`);
}

function checkAndUnlockAchievements(profKey) {
  if (!PROFILE_META[profKey] || !state.stats[profKey]) return;
  const p = ensurePlayerStructure(state.stats[profKey]);
  if (!Array.isArray(p.badges)) p.badges = [];

  const milestones = [
    { id: "first_cup",   name: "Pierwszy Puchar",   check: () => (p.cups || 0) >= 1,    chest: "bronze" },
    { id: "star_50",     name: "50 Złotych Gwiazdek", check: () => (p.stars || 0) >= 50,  chest: "silver" },
    { id: "star_150",    name: "150 Złotych Gwiazdek", check: () => (p.stars || 0) >= 150, chest: "gold" }
  ];

  let unlockedAny = false;
  milestones.forEach(m => {
    if (!p.badges.includes(m.id) && m.check()) {
      p.badges.push(m.id);
      unlockedAny = true;
      state.rewardQueue.push({
        profKey,
        achievement: { name: `🏅 Odznaka: ${m.name}` },
        chestType: m.chest
      });
    }
  });

  state.stats[profKey] = p;
  if (unlockedAny) {
    saveCloudData();
    if (typeof updateHeaderUI === "function") updateHeaderUI();
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

  previewBox.innerHTML = `
    <div onclick="if(typeof speakAvatarGreeting==='function') speakAvatarGreeting();" class="cursor-pointer my-2">
      ${typeof renderBoyAvatarSvg === "function" ? renderBoyAvatarSvg(profKey, 150) : "👦"}
    </div>
    <div class="text-sm font-extrabold text-indigo-950 mt-1">Twoje gwiazdki: ⭐ ${p.stars || 0}</div>
  `;

  const allOutfits = Object.values(CHEST_TIERS_CONFIG).flatMap(t => (t.outfitPool || []).map(resolveOutfitPath));
  const uniqueOutfits = Array.from(new Set(allOutfits));

  itemsBox.innerHTML = `
    <div class="p-3 rounded-2xl bg-amber-50 border-2 border-amber-300">
      <div class="text-xs font-extrabold text-amber-950 uppercase mb-2">🎁 Sklepik ze Skrzyniami (masz ⭐ ${p.stars || 0})</div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
        ${Object.values(CHEST_TIERS_CONFIG).map(t => {
          const canAfford = (p.stars || 0) >= t.costStars;
          return `
            <button type="button" onclick="buyAndOpenChest('${t.id}')"
              class="kid-card p-3 rounded-2xl border-2 font-extrabold text-xs flex flex-col items-center gap-1 shadow-sm ${
                canAfford ? "bg-white hover:bg-amber-100 border-amber-400 text-slate-900" : "bg-slate-100 border-slate-200 text-slate-400"
              }">
              <span class="text-3xl">${t.icon}</span>
              <span>${t.name}</span>
              <span class="px-2 py-0.5 rounded-lg bg-amber-200 text-amber-950">${t.costStars} ⭐</span>
            </button>
          `;
        }).join("")}
      </div>
    </div>

    <div class="p-3 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200">
      <div class="text-xs font-extrabold text-indigo-950 uppercase mb-2">👕 Odblokowane ubranka (${p.unlockedItems.length}/${uniqueOutfits.length})</div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        ${uniqueOutfits.length === 0
          ? `<div class="col-span-full text-xs text-slate-500">Otwórz skrzynię, aby zdobyć ubranka!</div>`
          : uniqueOutfits.map(src => {
              const unlocked = p.unlockedItems.includes(src);
              const slot = guessOutfitSlotFromPath(src);
              const equipped = p.avatar && p.avatar[slot] === src;
              const shortName = src.split("/").pop().replace(/\.png$/i, "");
              return `
                <button type="button" ${unlocked ? `onclick="toggleEquipOutfit('${profKey}','${slot}','${src}')"` : "disabled"}
                  class="p-2.5 rounded-xl border-2 text-xs font-bold text-left flex items-center justify-between gap-1 ${
                    equipped ? "bg-emerald-100 border-emerald-500 text-emerald-950" : (unlocked ? "bg-white border-indigo-300 text-slate-800 hover:bg-indigo-50" : "bg-slate-100 border-slate-200 text-slate-400 opacity-60")
                  }">
                  <span class="truncate">${unlocked ? "👕" : "🔒"} ${shortName}</span>
                  ${equipped ? "<span class='text-[10px] font-extrabold text-emerald-700'>✓</span>" : ""}
                </button>
              `;
            }).join("")}
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeAvatarModal() {
  const modal = document.getElementById("avatarModal");
  if (modal) {
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
  saveCloudData();
  if (typeof updateHeaderUI === "function") updateHeaderUI();
  openAvatarModal();
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
  saveCloudData();
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
  saveCloudData();
  if (typeof showParentStatus === "function") showParentStatus("🔒 Zablokowano testowe ubranka i zwierzaki.");
}
