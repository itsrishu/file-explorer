import React, { useState } from 'react'
import Folder from '../components/Folder/'
import useTraverseTree from '../hooks/useTraverseTree'

import data from '../data/'

export default function Home() {
	const [explorerData, setExplorerData] = useState(data)
	const { insertNode } = useTraverseTree()

	const handleInsertNode = (folderId, item, isFolder) => {
		const updatedTree = insertNode(explorerData, folderId, item, isFolder)
		setExplorerData(updatedTree)
	}

	return (
		<>
			<Folder
				explorer={explorerData}
				key={explorerData.id}
				handleInsertNode={handleInsertNode}
			/>
		</>
	)
}
