"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe } from "lucide-react";
import { locales, defaultLocale } from "../lib/i18n/config";
import { localizePath, stripLocalePrefix } from "../lib/i18n/routing";

type Props = {
  locale: string;
};

export default function LanguagePicker({ locale }: Props) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const activeLocales = locales.filter((l) => l.active);
  const current = locales.find((l) => l.code === locale) || locales.find((l) => l.code === defaultLocale)!;

  // Compute base path without locale prefix (e.g. "/fr/about" -> "/about", "/about" -> "/about", "/" -> "/")
  const basePath = stripLocalePrefix(pathname);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-2 text-sm text-[#252525] transition hover:border-black/[0.15] hover:bg-[#f6f6f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10"
      >
        <Globe className="h-4 w-4 text-[#777]" aria-hidden="true" />
        <span>{current.nativeName}</span>
        <ChevronDown className={`h-4 w-4 text-[#777] transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Languages"
          className="absolute bottom-full left-0 z-50 mb-2 max-h-[min(60vh,22rem)] w-[min(20rem,calc(100vw-3rem))] overflow-auto rounded-2xl border border-black/[0.08] bg-white p-2 shadow-[0_16px_48px_rgba(0,0,0,0.12)] md:left-auto md:right-0 md:w-[22rem]"
        >
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {activeLocales.map((l) => {
              const href = localizePath(basePath, l.code);
              const isActive = l.code === locale;
              return (
                <a
                  key={l.code}
                  href={href}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 ${
                    isActive
                      ? "bg-[#252525] text-white"
                      : "text-[#252525] hover:bg-[#f6f6f3]"
                  }`}
                >
                  <span className="font-medium">{l.nativeName}</span>
                  <span className={`ml-2 text-xs ${isActive ? "text-white/60" : "text-[#999]"}`}>{l.code}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
