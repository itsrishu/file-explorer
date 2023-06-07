import React from 'react'

const Cell = ({ data, onClick }) => {
	return (
		<div className='bg-red-500' onClick={onClick}>
			{data}
		</div>
	)
}

export default Cell
