const Expression = require("./Expression.js");

const ex = new Expression("332x + 32 + 34x");

console.log(ex.stringify());
ex.multiply(4);
console.log(ex.stringify());
