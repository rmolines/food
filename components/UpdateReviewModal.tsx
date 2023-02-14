import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { IoTrashOutline } from "react-icons/io5";
import { Categories, Reviews, Types } from "../types/supabase";

function UpdateReviewModal({
	showModal,
	setShowModal,
	restaurant_name,
	restaurant_address,
	review,
	imagesUrl,
}: {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	restaurant_name: string;
	restaurant_address: string;
	review: Reviews;
	imagesUrl: string[] | undefined;
}) {
	const [category, setCategory] = useState(review.category.id);
	const [rating, setRating] = useState(review.rating);
	const [reviewText, setReview] = useState(review.review);
	const [title, setTitle] = useState(review.title);
	const [type, setType] = useState(review.type.id);
	const [loading, setLoading] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [categories, setCategories] = useState<Categories[]>();
	const [types, setTypes] = useState<Types[]>();

	const supabase = useSupabaseClient();
	const user = useUser();

	const router = useRouter();

	async function updateReview({
		category,
		rating,
		reviewText,
		title,
		type,
		id,
	}: {
		category: number | null;
		rating: number | null;
		reviewText: string | null;
		title: string | null;
		type: number | null;
		id: string | null;
	}) {
		try {
			setLoading(true);

			const data = {
				category,
				rating,
				review: reviewText,
				title,
				type,
			};

			let { error } = await supabase
				.from("reviews")
				.update(data)
				.eq("uuid", id);
			if (error) throw error;
			alert("Review atualizada!");
			router.reload();
		} catch (error) {
			console.log(error);
			alert("Error updating review!");
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

	async function deleteReview(id: Reviews["uuid"]) {
		try {
			setLoading(true);

			let { error } = await supabase
				.from("reviews")
				.delete()
				.eq("uuid", id);
			if (error) throw error;
			alert("Review excluída!");
			router.back();
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
					className="fixed inset-0 z-50 flex h-modal w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/60 md:inset-0 md:h-full"
				>
					<div className="relative h-full max-h-full w-full max-w-2xl p-4 md:h-auto">
						{/* <!-- Modal content --> */}
						<div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
							{/* <!-- Modal header --> */}
							<div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
									Atualizar Review
								</h3>
								<button
									type="button"
									className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-toggle="defaultModal"
									onClick={() => setShowModal(false)}
								>
									<svg
										aria-hidden="true"
										className="h-5 w-5"
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
										reviewText,
										title,
										type,
										id: review.uuid,
									});
								}}
							>
								<div className="mb-4 rounded-lg bg-gray-100 p-4">
									<div className="relative grid w-full grid-cols-3 items-center justify-center gap-4 rounded-lg">
										{review.image_urls &&
											review.image_urls.map((url) => {
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
											className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
										></label>
										<div className="flex flex-col items-start justify-between">
											{review.created_at && (
												<div className="mb-2 text-xs text-gray-500">
													{new Date(
														review.created_at
													).toLocaleDateString(
														"pt-BR"
													)}
												</div>
											)}
											<h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
												{restaurant_name}
											</h5>
										</div>
										<div className="mb-2 flex text-xs text-gray-800">
											<div className="flex">
												<div>
													📍 {`${restaurant_address}`}
												</div>
												{/* <div className="">{` ${city}`}</div> */}
											</div>
										</div>
									</div>
								</div>
								<div className="mb-4 grid items-center gap-4 sm:grid-cols-2">
									<div>
										<label
											htmlFor="category"
											className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
										>
											Categoria
										</label>
										<select
											id="category"
											className="dark:placehprever-gray-400 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 invalid:text-gray-500 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500"
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
											className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
										>
											Tipo
										</label>
										{type && (
											<select
												id="type"
												className="dark:placehprever-gray-400 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 invalid:text-gray-500 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500"
												required
												onChange={(e) =>
													setType(
														parseInt(e.target.value)
													)
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
										)}
									</div>
									<div>
										<label
											htmlFor="price"
											className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
										>
											Nota
										</label>
										{review.rating && (
											<Rating
												name="half-rating"
												defaultValue={review.rating}
												precision={0.5}
												className=""
												onChange={(event, newValue) =>
													setRating(newValue)
												}
											/>
										)}
									</div>

									<div className="sm:col-span-2">
										<label
											htmlFor="description"
											className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
										>
											Review
										</label>
										{review.review && (
											<textarea
												id="description"
												rows={5}
												className="dark:placehprever-gray-400 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500"
												placeholder=""
												defaultValue={review.review}
												onChange={(e) =>
													setReview(e.target.value)
												}
											/>
										)}
									</div>
								</div>
								<div className="flex justify-between">
									<button
										type="submit"
										className="flex h-fit items-center rounded-lg bg-primary-700 p-3 px-4 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
									>
										Atualizar
									</button>
									<button
										onClick={(e) => {
											e.preventDefault();
											setShowDeleteModal(true);
										}}
										className="mr-2 mb-2 flex aspect-square rounded-lg bg-red-700 p-3 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
									>
										{/* <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http:ww.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg> */}
										<IoTrashOutline className="text-xl" />
									</button>
								</div>
							</form>

							{showDeleteModal && (
								<div className="fixed z-50 flex h-modal items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/40 p-4 md:inset-0 md:h-full">
									<div className="relative h-full w-full max-w-md md:h-auto">
										<div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
											<button
												type="button"
												className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
												data-modal-hide="popup-modal"
											>
												<svg
													aria-hidden="true"
													className="h-5 w-5"
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
													className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
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
														deleteReview(
															review.uuid
														)
													}
													type="button"
													className="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
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
													className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
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
