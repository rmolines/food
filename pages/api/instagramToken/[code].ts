// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
var axios = require("axios");
var FormData = require("form-data");

const fetchAccessToken = async (code: string) => {
	let url =
		process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
		process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
		"https://localhost:3000/";

	let formData = new FormData();
	formData.append("client_id", "659292209330572");
	formData.append("redirect_uri", `${url}feed/`);
	formData.append("grant_type", "authorization_code");
	formData.append("code", code);
	formData.append("client_secret", "c39980f561ce1945efab8a7aab6be38a");

	var config = {
		method: "post",
		url: "https://api.instagram.com/oauth/access_token",
		headers: {
			Cookie: "csrftoken=T0QvuOz8qXZP6NbM2Cg9nT3ArcukkeAw; ig_did=E531B7AF-A1C0-4994-871A-7F879A8AFCF6; ig_nrcb=1; mid=Y-RShwAEAAGFJ_vX4k5ehUlAAEal",
			...formData.getHeaders(),
		},
		data: formData,
	};

	const res = await axios(config);

	var config2 = {
		method: "get",
		url: `https://graph.instagram.com/access_token?access_token=${res.data.access_token}&grant_type=ig_exchange_token&client_secret=c39980f561ce1945efab8a7aab6be38a`,
		headers: {
			Cookie: "csrftoken=T0QvuOz8qXZP6NbM2Cg9nT3ArcukkeAw; ig_did=E531B7AF-A1C0-4994-871A-7F879A8AFCF6; ig_nrcb=1; mid=Y-RShwAEAAGFJ_vX4k5ehUlAAEal",
		},
	};

	const res2 = await axios(config2);

	return res2.data;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	fetchAccessToken(req.query.code)
		.then((data) => {
			console.log(data);
			res.status(200).json(data);
		})
		.catch((e) => {
			console.log(e);
			res.status(500).json({ error: e });
		});

	// res.status(200).json({
	// 	access_token:
	// 		"IGQVJVRjRLdi1fOE9GUXhvMlZA0ZAXIzQVExSW52dEIyZAkxPbFh0bEF5MkVCYmtPOUQ3TFlKZAUtmbXU4QkdONFFDZAjNJNm1VSnBObjJCX1p1S0ZA3cDQ5QXdUVnRFdjE0elptd0NM…",
	// 	user_id: 17841400861333112,
	// });
}
