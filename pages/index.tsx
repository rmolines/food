import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useState } from "react";

export default function Main() {
	const [email, setEmail] = useState("");
	const supabase = useSupabaseClient();

	const addEmailWaitlist = async ({ email }: { email: string }) => {
		try {
			const data = {
				email,
			};
			let { error } = await supabase.from("waitlist").insert(data);

			if (error) throw error;
			alert("Você está na lista de espera!");
		} catch (error) {
			console.log(error);
			alert("Erro ao entrar na lista de espera!");
		}
	};

	return (
		<section className="my-auto dark:bg-gray-900">
			<div className="flex items-center gap-8">
				<div className="mt-4 md:mt-0">
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
					<label
						htmlFor="input-group-1"
						className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
					>
						Entre na lista de espera
					</label>
					<div className="inline-flex w-full max-w-xl">
						<div className="relative grow">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<svg
									aria-hidden="true"
									className="h-5 w-5 text-gray-500 dark:text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
									<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
								</svg>
							</div>
							<input
								type="text"
								id="input-group-1"
								className="block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
								placeholder="Seu email..."
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<button
							onClick={() => addEmailWaitlist({ email })}
							className="inline-flex items-center rounded-r-lg border border-primary-700 bg-primary-700 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
						>
							Solicitar acesso
						</button>
					</div>
				</div>
				<div className="relative hidden h-[45em] w-full md:block">
					<Image
						src="/iphone.png"
						// src={"/product2.png"}
						alt="dashboard image"
						fill
						className="object-contain"
					/>
				</div>
			</div>
		</section>
	);
}
