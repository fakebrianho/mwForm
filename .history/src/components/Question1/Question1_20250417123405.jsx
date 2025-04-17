'use client'
import '98.css'
import React, { useState, useEffect } from 'react'
import { getRandomPosition } from '@/app/utils/getRandomPosition'

function Question1(props) {
	const [position, setPosition] = useState(null) // Initialize position as null
	const [isDragging, setIsDragging] = useState(false)
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
	const [isVisible, setIsVisible] = useState(true) // State for visibility
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== 'undefined' ? window.innerWidth : 1024
	)

	useEffect(() => {
		// Set initial random position
		setPosition(getRandomPosition(windowWidth))

		// Handle window resize
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

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

	// Handle close button click
	const handleClose = (e) => {
		e.stopPropagation() // Prevent triggering the drag handler
		props.setStage(1)
		// setIsVisible(false)
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

	if (!position || !isVisible) {
		return null // Or a loading indicator
	}

	// Calculate width based on screen size
	const containerWidth = windowWidth <= 768 ? '90vw' : 500

	// Also adjust the random position calculation for smaller screens
	useEffect(() => {
		if (windowWidth <= 768 && position) {
			// Make sure the window doesn't go off-screen on smaller devices
			const maxX = windowWidth - windowWidth * 0.9
			if (position.x > maxX) {
				setPosition({
					...position,
					x: maxX > 0 ? maxX : 0,
				})
			}
		}
	}, [windowWidth, position])

	return (
		<div
			style={{
				width: containerWidth,
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
				<div className='title-bar-text'>
					Guest Spot database submission
				</div>
				<div className='title-bar-controls'>
					<button aria-label='Minimize' />
					<button aria-label='Maximize' />
					<button aria-label='Close' onClick={handleClose} />
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
