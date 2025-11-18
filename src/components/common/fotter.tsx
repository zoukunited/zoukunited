"use client";

import { useLanguage } from "@/hooks/useLanguage";
import Modal from "./modal";
import { CustomButton } from "./custom-button";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { ScrollToTopInstantly } from "@/components/utils/scroll-to-top";

type LanguageCode = "en" | "pt" | "es";

const languages: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português (Brasil)" },
  { code: "es", label: "Español" }
];

export default function Footer() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const displayLanguage =
    languages.find((l) => l.code === language)?.label || "Language";

  return (
    <footer className="w-full bg-neutral-100">
      {/* Line */}
      <div className="max-w-[2000px] mx-auto w-full px-14">
        <div className="w-full h-px bg-neutral-200" />
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto w-full px-24 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-neutral-500">
          {t.footer?.copyright}
        </p>

        <CustomButton
          variant="neutral"
          onClick={() => setIsOpen(true)}
          icon="🌐"
        >
          {displayLanguage}
        </CustomButton>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t.footer?.language}
        description={t.footer?.languageDescription}
      >
        <div className="grid grid-cols-2 gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                ScrollToTopInstantly();
                window.location.reload();
              }}
              className={`
                flex items-center justify-center text-center
                bg-neutral-100 dark:bg-neutral-800
                rounded-xl px-4 py-4
                border border-neutral-200 dark:border-neutral-700
                hover:shadow-sm hover:bg-neutral-200 dark:hover:bg-neutral-700
                transition cursor-pointer
                ${
                  lang.code === language
                    ? "border-black dark:border-white bg-neutral-200 dark:bg-neutral-700"
                    : ""
                }
              `}
            >
              <span className="text-black dark:text-white">
                {lang.label}
              </span>
            </button>
          ))}
        </div>
      </Modal>
    </footer>
  );
}
