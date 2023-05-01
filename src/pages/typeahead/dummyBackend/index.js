import fruits from '../data/'

function searchItem(keyword) {
	return new Promise((resolve) => {
		let result = []
		setTimeout(() => {
			fruits.forEach((element) => {
				if (element.includes(keyword)) {
					result.push(element)
				}
			})
			resolve(result)
		}, 1000)
	})
}

export { searchItem }
