import {
	useSession,
	useSupabaseClient,
	useUser,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
	const supabase = useSupabaseClient();
	const session = useSession();
	const user = useUser();
	const router = useRouter();

	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

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

	async function signInWithEmail({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		router.reload();

		if (error) {
			console.log(error);
			alert("Erro ao logar");
		}
	}

	const className = {
		button: "w-full cursor-pointer text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
	};

	const style = {
		button: { background: "rgb(231 117 95) " },
	};

	// return (
	// 	<div className="max-w-sm w-full mx-auto">
	// 		<Auth supabaseClient={supabase} appearance={{ style }} />
	// 	</div>
	// );

	return (
		<div className="flex items-center justify-center grow pb-16">
			{/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /> */}
			<section className="dark:bg-gray-900 w-full max-w-md">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
					<div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign in to your account
							</h1>
							<form
								className="space-y-4"
								onSubmit={(e) => {
									e.preventDefault();
									signInWithEmail({ email, password });
								}}
							>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your email
									</label>
									<input
										type="email"
										name="email"
										id="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="name@company.com"
										required={true}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>
									<input
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required={true}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-start">
										<div className="flex items-center h-5">
											<input
												id="remember"
												aria-describedby="remember"
												type="checkbox"
												className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
												required=""
											/>
										</div>
										<div className="ml-3 text-sm">
											<label
												htmlFor="remember"
												className="text-gray-500 dark:text-gray-300"
											>
												Remember me
											</label>
										</div>
									</div>
									<a
										href="passwordReset"
										className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
									>
										Forgot password?
									</a>
								</div>
								<button
									type="submit"
									className="w-full cursor-pointer text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									Sign in
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Don’t have an account yet?{" "}
									<a
										href="register"
										className="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>
										Sign up
									</a>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
