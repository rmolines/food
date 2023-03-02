import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: JSX.Element }) {
	return (
		<>
			<Head>
				<title>Innfluenced</title>
				<meta
					name="description"
					content="Sua plataforma de reviews e recomendações!"
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
			<div className="container mx-auto flex min-h-screen max-w-5xl flex-col justify-start px-2 sm:px-8">
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
