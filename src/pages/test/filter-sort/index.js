import React, { useState, useEffect, useCallback } from 'react'
import { useBookSearch } from './useBookSearch'

const DROPDOWN_VALUES = [
	{ label: 'Asc', value: 'asc' },
	{ label: 'Desc', value: 'desc' },
	{ label: 'Original', value: 'org' },
]

const Infi = () => {
	const { books, filterRows, sortRows } = useBookSearch()
	const [text, setText] = useState('')
	const [value, setValue] = useState('org')

	const handleChange = useCallback((e) => {
		setText(e.target.value)
	}, [])

	const handleDropdown = (e) => {
		setValue(e.target.value)
	}

	useEffect(() => {
		filterRows(text, value)
	}, [text])

	useEffect(() => {
		console.log(text)
		sortRows(text, value)
	}, [value])

	return (
		<div>
			<div className='flex items-center'>
				<TextInput value={text} handleChange={handleChange} />
				<Dropdown value={value} handleChange={handleDropdown} />
			</div>

			<table>
				<thead>
					<tr>
						<th>Sl</th>
						<th>First name</th>
						<th>last name</th>
						<th>gender</th>
					</tr>
				</thead>
				<tbody>
					{books.map((book, index) => (
						<tr key={index}>
							<td>{book?.id}</td>
							<td>{book?.first_name}</td>
							<td>{book?.last_name}</td>
							<td>{book?.gender}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Infi

const TextInput = ({ value, handleChange }) => {
	return (
		<div className='flex justify-center'>
			<input
				className='text-green-400 my-[40px] flex w-[400px] h-[40px] rounded-[8px] p-[16px]'
				value={value}
				onChange={handleChange}
			/>
		</div>
	)
}

const Dropdown = ({ value, handleChange }) => {
	return (
		<select
			value={value}
			onChange={handleChange}
			className='text-blue-600 rounded-[8px] h-[48px] p-[8px] ml-[16px]'
		>
			{DROPDOWN_VALUES.map((d, i) => (
				<option key={i} value={d.value}>
					{d.label}
				</option>
			))}
		</select>
	)
}
