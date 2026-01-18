Array.prototype.flatArr = function (level) {
	const result = [];

	function flat(arr) {
		for (let i = 0; i < arr.length; i++) {
			if (Array.isArray(arr[i])) {
				flat(arr[i]);
			} else {
				result.push(arr[i]);
			}
		}
	}

	flat(this);
	return result;
};

console.log('Default flat', [1, [2, [4, 5, [6, 7]]], 8].flat(3));
console.log('Created flat function', [1, [2, [4, 5, [6, 7]]], 8].flatArr());
