import { useState, useRef, useEffect } from 'react'
import Action from './Action'
import { ChevronDown, ChevronUp } from 'lucide-react'

const Comment = ({
	handleInsertNode,
	handleEditNode,
	handleDeleteNode,
	comment,
}) => {
	const [input, setInput] = useState('')
	const [editMode, setEditMode] = useState(false)
	const [showInput, setShowInput] = useState(false)
	const [expand, setExpand] = useState(false)
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef?.current?.focus()
	}, [editMode])

	const handleNewComment = () => {
		setExpand(!expand)
		setShowInput(true)
	}

	const onAddComment = () => {
		if (editMode) {
			handleEditNode(comment.id, inputRef?.current?.innerText)
		} else {
			setExpand(true)
			handleInsertNode(comment.id, input)
			setShowInput(false)
			setInput('')
		}

		if (editMode) setEditMode(false)
	}

	const handleDelete = () => {
		handleDeleteNode(comment.id)
	}

	return (
		<div>
			<div
				className={
					comment.id === 1
						? 'flex items-baseline gap-1.5'
						: 'mt-1.5 bg-gray-300 flex flex-col p-1.5 w-75 cursor-pointer rounded'
				}
			>
				{comment.id === 1 ? (
					<>
						<input
							type='text'
							className='mt-1.5 p-1.5 flex text-gray-900 border border-gray-300 items-center justify-between cursor-pointer rounded bg-gray-200 focus:outline-none focus:ring focus:border-blue-300'
							autoFocus
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder='type...'
						/>
						<Action
							className='text-gray-900 bg-blue-500 px-2 py-1 rounded text-sm font-semibold cursor-pointer'
							type='COMMENT'
							handleClick={onAddComment}
						/>
					</>
				) : (
					<>
						<span
							contentEditable={editMode}
							suppressContentEditableWarning={editMode}
							ref={inputRef}
							className='break-words text-gray-900'
						>
							{comment.name}
						</span>
						<div className='flex mt-1.5'>
							{editMode ? (
								<>
									<Action
										className='text-gray-900 bg-blue-500 px-2 py-1 rounded text-sm font-semibold cursor-pointer'
										type='SAVE'
										handleClick={onAddComment}
									/>
									<Action
										className='text-gray-900 bg-blue-500 px-2 py-1 rounded text-sm font-semibold cursor-pointer'
										type='CANCEL'
										handleClick={() => {
											if (inputRef.current)
												inputRef.current.innerText =
													comment.name
											setEditMode(false)
										}}
									/>
								</>
							) : (
								<>
									<Action
										className='text-gray-800 bg-gray-200 px-2 py-1 rounded text-sm font-semibold cursor-pointer'
										type={
											<>
												{expand ? (
													<ChevronUp />
												) : (
													<ChevronDown />
												)}{' '}
												REPLY
											</>
										}
										handleClick={handleNewComment}
									/>
									<Action
										className='text-gray-800 bg-gray-200 px-2 py-1 rounded text-sm font-semibold cursor-pointer'
										type='EDIT'
										handleClick={() => setEditMode(true)}
									/>
									<Action
										className='text-gray-800 bg-gray-200 px-2 py-1 rounded text-sm font-semibold cursor-pointer'
										type='DELETE'
										handleClick={handleDelete}
									/>
								</>
							)}
						</div>
					</>
				)}
			</div>

			<div className={`${expand ? 'block' : 'hidden'} pl-6`}>
				{showInput && (
					<div className='flex items-baseline gap-1.5'>
						<input
							type='text'
							className='mt-1.5 text-gray-900 p-1.5 flex border border-gray-300 items-center justify-between cursor-pointer rounded bg-gray-200 focus:outline-none focus:ring focus:border-blue-300'
							autoFocus
							onChange={(e) => setInput(e.target.value)}
						/>
						<Action
							className='text-gray-800 bg-gray-200 px-2 py-1 rounded text-sm font-semibold cursor-pointer'
							type='REPLY'
							handleClick={onAddComment}
						/>
						<Action
							className='text-gray-800 bg-gray-200 px-2 py-1 rounded text-sm font-semibold cursor-pointer'
							type='CANCEL'
							handleClick={() => {
								setShowInput(false)
								if (!comment?.items?.length) setExpand(false)
							}}
						/>
					</div>
				)}

				{comment?.items?.map((cmnt) => (
					<Comment
						key={cmnt.id}
						handleInsertNode={handleInsertNode}
						handleEditNode={handleEditNode}
						handleDeleteNode={handleDeleteNode}
						comment={cmnt}
					/>
				))}
			</div>
		</div>
	)
}

export default Comment
