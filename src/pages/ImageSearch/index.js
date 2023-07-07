import React, { useCallback, useEffect, useState } from 'react'
import { URLS } from './constants'
import CountriesComponent from './CountriesComponent'
import Pagination from './Pagination'

const ITEMS_PER_PAGE = 15

function App({}) {
	const [countries, setCountries] = useState([])
	const [activePage, setActivePage] = useState(1)
	const [totalPages, setTotalPage] = useState(0)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const response = await fetch(URLS.COUNTRIES_URL)
		const data = await response.json()
		setTotalPage(Math.ceil(data.length / ITEMS_PER_PAGE))
		setCountries(data)
	}

	const handlePageClick = useCallback((p) => {
		setActivePage(p)
	}, [])

	const startIndex = (activePage - 1) * ITEMS_PER_PAGE
	const endIndex = startIndex + ITEMS_PER_PAGE - 1

	return (
		<div>
			<div
				className='grid grid-cols-5 grid-flow-row gap-4 p-[16px] my-[20px]'
				style={{ gridAutoRows: 'minmax(100px, auto)' }}
			>
				{countries.slice(startIndex, endIndex + 1).map((item) => (
					<CountriesComponent item={item} />
				))}
			</div>
			<Pagination
				totalPages={totalPages}
				handlePageClick={handlePageClick}
				activePage={activePage}
			/>
		</div>
	)
}

export default App
