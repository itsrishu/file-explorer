import { useState, useCallback, useRef, useEffect } from 'react'

const debounce = (cb, delay) => {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			cb(...args)
		}, delay)
	}
}

export const useBookSearch = (q, page) => {
	const [books, setBooks] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [hasMore, setHasMore] = useState(false)

	useEffect(() => {
		setBooks([])
	}, [q])

	const fetchBooks = async (q, page) => {
		setIsLoading(true)
		const url = `http://openlibrary.org/search.json?q=${q}&page=${page}`
		try {
			const response = await fetch(url)
			const resp = await response.json()
			const newArr = resp.docs.map((it) => {
				return { title: it.title, pages: it.number_of_pages_median }
			})
			setHasMore(resp.docs.length > 0)
			setBooks((prev) => [...prev, ...newArr])
		} catch (err) {
			console.log(err)
		} finally {
			setIsLoading(false)
		}
	}

	const optimisedApiCall = useCallback(debounce(fetchBooks, 250), [])

	useEffect(() => {
		optimisedApiCall(q, page)
	}, [q, page])

	return { books, isLoading, hasMore }
}
