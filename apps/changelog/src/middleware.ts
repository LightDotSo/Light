import { RedirectPrefixes } from "@lightdotso/const";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const hostname = req.headers.get("host");

  if (hostname.endsWith("vercel.app")) {
    return;
  }

  const isExcluded = RedirectPrefixes.find(path => {
    return pathname?.startsWith(path);
  });

  if (isExcluded) {
    return NextResponse.redirect(`https://light.so${pathname}`);
  }

  return;
};
