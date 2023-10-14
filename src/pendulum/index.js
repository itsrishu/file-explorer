import React, { useState, useRef } from 'react'
import './styles.css'

export default function App() {
	const timer = useRef()
	const [state, setState] = useState({
		counter: 0,
		flow: false,
	})

	const handleClick = () => {
		timer.current = setInterval(() => {
			setState(({ counter, flow }) => {
				if (counter < 5 && !flow) {
					return {
						counter: counter + 1,
						flow: true,
					}
				} else if (counter === 5 && !flow) {
					return {
						counter: counter - 1,
						flow: true,
					}
				} else if (counter > 0) {
					return {
						counter: counter - 1,
						flow: true,
					}
				} else {
					return {
						counter: counter + 1,
						flow: false,
					}
				}
			})
		}, 1000)
	}

	function stop(e) {
		clearInterval(timer.current)
		setState({
			counter: 0,
			flow: false,
		})
	}
	return (
		<div>
			<div>{state.counter}</div>
			<button onClick={handleClick}>Start</button>
			<button onClick={stop}>stop</button>
		</div>
	)
}
