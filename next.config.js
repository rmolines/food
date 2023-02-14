/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ucarecdn.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "scontent.cdninstagram.com",
			},
			{
				protocol: "https",
				hostname: "video.cdninstagram.com",
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
