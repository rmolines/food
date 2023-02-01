import { Rating } from "@mui/material";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import UpdateReviewModal from "./UpdateReviewModal";

function HorizontalCard({
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
	username,
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
	username: string;
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
		<div className="inline-flex w-full h-fit overflow-hidden bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
			{/* <Carousel className="aspect-square w-36 h-32" slide={false}>
				{imagesUrl.map((e) => (
					<div key={e} className="relative h-full w-full">
						<Image
							key={e}
							className="object-cover"
							src={e}
							alt=""
							fill
						/>
					</div>
				))}
			</Carousel> */}
			{/* <div className="rounded-l-lg shrink-0">
				<Image
					className="rounded-l-lg"
					src={imagesUrl[0]}
					alt=""
					width={125}
					height={125}
				/>
			</div> */}

			<div className="flex overflow-hidden sm:w-48 w-36 gap-x-2 snap-x snap-mandatory flex-none">
				{imagesUrl.map((e) => (
					<div
						key={e}
						className="relative h-32 sm:h-40 w-full snap-center flex-none"
					>
						<Image
							key={e}
							className="object-cover"
							src={e}
							alt=""
							fill
							// height={75}
							// width={150}
						/>
					</div>
				))}
			</div>
			<div className="flex w-full">
				<div className="flex flex-col justify-center p-2 pl-3 gap-y-1">
					{/* <div className="flex justify-between items-center">
						<div className="text-xs text-gray-500">
							{new Date(created_at).toLocaleDateString("pt-BR")}
						</div>
					</div> */}
					<div className="flex flex-col items-startjustify-between">
						<h5 className="font-medium text-gray-900 dark:text-white truncate">
							{restaurant_name}
						</h5>
						<div className="text-xs flex text-gray-500 font-light truncate">
							<div className="flex">
								<div>📍 {`${neighbourhood}, ${city}`}</div>
							</div>
						</div>
					</div>
					<div className="ml-2"></div>
					{/* <div className="mb-2 text-xs flex text-gray-800">
					<div>📍</div>
					<div className="flex flex-col">
						<div>{neighbourhood}</div>
						<div>{city}</div>
					</div>
				</div> */}
					<div className="flex sm:flex-wrap gap-y-2">
						<span className="text-gray-500 text-xs font-light dark:bg-gray-700 dark:text-gray-400">
							{emoji} {category}
							{/* • {type} */}
						</span>
					</div>

					<Rating
						name="half-rating"
						value={rating}
						size="small"
						readOnly
						precision={0.5}
					/>
				</div>
				{/* <p className="mb-3 overflow-hidden font-normal text-gray-700 border-t-1 pt-4 dark:text-gray-400 text-sm">
					{review}
				</p> */}
			</div>
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
	);
}

export default HorizontalCard;
