/* ============================================================================
   PLIK: js/02-database.js
   BAZA NAKLEJEK (100), UBRAŃ (131), ZWIERZĄT (50), JEDZENIA, KOLORÓW I LEKCJI
   ============================================================================ */

const STICKER_CATEGORIES = [
  { id: "all", name: "Wszystkie (100)", icon: "🌟" },
  { id: "space", name: "Kosmos", icon: "🚀" }, { id: "animals", name: "Zwierzęta", icon: "🦁" },
  { id: "fruits", name: "Owoce", icon: "🍓" }, { id: "veggies", name: "Warzywa", icon: "🥦" },
  { id: "dinos", name: "Dinozaury", icon: "🦖" }, { id: "vehicles", name: "Pojazdy", icon: "🏎️" },
  { id: "sweets", name: "Słodycze", icon: "🍩" }, { id: "sports", name: "Sport", icon: "⚽" },
  { id: "nature", name: "Natura", icon: "🌈" }, { id: "magic", name: "Magia", icon: "✨" }
];

const STICKER_POOL = [
  { id: "st_sp1", cat: "space", icon: "🚀", name: "Rakieta" }, { id: "st_sp2", cat: "space", icon: "👨‍🚀", name: "Astronauta" }, { id: "st_sp3", cat: "space", icon: "🪐", name: "Saturn" }, { id: "st_sp4", cat: "space", icon: "🛸", name: "UFO" }, { id: "st_sp5", cat: "space", icon: "🌕", name: "Księżyc" }, { id: "st_sp6", cat: "space", icon: "☄️", name: "Kometa" }, { id: "st_sp7", cat: "space", icon: "🔭", name: "Teleskop" }, { id: "st_sp8", cat: "space", icon: "🛰️", name: "Satelita" }, { id: "st_sp9", cat: "space", icon: "☀️", name: "Słońce" }, { id: "st_sp10", cat: "space", icon: "🌌", name: "Galaktyka" },
  { id: "st_an1", cat: "animals", icon: "🦁", name: "Król Lew" }, { id: "st_an2", cat: "animals", icon: "🐯", name: "Tygrys" }, { id: "st_an3", cat: "animals", icon: "🐘", name: "Wielki Słoń" }, { id: "st_an4", cat: "animals", icon: "🦒", name: "Wysoka Żyrafa" }, { id: "st_an5", cat: "animals", icon: "🐒", name: "Małpka" }, { id: "st_an6", cat: "animals", icon: "🦓", name: "Zebra" }, { id: "st_an7", cat: "animals", icon: "🐊", name: "Krokodyl" }, { id: "st_an8", cat: "animals", icon: "🦈", name: "Rekin" }, { id: "st_an9", cat: "animals", icon: "🐬", name: "Delfin" }, { id: "st_an10", cat: "animals", icon: "🐼", name: "Panda" },
  { id: "st_fr1", cat: "fruits", icon: "🍓", name: "Truskawka" }, { id: "st_fr2", cat: "fruits", icon: "🍎", name: "Jabłko" }, { id: "st_fr3", cat: "fruits", icon: "🍌", name: "Banan" }, { id: "st_fr4", cat: "fruits", icon: "🍉", name: "Arbuz" }, { id: "st_fr5", cat: "fruits", icon: "🍊", name: "Pomarańcza" }, { id: "st_fr6", cat: "fruits", icon: "🍍", name: "Ananas" }, { id: "st_fr7", cat: "fruits", icon: "🍇", name: "Winogrona" }, { id: "st_fr8", cat: "fruits", icon: "🍋", name: "Cytryna" }, { id: "st_fr9", cat: "fruits", icon: "🍐", name: "Gruszka" }, { id: "st_fr10", cat: "fruits", icon: "🍒", name: "Wiśnie" },
  { id: "st_vg1", cat: "veggies", icon: "🥦", name: "Brokuł" }, { id: "st_vg2", cat: "veggies", icon: "🥕", name: "Marchewka" }, { id: "st_vg3", cat: "veggies", icon: "🍅", name: "Pomidor" }, { id: "st_vg4", cat: "veggies", icon: "🌽", name: "Kukurydza" }, { id: "st_vg5", cat: "veggies", icon: "🥒", name: "Ogórek" }, { id: "st_vg6", cat: "veggies", icon: "🫑", name: "Papryka" }, { id: "st_vg7", cat: "veggies", icon: "🥔", name: "Ziemniak" }, { id: "st_vg8", cat: "veggies", icon: "🧅", name: "Cebula" }, { id: "st_vg9", cat: "veggies", icon: "🧄", name: "Czosnek" }, { id: "st_vg10", cat: "veggies", icon: "🥑", name: "Awokado" },
  { id: "st_dn1", cat: "dinos", icon: "🦖", name: "T-Rex" }, { id: "st_dn2", cat: "dinos", icon: "🦕", name: "Diplodok" }, { id: "st_dn3", cat: "dinos", icon: "🐉", name: "Smok" }, { id: "st_dn4", cat: "dinos", icon: "🐲", name: "Głowa Smoka" }, { id: "st_dn5", cat: "dinos", icon: "🌋", name: "Wulkan" }, { id: "st_dn6", cat: "dinos", icon: "🥚", name: "Jajo" }, { id: "st_dn7", cat: "dinos", icon: "🦎", name: "Jaszczur" }, { id: "st_dn8", cat: "dinos", icon: "🐢", name: "Żółw" }, { id: "st_dn9", cat: "dinos", icon: "🦴", name: "Kość" }, { id: "st_dn10", cat: "dinos", icon: "☄️", name: "Meteoryt" },
  { id: "st_vh1", cat: "vehicles", icon: "🏎️", name: "Bolid" }, { id: "st_vh2", cat: "vehicles", icon: "🚒", name: "Wóz Strażacki" }, { id: "st_vh3", cat: "vehicles", icon: "🚓", name: "Radiowóz" }, { id: "st_vh4", cat: "vehicles", icon: "🚁", name: "Helikopter" }, { id: "st_vh5", cat: "vehicles", icon: "🚜", name: "Traktor" }, { id: "st_vh6", cat: "vehicles", icon: "🚂", name: "Lokomotywa" }, { id: "st_vh7", cat: "vehicles", icon: "✈️", name: "Odrzutowiec" }, { id: "st_vh8", cat: "vehicles", icon: "🏴‍☠️", name: "Statek Piracki" }, { id: "st_vh9", cat: "vehicles", icon: "⛵", name: "Żaglówka" }, { id: "st_vh10", cat: "vehicles", icon: "🚑", name: "Karetka" },
  { id: "st_sw1", cat: "sweets", icon: "🍩", name: "Pączek" }, { id: "st_sw2", cat: "sweets", icon: "🍪", name: "Ciastko" }, { id: "st_sw3", cat: "sweets", icon: "🍫", name: "Czekolada" }, { id: "st_sw4", cat: "sweets", icon: "🍬", name: "Cukierek" }, { id: "st_sw5", cat: "sweets", icon: "🍭", name: "Lizak" }, { id: "st_sw6", cat: "sweets", icon: "🍦", name: "Lód" }, { id: "st_sw7", cat: "sweets", icon: "🧁", name: "Babeczka" }, { id: "st_sw8", cat: "sweets", icon: "🍰", name: "Tort" }, { id: "st_sw9", cat: "sweets", icon: "🍧", name: "Deser" }, { id: "st_sw10", cat: "sweets", icon: "🍯", name: "Miód" },
  { id: "st_sp1_s", cat: "sports", icon: "⚽", name: "Piłka" }, { id: "st_sp2_s", cat: "sports", icon: "🏀", name: "Koszykówka" }, { id: "st_sp3_s", cat: "sports", icon: "🏈", name: "Rugby" }, { id: "st_sp4_s", cat: "sports", icon: "🎾", name: "Tenis" }, { id: "st_sp5_s", cat: "sports", icon: "🏐", name: "Siatkówka" }, { id: "st_sp6_s", cat: "sports", icon: "🏓", name: "Ping Pong" }, { id: "st_sp7_s", cat: "sports", icon: "🏸", name: "Badminton" }, { id: "st_sp8_s", cat: "sports", icon: "🥊", name: "Boks" }, { id: "st_sp9_s", cat: "sports", icon: "🥋", name: "Karate" }, { id: "st_sp10_s", cat: "sports", icon: "🥇", name: "Złoty Medal" },
  { id: "st_nt1", cat: "nature", icon: "🌈", name: "Tęcza" }, { id: "st_nt2", cat: "nature", icon: "⭐", name: "Gwiazda" }, { id: "st_nt3", cat: "nature", icon: "🔥", name: "Ogień" }, { id: "st_nt4", cat: "nature", icon: "💧", name: "Kropla" }, { id: "st_nt5", cat: "nature", icon: "⚡", name: "Błyskawica" }, { id: "st_nt6", cat: "nature", icon: "❄️", name: "Śnieżka" }, { id: "st_nt7", cat: "nature", icon: "🌪️", name: "Tornado" }, { id: "st_nt8", cat: "nature", icon: "🌲", name: "Choinka" }, { id: "st_nt9", cat: "nature", icon: "🌵", name: "Kaktus" }, { id: "st_nt10", cat: "nature", icon: "🍀", name: "Koniczyna" },
  { id: "st_mg1", cat: "magic", icon: "✨", name: "Magia" }, { id: "st_mg2", cat: "magic", icon: "🪄", name: "Różdżka" }, { id: "st_mg3", cat: "magic", icon: "🔮", name: "Kula" }, { id: "st_mg4", cat: "magic", icon: "🧿", name: "Oko Proroka" }, { id: "st_mg5", cat: "magic", icon: "👑", name: "Korona" }, { id: "st_mg6", cat: "magic", icon: "💎", name: "Diament" }, { id: "st_mg7", cat: "magic", icon: "🛡️", name: "Tarcza" }, { id: "st_mg8", cat: "magic", icon: "⚔️", name: "Miecze" }, { id: "st_mg9", cat: "magic", icon: "🗝️", name: "Klucz" }, { id: "st_mg10", cat: "magic", icon: "🧸", name: "Miś" }
];

