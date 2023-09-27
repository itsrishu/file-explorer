'use client'
import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import data from './data'
import { PlusCircle } from 'lucide-react'

import Columns from './Columns'

function moveObjectKeyByIndex(obj, fromIndex, toIndex) {
	const keys = Object.keys(obj)
	if (
		fromIndex < 0 ||
		fromIndex >= keys.length ||
		toIndex < 0 ||
		toIndex >= keys.length
	) {
		throw new Error('Invalid indices provided')
	}
	const newObj = { ...obj }
	const [movedKey] = keys.splice(fromIndex, 1)
	keys.splice(toIndex, 0, movedKey)
	const result = {}
	for (const key of keys) {
		result[key] = newObj[key]
	}
	return result
}

function index({}) {
	const [todos, setTodos] = useState(data)
	const [text, setText] = useState('')
	const [winReady, setwinReady] = useState(false)

	useEffect(() => {
		setwinReady(true)
	}, [])

	const handleEnd = ({ source, destination, type }) => {
		if (destination === undefined || destination === null) return null
		if (type === 'COLUMN') {
			const updatedObject = moveObjectKeyByIndex(
				todos,
				destination.index,
				source.index
			)
			setTodos(updatedObject)
		} else {
			if (
				source.droppableId === destination.droppableId &&
				destination.index === source.index
			)
				return null

			const start = todos[source.droppableId]
			const end = todos[destination.droppableId]

			if (start === end) {
				const newList = start.list.filter(
					(_, idx) => idx !== source.index
				)

				newList.splice(destination.index, 0, start.list[source.index])

				const newCol = {
					id: start.id,
					list: newList,
				}

				setTodos((state) => ({ ...state, [newCol.id]: newCol }))
				return null
			} else {
				const newStartList = start.list.filter(
					(_, idx) => idx !== source.index
				)

				const newStartCol = {
					id: start.id,
					list: newStartList,
				}

				const newEndList = end.list
				newEndList.splice(
					destination.index,
					0,
					start.list[source.index]
				)
				const newEndCol = {
					id: end.id,
					list: newEndList,
				}

				setTodos((state) => ({
					...state,
					[newStartCol.id]: newStartCol,
					[newEndCol.id]: newEndCol,
				}))
				return null
			}
		}
	}

	const onTaskAdd = (key, text) => {}

	return (
		<DragDropContext onDragEnd={handleEnd}>
			<Droppable
				droppableId={'board'}
				type='COLUMN'
				isCombineEnabled={false}
			>
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						<div className='flex items-center justify-center space-x-2'>
							<input
								value={text}
								onChange={() => seText(e.target.value)}
								onKeyDown={() => {}}
								className='my-[40px]'
							/>
							<PlusCircle />
						</div>

						<div className='flex items-center space-x-4'>
							{Object.values(todos).map((col, index) =>
								winReady ? (
									<Columns
										list={col}
										index={index}
										key={col.id}
										onTaskAdd={onTaskAdd}
										isCombineEnabled={false}
									/>
								) : null
							)}
						</div>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default index
