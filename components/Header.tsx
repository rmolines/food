import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import Avatar from "./Avatar";
import ReviewModal from "./ReviewModal";
import { MdOutlineIosShare } from "react-icons/md";

function Header() {
	const [showModal, setShowModal] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const ref = useDetectClickOutside({
		onTriggered: () => setShowDropdown(false),
	});

	const supabase = useSupabaseClient();
	const user = useUser();
	const router = useRouter();

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
				.eq("id", user.id)
				.single();

			console.log(data, error, status);

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

	return (
		<>
			{showModal && (
				<ReviewModal
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			)}
			<header>
				<nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-800">
					<div className="flex flex-wrap justify-between items-center">
						<div className="flex justify-start items-center">
							<Link
								href="/creator/"
								className="flex mr-4 items-center justify-center"
							>
								<Image
									src="/abstract-shape.png"
									className="mr-1 object-scale-down "
									alt="Innflueced Logo"
									width={30}
									height={30}
								/>
								<span className="self-center items-center justify-center flex text-2xl font-semibold whitespace-nowrap dark:text-white">
									<div className="text-primary-700">Inn</div>
									<div>fluenced</div>
								</span>
							</Link>
						</div>
						{user && (
							<div className="flex items-center lg:order-2">
								<button
									type="button"
									className="inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
									onClick={() => {
										router.push("/creator/");
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
									{/* <div
										role="tooltip"
										className="absolute z-10 inline-block w-64 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
									>
										<div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
											<h3 className="font-semibold text-gray-900 dark:text-white">
												Popover bottom
											</h3>
										</div>
										<div className="px-3 py-2">
											<p>
												And here's some amazing content.
												It's very engaging. Right?
											</p>
										</div>
									</div> */}
								</button>
								{/* <button className="text-2xl hover:bg-gray-200 focus:ring-4 focus:ring-primary-300 p-1 rounded-lg">
									<RiShareBoxFill />
								</button> */}
								<div className="relative" ref={ref}>
									<button
										type="button"
										className="flex mx-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
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
										<Avatar url={avatar_url} size={40} />
									</button>
									{/* <!-- Dropdown menu --> */}
									{showDropdown && (
										<div
											className="z-50 right-0 absolute my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
											id="dropdown"
										>
											<div className="py-3 px-4">
												<span className="block text-sm font-semibold text-gray-900 dark:text-white">
													{full_name}
												</span>
												<span className="block text-sm font-light text-gray-500 truncate dark:text-gray-400">
													@{username}
												</span>
											</div>
											<ul
												className="py-1 font-light text-gray-500 dark:text-gray-400"
												aria-labelledby="dropdown"
											>
												<li
													onClick={() =>
														setShowDropdown(false)
													}
												>
													<Link
														href="/creator/account/"
														className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
													>
														Meu perfil
													</Link>
												</li>
												<li
													onClick={() =>
														setShowDropdown(false)
													}
												>
													<Link
														href="/creator/"
														className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
													>
														Minhas reviews
													</Link>
												</li>
											</ul>
											<ul
												className="py-1 font-light text-gray-500 dark:text-gray-400"
												aria-labelledby="dropdown"
											>
												<li
													onClick={() => {
														setShowDropdown(false);
														supabase.auth.signOut();
													}}
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
						)}
					</div>
				</nav>
			</header>
		</>
	);
}

export default Header;
