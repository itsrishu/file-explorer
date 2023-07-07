import React, { useState } from 'react'
import Image from 'next/image'

function formatTime(str) {
	const date = new Date(str)
	const options = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'Asia/Kolkata',
	}
	const formattedDate = date?.toLocaleDateString('en-IN', options) ?? '-'
	return formattedDate
}

function Gif({ item }) {
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	const handleImageLoad = () => {
		setIsImageLoaded(true)
	}

	return (
		<div>
			<div className='relative h-[150px] aspect-w-16 aspect-h-9'>
				{!isImageLoaded && (
					<div className='bg-gray-200 animate-pulse rounded-lg'></div>
				)}
				<Image
					src={item?.images?.original.webp}
					alt={Math.random().toString()}
					fill={true}
					className={`rounded-lg ${
						isImageLoaded ? 'visible' : 'invisible'
					}`}
					loading='lazy'
					onLoad={handleImageLoad}
				/>
			</div>
			<h2>{item?.title}</h2>
			<div className='flex justify-between'>
				<span>{item?.rating}</span>
				<span>{formatTime(item?.import_datetime)}</span>
			</div>
		</div>
	)
}

export default Gif
