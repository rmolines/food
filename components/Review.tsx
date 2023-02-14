import { Rating } from "@mui/material";
import { useUser } from "@supabase/auth-helpers-react";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import router from "next/router";
import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import { Reviews } from "../types/supabase";
import UpdateReviewModal from "./UpdateReviewModal";

function Review({
	review,
	restaurant_name,
	restaurant_address,
	neighbourhood,
	city,
	isLoggedInProfile,
}: {
	review: Reviews;
	restaurant_name: string;
	restaurant_address: string;
	neighbourhood: string;
	city: string;
	isLoggedInProfile: boolean;
}) {
	const [imagesUrl, setImagesUrl] = useState<string[]>();
	const [showModal, setShowModal] = useState(false);
	const user = useUser();

	const { images_info, image_urls } = review;

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
		<div className="mx-auto inline-flex w-full flex-col overflow-hidden dark:border-gray-700 dark:bg-gray-800">
			{/* <div className="inline-flex w-full flex-col dark:bg-gray-800 dark:border-gray-700"> */}
			<button onClick={() => router.back()}>
				<IoArrowBack className="mb-4 text-2xl" />
			</button>
			{image_urls && (
				<Carousel className="rounded-none" slide={false}>
					{image_urls.map((e) => (
						<div key={e} className="relative h-64 rounded-none">
							<Image
								className="object-cover"
								src={e}
								alt=""
								fill
							/>
						</div>
					))}
				</Carousel>
			)}
			{/* {imagesUrl && (
				<div>
					<ReactPlayer
						url="https://ucarecdn.com/84b30b0e-0313-483c-afef-29cf8e23c2fd~1/nth/0/"
						playing={true}
						controls
					/>
				</div>
			)} */}
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
			<div className=" flex flex-col justify-between gap-y-2 p-3 py-2 ">
				<div className="flex flex-col items-start justify-between">
					{/* <div className="text-xs text-gray-500 mb-2">
						{new Date(created_at).toLocaleDateString("pt-BR")}
					</div> */}
					<h5 className="text-base font-semibold text-gray-900 dark:text-white">
						{restaurant_name}
					</h5>
				</div>
				<div className="-mt-1 flex text-xs text-gray-500">
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
				<span className="mr-2 rounded text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
					<>
						{review.category.emoji} {review.category.name} •{" "}
						{review.type.name}
					</>
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
					value={review.rating}
					size="small"
					readOnly
					precision={0.5}
				/>

				<p className="mb-3 border-t-1 pt-4 text-sm font-normal text-gray-700 dark:text-gray-400">
					{review.review}
				</p>
				{isLoggedInProfile && (
					<button
						onClick={() => setShowModal(true)}
						className="flex w-fit items-center gap-x-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
					>
						<BiEdit className="text-lg" />
						<div>Editar</div>
					</button>
				)}
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
		</div>
	);
}

export default Review;
