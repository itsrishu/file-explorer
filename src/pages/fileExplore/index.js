import React, { useState } from 'react'
import data from './data'
import Folder from './Folder'
import { useTreeTraversal } from './useTreeTraversal'

function index() {
	const [explorer, setExplorer] = useState(data)
	const { insertNode } = useTreeTraversal()

	const insert = (id, name, isFolder) => {
		const newData = insertNode(explorer, id, name, isFolder)
		setExplorer(newData)
	}

	return <Folder exp={explorer} insert={insert} />
}

export default index
