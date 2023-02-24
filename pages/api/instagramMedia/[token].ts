// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
var axios = require("axios");

type userMediaResponse = {
	data: {
		id: string;
		caption: string;
		media_type: string;
		media_url: string;
		permalin: string;
		thumbnail_url: string;
	}[];
	paging: {
		cursors: {
			after: string;
			before: string;
		};
		next: string;
	};
};

const fetchMedia = async (token: string) => {
	const fields = `id,caption,media_url,permalink,media_type,thumbnail_url`;
	const mediaUrl = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}`;

	var config = {
		method: "get",
		url: mediaUrl,
		headers: {
			Cookie: "csrftoken=T0QvuOz8qXZP6NbM2Cg9nT3ArcukkeAw; ig_did=E531B7AF-A1C0-4994-871A-7F879A8AFCF6; ig_nrcb=1; mid=Y-RShwAEAAGFJ_vX4k5ehUlAAEal",
		},
	};

	const response = await axios(config);

	return response.data;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let instagramToken = getCookie("instagramToken", { req, res });

	if (typeof instagramToken === "string") {
		fetchMedia(instagramToken)
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((error) => {
				console.log("erro api", error);
				res.status(500).json({ error });
			});
	} else {
		console.log("deu ruim");
		res.status(500).json({ error: "Access Token not provided" });
	}
}
