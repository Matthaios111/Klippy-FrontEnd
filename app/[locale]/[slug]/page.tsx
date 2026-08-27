import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { activeLocales, isActiveLocale } from "../../../lib/i18n/config";
import { getDictionary, getAllSeoSlugs, getSeoPage } from "../../../lib/i18n/dictionaries";
import { getCanonicalUrl, getHreflangAlternates, localizePath } from "../../../lib/i18n/routing";
import SiteHeader from "../../../components/site-header";
import SiteFooter from "../../../components/site-footer";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  // Generate all locale x slug combos for active locales only
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of activeLocales) {
    const dict = getDictionary(locale);
    for (const slug of getAllSeoSlugs(dict)) {
      params.push({ locale, slug });
    }
  }
  return params;
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isActiveLocale(locale)) return {};
  const dict = getDictionary(locale);
  const page = getSeoPage(dict, slug);
  if (!page) return {};
  const path = `/${slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: getCanonicalUrl(path, locale), languages: getHreflangAlternates(path) },
    openGraph: { title: page.title, description: page.description, url: getCanonicalUrl(path, locale) },
  };
}

export default async function LocaleSeoPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isActiveLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const page = getSeoPage(dict, slug);
  if (!page) notFound();
  const path = `/${slug}`;
  const canonical = getCanonicalUrl(path, locale);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", name: page.title, description: page.description, url: canonical },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
  return (
    <main className="min-h-screen bg-[#f6f6f3] text-[#252525]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader locale={locale} />
      <section className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        <p className="text-sm text-[#777]">{page.eyebrow}</p>
        <h1 className="mt-5 text-5xl font-light leading-[0.98] tracking-[-0.055em] md:text-7xl">{page.h1}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#666] md:text-xl">{page.lead}</p>
      </section>
      <section className="border-y border-black/[0.08] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
          <h2 className="text-3xl font-light tracking-[-0.04em]">{dict.guidePage.shortAnswer}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#666]">{page.answer}</p>
          <a
            href={localizePath("/screen-time-calculator", locale)}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#252525] px-7 py-4 font-medium text-white transition hover:bg-[#3a3a3a]"
          >
            {dict.guidePage.useCalculatorCta} <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-20 md:px-8 md:py-28">
        <div className="space-y-16">
          {page.sections.map((section) => (
            <article key={section.title}>
              <h2 className="text-3xl font-light tracking-[-0.04em]">{section.title}</h2>
              <div className="mt-6 max-w-3xl space-y-5 leading-relaxed text-[#666]">
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="border-y border-black/[0.08] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
          <p className="text-sm text-[#777]">{dict.guidePage.nextStepEyebrow}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {page.steps.map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-black/[0.08] bg-[#f6f6f3] p-7">
                <span className="text-sm text-[#888]">0{index + 1}</span>
                <h2 className="mt-8 text-2xl font-medium tracking-[-0.03em]">{step.title}</h2>
                <p className="mt-3 leading-relaxed text-[#666]">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-black/[0.08] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
          <h2 className="text-3xl font-light tracking-[-0.04em] md:text-4xl">{dict.guidePage.faqTitle}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {page.faqs.map((faq) => (
              <article key={faq.question}>
                <h3 className="text-lg font-medium tracking-[-0.02em]">{faq.question}</h3>
                <p className="mt-3 leading-relaxed text-[#666]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-12 md:px-8">
        <div className="rounded-2xl border border-black/[0.08] bg-white p-6 md:p-8">
          <p className="text-sm font-medium text-[#252525]">Continue with related guides</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {dict.guides
              .filter((g) => g.slug !== slug)
              .slice(0, 4)
              .map((g) => (
                <a
                  key={g.slug}
                  href={localizePath(`/${g.slug}`, locale)}
                  className="rounded-full border border-black/[0.08] bg-[#f6f6f3] px-4 py-2 text-sm text-[#555] transition hover:border-black/[0.15] hover:text-[#252525]"
                >
                  {g.label}
                </a>
              ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-[#666]">
            Klippy stays free and private. If you decide you need a stronger boundary for a few apps,{" "}
            <a href="https://usefella.com/" className="font-medium text-[#252525] underline underline-offset-4">
              Fella blocks selected iPhone apps
            </a>{" "}
            while leaving the rest of your phone usable.
          </p>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
