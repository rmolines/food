import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
	avatar_url: string | undefined;
	full_name: string | undefined;
	username: string | undefined;
	user_id: string | undefined;
	isLoggedInProfile: boolean;
};

export function ProfileHeaderAlt({
	avatar_url,
	full_name,
	username,
	isLoggedInProfile,
}: Props) {
	return (
		<div className="flex grid-cols-2 items-center justify-center gap-x-4 bg-white dark:border-gray-700 dark:bg-gray-800 sm:grid md:gap-x-8">
			<div className="flex sm:w-full sm:justify-end">
				<Avatar
					url={avatar_url}
					size={75}
					uploadable={false}
					onUpload={() => {}}
				/>
			</div>
			<div className="flex flex-col">
				<div className="text-2xl font-medium">{full_name}</div>
				<div className="relative flex items-center gap-x-1">
					{"@"}
					{username}
				</div>
				{isLoggedInProfile && (
					<div className="mt-4 flex gap-x-2">
						<Link
							href={"/account/"}
							className="w-fit cursor-pointer rounded-lg border px-2 py-0.5 text-sm hover:bg-gray-100"
						>
							Editar perfil
						</Link>
						{/* <button
							onClick={() => supabase.auth.signOut()}
							className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-0.5 text-center h-fit dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
						>
							Sair
						</button> */}
					</div>
				)}
			</div>
		</div>
	);
}