const COMPANION_PETS = [
  { id: "p_dog", icon: "🐶", en: "Dog", pl: "Piesek" }, { id: "p_cat", icon: "🐱", en: "Cat", pl: "Kotek" }, { id: "p_rabbit", icon: "🐰", en: "Rabbit", pl: "Królik" }, { id: "p_hamster", icon: "🐹", en: "Hamster", pl: "Chomik" }, { id: "p_parrot", icon: "🦜", en: "Parrot", pl: "Papuga" }, { id: "p_fish", icon: "🐠", en: "Fish", pl: "Rybka" }, { id: "p_turtle", icon: "🐢", en: "Turtle", pl: "Żółw" }, { id: "p_mouse", icon: "🐭", en: "Mouse", pl: "Myszka" }, { id: "p_canary", icon: "🐦", en: "Canary", pl: "Kanarek" }, { id: "p_guinea", icon: "🐹", en: "Guinea Pig", pl: "Świnka Morska" },
  { id: "p_cow", icon: "🐮", en: "Cow", pl: "Krowa" }, { id: "p_pig", icon: "🐷", en: "Pig", pl: "Świnia" }, { id: "p_horse", icon: "🐴", en: "Horse", pl: "Koń" }, { id: "p_sheep", icon: "🐑", en: "Sheep", pl: "Owca" }, { id: "p_goat", icon: "🐐", en: "Goat", pl: "Koza" }, { id: "p_chicken", icon: "🐔", en: "Chicken", pl: "Kura" }, { id: "p_duck", icon: "🦆", en: "Duck", pl: "Kaczka" }, { id: "p_goose", icon: "🦢", en: "Goose", pl: "Gęś" }, { id: "p_turkey", icon: "🦃", en: "Turkey", pl: "Indyk" }, { id: "p_donkey", icon: "🐴", en: "Donkey", pl: "Osioł" },
  { id: "p_bear", icon: "🐻", en: "Bear", pl: "Niedźwiedź" }, { id: "p_wolf", icon: "🐺", en: "Wolf", pl: "Wilk" }, { id: "p_fox", icon: "🦊", en: "Fox", pl: "Lis" }, { id: "p_boar", icon: "🐗", en: "Boar", pl: "Dzik" }, { id: "p_deer", icon: "🦌", en: "Deer", pl: "Jeleń" }, { id: "p_owl", icon: "🦉", en: "Owl", pl: "Sowa" }, { id: "p_squirrel", icon: "🐿️", en: "Squirrel", pl: "Wiewiórka" }, { id: "p_hedgehog", icon: "🦔", en: "Hedgehog", pl: "Jeż" }, { id: "p_badger", icon: "🦡", en: "Badger", pl: "Borsuk" }, { id: "p_frog", icon: "🐸", en: "Frog", pl: "Żaba" },
  { id: "p_lion", icon: "🦁", en: "Lion", pl: "Lew" }, { id: "p_tiger", icon: "🐯", en: "Tiger", pl: "Tygrys" }, { id: "p_elephant", icon: "🐘", en: "Elephant", pl: "Słoń" }, { id: "p_monkey", icon: "🐵", en: "Monkey", pl: "Małpa" }, { id: "p_giraffe", icon: "🦒", en: "Giraffe", pl: "Żyrafa" }, { id: "p_zebra", icon: "🦓", en: "Zebra", pl: "Zebra" }, { id: "p_hippo", icon: "🦛", en: "Hippo", pl: "Hipopotam" }, { id: "p_rhino", icon: "🦏", en: "Rhino", pl: "Nosorożec" }, { id: "p_croc", icon: "🐊", en: "Crocodile", pl: "Krokodyl" }, { id: "p_snake", icon: "🐍", en: "Snake", pl: "Wąż" },
  { id: "p_dragon", icon: "🐉", en: "Dragon", pl: "Smok" }, { id: "p_unicorn", icon: "🦄", en: "Unicorn", pl: "Jednorożec" }, { id: "p_alien", icon: "👽", en: "Alien", pl: "Kosmita" }, { id: "p_ghost", icon: "👻", en: "Ghost", pl: "Duch" }, { id: "p_robot", icon: "🤖", en: "Robot", pl: "Robot" }, { id: "p_monster", icon: "👾", en: "Monster", pl: "Potwór" }, { id: "p_fairy", icon: "🧚", en: "Fairy", pl: "Wróżka" }, { id: "p_troll", icon: "👹", en: "Troll", pl: "Troll" }, { id: "p_phoenix", icon: "🦅", en: "Phoenix", pl: "Feniks" }, { id: "p_genie", icon: "🧞", en: "Genie", pl: "Dżin" }
];

