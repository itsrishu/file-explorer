'use client'
import React, { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Droppable } from 'react-beautiful-dnd'
import Items from './items'

function Columns({ list, onTaskAdd }) {
	const [text, setText] = useState('')

	return (
		<Droppable droppableId={list.id}>
			{(provided) => (
				<div
					className={`cursor-pointer h-[300px] bg-red-500 ${list.id}`}
					{...provided.droppableProps}
					ref={provided.innerRef}
				>
					<div className='flex flex-col items-center space-x-2'>
						<h2>{list.id}</h2>
						<div className='flex items-center space-x-2'>
							<input
								value={text}
								onChange={() => setText(e.target.value)}
								onKeyDown={(e) => {
									onTaskAdd
								}}
								className=''
							/>
							<PlusCircle />
						</div>
					</div>
					<div>
						{list.list.map((l, index) => (
							<Items l={l} index={index} key={l.id} />
						))}
						{provided.placeholder}
					</div>
				</div>
			)}
		</Droppable>
	)
}

export default Columns
