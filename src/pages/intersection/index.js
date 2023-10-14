import { useState, useCallback, useRef, useEffect } from 'react'
import { useBookSearch } from './useBookSearch'

const options = {
	root: null,
	rootMargin: '300px',
	threshold: 1.0,
}

export default function index() {
	const [text, setText] = useState('')
	const [page, setPage] = useState(1)
	const { books, isLoading, hasMore } = useBookSearch(text, page)

	const observer = useRef()

	const lastItemRef = useCallback(
		(node) => {
			if (isLoading) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver((entries) => {
				const target = entries[0]
				if (target.isIntersecting && hasMore) {
					setPage((prev) => prev + 1)
				}
			}, options)
			if (node) observer.current.observe(node)
		},
		[isLoading, hasMore]
	)

	const handleChange = (e) => {
		setText(e.target.value)
	}

	return (
		<div>
			<input onChange={handleChange} className='text-red-700' />
			<div className='grid grid-cols-5 gap-4 grid-rows-5'>
				{books?.map((book, index) => {
					if (books.length === index + 1) {
						return (
							<h1
								ref={lastItemRef}
								key={index}
								className='text-orange-500'
							>
								{book.title}
							</h1>
						)
					} else {
						return (
							<h1 className='text-orange-500' key={index}>
								{book.title}
							</h1>
						)
					}
				})}
			</div>
			{isLoading && <h1>Fetching...</h1>}
		</div>
	)
}
