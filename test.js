// 1 .List all people from the United States.
// 2. For each country, list the two oldest people (if there are fewer than two people from a country, list all of them).

const people = [
	{ name: 'Alice', age: 34, country: 'United States' },
	{ name: 'Bob', age: 45, country: 'Canada' },
	{ name: 'Charlie', age: 29, country: 'United States' },
	{ name: 'Diana', age: 52, country: 'Canada' },
	{ name: 'Eve', age: 41, country: 'United Kingdom' },
	{ name: 'Frank', age: 60, country: 'United States' },
	{ name: 'Grace', age: 55, country: 'United Kingdom' },
];

// 1. List all people from United States
// const usPeople = people.filter((pep) => pep.country === 'United States'); // 1. Please solve
// console.log('People from United States:', usPeople);

// 2. Two oldest people from each country
// const oldestByCountry = {}; // 2. Please solve
// console.log('Two oldest people from each country:', oldestByCountry);

//group by country
//sort age

const oldestByCountry = people.reduce((acc, p) => {
	acc[p.country] = acc[p.country] || [];
	acc[p.country].push(p);
	return acc;
}, {});
console.log(oldestByCountry);

Object.keys(oldestByCountry).forEach((country) => {
	oldestByCountry[country] = oldestByCountry[country]
		.sort((a, b) => b.age - a.age)
		.slice(0, 2);
});

console.log(oldestByCountry);
