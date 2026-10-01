const languageButton = document.getElementById("language");
const translatable = [...document.querySelectorAll("[data-en]")];
const russianText = new Map(translatable.map(element => [element, element.textContent]));

function setLanguage(language) {
  const english = language === "en";
  document.documentElement.lang = english ? "en" : "ru";
  document.title = english
    ? document.body.dataset.titleEn || "Kofge-Timer — stream marathon timer"
    : document.body.dataset.titleRu || "Kofge-Timer — таймер для стрим-марафонов";
  for (const element of translatable) element.textContent = english ? element.dataset.en : russianText.get(element);
  languageButton.textContent = english ? "RU" : "EN";
  languageButton.setAttribute("aria-label", english ? "Переключить на русский" : "Switch to English");
  try { localStorage.setItem("kofge-timer-site-language", language); } catch { /* Private browsing can block storage. */ }
}

let storedLanguage;
try { storedLanguage = localStorage.getItem("kofge-timer-site-language"); } catch { /* Use browser language. */ }
setLanguage(storedLanguage === "en" || storedLanguage !== "ru" && /^en\b/i.test(navigator.language) ? "en" : "ru");
languageButton.addEventListener("click", () => setLanguage(document.documentElement.lang === "ru" ? "en" : "ru"));
