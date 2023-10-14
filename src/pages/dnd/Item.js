import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

function Item({ item, index }) {
	return (
		<Draggable draggableId={item.id} key={item.id} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className='flex bg-gray-200 rounded-md cursor-pointer'
				>
					<h2>{item.title}</h2>
				</div>
			)}
		</Draggable>
	)
}

export default Item
