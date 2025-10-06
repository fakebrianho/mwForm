import React, { useEffect, useState } from 'react'
import localFont from 'next/font/local'
import styles from './Loading.module.css'
import { Html } from '@react-three/drei'

export const byteBounce = localFont({
	src: '../../../public/ByteBounce.ttf',
	display: 'swap',
	variable: '--font-byte',
})

function Loading({ audioProgress = 0, isAudioLoading = true, error = null }) {
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

	const getSubtitle = () => {
		if (error) {
			return `Error: ${error}`
		}
		if (isAudioLoading) {
			return `Loading audio files... ${Math.round(audioProgress)}%`
		}
		return 'Preparing 3D environment...'
	}

	return (
		<Html
			as='div'
			wrapperClass={styles.container}
			center
			prepend
			position={[0, 0, 0]}
		>
			<div className={byteBounce.className}>
				<h1>{loadingText}</h1>
				<p className={styles.subtitle}>{getSubtitle()}</p>
				{isAudioLoading && (
					<div className={styles.progressBar}>
						<div
							className={styles.progressFill}
							style={{ width: `${audioProgress}%` }}
						></div>
					</div>
				)}
			</div>
		</Html>
	)
}

export default Loading
