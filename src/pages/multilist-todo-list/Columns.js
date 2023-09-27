'use client'
import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import TodoList from './TodoList'

function Columns({ list, onTaskAdd, index, isCombineEnabled }) {
	return (
		<Draggable draggableId={list.id} key={list.id} index={index}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<TodoList
						list={list}
						index={index}
						key={list.id}
						isCombineEnabled={isCombineEnabled}
					/>
				</div>
			)}
		</Draggable>
	)
}

export default Columns
