import { Video } from "lucide-react";
import { getDictionary } from "../lib/i18n/dictionaries";
import { localizePath } from "../lib/i18n/routing";

type Props = {
  locale: string;
  variant?: "home" | "default";
};

export default function SiteHeader({ locale, variant = "default" }: Props) {
  const dict = getDictionary(locale);
  const t = dict.header;

  const homeHref = localizePath("/", locale);
  const howHref = localizePath("/how-it-works", locale);
  const aboutHref = localizePath("/about", locale);
  const calcHref = localizePath("/screen-time-calculator", locale);
  const guidesHref = localizePath("/#guides", locale);

  // For home variant, show Video icon like original home header
  const showIcon = variant === "home";

  return (
    <header className="border-b border-black/[0.08] bg-[#f6f6f3]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">
        <a href={homeHref} className="flex items-center gap-3" aria-label={t.homeAria}>
          {showIcon ? (
            <>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#252525] text-white">
                <Video className="h-5 w-5" />
              </span>
              <span className="text-xl font-medium tracking-[-0.03em]">Klippy</span>
            </>
          ) : (
            <span className="text-xl font-medium tracking-[-0.03em]">Klippy</span>
          )}
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {/* On home, original header hides Calculator link; others show it */}
          {variant !== "home" && (
            <a href={calcHref} className="text-sm text-[#717171] transition hover:text-[#252525]">
              {t.calculator}
            </a>
          )}
          <a href={howHref} className="text-sm text-[#717171] transition hover:text-[#252525]">
            {t.howItWorks}
          </a>
          <a href={guidesHref} className="text-sm text-[#717171] transition hover:text-[#252525]">
            {t.guides}
          </a>
          <a href={aboutHref} className="text-sm text-[#717171] transition hover:text-[#252525]">
            {t.about}
          </a>
          <a
            href="https://usefella.com/"
            className="rounded-xl bg-[#252525] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3a3a3a]"
          >
            {t.tryFella}
          </a>
        </nav>
        <a
          href="https://usefella.com/"
          className="rounded-full bg-[#252525] px-4 py-2.5 text-sm font-medium text-white md:hidden"
        >
          {t.tryFella}
        </a>
      </div>
    </header>
  );
}
