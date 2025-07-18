'use client'
import styles from './page.module.css'
import '98.css'
import { useGetData } from '../hooks/useData'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
	const getData = useGetData()
	const [data, setData] = useState(null)
	const {
		data: queryData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['yourData'],
		queryFn: getData.mutate,
	})

	useEffect(() => {
		const res = getData.mutate()
		console.log(res)
		setData(res)
	}, [])
	useEffect(() => {
		console.log('datal', data)
	}, [data])

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
				{isLoading ? (
					<p>Loading...</p>
				) : error ? (
					<p>Error loading data</p>
				) : (
					<div className='sunken-panel'>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Version</th>
									<th>Company</th>
								</tr>
							</thead>
							<tbody>
								{queryData &&
									queryData.map((item) => (
										<tr key={item.id}>
											<td>{item.name}</td>
											<td>{item.version}</td>
											<td>{item.company}</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				)}
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