const PET_FOOD_POOL = [
  { id: "food_apple",      icon: "🍎", en: "Apple",      pl: "Jabłko" },
  { id: "food_banana",     icon: "🍌", en: "Banana",     pl: "Banan" },
  { id: "food_grapes",     icon: "🍇", en: "Grapes",     pl: "Winogrono" },
  { id: "food_strawberry", icon: "🍓", en: "Strawberry", pl: "Truskawka" },
  { id: "food_carrot",     icon: "🥕", en: "Carrot",     pl: "Marchewka" },
  { id: "food_broccoli",   icon: "🥦", en: "Broccoli",   pl: "Brokuł" },
  { id: "food_watermelon", icon: "🍉", en: "Watermelon", pl: "Arbuz" },
  { id: "food_pear",       icon: "🍐", en: "Pear",       pl: "Gruszka" },
  { id: "food_cucumber",   icon: "🥒", en: "Cucumber",   pl: "Ogórek" },
  { id: "food_tomato",     icon: "🍅", en: "Tomato",     pl: "Pomidor" },
  { id: "food_corn",       icon: "🌽", en: "Corn",       pl: "Kukurydza" },
  { id: "food_cherry",     icon: "🍒", en: "Cherry",     pl: "Wiśnie" }
];

const COLOR_MIX_POOL = [
  { en: "Red apple",        pl: "Czerwone jabłko",       icon: "🔴🍎", age: [4,6] },
  { en: "Yellow banana",    pl: "Żółty banan",           icon: "🟡🍌", age: [4,6] },
  { en: "Green frog",       pl: "Zielona żabka",         icon: "🟢🐸", age: [4,6] },
  { en: "Blue whale",       pl: "Niebieski wieloryb",    icon: "🔵🐳", age: [4,6] },
  { en: "Orange carrot",    pl: "Pomarańczowa marchew",  icon: "🟠🥕", age: [4,6] },
  { en: "Purple grapes",    pl: "Fioletowe winogrona",   icon: "🟣🍇", age: [4,6] },
  { en: "Pink pig",         pl: "Różowa świnka",         icon: "🌸🐷", age: [4,6] },
  { en: "Brown bear",       pl: "Brązowy niedźwiedź",    icon: "🟤🐻", age: [4,6] },
  { en: "Black bat",        pl: "Czarny nietoperz",      icon: "⚫🦇", age: [4,6] },
  { en: "White sheep",      pl: "Biała owieczka",        icon: "⚪🐑", age: [4,6] },
  { en: "Green broccoli",   pl: "Zielony brokuł",        icon: "🟢🥦", age: [4,6] },
  { en: "Red strawberry",   pl: "Czerwona truskawka",    icon: "🔴🍓", age: [4,6] }
];

