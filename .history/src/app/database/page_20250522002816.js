'use client'
import styles from './page.module.css'
import '98.css'
import { useGetData } from '../hooks/useData'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Fuse from 'fuse.js'
import { motion } from 'framer-motion' // Add this import

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
			// Updated to match "City" with capital C
			const cities = [...new Set(queryData.map((item) => item.City))]

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
			? ['All', ...new Set(queryData.map((item) => item.City))]
			: ['All']

	// Fuzzy search city function
	const fuzzyMatchCity = (item, query) => {
		if (query === 'All') return true
		if (!cityFuse || !item.City) return false

		// Check exact match first
		if (item.City.toLowerCase() === query.toLowerCase()) return true

		// Then do fuzzy search
		const results = cityFuse.search({ name: query })
		return results.some(
			(result) =>
				result.item.name.toLowerCase() === item.City.toLowerCase()
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

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
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
							style={{
								margin: '0 auto',
								marginBottom: '10px',
								width: 'max-content',
							}}
						>
							<label htmlFor='cityFilter'>Filter by City:</label>
							<select
								id='cityFilter'
								value={selectedCity}
								onChange={(e) => handleCitySearch(e)}
								className='select'
								style={{ color: 'black' }}
							>
								{uniqueCities.map((city) => (
									<option
										key={city}
										value={city}
										style={{ color: 'black' }}
									>
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
								flexDirection: 'column',
								margin: '0 auto',
								width: '90%',
								height: 'calc(100vh - 200px)',
								overflowY: 'auto',
								overflowX: 'auto',
							}}
						>
							{filteredData.length > 0 && (
								<div
									style={{
										padding: '10px',
										backgroundColor: '#f0f0f0',
										fontSize: '10px',
										whiteSpace: 'pre-wrap',
										marginBottom: '10px',
										display: 'none',
									}}
								>
									Data keys:{' '}
									{Object.keys(filteredData[0]).join(', ')}
								</div>
							)}

							<table
								style={{
									borderCollapse: 'collapse',
									width: '100%',
									textAlign: 'left',
								}}
							>
								<thead>
									<tr>
										<th
											style={{
												padding: '8px',
												backgroundColor: '#c0c0c0',
												minWidth: '150px',
												position: 'sticky',
												top: 0,
											}}
										>
											City
										</th>
										<th
											style={{
												padding: '8px',
												backgroundColor: '#c0c0c0',
												minWidth: '150px',
												position: 'sticky',
												top: 0,
											}}
										>
											Shop Name
										</th>
										<th
											style={{
												padding: '8px',
												backgroundColor: '#c0c0c0',
												minWidth: '150px',
												position: 'sticky',
												top: 0,
											}}
										>
											Contact
										</th>
										<th
											style={{
												padding: '8px',
												backgroundColor: '#c0c0c0',
												minWidth: '150px',
												position: 'sticky',
												top: 0,
											}}
										>
											Email
										</th>
										<th
											style={{
												padding: '8px',
												backgroundColor: '#c0c0c0',
												minWidth: '150px',
												position: 'sticky',
												top: 0,
											}}
										>
											Fee
										</th>
										<th
											style={{
												padding: '8px',
												backgroundColor: '#c0c0c0',
												minWidth: '150px',
												position: 'sticky',
												top: 0,
											}}
										>
											Instagram
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredData.length > 0 ? (
										filteredData.map((item) => (
											<tr key={item._id}>
												<td
													style={{
														padding: '8px',
														borderBottom:
															'1px solid #ddd',
														whiteSpace: 'nowrap',
													}}
												>
													{item.City}
												</td>
												<td
													style={{
														padding: '8px',
														borderBottom:
															'1px solid #ddd',
														whiteSpace: 'nowrap',
													}}
												>
													{item.shop_name}
												</td>
												<td
													style={{
														padding: '8px',
														borderBottom:
															'1px solid #ddd',
														whiteSpace: 'nowrap',
													}}
												>
													{item.Contact}
												</td>
												<td
													style={{
														padding: '8px',
														borderBottom:
															'1px solid #ddd',
														whiteSpace: 'nowrap',
													}}
												>
													{item.Email}
												</td>
												<td
													style={{
														padding: '8px',
														borderBottom:
															'1px solid #ddd',
														whiteSpace: 'nowrap',
													}}
												>
													{item.Fee}
												</td>
												<td
													style={{
														padding: '8px',
														borderBottom:
															'1px solid #ddd',
														whiteSpace: 'nowrap',
													}}
												>
													{item.Instagram}
												</td>
											</tr>
										))
									) : (
										<tr>
											<td
												colSpan='6'
												style={{
													padding: '8px',
													textAlign: 'center',
												}}
											>
												No matching results found
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</>
				)}
			</div>
		</motion.div>
	)
}
