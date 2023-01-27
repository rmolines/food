import { ProfileHeader } from "./../../components/ProfileHeader";
import { ReviewGrid } from "./../../components/ReviewGrid";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

function Creator() {
	const supabase = useSupabaseClient();
	const user = useUser();
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState(null);
	const [instagram, setInstagram] = useState(null);
	const [full_name, setFullName] = useState(null);
	const [avatar_url, setAvatarUrl] = useState(null);

	async function getProfile() {
		try {
			setLoading(true);

			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username, instagram, avatar_url, full_name`)
				.eq("id", user.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
				setInstagram(data.instagram);
				setAvatarUrl(data.avatar_url);
				setFullName(data.full_name);
			}
		} catch (error) {
			console.log(error);
			alert("Error loading user data!");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (user) {
			getProfile();
		}
	}, [user]);

	if (loading) return;

	return (
		<div className="flex flex-col grow">
			<ProfileHeader
				user_id={user.id}
				avatar_url={avatar_url}
				full_name={full_name}
				instagram={instagram}
			/>
			<ReviewGrid />
		</div>
	);
	// return <Account session={session} />;
}

export default Creator;
