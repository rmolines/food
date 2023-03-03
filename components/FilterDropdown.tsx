import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
	Dispatch,
	forwardRef,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { IoFilterSharp } from "react-icons/io5";
import { Categories } from "../types/supabase";

type Props = {
	onClick: () => void;
	showDropdown: boolean;
	setChosenFilters: Dispatch<SetStateAction<number[] | undefined>>;
	chosenFilters: number[] | undefined;
};

const FilterDropdown = forwardRef<HTMLDivElement, Props>(
	function FilterDropdown(props, ref) {
		const { onClick, showDropdown, setChosenFilters, chosenFilters } =
			props;
		const [loading, setLoading] = useState(true);
		const [filters, setFilters] = useState<Categories[]>();
		const supabase = useSupabaseClient();

		async function getFilters() {
			try {
				setLoading(true);

				let { data, error, status } = await supabase
					.from("categories")
					.select()
					.order("name");

				if (error && status !== 406) {
					throw error;
				}

				if (data) {
					setFilters(data);
				}
			} catch (error) {
				console.log(error);
				alert("Error loading filter data!");
			} finally {
				setLoading(false);
			}
		}

		useEffect(() => {
			getFilters();
		}, []);

		return (
			<div className="relative" ref={ref}>
				<button
					id="dropdownSearchButton"
					data-dropdown-toggle="dropdownSearch"
					// className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-center text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
					type="button"
					onClick={onClick}
				>
					<IoFilterSharp className="mr-1" />
					Filtrar
				</button>

				{showDropdown && (
					<div
						id="dropdownSearch"
						className="absolute top-12 -right-4 z-50 w-60 rounded-lg bg-white shadow dark:bg-gray-700"
					>
						<ul
							className="h-[32rem] overflow-y-auto p-3 text-sm text-gray-700 dark:text-gray-200"
							aria-labelledby="dropdownSearchButton"
						>
							{filters &&
								filters.map((e) => (
									<li key={e.id}>
										<div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
											<input
												id={e.id.toString()}
												type="checkbox"
												value={e.id}
												checked={
													chosenFilters &&
													chosenFilters.includes(e.id)
												}
												className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
												onChange={(e) =>
													setChosenFilters((prev) => {
														if (!prev) {
															return [
																parseInt(
																	e.target
																		.value
																),
															];
														}

														if (
															prev.includes(
																parseInt(
																	e.target
																		.value
																)
															)
														) {
															return prev.filter(
																(v) =>
																	v !==
																	parseInt(
																		e.target
																			.value
																	)
															);
														} else {
															return [
																...prev,
																parseInt(
																	e.target
																		.value
																),
															];
														}
													})
												}
											/>
											<label
												htmlFor="checkbox-item-11"
												className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
											>
												{e.name} {e.emoji}
											</label>
										</div>
									</li>
								))}
						</ul>
					</div>
				)}
			</div>
		);
	}
);

export default FilterDropdown;
