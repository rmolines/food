/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./node_modules/flowbite-react/**/*.js",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./node_modules/flowbite/**/*.js",
	],
	theme: {
		extend: {
			darkMode: "class",
			borderWidth: {
				1: "1px",
			},
			colors: {
				// primary: {
				// 	50: "#eff6ff",
				// 	100: "#dbeafe",
				// 	200: "#bfdbfe",
				// 	300: "#93c5fd",
				// 	400: "#60a5fa",
				// 	500: "#3b82f6",
				// 	600: "#2563eb",
				// 	700: "#1d4ed8",
				// 	800: "#1e40af",
				// 	900: "#1e3a8a",
				// },
				primary: {
					50: "#eff6ff",
					100: "#dbeafe",
					200: "#F9DDD7",
					300: "#F6CBC3",
					400: "#EC8F7D",
					500: "#EC8F7D",
					600: "#E7755F",
					700: "#E15337",
					800: "#B4422C",
					900: "#38150E",
				},
				yellow2: {
					50: "#eff6ff",
					100: "#dbeafe",
					200: "#F9DDD7",
					300: "#F6CBC3",
					400: "#EC8F7D",
					500: "#EC8F7D",
					600: "#E7755F",
					700: "#FFF80A",
					800: "#B4422C",
					900: "#38150E",
				},
			},
			lineClamp: {
				7: "7",
				8: "8",
				9: "9",
				10: "10",
			},
		},
	},
	plugins: [
		require("flowbite/plugin"),
		require("@tailwindcss/line-clamp"),
		// require("daisyui"),
		require("tw-elements/dist/plugin"),
	],
};
