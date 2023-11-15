import { useRef, useState, useEffect } from 'react'

const Pendulum = () => {
	const timer = useRef()
	const [state, setState] = useState({
		counter: 1,
		flow: false,
	})

	useEffect(() => {
		timer.current = setInterval(() => {
			setState(({ counter, flow }) => {
				if (counter < 5 && !flow) {
					return {
						counter: counter + 1,
						flow,
					}
				} else if (counter === 5 && !flow) {
					return {
						counter: counter - 1,
						flow: true,
					}
				} else if (counter > 1) {
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
		return () => {
			clearInterval(timer.current)
		}
	}, [])

	return <div>{state.counter}</div>
}

export default Pendulum
