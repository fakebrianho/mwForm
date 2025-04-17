'use client'
import styles from './page.module.css'
import '98.css'
import Question1 from '@/components/Question1/Question1'
import Question2 from '@/components/Question2/Question2'
import Question from '@/components/Question/Question'
import { useEffect, useState } from 'react'

export default function Home() {
	const [stage, setStage] = useState(0)
	const [answer1, setAnswer1] = useState('')
	const [answer2, setAnswer2] = useState('')
	const [answer3, setAnswer3] = useState('')
	useEffect(() => {
		if (answer1) {
		}
	}, [answer1])
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				{stage === 0 && <Question1 setStage={setStage} />}
				{stage === 1 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'Shop Name: '}
						answerQuestion={setAnswer1}
					/>
				)}
				{stage === 2 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'Instagram Handle: '}
						answerQuestion={setAnswer2}
					/>
				)}
				{stage === 3 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'City: '}
						answerQuestion={setAnswer3}
					/>
				)}
				{stage === 4 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={
							'If you know the full address: (This will not be public) '
						}
						answerQuestion={setAnswer3}
					/>
				)}
				{/* {stage === 1 && (
					<Question2 setStage={setStage} setAnswer={setAnswer2} />
				)} */}
			</main>
		</div>
	)
}
