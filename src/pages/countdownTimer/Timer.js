import React, { useState, useRef, useEffect } from 'react'

function Timer({ seconds }) {
	const [time, setTime] = useState(seconds)
	const [isPaused, setIsPaused] = useState(false)
	const timerRef = useRef(null)

	const formatTime = (timeInSeconds) => {
		const seconds = Math.floor(timeInSeconds % 60)
			.toString()
			.padStart(2, '0')
		const minutes = Math.floor((timeInSeconds % 3600) / 60)
			.toString()
			.padStart(2, '0')

		const hours = Math.floor(timeInSeconds / 3600)
			.toString()
			.padStart(2, '0')

		return `${hours} : ${minutes} : ${seconds}`
	}

	const startTimer = () => {
		setIsPaused(false)
		timerRef.current = setInterval(() => {
			setTime((prevTime) => {
				if (prevTime === 0) {
					clearInterval(timerRef.current)
					return 0
				}
				return prevTime - 1
			})
		}, 1000)
	}

	useEffect(() => {
		startTimer()
		return () => clearInterval(timerRef.current)
	}, [])

	const pauseTimer = () => {
		clearInterval(timerRef.current)
		setIsPaused(true)
	}

	const resetTimer = () => {
		clearInterval(timerRef.current)
		setTime(seconds)
		setIsPaused(false)
	}

	return (
		<div className='flex flex-col justify-center'>
			{formatTime(time)}
			<div className='flex'>
				{isPaused ? (
					<button onClick={startTimer}>Resume</button>
				) : (
					<button onClick={pauseTimer}>Pause</button>
				)}
				<button onClick={resetTimer}>Reset</button>
			</div>
		</div>
	)
}

export default Timer
