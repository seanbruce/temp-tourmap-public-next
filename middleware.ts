import { NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { NextRequest } from "next/server";
import { v4 } from "uuid";
import { userUUIDCookieName } from "./utils/constants";

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

  let response: NextResponse<unknown>;
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    response = NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, `${request.url}`)
    );
  } else {
    response = NextResponse.next();
  }
  const hasNoUserUUID = !request.cookies.has(userUUIDCookieName);
  if (hasNoUserUUID) {
    response.cookies.set(userUUIDCookieName, v4(), {
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return response;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|assets|!mockServiceWorker.js|_next/static|_next/image|favicon.ico).*)",
  ],
};
