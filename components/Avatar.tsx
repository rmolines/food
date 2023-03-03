import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { v4 } from "uuid";
import { Database, Profiles } from "../types/supabase";

export default function Avatar({
	url,
	size,
	onUpload,
	uploadable,
}: {
	url: Profiles["avatar_url"] | undefined;
	size: number;
	onUpload: (url: string) => void;
	uploadable: boolean;
}) {
	const supabase = useSupabaseClient<Database>();
	const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(url);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		if (url) {
			downloadImage(url);
		}
	}, [url]);

	async function downloadImage(path: string) {
		try {
			const { data, error } = await supabase.storage
				.from("avatars")
				.download(path);
			if (error) {
				throw error;
			}
			const url = URL.createObjectURL(data);
			setAvatarUrl(url);
		} catch (error) {
			console.log("Error downloading image: ", error);
		}
	}

	const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
		event
	) => {
		try {
			setUploading(true);

			if (!event.target.files || event.target.files.length === 0) {
				throw new Error("You must select an image to upload.");
			}

			const file = event.target.files[0];
			const fileExt = file.name.split(".").pop();
			const fileName = `${v4()}.${fileExt}`;
			const filePath = `${fileName}`;

			let { error: uploadError } = await supabase.storage
				.from("avatars")
				.upload(filePath, file, { upsert: true });

			if (uploadError) {
				throw uploadError;
			}

			onUpload(filePath);
		} catch (error) {
			alert("Error uploading avatar!");
			console.log(error);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="flex flex-col gap-y-4">
			{avatarUrl ? (
				<div className="h-fit w-fit rounded-full border">
					<Image
						src={avatarUrl}
						alt="Avatar"
						className="m-1 rounded-full"
						width={size}
						height={size}
					/>
				</div>
			) : (
				<div
					className="rounded-full border-1 border-gray-400 bg-white"
					style={{ height: size, width: size }}
				/>
			)}
			{uploadable && (
				<div>
					<label
						className="mr-2 cursor-pointer rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
						htmlFor="single"
					>
						{uploading ? "Carregando..." : "Trocar Foto de Perfil"}
					</label>
					<input
						style={{
							visibility: "hidden",
							position: "absolute",
						}}
						type="file"
						id="single"
						accept="image/*"
						onChange={uploadAvatar}
						disabled={uploading}
					/>
				</div>
			)}
		</div>
	);
}
