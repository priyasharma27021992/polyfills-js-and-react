/*
Class Way
*/

// class IssueTracker {
// 	constructor() {
// 		this.openIssues = [];
// 		this.inProgressIssues = [];
// 		this.resolved = [];
// 	}

// 	isValidState(state) {
// 		return state === 'open' || state === 'inProgress' || state === 'resolved';
// 	}

// 	addIssue(state, title) {
// 		if (!title) {
// 			throw new Error('Title cannot be empty');
// 		}

// 		if (!this.isValidState(state)) throw new Error(`Invalid state ${state}`);

// 		switch (state) {
// 			case 'open':
// 				this.openIssues.push(title);
// 				break;
// 			case 'inProgress':
// 				this.inProgressIssues.push(title);
// 				break;
// 			case 'resolved':
// 				this.resolved.push(title);
// 				break;
// 			default:
// 				return this;
// 		}
// 		return this;
// 	}

// 	getIssues(state) {
// 		if (!this.isValidState(state)) throw new Error(`Invalid state ${state}`);

// 		switch (state) {
// 			case 'open':
// 				return this.openIssues;
// 			case 'inProgress':
// 				return this.inProgressIssues;
// 			case 'resolved':
// 				return this.resolved;
// 			default:
// 				return this;
// 		}
// 	}

// 	getAllIssues() {
// 		return {
// 			open: [...this.openIssues],
// 			inProgress: [...this.inProgressIssues],
// 			resolved: [...this.resolved],
// 		};
// 	}

// 	searchIssues(keyword) {
// 		return Object.values(this.getAllIssues()).filter((issue) =>
// 			issue.includes(keyword)
// 		);
// 	}
// }

/*
    Function Way
*/
// function IssueTracker() {
// 	this.state = {
// 		open: [],
// 		inProgress: [],
// 		resolved: [],
// 	};
// }
// IssueTracker.prototype.isValidState = function (state) {
// 	return Object.hasOwn(this.state, state);
// };

// IssueTracker.prototype.addIssue = function (state, title) {
// 	if (!title) {
// 		throw new Error('Title cannot be empty');
// 	}
// 	if (!this.isValidState(state)) throw new Error(`Invalid state ${state}`);

// 	this.state[state].push(title);
// 	return this;
// };

// IssueTracker.prototype.getIssues = function (state) {
// 	if (!this.isValidState(state)) throw new Error(`Invalid state ${state}`);

// 	return this.state[state];
// };

// IssueTracker.prototype.getAllIssues = function () {
// 	// return Object.values(this.state).reduce((acc, val) => acc.push(...val), []);
// 	return Object.values(this.state).flat();
// };

// IssueTracker.prototype.searchIssues = function (keyword) {
// 	return this.getAllIssues().filter((ele) =>
// 		ele.toLowerCase().includes(keyword.toLowerCase())
// 	);
// };

function createIssueTracker() {
	const state = {
		open: [],
		inProgress: [],
		resolved: [],
	};

	return {
		addIssue(stateName, title) {},
		getIssues(stateName) {},
		getAllIssues() {},
		searchIssues(keyword) {},
	};
}

const tracker = new IssueTracker();

tracker.addIssue('open', 'Login button not working');
tracker.addIssue('inProgress', 'Fix homepage layout');
tracker.addIssue('resolved', 'Update privacy policy');
tracker.addIssue('open', 'Signup form error');

console.log(tracker.getIssues('open'));
// Output: ['Login button not working', 'Signup form error']

console.log(tracker.searchIssues('fix'));
// Output: ['Fix homepage layout']

console.log(tracker.getAllIssues());
// Output:
// {
//   open: ['Login button not working', 'Signup form error'],
//   inProgress: ['Fix homepage layout'],
//   resolved: ['Update privacy policy']
// }
