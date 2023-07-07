/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

//https://api.disneyapi.dev/character

import { Inter } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

function Card(props) {
	const { imageUrl, name, films, shortFilms, tvShows, _id } = props
	const work = films.join(', ') + shortFilms.join(', ') + tvShows.join(', ')
	return (
		<div className='flex items-center gap-4'>
			<p>{_id}</p>
			<img
				src={imageUrl}
				alt={name}
				style={{ borderRadius: '100%' }}
				className='rounded w-[75px] h-[75px]'
			/>
			{/* <div> */}
			<p>
				{name} {work}
			</p>
			{/* </div> */}
		</div>
	)
}

const options = {
	root: null,
	rootMargin: '300px',
	threshold: 1.0,
}

export default function Home() {
	const [characters, setCharacters] = useState([])
	const [otherInfo, setOtherInfo] = useState({})
	const [name, setName] = useState('')
	const containerRef = useRef(null)
	const [isIntersecting, setIsIntersecting] = useState(false)
	useEffect(() => {
		fetch('https://api.disneyapi.dev/character')
			.then((resp) => resp.json())
			.then((respData) => {
				setCharacters(respData.data)
				setOtherInfo(respData.info)
			})
	}, [])

	// const callback = (entries) => {
	useEffect(() => {
		if (isIntersecting && otherInfo.nextPage) {
			fetch(otherInfo.nextPage)
				.then((resp) => resp.json())
				.then((respData) => {
					setCharacters([...characters, ...respData.data])
					setOtherInfo(respData.info)
				})
		}
	}, [isIntersecting])
	// };

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsIntersecting(entry.isIntersecting)
		}, options)
		if (containerRef.current) observer.observe(containerRef.current)
		return () => {
			observer.disconnect()
		}
	}, [])

	return (
		<main>
			<input />
			{characters.map((character) => (
				<Card key={character._id} {...character} />
			))}
			<div ref={containerRef}>Loader</div>
		</main>
	)
}
