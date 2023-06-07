import React, { useState } from 'react'
import Cell from './cell'

const Board = () => {
	const [nextTurn, setNextTurn] = useState('x')

	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='grid grid-cols-[repeat(3,100px)] grid-rows-[100px_100px_100px] gap-[2px]'>
				<Cell />
				<Cell />
				<Cell />
				<Cell />
				<Cell />
				<Cell />
				<Cell />
				<Cell />
				<Cell />
				<Cell ß />
			</div>
		</div>
	)
}

export default Board
