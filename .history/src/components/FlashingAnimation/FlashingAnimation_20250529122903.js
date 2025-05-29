'use client'
import { useState, useEffect } from 'react'
import styles from './FlashingAnimation.module.css'

const FlashingAnimation = () => {
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		const interval = setInterval(() => {
			setIsVisible((prev) => !prev)
		}, 1000) // Flash every 300ms - adjust as needed

		return () => clearInterval(interval)
	}, [])

	return (
		<div className={styles.flashContainer}>
			<img
				src='/flash.png'
				alt='Flash'
				className={`${styles.flashImage} ${
					isVisible ? styles.visible : styles.hidden
				}`}
			/>
		</div>
	)
}

export default FlashingAnimation
