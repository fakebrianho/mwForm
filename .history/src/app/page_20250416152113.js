import styles from './page.module.css'
import '98.css'
import Question1 from '@/components/Question1/Question1'
import Question2 from '@/components/Question2/Question2'

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<Question1 />
			</main>
		</div>
	)
}
