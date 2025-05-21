import React, { useState, useCallback } from 'react'
import Question from '@/components/Question/Question'

export const useExitAnimation = () => {
	const NUM = 10
	const [questions, setQuestions] = useState([])
	const [isPlaying, setIsPlaying] = useState(false)

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

	const startAnimation = useCallback(() => {
		setIsPlaying(true)
		setQuestions([])

		// Generate and display questions with staggered timing
		let count = 0
		const interval = setInterval(() => {
			if (count < NUM) {
				setQuestions((prev) => {
					return [
						...prev,
						{
							id: count,
							text: questionBank[count],
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

	// The component to render Question components
	const ExitAnimation = useCallback(() => {
		return (
			<>
				{questions.map((q) => (
					<Question
						key={q.id}
						stage={q.id.toString()}
						currentStage={q.id}
						question={q.text}
					/>
				))}
			</>
		)
	}, [questions])

	return { ExitAnimation, isPlaying, startAnimation }
}
