
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations } from './translations';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Force language to 'ar'
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    localStorage.setItem('dtc-lang', 'ar');
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  const toggleLanguage = () => {
    // Disable toggling
    console.log('Language toggling is disabled');
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let result: any = translations['ar'];
    for (const key of keys) {
      if (result[key] === undefined) return path;
      result = result[key];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
