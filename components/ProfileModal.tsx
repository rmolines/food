import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Avatar from "./Avatar";

function ProfileModal({
	prev_username,
	prev_full_name,
	avatar_url,
	onUpload,
	update_profile,
}: {
	prev_username;
	prev_full_name;
	avatar_url;
	onUpload;
	update_profile;
}) {
	const user = useUser();
	const router = useRouter();
	const [username, setUsername] = useState(prev_username);
	const [fullName, setFullName] = useState(prev_full_name);

	async function handleForm() {
		await update_profile({
			username,
			full_name: fullName,
			avatar_url,
		});
		router.reload();
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
							<button
								className=" rounded-full"
								onClick={() => router.back()}
							>
								<IoArrowBack className="text-2xl" />
							</button>
							<h3 className="align-baseline text-lg font-semibold text-gray-900 dark:text-white">
								Editar Perfil
							</h3>
						</div>
						{/* <!-- Modal body --> */}
						<form
							onSubmit={handleForm}
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
										onUpload={onUpload}
									/>
								</div>
							</div>
							<div className="mb-4 flex flex-col items-center gap-4">
								<div className="">
									<label
										htmlFor="brand"
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>
										Usuário
									</label>
									<input
										type="text"
										name="brand"
										id="brand"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
										required
										onChange={(e) =>
											setUsername(e.target.value)
										}
										value={username}
									/>
								</div>
								<div className="">
									<label
										htmlFor="brand"
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>
										Nome de Exibição
									</label>
									<input
										type="text"
										name="brand"
										id="brand"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
										required
										onChange={(e) =>
											setFullName(e.target.value)
										}
										value={fullName}
									/>
								</div>
							</div>
							<div className="col-span-2 mb-4 border-b"></div>
							{/* <div className="col-span-2 flex justify-end"> */}
							<button
								type="submit"
								className="inline-flex w-fit items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Atualizar perfil
							</button>
							{/* </div> */}
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProfileModal;
