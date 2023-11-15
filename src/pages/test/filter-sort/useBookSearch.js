import React, { useState, useEffect } from 'react'
import data from './data.json'

export const useBookSearch = (q) => {
	const [originalData, setOriginalData] = useState(data)
	const [books, setBooks] = useState([])

	useEffect(() => {
		fetchBooks()
	}, [])

	const fetchBooks = async () => {
		// const url = `http://openlibrary.org/search.json?q=${'harry'}&page=${1}`
		// const resp = await fetch(url)
		// const data = await resp.json()
		setTimeout(() => {
			setBooks([...books, ...data])
			setOriginalData([...books, ...data])
		}, 300)
	}

	const filterRows = (q, order) => {
		const prev = [...originalData]

		if (q.toLowerCase() === '') {
			setBooks(prev)
		} else {
			const filtered = prev.filter((book) => {
				return book.first_name.toLowerCase().includes(q.toLowerCase())
			})
			setBooks(filtered)
		}
	}

	const sortRows = (text, order) => {
		const prev =
			text === '' && order === 'org' ? [...originalData] : [...books]
		let sortedArray = []
		if (order === 'asc') {
			sortedArray = prev.slice().sort((a, b) =>
				a.first_name.localeCompare(b.first_name, 'en', {
					sensitivity: 'base',
				})
			)
			setBooks(sortedArray)
		} else if (order === 'desc') {
			sortedArray = prev.slice().sort((a, b) =>
				b.first_name.localeCompare(a.first_name, 'en', {
					sensitivity: 'base',
				})
			)
			setBooks(sortedArray)
		} else {
			setBooks(prev)
		}
	}

	return { books, filterRows, sortRows }
}
