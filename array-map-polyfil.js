Array.prototype.myMap = function (callback) {
	let result = [];
	for (let i = 0; i < this.length; i++) {
		if (i in this) result.push(callback(this[i], i, this));
	}
	return result;
};

let arr = [1, 2, 3, 4].myMap((x) => x * 2);
console.log(arr);
