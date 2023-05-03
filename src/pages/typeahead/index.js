import React, { useState, useRef, useEffect } from 'react'
import Suggestion from './components/Suggestion'
import { searchItem } from '../../dummyBackend'

function TypeAhead() {
	const [text, setText] = useState('')
	const [apiResult, setApiResult] = useState([])

	const inputRef = useRef(null)

	const handleChange = async (e) => {
		e?.preventDefault()
		setText(e.target.value)
		if (e.target.value) {
			const result = await searchItem(e.target.value)
			setApiResult(result)
		}
	}

	useEffect(() => {
		if (inputRef?.current) {
			inputRef?.current.focus()
		}
	}, [inputRef])

	return (
		<div className='flex justify-center items-center flex-col'>
			<input
				value={text}
				ref={inputRef}
				onChange={handleChange}
				placeholder='Enter words to search'
				className='className flex mt-[100px] h-[36px] w-[600px] p-[8px] text-[#3C4852] focus-visible:outline-none rounded-t-[4px]'
			/>
			{apiResult?.length > 0 ? (
				<Suggestion items={apiResult} keyword={text} />
			) : null}
		</div>
	)
}

export default TypeAhead
