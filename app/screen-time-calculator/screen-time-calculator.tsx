"use client";

import { ArrowRight, Clock3, Minus, Plus } from "lucide-react";
import { useState } from "react";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import { getDictionary } from "../../lib/i18n/dictionaries";
import { formatHours as formatHoursLocale, formatNumber as formatNumberLocale } from "../../lib/i18n/format";
import { defaultLocale } from "../../lib/i18n/config";

const APP_STORE_URL = "https://apps.apple.com/app/id6784962499";

type Props = {
  locale?: string;
};

export function ScreenTimeCalculator({ locale = defaultLocale }: Props) {
  const dict = getDictionary(locale);
  const t = dict.calculator;

  const [dailyHours, setDailyHours] = useState(4);
  const [age, setAge] = useState(25);
  const [showResults, setShowResults] = useState(true);

  const weeklyHours = dailyHours * 7;
  const monthlyHours = dailyHours * 30.44;
  const yearlyHours = dailyHours * 365;
  const fullDays = yearlyHours / 24;
  const yearsTo75 = Math.max(0, 75 - age);
  const remainingYears = dailyHours * yearsTo75 / 24;
  const wakingPercent = Math.min(100, (dailyHours / 16) * 100);
  const savedDays = 365 / 24;

  function formatHours(hours: number) {
    return formatHoursLocale(hours, locale);
  }

  function formatNumber(value: number) {
    return formatNumberLocale(value, locale);
  }

  function updateHours(value: number) {
    setDailyHours(Math.max(0, Math.min(16, Math.round(value * 10) / 10)));
    setShowResults(true);
  }

  function updateAge(value: number) {
    setAge(Math.max(1, Math.min(100, Math.round(value))));
    setShowResults(true);
  }

  return (
    <main className="min-h-screen bg-[#f6f6f3] text-[#252525]">
      <SiteHeader locale={locale} />

      <section className="mx-auto max-w-5xl px-6 pb-14 pt-20 text-center md:px-8 md:pb-20 md:pt-28">
        <p className="text-sm text-[#777]">{t.eyebrow}</p>
        <h1 className="mt-5 text-5xl font-light leading-[0.98] tracking-[-0.055em] md:text-7xl">{t.h1}</h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[#666] md:text-xl">{t.lead}</p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 md:px-8 md:pb-28">
        <div className="rounded-3xl border border-black/[0.1] bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.05)] md:p-10">
          <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-center">
            <div>
              <label htmlFor="daily-hours" className="text-sm font-medium">
                {t.inputLabel}
              </label>
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  aria-label={t.reduceAria}
                  onClick={() => updateHours(dailyHours - 0.5)}
                  className="grid h-12 w-12 place-items-center rounded-full border border-black/[0.1] text-[#555] transition hover:border-black/[0.25] hover:text-[#252525]"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="flex h-16 flex-1 items-center justify-center rounded-2xl bg-[#f6f6f3] text-3xl font-light tracking-[-0.04em]">
                  {formatHours(dailyHours)}
                </div>
                <button
                  type="button"
                  aria-label={t.increaseAria}
                  onClick={() => updateHours(dailyHours + 0.5)}
                  className="grid h-12 w-12 place-items-center rounded-full border border-black/[0.1] text-[#555] transition hover:border-black/[0.25] hover:text-[#252525]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <input
                id="daily-hours"
                type="range"
                min="0"
                max="16"
                step="0.5"
                value={dailyHours}
                onChange={(event) => updateHours(Number(event.target.value))}
                className="mt-6 w-full accent-[#252525]"
              />
              <div className="mt-2 flex justify-between text-xs text-[#888]">
                <span>{t.axisLabels.zero}</span>
                <span>{t.axisLabels.middle}</span>
                <span>{t.axisLabels.max}</span>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-[#777]">{t.help}</p>
            </div>

            <div className="border-t border-black/[0.08] pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <label htmlFor="age" className="text-sm font-medium">
                {t.ageLabel}
              </label>
              <input
                id="age"
                type="number"
                min="1"
                max="100"
                value={age}
                onChange={(event) => updateAge(Number(event.target.value) || 1)}
                className="mt-4 h-16 w-full rounded-2xl border border-black/[0.1] bg-white px-5 text-3xl font-light tracking-[-0.04em] outline-none transition focus:border-black/[0.35]"
              />
              <p className="mt-4 text-sm leading-relaxed text-[#777]">{t.ageHelp}</p>
              <button
                type="button"
                onClick={() => setShowResults(true)}
                className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#252525] px-8 py-5 text-base font-medium text-white transition hover:bg-[#3a3a3a]"
              >
                {t.calcCta} <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {showResults && (
          <div className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ResultCard label={t.results.everyWeek} value={formatHours(weeklyHours)} />
              <ResultCard label={t.results.everyMonth} value={formatHours(monthlyHours)} />
              <ResultCard label={t.results.everyYear} value={formatHours(yearlyHours)} />
              <ResultCard label={t.results.fullDays} value={formatNumber(fullDays)} />
            </div>

            <div className="mt-8 grid gap-8 rounded-3xl bg-[#252525] p-7 text-white md:grid-cols-[1.15fr_0.85fr] md:p-10">
              <div>
                <p className="text-sm text-white/55">{t.atThisRate}</p>
                <h2 className="mt-3 text-4xl font-light tracking-[-0.05em] md:text-5xl">
                  {t.atThisRateValue.replace("{years}", formatNumber(remainingYears))}
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed text-white/65">{t.atThisRateCopy}</p>
              </div>
              <div className="rounded-2xl bg-white/[0.08] p-6">
                <Clock3 className="h-6 w-6 text-white/70" />
                <p className="mt-8 text-sm text-white/55">{t.wakingLabel}</p>
                <p className="mt-2 text-4xl font-light tracking-[-0.04em]">{formatNumber(wakingPercent)}%</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full rounded-full bg-white" style={{ width: `${wakingPercent}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-7">
                <p className="text-sm text-[#777]">{t.smallReductionTitle}</p>
                <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">
                  {t.smallReductionCopy.replace("{days}", formatNumber(savedDays))}
                </h2>
                <p className="mt-3 leading-relaxed text-[#666]">{t.smallReductionDesc}</p>
              </div>
              <div className="rounded-2xl border border-black/[0.08] bg-white p-7">
                <p className="text-sm text-[#777]">{t.fellaTitle}</p>
                <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">{t.fellaCopyTitle}</h2>
                <p className="mt-3 leading-relaxed text-[#666]">{t.fellaCopy}</p>
                <a
                  href={APP_STORE_URL}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#252525] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3a3a3a]"
                >
                  {t.fellaCta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="border-y border-black/[0.08] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
          <h2 className="text-3xl font-light tracking-[-0.04em] md:text-4xl">{t.faqTitle}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {t.faqs.map((faq) => (
              <Faq key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/[0.08] bg-white p-6">
      <p className="text-sm text-[#777]">{label}</p>
      <p className="mt-3 text-3xl font-light tracking-[-0.04em]">{value}</p>
    </div>
  );
}
function Faq({ question, answer }: { question: string; answer: string }) {
  return (
    <article>
      <h3 className="text-lg font-medium tracking-[-0.02em]">{question}</h3>
      <p className="mt-3 leading-relaxed text-[#666]">{answer}</p>
    </article>
  );
}
