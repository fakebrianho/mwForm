export const getRandomPosition = (componentWidth, componentHeight) => {
	// Use window dimensions if available, fallback for SSR
	const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
	const windowHeight =
		typeof window !== 'undefined' ? window.innerHeight : 800

	// Default to 50vw (50% of viewport width) if not specified
	const width = componentWidth || windowWidth * 0.5
	const height = componentHeight || 400 // Default to 400px height if not specified

	// Calculate max bounds to keep component fully on screen
	// Add some padding to ensure it's not right at the edge
	const padding = 20
	const maxX = Math.max(0, windowWidth - width - padding)
	const maxY = Math.max(0, windowHeight - height - padding)

	// Generate random coordinates within bounds
	const randomX = Math.floor(Math.random() * maxX) + padding
	const randomY = Math.floor(Math.random() * maxY) + padding

	return { x: randomX, y: randomY }
}
