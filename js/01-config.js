/* ============================================================================
   PLIK: js/01-config.js
   CENTRALNA KONFIGURACJA APLIKACJI I HISTORIA WERSJI
   ============================================================================ */

const APP_CONFIG = {
  // JEDYNE MIEJSCE W CAŁYM KODZIE, GDZIE ZMIENIASZ NUMER WERSJI:
  version: "14.0",
  buildDate: "2026-11",
  appName: "Akademia Angielskiego",

  // Adres Twojego backendu Google Apps Script (wklej swój aktualny URL):
  gasWebAppUrl: "https://script.google.com/macros/s/AKfycbxgisF3IoghEU0dYhrnWX2w0uXOIqYMqo4XFYQZ6S3T48zZdHePRCOzrjejcYpIQ_bC/exec",

  // Automatyczny opis "Co nowego?" – Sówka odczyta to po wejściu do nowej wersji:
  whatsNew: {
    version: "14.0",
    title: "Nowa wersja 14.0 – Porządki w kodzie i nowe rysunki!",
    voiceSummaryPl: "Witajcie w wersji czternastej! Podzieliliśmy aplikację na szybkie moduły oraz dodaliśmy nowe rysunki mąki, jogurtu naturalnego i oleju w kuchni pankejków!",
    changes: [
      "🧩 Podział aplikacji na przejrzyste pliki modułowe (.js) z centralnym numerem wersji.",
      "🥞 Nowe, wyraźne ikony składników w Kuchni Pankejków (mąka, jogurt naturalny, olej).",
      "🏆 Przygotowanie pod nowe funkcje w Panelu Rodzica i Walkę ze Smokiem."
    ]
  }
};

// Funkcja pomocnicza wstrzykująca automatycznie wersję wszędzie tam, gdzie ma atrybut data-app-version
function applyAppVersionToDom() {
  document.querySelectorAll("[data-app-version]").forEach(el => {
    el.textContent = `v${APP_CONFIG.version}`;
  });
  document.title = `${APP_CONFIG.appName} (v${APP_CONFIG.version})`;
}

document.addEventListener("DOMContentLoaded", applyAppVersionToDom);
