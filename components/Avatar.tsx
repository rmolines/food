import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../utils/database.types";
import Image from "next/image";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Avatar({
	uid,
	url,
	size,
	onUpload,
	uploadable,
}: {
	uid: string;
	url: Profiles["avatar_url"];
	size: number;
	onUpload: (url: string) => void;
	uploadable: boolean;
}) {
	const supabase = useSupabaseClient<Database>();
	const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		if (url) downloadImage(url);
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
			const fileName = `${uid}.${fileExt}`;
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
		<div className="flex gap-y-2 flex-col">
			{avatarUrl ? (
				<Image
					src={avatarUrl}
					alt="Avatar"
					className="rounded-full"
					width={size}
					height={size}
				/>
			) : (
				<div
					className="bg-white border-1 border-gray-400 rounded-full"
					style={{ height: size, width: size }}
				/>
			)}
			{uploadable && (
				<div style={{ width: size }}>
					<label
						className="bg-gray-800 rounded p-2 text-gray-50 inline-block cursor-pointer"
						htmlFor="single"
					>
						{uploading ? "Uploading ..." : "Upload"}
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
