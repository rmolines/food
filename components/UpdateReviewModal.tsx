import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import { UploadcareAuthSchema } from "@uploadcare/rest-client";
import Image from "next/image";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { IoTrashOutline } from "react-icons/io5";

const uploadcareAuthSchema = new UploadcareAuthSchema({
	publicKey: "1c38a5dddc184f1a73ef",
	secretKey: "980b8e2e18b99c9ac006",
});

function UpdateReviewModal({
	showModal,
	setShowModal,
	prev_category,
	prev_rating,
	prev_review,
	prev_title,
	prev_type,
	review_id,
	images_preview,
	restaurant_name,
	restaurant_address,
	created_at,
}: {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	prev_category: string;
	prev_rating: number;
	prev_review: string;
	prev_title: string;
	prev_type: string;
	restaurant_name: string;
	restaurant_address: string;
	review_id: string;
	created_at: string;
	images_preview: string[];
}) {
	const widgetApi = useRef();
	const [category, setCategory] = useState(prev_category);
	const [rating, setRating] = useState(prev_rating);
	const [review, setReview] = useState(prev_review);
	const [title, setTitle] = useState(prev_title);
	const [type, setType] = useState(prev_type);
	const [loading, setLoading] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [categories, setCategories] = useState();
	const [types, setTypes] = useState();

	const supabase = useSupabaseClient();
	const user = useUser();

	const router = useRouter();

	async function updateReview({ category, rating, review, title, type }) {
		try {
			setLoading(true);

			const data = {
				category,
				rating,
				review,
				title,
				type,
			};

			let { error } = await supabase
				.from("reviews")
				.update(data)
				.eq("uuid", review_id);
			if (error) throw error;
			alert("Review atualizada!");
			router.reload();
		} catch (error) {
			alert("Error updating review!");
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	async function getCategories() {
		try {
			setLoading(true);

			let { data, error, status } = await supabase
				.from("categories")
				.select();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setCategories(data);
			}
		} catch (error) {
			console.log(error);
			alert("Error loading categories!");
		} finally {
			setLoading(false);
		}
	}

	async function getTypes() {
		try {
			setLoading(true);

			let { data, error, status } = await supabase
				.from("types")
				.select(`id, name`);

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setTypes(data);
			}
		} catch (error) {
			console.log(error);
			alert("Error loading types!");
		} finally {
			setLoading(false);
		}
	}

	async function deleteReview() {
		try {
			setLoading(true);

			let { error } = await supabase
				.from("reviews")
				.delete()
				.eq("uuid", review_id);
			if (error) throw error;
			alert("Review excluída!");
			router.reload();
		} catch (error) {
			alert("Error deleting review!");
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getCategories();
		getTypes();
	}, []);

	return (
		<>
			{/* <!-- Main modal --> */}
			{showModal && (
				<div
					id="defaultModal"
					tabIndex={-1}
					aria-hidden="true"
					className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 bg-gray-900/60 flex justify-center items-center w-full md:inset-0 h-modal md:h-full"
				>
					<div className="relative p-4 w-full max-w-2xl h-full md:h-auto max-h-full">
						{/* <!-- Modal content --> */}
						<div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
							{/* <!-- Modal header --> */}
							<div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
								<h3 className="text-lg font-semibprev text-gray-900 dark:text-white">
									Atualizar Review
								</h3>
								<button
									type="button"
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-toggle="defaultModal"
									onClick={() => setShowModal(false)}
								>
									<svg
										aria-hidden="true"
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http:ww.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										></path>
									</svg>
									<span className="sr-only">Close modal</span>
								</button>
							</div>

							{/* <!-- Modal body --> */}
							<form
								onSubmit={(e) => {
									e.preventDefault();
									updateReview({
										category,
										rating,
										review,
										title,
										type,
									});
								}}
							>
								<div className="mb-4 bg-gray-100 p-4 rounded-lg">
									<div className="grid relative grid-cols-3 justify-center items-center gap-4 w-full rounded-lg">
										{images_preview.map((url) => {
											return (
												<div
													className="relative aspect-square rounded-lg border-gray-600 "
													key={url}
												>
													<Image
														src={url}
														alt={url}
														fill
														className="rounded-lg object-cover"
													/>
												</div>
											);
										})}
									</div>
									<div className="sm:col-span-2">
										<label
											htmlFor="name"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										></label>
										<div className="flex flex-col items-startjustify-between">
											<div className="text-xs text-gray-500 mb-2">
												{new Date(
													created_at
												).toLocaleDateString("pt-BR")}
											</div>
											<a href="#">
												<h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
													{restaurant_name}
												</h5>
											</a>
										</div>
										<div className="mb-2 text-xs flex text-gray-800">
											<div className="flex">
												<div>
													📍 {`${restaurant_address}`}
												</div>
												{/* <div className="">{` ${city}`}</div> */}
											</div>
										</div>
									</div>
								</div>
								<div className="grid gap-4 mb-4 items-center sm:grid-cols-2">
									<div>
										<label
											htmlFor="category"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Categoria
										</label>
										<select
											id="category"
											className="bg-gray-50 invalid:text-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placehprever-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											required
											onChange={(e) =>
												setCategory(e.target.value)
											}
											value={category}
										>
											{categories &&
												categories.map((e) => (
													<option
														key={e.id}
														value={e.id}
													>
														{e.name}
													</option>
												))}
										</select>
									</div>
									<div>
										<label
											htmlFor="type"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Tipo
										</label>
										<select
											id="type"
											className="bg-gray-50 invalid:text-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placehprever-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											required
											onChange={(e) =>
												setType(e.target.value)
											}
											value={type}
										>
											{types &&
												types.map((e) => (
													<option
														key={e.id}
														value={e.id}
													>
														{e.name}
													</option>
												))}
										</select>
									</div>
									<div>
										<label
											htmlFor="price"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Nota
										</label>
										<Rating
											name="half-rating"
											defaultValue={rating}
											precision={0.5}
											className=""
											onChange={(event, newValue) =>
												setRating(newValue)
											}
										/>
									</div>

									<div className="sm:col-span-2">
										<label
											htmlFor="description"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Review
										</label>
										<textarea
											id="description"
											rows={5}
											className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placehprever-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											placeholder=""
											defaultValue={review}
											onChange={(e) =>
												setReview(e.target.value)
											}
										></textarea>
									</div>
								</div>
								<div className="flex justify-between">
									<button
										type="submit"
										className="text-white h-fit p-3 px-4 flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
									>
										Atualizar
									</button>
									<button
										onClick={(e) => {
											e.preventDefault();
											setShowDeleteModal(true);
										}}
										className="focus:outline-none flex aspect-square text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-3 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
									>
										{/* <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http:ww.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg> */}
										<IoTrashOutline className="text-xl" />
									</button>
								</div>
							</form>

							{showDeleteModal && (
								<div className="fixed flex items-center justify-center bg-gray-900/40 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
									<div className="relative w-full h-full max-w-md md:h-auto">
										<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
											<button
												type="button"
												className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
												data-modal-hide="popup-modal"
											>
												<svg
													aria-hidden="true"
													className="w-5 h-5"
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
												<span className="sr-only">
													Close modal
												</span>
											</button>
											<div className="p-6 text-center">
												<svg
													aria-hidden="true"
													className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
													Tem certeza que deseja
													excluir esta review?
												</h3>
												<button
													onClick={() =>
														deleteReview()
													}
													type="button"
													className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
												>
													Tenho certeza
												</button>
												<button
													onClick={() =>
														setShowDeleteModal(
															false
														)
													}
													type="button"
													className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
												>
													Não, cancelar
												</button>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default UpdateReviewModal;
