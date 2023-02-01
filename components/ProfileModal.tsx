import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Avatar from "./Avatar";

function ProfileModal({
	prev_username,
	prev_instagram,
	prev_full_name,
	avatar_url,
	onUpload,
	update_profile,
}) {
	const user = useUser();
	const router = useRouter();
	const [username, setUsername] = useState(prev_username);
	const [instagram, setInstagram] = useState(prev_instagram);
	const [fullName, setFullName] = useState(prev_full_name);

	async function handleForm() {
		await update_profile({
			username,
			instagram,
			full_name: fullName,
			avatar_url,
		});
		router.reload();
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
							<button
								className=" rounded-full"
								onClick={() => router.back()}
							>
								<IoArrowBack className="text-2xl" />
							</button>
							<h3 className="text-lg align-baseline font-semibold text-gray-900 dark:text-white">
								Editar Perfil
							</h3>
						</div>
						{/* <!-- Modal body --> */}
						<form
							onSubmit={handleForm}
							className="grid grid-cols-2 w-full "
						>
							<div className="mb-4 border-r flex w-full mx-auto flex-col">
								<div className="text-sm font-medium mb-4">
									Imagens
								</div>
								<div className="flex grow mx-auto gap-y-4 flex-col justify-center items-center">
									<Avatar
										uploadable
										uid={user.id}
										url={avatar_url}
										size={150}
										onUpload={onUpload}
									/>
								</div>
							</div>
							<div className="flex flex-col gap-4 mb-4 items-center">
								<div className="">
									<label
										htmlFor="brand"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Usuário
									</label>
									<input
										type="text"
										name="brand"
										id="brand"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Instagram
									</label>
									<input
										type="text"
										name="brand"
										id="brand"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										required
										onChange={(e) =>
											setInstagram(e.target.value)
										}
										value={instagram}
									/>
								</div>
								<div className="">
									<label
										htmlFor="brand"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Nome de Exibição
									</label>
									<input
										type="text"
										name="brand"
										id="brand"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										required
										onChange={(e) =>
											setFullName(e.target.value)
										}
										value={fullName}
									/>
								</div>
							</div>
							<div className="col-span-2 border-b mb-4"></div>
							{/* <div className="col-span-2 flex justify-end"> */}
							<button
								type="submit"
								className="text-white w-fit inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
