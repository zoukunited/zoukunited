import { en } from "./languages/en";
import { pt } from "./languages/pt";
import { es } from "./languages/es";

export const translations = {
  en,
  pt,
  es,
} as const;

export type TranslationSchema = typeof translations.en;
export type Language = keyof typeof translations;