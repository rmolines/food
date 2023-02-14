// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	access_token: string;
	user_id: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const fetchMedia = () =>
		new Promise((resolve) => {
			const fields = `id,caption,media_url,permalink,media_type,thumbnail_url`;
			const mediaUrl = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${req.query.token}`;
			// const mediaUrl = `https://graph.instagram.com/6105024962881130?fields=id,username&access_token=${req.query.token}`;

			let myHeaders = new Headers();
			myHeaders.append(
				"Cookie",
				"csrftoken=T0QvuOz8qXZP6NbM2Cg9nT3ArcukkeAw; ig_did=E531B7AF-A1C0-4994-871A-7F879A8AFCF6; ig_nrcb=1; mid=Y-RShwAEAAGFJ_vX4k5ehUlAAEal"
			);

			fetch(mediaUrl, {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			})
				.then((response) => {
					return response.json();
				})
				.then((result) => {
					resolve(result);
				})
				.catch((error) => console.log("error", error));
		});

	const data = await fetchMedia();

	res.status(200).json(data);
}
