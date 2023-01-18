import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	// We need to create a response and hand it to the supabase client to be able to modify the response headers.
	const res = NextResponse.next();
	// Create authenticated Supabase Client.
	const supabase = createMiddlewareSupabaseClient({ req, res });
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const redirectUrl = req.nextUrl.clone();

	// Check auth condition
	if (session) {
		if (req.nextUrl.pathname.startsWith("/creator/login")) {
			redirectUrl.pathname = "/creator";
			return NextResponse.redirect(redirectUrl);
		}
		// Authentication successful, forward request to protected route.
		return res;
	}

	if (req.nextUrl.pathname.startsWith("/creator/login")) {
		return res;
	}

	// Auth condition not met, redirect to home page.
	redirectUrl.pathname = "/creator/login";
	redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
	return NextResponse.redirect(redirectUrl);
}

export const config = {
	matcher: "/creator/:path*",
};
