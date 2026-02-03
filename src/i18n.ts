import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import lt from "./locales/lt.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      lt: { translation: lt },
    },
    lng: "en",          
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
