"use client";

import { useEffect } from "react";

export function AutoRefresh({ seconds = 3, max = 8 }: { seconds?: number; max?: number }) {
  useEffect(() => {
    const key = "otb-payment-refresh";
    const count = Number(window.sessionStorage.getItem(key) || "0");
    if (count >= max) return;
    window.sessionStorage.setItem(key, String(count + 1));
    const timer = window.setTimeout(() => {
      window.location.reload();
    }, seconds * 1000);
    return () => window.clearTimeout(timer);
  }, [max, seconds]);

  return null;
}
