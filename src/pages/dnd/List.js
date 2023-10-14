import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Item from './Item'

function List({ list, addTask }) {
	const [text, setText] = useState('')

	const handleInput = (e) => {
		const {
			target: { value },
		} = e

		setText(value)
	}

	const handleKeydown = (e) => {
		if (e.charCode === 13) {
			addTask(text, list.id)
		}
	}

	return (
		<Droppable droppableId={list.id} type='ITEMS'>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.droppableProps}>
					<input
						value={text}
						onChange={handleInput}
						onKeyDown={handleKeydown}
					/>
					<h1 className='text-center text-black'>{list.id}</h1>
					{list.items.map((item, index) => (
						<Item index={index} item={item} />
					))}
				</div>
			)}
		</Droppable>
	)
}

export default List
