import { IoLogoInstagram } from "react-icons/io5";
import Avatar from "./Avatar";

export function ProfileHeader({ avatar_url, full_name, instagram, user_id }) {
	return (
		<div className="grid grid-cols-5">
			<div className="xl:col-span-3 col-span-5 xl:col-start-2 grid grid-cols-3 w-full py-8 bg-white dark:border-gray-700 dark:bg-gray-800">
				<div className="mx-auto">
					<Avatar uid={user_id} url={avatar_url} size={150} />
				</div>
				<div className="flex flex-col justify-center col-span-2 gap-y-1 h-full pl-4">
					<div className="text-3xl">{full_name}</div>
					<div className="flex items-center gap-x-1 text-sm">
						<IoLogoInstagram />
						{instagram}
					</div>
				</div>
			</div>
		</div>
	);
}
