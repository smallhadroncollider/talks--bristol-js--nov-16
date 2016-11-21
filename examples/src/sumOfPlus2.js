import { reduce, map, add, compose } from "ramda";

let sumOfPlus2 = compose(reduce(add, 0), map(add(2)));
console.log(sumOfPlus2([1, 2, 3, 4, 5]));
