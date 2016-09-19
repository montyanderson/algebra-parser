# algebra-parser

``` javascript
const Expression = require("./Expression.js");

const ex = new Expression("332x + 32 + 34x");

console.log(ex.stringify());
ex.multiply(4);
console.log(ex.stringify());
```

```
$ node index.js
332x + 32 + 34x
1328x + 1284 + 136x
```

## To Do

* ~~Parse positive polynomials~~
* ~~Factorize numeric constants~~
* Factorize symbolic constants
