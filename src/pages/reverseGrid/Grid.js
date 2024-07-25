import { useEffect, useState } from 'react'

const Grid = () => {
	const [gridItems, setGridItems] = useState(Array(9).fill(false))
	const [clickOrder, setClickOrder] = useState([])

	const handleClick = (idx) => {
		if (!gridItems[idx]) {
			const newGridItems = [...gridItems]
			newGridItems[idx] = true
			setGridItems(newGridItems)
			setClickOrder([...clickOrder, idx])
		}
	}

	useEffect(() => {
		if (gridItems.every((item) => item)) {
			alert('all items are clicked')
			setTimeout(() => {
				reverseOrder(clickOrder)
			}, 1000)
		}
	}, [gridItems])

	const reverseOrder = (order) => {
		order.reverse().forEach((i, idx) => {
			setTimeout(() => {
				setGridItems((prev) => {
					const newGridItems = [...prev]
					newGridItems[i] = false
					return newGridItems
				})

				if (idx === order.length - 1) {
					setClickOrder([])
				}
			}, idx * 400)
		})
	}

	console.log(gridItems)

	return (
		<div className='grid grid-cols-3 grid-rows-3 gap-[10px] w-[200px]'>
			{gridItems.map((item, idx) => (
				<div
					key={idx}
					className={`w-[50px] h-[50px] border border-solid border-blue-300 ${
						item ? 'bg-green-500' : 'bg-white'
					}`}
					onClick={() => handleClick(idx)}
				></div>
			))}
		</div>
	)
}

export default Grid
