import './styles.css'

import React, { useState, useRef, useEffect } from 'react'

const CountdownTimer = () => {
	const [time, setTime] = useState(0)
	const [isRunning, setIsRunning] = useState(false)
	const intervalRef = useRef()

	useEffect(() => {
		return () => {
			clearInterval(intervalRef.current)
		}
	}, [])

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return `${String(minutes).padStart(2, '0')}:${String(
			remainingSeconds
		).padStart(2, '0')}`
	}

	const startStopTimer = () => {
		if (isRunning) {
			clearInterval(intervalRef.current)
		} else {
			intervalRef.current = setInterval(() => {
				setTime((prevTime) => prevTime + 1)
			}, 1000)
		}

		setIsRunning(!isRunning)
	}

	const resetTimer = () => {
		clearInterval(intervalRef.current)
		setTime(0)
		setIsRunning(false)
	}

	return (
		<div>
			<div id='timer'>{formatTime(time)}</div>
			<button onClick={startStopTimer}>
				{isRunning ? 'Stop' : 'Start'}
			</button>
			<button onClick={resetTimer}>Reset</button>
		</div>
	)
}

export default CountdownTimer
