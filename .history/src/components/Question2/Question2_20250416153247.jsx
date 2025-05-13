'use client'
import '98.css'
import React, { useState, useEffect } from 'react'
import { getRandomPosition } from '@/app/utils/getRandomPosition'
function Question2() {
	const [position, setPosition] = useState(null) // Initialize position as null
	const [isDragging, setIsDragging] = useState(false)
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
	return (
		<div
			style={{
				width: 500,
				paddingBottom: 10,
				position: 'absolute',
				left: `${position.x}px`,
				top: `${position.y}px`,
				cursor: isDragging ? 'grabbing' : 'grab',
				zIndex: 1000,
			}}
			className='window'
			onMouseDown={handleMouseDown}
		>
			<div className='title-bar'>
				<div className='title-bar-text'>Question 1: </div>
				<div className='title-bar-controls'>
					<button aria-label='Minimize' />
					<button aria-label='Maximize' />
					<button aria-label='Close' onClick={handleClose} />
				</div>
			</div>

			<div className='window-body'>
				<div class='field-row'>
					<label for='text17'>Occupation</label>
					<input id='text17' type='text' />
				</div>
				<div
					className='field-row'
					style={{ justifyContent: 'center' }}
				></div>
			</div>
		</div>
	)
}

export default Question2
