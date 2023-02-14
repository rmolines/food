import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Image from "next/image";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
	review_text: string;
	restaurant_name: string;
	restaurant_address: string;
	type: string;
	category: string;
	restaurantJson: object;
};

function CreateReviewModal({
	review_text,
	image_urls,
	instagram_url,
	next_review,
	total_count,
	current_count,
	username,
	cancel,
}: {
	review_text: string;
	image_urls: string[];
	next_review: () => void;
	total_count: number;
	current_count: number;
	username: string;
	cancel: () => void;
	instagram_url: string;
}) {
	const [restaurantJson, setRestaurantJson] = useState();
	const [rating, setRating] = useState(2.5);
	const [loading, setLoading] = useState(false);

	const [categories, setCategories] = useState();
	const [types, setTypes] = useState();

	const supabase = useSupabaseClient();
	const user = useUser();

	console.log(instagram_url);

	const {
		register,
		handleSubmit,
		watch,
		trigger,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data, e) => {
		console.log(data);
		createReview({
			restaurant: restaurantJson,
			category: data.category,
			rating,
			review: review_text,
			type: data.type,
			image_urls,
			instagram_url,
		});
	};

	async function createReview({
		restaurant,
		category,
		rating,
		review,
		image_urls,
		type,
		instagram_url,
	}: {
		restaurant: object;
		category: string;
		rating: number;
		review: string;
		image_urls: string[];
		type: string;
		instagram_url: string;
	}) {
		try {
			setLoading(true);

			const data = {
				creator: user?.id,
				restaurant,
				category,
				rating,
				review,
				image_urls,
				type,
				instagram_url,
			};

			let { error } = await supabase.from("reviews").insert(data);
			if (error) throw error;
			alert("Review criada!");
			next_review();
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
								Nova Review
							</h3>
							<h5></h5>
						</div>

						{/* <!-- Modal body --> */}
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-4">
								<div className="mb-2 text-sm font-medium">
									Imagens
								</div>
								<div className="relative grid w-full grid-cols-3 items-center justify-center gap-4 rounded-lg">
									{image_urls &&
										image_urls.map((url) => {
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
							</div>
							<div className="mb-4 grid items-center gap-4 sm:grid-cols-2">
								<div className="sm:col-span-2">
									<label
										htmlFor="name"
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
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
												singleValue: (provided) => ({
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
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>
										Categoria
									</label>
									<select
										id="category"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 invalid:text-gray-500 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
										required
										{...register("category", {
											required:
												"Este campo é obrigatório",
										})}
										onKeyUp={() => {
											trigger("category");
										}}
									>
										<option value="" disabled selected>
											Selecionar...
										</option>
										{categories &&
											categories.map((e) => (
												<option key={e.id} value={e.id}>
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
									<select
										id="type"
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 invalid:text-gray-500 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
										required
										{...register("type", {
											required:
												"Este campo é obrigatório",
										})}
										onKeyUp={() => {
											trigger("type");
										}}
									>
										<option value="" disabled selected>
											Selecionar...
										</option>
										{types &&
											types.map((e) => (
												<option key={e.id} value={e.id}>
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
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>
										Nota
									</label>
									<Rating
										// name="half-rating"
										defaultValue={rating}
										value={rating}
										precision={0.5}
										className=""
										onChange={(event, newValue) => {
											if (newValue) {
												setRating(newValue);
											}
										}}
										// {...register("rating", {
										// 	required:
										// 		"Este campo é obrigatório",
										// 	onChange: (event, newValue) => {
										// 		if (newValue) {
										// 			setRating(newValue);
										// 		}
										// 	},
										// })}
										// onKeyUp={() => {
										// 	trigger("rating");
										// }}
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
										className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
									>
										Review
									</label>
									<textarea
										id="description"
										rows={5}
										className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
										value={review_text}
										{...register("review_text", {
											required:
												"Este campo é obrigatório",
										})}
										onKeyUp={() => {
											trigger("review_text");
										}}
									></textarea>
								</div>
							</div>
							<div className="flex w-full justify-between">
								<button
									onClick={cancel}
									className="inline-flex items-center rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									{/* <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http:ww.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg> */}
									Cancelar
								</button>
								<button
									type="submit"
									className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									{/* <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http:ww.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg> */}
									Próximo ({current_count}/{total_count})
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default CreateReviewModal;
