import './styles.css'

import React, { useState, useEffect } from 'react'

//white-space: pre-wrap can also do the task in css

const App = () => {
	const [text, setText] = useState('')

	const handleChange = (e) => {
		setText(e.target.value)
	}

	useEffect(() => {
		let charSet = localStorage.getItem('his')

		console.log(charSet)

		if (charSet) {
			setText(charSet)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('his', text)
	}, [text])

	return (
		<div>
			<Editor handleChange={handleChange} val={text} />
			<View val={text} />
		</div>
	)
}

export default App

const Editor = ({ handleChange, val }) => {
	return (
		<textarea
			onChange={handleChange}
			value={val}
			style={{ height: '150px', padding: '16px' }}
		/>
	)
}

const View = ({ val }) => {
	return (
		<div>
			<pre>{val}</pre>
		</div>
	)
}
