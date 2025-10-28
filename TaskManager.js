'use strict';

// let inputString = `6
// addTask high Finish_report
// addTask medium Call_client
// addTask low Water_plants
// getTasks high
// addTask urgent Fix_server
// getTasks urgent`;

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

// Collect input chunks
process.stdin.on('data', function (inputStdin) {
	inputString += inputStdin;
});

// When input ends, split by lines and call main()
process.stdin.on('end', function () {
	inputString = inputString.split('\n');
	main();
});

// Helper to read a line at a time
function readLine() {
	return inputString[currentLine++];
}

class TaskManager {
	highTasks = [];
	mediumTasks = [];
	lowTasks = [];

	addTask(priority, description) {
		if (!description) throw new Error('Description cannot be empty');
		if (!this.isValidPriority(priority))
			throw new Error('Invalid priority ' + priority);

		switch (priority) {
			case 'high':
				this.highTasks.push(description);
				break;
			case 'medium':
				this.mediumTasks.push(description);
				break;
			case 'low':
				this.lowTasks.push(description);
				break;
		}
	}

	getTasks(priority) {
		if (!this.isValidPriority(priority))
			throw new Error('Invalid priority ' + priority);

		switch (priority) {
			case 'high':
				return this.highTasks;
			case 'medium':
				return this.mediumTasks;
			case 'low':
				return this.lowTasks;
		}
	}

	isValidPriority(priority) {
		return ['high', 'medium', 'low'].includes(priority);
	}
}

function main() {
	const obj = new TaskManager();
	const operationCount = parseInt(readLine().trim());

	for (let i = 0; i < operationCount; i++) {
		const [operation, priority, description] = readLine().trim().split(' ');
		try {
			if (operation === 'addTask') {
				obj.addTask(priority, description ?? '');
			} else if (operation === 'getTasks') {
				const res = obj.getTasks(priority);
				console.log(res.length ? res.join(',') : 'No Tasks');
			}
		} catch (err) {
			console.log(err.toString());
		}
	}
}
