import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';
import jaTranslations from './ja.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ja: { translation: jaTranslations }
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Update HTML lang attribute and body data attribute when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng);
  document.body.setAttribute('data-lang', lng);
  console.log('Language changed to:', lng); // Debug log
});

// Set initial lang attribute and data attribute
const initLang = i18n.language;
document.documentElement.setAttribute('lang', initLang);
document.body.setAttribute('data-lang', initLang);
console.log('Initial language set to:', initLang); // Debug log

export default i18n;