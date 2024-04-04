import i18next, { i18n as i18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { languages, namespaces } from "./@types/i18n.constants";
import es1 from './locales/es/global.json';
import val1 from './locales/val/global.json';
import HttpApi from "i18next-http-backend";

export const defaultNS = 'ns1';

i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'es',
  defaultNS,
  resources: {
    es: {
      ns1: es1,
    },
    val: {
      ns1: val1,
    },
  },
});

export default i18next;
