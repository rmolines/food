import {
	useSession,
	useSupabaseClient,
	useUser,
} from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
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

	async function signUpWithEmail({ email, password }: Inputs) {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) {
			console.log(error);
			alert("Erro ao criar a conta");
		}
	}

	return (
		<div className="flex items-center justify-center grow pb-16">
			{/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /> */}
			<section className="dark:bg-gray-900 w-full max-w-md">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Criar uma conta
							</h1>
							<form
								className="space-y-4 md:space-y-6"
								onSubmit={handleSubmit(onSubmit)}
							>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Senha
									</label>
									<input
										type="password"
										id="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required={true}
										// onChange={(e) =>
										// 	setPassword(e.target.value)
										// }
										{...register("password", {
											required:
												"Este campo é obrigatório",
											// pattern: {
											// 	value: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[d]){1,})(?=(.*[W]){ 1,})(?!.*s){8,}$/i,
											// 	message:
											// 		"Password should contain at least one number and one special character",
											// },
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
										for="confirm-password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Confirmar senha
									</label>
									<input
										type="password"
										id="confirm-password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required={true}
										{...register("confirmPassword", {
											validate: (value) =>
												value ===
													watch("password", "") ||
												"As senhas não são iguais",
										})}
										autoComplete="off"
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
									<div className="flex items-center h-5">
										<input
											id="terms"
											aria-describedby="terms"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
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
									className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
