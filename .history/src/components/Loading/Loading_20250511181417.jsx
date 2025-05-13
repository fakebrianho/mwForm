import React from 'react'
import localFont from 'next/font/local'
import styles from './Loading.module.css'

export const byteBounce = localFont({
	src: '../../../public/ByteBounce.ttf',
	display: 'swap',
	variable: '--font-byte',
})

function Loading() {
	return (
		<div className={styles.container}>
			<div className={byteBounce.className}>
				<h1>Loading...</h1>
			</div>
		</div>
	)
}

export default Loading
