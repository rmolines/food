import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
	const supabase = useSupabaseClient();
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			if (router.query.redirectedFrom) {
				router.push(router.query.redirectedFrom);
			} else {
				router.push("/creator");
			}
		}
	}, [router, session]);

	return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
}
