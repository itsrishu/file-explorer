import React from 'react'
import { ArrowSmallRightIcon } from '@heroicons/react/24/outline'

function Suggestion({ items, keyword }) {
	function renderSubItems(item) {
		const parts = item
			.split(new RegExp(`(${keyword})`, 'gi'))
			.filter(Boolean)

		return parts.map((it, i) => {
			if (it.toLowerCase() === keyword.toLowerCase()) {
				return (
					<strong className='text-[#3C4852] ' key={i}>
						{it}
					</strong>
				)
			} else {
				return (
					<span className='text-[#3C4852] ' key={i}>
						{it}
					</span>
				)
			}
		})
	}

	function renderItems() {
		return items.map((item) => {
			return (
				<div className='flex items-center p-[2px]'>
					<>
						<ArrowSmallRightIcon className='h-[16px] w-[16px] mr-[8px] text-[#3C4852]' />
					</>
					{renderSubItems(item)}
				</div>
			)
		})
	}

	return (
		<div className='flex, w-[600px] h-fit bg-[#efefef] flex-col'>
			{renderItems()}
		</div>
	)
}

export default Suggestion
