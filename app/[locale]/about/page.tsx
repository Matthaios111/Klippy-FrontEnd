import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { activeLocales, isActiveLocale } from "../../../lib/i18n/config";
import { getDictionary } from "../../../lib/i18n/dictionaries";
import { getCanonicalUrl, getHreflangAlternates, localizePath } from "../../../lib/i18n/routing";
import SiteHeader from "../../../components/site-header";
import SiteFooter from "../../../components/site-footer";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return activeLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale)) return {};
  const dict = getDictionary(locale);
  const path = "/about";
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    alternates: { canonical: getCanonicalUrl(path, locale), languages: getHreflangAlternates(path) },
    openGraph: { title: dict.about.metaTitle, description: dict.about.metaDescription, url: getCanonicalUrl(path, locale) },
  };
}

export default async function LocaleAboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isActiveLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.about;
  return (
    <main className="min-h-screen bg-[#f6f6f3] text-[#252525]">
      <SiteHeader locale={locale} />
      <section className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        <p className="text-sm text-[#777]">{t.eyebrow}</p>
        <h1 className="mt-5 text-5xl font-light leading-[0.98] tracking-[-0.055em] md:text-7xl">{t.h1}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#666] md:text-xl">{t.lead}</p>
      </section>
      <section className="border-y border-black/[0.08] bg-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 md:grid-cols-[0.85fr_1.15fr] md:px-8 md:py-24">
          <div>
            <p className="text-sm text-[#777]">{t.whyEyebrow}</p>
            <h2 className="mt-4 text-4xl font-light tracking-[-0.045em]">{t.whyTitle}</h2>
          </div>
          <div className="space-y-5 leading-relaxed text-[#666]">
            {t.whyParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 md:grid-cols-3">
          {t.values.map((v) => (
            <article key={v.title} className="rounded-2xl border border-black/[0.08] bg-white p-8">
              <h2 className="text-2xl font-medium tracking-[-0.03em]">{v.title}</h2>
              <p className="mt-4 leading-relaxed text-[#666]">{v.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="border-y border-black/[0.08] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
          <p className="text-sm text-[#777]">{t.nextEyebrow}</p>
          <h2 className="mt-3 text-4xl font-light tracking-[-0.045em]">{t.nextTitle}</h2>
          <div className="mt-8 space-y-5 leading-relaxed text-[#666]">
            {t.nextParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <a
              href={localizePath("/screen-time-calculator", locale)}
              className="inline-flex items-center gap-2 font-medium text-[#252525] underline underline-offset-4"
            >
              {t.nextCta} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="rounded-3xl bg-[#252525] p-8 text-white md:p-14">
          <p className="text-sm text-white/55">{t.fellaEyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-light tracking-[-0.045em]">{t.fellaTitle}</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-white/65">{t.fellaCopy}</p>
          <a
            href="https://usefella.com/"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-medium text-[#252525]"
          >
            {t.fellaCta} <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
