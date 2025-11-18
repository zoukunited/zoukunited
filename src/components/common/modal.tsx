"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="
          absolute inset-0
          backdrop-blur-md 
          bg-black/30 
          transition-opacity
        "
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 shadow-xl p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Header */}
        {(title || description) && (
          <div className="space-y-1 text-center mb-6">
            {title && (
              <h1 className="text-2xl font-bold text-black dark:text-white">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  );
}