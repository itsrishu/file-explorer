import React from 'react'

const Action = ({ handleClick, type, className }) => {
	return (
		<div className={`${className} flex`} onClick={handleClick}>
			{type}
		</div>
	)
}

export default Action
