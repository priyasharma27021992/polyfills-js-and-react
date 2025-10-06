function debounce(callback, delay = 1000) {
	let timer;
	return function (...args) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(this, args);
		}, delay);
	};
}

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
					resolve(reject);
				} catch (err) {
					reject(err);
				} finally {
					pendingPromise = null;
				}
			}, delay);
		});
	};
}

//use async debounce

const fetchData = async (query) => {
	console.log('Fetching for:', query);
	return `Result for ${query}`;
};

const debouncedFetch = debounceAsync(fetchData, 500);

debouncedFetch('apple').then(console.log).catch(console.error);
debouncedFetch('pear').then(console.log).catch(console.error);
