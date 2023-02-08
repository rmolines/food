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
	const [avatar_url, setAvatarUrl] = useState<string>();

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
				username,
				avatar_url,
				full_name,
			};

			let { error } = await supabase.from("profiles").upsert(updates);

			if (error) throw error;
			alert("Profile updated!");
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
				className="overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-modal md:h-full"
			>
				<div className="relative p-4 w-full max-w-2xl h-full md:h-auto max-h-full">
					{/* <!-- Modal content --> */}
					<div className="relative p-4 bg-white rounded-lg dark:bg-gray-800 sm:p-5">
						{/* <!-- Modal header --> */}
						<div className="flex justify-start items-center gap-x-2 pb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
							<h3 className="text-lg align-baseline font-semibold text-gray-900 dark:text-white">
								Completar perfil
							</h3>
						</div>
						{/* <!-- Modal body --> */}
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="grid grid-cols-2 w-full "
						>
							<div className="mb-4 border-r flex w-full mx-auto flex-col">
								<div className="text-sm font-medium mb-4">
									Imagens
								</div>
								<div className="flex grow mx-auto gap-y-4 flex-col justify-center items-center">
									<Avatar
										uploadable
										url={avatar_url}
										size={150}
										onUpload={setAvatarUrl}
									/>
								</div>
							</div>
							<div className="flex flex-col gap-4 mb-4 items-center px-8">
								<div className="w-full">
									<label
										htmlFor="brand"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Nome de Exibição
									</label>
									<input
										type="text"
										id="brand"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Usuário
									</label>
									<input
										type="text"
										id="brand"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
								className="text-white w-fit inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
