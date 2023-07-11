import React, { useState } from 'react'

function Folder({ explorer, insertNode }) {
	const [text, setText] = useState('')
	const [isExpanded, setIsExpanded] = useState(false)
	const [isInputVisible, setIsInputVisible] = useState({
		isFolder: true,
		isVisible: false,
	})

	const onChange = (e) => {
		setText(e.target.value)
	}

	const renderInput = () => {
		if (isInputVisible.isVisible) {
			return <input value={text} onChange={onChange} />
		}
	}

	const renderChild = () => {
		if (isExpanded) {
			return explorer.items.map((item, i) => (
				<Folder explorer={item} key={item.id} insertNode={insertNode} />
			))
		}
	}

	return (
		<div className='flex flex-col w-[150px] ml-[16px] mb-[4px] '>
			<div>
				<div
					className='w-[200px] cursor-pointer'
					onClick={() => setIsExpanded(!isExpanded)}
				>
					{explorer.isFolder ? (
						<div className='flex justify-between items-center'>
							<div className='flex '>
								<>Box</>
								<h2 className='ml-[10px]'>{explorer.title}</h2>
							</div>

							<div className='flex'>
								<button
									className='mr-[10px] bg-slate-100 p-[4px] text-slate-800 rounded-[4px]'
									onClick={() =>
										setIsInputVisible({
											isFolder: true,
											isInputVisible: true,
										})
									}
								>
									Folder
								</button>
								<button
									className=' bg-slate-100 p-[4px] text-slate-800 rounded-[4px]'
									onClick={() =>
										setIsInputVisible({
											isFolder: false,
											isInputVisible: true,
										})
									}
								>
									Doc
								</button>
							</div>
						</div>
					) : (
						<div className='flex items-center'>
							<>Doc</>
							<h2 className='ml-[10px]'>{explorer.title}</h2>
						</div>
					)}
				</div>
			</div>
			{renderInput()}
			{renderChild()}
		</div>
	)
}

export default Folder
