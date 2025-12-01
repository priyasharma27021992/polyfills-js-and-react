class Singleton {
	constructor() {
		if (Singleton.instance) return Singleton.instance;
		this.logs = [];
		Singleton.instance = this;
	}

	log(message) {
		this.logs.push(message);
	}
}

const logger1 = new Singleton();
const logger2 = new Singleton();
console.log(logger1 === logger2);
