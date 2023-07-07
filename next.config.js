/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'flagcdn.com',
			'upload.wikimedia.org',
			'static.wikia.nocookie.net',
			'media1.giphy.com',
			'media0.giphy.com',
			'media2.giphy.com',
			'media3.giphy.com',
			'media4.giphy.com',
		],
	},
}

module.exports = nextConfig
