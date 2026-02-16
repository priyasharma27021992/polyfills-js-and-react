class MyPromise {
	constructor(executor) {
		this.state = 'PENDING';
		this.fullfilledCbs = [];
		this.rejectedCbs = [];
		this.value = null;
		this.reject = null;
		const resolve = (value) => {
			if (this.state !== 'PENDING') return;
			this.state = 'COMPLETED';
			this.value = value;
			this.fullfilledCbs.forEach((cb) => cb(value));
		};

		const reject = (reason) => {
			if (this.state !== 'PENDING') return;
			this.state = 'REJECTED';
			this.reason = reason;
			this.rejectedCbs.forEach((cb) => cb(reason));
		};

		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	then(onFullfilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			const onFullfilledHandler = (value) => {
				const result = onFullfilled ? onFullfilled(value) : value;
				resolve(result);
			};

			const onRejectedHandler = (reason) => {
				const reas = onRejected ? onRejected(reason) : reason;
				reject(reas);
			};

			if (this.state === 'COMPLETED') {
				onFullfilledHandler(this.value);
			} else if (this.state === 'REJECTED') {
				onRejectedHandler(this.reason);
			} else {
				this.fullfilledCbs.push(onFullfilledHandler);
				this.rejectedCbs.push(onRejectedHandler);
			}
		});
	}

	catch(cb) {
		return this.then(null, cb);
	}

	finally(cb) {
		return this.then(
			(value) => {
				cb();
				return value;
			},
			(reason) => {
				cb();
				return reason;
			},
		);
	}
}

const promise = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve('Priya is working smartly hard');
	}, 1000);
});

console.log('I am here');
promise
	.then((val) => console.log(val))
	.finally((val) => {
		console.log('Just keep going');
		console.log('finally', val);
	});

const promise2 = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		reject('Even if rejected, I am aiming for moon, I will get stars');
	}, 1000);
});

promise2.catch(console.log);
