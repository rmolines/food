import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { getCookie, setCookie } from "cookies-next";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import CreateReviewModal from "../components/CreateReviewModal";
import { RxCross1 } from "react-icons/rx";
import { BsCheck } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

function Feed() {
	const [media, setMedia] = useState([]);
	const [chosenMedia, setChosenMedia] = useState([]);
	const [chosenMedia2, setChosenMedia2] = useState([]);
	const [count, setCount] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [username, setUsername] = useState<string>();
	const supabase = useSupabaseClient();
	const user = useUser();
	const router = useRouter();

	let url =
		process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
		process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
		"https://localhost:3000/";

	const authUrl = `https://api.instagram.com/oauth/authorize
					?client_id=659292209330572
					&redirect_uri=${url}feed/
					&scope=instagram_graph_user_profile,instagram_graph_user_media,user_profile,user_media
					&response_type=code`;

	useEffect(() => {
		fetch("/api/instagramMedia/" + getCookie("instagramToken")).then(
			(res) => {
				if (res.ok) {
					res.json().then((data) => setMedia(data.data));
				}
			}
		);
	}, []);

	useEffect(() => {
		if (router.query.code && username) {
			fetch("/api/instagramToken/" + router.query.code)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setCookie("instagramToken", data.access_token, {
						sameSite: true,
						httpOnly: true,
						maxAge: data.expires_in,
						// path: "/" + username,
					});
					fetch("/api/instagramMedia/" + data.access_token).then(
						(res) => {
							if (res.ok)
								res.json().then((data) => setMedia(data.data));
							else res.text().then((data) => console.log(data));
						}
					);
				})
				.catch((e) => console.log("t", e));
		}
	}, [router.query.code, username]);

	useEffect(() => {
		if (user) {
			getProfile();
		}
	}, [user]);

	async function getProfile() {
		try {
			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username`)
				.eq("id", user?.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
			}
		} catch (error) {
			console.log(error);
			alert("Error loading user data!");
		} finally {
		}
	}

	async function logURL(url: string) {
		try {
			const data = {
				log: url,
			};

			let { error } = await supabase.from("logs").insert(data);
			if (error) throw error;
		} catch (error) {
			console.log(error);
			alert("Error logging!");
		}
	}

	useEffect(() => {
		logURL(authUrl);
	}, [authUrl]);

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="mb-2 flex w-full max-w-xl items-center justify-between">
				<Link href={"/" + username}>
					<RxCross1 className="text-2xl" />
				</Link>
				{media.length == 0 ? (
					<a
						href={authUrl}
						// target={"_blank"}
						// onClick={() => window.open(authUrl)}
						// type="button"
						className="mr-2 inline-flex items-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500"
						rel="noreferrer"
					>
						<IoLogoInstagram className="mr-1 text-lg" />
						Sign in with Instagram
					</a>
				) : (
					<button
						onClick={() => {
							setChosenMedia2(chosenMedia);
							setTotalCount(chosenMedia.length);
						}}
						type="button"
						className="mr-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500"
					>
						Importar posts
					</button>
				)}
			</div>
			{chosenMedia2.length > 0 && (
				<CreateReviewModal
					key={chosenMedia2[0].id}
					image_urls={[
						chosenMedia2[0].media_type === "VIDEO"
							? chosenMedia2[0].thumbnail_url
							: chosenMedia2[0].media_url,
					]}
					review_text={chosenMedia2[0].caption}
					next_review={() => {
						setCount((prev) => prev + 1);
						setChosenMedia2((prev) => {
							return prev.slice(1);
						});
					}}
					cancel={() => setChosenMedia2([])}
					total_count={totalCount}
					current_count={count}
					username={username}
					instagram_url={chosenMedia2[0].permalink}
				/>
			)}
			<div className="grid h-full min-h-fit w-full max-w-xl grid-cols-3 items-center gap-2">
				{media &&
					media.map((e) => (
						<button
							key={e.id}
							className="group relative aspect-square h-fit overflow-hidden"
							onClick={() =>
								setChosenMedia((prev) => {
									if (prev.find((p) => p.id === e.id)) {
										return prev.filter(
											(v) => v.id !== e.id
										);
									} else {
										return [...prev, e];
									}
								})
							}
						>
							<Image
								src={
									e.media_type === "VIDEO"
										? e.thumbnail_url
										: e.media_url
								}
								fill
								alt="teste"
								className="object-cover"
							/>
							{chosenMedia.find((v) => v.id === e.id) ? (
								<div className="absolute top-2 right-2 z-40 flex h-6 w-6 items-center justify-center rounded-full border border-gray-700 bg-blue-500/90">
									<BsCheck className="text-2xl text-white" />
								</div>
							) : (
								<>
									<div className="absolute inset-0 z-30 h-full w-full bg-gray-900/70 group-hover:hidden"></div>
									<div className="absolute top-2 right-2 z-40 h-6 w-6 rounded-full border border-gray-700 bg-gray-500/90"></div>
								</>
							)}
						</button>
					))}
			</div>
		</div>
	);
}

export default Feed;
