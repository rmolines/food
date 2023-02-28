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
	const [fullName, setFullName] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [avatar_url, setAvatarUrl] = useState<string>();
	const [showModal, setShowModal] = useState(false);

	const getProfile = async (id: string) => {
		try {
			setLoading(true);

			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username, avatar_url, full_name`)
				.eq("id", id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
				setAvatarUrl(data.avatar_url);
				setFullName(data.full_name);
				setEmail(user?.email);
			}
		} catch (error) {
			console.log(error);
			alert("Error loading user data!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			getProfile(user.id);
		}
	}, [user]);

	async function updateProfile({
		username,
		avatar_url,
		fullName,
		id,
	}: {
		username: string | undefined;
		avatar_url: string | undefined;
		fullName: string | undefined;
		id: string;
	}) {
		try {
			setLoading(true);

			const updates = {
				id: id,
				username,
				avatar_url,
				full_name: fullName,
				updated_at: new Date().toISOString(),
			};

			let { error } = await supabase.from("profiles").upsert(updates);

			if (email !== user?.email) {
				await supabase.auth.updateUser({ email: email });
			}

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
												onUpload={uploadAvatar}
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
										<div className="w-full">
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
										<div className="w-full">
											<label
												htmlFor="brand"
												className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
											>
												Email
											</label>
											<input
												type="text"
												name="brand"
												id="brand"
												className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
												required
												onChange={(e) =>
													setEmail(e.target.value)
												}
												value={email}
											/>
										</div>
										<div className="w-full">
											<label
												htmlFor="brand"
												className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
											>
												Senha
											</label>
											<button
												onClick={(e) => {
													e.preventDefault();
													setShowModal(true);
												}}
												className="mr-2 w-full rounded-lg border border-gray-300 bg-gray-700 px-2.5 py-1 text-sm font-medium text-gray-50 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
											>
												Alterar senha
											</button>
										</div>
										<PasswordModal showModal={showModal} />
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
			)}
		</>
	);
}
