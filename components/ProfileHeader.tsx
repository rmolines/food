import { IoLogoInstagram } from "react-icons/io5";
import Avatar from "./Avatar";

export function ProfileHeader({ avatar_url, full_name, instagram, user_id }) {
	console.log(user_id);
	return (
		<div className="flex flex-col mt-16 mr-6 items-center rounded-lg dark:border-gray-700 dark:bg-gray-800">
			<Avatar uid={user_id} url={avatar_url} size={100} />
			<div className="text-xl">{full_name}</div>
			<div className="flex items-center gap-x-1 text-xs">
				<IoLogoInstagram />
				{instagram}
			</div>
		</div>
	);
}
