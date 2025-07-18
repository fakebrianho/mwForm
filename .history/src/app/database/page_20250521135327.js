'use client'
import styles from './page.module.css'
import '98.css'
import { useGetData } from '../hooks/useData'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
	const getData = useGetData()
	const {
		data: queryData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['yourData'],
		queryFn: async () => {
			const result = await getData.mutateAsync()
			console.log(result)
			return result.users || []
		},
	})

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
					<p>Error loading data: {error.message}</p>
				) : (
					<div
						className='sunken-panel'
						style={{
							display: 'flex',
							justifyContent: 'center',
							overflowX: 'auto',
							margin: '0 auto',
							width: 'max-content',
						}}
					>
						<table
							style={{ margin: '0 auto', textAlign: 'center' }}
						>
							<thead>
								<tr>
									<th>Address</th>
									<th>City</th>
									<th>Contact</th>
									<th>Email</th>
									<th>fee</th>
									<th>Instagram</th>
									<th>Shop Name</th>
								</tr>
							</thead>
							<tbody>
								{queryData && Array.isArray(queryData) ? (
									queryData.map((item) => (
										<tr key={item._id}>
											<td>{item.address}</td>
											<td>{item.city}</td>
											<td>{item.contact}</td>
											<td>{item.email}</td>
											<td>{item.fee}</td>
											<td>{item.instagram}</td>
											<td>{item.shop_name}</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan='7'>
											No data available or data is not in
											expected format
										</td>
									</tr>
								)}
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
