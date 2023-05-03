import fruits from '../pages/typeahead/data/'

function searchItem(keyword) {
	return new Promise((resolve) => {
		let result = []
		setTimeout(() => {
			fruits.forEach((element) => {
				if (element.toLowerCase().includes(keyword.toLowerCase())) {
					result.push(element)
				}
			})
			resolve(result)
		}, 1000)
	})
}

export { searchItem }
