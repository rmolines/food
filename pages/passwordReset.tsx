import {
	useSession,
	useSupabaseClient,
	useUser,
} from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";

type Inputs = {
	email: string;
	password: string;
};

export default function PasswordReset() {
	const supabase = useSupabaseClient();
	const session = useSession();
	const user = useUser();
	const router = useRouter();

	useEffect(() => {
		if (session) {
			if (router.query.redirectedFrom) {
				router.push(router.query.redirectedFrom);
			} else {
				forwardToProfile();
			}
		}
	}, [router, session]);

	async function forwardToProfile() {
		try {
			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username`)
				.eq("id", user.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				router.push("/" + data.username, "/" + data.username);
			}
		} catch (error) {
			console.log(error);
			alert("Error loading user data!");
		}
	}

	return (
		<div className="flex items-center justify-center grow pb-16">
			{/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /> */}
			<section className="dark:bg-gray-900 w-full max-w-md">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
					<div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
						<h1 className="flex flex-col mb-1 gap-y-3 text-xl font-bold align-middle leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							<Link href="/login" className="w-fit">
								<IoArrowBack className="text-xl h-full" />
							</Link>
							<div className="h-full">Esqueceu sua senha?</div>
						</h1>
						<p className="font-light text-gray-500 dark:text-gray-400">
							Não se preocupe! Digite o email cadastrado abaixo
							que iremos te enviar um link para você resetar sua
							senha.
						</p>
						<form
							className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
							action="#"
						>
							<div>
								<label
									for="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Seu email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="nome@email.com"
									required=""
								/>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Resetar senha
							</button>
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}
