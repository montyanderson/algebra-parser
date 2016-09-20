const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function count(arr, item) {
	let c = 0;

	for(let i = 0; i < arr.length; i++) {
		if(arr[i] === item) c++;
	}

	return c;
}

function compare(arr0, arr1) {
	if(arr0.length !== arr1.length) return false;

	arr0 = arr0.slice();
	arr1 = arr1.slice();

	arr0.sort();
	arr1.sort();

	for(let i = 0; i < arr0.length; i++) {
		if(arr0[i] !== arr1[i]) return false;
	}

	return true;
}

function sum(arr) {
	let n = 0;

	arr.forEach(a => n += a);

	return n;
}

function times(arr) {
	let n = 1;

	arr.forEach(a => n *= a);

	return n;
}

const isNumeric = (a) => typeof a === "number";
const isSymbolic = (a) => typeof a === "string";

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

	sort() {
		this.terms.forEach(term => {
			let n = 1;

			term.filter(isNumeric).forEach((a, i) => {
				n *= a;
				term.splice(i, 1);
			});

			term.unshift(n);
		});

		this.terms.forEach(a => {
			this.terms.forEach((b, i) => {
				if(a === b) return;

				if(compare(a.filter(isSymbolic), b.filter(isSymbolic))) {
					const aSum = sum(a.filter(isNumeric).map(n => {
						a.splice(a.indexOf(n), 1);
						return n;
					}));

					a.push(aSum + sum(b.filter(isNumeric)));
					this.terms.splice(i, 1);
				}
			});
		});

		this.terms.forEach(t => {
			t.sort((a, b) => {
				if(isNumeric(a) && isNumeric(b)) return 0;
				if(isSymbolic(a) && isSymbolic(b)) return 0;
				if(isNumeric(a) && isSymbolic(b)) return -1;
				if(isSymbolic(a) && isNumeric(b)) return 1;
			});
		});

		this.terms.sort((a, b) => {
			if(a.length == b.length) return 0;
			if(a.length < b.length) return 1;
			if(a.length > b.length) return -1;
		});
	}

	multiply(n) {
		this.terms.forEach(term => {
			term.push(n);
		});

		this.sort();
	}

	stringify() {
		return this.terms.map(t => t.join("")).join(" + ");
	}
};
