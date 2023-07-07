import React from 'react'

function Input({ text, onChange }) {
	function handleChange(e) {
		if (onChange) {
			onChange(e)
		}
	}
	return (
		<input
			className='h-[56px] w-[600px] rounded-[4px] p-[8px] text-[#3C4852] focus-visible:outline-none'
			value={text}
			onChange={handleChange}
			placeholder='Enter words to search'
		/>
	)
}

export default Input
