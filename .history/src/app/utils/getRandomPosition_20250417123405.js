export const getRandomPosition = ({ windowWidth }) => {
	// Use window dimensions if available, fallback for SSR
	const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
	const windowHeight =
		typeof window !== 'undefined' ? window.innerHeight : 800

	// Component dimensions
	const componentWidth = windowWidth
	const componentHeight = 400 // Approximate height, adjust if needed

	// Calculate max bounds to keep component fully on screen
	const maxX = windowWidth - componentWidth
	const maxY = windowHeight - componentHeight

	// Generate random coordinates within bounds
	const randomX = Math.floor(Math.random() * maxX)
	const randomY = Math.floor(Math.random() * maxY)

	return { x: randomX, y: randomY }
}
