import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoLogoInstagram } from "react-icons/io5";

function Feed() {
	const authUrl = `https://api.instagram.com/oauth/authorize
?client_id=659292209330572
&redirect_uri=https://localhost:3000/feed/
&scope=user_profile,user_media
&response_type=code`;

	const tokenUrl = `https://api.instagram.com/oauth/access_token`;
	const router = useRouter();

	useEffect(() => {
		console.log(router.query);
		if (router.query.code) {
			const formData = new FormData();
			formData.append("client_id", "659292209330572");
			formData.append(
				"client_secret",
				"c39980f561ce1945efab8a7aab6be38a"
			);
			formData.append("redirect_uri", "https://localhost:3000/feed/");
			formData.append("grant_type", "authorization_code");
			formData.append("code", router.query.code.toString());

			fetch(tokenUrl, {
				body: formData,
				method: "POST",
			}).then((res) => console.log(res.json()));
		}
	}, []);

	return (
		<div className="flex justify-center">
			{/* {router.query && JSON.stringify(router.query)} */}
			{/* <InstagramEmbed
				url="https://www.instagram.com/p/CnXiKgcuiCG/?hl=en"
				width={328}
			/> */}
			<button
				onClick={() => window.open(authUrl)}
				type="button"
				className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2"
			>
				<IoLogoInstagram className="text-lg mr-1" />
				Sign in with Instagram
			</button>
		</div>
	);
}

export default Feed;
