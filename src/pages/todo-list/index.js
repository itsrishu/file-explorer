'use client'
import React, { useState, useEffect } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import data from './data'
import { PlusCircle } from 'lucide-react'
// import dynamic from 'next/dynamic'
// const Columns = dynamic(import('./Columns'))

import Columns from './Columns'

function index({}) {
	const [todos, setTodos] = useState(data)
	const [text, setText] = useState('')
	const [winReady, setwinReady] = useState(false)

	useEffect(() => {
		setwinReady(true)
	}, [])

	const handleEnd = ({ source, destination }) => {
		if (destination === undefined || destination === null) return null

		if (
			source.droppableId === destination.droppableId &&
			destination.index === source.index
		)
			return null

		const start = todos[source.droppableId]
		const end = todos[destination.droppableId]

		if (start === end) {
			const newList = start.list.filter((_, idx) => idx !== source.index)

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
			newEndList.splice(destination.index, 0, start.list[source.index])
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

	const onTaskAdd = (key, text) => {}

	return (
		<DragDropContext onDragEnd={handleEnd}>
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
				{Object.values(todos).map((col) =>
					winReady ? (
						<Columns
							list={col}
							key={col.id}
							onTaskAdd={onTaskAdd}
						/>
					) : null
				)}
			</div>
		</DragDropContext>
	)
}

export default index
