import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";
import { activeLocales, defaultLocale } from "../lib/i18n/config";
import { getDictionary, getAllSeoSlugs } from "../lib/i18n/dictionaries";
import { getCanonicalUrl, getHreflangAlternates } from "../lib/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const dict = getDictionary(defaultLocale);
  const seoSlugs = getAllSeoSlugs(dict);

  const staticRoutes = ["", "/screen-time-calculator", "/how-it-works", "/about"];
  const allRoutes = [...staticRoutes, ...seoSlugs.map((s) => `/${s}`)];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of activeLocales) {
    for (const route of allRoutes) {
      const path = route === "" ? "/" : route;
      const url = getCanonicalUrl(path, locale);
      const languages = getHreflangAlternates(path);
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "/" ? 1 : path === "/screen-time-calculator" ? 0.9 : 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
