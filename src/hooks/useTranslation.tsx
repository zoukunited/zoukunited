"use client";

import { useLanguage } from "./useLanguage";
import { translations } from "@/data/translations";

export function useTranslation() {
  const { language } = useLanguage();

  const t = translations[language as keyof typeof translations] ?? translations["en"];

  return { t };
}