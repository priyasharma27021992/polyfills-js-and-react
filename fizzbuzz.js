function fizzbuzzWay1(n) {
	return Array.from({ length: n }, (v, i) => {
		if (i % 3 === 0 && i % 5 === 0) {
			return 'fizzbuzz';
		}
		if (i % 3 === 0) return 'fizz';
		if (i % 5 === 0) return 'buzz';
		return i;
	});
}

function fizzbuzzWay2(n) {
	const result = [];
	for (let i = 0; i < n; i++) {
		if (i % 3 === 0 && i % 5 === 0) {
			result.push('fizzbuzz');
		} else if (i % 3 === 0) result.push('fizz');
		else if (i % 5 === 0) result.push('buzz');
		result.push(i);
	}
	return result;
}

function fizzbuzzWay3(n) {
	const result = Array(n).fill(0);

	return result.map((_, i) => {
		if (i % 3 === 0 && i % 5 === 0) {
			return 'fizzbuzz';
		}
		if (i % 3 === 0) return 'fizz';
		if (i % 5 === 0) return 'buzz';
		return i;
	});
}

fizzbuzzWay3(10).forEach((e) => console.log(e));
