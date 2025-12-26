Array.prototype.flatArr = function () {
	console.log('this', this);
	const res = [];
	const flat = (arr) => {
		for (let i = 0; i < arr.length; i++) {
			if (Array.isArray(arr[i])) {
				flat(arr[i]);
			} else {
				res.push(arr[i]);
			}
		}
	};
	flat(this);
	console.log('res', res);
	return res;
};

[1, [2, [4, 5, [6, 7]]], 8].flatArr();
