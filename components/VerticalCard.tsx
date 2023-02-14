import { Rating } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Reviews } from "../types/supabase";
import UpdateReviewModal from "./UpdateReviewModal";

function VerticalCard({
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
		<div className="inline-flex h-full w-full max-w-full flex-col shadow dark:border-gray-700 dark:bg-gray-800">
			<div className="flex aspect-square min-w-full flex-none snap-x snap-mandatory gap-x-2 overflow-hidden">
				{review.image_urls &&
					review.image_urls.map((e) => (
						<div
							key={e}
							className="relative h-full w-full flex-none snap-center"
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
				<div className="flex max-w-full flex-col justify-between gap-y-1 p-2 pl-3">
					<div className="flex max-w-full flex-col items-start justify-between">
						<h5 className="min-w-0 max-w-full truncate text-xs font-medium text-gray-900 dark:text-white sm:text-sm">
							{restaurant_name}
						</h5>
						<div className="mt-1 flex max-w-full text-xs font-light text-gray-500">
							<div className="max-w-full truncate">
								📍 {`${neighbourhood}, ${city}`}
							</div>
						</div>
						{review.category && (
							<div className="mt-1 flex gap-y-2 sm:flex-wrap">
								<span className="text-xs font-light text-gray-500 dark:bg-gray-700 dark:text-gray-400">
									{review.category.emoji}{" "}
									{review.category.name}
								</span>
							</div>
						)}
					</div>

					<Rating
						name="half-rating"
						value={review.rating}
						size="small"
						readOnly
						precision={0.5}
					/>
				</div>
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

export default VerticalCard;
