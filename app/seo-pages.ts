// Legacy re-export — source of truth is dictionaries/en.json
// Kept for backward compatibility; new code should use lib/i18n/dictionaries.ts
import { getDictionary, getAllSeoSlugs } from "../lib/i18n/dictionaries";
import { defaultLocale } from "../lib/i18n/config";

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  answer: string;
  sections: Array<{ title: string; paragraphs: string[] }>;
  steps: Array<{ title: string; copy: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

function buildSeoPages(): SeoPage[] {
  const dict = getDictionary(defaultLocale);
  const slugs = getAllSeoSlugs(dict);
  return slugs.map((slug) => {
    const p = (dict.seoPages as Record<string, Omit<SeoPage, "slug">>)[slug];
    return { slug, ...p };
  });
}

export const seoPages: SeoPage[] = buildSeoPages();

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}
