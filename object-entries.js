Object.prototype.myEntries = (obj) => {
	if (obj === undefined || obj === null)
		throw new Error('TypeError: Cannot convert undefined or null to object');

	const res = [];
	for (let key in obj) {
		if (!Object.hasOwn(obj, key)) continue;
		res.push([key, obj[key]]);
	}
	return res;
};

const obj = { a: 1, b: 2 };
for (const [key, value] of Object.myEntries(obj)) {
	console.log(`${key}:${value}`);
}

// for (const [key, value] of Object.entries(obj)) {
// 	console.log(`${key}:${value}`);
// }
