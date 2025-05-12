/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your existing config options

	// Add this new property to address the warning
	allowedDevOrigins: [
		'http://172.16.0.13', // The origin from your warning
		'http://localhost', // Common local development origins
		// Add any other IP addresses or domains you use for development
	],
}

module.exports = nextConfig
