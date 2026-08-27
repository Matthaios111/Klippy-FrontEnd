import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { activeLocales, isActiveLocale } from "../../lib/i18n/config";
import { getDictionary } from "../../lib/i18n/dictionaries";
import { getCanonicalUrl, getHreflangAlternates, localizePath } from "../../lib/i18n/routing";
import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return activeLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale)) return {};
  const dict = getDictionary(locale);
  const path = "/";
  return {
    title: dict.site.title,
    description: dict.site.description,
    alternates: {
      canonical: getCanonicalUrl(path, locale),
      languages: getHreflangAlternates(path),
    },
    openGraph: {
      title: dict.site.title,
      description: dict.site.description,
      url: getCanonicalUrl(path, locale),
    },
  };
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  if (!isActiveLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.home;

  return (
    <main className="min-h-screen bg-[#f6f6f3] text-[#252525]">
      <SiteHeader locale={locale} variant="home" />
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1 className="whitespace-pre-line text-5xl font-light leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-8xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#666] md:text-xl">{t.lead}</p>
          <a
            href={localizePath("/screen-time-calculator", locale)}
            className="mt-12 inline-flex items-center justify-center gap-3 rounded-full bg-[#252525] px-10 py-5 text-base font-medium text-white transition hover:bg-[#3a3a3a]"
          >
            {t.cta} <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mt-4 text-sm text-[#858585]">{t.sub}</p>
        </div>
      </section>
      <section id="how-it-works" className="border-y border-black/[0.08] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-3 md:px-8 md:py-24">
          {t.steps.map((step) => (
            <article key={step.number} className="rounded-2xl border border-black/[0.08] bg-[#f6f6f3] p-7 md:p-8">
              <span className="text-sm text-[#888]">{step.number}</span>
              <h2 className="mt-10 text-2xl font-medium tracking-[-0.03em]">{step.title}</h2>
              <p className="mt-3 leading-relaxed text-[#666]">{step.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="about" className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="rounded-3xl bg-[#252525] px-7 py-12 text-white md:px-14 md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm text-white/55">{t.aboutEyebrow}</p>
            <h2 className="mt-4 text-4xl font-light tracking-[-0.045em] md:text-5xl">{t.aboutTitle}</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-white/65">{t.aboutCopy}</p>
            <a
              href="https://usefella.com/"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-base font-medium text-[#252525] transition hover:bg-[#e8e8e8]"
            >
              {t.aboutCta} <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
