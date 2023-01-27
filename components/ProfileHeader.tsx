import { IoLogoInstagram } from "react-icons/io5";
import Avatar from "./Avatar";

export function ProfileHeader({ avatar_url, full_name, instagram, user_id }) {
	console.log(user_id);
	return (
		<div className="border-b w-full flex items-center justify-center">
			{/* <div className="relative h-64 w-full">
				<Image
					src="/restaurant.jpg"
					alt="restaurant"
					fill
					className="object-cover"
				/>
			</div> */}
			<div className="flex flex-col p-10 gap-x-8 mb-8 items-center bg-white rounded-lg md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
				<div className="">
					<Avatar uid={user_id} url={avatar_url} size={125} />
				</div>
				<div className="flex flex-col col-span-2 gap-y-1 h-full">
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
