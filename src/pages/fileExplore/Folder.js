import { Folder as G, File, FolderPlus, FilePlus2 } from 'lucide-react'
import React, { useState } from 'react'

function Folder({ exp, insert }) {
	const [text, setText] = useState('')
	const [isExpanded, setIsExpanded] = useState(false)
	const [isVisible, setIsVisible] = useState(false)

	console.log(exp)

	if (exp.isFolder) {
		return (
			<div className='ml-[16px]'>
				<div className='flex space-x-2'>
					<div
						className='flex'
						onClick={() => setIsExpanded(!isExpanded)}
					>
						<G />
						<h3>{exp.title}</h3>
					</div>
					<div className='flex space-x-2'>
						<button onClick={() => setIsVisible(!isVisible)}>
							<FolderPlus />
						</button>
						<button onClick={() => setIsVisible(!isVisible)}>
							<FilePlus2 />
						</button>
					</div>
				</div>
				{isVisible ? (
					<div>
						<input
							value={text}
							onChange={(e) => setText(e.target.value)}
							className='text-red-400'
						/>
						<button
							className='p-2 rounded-[4px] bg-gray-300'
							onClick={(e) => {
								insert(exp.id, text, isFolder)
								setText('')
								setIsVisible(false)
								setIsExpanded(true)
							}}
						>
							Add
						</button>
					</div>
				) : null}
				{exp?.items.map((ex) => {
					if (isExpanded) {
						return <Folder exp={ex} insert={insert} key={ex.id} />
					}
				})}
			</div>
		)
	} else {
		return (
			<div className='flex space-x-2 ml-[16px]'>
				<File />
				<h3>{exp.title}</h3>
			</div>
		)
	}
}

export default Folder
