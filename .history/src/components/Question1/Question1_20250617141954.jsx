'use client'
import '98.css'
import React, { useState, useEffect } from 'react'
import { getRandomPosition } from '@/app/utils/getRandomPosition'

function Question1(props) {
	const [position, setPosition] = useState(null) // Initialize position as null
	const [isDragging, setIsDragging] = useState(false)
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
	const [isVisible, setIsVisible] = useState(true) // State for visibility

	useEffect(() => {
		setPosition(getRandomPosition())
	}, [])

	// Handle mouse down event to start dragging
	const handleMouseDown = (e) => {
		setIsDragging(true)
		setDragOffset({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		})
	}

	// Handle touch start event to start dragging on touch devices
	const handleTouchStart = (e) => {
		const touch = e.touches[0]
		setIsDragging(true)
		setDragOffset({
			x: touch.clientX - position.x,
			y: touch.clientY - position.y,
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

	// Handle touch move event while dragging
	const handleTouchMove = (e) => {
		if (isDragging) {
			const touch = e.touches[0]
			setPosition({
				x: touch.clientX - dragOffset.x,
				y: touch.clientY - dragOffset.y,
			})
			e.preventDefault() // Prevent scrolling while dragging
		}
	}

	// Handle mouse up event to stop dragging
	const handleMouseUp = () => {
		setIsDragging(false)
	}

	// Handle touch end event to stop dragging
	const handleTouchEnd = () => {
		setIsDragging(false)
	}

	// Handle close button click
	const handleClose = (e) => {
		e.stopPropagation() // Prevent triggering the drag handler
		props.setStage(1)
		// props.setPixel((prev) => (prev + 10) * 1.5)
		// setIsVisible(false)
	}
	const handleSignUp = (e) => {
		props.setStage(1)
	}
	const handleLogIn = (e) => {
		console.log('loggin in!')
	}
	// Add and remove event listeners
	useEffect(() => {
		if (isDragging) {
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)
			document.addEventListener('touchmove', handleTouchMove, {
				passive: false,
			})
			document.addEventListener('touchend', handleTouchEnd)
		} else {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
			document.removeEventListener('touchmove', handleTouchMove)
			document.removeEventListener('touchend', handleTouchEnd)
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
			document.removeEventListener('touchmove', handleTouchMove)
			document.removeEventListener('touchend', handleTouchEnd)
		}
	}, [isDragging, dragOffset])

	if (!position || !isVisible) {
		return null // Or a loading indicator
	}

	return (
		<div
			style={{
				width: '50vw',
				paddingBottom: 10,
				position: 'absolute',
				left: `${position.x}px`,
				top: `${position.y}px`,
				cursor: isDragging ? 'grabbing' : 'grab',
				zIndex: 1000,
			}}
			className='window'
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}
		>
			<div className='title-bar'>
				<div className='title-bar-text'>
					Guest Spot database submission
				</div>
				<div className='title-bar-controls'>
					<button aria-label='Minimize' disabled />
					<button aria-label='Maximize' disabled />
					<button aria-label='Close' disabled />
				</div>
			</div>

			<div className='window-body'>
				<p style={{ textAlign: 'center', fontSize: '18px' }}>
					This database was made to help tattoo artists connect with
					shops in other cities for guest spots. Accumulating this
					information has potential to be powerful in helping artists
					make money while traveling regionally or abroad. We hope
					this results in more artists feeling comfortable traveling
					and sharing/learning from peers in other cities. Please show
					all your favorite shops some love and submit them to the
					database for other artists to discover. Multiple entries are
					welcomed but please don't submit the same shop multiple
					times ♡{' '}
				</p>
				<div
					className='field-row'
					style={{ justifyContent: 'center', paddingTop: '10px' }}
				>
					<button
						style={{ fontSize: '18px' }}
						onClick={() => {
							handleSignUp()
						}}
					>
						Start
					</button>
					<button
						style={{ fontSize: '18px' }}
						onClick={() => handleLogIn()}
					>
						Log In
					</button>
				</div>
				<div
					className='field-row'
					style={{ justifyContent: 'center' }}
				></div>
			</div>
		</div>
	)
}

export default Question1
