import { forwardRef } from "react";
import { BiSortAlt2 } from "react-icons/bi";

const SortDropdown = forwardRef(function SortDropdown(
	props: { onClick; showDropdown },
	ref
) {
	const { onClick, showDropdown } = props;

	return (
		<div className="relative" ref={ref}>
			<button
				id="dropdownSearchButton"
				data-dropdown-toggle="dropdownSearch"
				// className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-center text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				className="inline-flex items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
				type="button"
				onClick={onClick}
			>
				<BiSortAlt2 className="mr-1" />
				Ordenar
			</button>

			{showDropdown && (
				<div
					id="dropdownSearch"
					className="z-10 absolute bg-white rounded-lg shadow top-14 right-0 w-60 dark:bg-gray-700"
				>
					{/* <div className="p-3">
						<label for="input-group-search" className="sr-only">
							Search
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<svg
									className="w-5 h-5 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										clip-rule="evenodd"
									></path>
								</svg>
							</div>
							<input
								type="text"
								id="input-group-search"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search user"
							/>
						</div>
					</div> */}
					<ul
						className="h-48 p-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
						aria-labelledby="dropdownSearchButton"
					>
						<li>
							<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
								<input
									id="checkbox-item-11"
									type="checkbox"
									value=""
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
								/>
								<label
									for="checkbox-item-11"
									className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
								>
									Bonnie Green
								</label>
							</div>
						</li>
						<li>
							<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
								<input
									checked
									id="checkbox-item-12"
									type="checkbox"
									value=""
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
								/>
								<label
									for="checkbox-item-12"
									className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
								>
									Jese Leos
								</label>
							</div>
						</li>
						<li>
							<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
								<input
									id="checkbox-item-13"
									type="checkbox"
									value=""
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
								/>
								<label
									for="checkbox-item-13"
									className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
								>
									Michael Gough
								</label>
							</div>
						</li>
						<li>
							<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
								<input
									id="checkbox-item-14"
									type="checkbox"
									value=""
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
								/>
								<label
									for="checkbox-item-14"
									className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
								>
									Robert Wall
								</label>
							</div>
						</li>
						<li>
							<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
								<input
									id="checkbox-item-15"
									type="checkbox"
									value=""
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
								/>
								<label
									for="checkbox-item-15"
									className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
								>
									Joseph Mcfall
								</label>
							</div>
						</li>
						<li>
							<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
								<input
									id="checkbox-item-16"
									type="checkbox"
									value=""
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
								/>
								<label
									for="checkbox-item-16"
									className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
								>
									Leslie Livingston
								</label>
							</div>
						</li>
						<li>
							<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
								<input
									id="checkbox-item-17"
									type="checkbox"
									value=""
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
								/>
								<label
									for="checkbox-item-17"
									className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
								>
									Roberta Casas
								</label>
							</div>
						</li>
					</ul>
					{/* <a
						href="#"
						className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
					>
						<svg
							className="w-5 h-5 mr-1"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"></path>
						</svg>
						Delete user
					</a> */}
				</div>
			)}
		</div>
	);
});
export default SortDropdown;
