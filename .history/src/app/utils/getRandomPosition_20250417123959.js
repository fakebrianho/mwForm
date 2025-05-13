export const getRandomPosition = (componentWidth, componentHeight) => {
	// Use window dimensions if available, fallback for SSR
	const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
	const windowHeight =
		typeof window !== 'undefined' ? window.innerHeight : 800

	// Default to 50vw (50% of viewport width) if not specified
	const width = componentWidth || windowWidth * 0.5
	const height = componentHeight || windowHeight * 0.3 // Default to 30vh if not specified

	// Calculate max bounds to keep component fully on screen
	const maxX = windowWidth - width
	const maxY = windowHeight - height

	// Generate random coordinates within bounds
	const randomX = Math.floor(Math.random() * maxX)
	const randomY = Math.floor(Math.random() * maxY)

	return { x: randomX, y: randomY }
}
