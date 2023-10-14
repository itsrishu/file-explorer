import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import List from './List'

export function Col({ list, index, addTask }) {
	return (
		<Draggable draggableId={list.id} key={list.id} index={index}>
			{(provided) => (
				<div
					className='flex h-[300px] bg-gray-200 w-[300px] mr-[20px]'
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<List list={list} addTask={addTask} />
				</div>
			)}
		</Draggable>
	)
}
