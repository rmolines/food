import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Reviews } from "../types/supabase";
import FilterDropdown from "./FilterDropdown";
import HorizontalCard from "./HorizontalCard";

export function ReviewGridAlt({ username }: { username: string }) {
	const supabase = useSupabaseClient();
	const [reviews, setReviews] = useState<Reviews[]>();
	const [chosenFilters, setChosenFilters] = useState<number[]>();
	const [loading, setLoading] = useState(true);
	const [showFilterDropdown, setShowFilterDropdown] = useState(false);
	const [showSortDropdown, setShowSortDropdown] = useState(false);
	const [chosenReview, setChosenReview] = useState(-1);

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
			<div className="flex justify-end items-center gap-x-2">
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
