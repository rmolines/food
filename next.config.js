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
				hostname: "**.cdninstagram.com",
				pathname: "/**",
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
