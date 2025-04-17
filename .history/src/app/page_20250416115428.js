import styles from './page.module.css'
import '98.css'

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div style={{ width: 300 }} className='window'>
					<div className='title-bar'>
						<div className='title-bar-text'>Counter</div>
						<div className='title-bar-controls'>
							<button aria-label='Minimize' />
							<button aria-label='Maximize' />
							<button aria-label='Close' />
						</div>
					</div>

					<div className='window-body'>
						<p style={{ textAlign: 'center' }}>Current count:0</p>
						<div
							className='field-row'
							style={{ justifyContent: 'center' }}
						></div>
					</div>
				</div>
			</main>
		</div>
	)
}
