export function debounce(cb, delay) {
	let timer
	return (...args) => {
		console.log('call')
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			cb(args)
		}, delay)
	}
}
