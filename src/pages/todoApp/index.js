import React, { useState } from 'react'

const TodoApp = () => {
	const [columns, setColumns] = useState([
		{
			id: 'column1',
			title: 'Column 1',
			tasks: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
		},
		{ id: 'column2', title: 'Column 2', tasks: [] },
	])

	const [newColumnName, setNewColumnName] = useState('')
	const [taskInputs, setTaskInputs] = useState({})

	const handleDragStart = (e, columnId, taskIndex) => {
		e.dataTransfer.setData(
			'text/plain',
			JSON.stringify({ columnId, taskIndex })
		)
	}

	const handleDragOver = (e) => {
		e.preventDefault()
	}

	const handleDrop = (e, targetColumnId, targetTaskIndex) => {
		e.preventDefault()
		const { columnId, taskIndex } = JSON.parse(
			e.dataTransfer.getData('text/plain')
		)

		const updatedColumns = [...columns]

		const sourceColumnIndex = updatedColumns.findIndex(
			(column) => column.id === columnId
		)
		const targetColumnIndex = updatedColumns.findIndex(
			(column) => column.id === targetColumnId
		)
		const sourceColumn = updatedColumns[sourceColumnIndex]
		const targetColumn = updatedColumns[targetColumnIndex]

		const taskToMove = sourceColumn.tasks[taskIndex]

		if (sourceColumn === targetColumn) {
			// Moving within the same column
			const updatedTasks = [...sourceColumn.tasks]
			updatedTasks.splice(taskIndex, 1)
			updatedTasks.splice(targetTaskIndex, 0, taskToMove)
			sourceColumn.tasks = updatedTasks
		} else {
			// Moving to a different column
			const updatedSourceTasks = [...sourceColumn.tasks]
			updatedSourceTasks.splice(taskIndex, 1)
			const updatedTargetTasks = [...targetColumn.tasks]
			updatedTargetTasks.splice(targetTaskIndex, 0, taskToMove)
			console.log(
				updatedTargetTasks,
				updatedTargetTasks,
				taskToMove,
				'33333'
			)
			sourceColumn.tasks = updatedSourceTasks
			targetColumn.tasks = updatedTargetTasks
		}

		setColumns(updatedColumns)
	}

	const handleTaskInputChange = (e, columnId) => {
		const updatedTaskInputs = { ...taskInputs, [columnId]: e.target.value }
		setTaskInputs(updatedTaskInputs)
	}

	const handleTaskFormSubmit = (e, columnId) => {
		e.preventDefault()
		const taskText = taskInputs[columnId]?.trim()
		if (!taskText) return

		const newTask = taskText
		const updatedColumns = columns.map((column) => {
			if (column.id === columnId) {
				return { ...column, tasks: [...column.tasks, newTask] }
			}
			return column
		})

		setColumns(updatedColumns)
		setTaskInputs({ ...taskInputs, [columnId]: '' })
	}

	const handleColumnNameChange = (e) => {
		setNewColumnName(e.target.value)
	}

	const handleColumnFormSubmit = (e) => {
		e.preventDefault()
		const trimmedColumnName = newColumnName.trim()
		if (!trimmedColumnName) return

		const newColumn = {
			id: `column${Date.now().toString()}`,
			title: trimmedColumnName,
			tasks: [],
		}
		setColumns([...columns, newColumn])
		setNewColumnName('')
	}

	const renderColumns = columns.map((column) => (
		<div
			key={column.id}
			className='column'
			onDragOver={handleDragOver}
			onDrop={(e) => handleDrop(e, column.id, column.tasks.length)}
		>
			<h3>{column.title}</h3>
			<div className='task-list'>
				{column.tasks.map((task, index) => (
					<div
						key={index}
						className='task'
						draggable
						onDragStart={(e) => {
							return handleDragStart(e, column.id, index)
						}}
						onDragOver={(e) => e.preventDefault()}
						onDrop={(e) => handleDrop(e, column.id, index)}
					>
						{task}
					</div>
				))}
			</div>
			<form onSubmit={(e) => handleTaskFormSubmit(e, column.id)}>
				<input
					type='text'
					value={taskInputs[column.id] || ''}
					onChange={(e) => handleTaskInputChange(e, column.id)}
					placeholder='Add a task...'
				/>
				<button type='submit'>Add Task</button>
			</form>
		</div>
	))

	return (
		<div>
			<form onSubmit={handleColumnFormSubmit}>
				<input
					type='text'
					value={newColumnName}
					onChange={handleColumnNameChange}
					placeholder='Add a column...'
				/>
				<button type='submit'>Add Column</button>
			</form>
			<div style={{ display: 'flex' }}>{renderColumns}</div>
		</div>
	)
}

export default TodoApp
