import fr from "./fr.json";
import en from "./en.json";
import { createContext, useContext, useEffect, useState } from 'react';

export const dictionnaire = fr;
export type Language = 'fr' | 'en';
type Dictionary = typeof fr;

const dictionaryList: Record<Language, Dictionary> = {
  fr,
  en,
};
  
export const languageOptions: Record<Language, string> = {
  fr: "Français",
  en: "English",
};
interface LanguageContextType {
  userLanguage: Language;
  dictionnaire: Dictionary;
  userLanguageChange: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  userLanguage: "fr",
  dictionnaire: dictionaryList.fr,
  userLanguageChange: () => {},
});

// it provides the language context to app
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultLanguage = window.localStorage.getItem("rcml-lang") as Language | null;

  const [userLanguage, setUserLanguage] = useState<Language>(
    defaultLanguage ??
      (navigator.languages.find(
        (lang): lang is Language => lang in languageOptions
      ) ?? "fr")
  );

  const userLanguageChange = (selected: Language) => {
    setUserLanguage(selected);
    window.localStorage.setItem("rcml-lang", selected);
  };
  

  const provider: LanguageContextType = {
    userLanguage,
    dictionnaire: dictionaryList[userLanguage],
    userLanguageChange,
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
};
