export const getRandomPosition = (componentWidth, componentHeight) => {
	// Use regular viewport dimensions to avoid keyboard-triggered repositioning
	const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
	const windowHeight =
		typeof window !== 'undefined' ? window.innerHeight : 800

	// Default to 50vw (50% of viewport width) if not specified
	const width = componentWidth || windowWidth * 0.5
	const height = componentHeight || 400 // Default to 400px height if not specified

	// Calculate max bounds to keep component fully on screen
	// Add more padding for mobile devices
	const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
	const padding = isMobile ? 40 : 20

	// Ensure we don't exceed viewport bounds
	const maxX = Math.max(0, windowWidth - width - padding)
	const maxY = Math.max(0, windowHeight - height - padding)

	// Generate random coordinates within bounds
	const randomX = Math.floor(Math.random() * maxX) + padding
	const randomY = Math.floor(Math.random() * maxY) + padding

	// Additional safety check for mobile
	if (isMobile) {
		// Ensure the component is fully visible on mobile
		const finalX = Math.min(randomX, windowWidth - width - 10)
		const finalY = Math.min(randomY, windowHeight - height - 10)
		return { x: Math.max(10, finalX), y: Math.max(10, finalY) }
	}

	return { x: randomX, y: randomY }
}