const RIDDLES_POOL = [
  { en: "Giraffe",   pl: "Żyrafa",   icon: "🦒", cluePl: "Mam bardzo długą szyję i żółte łatki!", clueEn: "I am tall and yellow!", hint: "Zaczyna się na literę G (Giraffe)" },
  { en: "Elephant",  pl: "Słoń",     icon: "🐘", cluePl: "Jestem ogromny, szary i mam długą trąbę!", clueEn: "I am big and grey!", hint: "Zaczyna się na literę E (Elephant)" },
  { en: "Monkey",    pl: "Małpka",   icon: "🐒", cluePl: "Uwielbiam skakać po drzewach i jeść banany!", clueEn: "I love bananas!", hint: "Zaczyna się na literę M (Monkey)" },
  { en: "Lion",      pl: "Lew",      icon: "🦁", cluePl: "Mam wielką grzywę, głośno ryczę i jestem królem dżungli!", clueEn: "I am the king of the jungle!", hint: "Zaczyna się na literę L (Lion)" },
  { en: "Snake",     pl: "Wąż",      icon: "🐍", cluePl: "Nie mam nóg, pełzam po ziemi i głośno syczę: sss!", clueEn: "I have no legs!", hint: "Zaczyna się na literę S (Snake)" },
  { en: "Frog",      pl: "Żaba",     icon: "🐸", cluePl: "Jestem mała, zielona, skaczę i kumkam nad wodą!", clueEn: "I am green and I jump!", hint: "Zaczyna się na literę F (Frog)" },
  { en: "Banana",    pl: "Banan",    icon: "🍌", cluePl: "Jestem długim, żółtym owocem, który obierasz ze skórki!", clueEn: "I am a yellow fruit!", hint: "Zaczyna się na literę B (Banana)" },
  { en: "Carrot",    pl: "Marchewka",icon: "🥕", cluePl: "Jestem chrupiącym, pomarańczowym warzywem dla królika!", clueEn: "I am orange and rabbits love me!", hint: "Zaczyna się na literę C (Carrot)" },
  { en: "Zebra",     pl: "Zebra",    icon: "🦓", cluePl: "Wyglądam jak konik w biało-czarne paski!", clueEn: "I am black and white!", hint: "Zaczyna się na literę Z (Zebra)" },
  { en: "Penguin",   pl: "Pingwin",  icon: "🐧", cluePl: "Mieszkam na śniegu, mam frak i świetnie pływam, choć nie latam!", clueEn: "I live on the ice!", hint: "Zaczyna się na literę P (Penguin)" }
];

const PATHS = { base: "grafiki/", bronze: "grafiki/", silver: "grafiki/srebrna/", gold: "grafiki/zlota/" };

const OUTFITS_DB = {
  bronze: {
    head: ["cap_black.png", "cap_blue.png", "cap_green.png", "cap_orange.png", "cap_purple.png", "cap_red.png", "cap_white.png", "cap_yellow.png"],
    torso: ["shirt_black.png", "shirt_blue.png", "shirt_green.png", "shirt_pink.png", "shirt_red.png", "shirt_white.png", "shirt_yellow.png"],
    legs: ["jeans_black.png", "jeans_blue.png", "jeans_braun.png", "jeans_green.png", "jeans_orange.png", "jeans_red.png", "jeans_seledin.png", "jeans_yellow.png", "short_black.png", "short_blue.png", "short_green.png", "short_pink.png", "short_red.png", "short_white.png", "short_yellow.png"]
  },
  silver: {
    head: ["cap_bastetball.png", "cap_batman.png", "cap_captain.png", "cap_cat.png", "cap_handball.png", "cap_pigeon.png", "cap_pikachu.png", "cap_pokeball.png", "cap_poop.png", "cap_pterodactyl.png", "cap_soccer.png", "cap_superman.png", "cap_T-Rex.png", "cap_volleyball.png"],
    torso: ["shirt_basktetball.png", "shirt_batman.png", "shirt_captain.png", "shirt_cat.png", "shirt_handball.png", "shirt_pigeon.png", "shirt_pikachu.png", "shirt_pobeball.png", "shirt_poop.png", "shirt_pterodactyl.png", "shirt_soccer.png", "shirt_superman.png", "shirt_T-Rex.png", "shirt_volleyball.png"],
    legs: ["pants_basketball.png", "pants_batman.png", "pants_captain.png", "pants_cat.png", "pants_handball.png", "pants_pigeon.png", "pants_pikachu.png", "pants_pokeball.png", "pants_poop.png", "pants_pterodactyl.png", "pants_soccer.png", "pants_superman.png", "pants_volleyball.png", "pants-T-Rex.png", "shorts_basketball.png", "shorts_batman.png", "shorts_captain.png", "shorts_cat.png", "shorts_handball.png", "shorts_pigeon.png", "shorts_pikachu.png", "shorts_pokeball.png", "shorts_poop.png", "shorts_pterodactyl.png", "shorts_soccer.png", "shorts_superman.png", "shorts_T-Rex.png", "shorts_volleyball.png"]
  },
  gold: {
    head: ["cap_barcelona.png", "cap_hot-dog.png", "cap_paramedic.png", "cap_poland.png", "cap_police.png", "cap_soldier.png", "helmet_astronaut.png", "helmet_commando.png", "helmet_cyberdragon.png", "helmet_diver.png", "helmet_electrician.png", "helmet_firefighter.png", "helmet_knight.png", "mask_batman.png", "mask_skeleton.png"],
    torso: ["armor_batman.png", "armor_cyberdragon.png", "armor_knight.png", "jacket_diver.png", "jacket_electician.png", "jacket_firefighter.png", "jacket_paramedic.png", "shirt_barcelona.png", "shirt_commando.png", "shirt_poland.png", "shirt_police.png", "shirt_soldier.png", "suit_astronaut.png", "suit_hot-dog.png", "suit_skeleton.png"],
    legs: ["pants_austronaut.png", "pants_barcelona.png", "pants_batman2.png", "pants_commando.png", "pants_cyberdragon.png", "pants_diver.png", "pants_electrician.png", "pants_firefighter.png", "pants_hot-dog.png", "pants_knight.png", "pants_paramedic.png", "pants_poland.png", "pants_police.png", "pants_skeleton.png", "pants_soldier.png"]
  }
};

