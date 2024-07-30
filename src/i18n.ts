import i18next, { i18n as i18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import es1 from './locales/es/global.json';
import val1 from './locales/val/global.json';

export const defaultNS = 'ns1';

/**
 * Initializes the i18next library for internationalization.
 *
 * @param {Object} options - The options for initializing i18next.
 * @param {boolean} options.debug - Enables debug mode, which logs information about i18next's operations to the console.
 * @param {string} options.fallbackLng - Sets the fallback language to Spanish ('es'). If a translation is not found for the current language, i18next will fallback to Spanish.
 * @param {string} options.defaultNS - Sets the default namespace to 'ns1'. Namespaces are used to organize translations into groups.
 * @param {Object} options.resources - The resources (translations) for different languages.
 * @param {Object} options.resources.es - The translations for Spanish language.
 * @param {Object} options.resources.es.ns1 - The translations for the 'ns1' namespace in Spanish language.
 * @param {Object} options.resources.val - The translations for Valenciano language.
 * @param {Object} options.resources.val.ns1 - The translations for the 'ns1' namespace in Valenciano language.
 */
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
