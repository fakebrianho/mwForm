'use client'
import styles from './page.module.css'
import '98.css'
import Question1 from '@/components/Question1/Question1'
import Question2 from '@/components/Question2/Question2'
import { useState } from 'react'

export default function Home() {
	const [stage, setStage] = useState(0)
	const renderQuestion2 = (e) => {}
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				{stage === 0 && <Question1 setStage={setStage} />}
				{stage === 1 && <Question2 />}
			</main>
		</div>
	)
}
