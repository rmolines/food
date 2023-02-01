import { useState, useEffect } from "react";
import {
	useUser,
	useSupabaseClient,
	useSession,
} from "@supabase/auth-helpers-react";
import Avatar from "../../components/Avatar";
import { useRouter } from "next/router";
import ProfileModal from "../../components/ProfileModal";

export default function Account() {
	const supabase = useSupabaseClient();
	const session = useSession();
	const user = useUser();
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState(null);
	const [instagram, setInstagram] = useState(null);
	const [full_name, setFullName] = useState(null);
	const [avatar_url, setAvatarUrl] = useState(null);

	useEffect(() => {
		if (user) {
			getProfile();
		}
	}, [user]);

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

	async function updateProfile({
		username,
		instagram,
		avatar_url,
		full_name,
	}) {
		try {
			setLoading(true);

			const updates = {
				id: user.id,
				username,
				instagram,
				avatar_url,
				full_name,
				updated_at: new Date().toISOString(),
			};

			console.log(updates);

			let { error } = await supabase.from("profiles").upsert(updates);
			if (error) throw error;
			alert("Profile updated!");
		} catch (error) {
			console.log(error);
			alert("Error updating the data!");
		} finally {
			setLoading(false);
		}
	}

	if (loading) return;

	return (
		<>
			<ProfileModal
				prev_username={username}
				prev_instagram={instagram}
				prev_full_name={full_name}
				avatar_url={avatar_url}
				onUpload={(url) => {
					setAvatarUrl(url);
					updateProfile({
						username,
						instagram,
						full_name,
						avatar_url: url,
					});
				}}
				update_profile={updateProfile}
			/>
		</>
	);

	return (
		<div className="bg-gray-100 p-8 rounded gap-y-4 flex flex-col">
			<Avatar
				uid={user.id}
				url={avatar_url}
				size={150}
				onUpload={(url) => {
					setAvatarUrl(url);
					updateProfile({ username, website, avatar_url: url });
				}}
				uploadable
			/>
			<div className="flex gap-4 justify-between">
				<label className="font-medium" htmlFor="email">
					Email
				</label>
				<input
					className="px-2 rounded border-1 border-gray-400 disabled:text-gray-600"
					id="email"
					type="text"
					value={session.user.email}
					disabled
				/>
			</div>
			<div className="flex gap-4 justify-between">
				<label className="font-medium" htmlFor="username">
					Name
				</label>
				<input
					className="px-2 bg-white rounded border-1 border-gray-400"
					id="fullName"
					type="text"
					value={full_name || ""}
					onChange={(e) => setFullName(e.target.value)}
				/>
			</div>
			{/* <div className="flex gap-4 justify-between">
				<label className="font-medium" htmlFor="username">
					Username
				</label>
				<input
					className="px-2 bg-white rounded border-1 border-gray-400"
					id="username"
					type="text"
					value={username || ""}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div> */}
			<div className="flex gap-4 justify-between">
				<label className="font-medium" htmlFor="website">
					Instagram
				</label>
				<input
					className="px-2 bg-white rounded border-1 border-gray-400"
					id="website"
					type="website"
					value={instagram || ""}
					onChange={(e) => setInstagram(e.target.value)}
				/>
			</div>

			<div className="flex gap-4 justify-between">
				<button
					className="bg-gray-700 text-gray-50 p-2 inline-block rounded"
					onClick={() =>
						updateProfile({
							username,
							instagram,
							avatar_url,
							full_name,
						})
					}
					disabled={loading}
				>
					{loading ? "Loading ..." : "Update"}
				</button>
			</div>

			<div className="flex gap-4 justify-between">
				<button
					className="bg-gray-700 text-gray-50 p-2 inline-block rounded"
					onClick={() => {
						supabase.auth.signOut();
						router.push("/creator/login");
					}}
				>
					Sign Out
				</button>
			</div>
		</div>
	);
}