const AUTO_SIMPLE_WORDS_POOL = [
  { lessonId: "fruits_veggies", en: "Pear", pl: "Gruszka", phonetic: "per", icon: "🍐", age: [4, 6] },
  { lessonId: "fruits_veggies", en: "Plum", pl: "Śliwka", phonetic: "plam", icon: "🫐", age: [4, 6] },
  { lessonId: "fruits_veggies", en: "Watermelon", pl: "Arbuz", phonetic: "łotermelon", icon: "🍉", age: [4, 6] },
  { lessonId: "fruits_veggies", en: "Potato", pl: "Ziemniak", phonetic: "potejto", icon: "🥔", age: [4, 6] },
  { lessonId: "fruits_veggies", en: "Corn", pl: "Kukurydza", phonetic: "korn", icon: "🌽", age: [4, 6] },
  { lessonId: "jungle_animals", en: "Horse", pl: "Koń", phonetic: "hors", icon: "🐴", age: [4, 6] },
  { lessonId: "jungle_animals", en: "Cow", pl: "Krowa", phonetic: "kał", icon: "🐮", age: [4, 6] },
  { lessonId: "jungle_animals", en: "Pig", pl: "Świnka", phonetic: "pig", icon: "🐷", age: [4, 6] },
  { lessonId: "jungle_animals", en: "Duck", pl: "Kaczka", phonetic: "dak", icon: "🦆", age: [4, 6] },
  { lessonId: "jungle_animals", en: "Rabbit", pl: "Królik", phonetic: "rabit", icon: "🐰", age: [4, 6] },
  { lessonId: "jungle_animals", en: "Turtle", pl: "Żółw", phonetic: "tertl", icon: "🐢", age: [4, 6] },
  { lessonId: "shop_bakery", en: "Bread", pl: "Chleb", phonetic: "bred", icon: "🍞", age: [4, 6] },
  { lessonId: "shop_bakery", en: "Milk", pl: "Mleko", phonetic: "milk", icon: "🥛", age: [4, 6] },
  { lessonId: "shop_bakery", en: "Cheese", pl: "Ser", phonetic: "cziz", icon: "🧀", age: [4, 6] },
  { lessonId: "shop_bakery", en: "Cookie", pl: "Ciastko", phonetic: "kuki", icon: "🍪", age: [4, 6] },
  { lessonId: "colors", en: "Grey", pl: "Szary", phonetic: "grej", icon: "🩶", age: [4, 6] },
  { lessonId: "colors", en: "Gold", pl: "Złoty", phonetic: "gold", icon: "🥇", age: [4, 6] },
  { lessonId: "body_hurts", en: "Finger", pl: "Palec", phonetic: "finger", icon: "☝️", age: [4, 6] },
  { lessonId: "body_hurts", en: "Hair", pl: "Włosy", phonetic: "her", icon: "💇", age: [4, 6] },
  { lessonId: "pancakes_cooking", en: "Butter", pl: "Masło", phonetic: "bater", icon: "🧈", age: [4, 6] }
];

