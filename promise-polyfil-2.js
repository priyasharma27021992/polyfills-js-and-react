const STATES = {
	PENDING: 'PENDING',
	FULFILLED: 'FULFILLED',
	REJECTED: 'REJECTED',
};

//promise settled means it is either fulfiiled or rejected

class Promise {
	constructor(executor) {
		this.state = STATES.PENDING;
		this.successCallbacks = [];
		this.rejectedCallbacks = [];

		function resolve(value) {
			if (this.state !== STATES.PENDING) return;
			this.state = STATES.FULFILLED;
			this.successCallbacks((cb) => cb(value));
		}

		function reject(error) {
			if (this.state !== STATES.PENDING) return;
			this.state = STATES.REJECTED;
			this.rejectedCallbacks((cb) => cb(error));
		}

		try {
			executor(resolve, reject);
		} catch (error) {
			reject(error);
		}
	}

	then(onFullfilled, onRejected) {}

	catch(error) {}

	finally(cb) {}
}
