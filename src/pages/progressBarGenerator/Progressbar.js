import React, { useState, useEffect } from 'react'

export function Progressbar({ start, handleProgress }) {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		let timer = setInterval(() => {
			if (!start) return
			setProgress((op) => {
				if (op === 100) {
					clearInterval(timer)
					handleProgress()
					return op
				}
				return op + 10
			})
		}, 100)

		return () => {
			clearInterval(timer)
		}
	}, [start])

	return (
		<div
			className={`flex w-[300px] bg-gray-500 h-[40px] rounded-[8px] my-[16px]`}
		>
			<div
				className={`flex h-full bg-gray-100 rounded-[8px] w-[${progress}%]`}
			></div>
		</div>
	)
}

export default Progressbar
