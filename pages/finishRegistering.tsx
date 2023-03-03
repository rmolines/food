import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Avatar from "../components/Avatar";

type Inputs = {
	username: string;
	full_name: string;
};

function FinishRegistering() {
	const supabase = useSupabaseClient();
	const router = useRouter();
	const user = useUser();
	const [avatar_url, setAvatarUrl] = useState<string>(
		`https://cdn-icons-png.flaticon.com/512/149/149071.png`
	);

	const [loading, setLoading] = useState(true);

	const {
		register,
		handleSubmit,
		watch,
		trigger,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => updateProfile(data);

	async function updateProfile({ username, full_name }: Inputs) {
		try {
			setLoading(true);

			const updates = {
				id: user?.id,
				email: user?.email,
				username,
				avatar_url,
				full_name,
			};

			let { error } = await supabase.from("profiles").upsert(updates);

			if (error) throw error;
			alert("Perfil criado!");
			router.push("/" + username);
		} catch (error) {
			console.log(error);
			alert("Error updating the data!");
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<div
				aria-hidden="true"
				className="flex h-modal w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 md:h-full"
			>
				<div className="relative h-full max-h-full w-full max-w-2xl p-4 md:h-auto">
					{/* <!-- Modal content --> */}
					<div className="relative rounded-lg bg-white p-4 dark:bg-gray-800 sm:p-5">
						{/* <!-- Modal header --> */}
						<div className="flex items-center justify-start gap-x-2 rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
							<h3 className="align-baseline text-lg font-semibold text-gray-900 dark:text-white">
								Completar perfil
							</h3>
						</div>
						{/* <!-- Modal body --> */}
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="grid w-full grid-cols-2 "
						>
							<div className="mx-auto mb-4 flex w-full flex-col border-r">
								<div className="mb-4 text-sm font-medium">
									Imagens
								</div>
								<div className="mx-auto flex grow flex-col items-center justify-center gap-y-4">
									<Avatar
										uploadable
										url={avatar_url}
										size={150}
										onUpload={setAvatarUrl}
									/>
								</div>
							</div>
							<div className="mb-4 flex flex-col items-center gap-4 px-8">
								<div className="w-full">
									<label
										htmlFor="brand"
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>
										Nome de Exibição
									</label>
									<input
										type="text"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
										required
										{...register("full_name", {
											required:
												"Este campo é obrigatório",
										})}
										onKeyUp={() => {
											trigger("full_name");
										}}
									/>
									{errors.full_name && (
										<small className="text-red-600">
											{errors.full_name.message}
										</small>
									)}
								</div>
								<div className="w-full">
									<label
										htmlFor="brand"
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>
										Usuário
									</label>
									<input
										type="text"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
										required
										{...register("username", {
											required:
												"Este campo é obrigatório",
										})}
										onKeyUp={() => {
											trigger("full_name");
										}}
									/>
									{errors.username && (
										<small className="text-red-600">
											{errors.username.message}
										</small>
									)}
								</div>
							</div>
							<button
								type="submit"
								className="inline-flex w-fit items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Criar perfil
							</button>
							{/* </div> */}
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default FinishRegistering;
