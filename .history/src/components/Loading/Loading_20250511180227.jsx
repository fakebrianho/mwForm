import React from 'react'
import { useEffect, useState } from 'react'
import styles from './Loading.module.css'

// Custom font loading logic
const useCustomFont = () => {
	const [fontLoaded, setFontLoaded] = useState(false)

	useEffect(() => {
		// Create a new FontFace object for bytebounce font
		const bytebounceFont = new FontFace(
			'bytebounce',
			'url(/fonts/bytebounce.woff2)'
		)

		// Load the font and add it to the document when ready
		bytebounceFont
			.load()
			.then((font) => {
				document.fonts.add(font)
				setFontLoaded(true)
				console.log('Bytebounce font loaded successfully')
			})
			.catch((error) => {
				console.error('Failed to load bytebounce font:', error)
			})

		return () => {
			// Clean up if needed
		}
	}, [])

	return fontLoaded
}

function Loading() {
	return <div>Loading</div>
}

export default Loading
