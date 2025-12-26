Array.prototype.flatArr = function () {
	const insideFlat = (arr) => {
		const newArr = arr.reduce((acc, ele) => {
			if (Array.isArray(ele)) {
				const ret = insideFlat(ele);
				acc.push(...ret);
			} else {
				acc.push(ele);
			}
			return acc;
		}, []);
		return newArr;
	};
	return insideFlat(this);
};

[1, [2, [4, 5, [6, 7]]], 8].flatArr();
