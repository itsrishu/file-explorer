import React from 'react'

function Input() {
	return (
		<input
			value={text}
			ref={inputRef}
			onChange={handleChange}
			placeholder='Enter words to search'
			className='className flex h-[36px] w-[270px] p-[8px] text-[#3C4852] focus-visible:outline-none rounded-[4px]'
		/>
	)
}

export default Input
