const debounce = (func, delay) => {
	let timeoutId;
	return function (...args) {
		console.log('args', args);
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
};

const add = (a, b) => {
	console.log('a', a, 'b', b, 'a+b', a + b);
};

const debouncedAdd = debounce(add, 1000);
console.log(debouncedAdd(1, 2));
console.log(debouncedAdd(2, 3));
