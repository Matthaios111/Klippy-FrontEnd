import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { activeLocales, isActiveLocale } from "../../../lib/i18n/config";
import { getDictionary } from "../../../lib/i18n/dictionaries";
import { getCanonicalUrl, getHreflangAlternates } from "../../../lib/i18n/routing";
import { ScreenTimeCalculator } from "../../screen-time-calculator/screen-time-calculator";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return activeLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isActiveLocale(locale)) return {};
  const dict = getDictionary(locale);
  const path = "/screen-time-calculator";
  return {
    title: dict.calculator.metaTitle,
    description: dict.calculator.metaDescription,
    alternates: { canonical: getCanonicalUrl(path, locale), languages: getHreflangAlternates(path) },
    openGraph: { title: dict.calculator.metaTitle, description: dict.calculator.metaDescription, url: getCanonicalUrl(path, locale) },
  };
}

export default async function LocaleCalculatorPage({ params }: Props) {
  const { locale } = await params;
  if (!isActiveLocale(locale)) notFound();
  return <ScreenTimeCalculator locale={locale} />;
}
