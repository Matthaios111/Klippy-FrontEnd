export type LocaleCode = string;

export type LocaleConfig = {
  code: string;
  name: string;
  nativeName: string;
  active: boolean;
};

export const defaultLocale = "en";

export const locales: LocaleConfig[] = [
  { code: "en", name: "English", nativeName: "English", active: true },
  // Inactive locales — enable by setting active: true and adding dictionaries/{code}.json
  { code: "de", name: "German", nativeName: "Deutsch", active: true },
  { code: "fr", name: "French", nativeName: "Français", active: true },
  { code: "es", name: "Spanish", nativeName: "Español", active: true },
  { code: "pt", name: "Portuguese", nativeName: "Português", active: true },
  { code: "it", name: "Italian", nativeName: "Italiano", active: true },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", active: true },
  { code: "pl", name: "Polish", nativeName: "Polski", active: true },
  { code: "ja", name: "Japanese", nativeName: "日本語", active: true },
  { code: "ko", name: "Korean", nativeName: "한국어", active: true },
  { code: "zh", name: "Chinese (Simplified)", nativeName: "简体中文", active: true },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文", active: true },
  { code: "ru", name: "Russian", nativeName: "Русский", active: true },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", active: true },
  { code: "ar", name: "Arabic", nativeName: "العربية", active: true },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", active: true },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", active: true },
  { code: "th", name: "Thai", nativeName: "ไทย", active: true },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", active: true },
  { code: "sv", name: "Swedish", nativeName: "Svenska", active: true },
  { code: "da", name: "Danish", nativeName: "Dansk", active: true },
  { code: "nb", name: "Norwegian", nativeName: "Norsk", active: true },
  { code: "fi", name: "Finnish", nativeName: "Suomi", active: true },
  { code: "cs", name: "Czech", nativeName: "Čeština", active: true },
  { code: "el", name: "Greek", nativeName: "Ελληνικά", active: true },
  { code: "he", name: "Hebrew", nativeName: "עברית", active: true },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", active: true },
  { code: "ro", name: "Romanian", nativeName: "Română", active: true },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", active: true },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", active: true },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina", active: true },
];

export const activeLocales = locales.filter((l) => l.active).map((l) => l.code);
export const allLocaleCodes = locales.map((l) => l.code);

export function isValidLocale(code: string): boolean {
  return allLocaleCodes.includes(code);
}

export function isActiveLocale(code: string): boolean {
  return activeLocales.includes(code);
}

export function getLocaleConfig(code: string): LocaleConfig | undefined {
  return locales.find((l) => l.code === code);
}
