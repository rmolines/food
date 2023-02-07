import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { Database } from "../types/supabase";

function MyApp({
	Component,
	pageProps,
}: AppProps<{
	initialSession: Session;
}>) {
	const [supabase] = useState(() => createBrowserSupabaseClient<Database>());

	useEffect(() => {
		if (supabase) {
			const { data } = supabase.auth.onAuthStateChange(
				async (_event, _session) => {
					console.log("app", _event, _session);
					if (_event == "PASSWORD_RECOVERY") {
					}
				}
			);

			return () => data.subscription.unsubscribe();
		}
	}, [supabase]);

	return (
		<SessionContextProvider
			supabaseClient={supabase}
			initialSession={pageProps.initialSession}
		>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionContextProvider>
	);
}
export default MyApp;
