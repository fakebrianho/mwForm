'use client'
import '98.css'
import styles from './Question1.module.css'
import React, { useState, useEffect } from 'react'

function Question1() {
	// Calculate a random position within the viewport boundaries
	const getRandomPosition = () => {
		// Use window dimensions if available, fallback for SSR
		const windowWidth =
			typeof window !== 'undefined' ? window.innerWidth : 1200
		const windowHeight =
			typeof window !== 'undefined' ? window.innerHeight : 800

		// Component dimensions
		const componentWidth = 500
		const componentHeight = 400 // Approximate height, adjust if needed

		// Calculate max bounds to keep component fully on screen
		const maxX = windowWidth - componentWidth
		const maxY = windowHeight - componentHeight

		// Generate random coordinates within bounds
		const randomX = Math.floor(Math.random() * maxX)
		const randomY = Math.floor(Math.random() * maxY)

		return { x: randomX, y: randomY }
	}

	const [position, setPosition] = useState(null) // Initialize position as null
	const [isDragging, setIsDragging] = useState(false)
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

	// Set initial random position only on the client-side after mount
	useEffect(() => {
		setPosition(getRandomPosition())
	}, []) // Empty dependency array ensures this runs only once after mount

	// Handle mouse down event to start dragging
	const handleMouseDown = (e) => {
		setIsDragging(true)
		setDragOffset({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		})
	}

	// Handle mouse move event while dragging
	const handleMouseMove = (e) => {
		if (isDragging) {
			setPosition({
				x: e.clientX - dragOffset.x,
				y: e.clientY - dragOffset.y,
			})
		}
	}

	// Handle mouse up event to stop dragging
	const handleMouseUp = () => {
		setIsDragging(false)
	}

	// Add and remove event listeners
	useEffect(() => {
		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)
		} else {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [isDragging, dragOffset])

	// Don't render the component until the position is set on the client
	if (!position) {
		return null // Or a loading indicator
	}

	return (
		<div
			style={{
				width: 500,
				height: 150,
				position: 'absolute',
				left: `${position.x}px`,
				top: `${position.y}px`,
				cursor: isDragging ? 'grabbing' : 'grab',
				zIndex: 1000,
			}}
			className={'window'}
			onMouseDown={handleMouseDown}
		>
			<div className='title-bar'>
				<div className='title-bar-text'>
					Guest Spot database submission
				</div>
				<div className='title-bar-controls'>
					<button aria-label='Minimize' />
					<button aria-label='Maximize' />
					<button aria-label='Close' />
				</div>
			</div>

			<div className='window-body'>
				<p style={{ textAlign: 'center' }}>
					This form was made to help tattoo artists connect with shops
					in other cities for guest spots. Accumulating this
					information has potential to be powerful in helping artists
					make money while traveling regionally or abroad. We hope
					this results in more artists feeling comfortable traveling
					and sharing/learning from peers in other cities. This
					information will be used to create a free and open source
					database.{' '}
				</p>
				<div
					className='field-row'
					style={{ justifyContent: 'center' }}
				></div>
			</div>
		</div>
	)
}

export default Question1
