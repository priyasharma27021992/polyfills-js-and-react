export function filterQuery(url, denyList) {
	const result = [];
	const [base, query] = url.split('?');
	if (!query) return base;

	const seen = new Set();
	const deny = new Set(denyList);

	const pairs = query.split('&');

	for (const pair of pairs) {
		const [key, value] = pair.split('=');
		if (seen.has(key) || deny.has(key)) continue;

		seen.add(key);
		result.push(`${key}=${value}`);
	}

	return result.length ? `${base}?${result.join('&')}` : base;
}

export function filterQueryWay2(url, denyList) {
	//I need the base
	//I need the query params
	const result = [];
	const [base, query] = url.split('?');

	if (!query) return base;

	const seen = [];

	const filtered = query.split('&').filter((pair) => {
		const [key, _] = pair.split('=');
		if (seen?.includes(key) || denyList?.includes(key)) {
			return false;
		}
		seen.push(key);
		return true;
	});
	return filtered.length ? `${base}?${filtered.join('&')}` : base;
}

console.log(filterQueryWay2('https://www.trivago.com?a=1&b=2&a=2'));
