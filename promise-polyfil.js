const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
	constructor(executor) {
		this.state = PENDING;
		this.value = undefined;
		this.reason = undefined;
		this.fulfilledCallbacks = [];
		this.rejectedCallbacks = [];

		//they are not defined as this.resolve as they are not avilable in actual promise class too.
		// Also, they are private closures
		const resolve = (value) => {
			if (this.state !== PENDING) return;
			this.state = FULFILLED;
			this.value = value;
			queueMicrotask(() => {
				this.fulfilledCallbacks.forEach((cb) => cb(value));
			});
		};

		const reject = (reason) => {
			if (this.state !== PENDING) return;
			this.state = REJECTED;
			this.reason = reason;
			queueMicrotask(() => {
				this.rejectedCallbacks.forEach((cb) => cb(reason));
			});
		};

		try {
			executor(resolve, reject);
		} catch (error) {
			reject(error);
		}
	}

	then(onFulFilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			const onFulFilledHandler = () => {
				try {
					const result = onFulFilled ? onFulFilled(this.value) : this.value;
					resolve(result);
				} catch (err) {
					reject(err);
				}
			};

			const onRejectedHandler = () => {
				try {
					const result = onRejected ? onRejected(this.reason) : this.reason;
					reject(result);
				} catch (err) {
					reject(err);
				}
			};

			if (this.state === FULFILLED) {
				console.log('came here 1', this);
				queueMicrotask(() => {
					onFulFilledHandler(this.value);
				});
			} else if (this.state === REJECTED) {
				console.log('came here 2', this);
				queueMicrotask(() => {
					onRejectedHandler(this.reason);
				});
			} else {
				this.fulfilledCallbacks.push(onFulFilledHandler);
				this.rejectedCallbacks.push(onRejectedHandler);
			}
		});
	}

	catch(onRejected) {
		return this.then(null, onRejected);
	}

	finally(callback) {
		return this.then(
			(val) => {
				callback();
				return val;
			},
			(reason) => {
				callback();
				throw reason;
			}
		);
	}
}

const promise = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		reject(10);
	});
})
	.then((val) => val * 10)
	.then(
		(val) => console.log(val),
		(val) => console.log(val * 12)
	);

const rejectPromise = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		reject('hello baby');
	}, 2000);
}).catch((error) => {
	console.log(error);
});
