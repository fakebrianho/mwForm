import React, { useState, useCallback } from 'react'

export const useExitAnimation = () => {
	const NUM = 10
	const [questions, setQuestions] = useState([])
	const [isPlaying, setIsPlaying] = useState(false)

	// Array of sample questions you might want to use
	const questionBank = [
		'What is your favorite color?',
		'Where would you travel next?',
		"What's your dream job?",
		'Coffee or tea?',
		"What's your biggest fear?",
		'Cats or dogs?',
		"What's the last book you read?",
		'Favorite movie of all time?',
		'What makes you happy?',
		'Beach or mountains?',
		'If you could have any superpower?',
		'Favorite season of the year?',
		"What's your go-to meal?",
		'Early bird or night owl?',
		"What's one thing you can't live without?",
		// Add more questions as needed
	]

	const startAnimation = useCallback(() => {
		setIsPlaying(true)
		setQuestions([])

		// Generate and display questions with staggered timing
		let count = 0
		const interval = setInterval(() => {
			if (count < NUM) {
				setQuestions((prev) => {
					// Get random position on screen
					const posX = Math.floor(Math.random() * 80) + 10 // 10-90% of screen width
					const posY = Math.floor(Math.random() * 80) + 10 // 10-90% of screen height

					// Get random question
					const randomIndex = Math.floor(
						Math.random() * questionBank.length
					)
					const question = questionBank[randomIndex]

					return [
						...prev,
						{
							id: count,
							text: question,
							position: { x: posX, y: posY },
							opacity: 1,
						},
					]
				})
				count++
			} else {
				clearInterval(interval)
				// Optional: fade out or clear questions after some time
				setTimeout(() => {
					setIsPlaying(false)
					setQuestions([])
				}, 3000)
			}
		}, 200) // Adjust timing between questions as needed

		return () => clearInterval(interval)
	}, [])

	return { questions, isPlaying, startAnimation }
}
