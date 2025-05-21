'use client'
import styles from './page.module.css'
import '98.css'
import { useGetData } from '../hooks/useData'
import { useEffect, useState } from 'react'
export default function Home() {
	const getData = useGetData()
	const [data, setData] = useState(null)
	useEffect(() => {
		const res = getData.mutate()
		setData(res)
	}, [])
	useEffect(() => {}, [data])

	async function handleSignUp() {
		const res = await getData.mutateAsync()
		console.log(res)
	}
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				paddingBottom: 10,
				position: 'absolute',
				zIndex: 1000,
			}}
			className='window'
			// onMouseDown={handleMouseDown}
		>
			<div className='title-bar'>
				<div className='title-bar-text'>Database</div>
				<div className='title-bar-controls'>
					<button aria-label='Minimize' disabled />
					<button aria-label='Maximize' disabled />
					<button aria-label='Close' disabled />
				</div>
			</div>

			<div className='window-body'>
				<div className='sunken-panel'>
					<thread>
						<tr>
							<th>Name</th>
							<th>Version</th>
							<th>Company</th>
						</tr>
					</thread>
				</div>
				<div
					className='field-row'
					style={{ justifyContent: 'center', paddingTop: '10px' }}
				>
					<button
						style={{ fontSize: '18px' }}
						onClick={() => handleSignUp()}
					>
						Start
					</button>
					<button
						style={{ fontSize: '18px' }}
						// onClick={() => handleLogIn()}
					>
						Log In
					</button>
				</div>
				<div
					className='field-row'
					style={{ justifyContent: 'center' }}
				></div>
			</div>
		</div>
	)
}
