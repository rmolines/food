import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProfileHeaderAlt } from "../../components/ProfileHeaderAlt";
import { ReviewGridAlt } from "../../components/ReviewGridAlt";
import PasswordModal from "../../components/PasswordModal";

function Creator() {
	const supabase = useSupabaseClient();
	const user = useUser();
	const [loading, setLoading] = useState(true);
	const [full_name, setFullName] = useState<string>();
	const [avatar_url, setAvatarUrl] = useState<string>();
	const [userId, setUserId] = useState<string>();
	const [loggedInUsername, setLoggedInUsername] = useState<string>();
	const [showPasswordReset, setShowPasswordReset] = useState(false);

	const router = useRouter();
	const username = router.query.creator;

	async function getProfileFromUsername(username: string) {
		try {
			setLoading(true);

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
	}, [username, user]);

	// useEffect(() => {
	// 	console.log("oioi");
	// 	supabase.auth.onAuthStateChange(async (event, session) => {
	// 		console.log(event, session);
	// 		if (event == "PASSWORD_RECOVERY") {
	// 			console.log("PASSWORD_RECOVERY", session);
	// 			setShowPasswordReset(true);
	// 		}
	// 	});
	// }, [supabase]);

	if (loading) return;

	return (
		<div className="flex flex-col grow gap-y-12">
			<div className="mt-4">
				<ProfileHeaderAlt
					user_id={userId}
					avatar_url={avatar_url}
					full_name={full_name}
					username={username}
					isLoggedInProfile={username === loggedInUsername}
				/>
			</div>
			<PasswordModal showModal={showPasswordReset} />
			{username && (
				<ReviewGridAlt
					username={username.toString()}
					isLoggedInProfile={username === loggedInUsername}
				/>
			)}
		</div>
	);
	// return <Account session={session} />;
}

export default Creator;
