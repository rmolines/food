import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { IoArrowBack } from "react-icons/io5";
import Avatar from "../components/Avatar";
import PasswordModal from "../components/PasswordModal";

export default function Account() {
	const supabase = useSupabaseClient();
	const user = useUser();
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState<string>();
	const [instagram, setInstagram] = useState<string>();
	const [fullName, setFullName] = useState<string>();
	const [avatar_url, setAvatarUrl] = useState<string>();
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (user) {
			getProfile(user.id);
		}
	}, [user]);

	async function getProfile(id: string) {
		try {
			setLoading(true);

			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username, instagram, avatar_url, full_name`)
				.eq("id", id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
				setInstagram(data.instagram);
				setAvatarUrl(data.avatar_url);
				setFullName(data.full_name);
			}
		} catch (error) {
			console.log(error);
			alert("Error loading user data!");
		} finally {
			setLoading(false);
		}
	}

	async function updateProfile({
		username,
		instagram,
		avatar_url,
		fullName,
		id,
	}: {
		username: string | undefined;
		instagram: string | undefined;
		avatar_url: string | undefined;
		fullName: string | undefined;
		id: string;
	}) {
		try {
			setLoading(true);

			const updates = {
				id: id,
				username,
				instagram,
				avatar_url,
				full_name: fullName,
				updated_at: new Date().toISOString(),
			};

			console.log(updates);

			let { error } = await supabase.from("profiles").upsert(updates);
			if (error) throw error;
			alert("Profile updated!");
		} catch (error) {
			console.log(error);
			alert("Error updating the data!");
		} finally {
			setLoading(false);
		}
	}

	async function uploadAvatar(url: string) {
		if (user) {
			setAvatarUrl(url);
			updateProfile({
				username,
				instagram,
				fullName,
				avatar_url: url,
				id: user.id,
			});
		}
	}

	async function handleForm() {
		if (user) {
			await updateProfile({
				username,
				instagram,
				fullName,
				avatar_url,
				id: user.id,
			});
		}
		router.reload();
	}
	if (loading) return;

	return (
		<>
			{user && (
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
												url={avatar_url}
												size={150}
												onUpload={uploadAvatar}
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
										<div className="w-full">
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
										<div className="w-full">
											<label
												htmlFor="brand"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Email
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
												value={user.email}
											/>
										</div>
										<div className="w-full">
											<label
												htmlFor="brand"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Senha
											</label>
											<button
												onClick={(e) => {
													e.preventDefault();
													setShowModal(true);
												}}
												className="w-full text-gray-50 bg-gray-700 border border-gray-300 focus:outline-none hover:bg-gray-900 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2.5 py-1 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
											>
												Alterar senha
											</button>
										</div>
										<PasswordModal showModal={showModal} />
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
			)}
		</>
	);
}
