import { NextResponse } from "next/server";

export async function middleware(req) {
  const { cookies } = req;
  const url = req.nextUrl.clone();
  const validToken = cookies.get("user")?.value;
  console.log({ cookies });
  console.log({ req });

  if (url.pathname === "/") {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/dashboard") {
    if (!validToken) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
