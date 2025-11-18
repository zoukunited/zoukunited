"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

type Language = "en" | "pt" | "es"

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SUPPORTED_LANGUAGES: Language[] = ["en", "pt", "es"];

function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en";
  
  const browserLang = navigator.language.split("-")[0].toLowerCase();
  
  // Mapeia para nossas línguas suportadas
  if (browserLang === "pt") return "pt";
  if (browserLang === "es") return "es";  
  return "en";
}

export function LanguageProvider({
  children,
  initialLanguage = "en",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    // Verifica se há cookie de idioma no cliente
    const cookieLang = Cookies.get("language") as Language | undefined;
    
    // Se não há cookie ou o cookie é inválido, detecta do navegador
    if (!cookieLang || !SUPPORTED_LANGUAGES.includes(cookieLang)) {
      const detectedLang = detectBrowserLanguage();
      
      // Se o idioma detectado é diferente do inicial, atualiza
      if (detectedLang !== initialLanguage) {
        Cookies.set("language", detectedLang, { expires: 365 });
        setLanguageState(detectedLang);
      } else {
        // Se é o mesmo, apenas garante que o cookie está setado
        Cookies.set("language", detectedLang, { expires: 365 });
      }
    } else if (cookieLang !== language) {
      // Se há cookie e é diferente do estado atual, sincroniza
      setLanguageState(cookieLang);
    }
  }, [initialLanguage, language]);

  const setLanguage = (lang: Language) => {
    Cookies.set("language", lang, { expires: 365 });
    // Marca que o idioma foi escolhido manualmente
    Cookies.set("language-manual", "true", { expires: 365 });
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
