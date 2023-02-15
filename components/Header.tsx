import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import ReviewModal from "./ReviewModal";
import Avatar from "./Avatar";

function Header() {
	const [showModal, setShowModal] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const ref = useDetectClickOutside({
		onTriggered: () => setShowDropdown(false),
	});

	const supabase = useSupabaseClient();
	const user = useUser();
	const router = useRouter();

	const isHomepage = router.pathname === "/";

	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState(null);
	const [full_name, setFullName] = useState(null);
	const [avatar_url, setAvatarUrl] = useState(null);

	useEffect(() => {
		if (user) {
			getProfile();
		}
	}, [user]);

	async function getProfile() {
		try {
			setLoading(true);

			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username, avatar_url, full_name`)
				.eq("id", user?.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
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

	async function handleSignOut() {
		setShowDropdown(false);
		await supabase.auth.signOut();
		router.reload();
	}

	return (
		<>
			{showModal && (
				<ReviewModal
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			)}
			<header className="sm:my-2">
				<nav className="border-gray-200 py-2.5 dark:bg-gray-800">
					<div className="flex flex-wrap items-start justify-between">
						{(!user || isHomepage) && (
							<div className="flex w-full items-center justify-between">
								<Link
									href={"/"}
									className="mr-4 flex items-center justify-center"
								>
									<Image
										src="/abstract-shape.png"
										className="mr-1 object-scale-down "
										alt="Innflueced Logo"
										width={30}
										height={30}
									/>
									<span className="inline-flex h-fit whitespace-nowrap align-baseline text-2xl font-semibold dark:text-white">
										<div className="text-primary-700">
											Inn
										</div>
										<div>fluenced</div>
									</span>
								</Link>

								<div className="flex items-center lg:order-2">
									{/* <a
										href="#"
										className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
									>
										Login
									</a> */}
									<Link
										href="/login"
										className="mr-2 rounded-lg border-2 border-primary-700 px-4 py-2 text-sm font-bold text-primary-700 hover:bg-primary-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:px-5 lg:py-2.5"
									>
										Entrar
									</Link>
									{/* <button
										data-collapse-toggle="mobile-menu-2"
										type="button"
										className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
										aria-controls="mobile-menu-2"
										aria-expanded="false"
									>
										<span className="sr-only">
											Open main menu
										</span>
										<svg
											className="w-6 h-6"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill-rule="evenodd"
												d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
												clip-rule="evenodd"
											></path>
										</svg>
										<svg
											className="hidden w-6 h-6"
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
									</button> */}
								</div>
							</div>
						)}
						{user && !isHomepage && (
							<>
								<div className="flex items-center justify-start">
									<Link
										href={"/" + username}
										className="mr-4 flex items-center justify-center"
									>
										<Image
											src="/abstract-shape.png"
											className="mr-1 object-scale-down "
											alt="Innflueced Logo"
											width={30}
											height={30}
										/>
										<span className="inline-flex h-fit whitespace-nowrap align-baseline text-2xl font-semibold dark:text-white">
											<div className="text-primary-700">
												Inn
											</div>
											<div>fluenced</div>
										</span>
									</Link>
								</div>
								<div className="hidden items-center sm:flex lg:order-2">
									{/* <button
										type="button"
										className="inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
										onClick={() => {
											setShowModal(true);
										}}
									>
										<svg
											aria-hidden="true"
											className="mr-1 -ml-1 w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
												clipRule="evenodd"
											></path>
										</svg>{" "}
										Criar Review
									</button>
									<button
										type="button"
										className="inline-flex relative items-center gap-x-1 justify-center text-gray-900 border hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
										onClick={() => {
											navigator.clipboard.writeText(
												"innfluenced.me/" + username
											);
											alert("URL copiada com sucesso!");
										}}
									>
										<MdOutlineIosShare
											height={5}
											width={5}
											className="text-lg"
										/>
										Compartilhar
									</button> */}
									<div className="relative" ref={ref}>
										<button
											type="button"
											className="mx-3 flex rounded-full text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
											id="user-menu-button"
											aria-expanded="false"
											data-dropdown-toggle="dropdown"
											onClick={() =>
												setShowDropdown((prev) => !prev)
											}
										>
											<span className="sr-only">
												Open user menu
											</span>
											<Avatar
												url={avatar_url}
												size={50}
												uploadable={false}
												onUpload={() => {}}
											/>
										</button>
										{/* <!-- Dropdown menu --> */}
										{showDropdown && (
											<div
												className="absolute right-0 z-50 my-4 w-56 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
												id="dropdown"
											>
												<div className="py-3 px-4">
													<span className="block text-sm font-semibold text-gray-900 dark:text-white">
														{full_name}
													</span>
													<span className="block truncate text-sm font-light text-gray-500 dark:text-gray-400">
														@{username}
													</span>
												</div>
												<ul
													className="py-1 font-light text-gray-500 dark:text-gray-400"
													aria-labelledby="dropdown"
												>
													<li
														onClick={() =>
															setShowDropdown(
																false
															)
														}
														className="cursor-pointer"
													>
														<Link
															href={
																"/" + username
															}
															className="block py-2 px-4 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
														>
															Meu perfil
														</Link>
													</li>
													{/* <li
														onClick={() =>
															setShowDropdown(
																false
															)
														}
													>
														<Link
															href={
																"/" + username
															}
															className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
														>
															Minhas reviews
														</Link>
													</li> */}
												</ul>
												<ul
													className="py-1 font-light text-gray-500 dark:text-gray-400"
													aria-labelledby="dropdown"
												>
													<li
														onClick={handleSignOut}
														className="cursor-pointer"
													>
														<div className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
															Sign out
														</div>
													</li>
												</ul>
											</div>
										)}
									</div>
								</div>
							</>
						)}
					</div>
				</nav>
			</header>
		</>
	);
}

export default Header;
