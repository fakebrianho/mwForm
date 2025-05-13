import styles from './page.module.css'
import '98.css'

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div style={{ width: 300 }} className='window'>
					<div className='title-bar'>
						<div className='title-bar-text'>
							Guest Spot database submission
						</div>
						<div className='title-bar-controls'>
							<button aria-label='Minimize' />
							<button aria-label='Maximize' />
							<button aria-label='Close' />
						</div>
					</div>

					<div className='window-body'>
						<p style={{ textAlign: 'center' }}>
							This form was made to help tattoo artists connect
							with shops in other cities for guest spots.
							Accumulating this information has potential to be
							powerful in helping artists make money while
							traveling regionally or abroad. We hope this results
							in more artists feeling comfortable traveling and
							sharing/learning from peers in other cities. This
							information will be used to create a free and open
							source database.{' '}
						</p>
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
