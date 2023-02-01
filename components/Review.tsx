import { Rating } from "@mui/material";
import { useUser } from "@supabase/auth-helpers-react";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import UpdateReviewModal from "./UpdateReviewModal";

function Review({
	images_info,
	restaurant_name,
	restaurant_address,
	review,
	rating,
	title,
	type,
	category,
	created_at,
	neighbourhood,
	city,
	uuid,
	category_id,
	type_id,
	emoji,
}: {
	images_info: string[];
	restaurant_name: string;
	restaurant_address: string;
	review: string;
	title: string;
	rating: number;
	type: string;
	category: string;
	created_at: string;
	neighbourhood: string;
	city: string;
	uuid: string;
	category_id: string;
	type_id: string;
	emoji: string;
}) {
	const [imagesUrl, setImagesUrl] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const user = useUser();

	// useEffect(() => {
	// 	const script = document.createElement("script");

	// 	script.src = "/node_modules/flowbite/dist/flowbite.min.js";
	// 	script.async = true;

	// 	document.body.appendChild(script);

	// 	return () => {
	// 		document.body.removeChild(script);
	// 	};
	// }, []);

	useEffect(() => {
		if (images_info) {
			var temp_images_url = [];
			for (var i = 0; i < images_info.count; i++) {
				temp_images_url.push(images_info.cdnUrl + "nth/" + i + "/");
			}
			setImagesUrl(temp_images_url);
		}
	}, [images_info]);

	return (
		<div className="inline-flex w-full overflow-hidden mx-auto flex-col dark:bg-gray-800 dark:border-gray-700">
			{/* <div className="inline-flex w-full flex-col dark:bg-gray-800 dark:border-gray-700"> */}
			<Carousel className="rounded-none" slide={false}>
				{imagesUrl.map((e) => (
					<div key={e} className="relative h-64 rounded-none">
						<Image className="object-cover" src={e} alt="" fill />
					</div>
				))}
			</Carousel>
			{/* <div className="flex overflow-x-scroll gap-x-2  snap-x snap-mandatory">
				{imagesUrl.map((e) => (
					<div
						key={e}
						className="relative h-48 w-full snap-start flex-none"
					>
						<Image
							key={e}
							className="object-cover rounded-t-lg"
							src={e}
							alt=""
							fill
							// height={75}
							// width={150}
						/>
					</div>
				))}
			</div> */}
			{/* <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
				<Carousel>
					{imagesUrl.map((e) => (
						<div key={e} className="relative aspect-square">
							<Image
								className="rounded-t-lg object-cover"
								src={e}
								alt=""
								fill
							/>
						</div>
					))}
				</Carousel>
			</div> */}
			<div className=" p-3 py-2 gap-y-2 flex flex-col justify-between ">
				<div className="flex flex-col items-start justify-between">
					{/* <div className="text-xs text-gray-500 mb-2">
						{new Date(created_at).toLocaleDateString("pt-BR")}
					</div> */}
					<h5 className="text-base font-semibold text-gray-900 dark:text-white">
						{restaurant_name}
					</h5>
				</div>
				<div className="text-xs flex -mt-1 text-gray-500">
					<div className="flex">
						<div>📍 {`${neighbourhood}, ${city}`}</div>
						{/* <div className="">{` ${city}`}</div> */}
					</div>
				</div>
				{/* <div className="mb-2 text-xs flex text-gray-800">
					<div>📍</div>
					<div className="flex flex-col">
						<div>{neighbourhood}</div>
						<div>{city}</div>
					</div>
				</div> */}
				<span className="text-xs text-gray-500 mr-2 rounded dark:bg-gray-700 dark:text-gray-400">
					{emoji} {category} • {type}
				</span>
				{/* <div className="flex flex-wrap gap-y-2">
					<span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
						{category}
					</span>
					<span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
						{type}
					</span>
				</div> */}
				<Rating
					name="half-rating"
					value={rating}
					size="small"
					readOnly
					precision={0.5}
				/>

				<p className="mb-3 font-normal text-gray-700 border-t-1 pt-4 dark:text-gray-400 text-sm">
					{review}
				</p>
				{user && (
					<button
						onClick={() => setShowModal(true)}
						className="flex w-fit items-center gap-x-1 px-3 text-sm font-medium py-2 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
					>
						<BiEdit className="text-lg" />
						<div>Editar</div>
					</button>
				)}
				{showModal && (
					<UpdateReviewModal
						review_id={uuid}
						prev_category={category_id}
						prev_rating={rating}
						prev_review={review}
						prev_type={type_id}
						showModal={showModal}
						setShowModal={setShowModal}
						images_preview={imagesUrl}
						restaurant_name={restaurant_name}
						restaurant_address={restaurant_address}
						created_at={created_at}
					/>
				)}
			</div>
		</div>
	);
}

export default Review;
