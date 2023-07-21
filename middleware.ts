import { NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { NextRequest } from "next/server";

// 下面陣列中的第一個語言是預設語言
let locales = ["zh-TW", "en-US"];

function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const defaultLocale = locales[0];
  return match(languages, locales, defaultLocale);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, `${request.url}`)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|assets|!mockServiceWorker.js|_next/static|_next/image|favicon.ico).*)",
  ],
};
