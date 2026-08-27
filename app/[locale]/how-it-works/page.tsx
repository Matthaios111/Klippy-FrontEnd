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
  const path = "/how-it-works";
  return {
    title: dict.howItWorks.metaTitle,
    description: dict.howItWorks.metaDescription,
    alternates: { canonical: getCanonicalUrl(path, locale), languages: getHreflangAlternates(path) },
    openGraph: { title: dict.howItWorks.metaTitle, description: dict.howItWorks.metaDescription, url: getCanonicalUrl(path, locale) },
  };
}

export default async function LocaleHowItWorksPage({ params }: Props) {
  const { locale } = await params;
  if (!isActiveLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.howItWorks;
  return (
    <main className="min-h-screen bg-[#f6f6f3] text-[#252525]">
      <SiteHeader locale={locale} />
      <section className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        <p className="text-sm text-[#777]">{t.eyebrow}</p>
        <h1 className="mt-5 text-5xl font-light leading-[0.98] tracking-[-0.055em] md:text-7xl">{t.h1}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#666] md:text-xl">{t.lead}</p>
      </section>
      <section className="border-y border-black/[0.08] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
          <div className="max-w-2xl">
            <p className="text-sm text-[#777]">{t.ideaEyebrow}</p>
            <h2 className="mt-3 text-4xl font-light tracking-[-0.045em]">{t.ideaTitle}</h2>
            <p className="mt-5 leading-relaxed text-[#666]">{t.ideaCopy}</p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {t.steps.map((step) => (
              <article key={step.number} className="rounded-2xl border border-black/[0.08] bg-[#f6f6f3] p-8">
                <span className="text-sm text-[#888]">{step.number}</span>
                <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em]">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-[#666]">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-28">
        <div>
          <p className="text-sm text-[#777]">{t.calcEyebrow}</p>
          <h2 className="mt-4 text-4xl font-light tracking-[-0.045em]">{t.calcTitle}</h2>
        </div>
        <div className="space-y-5 leading-relaxed text-[#666]">
          {t.calcParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <a
            href={localizePath("/screen-time-calculator", locale)}
            className="inline-flex items-center gap-2 font-medium text-[#252525] underline underline-offset-4"
          >
            {t.calcCta} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
      <section className="border-y border-black/[0.08] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
          <p className="text-sm text-[#777]">{t.faqEyebrow}</p>
          <h2 className="mt-3 text-4xl font-light tracking-[-0.045em]">{t.faqTitle}</h2>
          <div className="mt-12 grid gap-9 md:grid-cols-2">
            {t.faqs.map((faq) => (
              <article key={faq.question}>
                <h3 className="text-lg font-medium tracking-[-0.02em]">{faq.question}</h3>
                <p className="mt-3 leading-relaxed text-[#666]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="max-w-3xl rounded-3xl bg-[#252525] p-8 text-white md:p-14">
          <p className="text-sm text-white/55">{t.fellaEyebrow}</p>
          <h2 className="mt-4 text-4xl font-light tracking-[-0.045em]">{t.fellaTitle}</h2>
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
