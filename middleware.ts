import { clerkMiddleware, createRouteMatcher,  clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Definir las rutas privadas
const isPrivateRoute = createRouteMatcher(["/modific(.*)"]);

export default clerkMiddleware(async (auth, request) => {

  if (!isPrivateRoute(request)) {
    return NextResponse.next();
  }

  const { userId } = await auth.protect();


  if (!userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
