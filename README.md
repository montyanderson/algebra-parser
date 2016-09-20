# algebra-parser

``` javascript
const Expression = require("./Expression.js");

const ex = new Expression("12x + 23 + 21 + 1x + 32x + 120 + 19x");

console.log(ex.stringify());
ex.sort();
console.log(ex.stringify());
ex.multiply(8);
console.log(ex.stringify());
```

```
$ node index.js
12x + 23 + 21 + 1x + 32x + 120 + 19x
64x + 164
512x + 13128
```

## To Do

* ~~Parse positive polynomials~~
* ~~Sum numeric constants~~
* ~~Find like terms by common symbolic constants~~
* Differentiation
