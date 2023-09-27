import React, { useCallback, useEffect, useState, useRef } from 'react'
import Input from './Input'
import Gif from './Gif'

const API_KEY = 'opziDQYeiGBWEq8pf6mQsm9th2AGT7ld'

const options = {
	root: null,
	rootMargin: '300px',
	threshold: 1.0,
}

const LIMIT = 15

function debounce(cb, delay) {
	let timer
	return (...args) => {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			cb.apply(this, args)
		}, delay)
	}
}

function App() {
	const [text, setText] = useState('')
	const [data, setData] = useState([])
	const [isFetching, setIsFetching] = useState(false)
	const [offset, setOffset] = useState(0)
	const [hasMore, setHasMore] = useState(true)

	const loaderRef = useRef(null)

	const onChange = useCallback((e) => {
		setText(e.target.value)
		setData([])
		setOffset(0)
		debouncedApiCall(e.target.value)
	}, [])

	const hitApi = async (text) => {
		try {
			setIsFetching(true)
			const response = await fetch(
				`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${text}&limit=${LIMIT}&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`
			)
			const { data: responseData } = await response.json()
			setData((prevData) => [...prevData, ...responseData])
			setOffset(offset + LIMIT)
			setHasMore(responseData.length === LIMIT)
		} catch (error) {
			console.error('Error fetching data:', error)
		} finally {
			setIsFetching(false)
		}
	}

	const debouncedApiCall = debounce(hitApi, 300)

	const handleObserver = useCallback(
		(entries) => {
			console.log('sssss')
			const target = entries[0]
			if (target.isIntersecting && !isFetching && hasMore) {
				hitApi(text)
			}
		},
		[isFetching, hasMore, text]
	)

	useEffect(() => {
		const observer = new IntersectionObserver(handleObserver, options)
		if (loaderRef?.current) {
			observer.observe(loaderRef.current)
		}

		return () => {
			if (loaderRef?.current) {
				observer.disconnect()
			}
		}
	}, [handleObserver])

	return (
		<div className='flex-col-5 grid-flow-row'>
			<div className='flex justify-center my-[24px]'>
				<Input text={text} onChange={onChange} />
			</div>

			<div className='grid gap-[16px] grid-cols-5'>
				{data.map((item) => (
					<Gif item={item} key={item.id} />
				))}
			</div>
			<div className='flex justify-center my-[16px]' ref={loaderRef}>
				{hasMore && <div>Loading...</div>}
			</div>
		</div>
	)
}

export default App
