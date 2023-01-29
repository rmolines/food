import { IoLogoInstagram } from "react-icons/io5";
import Avatar from "./Avatar";

export function ProfileHeaderAlt({
	avatar_url,
	full_name,
	instagram,
	user_id,
}) {
	console.log(user_id);
	return (
		<div className="flex flex-col items-center gap-y-2 py-8 bg-white dark:border-gray-700 dark:bg-gray-800">
			<div className="mx-auto">
				<Avatar uid={user_id} url={avatar_url} size={150} />
			</div>
			<div className="text-3xl">{full_name}</div>
			<div className="flex items-center gap-x-1 relative">
				<div className="absolute -left-5">
					<IoLogoInstagram />
				</div>
				{instagram}
			</div>
		</div>
	);
}
