import { compose } from "ramda";

let numbers = [1, 2, 3, 4, 5, 6];
let not = n => !n;
let odd = n => !!(n % 2);

// Compose odd and not
let even = compose(not, odd); 

let evenNumbers = numbers.filter(even);
console.log(evenNumbers); // [2, 4, 6]
