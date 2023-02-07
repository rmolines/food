import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Reviews } from "../types/supabase";
import { FilterBar } from "./FilterBar";
import HorizontalCard from "./HorizontalCard";

export function ReviewGrid() {
	const supabase = useSupabaseClient();
	const [reviews, setReviews] = useState<Reviews[]>();
	const [chosenFilters, setChosenFilters] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showFilterDropdown, setShowFilterDropdown] = useState(false);
	const [showSortDropdown, setShowSortDropdown] = useState(false);

	const filterRef = useDetectClickOutside({
		onTriggered: () => setShowFilterDropdown(false),
	});
	const sortRef = useDetectClickOutside({
		onTriggered: () => setShowSortDropdown(false),
	});

	function onSortClick() {
		setShowSortDropdown((prevState) => !prevState);
	}

	function onFilterClick() {
		setShowFilterDropdown((prevState) => !prevState);
	}

	useEffect(() => {
		getReviews();
	}, [chosenFilters]);

	async function getReviews() {
		try {
			setLoading(true);

			if (chosenFilters.length > 0) {
				let { data, error, status } = await supabase
					.from("reviews")
					.select(
						`review, images_info, category(name, id), type(name, id), restaurant, rating, uuid, created_at, creator(username)`
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
						`review, images_info, category(name, id), type(name, id), restaurant, rating, uuid, created_at, creator(username)`
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
		<>
			{/* <div className="bg-gray-100 px-3 rounded-lg border border-gray-200 pb-3"> */}
			<FilterBar
				onSortClick={onSortClick}
				showSortDropdown={showSortDropdown}
				sortRef={sortRef}
				onFilterClick={onFilterClick}
				showFilterDropdown={showFilterDropdown}
				filterRef={filterRef}
				setChosenFilters={setChosenFilters}
				chosenFilters={chosenFilters}
			/>
			<div className="grid grid-cols-1 gap-4 mt-4 mx-auto w-full justify-center justify-items-center max-w-lg">
				{reviews &&
					reviews.map((e) => (
						<Link
							key={e.uuid}
							href={"/" + e.creator.username + "/" + e.uuid}
							className="w-full"
						>
							<HorizontalCard
								review={e}
								restaurant_address={
									e.restaurant.value.structured_formatting
										.secondary_text
								}
								restaurant_name={
									e.restaurant.value.structured_formatting
										.main_text
								}
								neighbourhood={
									e.restaurant.value.terms[2].value
								}
								city={e.restaurant.value.terms[3].value}
							/>
						</Link>
					))}
			</div>
		</>
	);
}
