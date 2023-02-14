// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const FormData = require("form-data");

type Data = {
	access_token: string;
	user_id: number;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const fetchAccessToken = () =>
		new Promise((resolve) => {
			let myHeaders = new Headers();
			myHeaders.append(
				"Cookie",
				"csrftoken=T0QvuOz8qXZP6NbM2Cg9nT3ArcukkeAw; ig_did=E531B7AF-A1C0-4994-871A-7F879A8AFCF6; ig_nrcb=1; mid=Y-RShwAEAAGFJ_vX4k5ehUlAAEal"
			);

			let url =
				process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
				process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
				"https://localhost:3000/";

			let formdata = new FormData();
			formdata.append("client_id", "659292209330572");
			formdata.append("redirect_uri", `${url}feed/`);
			formdata.append("grant_type", "authorization_code");
			formdata.append("code", req.query.code);
			formdata.append(
				"client_secret",
				"c39980f561ce1945efab8a7aab6be38a"
			);

			fetch("https://api.instagram.com/oauth/access_token", {
				method: "POST",
				headers: myHeaders,
				body: formdata,
				redirect: "follow",
			})
				.then((response) => response.json())
				.then((data) => {
					fetch(
						`https://graph.instagram.com/access_token?access_token=${data.access_token}&grant_type=ig_exchange_token&client_secret=c39980f561ce1945efab8a7aab6be38a`,
						{
							headers: myHeaders,
							redirect: "follow",
						}
					)
						.then((res) => {
							console.log(res.url);
							return res.json();
						})
						.then((data) => {
							console.log("data2", data);
							resolve(data);
						})
						.catch((e) => console.log("error2", e));
				})
				// .then((result) => {
				// 	resolve(result);
				// })
				.catch((error) => console.log("error", error));
		});

	const data = await fetchAccessToken();

	res.status(200).json(data);

	// res.status(200).json({
	// 	access_token:
	// 		"IGQVJVRjRLdi1fOE9GUXhvMlZA0ZAXIzQVExSW52dEIyZAkxPbFh0bEF5MkVCYmtPOUQ3TFlKZAUtmbXU4QkdONFFDZAjNJNm1VSnBObjJCX1p1S0ZA3cDQ5QXdUVnRFdjE0elptd0NM…",
	// 	user_id: 17841400861333112,
	// });
}
