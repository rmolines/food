import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { IoLogoInstagram } from "react-icons/io5";
import Avatar from "./Avatar";

export function ProfileHeaderAlt({
	avatar_url,
	full_name,
	instagram,
	user_id,
}) {
	const supabase = useSupabaseClient();
	const session = useSession();

	return (
		<div className="flex justify-center gap-x-4 bg-white dark:border-gray-700 dark:bg-gray-800">
			<div className="">
				<Avatar uid={user_id} url={avatar_url} size={100} />
			</div>
			<div className="flex flex-col">
				<div className="text-2xl font-medium tracking-wide">
					{full_name}
				</div>
				{/* <div className="flex items-center gap-x-1 relative">
				<div className="absolute -left-5">
					<IoLogoInstagram />
				</div>
				{instagram}
			</div> */}
				<div className="flex items-center gap-x-1 relative">
					<IoLogoInstagram />
					{instagram}
				</div>
				{session && (
					<div className="flex gap-x-2 mt-4">
						<Link
							href={"/creator/account/"}
							className="text-sm border rounded-lg w-fit px-2 py-0.5 cursor-pointer hover:bg-gray-100"
						>
							Editar perfil
						</Link>
						<button
							onClick={() => supabase.auth.signOut()}
							className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-0.5 text-center h-fit dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
						>
							Sair
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
