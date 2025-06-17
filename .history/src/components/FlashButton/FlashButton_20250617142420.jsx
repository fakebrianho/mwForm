'use client'
import styles from './FlashButton.module.css'

const FlashButton = ({ onClick, children, className }) => {
	return (
		<button
			className={`${styles.flashButton} ${className || ''}`}
			onClick={onClick}
		>
			<div className={styles.buttonContent}>
				<img
					src='/flash.png'
					alt='Flash'
					className={styles.flashImage}
				/>
				{children && (
					<span className={styles.buttonText}>{children}</span>
				)}
			</div>
		</button>
	)
}

export default FlashButton
