import { useState, useRef, useEffect, useCallback } from 'react'
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
		if (editMode) inputRef.current?.focus()
	}, [editMode])

	const handleNewComment = useCallback(() => {
		setExpand((prev) => !prev)
		setShowInput(true)
	}, [])

	const onAddComment = useCallback(() => {
		if (editMode) {
			handleEditNode(comment.id, inputRef.current.innerText)
			setEditMode(false)
		} else {
			setExpand(true)
			handleInsertNode(comment.id, input)
			setShowInput(false)
			setInput('')
		}
	}, [editMode, handleEditNode, handleInsertNode, comment.id, input])

	const handleDelete = useCallback(() => {
		handleDeleteNode(comment.id)
	}, [handleDeleteNode, comment.id])

	const handleCancelEdit = useCallback(() => {
		if (inputRef.current) inputRef.current.innerText = comment.name
		setEditMode(false)
	}, [comment.name])

	const handleCancelReply = useCallback(() => {
		setShowInput(false)
		if (!comment?.items?.length) setExpand(false)
	}, [comment?.items?.length])

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
							className='mt-1.5 p-1.5 flex border border-gray-300 items-center justify-between cursor-pointer rounded bg-gray-200 focus:outline-none focus:ring focus:border-blue-300'
							autoFocus
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder='type...'
						/>
						<Action
							className='text-white bg-blue-500 px-2 py-1 rounded text-sm font-semibold cursor-pointer'
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
							className='break-words'
						>
							{comment.name}
						</span>
						<div className='flex mt-1.5'>
							{editMode ? (
								<>
									<Action
										className='text-white bg-blue-500 px-2 py-1 rounded text-sm font-semibold cursor-pointer'
										type='SAVE'
										handleClick={onAddComment}
									/>
									<Action
										className='text-white bg-blue-500 px-2 py-1 rounded text-sm font-semibold cursor-pointer'
										type='CANCEL'
										handleClick={handleCancelEdit}
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

			{expand && (
				<div className='pl-6'>
					{showInput && (
						<div className='flex items-baseline gap-1.5'>
							<input
								type='text'
								className='mt-1.5 p-1.5 flex border border-gray-300 items-center justify-between cursor-pointer rounded bg-gray-200 focus:outline-none focus:ring focus:border-blue-300'
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
								handleClick={handleCancelReply}
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
			)}
		</div>
	)
}

export default Comment
