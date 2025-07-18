import React, { useEffect, useState } from 'react'
import localFont from 'next/font/local'
import styles from './Loading.module.css'
import { Html } from '@react-three/drei'

export const byteBounce = localFont({
	src: '../../../public/ByteBounce.ttf',
	display: 'swap',
	variable: '--font-byte',
})

function Loading() {
	const [loadingText, setLoadingText] = useState('Loading')

	// Add dots animation to loading text
	useEffect(() => {
		const interval = setInterval(() => {
			setLoadingText((prev) => {
				if (prev === 'Loading...') return 'Loading'
				return prev + '.'
			})
		}, 500)

		return () => clearInterval(interval)
	}, [])

	return (
		<Html
			as='div'
			wrapperClass={styles.container}
			center={true}
			// fullscreen={true}
		>
			<div className={byteBounce.className}>
				<h1>{loadingText}</h1>
				<p className={styles.subtitle}>Preparing 3D environment...</p>
			</div>
		</Html>
	)
}

export default Loading
