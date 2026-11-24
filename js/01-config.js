/* ============================================================================
   PLIK: js/01-config.js
   CENTRALNA KONFIGURACJA WERSJI ORAZ WŁASNE GRAFIKI SVG DLA PANKEJKÓW
   ============================================================================ */

const CURRENT_GAME_VERSION = "14.8";

const APP_CONFIG = {
  version: CURRENT_GAME_VERSION,
  parentPin: "0608",
  dailySpecialChestLimit: 3,
  gasApiUrl: "https://script.google.com/macros/s/AKfycbxgisF3IoghEU0dYhrnWX2w0uXOIqYMqo4XFYQZ6S3T48zZdHePRCOzrjejcYpIQ_bC/exec",
  whatsNewItems: [
    {
      icon: "🎁👑",
      title: "Naprawione otwieranie skrzynek, Garderoba, Spiżarnia i Klaser!",
      desc: "Wszystkie skrzynie (Brązowa, Srebrna, Złota – ze sklepiku, od Taty, z urodzin i ze Smoka) otwierają się teraz bezbłędnie!"
    },
    {
      icon: "🃏🦉",
      title: "Ulepszone Fiszki z polskim lektorem i szybkim powrotem do lekcji!",
      desc: "Sówka czyta teraz w fiszkach angielskie słówko oraz polskie tłumaczenie, a na górze widać wszystkie sekcje danej lekcji."
    },
    {
      icon: "🎧🔊",
      title: "Lekcja Dni tygodnia w pełni ze słuchu (PL ⇄ EN)!",
      desc: "Lektor zadaje pytania po polsku lub po angielsku, a odpowiedzi wybiera się z samych głośniczków."
    },
    {
      icon: "🔢💯",
      title: "Liczby 1–20 dla Igora oraz aż do 100 dla Huberta!",
      desc: "Igor ćwiczy wszystkie liczby od 1 do 20, a Hubert dodatkowo uczy się dziesiątek aż do 100."
    }
  ]
};

function syncVersionLabelsInDom() {
  document.title = `Akademia Angielskiego: Igor i Hubert - Wersja ${CURRENT_GAME_VERSION}`;
  document.querySelectorAll("[data-app-version]").forEach(el => {
    el.textContent = `Wersja ${CURRENT_GAME_VERSION}`;
  });
}

function getCustomPancakeSvg(type, sizePx = 58) {
  if (type === "flour") {
    return `<svg width="${sizePx}" height="${sizePx}" viewBox="0 0 64 64" class="inline-block drop-shadow-sm" aria-label="Flour">
      <rect x="13" y="11" width="38" height="47" rx="5" fill="#ffffff" stroke="#94a3b8" stroke-width="2.5"/>
      <polygon points="13,11 19,4 45,4 51,11" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
      <rect x="13" y="23" width="38" height="15" fill="#0284c7"/>
      <text x="32" y="33.5" font-family="sans-serif" font-size="8.8" font-weight="900" fill="#ffffff" text-anchor="middle">FLOUR</text>
      <path d="M24 49 Q32 42 40 49 Z" fill="#fef08a" stroke="#eab308" stroke-width="1.2"/>
    </svg>`;
  }
  if (type === "yoghurt") {
    return `<svg width="${sizePx}" height="${sizePx}" viewBox="0 0 64 64" class="inline-block drop-shadow-sm" aria-label="Natural Yoghurt">
      <polygon points="14,19 50,19 45,55 19,55" fill="#ffffff" stroke="#64748b" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="11" y="13" width="42" height="6" rx="3" fill="#0ea5e9" stroke="#0369a1" stroke-width="1.8"/>
      <polygon points="16,29 48,29 46,44 18,44" fill="#e0f2fe"/>
      <text x="32" y="38.5" font-family="sans-serif" font-size="6.1" font-weight="900" fill="#0369a1" text-anchor="middle">YOGHURT</text>
      <circle cx="32" cy="49" r="3" fill="#bae6fd"/>
    </svg>`;
  }
  if (type === "oil") {
    return `<svg width="${sizePx}" height="${sizePx}" viewBox="0 0 64 64" class="inline-block drop-shadow-sm" aria-label="Oil">
      <rect x="26" y="4" width="12" height="6" rx="2" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
      <path d="M27 10 L27 17 L18 26 L18 54 C18 57 20 59 23 59 L41 59 C44 59 46 57 46 54 L46 26 L37 17 L37 10 Z" fill="#fef9c3" stroke="#ca8a04" stroke-width="2.5"/>
      <path d="M19.5 29 L44.5 29 L44.5 54 C44.5 56 43 57.5 41 57.5 L23 57.5 C21 57.5 19.5 56 19.5 54 Z" fill="#facc15"/>
      <rect x="22" y="35" width="20" height="13" rx="2.5" fill="#ffffff" stroke="#ca8a04" stroke-width="1.5"/>
      <text x="32" y="44.5" font-family="sans-serif" font-size="8" font-weight="900" fill="#92400e" text-anchor="middle">OIL</text>
    </svg>`;
  }
  return "";
}

document.addEventListener("DOMContentLoaded", syncVersionLabelsInDom);
