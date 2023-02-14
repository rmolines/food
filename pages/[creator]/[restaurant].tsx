import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProfileHeaderAlt } from "../../components/ProfileHeaderAlt";
import Review from "../../components/Review";
import { Reviews } from "../../types/supabase";

function RestaurantReview() {
	const supabase = useSupabaseClient();
	const user = useUser();
	const [loading, setLoading] = useState(true);
	const [full_name, setFullName] = useState();
	const [avatar_url, setAvatarUrl] = useState();
	const [userId, setUserId] = useState();
	const [review, setReview] = useState<Reviews>();
	const [loggedInUsername, setLoggedInUsername] = useState<string>();

	const router = useRouter();
	const username = router.query.creator;
	const uuid = router.query.restaurant;

	async function getProfileFromUsername(username: string) {
		try {
			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username, avatar_url, full_name, id`)
				.eq("username", username)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
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
					`image_urls, review, images_info, category(name, id, emoji), type(name, id), restaurant, rating, uuid, created_at`
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

	async function getLoggedInUsername() {
		try {
			setLoading(true);

			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username`)
				.eq("id", user?.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setLoggedInUsername(data.username);
			}
		} catch (error) {
			console.log(error);
			alert("Error loading username!");
		} finally {
			setLoading(false);
		}
	}

	async function getData(uuid: string, username: string) {
		await getProfileFromUsername(username);
		await getReview(uuid);
		setLoading(false);
	}

	useEffect(() => {
		if (username && uuid) {
			getData(uuid.toString(), username.toString());
		}
		if (user) {
			getLoggedInUsername();
		}
	}, [username]);

	if (loading) return;

	return (
		<div className="flex flex-col grow">
			<div className="mt-4">
				<ProfileHeaderAlt
					user_id={userId}
					avatar_url={avatar_url}
					full_name={full_name}
					username={username}
					isLoggedInProfile={username === loggedInUsername}
				/>
			</div>

			{/* <button className="p-3 rounded-full text-xl h-fit w-fit mb-2">
				<IoArrowBack />
			</button> */}
			<div className="max-w-xl mx-auto mt-8 w-full">
				{review && (
					<Review
						key={review.uuid}
						review={review}
						restaurant_address={
							review.restaurant?.value.structured_formatting
								.secondary_text
						}
						restaurant_name={
							review.restaurant?.value.structured_formatting
								.main_text
						}
						neighbourhood={review.restaurant?.value.terms[2].value}
						city={review.restaurant?.value.terms[3].value}
						isLoggedInProfile={username === loggedInUsername}
					/>
				)}
			</div>
		</div>
	);
	// return <Account session={session} />;
}

export default RestaurantReview;
