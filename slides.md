# Bristol JS

Functional Programming with JavaScript

---

## What I Won't be Talking About

- Functors
- Monads
- Tail Call Optimisation
- Category Theory

---

<iframe width="100%" height="100%" src="https://www.youtube.com/embed/eetWam3nhoM" frameborder="0" allowfullscreen></iframe>

---

## Spot the Issue

How can we tidy up this code?

```javascript
var doSomething = function (e) {
    e.preventDefault();
};

document.body.addEventHandler("click", function (e) {
    return doSomething(e);
});
```

---

## Ye Olden Times

Does anyone remember this?

```javascript
var doSomething = function () {
    alert("You did a thing!");
};

setTimeout("doSomething", 1000);
```
---

## Some Functions You May Know

Filter, Map, and Reduce

```javascript
var numbers = [1, 2, 3, 4, 5, 6];

var oddNumbers = numbers.filter(function (n) {
    return n % 2;
}); // [1, 3, 5]

var squares = numbers.map(function (n) {
    return n * n;
}); // [1, 4, 9, 16, 25, 36]

var sum = numbers.reduce(function (acc, n) {
    return acc + n;
}, 0); // 21
```

---

## Notes on Style

I'll be using ES6 `let` and arrow syntax from now on:

```javascript
// old skool
var add = function (a, b) {
        return a + b;
    };

// nice
let add = (a, b) => a + b;
```

I'll also be using [Ramda.js](http://ramdajs.com) and [Immutable.js](https://facebook.github.io/immutable-js/)

---

## Side Effects

Ideally, we want to avoid side-effects:

```javascript
let letters = ["a", "b", "c", "d", "e"];

let last = arr => arr.pop();

let e = last(letters);

console.log(e); // "e"
console.log(letters);  // ["a", "b", "c", "d"]
```

```javascript
let letters = ["a", "b", "c", "d", "e"];

let last = arr => arr.slice().pop();

let e = last(letters);

console.log(e); // "e"
console.log(letters);  // ["a", "b", "c", "d", "e"]
```

---

## Filter

```javascript
import { List } from "immutable";

let numbers = List([1, 2, 3, 4, 5, 6]);

let oddNumbers = numbers.filter(n => n % 2); // [1, 3, 5]
```

Let's pull the odd function out:

```javascript
import { List } from "immutable";

let numbers = List([1, 2, 3, 4, 5, 6]);

let odd = n => n % 2;
let even = n => !odd(n);

let oddNumbers = numbers.filter(odd);
let evenNumbers = numbers.filter(even);

console.log(oddNumbers); // [1, 3, 5]
console.log(evenNumbers); // [2, 4, 6]
```

---

## Composition

Composition lets us create a new function out of functions that already exist:

```javascript
import { List } from "immutable";
import { compose } from "ramda";

let numbers = List([1, 2, 3, 4, 5, 6]);

let odd = n => n % 2;
let not = n => !n;

// Compose odd and not
let even = compose(not, odd); 

let evenNumbers = numbers.filter(even);
console.log(evenNumbers); // [2, 4, 6]
```

- First `n` gets passed into `odd`, returning a truthy (`!0`) or falsey (`0`)
- Then, the result of `odd(n)`, gets passed into `not`, which negates the value passed in

Same as doing `let even = n => not(odd(n))`



---

## Currying

Currying allows you to do "partial application" of a function

---

# Example

---

## Challenge

Log the combined ages of all the coders below:

```json
[{
    "name": "Alice",
    "age": 42
},
{
    "name": "Bob",
    "age": 54
},
{
    "name": "Carol",
    "age": 27
}];
```

---

# Live Coding

Watch me typing!

---

## Surely OO is better?

- By using ES6 modules you can still keep related functions in a single file 
- Functional programming enforces OO best-practices:
    - Single Responsibility: FP encourages writing small functions that do a single thing 
    - Open/Closed: if a function does one thing well it shouldn't ever need to be changed
    - Prefer Composition over Inheritance: compose all the things
    - Dependency Injection: the only way to do non-side effect based programming
- Programming using `this` in JavaScript can be a nightmare

---

## Further Reading

#### Basic

- [Functional JavaScript](http://shop.oreilly.com/product/0636920028857.do) by Michael Fogus
- [JavaScript Allongé](https://leanpub.com/javascriptallongesix) by Reginald Braithwaite
- [Functional Programming for the OO Programmer](https://leanpub.com/fp-oo) by Brian Marick

#### Advanced

- [Professor Frisby's Mostly Adequate Guide to Functional Programming](https://github.com/MostlyAdequate/mostly-adequate-guide) by Brian Lonsdorf

---

## Slides

[http://tiny.cc/bjs-fp](https://github.com/smallhadroncollider/talks--bristol-js--nov-16)
