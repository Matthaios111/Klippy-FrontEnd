import { defaultLocale, isActiveLocale } from "./config";
import en from "../../dictionaries/en.json";
import ar from "../../dictionaries/ar.json";
import cs from "../../dictionaries/cs.json";
import da from "../../dictionaries/da.json";
import de from "../../dictionaries/de.json";
import el from "../../dictionaries/el.json";
import es from "../../dictionaries/es.json";
import fi from "../../dictionaries/fi.json";
import fr from "../../dictionaries/fr.json";
import he from "../../dictionaries/he.json";
import hi from "../../dictionaries/hi.json";
import hu from "../../dictionaries/hu.json";
import id from "../../dictionaries/id.json";
import it from "../../dictionaries/it.json";
import ja from "../../dictionaries/ja.json";
import ko from "../../dictionaries/ko.json";
import ms from "../../dictionaries/ms.json";
import nb from "../../dictionaries/nb.json";
import nl from "../../dictionaries/nl.json";
import pl from "../../dictionaries/pl.json";
import pt from "../../dictionaries/pt.json";
import ro from "../../dictionaries/ro.json";
import ru from "../../dictionaries/ru.json";
import sk from "../../dictionaries/sk.json";
import sv from "../../dictionaries/sv.json";
import th from "../../dictionaries/th.json";
import tr from "../../dictionaries/tr.json";
import uk from "../../dictionaries/uk.json";
import vi from "../../dictionaries/vi.json";
import zh from "../../dictionaries/zh.json";
import zhTW from "../../dictionaries/zh-TW.json";

export type Dictionary = typeof en;

const dictionaries: Record<string, Dictionary> = {
  en,
  ar,
  cs,
  da,
  de,
  el,
  es,
  fi,
  fr,
  he,
  hi,
  hu,
  id,
  it,
  ja,
  ko,
  ms,
  nb,
  nl,
  pl,
  pt,
  ro,
  ru,
  sk,
  sv,
  th,
  tr,
  uk,
  vi,
  zh,
  "zh-TW": zhTW,
};

function assertDictionaryValid(locale: string, dict: Dictionary) {
  const requiredTopKeys: (keyof Dictionary)[] = [
    "site",
    "header",
    "footer",
    "guides",
    "home",
    "about",
    "howItWorks",
    "calculator",
    "seoPages",
    "guidePage",
  ];
  for (const key of requiredTopKeys) {
    if (!(key in dict)) {
      throw new Error(`Dictionary for locale "${locale}" is missing required key "${key}".`);
    }
  }
  if (!dict.seoPages || typeof dict.seoPages !== "object") {
    throw new Error(`Dictionary for locale "${locale}" has invalid seoPages.`);
  }
}

export function getDictionary(locale: string): Dictionary {
  const dict = dictionaries[locale];
  if (!dict) {
    if (isActiveLocale(locale)) {
      throw new Error(
        `Missing dictionary for active locale "${locale}". Add dictionaries/${locale}.json and import it in lib/i18n/dictionaries.ts.`
      );
    }
    return dictionaries[defaultLocale];
  }
  assertDictionaryValid(locale, dict);
  return dict;
}

export function getSeoPage(dictionary: Dictionary, slug: string) {
  const pages = dictionary.seoPages as Record<string, SeoPageDict>;
  return pages[slug];
}

export type SeoPageDict = {
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

export function getAllSeoSlugs(dictionary: Dictionary): string[] {
  return Object.keys(dictionary.seoPages);
}
