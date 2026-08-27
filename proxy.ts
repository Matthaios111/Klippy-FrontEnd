import { NextRequest, NextResponse } from "next/server";

// Keep in sync with dictionaries/en.json
const SEO_SLUGS = [
  "screen-time-by-age-calculator",
  "screen-time-in-days",
  "phone-use-calculator",
  "social-media-time-calculator",
  "how-to-check-screen-time-iphone",
  "how-to-reduce-screen-time-iphone",
  "how-to-limit-social-media-on-iphone",
  "digital-detox-plan",
  "stop-checking-phone",
  "screen-time-vs-app-blocker",
];

const EN_STATIC_ROUTES = [
  "/",
  "/about",
  "/how-it-works",
  "/screen-time-calculator",
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 1) /en and /en/* -> redirect to prefixless (avoid duplicate indexable)
  if (pathname === "/en") {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }
  if (pathname.startsWith("/en/")) {
    const rest = pathname.slice(3);
    return NextResponse.redirect(new URL(rest || "/", request.url), 308);
  }

  // 2) Prefixless English routes -> rewrite to /en/* internally
  // This keeps URL prefixless for the user but serves via [locale] segment
  // e.g. /about -> /en/about, /screen-time-by-age-calculator -> /en/...
  const isSeoSlug = SEO_SLUGS.some((slug) => pathname === `/${slug}`);
  const isEnStatic = EN_STATIC_ROUTES.includes(pathname);

  if (isEnStatic || isSeoSlug) {
    const url = request.nextUrl.clone();
    // "/" -> "/en" (without trailing slash, Next will handle)
    if (pathname === "/") {
      url.pathname = "/en";
    } else {
      url.pathname = `/en${pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  // No rewrite/redirect — e.g. /fr, /fr/about, /fr/slug already have locale prefix
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*|_vercel).*)"],
};
