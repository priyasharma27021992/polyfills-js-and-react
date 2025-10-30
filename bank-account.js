function createBankAccount(owner1, initialBalance1) {
	let owner = owner1;
	let balance = initialBalance1;

	return {
		deposit(amount) {
			balance += amount;
		},
		withdraw(amount) {
			if (amount > balance) throw new Error('Insuffiecient funds');
			balance -= amount;
		},
		getBalance() {
			return balance;
		},
		getSummary() {
			return `Account of ${owner} has ${balance} balance`;
		},
	};
}

const acc1 = createBankAccount('Alice', 500);
const acc2 = createBankAccount('Bob', 1000);

acc1.deposit(200);
acc1.withdraw(100);

console.log(acc1.getBalance()); // 600
console.log(acc1.getSummary()); // "Account of Alice — Balance: 600"

acc2.withdraw(300);
console.log(acc2.getSummary()); // "Account of Bob — Balance: 700"

console.log(acc1.balance); // ❌ undefined
console.log(acc2.owner); // ❌ undefined
