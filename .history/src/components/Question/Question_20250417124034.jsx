'use client'
import '98.css'
import React, { useState, useEffect } from 'react'
import { getRandomPosition } from '@/app/utils/getRandomPosition'
import styles from './Question.module.css'

function Question2(props) {
	const [position, setPosition] = useState(null) // Initialize position as null
	const [isDragging, setIsDragging] = useState(false)
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
	const [input, setInput] = useState('')
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

	const handleSubmit = (e) => {
		e.preventDefault()
		props.answerQuestion(input)
		props.setStage((prev) => prev + 1)
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
