import React, { useEffect, useState } from 'react'
import data from './data'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Col } from './Col'

function index() {
	const [lists, setLists] = useState(data)
	const [text, setText] = useState('')
	const [isWindowReady, setWindowReady] = useState(false)

	useEffect(() => {
		setWindowReady(true)
	}, [])

	const handleDragEnd = ({ source, destination, type }) => {
		if (type === 'COLUMNS') {
			const stateList = [...lists]
			const [rem] = stateList.splice(source.index, 1)
			stateList.splice(destination.index, 0, rem)
			setLists(stateList)
		} else {
			const stateLists = [...lists]
			const sourceColumn = stateLists.find(
				(column) => column.id === source.droppableId
			)
			if (!sourceColumn) {
				return stateLists
			}

			const itemToMove = sourceColumn.items[source.index]
			if (!itemToMove) {
				return stateLists
			}
			sourceColumn.items.splice(source.index, 1)
			const destinationColumn = stateLists.find(
				(column) => column.id === destination.droppableId
			)
			if (!destinationColumn) {
				return stateLists
			}

			destinationColumn.items.splice(destination.index, 0, itemToMove)
			setLists(stateLists)
		}
	}

	const handleInput = (e) => {
		setText(e.target.value)
	}

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			setLists((prev) => [
				...prev,
				{
					id: text,
					items: [],
				},
			])
			setText('')
		}
	}

	const addTask = (text, id) => {}

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable
				droppableId='droppable'
				direction='horizontal'
				type='COLUMNS'
			>
				{(provided) => {
					return (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className='flex flex-col'
						>
							<input
								value={text}
								onChange={handleInput}
								onKeyDown={handleKeyDown}
								className='text-black h-[36px] w-[400px] self-center my-[16px] rounded-sm'
							/>
							<div className='flex'>
								{lists?.map((list, index) =>
									isWindowReady ? (
										<Col
											list={list}
											index={index}
											key={list.id}
											addTask={addTask}
										/>
									) : null
								)}
							</div>
						</div>
					)
				}}
			</Droppable>
		</DragDropContext>
	)
}

export default index
