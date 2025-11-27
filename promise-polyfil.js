const STATES = {
	PENDING: 'PENDING',
	FULFILLED: 'FULFILLED',
	REJECTED: 'REJECTED',
};
class MyPromise {
	constructor(executor) {
		this.state = STATES.PENDING;
		this.value = null;
		this.reason = null;
		this.fulfilledCbs = [];
		this.rejectedCbs = [];

		const resolve = (value) => {
			if (this.state !== STATES.PENDING) return;
			this.state = STATES.FULFILLED;
			this.value = value;
			this.fulfilledCbs.forEach((cb) => cb(value));
		};

		const reject = (error) => {
			if (this.state !== STATES.PENDING) return;
			this.state = STATES.REJECTED;
			this.reason = error;
			this.rejectedCbs.forEach((cb) => cb(reason));
		};

		try {
			executor(resolve, reject);
		} catch (error) {
			reject(error);
		}
	}

	then(onFullfilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			const onFullfilledHandler = (value) => {
				try {
					const result = onFullfilled ? onFullfilled(value) : this.value;
					resolve(result);
				} catch (err) {
					reject(err);
				}
			};

			const onRejectedHandler = () => {
				try {
					const result = onRejected ? onRejected(reason) : this.reason;
					resolve(result);
				} catch (err) {
					reject(err);
				}
			};

			if (this.state === STATES.FULFILLED) {
				onFullfilledHandler(this.value);
			} else if (this.state === STATES.REJECTED) {
				onRejectedHandler(this.reason);
			} else {
				this.fulfilledCbs.push(onFullfilledHandler);
				this.rejectedCbs.push(onRejectedHandler);
			}
		});
	}

	catch(cb) {
		return this.then(null, cb);
	}

	finally(cb) {
		return this.then(
			(val) => {
				cb();
				return val;
			},
			(reason) => {
				cb();
				return reason;
			}
		);
	}
}

const p1 = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve(
			'Hello My love! You are doing awesome! Keep going darling! You will see the results of your hardwork'
		);
	}, 500);
});

p1.then(console.log).catch((err) => console.log(err));
