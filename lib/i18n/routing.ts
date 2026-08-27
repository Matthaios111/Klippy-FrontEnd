import { SITE_URL } from "../site";
import { activeLocales, defaultLocale } from "./config";

function normalizePath(path: string): string {
  if (!path) return "/";
  if (path === "/") return "/";
  // Preserve hash and query separately
  const hashIndex = path.indexOf("#");
  const queryIndex = path.indexOf("?");
  let base = path;
  let suffix = "";
  if (hashIndex !== -1) {
    base = path.slice(0, hashIndex);
    suffix = path.slice(hashIndex);
  } else if (queryIndex !== -1) {
    base = path.slice(0, queryIndex);
    suffix = path.slice(queryIndex);
  }
  const normalizedBase = base.startsWith("/") ? base : `/${base}`;
  // Handle case where base is empty due to path being just "/#guides"
  if (normalizedBase === "" && suffix) return `/${suffix}`;
  return `${normalizedBase}${suffix}`;
}

/**
 * For default locale (en), return path without prefix.
 * For other locales, prefix with /{locale}.
 * Correctly handles hash fragments like "/#guides" -> "/fr#guides" (not "/fr/#guides").
 */
export function localizePath(path: string, locale: string): string {
  // Split hash/query
  const hashIndex = path.indexOf("#");
  const queryIndex = path.indexOf("?");
  let base = path;
  let suffix = "";
  if (hashIndex !== -1) {
    base = path.slice(0, hashIndex);
    suffix = path.slice(hashIndex);
  } else if (queryIndex !== -1) {
    base = path.slice(0, queryIndex);
    suffix = path.slice(queryIndex);
  }

  const normalizedBase = normalizePath(base);
  // Special case: "/#guides" or "/?a=b" where base is "/" or ""
  // For "/#guides", normalizedBase is "/" and suffix is "#guides" -> we want "/#guides" for en, "/fr#guides" for fr
  // Our normalizePath would have returned "/#guides" already, but we split, so handle
  let localizedBase: string;
  if (locale === defaultLocale) {
    localizedBase = normalizedBase;
  } else {
    if (normalizedBase === "/") {
      localizedBase = `/${locale}`;
    } else {
      localizedBase = `/${locale}${normalizedBase}`;
    }
  }
  return `${localizedBase}${suffix}`;
}

export function getCanonicalUrl(path: string, locale: string): string {
  return `${SITE_URL}${localizePath(path, locale)}`;
}

/**
 * Build reciprocal hreflang map for a given path (without locale prefix).
 * Includes every active locale + x-default (points to defaultLocale canonical).
 * Use as Next.js metadata alternates.languages and sitemap alternates.languages.
 */
export function getHreflangAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of activeLocales) {
    alternates[locale] = getCanonicalUrl(path, locale);
  }
  // x-default points to default locale version (current SEO recommendation)
  alternates["x-default"] = getCanonicalUrl(path, defaultLocale);
  return alternates;
}

/**
 * Extract locale prefix from pathname if present, else defaultLocale.
 * Does NOT redirect — returns default for root paths.
 */
export function getLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const maybe = segments[0];
  if (maybe && activeLocales.includes(maybe)) return maybe;
  return defaultLocale;
}

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const maybe = segments[0];
  if (maybe && activeLocales.includes(maybe)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

export function getActiveLocalePaths(path: string): string[] {
  return activeLocales.map((locale) => localizePath(path, locale));
}
