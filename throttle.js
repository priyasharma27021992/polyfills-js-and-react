function throttle(func, delay) {
	let timeout = null;
	return (...args) => {
		if (!timeout) {
			func(...args);
			timeout = setTimeout(() => {
				timeout = null;
			}, delay);
		}
	};
}

//robust throttle with immediate, still does not include trailing run

function leadingThrottle(func, wait = 1000, immediate = false) {
	let lastCall = 0;
	let timeout = null;

	return function (...args) {
		const context = this;
		const now = Date.now();

		if (!immediate && !lastCall) lastCall = now;

		if (immediate && !lastCall) {
			func.apply(context, args);
			lastCall = now;
			return;
		}

		const remaining = wait - (now - lastCall);
		if (remaining <= 0) {
			lastCall = now;
			func.apply(context, args);
		} else if (!timeout) {
			timeout = setTimeout(() => {
				timeout = null;
				if (!immediate) func.apply(context, args);
				lastCall = immediate ? Date.now() : 0;
			}, remaining);
		}
	};
}

const throttledFunc = leadingThrottle(
	() => {
		console.log('Throttle function start at', new Date().toLocaleString());
	},
	1000,
	true
);

let count = 0;
const interval = setInterval(() => {
	console.log('Event', ++count);
	throttledFunc();

	if (count === 10) clearInterval(interval);
}, 300);
