'use client'
import styles from './page.module.css'
import '98.css'
import { useGetData } from '../hooks/useData'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Fuse from 'fuse.js'

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

	// Create a Fuse instance for fuzzy search on cities
	const [cityFuse, setCityFuse] = useState(null)

	// Extract unique cities from data and create Fuse instance
	useEffect(() => {
		if (queryData && Array.isArray(queryData)) {
			// Get all unique cities
			const cities = [...new Set(queryData.map((item) => item.city))]

			// Configure Fuse for fuzzy matching
			const fuseOptions = {
				includeScore: true,
				threshold: 0.4, // Lower threshold means more strict matching
				keys: ['name'],
			}

			// Convert city strings to objects for Fuse
			const cityObjects = cities.map((city) => ({ name: city }))
			setCityFuse(new Fuse(cityObjects, fuseOptions))
		}
	}, [queryData])

	// Extract unique cities from data (for dropdown)
	const uniqueCities =
		queryData && Array.isArray(queryData)
			? ['All', ...new Set(queryData.map((item) => item.city))]
			: ['All']

	// Fuzzy search city function
	const fuzzyMatchCity = (item, query) => {
		if (query === 'All') return true
		if (!cityFuse || !item.city) return false

		// Check exact match first
		if (item.city.toLowerCase() === query.toLowerCase()) return true

		// Then do fuzzy search
		const results = cityFuse.search({ name: query })
		return results.some(
			(result) =>
				result.item.name.toLowerCase() === item.city.toLowerCase()
		)
	}

	// Filter data based on selected city and search query
	const filteredData =
		queryData && Array.isArray(queryData)
			? queryData.filter((item) => {
					// Use fuzzy matching for cities
					const matchesCity = fuzzyMatchCity(item, selectedCity)

					// Use fuzzy search for general search
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

	// Function to handle city search and selection
	const handleCitySearch = (e) => {
		const searchValue = e.target.value

		// If using a custom input instead of select
		if (cityFuse && searchValue && searchValue !== 'All') {
			const results = cityFuse.search(searchValue)
			if (results.length > 0) {
				// Use the best match
				setSelectedCity(results[0].item.name)
			} else {
				setSelectedCity(searchValue)
			}
		} else {
			setSelectedCity(searchValue)
		}
	}

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
								onChange={(e) => handleCitySearch(e)}
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
								style={{ color: 'black' }}
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
