import React, { useState } from 'react'
import { FolderIcon, DocumentTextIcon } from '@heroicons/react/24/solid'
import {
	PlusIcon,
	FolderPlusIcon,
	DocumentPlusIcon,
} from '@heroicons/react/24/outline'

function Folder({ explorer, handleInsertNode }) {
	const [isExpanded, setExpanded] = useState(false)
	const [isInputVisible, setInputVisible] = useState({
		isFolder: true,
		isVisible: false,
	})

	const [text, setText] = useState('')

	const renderChild = () => {
		if (isExpanded) {
			return explorer.items.map((exp) => (
				<Folder
					explorer={exp}
					key={exp.id}
					handleInsertNode={handleInsertNode}
				/>
			))
		}
	}

	const handleChange = (e) => {
		setText(e.target.value)
	}

	const handleClick = () => {
		setExpanded(!isExpanded)
	}

	const handleAddFolder = (e) => {
		e?.preventDefault()
		e?.stopPropagation()
		const newState = { ...isInputVisible, isVisible: true, isFolder: true }
		setInputVisible(newState)
	}

	const handleAddFile = (e) => {
		e?.preventDefault()
		e?.stopPropagation()
		const newState = { ...isInputVisible, isVisible: true, isFolder: false }
		setInputVisible(newState)
	}

	const handleKeyDown = (e) => {
		if (e.keyCode === 13 && text) {
			handleInsertNode(explorer.id, text, isInputVisible.isFolder)
			setInputVisible({ ...isInputVisible, isVisible: false })
			setText('')
			setExpanded(true)
		}
	}

	const renderInput = () => {
		if (isInputVisible.isVisible) {
			return (
				<input
					value={text}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					className='h-[24px] ml-[24px] my-[10px] text-[#3C4852]'
				/>
			)
		}
	}

	return (
		<div className='ml-[16px] mb-[4px] cursor-pointer'>
			<div className='flex'>
				{explorer.isFolder ? (
					<div
						className='flex items-center justify-between w-[200px]'
						onClick={handleClick}
					>
						<div className='flex items-center'>
							<FolderIcon
								className='h-[36px] w-[36px]'
								fill='#fcc03f'
							/>
							<div className='flex ml-[8px]'>{explorer.name}</div>
						</div>
						<div className='flex items-center'>
							<button
								className='mr-[2px]'
								onClick={handleAddFolder}
							>
								<FolderPlusIcon className='h-[16px] w-[16px]' />
							</button>
							<button onClick={handleAddFile}>
								<DocumentPlusIcon className='h-[16px] w-[16px]' />
							</button>
						</div>
					</div>
				) : (
					<div className='flex items-center'>
						<>
							<DocumentTextIcon className='h-[36px] w-[36px]' />
						</>
						<div>{explorer.name}</div>
					</div>
				)}
			</div>
			{renderInput()}
			{renderChild()}
		</div>
	)
}

export default Folder
