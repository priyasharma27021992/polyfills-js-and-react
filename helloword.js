// console.log('Hello World!');

// const foo = []
// foo.push('fdsfd')
// console.log(foo)

/* 
 Change JS code to:
 - still use variable named {lastId} to generate next id,
 - disallow global {lastId} access to the variable
   (make it "private").
 Structure the code, all the variable and function
 definitions as you like.
*/

function getID() {
	let lastId = 0;
	return () => lastId++;
}

const getIDID = getID();

var output = '';
output += 'getID: ' + getIDID() + ' ' + getIDID() + ' ' + getIDID();

try {
	output += ', lastId = ' + lastId;
} catch (e) {
	output += ', lastId is undefined';
}
console.log('EXPECTED:');
console.log('getID: 0 1 2, lastId is undefined');
console.log('ACTUAL:');
console.log(output);
