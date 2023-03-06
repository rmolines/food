import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: JSX.Element }) {
	return (
		<>
			<Head>
				<title>
					Innfluenced.me - Transforme seu feed em seu site pessoal
				</title>
				<meta
					name="description"
					content="Crie novas reviews ou importe posts antigos, seus seguidores finalmente terão um lugar para navegar seus conteúdos de forma clara e organizada."
				/>

				<meta property="og:url" content="https://www.innfluenced.me" />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="Innfluenced.me - Transforme seu feed em seu site pessoal"
				/>
				<meta
					property="og:description"
					content="Seus seguidores finalmente terão um lugar para navegar seus conteúdos de forma clara e organizada."
				/>
				<meta property="og:image" content="./preview.png" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="innfluenced.me" />
				<meta
					property="twitter:url"
					content="https://www.innfluenced.me"
				/>
				<meta
					name="twitter:title"
					content="Innfluenced.me - Transforme seu feed em seu site pessoal"
				/>
				<meta
					name="twitter:description"
					content="Crie novas reviews ou importe posts antigos, seus seguidores finalmente terão um lugar para navegar seus conteúdos de forma clara e organizada."
				/>
				<meta name="twitter:image" content="/preview.png" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/safari-pinned-tab.svg"
					color="#5bbad5"
				/>
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
				<meta
					name="facebook-domain-verification"
					content="nmd4yyeikwr5w18k2u0w2k9ip7pqzx"
				/>
			</Head>
			{/* <div className="bg-[url('/gradient.svg')] bg-hero bg-no-repeat bg-cover bg-center bg-fixed"> */}
			<div className="container mx-auto flex min-h-screen max-w-7xl flex-col justify-start px-2 sm:px-8">
				<Header />
				<main className="flex grow flex-col">{children}</main>
				<div className="hidden sm:block">
					<Footer />
				</div>
			</div>
			<div className="block sm:hidden">
				<Footer />
			</div>
			{/* </div> */}
		</>
	);
}
