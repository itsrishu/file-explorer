import React, { useEffect, useState } from 'react'
import Character from './Character'

function index() {
	const [character, setCharacter] = useState([])
	const [otherInfo, setOtherInfo] = useState([])

	useEffect(() => {
		fetchData()
	}, [])

	async function fetchData() {
		const response = await fetch('https://api.disneyapi.dev/character')
		const data = await response.json()
		setCharacter(data.data)
		setOtherInfo(data.otherInfo)
	}

	return (
		<div className='flex flex-col'>
			<div
				className={`grid grid-cols-6 grid-rows-${character.length} gap-[16px]`}
			>
				{character.splice(0, 10).map((character, index) => (
					<Character item={character} key={character._id} />
				))}
			</div>
			<div className='flex justify-center items-center'>
				{[...Array(character.length / 10)].map((it, index) => {
					return <div>{index + 1}</div>
				})}
			</div>
		</div>
	)
}

export default index
