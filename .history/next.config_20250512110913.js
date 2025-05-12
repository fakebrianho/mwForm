/** @type {import('next').NextConfig} */
const nextConfig = {
	// Allow larger memory allocation for WebGL if needed
	experimental: {
		largePageDataBytes: 128 * 1000 * 1000, // 128MB
	},

	// Handle the cross-origin warning
	allowedDevOrigins: [
		'http://172.16.0.13', // The origin from your warning
		'http://localhost', // Common local development origins
		// Add any other IP addresses or domains you use for development
	],

	// Additional performance optimizations
	webpack: (config) => {
		// Optimize large 3D model files
		config.module.rules.push({
			test: /\.(glb|gltf)$/,
			type: 'asset/resource',
		})

		return config
	},
}

module.exports = nextConfig
