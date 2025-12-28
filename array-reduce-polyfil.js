Array.prototype.myReduce = function (...args) {
	const hasInitialValue = args.length > 1;
	if (this.length === 0 && !hasInitialValue) {
		throw new Error();
	}
	const cb = args[0];
	let acc = hasInitialValue ? args[1] : this[0];
	let i = hasInitialValue ? 0 : 1;
	while (i < this.length) {
		acc = cb(acc, this[i], i, this);
		i++;
	}
	return acc;
};
