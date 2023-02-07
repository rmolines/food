import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProfileHeaderAlt } from "../../components/ProfileHeaderAlt";
import { ReviewGridAlt } from "../../components/ReviewGridAlt";

function Creator() {
	const supabase = useSupabaseClient();
	const user = useUser();
	const [loading, setLoading] = useState(true);
	const [instagram, setInstagram] = useState(null);
	const [full_name, setFullName] = useState(null);
	const [avatar_url, setAvatarUrl] = useState(null);
	const [userId, setUserId] = useState(null);
	const [loggedInUsername, setLoggedInUsername] = useState<string>();

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

	useEffect(() => {
		if (username) {
			getProfileFromUsername(username.toString());
		}
		if (user) {
			getLoggedInUsername();
		}
	}, [username]);

	if (loading) return;

	console.log(username, loggedInUsername);

	return (
		<div className="flex flex-col grow gap-y-4">
			<div className="mt-4">
				<ProfileHeaderAlt
					user_id={userId}
					avatar_url={avatar_url}
					full_name={full_name}
					instagram={instagram}
					isLoggedInProfile={username === loggedInUsername}
				/>
			</div>
			{username && <ReviewGridAlt username={username.toString()} />}
		</div>
	);
	// return <Account session={session} />;
}

export default Creator;
