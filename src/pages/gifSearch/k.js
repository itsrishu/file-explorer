import './d.css'
const data = [
	'Item 1',
	'Item 2',
	'Item 3',
	'Item 4',
	'Item 5',
	'Item 6',
	'Item 7',
]

export default function App() {
	return (
		<div class='grid-container'>
			{data.map((_i) => (
				<div class='grid-item'>{_i}</div>
			))}
		</div>
	)
}
