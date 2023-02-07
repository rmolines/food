import { Rating } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Reviews } from "../types/supabase";
import UpdateReviewModal from "./UpdateReviewModal";

function HorizontalCard({
	review,
	restaurant_name,
	restaurant_address,
	neighbourhood,
	city,
}: {
	review: Reviews;
	restaurant_name: string;
	restaurant_address: string;
	neighbourhood: string;
	city: string;
}) {
	const [imagesUrl, setImagesUrl] = useState<string[]>();
	const [showModal, setShowModal] = useState(false);
	const { images_info } = review;

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

			<div className="flex overflow-hidden h-32 sm:w-48 w-40 gap-x-2 snap-x snap-mandatory flex-none">
				{imagesUrl &&
					imagesUrl.map((e) => (
						<div
							key={e}
							className="relative h-full w-full snap-center flex-none"
						>
							<Image
								key={e}
								className="object-cover"
								src={e}
								alt=""
								fill
							/>
						</div>
					))}
			</div>
			<div className="flex w-full">
				<div className="flex flex-col justify-between p-2 pl-3 gap-y-1">
					{/* <div className="flex justify-between items-center">
						<div className="text-xs text-gray-500">
							{new Date(created_at).toLocaleDateString("pt-BR")}
						</div>
					</div> */}
					<div className="flex flex-col items-startjustify-between">
						<h5 className="font-medium text-gray-900 dark:text-white truncate min-w-0">
							{restaurant_name}
						</h5>
						<div className="text-xs flex text-gray-500 font-light truncate mt-1">
							<div className="flex">
								<div>📍 {`${neighbourhood}, ${city}`}</div>
							</div>
						</div>
						{review.category && (
							<div className="flex sm:flex-wrap gap-y-2 mt-1">
								<span className="text-gray-500 text-xs font-light dark:bg-gray-700 dark:text-gray-400">
									{review.category.emoji}{" "}
									{review.category.name}
									{/* • {review.type.name} */}
								</span>
							</div>
						)}
					</div>
					{/* <div className="mb-2 text-xs flex text-gray-800">
					<div>📍</div>
					<div className="flex flex-col">
						<div>{neighbourhood}</div>
						<div>{city}</div>
					</div>
				</div> */}

					<Rating
						name="half-rating"
						value={review.rating}
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
					showModal={showModal}
					setShowModal={setShowModal}
					imagesUrl={imagesUrl}
					restaurant_name={restaurant_name}
					restaurant_address={restaurant_address}
					review={review}
				/>
			)}
		</div>
	);
}

export default HorizontalCard;
