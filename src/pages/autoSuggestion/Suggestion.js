import React from 'react'

function Suggestion({ data }) {
	return (
		<div className='w-[500px]'>
			{data?.map((item) => (
				<div>{item.title}</div>
			))}
		</div>
	)
}

export default Suggestion
