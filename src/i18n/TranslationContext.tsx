import React, { createContext, useContext, useEffect, useState } from "react";
import ru, { TranslationKeys } from "./ru";

const TRANSLATE_URL = "https://functions.poehali.dev/4a69b50b-c68e-4eab-a7b9-8875ac6f6629";

type Translations = Record<string, string>;

interface TranslationContextValue {
  t: (key: TranslationKeys) => string;
  lang: string;
  loading: boolean;
}

const TranslationContext = createContext<TranslationContextValue>({
  t: (key) => ru[key],
  lang: "RU",
  loading: false,
});

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [translations, setTranslations] = useState<Translations>(ru as Translations);
  const [lang, setLang] = useState("RU");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(TRANSLATE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texts: ru }),
        });
        const data = await response.json();
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        if (parsed.lang && parsed.lang !== "RU") {
          setTranslations(parsed.translations);
          setLang(parsed.lang);
          document.documentElement.lang = parsed.lang.toLowerCase().slice(0, 2);
        }
      } catch {
        // fallback to Russian
      } finally {
        setLoading(false);
      }
    };

    fetchTranslations();
  }, []);

  const t = (key: TranslationKeys): string => {
    return translations[key] ?? ru[key];
  };

  return (
    <TranslationContext.Provider value={{ t, lang, loading }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
