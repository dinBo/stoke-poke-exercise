import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '../translations/i18n';

const i18n = new I18n(translations);
i18n.locale = getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(i18n.locale);

  // useEffect(() => {
  //   const loadLocale = async () => {
  //     const storedLocale = await AsyncStorage.getItem('appLanguage');
  //     if (storedLocale) {
  //       setLocale(storedLocale);
  //       i18n.locale = storedLocale;
  //     }
  //   };
  //   loadLocale();
  // }, []);

  const changeLanguage = async (newLocale) => {
    setLocale(newLocale);
    i18n.locale = newLocale;
    // await AsyncStorage.setItem('appLanguage', newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
export { i18n };
