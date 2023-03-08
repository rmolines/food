import { Dispatch, forwardRef, SetStateAction, useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";

type Props = {
	onClick: () => void;
	showDropdown: boolean;
	setChosenSort: Dispatch<SetStateAction<string | undefined>>;
	setAscending: Dispatch<SetStateAction<boolean>>;
};

const SortDropdown = forwardRef<HTMLDivElement, Props>(function FilterDropdown(
	props,
	ref
) {
	const { onClick, showDropdown, setChosenSort, setAscending } = props;
	const [liChecked, setLiChecked] = useState<number | undefined>();

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
				<FaSortAmountDown className="mr-1" />
				Ordenar
			</button>

			{showDropdown && (
				<div
					id="dropdownSearch"
					className="absolute top-12 -right-4 z-50 w-60 rounded-lg bg-white shadow dark:bg-gray-700"
				>
					<ul
						className="overflow-y-auto p-3 text-sm text-gray-700 dark:text-gray-200"
						aria-labelledby="dropdownSearchButton"
					>
						<li className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<input
								type="checkbox"
								className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
								onChange={() => {
									setChosenSort("created_at");
									setAscending(false);
									setLiChecked(0);
								}}
								checked={liChecked === 0}
							/>
							<label
								htmlFor="checkbox-item-11"
								className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Mais recentes 📅 🔼
							</label>
						</li>
						<li className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<input
								type="checkbox"
								className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
								onChange={() => {
									setChosenSort("created_at");
									setAscending(true);
									setLiChecked(1);
								}}
								checked={liChecked === 1}
							/>
							<label
								htmlFor="checkbox-item-11"
								className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Mais antigas 📅 🔽
							</label>
						</li>
						<li className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<input
								type="checkbox"
								className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
								onChange={() => {
									setChosenSort("rating");
									setAscending(false);
									setLiChecked(2);
								}}
								checked={liChecked === 2}
							/>
							<label
								htmlFor="checkbox-item-11"
								className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Maior rating ⭐️ 🔼
							</label>
						</li>
						<li className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<input
								type="checkbox"
								className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
								onChange={() => {
									setChosenSort("rating");
									setAscending(true);
									setLiChecked(3);
								}}
								checked={liChecked === 3}
							/>
							<label
								htmlFor="checkbox-item-11"
								className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Menor rating ⭐️ 🔽
							</label>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
});

export default SortDropdown;
