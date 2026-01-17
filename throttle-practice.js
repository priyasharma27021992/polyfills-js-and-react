function throttle(func, delay) {
	let timeout = null;
	return function (...args) {
		if (!timeout) {
			func.apply(this, args);
			timeout = setTimeout(() => {
				timeout = null;
			}, delay);
		}
	};
}

const throttledLog = throttle(() => {
	console.log('called', Date.now().toString());
}, 1000);

setInterval(() => {
	throttledLog();
}, 200);
