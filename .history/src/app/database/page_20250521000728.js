'use client'
import styles from './page.module.css'
import '98.css'
export default function Home() {
	return (
		<>
			<div className='title-bar' style={{ fontSize: '20px' }}>
				<div className='title-bar-text' style={{ fontSize: '18px' }}>
					Question {props.stage}:{' '}
				</div>
				<div className='title-bar-controls'>
					<button aria-label='Minimize' />
					<button aria-label='Maximize' />
					<button aria-label='Close' />
				</div>
			</div>

			<div className='window-body'>
				{/* <form onSubmit={handleSubmit}> */}
				<div className='field-row' style={{ fontSize: '18px' }}>
					<label style={{ fontSize: '18px' }} htmlFor='question1'>
						{/* {props.question} */}
					</label>
					{/* <input
							style={{ fontSize: '18px' }}
							className={styles.input}
							id='question1'
							type='text'
							onChange={(e) => setInput(e.target.value)}
							ref={inputRef}
						/> */}
					<button style={{ fontSize: '18px' }} type='submit'>
						Submit
					</button>
				</div>
				<div
					className='field-row'
					style={{ justifyContent: 'center' }}
				></div>
				{/* </form> */}
			</div>
		</>
	)
}
