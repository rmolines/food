import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import Card from "./Card";
import { FilterBar } from "./FilterBar";

export function ReviewGridAlt() {
	const supabase = useSupabaseClient();
	const [reviews, setReviews] = useState([]);
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
						`review, images_info, category(name, id), type(name, id), restaurant, rating, uuid, created_at`
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
						`review, images_info, category(name, id), type(name, id), restaurant, rating, uuid, created_at`
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
		<div className="border-t">
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
			<div className="grid grid-cols-3 gap-2 mt-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center justify-items-center">
				{reviews.map((e) => (
					<Card
						key={e.id}
						images_info={e.images_info}
						review={e.review}
						rating={e.rating}
						category={e.category.name}
						restaurant_address={
							e.restaurant.value.structured_formatting
								.secondary_text
						}
						restaurant_name={
							e.restaurant.value.structured_formatting.main_text
						}
						type={e.type.name}
						created_at={e.created_at}
						neighbourhood={e.restaurant.value.terms[2].value}
						city={e.restaurant.value.terms[3].value}
						uuid={e.uuid}
						category_id={e.category.id}
						type_id={e.type.id}
					/>
				))}
			</div>
		</div>
	);
}
