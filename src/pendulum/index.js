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

// class TaskRunner {

//     constructor() {/*TODO*/}

//     push(task) {/*TODO*/}

// }

// let createTask = i => {

//     return (onTaskComplete) => {

//       setTimeout(() => {

//         console.log(i);

//         onTaskComplete();

//       }, 1000);

//     };

//   };

// var r = new TaskRunner();

// r.push(createTask(1)); //Should run immediately

// r.push(createTask(2)); //Should run after 1s

// r.push(createTask(3)); //Should run after 2s

// r.push(createTask(4)); //Should run after 3s
