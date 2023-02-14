import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { IoLogoInstagram } from "react-icons/io5";
import { MdOutlineIosShare } from "react-icons/md";
import { Reviews } from "../types/supabase";
import FilterDropdown from "./FilterDropdown";
import ReviewModal from "./ReviewModal";
import VerticalCard from "./VerticalCard";

export function ReviewGridAlt({
	username,
	isLoggedInProfile,
}: {
	username: string;
	isLoggedInProfile: boolean;
}) {
	const supabase = useSupabaseClient();
	const [reviews, setReviews] = useState<Reviews[]>();
	const [chosenFilters, setChosenFilters] = useState<number[]>();
	const [loading, setLoading] = useState(true);
	const [showFilterDropdown, setShowFilterDropdown] = useState(false);
	const [showSortDropdown, setShowSortDropdown] = useState(false);
	const [chosenReview, setChosenReview] = useState(-1);
	const [showModal, setShowModal] = useState(false);

	const filterRef = useDetectClickOutside({
		onTriggered: () => setShowFilterDropdown(false),
	});

	function onFilterClick() {
		setShowFilterDropdown((prevState) => !prevState);
	}

	useEffect(() => {
		getReviews();
	}, [chosenFilters]);

	async function getReviews() {
		try {
			setLoading(true);

			if (chosenFilters && chosenFilters.length > 0) {
				let { data, error, status } = await supabase
					.from("reviews")
					.select(
						`image_urls, instagram_url, review, images_info, category(name, id, emoji), type(name, id), restaurant, rating, uuid, created_at, creator!inner(*)`
					)
					.eq("creator.username", username)
					.in("category", chosenFilters)
					.order("created_at", { ascending: false });

				if (error && status !== 406) {
					throw error;
				}

				setReviews(data);
			} else {
				let { data, error, status } = await supabase
					.from("reviews")
					.select(
						`image_urls, review, instagram_url, images_info, category(name, id, emoji), type(name, id), restaurant, rating, uuid, created_at, creator!inner(*))`
					)
					.eq("creator.username", username)
					.order("created_at", { ascending: false });

				console.log(data);

				if (error && status !== 406) {
					throw error;
				}

				setReviews(data);
			}
		} catch (error) {
			console.log(error);
			alert("Error loading user data!");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="mx-auto flex w-full max-w-lg grow flex-col md:max-w-4xl">
			<div className="flex items-center justify-between gap-x-2">
				<div>
					{showModal && (
						<ReviewModal
							showModal={showModal}
							setShowModal={setShowModal}
						/>
					)}
					{isLoggedInProfile && (
						<div className="flex items-center justify-center">
							{/* <button
								type="button"
								className="mr-2 inline-flex items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								onClick={() => {
									setShowModal(true);
								}}
							>
								<svg
									aria-hidden="true"
									className="mr-1 -ml-1 h-5 w-5"
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
							</button> */}
							<Link
								href={"/feed"}
								// className="inline-flex items-center justify-center text-white bg-[#24292F] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
								className="mr-2 inline-flex items-center rounded-lg bg-[#24292F] px-3 py-2 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500"
							>
								<IoLogoInstagram className="mr-1 text-lg" />
								Importar
							</Link>
							<button
								type="button"
								className="relative mr-2 inline-flex items-center justify-center gap-x-1 rounded-lg border px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
							</button>
						</div>
					)}
				</div>
				<FilterDropdown
					onClick={onFilterClick}
					showDropdown={showFilterDropdown}
					ref={filterRef}
					setChosenFilters={setChosenFilters}
					chosenFilters={chosenFilters}
				/>
			</div>
			<div className="mt-4 grid grid-cols-3 justify-center justify-items-center gap-3">
				{reviews &&
					reviews.map((review, ind) => (
						<div
							key={review.uuid}
							className="group relative w-full"
						>
							{isLoggedInProfile && (
								<Link
									href={username + "/" + review.uuid}
									className="absolute inset-0 z-50 hidden items-center justify-center group-hover:flex group-hover:bg-gray-900/50"
								>
									<div className="flex aspect-square w-fit items-center justify-center rounded-full border border-white bg-gray-900/95 p-2 text-white">
										Editar
									</div>
								</Link>
							)}
							<Link
								// href={username + "/" + review.uuid}
								href={review.instagram_url}
								className="w-full"
								target="_blank"
							>
								<VerticalCard
									key={review.uuid}
									review={review}
									restaurant_address={
										review.restaurant?.value
											.structured_formatting
											.secondary_text
									}
									restaurant_name={
										review.restaurant?.value
											.structured_formatting.main_text
									}
									neighbourhood={
										review.restaurant?.value.terms[2].value
									}
									city={
										review.restaurant?.value.terms[3].value
									}
								/>
							</Link>
						</div>
					))}
			</div>
		</div>
	);
}
