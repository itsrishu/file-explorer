import React, { useState } from 'react'
import data from './data.json'
import Folder from './Folder'

function App() {
	const [explorerData, setExplorerData] = useState(data)

	const insertNode = () => {}

	return (
		<div>
			<Folder
				explorer={explorerData}
				key={explorerData.id}
				insertNode={insertNode}
			/>
		</div>
	)
}

export default App
