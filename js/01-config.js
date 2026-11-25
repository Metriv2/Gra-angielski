/* ============================================================================
   PLIK: js/01-config.js
   CENTRALNA KONFIGURACJA WERSJI (15.0) ORAZ WŁASNE GRAFIKI SVG (PANKEJKI I CIAŁO)
   ============================================================================ */

const CURRENT_GAME_VERSION = "15.0";

const APP_CONFIG = {
  version: CURRENT_GAME_VERSION,
  parentPin: "0608",
  dailySpecialChestLimit: 3,
  gasApiUrl: "https://script.google.com/macros/s/AKfycbxgisF3IoghEU0dYhrnWX2w0uXOIqYMqo4XFYQZ6S3T48zZdHePRCOzrjejcYpIQ_bC/exec",
  whatsNewItems: [
    {
      icon: "🎲⚡",
      title: "Nowe przyciski w Garderobie: Wylosuj strój i Załóż cały zestaw!",
      desc: "Kliknij u góry przycisk 👑 Awatar, a potem zaraz pod swoim bohaterem kliknij zielony przycisk 🎲 Wylosuj strój albo fioletowy przycisk ⚡ Załóż cały zestaw (np. całego Strażaka lub Batmana jednym kliknięciem)!"
    },
    {
      icon: "🔥⭐",
      title: "Seria bez błędu (Combo) daje dodatkowe Gwiazdki!",
      desc: "Słuchaj uważnie i odpowiadaj dobrze kilka razy z rzędu! Za 3 trafienia pod rząd dostaniesz +2 ⭐, za 5 trafień +5 ⭐, a za 8 trafień aż +10 dodatkowych gwiazdek!"
    },
    {
      icon: "🦉🎯",
      title: "Szybka dogrywka na koniec rundy!",
      desc: "Jeśli w trakcie lekcji zdarzy się mała pomyłka, na końcu rundy Sówka zapyta Cię jeszcze raz tylko o te pomylone słówka, żebyś mógł je od razu poprawić!"
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

function getCustomBodySvg(type, size = "1em") {
  if (type === "neck") {
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" class="inline-block" aria-label="Neck"><path d="M10 60 C10 47 18 42 26 42 L38 42 C46 42 54 47 54 60 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2.2"/><rect x="26.5" y="30" width="11" height="14" rx="4" fill="#fed7aa" stroke="#ea580c" stroke-width="2.2"/><circle cx="32" cy="19" r="13" fill="#fed7aa" stroke="#ea580c" stroke-width="2.2"/><path d="M19 17 C19 8 45 8 45 17 C42 12 22 12 19 17 Z" fill="#78350f"/><circle cx="27.5" cy="18" r="1.6" fill="#1e293b"/><circle cx="36.5" cy="18" r="1.6" fill="#1e293b"/><path d="M28 24 Q32 27 36 24" stroke="#9a3412" stroke-width="1.8" stroke-linecap="round" fill="none"/><ellipse cx="32" cy="37" rx="8.5" ry="4.5" fill="rgba(239,68,68,0.22)" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/><path d="M4 37 L20 37 M15 32 L21 37 L15 42" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M60 37 L44 37 M49 32 L43 37 L49 42" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
  }
  if (type === "tummy") {
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" class="inline-block" aria-label="Tummy"><circle cx="32" cy="11" r="7.5" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/><path d="M24.5 10 C24.5 4.5 39.5 4.5 39.5 10 Z" fill="#78350f"/><circle cx="29.5" cy="10.5" r="1.1" fill="#1e293b"/><circle cx="34.5" cy="10.5" r="1.1" fill="#1e293b"/><path d="M29.5 14 Q32 16 34.5 14" stroke="#9a3412" stroke-width="1.3" stroke-linecap="round" fill="none"/><path d="M20 21 L13 36 C12 38 15 39.5 16.5 37.5 L21 28" fill="#fed7aa" stroke="#ea580c" stroke-width="2" stroke-linejoin="round"/><path d="M44 21 L51 36 C52 38 49 39.5 47.5 37.5 L43 28" fill="#fed7aa" stroke="#ea580c" stroke-width="2" stroke-linejoin="round"/><path d="M20 21 C20 19 44 19 44 21 L43 48 L21 48 Z" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/><path d="M19 21 C22 19 42 19 45 21 L44 29 L20 29 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/><path d="M21 46 L43 46 L45 60 L34 60 L32 52 L30 60 L19 60 Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="2" stroke-linejoin="round"/><circle cx="32" cy="37.5" r="7.5" fill="rgba(239,68,68,0.2)" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 2"/><circle cx="32" cy="38.5" r="1.6" fill="#c2410c"/><path d="M3 37.5 L21 37.5 M16 33 L22 37.5 L16 42" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M61 37.5 L43 37.5 M48 33 L42 37.5 L48 42" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
  }
  if (type === "knee") {
    return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" class="inline-block" aria-label="Knee"><path d="M14 12 L26 8 L43 27 C45 29.5 45 32.5 43 35 L35 53 L24 51 L31 32 L14 16 Z" fill="#fed7aa" stroke="#ea580c" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 13 L25 7 L30 13 L17 19 Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="2" stroke-linejoin="round"/><path d="M23 50 L36 52 L44 56 C46 57 45 60 42 60 L22 60 C20 60 20 57 21 55 Z" fill="#ef4444" stroke="#991b1b" stroke-width="2" stroke-linejoin="round"/><circle cx="39" cy="31" r="7.5" fill="rgba(239,68,68,0.24)" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="3 2"/><path d="M61 31 L48 31 M53 26 L47 31 L53 36" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M13 35 L29 32 M23 28 L30 32 L25 37" stroke="#dc2626" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
  }
  return "";
}

document.addEventListener("DOMContentLoaded", syncVersionLabelsInDom);
