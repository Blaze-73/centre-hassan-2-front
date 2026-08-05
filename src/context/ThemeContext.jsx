import { createContext, useState, useEffect, useCallback } from 'react';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('lang') || 'fr');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('lang-ar', lang === 'ar');
  }, [lang]);

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
  }, []);

  return (
    <ThemeContext.Provider value={{ lang, setLang }}>
      {children}
    </ThemeContext.Provider>
  );
}
