import React, { useState, useCallback, useRef } from 'react'
import { useFetchBooks } from './useFetchData'

const options = {
	root: null,
	rootMargin: '300px',
	threshold: 1.0,
}

const InfiniteScroll = () => {
	const [text, setText] = useState('')
	const [offset, setOffset] = useState(0)
	const observer = useRef()
	const { giffs, isLoading, hasMore } = useFetchBooks(text, offset)

	const handleChange = useCallback((e) => {
		setText(e.target.value)
	}, [])

	const lastElementRef = useCallback(
		(node) => {
			if (isLoading) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver((entries) => {
				const entry = entries[0]
				if (entry.isIntersecting && hasMore) {
					setOffset((prev) => prev + 25)
				}
			}, options)
			if (node) {
				observer.current.observe(node)
			}
		},
		[isLoading, hasMore]
	)

	console.log(giffs.length)

	return (
		<div>
			<Input onChange={handleChange} />
			<div className='grid grid-cols-5 gap-4'>
				{giffs?.map((g, i) => {
					if (giffs.length === i + 1) {
						return (
							<div
								key={g.id}
								className='flex h-[200px] w-[150px]'
								ref={lastElementRef}
							>
								<img src={g.images.original.url} />
							</div>
						)
					} else {
						return (
							<div
								key={g.id}
								className='flex h-[200px] w-[150px]'
							>
								<img src={g.images.original.url} />
							</div>
						)
					}
				})}
			</div>
		</div>
	)
}

export default InfiniteScroll

const Input = ({ value, onChange }) => {
	return (
		<div className='my-[20px] flex justify-center'>
			<input
				value={value}
				onChange={onChange}
				className='text-black w-[300px] h-[40px] rounded-[8px] p-[12px]'
			/>
		</div>
	)
}
