import React from 'react'
import Image from 'next/image'

function CountriesComponent({ item }) {
	return (
		<section className=' w-auto bg-slate-100 rounded-[8px] p-[16px]'>
			<div className='relative h-[150px] aspect-w-16 aspect-h-9'>
				<Image
					src={item.flags.png}
					alt={item.flags.png}
					fill={true}
					className='rounded-lg'
				/>
			</div>
			<h2 className='text-[#3C4852] mt-[10px] font-[700]'>
				{item.name.official}
			</h2>
			<div className='flex justify-between'>
				<span className='text-[#7A8B94] font-[500]'>{item.region}</span>
				<span className='text-[#7A8B94] font-[500]'>
					{item.capital?.[0] ?? '-'}
				</span>
			</div>
		</section>
	)
}

export default CountriesComponent
