import React, { useState, useEffect, useCallback } from 'react'

export default function App() {
	const [count, setCount] = useState([])
	const [current, setCurrent] = React.useState(0)

	const handleClick = () => {
		setCount([...count, 'BAR'])
	}

	const handleBarStatus = useCallback(() => {
		setCurrent(current + 1)
	}, [current])
	return (
		<div>
			<button onClick={handleClick}>Add</button>
			{count?.map((c, i) => (
				<ProgressBar
					start={current === i}
					handleBarStatus={handleBarStatus}
					key={i}
				/>
			))}
		</div>
	)
}

const ProgressBar = ({ start, handleBarStatus }) => {
	const [progress, setProgress] = React.useState(0)

	React.useEffect(() => {
		const timer = setInterval(() => {
			if (!start) return
			setProgress((oldProgress) => {
				if (oldProgress === 100) {
					clearInterval(timer)
					handleBarStatus()
					return oldProgress
				}
				return oldProgress + 20
			})
		}, 100)

		return () => {
			clearInterval(timer)
		}
	}, [start, handleBarStatus])

	return (
		<div style={{ width: '200px', background: 'grey', height: '40px' }}>
			<div
				style={{
					width: `${progress}%`,
					background: 'red',
					height: '100%',
				}}
			/>
		</div>
	)
}
