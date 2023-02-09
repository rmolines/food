import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import { FileInfo } from "@uploadcare/rest-client";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Widget } from "@uploadcare/react-widget";
import { IoIosImages } from "react-icons/io";
import Image from "next/image";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

function ReviewModal({
	showModal,
	setShowModal,
}: {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
	const widgetApi = useRef();
	const [chosenImages, setChosenImages] = useState<FileInfo>();
	const [imagesPreview, setImagesPreview] = useState<string[]>();
	const [restaurantJson, setRestaurantJson] = useState();
	const [category, setCategory] = useState();
	const [rating, setRating] = useState();
	const [review, setReview] = useState();
	const [title, setTitle] = useState();
	const [type, setType] = useState();
	const [loading, setLoading] = useState(false);

	const [categories, setCategories] = useState();
	const [types, setTypes] = useState();

	const supabase = useSupabaseClient();
	const user = useUser();

	const router = useRouter();

	async function createReview({
		restaurant,
		category,
		rating,
		review,
		images_info,
		title,
		type,
	}: {
		restaurant: string;
		category: string;
		rating: string;
		review: string;
		images_info: string;
		title: string;
		type: string;
	}) {
		try {
			setLoading(true);

			const data = {
				creator: user?.id,
				restaurant,
				category,
				rating,
				review,
				images_info,
				title,
				type,
			};

			let { error } = await supabase.from("reviews").insert(data);
			if (error) throw error;
			alert("Review criada!");
			router.reload();
		} catch (error) {
			console.log(error);
			alert("Error creating review!");
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
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
									Nova Review
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
									createReview({
										restaurant: restaurantJson,
										category,
										rating,
										review,
										images_info: chosenImages,
										title,
										type,
									});
								}}
							>
								<div className="mb-4">
									<div className="text-sm font-medium mb-2">
										Imagens
									</div>
									{!imagesPreview ? (
										<div
											className="flex flex-col justify-center py-10 items-center gap-2 border rounded-lg bg-gray-50 border-gray-300 cursor-pointer hover:bg-gray-100"
											onClick={() => {
												if (widgetApi.current) {
													widgetApi.current.openDialog();
												}
											}}
										>
											<IoIosImages className="text-5xl text-gray-900" />
										</div>
									) : (
										<>
											<div
												className="grid relative grid-cols-4 grid-flow-row overflow-y-scroll p-2 justify-center items-center gap-2 border rounded-lg bg-gray-50 border-gray-300 hover:bg-gray-100 cursor-pointer"
												onClick={() => {
													if (widgetApi.current) {
														widgetApi.current.openDialog();
													}
												}}
											>
												<div className="w-full h-full hover:bg-gray-600/20 hover:z-50 absolute flex items-center justify-center text-lg font-medium">
													{/* <button
														type="submit"
														className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
													>
														Editar
													</button>{" "} */}
												</div>
												{imagesPreview.map((url) => {
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
																// width={100}
																// height={100}
															/>
														</div>
													);
												})}
											</div>
											<div></div>
										</>
									)}
								</div>

								<Widget
									ref={widgetApi}
									publicKey="1c38a5dddc184f1a73ef"
									id="file"
									multiple
									previewStep
									locale="pt"
									tabs="instagram file"
									onFileSelect={(file) => {
										console.log("File changed: ", file);
									}}
									onChange={(info) => {
										console.log("Upload completed:", info);
										let cdnUrls = [];

										for (var i = 0; i < info.count; i++) {
											cdnUrls.push(
												info.cdnUrl + "nth/" + i + "/"
											);
										}
										setImagesPreview(cdnUrls);
										setChosenImages(info);
									}}
								/>
								<div className="grid gap-4 mb-4 items-center sm:grid-cols-2">
									<div className="sm:col-span-2">
										<label
											htmlFor="name"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Restaurante
										</label>
										<GooglePlacesAutocomplete
											apiKey={
												process.env
													.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
											}
											apiOptions={{
												language: "pt-BR",
												region: "BR",
											}}
											selectProps={{
												styles: {
													control: (provided) => ({
														...provided,
														"--tw-bg-opacity": 1,
														backgroundColor:
															"rgb(249 250 251 / var(--tw-bg-opacity))",
														borderRadius: "0.5rem",
														fontZize:
															"0.875rem" /* 14px */,
														lineHeight:
															"1.25rem" /* 20px */,
														"--tw-text-opacity": 1,
														color: "rgb(17 24 39 / var(--tw-text-opacity))",
														height: "0.1rem",
														innerHeight: "100%",
														outerHeight: "100%",
														// padding: "0.625rem",
													}),
													container: (provided) => ({
														...provided,
														// padding: "0.625rem",
														innerHeight: "100%",
														outerHeight: "100%",
													}),
													menu: (provided) => ({
														...provided,
														"--tw-bg-opacity": 1,
														backgroundColor:
															"rgb(249 250 251 / var(--tw-bg-opacity))",
														borderRadius: "0.5rem",
														fontSize:
															"0.875rem" /* 14px */,
														lineHeight:
															"1.25rem" /* 20px */,
													}),
													input: (provided) => ({
														...provided,
													}),
													option: (provided) => ({
														...provided,
													}),
													singleValue: (
														provided
													) => ({
														...provided,
													}),
												},
												onChange: (e) =>
													setRestaurantJson(e),
											}}
										/>
									</div>
									<div>
										<label
											htmlFor="category"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Categoria
										</label>
										<select
											id="category"
											className="bg-gray-50 invalid:text-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											required
											onChange={(e) =>
												setCategory(e.target.value)
											}
										>
											<option value="" disabled selected>
												Selecionar...
											</option>
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
											className="bg-gray-50 invalid:text-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											required
											onChange={(e) =>
												setType(e.target.value)
											}
										>
											<option value="" disabled selected>
												Selecionar...
											</option>
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
									{/* <div>
										<label
											htmlFor="brand"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Endereço
										</label>
										<input
											type="text"
											name="brand"
											id="brand"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											placeholder=""
											required=""
										/>
									</div> */}
									<div>
										<label
											htmlFor="price"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Nota
										</label>
										<Rating
											name="half-rating"
											defaultValue={2.5}
											precision={0.5}
											className=""
											onChange={(event, newValue) =>
												setRating(newValue)
											}
										/>
									</div>

									{/* <div className="sm:col-span-2">
										<label
											htmlFor="brand"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Título
										</label>
										<input
											type="text"
											name="brand"
											id="brand"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											required
											onChange={(e) =>
												setTitle(e.target.value)
											}
										/>
									</div> */}

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
											className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
											placeholder=""
											onChange={(e) =>
												setReview(e.target.value)
											}
										></textarea>
									</div>
								</div>
								<button
									type="submit"
									className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									{/* <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http:ww.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg> */}
									Criar review
								</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ReviewModal;
