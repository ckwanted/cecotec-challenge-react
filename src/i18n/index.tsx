import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import en from "./en/i18n.json";
import es from "./es/i18n.json";

const resources = {
    en: {
        translation: en,
    },
    es: {
        translation: es,
    },
};

i18n.use(initReactI18next).use(LanguageDetector).init({
    resources,
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
        escapeValue: false
    },
    debug: process.env.NODE_ENV === 'development',
});

export default i18n;
