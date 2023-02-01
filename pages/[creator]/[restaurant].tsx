import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProfileHeaderAlt } from "../../components/ProfileHeaderAlt";
import Review from "../../components/Review";
import Link from "next/link";

function RestaurantReview() {
	const supabase = useSupabaseClient();
	const [loading, setLoading] = useState(true);
	const [instagram, setInstagram] = useState(null);
	const [full_name, setFullName] = useState(null);
	const [avatar_url, setAvatarUrl] = useState(null);
	const [userId, setUserId] = useState(null);
	const [review, setReview] = useState(null);

	const router = useRouter();
	const username = router.query.creator;
	const uuid = router.query.restaurant;
	const user = useUser();

	async function getProfileFromUsername(username: string) {
		try {
			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username, instagram, avatar_url, full_name, id`)
				.eq("username", username)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setInstagram(data.instagram);
				setAvatarUrl(data.avatar_url);
				setFullName(data.full_name);
				setUserId(data.id);
			}
		} catch (error) {
			console.log(error);
			alert("Error loading user data!");
		}
	}

	async function getReview(uuid: string) {
		try {
			let { data, error, status } = await supabase
				.from("reviews")
				.select(
					`review, images_info, category(name, id, emoji), type(name, id), restaurant, rating, uuid, created_at`
				)
				.eq("uuid", uuid)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			setReview(data);
		} catch (error) {
			console.log(error);
			alert("Error loading review data!");
		}
	}

	async function getData(uuid: string, username: string) {
		await getProfileFromUsername(username);
		await getReview(uuid);
		setLoading(false);
	}

	useEffect(() => {
		if (username && uuid) {
			getData(uuid, username);
		}
	}, [username]);

	if (loading) return;

	return (
		<div className="flex flex-col grow">
			<Link href={"/" + username} className="my-4">
				<ProfileHeaderAlt
					user_id={userId}
					avatar_url={avatar_url}
					full_name={full_name}
					instagram={instagram}
				/>
			</Link>

			{/* <button className="p-3 rounded-full text-xl h-fit w-fit mb-2">
				<IoArrowBack />
			</button> */}
			<div className="max-w-xl mx-auto mt-8">
				<Review
					key={review.id}
					images_info={review.images_info}
					review={review.review}
					rating={review.rating}
					category={review.category.name}
					restaurant_address={
						review.restaurant.value.structured_formatting
							.secondary_text
					}
					restaurant_name={
						review.restaurant.value.structured_formatting.main_text
					}
					type={review.type.name}
					created_at={review.created_at}
					neighbourhood={review.restaurant.value.terms[2].value}
					city={review.restaurant.value.terms[3].value}
					uuid={review.uuid}
					category_id={review.category.id}
					type_id={review.type.id}
					emoji={review.category.emoji}
				/>
			</div>
		</div>
	);
	// return <Account session={session} />;
}

export default RestaurantReview;
