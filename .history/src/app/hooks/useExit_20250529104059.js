import React, { useState, useCallback } from 'react'
import Question from '@/components/Question/Question'

export const useExitAnimation = () => {
	const NUM = 10
	const [questions, setQuestions] = useState([])
	const [isPlaying, setIsPlaying] = useState(false)
	const [isAnimationComplete, setIsAnimationComplete] = useState(false)

	// Array of sample questions you might want to use
	const questionBank = [
		'Loading',
		'LOadIng',
		'LoADing',
		'lOadinG',
		'Loading',
		'loaDiNg',
		'LoaDinG',
		'LoADing',
		'LoadiNg',
		'LoAding',
	]

	const startAnimation = useCallback((onAnimationComplete) => {
		setIsPlaying(true)
		setIsAnimationComplete(false)
		setQuestions([])

		// Generate and display questions with staggered timing
		let count = 0
		const interval = setInterval(() => {
			if (count < NUM) {
				setQuestions((prev) => {
					return [
						...prev,
						{
							id: `question-${Date.now()}-${count}`, // Create a truly unique ID
							text: questionBank[count],
							index: count, // Store the index separately
						},
					]
				})
				count++
			} else {
				clearInterval(interval)

				setIsAnimationComplete(true)
				if (
					onAnimationComplete &&
					typeof onAnimationComplete === 'function'
				) {
					onAnimationComplete()
				}
				// }, 3000)
			}
		}, 200) // Adjust timing between questions as needed

		return () => clearInterval(interval)
	}, [])

	// The component to render Question components
	const ExitAnimation = useCallback(() => {
		return (
			<>
				{questions.map((q) => (
					<Question
						key={q.id}
						stage={q.index.toString()}
						currentStage={q.index}
						question={q.text}
					/>
				))}
			</>
		)
	}, [questions])

	return {
		ExitAnimation,
		isPlaying,
		isAnimationComplete,
		startAnimation,
	}
}
