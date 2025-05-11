import React from 'react'
import localFont from 'next/font/local'

export const byteBounce = localFont({
	src: '../../../public/ByteBounce.ttf',
	display: 'swap',
	variable: '--font-byte',
})

function Loading() {
	return (
		<div>
			<div className={byteBounce.className}>Loading</div>
		</div>
	)
}

export default Loading
