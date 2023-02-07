import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { MdOutlineIosShare } from "react-icons/md";
import { Reviews } from "../types/supabase";
import FilterDropdown from "./FilterDropdown";
import HorizontalCard from "./HorizontalCard";
import ReviewModal from "./ReviewModal";

export function ReviewGridAlt({ username }: { username: string }) {
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

			console.log(chosenFilters);

			if (chosenFilters && chosenFilters.length > 0) {
				let { data, error, status } = await supabase
					.from("reviews")
					.select(
						`review, images_info, category(name, id, emoji), type(name, id), restaurant, rating, uuid, created_at`
					)
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
						`review, images_info, category(name, id, emoji), type(name, id), restaurant, rating, uuid, created_at`
					)
					.order("created_at", { ascending: false });

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
		<div className="flex flex-col grow max-w-lg mx-auto w-full">
			<div className="flex justify-between items-center gap-x-2">
				<div>
					{showModal && (
						<ReviewModal
							showModal={showModal}
							setShowModal={setShowModal}
						/>
					)}
					<button
						type="button"
						className="inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
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
						className="inline-flex relative items-center gap-x-1 justify-center text-gray-900 border hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
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
				<FilterDropdown
					onClick={onFilterClick}
					showDropdown={showFilterDropdown}
					ref={filterRef}
					setChosenFilters={setChosenFilters}
					chosenFilters={chosenFilters}
				/>
			</div>
			<div className="grid grid-cols-1 gap-y-3 mt-4 justify-center justify-items-center">
				{reviews &&
					reviews.map((review, ind) => (
						<Link
							key={review.uuid}
							href={username + "/" + review.uuid}
							className="w-full"
						>
							<HorizontalCard
								key={review.uuid}
								review={review}
								restaurant_address={
									review.restaurant?.value
										.structured_formatting.secondary_text
								}
								restaurant_name={
									review.restaurant?.value
										.structured_formatting.main_text
								}
								neighbourhood={
									review.restaurant?.value.terms[2].value
								}
								city={review.restaurant?.value.terms[3].value}
							/>
						</Link>
					))}
			</div>
		</div>
	);
}
