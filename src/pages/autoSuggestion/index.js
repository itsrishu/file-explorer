import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Suggestion from './Suggestion'
import { debounce } from './utility'

function AutoSuggestion({}) {
	const [text, setText] = useState('')

	const [filteredData, setFilteredData] = useState(null)

	const { data, isLoading, isError } = useQuery(['search'], async () => {
		const response = await fetch('https://dummyjson.com/products')
		const data = await response.json()
		return data.products
	})

	const debouncedFunc = debounce((str) => {
		const fil = data?.filter((item) => {
			const lowerCaseTitle = item.title?.toLowerCase()
			const lowerCaseText = str?.join().toLowerCase()
			return lowerCaseTitle.includes(lowerCaseText)
		})

		setFilteredData(fil)
	}, 2000)

	useEffect(() => {
		debouncedFunc(text)
	}, [text])

	const handleChange = (e) => {
		setText(e.target.value)
	}

	return (
		<div className='flex justify-center items-center flex-col'>
			<input
				onChange={handleChange}
				className='text-[#3c425d]'
				value={text}
			/>
			<Suggestion data={filteredData} />
		</div>
	)
}

export default AutoSuggestion
