const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function count(arr, item) {
	let c = 0;

	for(let i = 0; i < arr.length; i++) {
		if(arr[i] === item) c++;
	}

	return c;
}

module.exports = class Expression {
	constructor(str) {
		this.terms = str.replace(new RegExp(" ", "g"), "").split("+").map((str) => {
			let i;
			let n = 0;
			const co = [];

			for(i = 0; parseInt(str[i]) > -1; i++) {
				n *= 10;
				n += parseInt(str[i]);
			}

			co.push(n);

			const c = str[i];
			if(c) co.push(c);

			return co;
		});
	}

	factorize() {
		this.terms.forEach(term => {
			let n = 1;

			term.filter(a => typeof a == "number").forEach((a, i) => {
				n *= a;
				term.splice(i, 1);
			});

			term.unshift(n);
		});
	}

	multiply(n) {
		this.terms.forEach((term) => {
			term.push(n);
		});

		this.factorize();
	}

	/*
	differentiate(c) {
		this.terms.forEach(term => {
			if(term.indexOf(c) > -1) {
				term.splice(term.indexOf(c), 1);
				term.push()
			}


		});
	}
	*/

	stringify() {
		return this.terms.map(t => t.join("")).join(" + ");
	}
};