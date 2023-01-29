import { Rating } from "@mui/material";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import UpdateReviewModal from "./UpdateReviewModal";

function Card({
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
}) {
	const [imagesUrl, setImagesUrl] = useState([]);
	const [showModal, setShowModal] = useState(false);

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

	// return (
	// 	<a
	// 		href="#"
	// 		className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
	// 	>
	// 		<Carousel className="min-w-fit">
	// 			{imagesUrl.map((e) => (
	// 				<div key={e} className="relative aspect-square min-h-full">
	// 					<Image
	// 						className="rounded-t-lg object-cover"
	// 						src={e}
	// 						alt=""
	// 						fill
	// 					/>
	// 				</div>
	// 			))}
	// 		</Carousel>
	// 		<div className="flex flex-col justify-between p-4 leading-normal">
	// 			<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
	// 				Noteworthy technology acquisitions 2021
	// 			</h5>
	// 			<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
	// 				Here are the biggest enterprise technology acquisitions of
	// 				2021 so far, in reverse chronological order.
	// 			</p>
	// 		</div>
	// 	</a>
	// );

	return (
		<div className="inline-flex w-full bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
			<Carousel className="aspect-square w-48" slide={false}>
				{imagesUrl.map((e) => (
					<div key={e} className="relative aspect-square">
						<Image
							className="rounded-l-lg object-cover"
							src={e}
							alt=""
							fill
						/>
					</div>
				))}
			</Carousel>
			<div className="p-5 flex flex-col justify-between w-full h-48">
				<div className="flex flex-col w-full justify-between">
					<div className="flex justify-between items-center">
						<div className="text-xs text-gray-500">
							{new Date(created_at).toLocaleDateString("pt-BR")}
						</div>
						<button
							onClick={() => setShowModal(true)}
							className="flex w-fit items-center gap-x-1 px-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg  border-gray-200 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
						>
							<BiEdit className="text-lg" />
							<div>Editar</div>
						</button>
					</div>
					<div className="flex flex-col items-startjustify-between">
						<a href="#">
							<h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
								{restaurant_name}
							</h5>
						</a>
						<div className="mb-2 text-xs flex text-gray-800">
							<div className="flex">
								<div>📍 {`${neighbourhood}, ${city}`}</div>
								{/* <div className="">{` ${city}`}</div> */}
							</div>
						</div>
					</div>
					<div className="ml-2"></div>
				</div>
				{/* <div className="mb-2 text-xs flex text-gray-800">
					<div>📍</div>
					<div className="flex flex-col">
						<div>{neighbourhood}</div>
						<div>{city}</div>
					</div>
				</div> */}
				<div className="mb-2">
					<Rating
						name="half-rating"
						value={rating}
						size="small"
						readOnly
						precision={0.5}
					/>
				</div>
				<div className="flex flex-wrap gap-y-2 mb-4">
					<span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
						{category}
					</span>
					<span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
						{type}
					</span>
				</div>

				{/* <p className="mb-3 overflow-hidden font-normal text-gray-700 border-t-1 pt-4 dark:text-gray-400 text-sm">
					{review}
				</p> */}
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

export default Card;