const FULL_LESSONS_DATABASE = [
  {
    id: "prepositions", title: "1. Gdzie to jest? (In / On / Under)", subtitle: "W środku, na górze, pod spodem", icon: "📦🧸", color: "from-sky-400 to-blue-500", borderColor: "border-sky-400", type: "prepositions",
    items: [
      { id: "c_in", prep: "In", en: "in the box", fullEn: "The cat is in the box.", pl: "W pudełku", plDesc: "Kotek jest w środku pudełka", animal: "🐱", container: "box", age: [4,6] },
      { id: "c_on", prep: "On", en: "on the box", fullEn: "The cat is on the box.", pl: "Na pudełku", plDesc: "Kotek jest na górze pudełka", animal: "🐱", container: "box", age: [4,6] },
      { id: "c_un", prep: "Under", en: "under the box", fullEn: "The cat is under the box.", pl: "Pod pudełkiem", plDesc: "Kotek jest pod pudełkiem", animal: "🐱", container: "box", age: [4,6] },
      { id: "b_in", prep: "In", en: "in the bag", fullEn: "The ball is in the bag.", pl: "W plecaku", plDesc: "Piłka jest w środku plecaka", animal: "⚽", container: "bag", age: [4,6] },
      { id: "b_on", prep: "On", en: "on the table", fullEn: "The ball is on the table.", pl: "Na stole", plDesc: "Piłka jest na górze stołu", animal: "⚽", container: "table", age: [4,6] },
      { id: "b_un", prep: "Under", en: "under the chair", fullEn: "The ball is under the chair.", pl: "Pod krzesłem", plDesc: "Piłka jest pod krzesłem", animal: "⚽", container: "chair", age: [4,6] },
      { id: "t_in", prep: "In", en: "in the basket", fullEn: "The bear is in the basket.", pl: "W koszyku", plDesc: "Miś jest w środku koszyka", animal: "🧸", container: "basket", age: [4,6] },
      { id: "t_on", prep: "On", en: "on the bed", fullEn: "The bear is on the bed.", pl: "Na łóżku", plDesc: "Miś jest na górze łóżka", animal: "🧸", container: "bed", age: [4,6] },
      { id: "t_un", prep: "Under", en: "under the tree", fullEn: "The bear is under the tree.", pl: "Pod drzewem", plDesc: "Miś jest pod drzewem", animal: "🧸", container: "tree", age: [4,6] }
    ]
  },
  {
    id: "shop_bakery", title: "2. Sklep i Zakupy", subtitle: "Piekarnia + Zwroty w sklepie", icon: "🥐🛒", color: "from-amber-400 to-orange-500", borderColor: "border-amber-400", type: "vocab_and_shop",
    items: [
      { en: "Crescent rolls", pl: "Rogaliki", phonetic: "kresent rols", icon: "🥐", isProduct: true, age: [4,6] },
      { en: "Chocolate", pl: "Czekolada", phonetic: "czoklyt", icon: "🍫", isProduct: true, age: [4,6] },
      { en: "Jam", pl: "Dżem", phonetic: "dżem", icon: "🍓🫙", isProduct: true, age: [4,6] },
      { en: "Apple", pl: "Jabłko", phonetic: "epyl", icon: "🍎", isProduct: true, age: [4,6] },
      { en: "Banana", pl: "Banan", phonetic: "banana", icon: "🍌", isProduct: true, age: [4,6] },
      { en: "Bakery", pl: "Piekarnia", phonetic: "bejkeri", icon: "🏪🥖", isPhrase: true, age: [4,6] },
      { en: "Hello", pl: "Cześć", phonetic: "helou", icon: "👋😊", isPhrase: true, age: [4,6] },
      { en: "Thank you", pl: "Dziękuję", phonetic: "fenk ju", icon: "🤝💛", isPhrase: true, age: [4,6] },
      { en: "Goodbye", pl: "Do widzenia", phonetic: "gudbaj", icon: "👋🚪", isPhrase: true, age: [4,6] }
    ]
  },
  {
    id: "fruits_veggies", title: "3. Warzywa i Owoce", subtitle: "Wszystkie z kartek", icon: "🥦🍓", color: "from-emerald-400 to-green-600", borderColor: "border-emerald-400", type: "vocab",
    items: [
      { en: "Tomato", pl: "Pomidor", phonetic: "tomejto", icon: "🍅", age: [4,6] },
      { en: "Cucumber", pl: "Ogórek", phonetic: "kjukamber", icon: "🥒", age: [4,6] },
      { en: "Carrot", pl: "Marchewka", phonetic: "karot", icon: "🥕", age: [4,6] },
      { en: "Broccoli", pl: "Brokuł", phonetic: "brokoli", icon: "🥦", age: [4,6] },
      { en: "Apple", pl: "Jabłko", phonetic: "epyl", icon: "🍎", age: [4,6] },
      { en: "Banana", pl: "Banan", phonetic: "banana", icon: "🍌", age: [4,6] },
      { en: "Strawberry", pl: "Truskawka", phonetic: "stroberi", icon: "🍓", age: [4,6] }
    ]
  },
  {
    id: "body_hurts", title: "4. Moje Ciało", subtitle: "Części ciała + Mały Lekarz", icon: "🦶🩹", color: "from-rose-400 to-pink-600", borderColor: "border-rose-400", type: "vocab",
    items: [
      { en: "Head", pl: "Głowa", phonetic: "hed", icon: "👦", hurtPhrase: "Ouch! My head hurts!", hurtPl: "Ała! Boli mnie głowa!", age: [4,6] },
      { en: "Eyes", pl: "Oczy", phonetic: "ajs", icon: "👀", hurtPhrase: "Ouch! My eyes hurt!", hurtPl: "Ała! Bolą mnie oczy!", age: [4,6] },
      { en: "Ears", pl: "Uszy", phonetic: "irs", icon: "👂", hurtPhrase: "Ouch! My ears hurt!", hurtPl: "Ała! Bolą mnie uszy!", age: [4,6] },
      { en: "Nose", pl: "Nos", phonetic: "nołs", icon: "👃", hurtPhrase: "Ouch! My nose hurts!", hurtPl: "Ała! Boli mnie nos!", age: [4,6] },
      { en: "Mouth", pl: "Buzia", phonetic: "małf", icon: "👄", hurtPhrase: "Ouch! My mouth hurts!", hurtPl: "Ała! Boli mnie buzia!", age: [4,6] },
      { en: "Arm", pl: "Ramię", phonetic: "arm", icon: "💪", hurtPhrase: "Ouch! My arm hurts!", hurtPl: "Ała! Boli mnie ramię!", age: [4,6] },
      { en: "Leg", pl: "Noga", phonetic: "leg", icon: "🦵", hurtPhrase: "Ouch! My leg hurts!", hurtPl: "Ała! Boli mnie noga!", age: [4,6] },
      { en: "Foot", pl: "Stopa", phonetic: "fut", icon: "🦶👟", hurtPhrase: "Ouch! My foot hurts!", hurtPl: "Ała! Boli mnie stopa!", age: [4,6] },
      {en: "Neck",
        pl: "Szyja",
        phonetic: "nek",
        icon: `<svg width="1em" height="1em" viewBox="0 0 64 64" class="inline-block" aria-label="Neck"><path d="M10 60 C10 47 18 42 26 42 L38 42 C46 42 54 47 54 60 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2.2"/><rect x="26.5" y="30" width="11" height="14" rx="4" fill="#fed7aa" stroke="#ea580c" stroke-width="2.2"/><circle cx="32" cy="19" r="13" fill="#fed7aa" stroke="#ea580c" stroke-width="2.2"/><path d="M19 17 C19 8 45 8 45 17 C42 12 22 12 19 17 Z" fill="#78350f"/><circle cx="27.5" cy="18" r="1.6" fill="#1e293b"/><circle cx="36.5" cy="18" r="1.6" fill="#1e293b"/><path d="M28 24 Q32 27 36 24" stroke="#9a3412" stroke-width="1.8" stroke-linecap="round" fill="none"/><ellipse cx="32" cy="37" rx="8.5" ry="4.5" fill="rgba(239,68,68,0.22)" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/><path d="M4 37 L20 37 M15 32 L21 37 L15 42" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M60 37 L44 37 M49 32 L43 37 L49 42" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
        hurtPhrase: "Ouch! My neck hurts!",
        hurtPl: "Ała! Boli mnie szyja!",
        age: [6]
      },
      {en: "Tummy",
        pl: "Brzuch",
        phonetic: "tami",
        icon: `<svg width="1em" height="1em" viewBox="0 0 64 64" class="inline-block" aria-label="Tummy"><circle cx="32" cy="11" r="7.5" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/><path d="M24.5 10 C24.5 4.5 39.5 4.5 39.5 10 Z" fill="#78350f"/><circle cx="29.5" cy="10.5" r="1.1" fill="#1e293b"/><circle cx="34.5" cy="10.5" r="1.1" fill="#1e293b"/><path d="M29.5 14 Q32 16 34.5 14" stroke="#9a3412" stroke-width="1.3" stroke-linecap="round" fill="none"/><path d="M20 21 L13 36 C12 38 15 39.5 16.5 37.5 L21 28" fill="#fed7aa" stroke="#ea580c" stroke-width="2" stroke-linejoin="round"/><path d="M44 21 L51 36 C52 38 49 39.5 47.5 37.5 L43 28" fill="#fed7aa" stroke="#ea580c" stroke-width="2" stroke-linejoin="round"/><path d="M20 21 C20 19 44 19 44 21 L43 48 L21 48 Z" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/><path d="M19 21 C22 19 42 19 45 21 L44 29 L20 29 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/><path d="M21 46 L43 46 L45 60 L34 60 L32 52 L30 60 L19 60 Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="2" stroke-linejoin="round"/><circle cx="32" cy="37.5" r="7.5" fill="rgba(239,68,68,0.2)" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/><circle cx="32" cy="38.5" r="1.6" fill="#c2410c"/><path d="M3 37.5 L21 37.5 M16 33 L22 37.5 L16 42" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M61 37.5 L43 37.5 M48 33 L42 37.5 L48 42" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
        hurtPhrase: "Ouch! My tummy hurts!",
        hurtPl: "Ała! Boli mnie brzuch!",
        age: [6]
      },
      {en: "Hand",
        pl: "Dłoń",
        phonetic: "hend",
        icon: "✋",
        hurtPhrase: "Ouch! My hand hurts!",
        hurtPl: "Ała! Boli mnie dłoń!",
        age: [6]
      },
      {en: "Knee",
        pl: "Kolano",
        phonetic: "ni",
        icon: `<svg width="1em" height="1em" viewBox="0 0 64 64" class="inline-block" aria-label="Knee"><path d="M14 12 L26 8 L43 27 C45 29.5 45 32.5 43 35 L35 53 L24 51 L31 32 L14 16 Z" fill="#fed7aa" stroke="#ea580c" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 13 L25 7 L30 13 L17 19 Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="2" stroke-linejoin="round"/><path d="M23 50 L36 52 L44 56 C46 57 45 60 42 60 L22 60 C20 60 20 57 21 55 Z" fill="#ef4444" stroke="#991b1b" stroke-width="2" stroke-linejoin="round"/><circle cx="39" cy="31" r="7.5" fill="rgba(239,68,68,0.24)" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="3 2"/><path d="M61 31 L48 31 M53 26 L47 31 L53 36" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M13 35 L29 32 M23 28 L30 32 L25 37" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
        hurtPhrase: "Ouch! My knee hurts!",
        hurtPl: "Ała! Boli mnie kolano!",
        age: [6]
      }
  {
    id: "jungle_animals", title: "5. Dżungla i Zwierzęta", subtitle: "Wielka baza zwierząt + Zagadki", icon: "🦁🐒", color: "from-lime-500 to-emerald-700", borderColor: "border-lime-500", type: "vocab",
    items: [
      { en: "Zebra", pl: "Zebra", phonetic: "zibra", icon: "🦓", age: [4,6] },
      { en: "Giraffe", pl: "Żyrafa", phonetic: "dżiraf", icon: "🦒", age: [4,6] },
      { en: "Snake", pl: "Wąż", phonetic: "snejk", icon: "🐍", age: [4,6] },
      { en: "Elephant", pl: "Słoń", phonetic: "elefant", icon: "🐘", age: [4,6] },
      { en: "Monkey", pl: "Małpka", phonetic: "manki", icon: "🐒", age: [4,6] },
      { en: "Crocodile", pl: "Krokodyl", phonetic: "krokodajl", icon: "🐊", age: [4,6] },
      { en: "Lion", pl: "Lew", phonetic: "lajon", icon: "🦁", age: [4,6] },
      { en: "Tiger", pl: "Tygrys", phonetic: "tajger", icon: "🐯", age: [4,6] },
      { en: "Hippo", pl: "Hipopotam", phonetic: "hipo", icon: "🦛", age: [4,6] },
      { en: "Rhino", pl: "Nosorożec", phonetic: "rajno", icon: "🦏", age: [4,6] },
      { en: "Bear", pl: "Niedźwiedź", phonetic: "ber", icon: "🐻", age: [4,6] },
      { en: "Wolf", pl: "Wilk", phonetic: "łulf", icon: "🐺", age: [4,6] },
      { en: "Fox", pl: "Lis", phonetic: "foks", icon: "🦊", age: [4,6] },
      { en: "Deer", pl: "Jeleń", phonetic: "dir", icon: "🦌", age: [4,6] },
      { en: "Owl", pl: "Sowa", phonetic: "ałl", icon: "🦉", age: [4,6] },
      { en: "Frog", pl: "Żaba", phonetic: "frog", icon: "🐸", age: [4,6] },
      { en: "Mouse", pl: "Myszka", phonetic: "małs", icon: "🐭", age: [4,6] },
      { en: "Bat", pl: "Nietoperz", phonetic: "bat", icon: "🦇", age: [4,6] },
      { en: "Eagle", pl: "Orzeł", phonetic: "igyl", icon: "🦅", age: [4,6] },
      { en: "Shark", pl: "Rekin", phonetic: "szark", icon: "🦈", age: [4,6] },
      { en: "Whale", pl: "Wieloryb", phonetic: "łejl", icon: "🐳", age: [4,6] },
      { en: "Dolphin", pl: "Delfin", phonetic: "dolfin", icon: "🐬", age: [4,6] },
      { en: "Penguin", pl: "Pingwin", phonetic: "pengłin", icon: "🐧", age: [4,6] },
      { en: "Kangaroo", pl: "Kangur", phonetic: "kangaru", icon: "🦘", age: [4,6] },
      { en: "Camel", pl: "Wielbłąd", phonetic: "kamel", icon: "🐫", age: [4,6] },
      { en: "Panda", pl: "Panda", phonetic: "panda", icon: "🐼", age: [4,6] },
      { en: "Gorilla", pl: "Goryl", phonetic: "gorila", icon: "🦍", age: [4,6] }
    ]
  },
  {
    id: "colors", title: "6. Kolory", subtitle: "Kolory + Kolorowe Przedmioty", icon: "🎨", color: "from-indigo-400 to-violet-500", borderColor: "border-indigo-400", type: "vocab",
    items: [
      { en: "Red", pl: "Czerwony", phonetic: "red", icon: "🔴", age: [4,6] },
      { en: "Blue", pl: "Niebieski", phonetic: "blu", icon: "🔵", age: [4,6] },
      { en: "Green", pl: "Zielony", phonetic: "grin", icon: "🟢", age: [4,6] },
      { en: "Yellow", pl: "Żółty", phonetic: "jeloł", icon: "🟡", age: [4,6] },
      { en: "Orange", pl: "Pomarańczowy", phonetic: "orindż", icon: "🟠", age: [4,6] },
      { en: "Purple", pl: "Fioletowy", phonetic: "perpl", icon: "🟣", age: [4,6] },
      { en: "Pink", pl: "Różowy", phonetic: "pink", icon: "🌸", age: [4,6] },
      { en: "Black", pl: "Czarny", phonetic: "blak", icon: "⚫", age: [4,6] },
      { en: "White", pl: "Biały", phonetic: "łajt", icon: "⚪", age: [4,6] },
      { en: "Brown", pl: "Brązowy", phonetic: "brałn", icon: "🟤", age: [4,6] }
    ]
  },
  {
    id: "numbers", title: "7. Cyfry (do 100)", subtitle: "Igor: 1-20 • Hubert: 1-100", icon: "🔢", color: "from-cyan-400 to-blue-500", borderColor: "border-cyan-400", type: "vocab",
    items: [
      { en: "One", pl: "Jeden", phonetic: "łan", icon: "1️⃣", age: [4,6] },
      { en: "Two", pl: "Dwa", phonetic: "tu", icon: "2️⃣", age: [4,6] },
      { en: "Three", pl: "Trzy", phonetic: "fri", icon: "3️⃣", age: [4,6] },
      { en: "Four", pl: "Cztery", phonetic: "for", icon: "4️⃣", age: [4,6] },
      { en: "Five", pl: "Pięć", phonetic: "fajw", icon: "5️⃣", age: [4,6] },
      { en: "Six", pl: "Sześć", phonetic: "siks", icon: "6️⃣", age: [4,6] },
      { en: "Seven", pl: "Siedem", phonetic: "sewen", icon: "7️⃣", age: [4,6] },
      { en: "Eight", pl: "Osiem", phonetic: "ejt", icon: "8️⃣", age: [4,6] },
      { en: "Nine", pl: "Dziewięć", phonetic: "najn", icon: "9️⃣", age: [4,6] },
      { en: "Ten", pl: "Dziesięć", phonetic: "ten", icon: "🔟", age: [4,6] },
      { en: "Eleven", pl: "Jedenaście", phonetic: "ilewen", icon: "1️⃣1️⃣", age: [4,6] },
      { en: "Twelve", pl: "Dwanaście", phonetic: "tłelw", icon: "1️⃣2️⃣", age: [4,6] },
      { en: "Thirteen", pl: "Trzynaście", phonetic: "fertin", icon: "1️⃣3️⃣", age: [4,6] },
      { en: "Fourteen", pl: "Czternaście", phonetic: "fortin", icon: "1️⃣4️⃣", age: [4,6] },
      { en: "Fifteen", pl: "Piętnaście", phonetic: "fiftin", icon: "1️⃣5️⃣", age: [4,6] },
      { en: "Sixteen", pl: "Szesnaście", phonetic: "sikstin", icon: "1️⃣6️⃣", age: [4,6] },
      { en: "Seventeen", pl: "Siedemnaście", phonetic: "sewentin", icon: "1️⃣7️⃣", age: [4,6] },
      { en: "Eighteen", pl: "Osiemnaście", phonetic: "ejtin", icon: "1️⃣8️⃣", age: [4,6] },
      { en: "Nineteen", pl: "Dziewiętnaście", phonetic: "najntin", icon: "1️⃣9️⃣", age: [4,6] },
      { en: "Twenty", pl: "Dwadzieścia", phonetic: "tłenti", icon: "2️⃣0️⃣", age: [4,6] },
      { en: "Thirty", pl: "Trzydzieści", phonetic: "ferti", icon: "3️⃣0️⃣", age: [6] },
      { en: "Forty", pl: "Czterdzieści", phonetic: "forti", icon: "4️⃣0️⃣", age: [6] },
      { en: "Fifty", pl: "Pięćdziesiąt", phonetic: "fifti", icon: "5️⃣0️⃣", age: [6] },
      { en: "One hundred", pl: "Sto", phonetic: "łan handred", icon: "💯", age: [6] }
    ]
  },
  {
    id: "memory_game", title: "8. Gra Memory", subtitle: "Znajdź pary i mów na głos", icon: "🃏🧠", color: "from-fuchsia-400 to-purple-600", borderColor: "border-fuchsia-400", type: "memory_game",
    items: [] 
  },
  {
    id: "pronunciation_studio", title: "9. Studio Wymowy", subtitle: "Ćwicz mówienie do mikrofonu!", icon: "🎤🗣️", color: "from-rose-500 to-red-600", borderColor: "border-rose-400", type: "mic_only",
    items: [
      { en: "Apple", pl: "Jabłko", phonetic: "epyl", icon: "🍎", age: [4,6] },
      { en: "Banana", pl: "Banan", phonetic: "banana", icon: "🍌", age: [4,6] },
      { en: "Lion", pl: "Lew", phonetic: "lajon", icon: "🦁", age: [4,6] },
      { en: "Zebra", pl: "Zebra", phonetic: "zibra", icon: "🦓", age: [4,6] },
      { en: "Hello", pl: "Cześć", phonetic: "helou", icon: "👋", age: [4,6] },
      { en: "Thank you", pl: "Dziękuję", phonetic: "fenk ju", icon: "🤝💛", age: [4,6] },
      { en: "Red", pl: "Czerwony", phonetic: "red", icon: "🔴", age: [4,6] },
      { en: "Blue", pl: "Niebieski", phonetic: "blu", icon: "🔵", age: [4,6] },
      { en: "One", pl: "Jeden", phonetic: "łan", icon: "1️⃣", age: [4,6] },
      { en: "Ten", pl: "Dziesięć", phonetic: "ten", icon: "🔟", age: [4,6] }
    ]
  },
  {
    id: "pancakes_cooking",
    title: "10. Pieczenie Pankejków (Pancakes)",
    subtitle: "Zakupy składników, kuchnia, owoce i karmienie zwierzaka!",
    icon: "🥞👨‍🍳",
    color: "from-amber-400 to-orange-500",
    borderColor: "border-amber-400",
    type: "vocab_and_pancakes",
    items: [
      { en: "Flour",   pl: "Mąka",   phonetic: "flałer", icon: getCustomPancakeSvg("flour", 64),   age: [4, 6] },
      { en: "Egg",     pl: "Jajko",  phonetic: "eg",     icon: "🥚",                             age: [4, 6] },
      { en: "Yoghurt", pl: "Jogurt", phonetic: "jogert", icon: getCustomPancakeSvg("yoghurt", 64), age: [4, 6] },
      { en: "Honey",   pl: "Miód",   phonetic: "hani",   icon: "🍯",                             age: [4, 6] },
      { en: "Oil",     pl: "Olej",   phonetic: "ojl",    icon: getCustomPancakeSvg("oil", 64),     age: [4, 6] }
    ]
  }
];
