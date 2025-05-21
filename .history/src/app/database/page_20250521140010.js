'use client'
import styles from './page.module.css'
import '98.css'
import { useGetData } from '../hooks/useData'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
	const getData = useGetData()
	const [selectedCity, setSelectedCity] = useState('All')
	const [searchQuery, setSearchQuery] = useState('')
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

	// Extract unique cities from data
	const uniqueCities =
		queryData && Array.isArray(queryData)
			? ['All', ...new Set(queryData.map((item) => item.city))]
			: ['All']

	// Filter data based on selected city and search query
	const filteredData =
		queryData && Array.isArray(queryData)
			? queryData.filter((item) => {
					const matchesCity =
						selectedCity === 'All' || item.city === selectedCity
					const matchesSearch =
						searchQuery === '' ||
						Object.values(item).some(
							(val) =>
								val &&
								val
									.toString()
									.toLowerCase()
									.includes(searchQuery.toLowerCase())
						)
					return matchesCity && matchesSearch
			  })
			: []

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
					<>
						<div
							className='field-row'
							style={{ marginBottom: '10px' }}
						>
							<label htmlFor='cityFilter'>Filter by City:</label>
							<select
								id='cityFilter'
								value={selectedCity}
								onChange={(e) =>
									setSelectedCity(e.target.value)
								}
								className='select'
							>
								{uniqueCities.map((city) => (
									<option key={city} value={city}>
										{city}
									</option>
								))}
							</select>

							<label
								htmlFor='search'
								style={{ marginLeft: '15px' }}
							>
								Search:
							</label>
							<input
								id='search'
								type='text'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder='Search all fields...'
							/>
						</div>

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
								style={{
									margin: '0 auto',
									textAlign: 'center',
								}}
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
									{filteredData.length > 0 ? (
										filteredData.map((item) => (
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
												No matching results found
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</>
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
