const debounce = (func, delay) => {
	let timeoutId;
	return (args) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			return func.call(this, args);
		}, delay);
	};
};

const add = (a, b) => a + b;

const debouncedAdd = debounce(add, 1000);
console.log(debouncedAdd(1, 2));
