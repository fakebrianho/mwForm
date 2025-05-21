'use client'
import '98.css'
import React, { useState, useEffect, useRef } from 'react'
import { getRandomPosition } from '@/app/utils/getRandomPosition'
import styles from './Question.module.css'
import { Howl, Howler } from 'howler'

function playAudio(url) {
	var sound = new Howl({
		src: [url],
		volume: 0.7,
	})
}

function Question2(props) {
	const [position, setPosition] = useState(null) // Initialize position as null
	const [isDragging, setIsDragging] = useState(false)
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
	const [input, setInput] = useState('')
	const inputRef = useRef(null) // Add ref for input field
	useEffect(() => {
		setPosition(getRandomPosition())
	}, [])

	// Add an effect to focus on the input when the component mounts
	useEffect(() => {
		// Focus on input when component mounts and position is set
		if (
			position &&
			inputRef.current &&
			props.currentStage === parseInt(props.stage)
		) {
			inputRef.current.focus()
		}
		playAudio(props.url)
	}, [position, props.currentStage, props.stage])

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

	const handleSubmit = (e) => {
		e.preventDefault()
		props.answerQuestion(input)
		console.log('inner stage', props.stage)
		console.log('current stage', props.currentStage)
		if (props.stage >= props.currentStage) {
			props.setPixel((prev) => (prev + 5) * 1.25)
			props.setStage((prev) => prev + 1)
		}
	}

	if (!position) {
		return null // Or a loading indicator
	}

	return (
		<div
			style={{
				width: '50vw',
				padding: props.padding || 0,
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
				<div className='title-bar-text'>Question {props.stage}: </div>
				<div className='title-bar-controls'>
					<button aria-label='Minimize' />
					<button aria-label='Maximize' />
					<button aria-label='Close' />
				</div>
			</div>

			<div className='window-body'>
				<form onSubmit={handleSubmit}>
					<div className='field-row'>
						<label htmlFor='question1'>{props.question}</label>
						<input
							className={styles.input}
							id='question1'
							type='text'
							onChange={(e) => setInput(e.target.value)}
							ref={inputRef}
						/>
						<button type='submit'>Submit</button>
					</div>
					<div
						className='field-row'
						style={{ justifyContent: 'center' }}
					></div>
				</form>
			</div>
		</div>
	)
}

export default Question2
