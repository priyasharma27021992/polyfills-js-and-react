Object.prototype.myAssign = (target, ...sources) => {
	if (target === null || target === undefined) {
		throw new TypeError('Cannot convert null or undefinedto object');
	}

	const to = Object(target);

	for (const source of sources) {
		for (const property in source) {
			if (source === null) return;
			if (Object.hasOwn(source, property)) {
				to[property] = source[property];
			}
		}
	}
	return to;
};

//example
const target = { a: 1, b: 1 };
const source = { b: 4, d: 9 };
const returnedTarget = Object.myAssign(target, source, { d: 8, n: 0 });
console.log('returnedTarget', returnedTarget);
console.log(returnedTarget === target);
