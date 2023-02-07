import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
	showModal: boolean;
};

type Inputs = {
	password: string;
	confirmPassword: string;
};

function PasswordModal({ showModal }: Props) {
	const supabase = useSupabaseClient();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		trigger,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => changePassword(data);

	async function changePassword({ password }: Inputs) {
		try {
			const { data, error } = await supabase.auth.updateUser({
				password: password,
			});

			router.reload();

			if (error) {
				throw error;
			}
		} catch (error) {
			console.log(error);
			alert("Erro ao mudar a senha");
		}
	}

	return (
		<>
			{showModal && (
				<div
					id="authentication-modal"
					aria-hidden="true"
					className="fixed bg-gray-900/60 flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
				>
					<div className="relative w-full h-full max-w-md md:h-auto">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<button
								type="button"
								className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
							>
								<svg
									aria-hidden="true"
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									></path>
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
							<div className="px-6 py-6 lg:px-8">
								<h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
									Alterar senha
								</h3>
								<form
									className="space-y-6"
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
									<button
										type="submit"
										className="w-full text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
									>
										Salvar
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default PasswordModal;
