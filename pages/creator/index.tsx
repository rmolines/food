import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import { BsInstagram } from "react-icons/bs";
import Card from "../../components/Card";
import CreateModal from "../../components/CreateModal";

function Creator() {
	const supabase = useSupabaseClient();
	const user = useUser();
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState(null);
	const [instagram, setInstagram] = useState(null);
	const [full_name, setFullName] = useState(null);
	const [avatar_url, setAvatarUrl] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

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
		<div>
			<div className="grid grid-cols-3 p-8 gap-x-8 border-b-1 items-center">
				<div className="col-span-1 mx-auto">
					<Avatar uid={user.id} url={avatar_url} size={150} />
				</div>
				<div className="flex flex-col col-span-2 gap-y-4 h-full">
					<div className="text-3xl">{full_name}</div>
					<div className="flex items-center gap-x-1">
						<BsInstagram />
						{instagram}
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3 justify-center justify-items-center">
				<Card />
				<Card />
				<Card />
			</div>
			<CreateModal />
			{/* <div
				className="w-full max-w-3xl m-4 cursor-pointer"
				onClick={() => setModalOpen(true)}
			>
				Nova Review
			</div>
			{modalOpen && (
				<div className="absolute h-full w-full bg-gray-500/40 z-50 flex items-center justify-center">
					<div className="w-full bg-gray-400 rounded max-w-2xl"></div>
				</div>
			)} */}
		</div>
	);
	// return <Account session={session} />;
}

export default Creator;
