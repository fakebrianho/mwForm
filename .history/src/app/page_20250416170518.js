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
	const [answer4, setAnswer4] = useState('')
	const [answer5, setAnswer5] = useState('')
	const [answer6, setAnswer6] = useState('')
	const [answer7, setAnswer7] = useState('')
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
						answerQuestion={setAnswer4}
					/>
				)}
				{stage === 5 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'Shop Cut / Fee'}
						answerQuestion={setAnswer5}
					/>
				)}
				{stage === 6 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={'Shop Email or Contact Info'}
						answerQuestion={setAnswer6}
					/>
				)}
				{stage === 7 && (
					<Question
						setStage={setStage}
						stage={stage}
						question={
							'Your email, if you want us to send you access to the database when its public.'
						}
						answerQuestion={setAnswer7}
					/>
				)}
				<div className='progress-indicator segmented'>
					<span
						className='progress-indicator-bar'
						style={{ width: '40%' }}
					/>
				</div>
				{/* {stage === 1 && (
					<Question2 setStage={setStage} setAnswer={setAnswer2} />
				)} */}
			</main>
		</div>
	)
}
