import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: JSX.Element }) {
	return (
		<>
			<Head>
				<title>
					Innfluenced.me - Organize seu feed do Instagram em segundos
				</title>
				<meta
					name="description"
					content="Importe seus posts e reels direto da sua conta e tenha
					seu próprio site para expor seus mais diversos conteúdos
					de forma clara e organizada para seus seguidores."
				/>

				<meta property="og:url" content="https://www.innfluenced.me" />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="Innfluenced.me - Organize seu feed do Instagram em segundos"
				/>
				<meta
					property="og:description"
					content="Importe seus posts e reels direto da sua conta e tenha
					seu próprio site para expor seus mais diversos conteúdos
					de forma clara e organizada para seus seguidores."
				/>
				{/* <meta property="og:image" content={"/preview.png"} /> */}
				<meta
					property="og:image"
					content={"https://www.innfluenced.me/preview.png"}
				/>

				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="innfluenced.me" />
				<meta
					property="twitter:url"
					content="https://www.innfluenced.me"
				/>
				<meta
					name="twitter:title"
					content="Innfluenced.me - Organize seu feed do Instagram em segundos"
				/>
				<meta
					name="twitter:description"
					content="Importe seus posts e reels direto da sua conta e tenha
					seu próprio site para expor seus mais diversos conteúdos
					de forma clara e organizada para seus seguidores."
				/>
				<meta
					name="twitter:image"
					content="https://www.innfluenced.me/preview.png"
				/>
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
