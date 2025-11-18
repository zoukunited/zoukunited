"use client";

import { useEffect } from "react";

export function ScrollToTopInstantly() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
}

export function ScrollToTopOnMount() {
  useEffect(() => {
    ScrollToTopInstantly();
  }, []);

  return null;
}