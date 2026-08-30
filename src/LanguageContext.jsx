import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext({
  lang: "en",
  dir: "ltr",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("nakheel-lang");
    return ["en", "ar", "ku"].includes(saved) ? saved : "en";
  });

  const dir = lang === "en" ? "ltr" : "rtl";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.documentElement.style.fontFamily = lang === "en"
      ? "inherit"
      : "Tahoma, Arial, sans-serif";
    localStorage.setItem("nakheel-lang", lang);
  }, [lang, dir]);

  const value = useMemo(() => ({
    lang,
    dir,
    setLang,
    t: (key) => translations[lang]?.[key] ?? translations.en[key] ?? key,
  }), [lang, dir]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
