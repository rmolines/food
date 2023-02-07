import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
	password: string;
	confirmPassword: string;
};

const getURL = () => {
	let url =
		process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
		process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
		"http://localhost:3000/";
	// Make sure to include `https://` when not localhost.
	url = url.includes("http") ? url : `https://${url}`;
	// Make sure to including trailing `/`.
	url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
	return url;
};

export default function PasswordRecover() {
	const supabase = useSupabaseClient();
	const user = useUser();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [verified, setVerified] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		trigger,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => resetPassword(data);

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

	async function resetPassword({ password }: Inputs) {
		try {
			setLoading(true);
			const { data, error } = await supabase.auth.updateUser({
				password,
			});

			if (error) {
				throw error;
			}

			setLoading(false);
			alert("Senha alterada com sucesso!!");
			forwardToProfile();
		} catch (error) {
			console.log(error);
			alert("Error resetting password!");
		}
	}

	useEffect(() => {
		if (supabase) {
			const { data } = supabase.auth.onAuthStateChange(
				async (_event, _session) => {
					console.log(_event, _session);
					if (_event == "PASSWORD_RECOVERY") {
						console.log("oioi");
					}
				}
			);

			return () => data.subscription.unsubscribe();
		}
	}, [supabase]);

	if (!verified) return;

	return (
		<div className="flex items-center justify-center grow pb-16">
			{/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /> */}
			<section className="dark:bg-gray-900 w-full max-w-md">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
					<div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
						<h1 className="flex flex-col mb-1 gap-y-3 text-xl font-bold align-middle leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							<div className="h-full">Alterar senha</div>
						</h1>
						<form
							className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
							onSubmit={handleSubmit(onSubmit)}
						>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Senha nova
								</label>
								<input
									type="password"
									id="password"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									placeholder="••••••••"
									required
									{...register("password", {
										required: "Este campo é obrigatório",
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
									htmlFor="confirmPassword"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Confirmar senha
								</label>
								<input
									type="password"
									id="confirmPassword"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
									required
									{...register("confirmPassword", {
										validate: (value) =>
											value === watch("password", "") ||
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
							{loading ? (
								<div className="w-full text-white bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600">
									<svg
										aria-hidden="true"
										role="status"
										className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="#1C64F2"
										/>
									</svg>
									Loading..
								</div>
							) : (
								<button
									type="submit"
									className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									<div>Resetar senha</div>
								</button>
							)}
						</form>
					</div>
				</div>
			</section>
		</div>
	);
}
