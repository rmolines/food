import {
	useSession,
	useSupabaseClient,
	useUser,
} from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
	email: string;
	password: string;
	confirmPassword: string;
};

export default function Register() {
	const supabase = useSupabaseClient();
	const session = useSession();
	const user = useUser();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		trigger,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => signUpWithEmail(data);

	// useEffect(() => {
	// 	if (session) {
	// 		if (router.query.redirectedFrom) {
	// 			router.push(router.query.redirectedFrom);
	// 		} else {
	// 			forwardToProfile();
	// 		}
	// 	}
	// }, [router, session]);

	async function forwardToProfile() {
		try {
			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username`)
				.eq("id", user?.id)
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

	async function signUpWithEmail({ email, password }: Inputs) {
		const { error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: { finishedRegistering: false },
			},
		});

		router.push("/finishRegistering");

		if (error) {
			console.log(error);
			alert("Erro ao criar a conta");
		}
	}

	return (
		<div className="flex grow items-center justify-center pb-16">
			<section className="w-full max-w-md dark:bg-gray-900">
				<div className="mx-auto flex flex-col items-center justify-center px-6 py-8">
					<div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
						<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
								Criar uma conta
							</h1>
							<form
								className="space-y-4 md:space-y-6"
								onSubmit={handleSubmit(onSubmit)}
							>
								<div>
									<label
										htmlFor="email"
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
										placeholder="nome@email.com"
										required={true}
										// onChange={(e) =>
										// 	setEmail(e.target.value)
										// }
										{...register("email", {
											required:
												"Este campo é obrigatório",
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
												message: "Email inválido",
											},
										})}
										onKeyUp={() => {
											trigger("email");
										}}
									/>
									{errors.email && (
										<small className="text-red-600">
											{errors.email.message}
										</small>
									)}
								</div>
								<div>
									<label
										htmlFor="password"
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>
										Senha
									</label>
									<input
										type="password"
										id="new-password"
										autoComplete="current-password"
										placeholder="••••••••"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
										required={true}
										{...register("password", {
											required:
												"Este campo é obrigatório",
											minLength: {
												value: 8,
												message:
													"A senha deve conter mais de 8 caracteres",
											},
										})}
										onKeyUp={() => {
											trigger("password");
										}}
									/>
									{errors.password && (
										<small className="text-red-500">
											{errors.password.message}
										</small>
									)}
								</div>
								<div>
									<label
										htmlFor="confirm-password"
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>
										Confirmar senha
									</label>
									<input
										type="password"
										id="new-password"
										autoComplete="new-password"
										placeholder="••••••••"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
										required={true}
										{...register("confirmPassword", {
											validate: (value) =>
												value ===
													watch("password", "") ||
												"As senhas não são iguais",
										})}
										onPaste={(e) => {
											e.preventDefault();
											return false;
										}}
										onKeyUp={() => {
											trigger("confirmPassword");
										}}
									/>
									{errors.confirmPassword && (
										<small className="text-red-500">
											{errors.confirmPassword.message}
										</small>
									)}
								</div>
								<div className="flex items-start">
									<div className="flex h-5 items-center">
										<input
											id="terms"
											aria-describedby="terms"
											type="checkbox"
											className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="terms"
											className="font-light text-gray-500 dark:text-gray-300"
										>
											Eu aceito os{" "}
											<a
												className="font-medium text-primary-600 hover:underline dark:text-primary-500"
												href="#"
											>
												Termos e Condições
											</a>
										</label>
									</div>
								</div>
								<button
									type="submit"
									className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									Criar conta
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Já possui uma conta?{" "}
									<Link
										href="/login"
										className="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>
										Entre aqui
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
