export const useTreeTraversal = () => {
	const insertNode = (tree, folderId, text, isFolder) => {
		if (tree.id === folderId && tree.isFolder) {
			tree.items.unshift({
				title: text,
				isFolder: isFolder,
				id: Math.floor(Math.random() * 100000),
				items: [],
			})
			return tree
		}
		let latestNode = []
		latestNode = tree.items.map((item) =>
			insertNode(item, folderId, text, isFolder)
		)
		return { ...tree, items: latestNode }
	}

	return { insertNode }
}
