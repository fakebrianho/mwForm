import { useState, useEffect } from 'react'

export function useWindowWidth() {
	// Default to a reasonable value to prevent hydration issues
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== 'undefined' ? window.innerWidth : 0
	)

	useEffect(() => {
		// Skip if not in browser environment
		if (typeof window === 'undefined') return

		// Handler to call on window resize
		function handleResize() {
			setWindowWidth(window.innerWidth)
		}

		// Add event listener
		window.addEventListener('resize', handleResize)

		// Call handler right away so state gets updated with initial window size
		handleResize()

		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleResize)
	}, []) // Empty array ensures effect is only run on mount and unmount

	return windowWidth
}
