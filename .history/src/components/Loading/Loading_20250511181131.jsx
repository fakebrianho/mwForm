import React from 'react'
import localFont from 'next/font/local'

export const byteBounce = localFont({
	src: '../../../public/ByteBounce.ttf',
	display: 'swap',
	variable: '--font-byte',
})

function Loading() {
	return <div className={byteBounce.className}>Loading</div>
}

export default Loading
