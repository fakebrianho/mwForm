'use client'
import '98.css'
import React, { useState, useEffect } from 'react'
import { getRandomPosition } from '@/app/utils/getRandomPosition'
import styles from './Question.module.css'

function Question({
	setStage,
	stage,
	question,
	answerQuestion,
	disabled,
	value,
}) {
	const [inputValue, setInputValue] = useState(value || '')
	const [position, setPosition] = useState(null) // Initialize position as null
	const [isDragging, setIsDragging] = useState(false)
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

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

	const handleInputChange = (e) => {
		setInputValue(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('Submitting answer:', inputValue)
		answerQuestion(inputValue)

		// Try direct stage increment instead of passing the stage param
		console.log('Current stage before increment:', stage)
		setStage(stage + 1)
		console.log('New stage value should be:', stage + 1)
	}

	if (!position) {
		return null // Or a loading indicator
	}

	return (
		<div className={styles.container}>
			<div className='window'>
				<div className='title-bar'>
					<div className='title-bar-text'>{question}</div>
				</div>
				<div className='window-body'>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							value={inputValue}
							onChange={handleInputChange}
							disabled={disabled}
							className={styles.input}
						/>
						{!disabled && (
							<button type='submit' disabled={!inputValue.trim()}>
								Next
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	)
}

export default Question
