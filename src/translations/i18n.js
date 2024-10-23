import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

const translations = {
  en: {
    welcomeHome: 'Welcome to Home Screen',
    welcomeCart: 'Welcome to Cart Screen',
    name: 'Bodin',
  },
  sr: {
    welcomeHome: 'Dobrodosli na Pocetni Ekran',
    welcomeCart: 'Dobrodosli na Ekran Korpe',
    name: 'Bodin',
  },
};

const i18n = new I18n(translations);
i18n.locale = getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;

export { i18n };
