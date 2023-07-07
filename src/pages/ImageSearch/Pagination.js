import React, { useState } from 'react'

function Pagination({ totalPages, handlePageClick, activePage }) {
	const handleClick = (page) => {
		if (handlePageClick) {
			handlePageClick(page)
		}
	}

	return (
		<div className='flex my-[10px] justify-center items-center'>
			{new Array(totalPages).fill(undefined).map((_, index) => (
				<div
					key={index}
					onClick={handleClick.bind(null, index + 1)}
					className={`${
						activePage === index + 1
							? 'text-[#FCFCFC]'
							: 'text-[#3C4852]'
					} 
                            font-[600] cursor-pointer h-[40px] w-[40px] mr-[8px] flex rounded-[4px] justify-center items-center ${
								activePage === index + 1
									? 'bg-slate-700'
									: 'bg-slate-200'
							}`}
				>
					{index + 1}
				</div>
			))}
		</div>
	)
}

export default Pagination
