import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zh from '../lang/zh.json';
import en from '../lang/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'zh',
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      zh: {
        translation: zh,
      },
      en: {
        translation: en,
      },
    },
  });

export default i18n;
