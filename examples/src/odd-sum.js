import { compose } from "ramda";

let add = (a, b) => a + b;
let odd = n => !!(n % 2);

let oddSum = compose(odd, add);

console.log(oddSum(4, 5)); // true
console.log(oddSum(4, 4)); // false
