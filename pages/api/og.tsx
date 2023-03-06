import { ImageResponse } from "@vercel/og";
import Image from "next/image";

export const config = {
	runtime: "edge",
};

export default function OgImage() {
	return new ImageResponse(
		(
			<div className="flex items-center gap-8">
				<div className="mt-4 flex">
					<h2 className="mb-4 w-full text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
						Transforme seu feed do Instagram em seu próprio site
						pessoal
					</h2>
					<p className="mb-6 font-light text-gray-500 dark:text-gray-400">
						Tenha seu próprio site de recomendações a partir de seus
						posts do Instagram. Crie novas reviews ou importe posts
						antigos, seus seguidores finalmente terão um lugar para
						navegar seus conteúdos de forma clara e organizada.
					</p>
				</div>
				<div className="relative flex h-[45em] w-full">
					<Image
						src="/iphone.png"
						alt="dashboard image"
						fill
						className="object-contain"
					/>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
		}
	);
}
