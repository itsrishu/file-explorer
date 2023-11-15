import React, { useState, useEffect } from 'react'

const API_KEY = 'moqgsxKqnGzmk1BfVLOfTsr8b2sg5GOl'
const LIMIT = 25

export const useFetchBooks = (q, offset) => {
	const [giffs, setGiffs] = useState([])
	const [hasMore, setHasMore] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const fetchGiffs = async (q) => {
		try {
			const resp = await fetch(
				`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${q}&limit=${LIMIT}&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`
			)
			const data = await resp.json()
			setHasMore(data.pagination.total_count > offset)
			setGiffs([...giffs, ...data.data])
		} catch (err) {
			console.log(err)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchGiffs(q)
	}, [q, offset])

	return { giffs, hasMore, isLoading }
}
