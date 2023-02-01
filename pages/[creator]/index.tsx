import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProfileHeaderAlt } from "../../components/ProfileHeaderAlt";
import { ReviewGridAlt } from "../../components/ReviewGridAlt";

function Creator() {
	const supabase = useSupabaseClient();
	const [loading, setLoading] = useState(true);
	const [instagram, setInstagram] = useState(null);
	const [full_name, setFullName] = useState(null);
	const [avatar_url, setAvatarUrl] = useState(null);
	const [userId, setUserId] = useState(null);

	const router = useRouter();
	const username = router.query.creator;

	async function getProfileFromUsername(username: string) {
		try {
			setLoading(true);

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
		} finally {
			setLoading(false);
		}
	}

	async function fillCategories() {
		try {
			setLoading(true);

			const data = {};

			let { error } = await supabase.from("reviews").insert(data);
			if (error) throw error;
			alert("Review criada!");
			router.reload();
		} catch (error) {
			alert("Error creating review!");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (username) {
			getProfileFromUsername(username);
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
					instagram={instagram}
				/>
			</div>
			<ReviewGridAlt username={username} />
		</div>
	);
	// return <Account session={session} />;
}

export default Creator;
