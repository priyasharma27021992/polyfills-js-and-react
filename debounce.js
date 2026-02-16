//1. simple implementation
function debounce(callback, delay = 1000) {
	let timer;
	return function (...args) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(this, args);
		}, delay);
	};
}

//2. Promise based implementation
function debounceAsync(fn, delay = 1000) {
	let timer;
	let pendingPromise = null;

	return function (...args) {
		if (timer) clearTimeout(timer);

		if (pendingPromise) {
			pendingPromise.reject(new Error('Already Debounced'));
		}

		return new Promise((resolve, reject) => {
			pendingPromise = { resolve, reject };

			timer = setTimeout(async () => {
				try {
					const result = await fn.apply(this, args);
					resolve(result);
				} catch (err) {
					reject(err);
				} finally {
					pendingPromise = null;
				}
			}, delay);
		});
	};
}

//3. Robust with immediate callnow debounce
function immediateDebounce(func, wait = 1000, immediate) {
	let timeout = null;
	const context = this; //what is the reason for having context here? cannot we use this directly?

	return function (...args) {
		const callNow = immediate && !timeout;

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;

			if (!immediate) func.apply(context, args); //apply is just used for args to be array? We could use call too right?
		}, wait);

		if (callNow) func.apply(context, args);
	};
}

//use async debounce

// const fetchData = async (query) => {
// 	console.log('Fetching for:', query);
// 	return `Result for ${query}`;
// };

// const debouncedFetch = debounceAsync(fetchData, 500);

// debouncedFetch('apple').then(console.log).catch(console.error);
// debouncedFetch('pear').then(console.log).catch(console.error);

//use immediateDebounce

const immediateDebouncedFunc = immediateDebounce(
	() => {
		console.log('Debounce fired At', new Date().toLocaleDateString());
	},
	1000,
	false
);

let count = 0;
const interval = setInterval(() => {
	console.log('event', count++);
	immediateDebouncedFunc();

	if (count === 10) clearInterval(interval);
}, 300);
