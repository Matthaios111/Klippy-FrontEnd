import { Check } from "lucide-react";
import { getDictionary } from "../lib/i18n/dictionaries";
import { localizePath } from "../lib/i18n/routing";
import LanguagePicker from "./language-picker";

type Props = {
  locale: string;
};

export default function SiteFooter({ locale }: Props) {
  const dict = getDictionary(locale);
  const t = dict.footer;

  return (
    <footer className="border-t border-black/[0.08] px-6 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-[#777]">
        <a href={localizePath("/", locale)}>Klippy</a>
        <div className="flex flex-wrap items-center gap-5">
          <a href="https://usefella.com/privacy/">{t.privacy}</a>
          <a href="https://usefella.com/terms/">{t.terms}</a>
          <a href="https://usefella.com/support/">{t.support}</a>
          <a href="https://usefella.com/" className="inline-flex items-center gap-2">
            {t.builtByFella} <Check className="h-4 w-4" />
          </a>
        </div>
      </div>
      <nav
        id="guides"
        className="mx-auto mt-7 flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-3 border-t border-black/[0.06] pt-6 text-sm"
        aria-label={t.guidesAria}
      >
        <span className="font-medium text-[#252525]">{t.guidesLabel}</span>
        {dict.guides.map((g) => (
          <a
            key={g.slug}
            href={localizePath(`/${g.slug}`, locale)}
            className="text-[#777] transition hover:text-[#252525]"
          >
            {g.label}
          </a>
        ))}
      </nav>
      <div className="mx-auto mt-6 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-black/[0.06] pt-6">
        <p className="text-sm text-[#777]">© 2026 Klippy</p>
        <LanguagePicker locale={locale} />
      </div>
    </footer>
  );
}
