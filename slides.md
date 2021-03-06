# Bristol JS

Functional Programming with JavaScript

---

## What I Won't Be Talking About

- Functors
- Monads
- Tail Call Optimisation
- Category Theory

---

## What I Will Be Talking About

- First Class Functions
- `map`, `reduce`, and `filter`
- Functional Composition
- Partial Application (currying)

---

## First Class Functions

In JavaScript functions can be treated just like any other variable: you can pass them to functions and return them from functions. 

```javascript
var makeLogger = function (message) {
    return function () {
        console.log(message);
    };
}

var run = function (fn) {
    return fn(); 
};

var hello = makeLogger("hello");
run(hello); // "hello"
```

---

## The Before Times 

Does anyone remember this?

```javascript
var doSomething = function () {
    alert("You did a thing!");
    document.write("<marquee>Woo!</marquee>");
};

//             nice!
//               ↓
setTimeout("doSomething()", 1000);
```

---

## Referencing vs Executing

The first mental leap to mastering functional JavaScript:

```javascript
var doSomething = function () {
    console.log("Something!");
};

setTimeout(doSomething(), 1000); // will try to run the return value of doSomething in 1 second
setTimeout(doSomething, 1000); // runs doSomething in one second
```

---

## Spot the Inefficiency

How can we tidy up this code?

```javascript
var doSomething = function (e) {
    e.preventDefault();

    // do something 
};

document.body.addEventHandler("click", function (e) {
    return doSomething(e);
});
```

---

## Spot the Inefficiency

We can call the function directly, as it takes the same arguments as the wrapper function:

```javascript
var doSomething = function (e) {
    e.preventDefault();

    // do something 
};

document.body.addEventHandler("click", doSomething); 
```

---

## A Side Note on Style

I'll be using ES6 `let`, `import`, and arrow syntax for a lot of the examples:

```javascript
// ES5 
var add = function (a, b) {
    return a + b;
};


// ES6
let add = (a, b) => a + b;
```

I'll also be using [Ramda.js](http://ramdajs.com) - it's like a functional Lodash/Underscore

---

# Familiar Functions

---

## Filter

The array `filter` method iterates over each item in an array and returns a new array containing only those items which return `true` when passed to the given function:

```javascript
let numbers = [1, 2, 3, 4, 5, 6];

let oddNumbers = numbers.filter(function (n) {
    return n % 2;
});

console.log(oddNumbers); // [1, 3, 5]
```

Let's make this a bit more modular: 

```javascript
let numbers = [1, 2, 3, 4, 5, 6];

let odd = n => !!(n % 2);

let oddNumbers = numbers.filter(odd);

console.log(oddNumbers); // [1, 3, 5]
```

---

## Map 

The array `map` method iterates over each item in an array and returns a new array where each item has been transformed using the given function:

```javascript
let numbers = [1, 2, 3, 4, 5, 6];

let squares = numbers.map(function (n) {
    return n * n;
});

console.log(squares); // [1, 4, 9, 16, 25, 36]
```

Let's make this a bit more modular: 

```javascript
let numbers = [1, 2, 3, 4, 5, 6];

let square = n => n * n;

let squares = numbers.map(square);

console.log(squares); // [1, 4, 9, 16, 25, 36]
```

---

## Reduce 

The array `reduce` method iterates over each item in an array and reduces them down to a single value using the given function:

```javascript
let numbers = [1, 2, 3, 4, 5, 6];

// acc is the cumulative returned value (which we've set to 0 to start)
let sum = numbers.reduce(function (acc, n) {
    return acc + n;
}, 0);

console.log(sum); // 21
```

Let's make this a bit more modular: 

```javascript
let numbers = [1, 2, 3, 4, 5, 6];

let add = (a, b) => a + b;

let sum = numbers.reduce(add, 0);

console.log(sum); // 21
```

---

## Emergent Functions

We've, almost inadvertently, created some useful little functions:

```javascript
let add = (a, b) => a + b;

let square = n => n * n;

let odd = n => !!(n % 2);
```

Unless the laws of mathematics change, these functions will *never* need to be changed at some point in the future.

---

## A Side Note on Side Effects

Ideally, we want to avoid side-effects.

#### Bad

```javascript
let letters = ["a", "b", "c", "d", "e"];

let last = arr => arr.pop();
let e = last(letters);

console.log(e); // "e"
```

#### Good

```javascript
let letters = ["a", "b", "c", "d", "e"];

let last = arr => arr.slice().pop();
let e = last(letters);

console.log(e); // "e"
```

---

# Functional Composition

---

## Composition

Composition lets us create a new function out of functions that already exist:

```javascript
import { compose } from "ramda";

let not = n => !n; // actually included in Ramda
let odd = n => !!(n % 2);

// Compose odd and not
let even = compose(not, odd);  // a "point-free" function (does not define its own arguments)

even(4); // true
```

What's happened here?

- First `4` gets passed into `odd`, returning `true`
- Then, this result gets passed into `not`, which negates the value passed in, giving us `false`

Same as doing `let even = n => not(odd(n))`

---

## Arguments

1. The first function (the right-most one) can take multiple arguments
2. All other functions in the composition can only take a single argument (the return value of the function to its right)

```javascript
import { compose } from "ramda";

let add = (a, b) => a + b;
let odd = n => !!(n % 2);

let oddSum = compose(odd, add);

oddSum(4, 5); // true
oddSum(4, 4); // false
```

---

# Partial Application

or "currying"

---

## Partial Application 

Say we want a function that adds 2 to whatever we pass in:

```javascript
let add2 = n => n + 2;

add2(2); // 4
add2(8); // 10
```

What if we want one that adds 3?

```javascript
let add3 = n => n + 3;
```

What if we want one that adds 4?

```javascript
let add4 = n => n + 4;
```

---

## Partial Application 

Can we generalise the creation of adder functions?

```javascript
let makeAdder = function (add) {
    return function (x) {
        return x + add;
    }
}; // or, in ES6 `let makeAdder = add => x => add + x;`

let add2 = makeAdder(2);
let add5 = makeAdder(5);

add2(3); // 5
add5(5); // 10
```

---

## Partial Application

But what if I actually just want to add two numbers together:

```javascript
// add 2 + 3
let add2 = makeAdder(2);
let result = add2(3);
```

Can we get the best of both worlds?

```javascript
import { curry } from "ramda";

let add = curry((a, b) => a + b); // we curry the whole function, not the return value

let result = add(2, 3); // 5
let add2 = add(2);
let five = add2(3); // 5
```

`curry` lets us call a function in parts. If all the arguments have been given the function will execute, otherwise it will return a new curried function ready to take the rest of the arguments.

---

## Partial Application

This can be very useful when used with `filter`, `map`, and `reduce`:

```javascript
// ramda provides a curried version of filter, map, and reduce
import { filter } from "ramda";

let odd = n => !!(n % 2); // no point currying a unary function

// ramda's curried filter takes the function first and the array second
let filterOdd = filter(odd);

filterOdd([1, 2, 3, 4, 5, 6]); // [1, 3, 5]
filterOdd([101, 102, 103, 104, 105, 106]); // [101, 103, 105]
```

---

## Partial Application

```javascript
import { add, map } from "ramda";

// Both map and add are curried - in fact, all Ramda functions are curried!
let mapPlus2 = map(add(2));

mapPlus2([1, 2, 3, 4, 5]); // [3, 4, 5, 6, 7]
mapPlus2([2, 5, 8]); // [4, 7, 10]
```

---

## Partial Application

```javascript
import { reduce } from "ramda";

let sum = reduce(add, 0); // sum is actually provided by Ramda

sum([1, 2, 3, 4, 5]); // 15
sum([1, 3, 5, 7, 9]); // 25
```

---

## Ordering 

The order of arguments for curried functions is very important.

If you want curried functions to be composable, generally you'll want to pass functions in first and the data last.

```javascript
import { curry } from "ramda";

// not very useful
let map = curry(function(array, fn) {
    return array.map(fn);
});

// very useful
let map = curry(function(fn, array) {
    return array.map(fn);
});
```

[Hey Underscore, You're Doing it Wrong](https://www.youtube.com/watch?v=m3svKOdZijA)

---

## Partial Application with Composition

You'll remember that with composition all but the right-most function must be unary:

```javascript
let evenAdd = compose(not, odd, add);
evenAdd(3, 5); // works, as add takes two arguments, then odd and not take one

let broken = compose(add, not);
broken(3); // won't work, as not returns a single value, but add requires two arguments
```

However, using curried functions, we an get around this limitation (to some extent):

```javascript
let addPlus2 = compose(add(2), add);
addPlus2(3, 4); // 9

let sumOfPlus2 = compose(reduce(add, 0), map(add(2)));
sumOfPlus2([1, 2, 3, 4, 5]); // 25
```

---

# Example

Procedural to Functional in 10 Steps

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

# Criticisms

---

## JavaScript Isn't A Real Functional Language

<iframe width="100%" height="75%" src="https://www.youtube.com/embed/eetWam3nhoM" frameborder="0" allowfullscreen></iframe>

---

## OO Is Best

- By using ES6 modules you can still keep related functions in a single file 

- Programming using `this` in JavaScript can be a nightmare (although much better with ES6)

- Functional programming enforces many OO best-practices:
    - Single Responsibility: FP encourages writing small functions that do a single thing 
    - Open/Closed: if a function does one thing well it shouldn't ever need to be changed
    - Prefer Composition Over Inheritance: compose all the things
    - Dependency Injection: the only way to do non-side effect based programming

- Functions are very easy to test: inject everything and no side-effects

- You can use a functional style within OO code and get the best of both worlds

---

## Functional Programming Is Less Performant

In JavaScript this one is true...

- But it's unlikely to have a noticeable effect in anything except the most processor intensive applications (e.g. games).

- You *can* build very complex apps using a functional style without any noticeable performance issues.

- JS engines are constantly improving the performance of functional code - and it will only get better.

- Because the code is highly modular, you can always tweak individual functions to get easy performance improvements.

---

## Further Reading

#### Basic

- [Functional JavaScript](http://shop.oreilly.com/product/0636920028857.do) by Michael Fogus
- [JavaScript Allongé](https://leanpub.com/javascriptallongesix) by Reginald Braithwaite
- [Functional Programming for the OO Programmer](https://leanpub.com/fp-oo) by Brian Marick

#### Advanced

- [Professor Frisby's Mostly Adequate Guide to Functional Programming](https://github.com/MostlyAdequate/mostly-adequate-guide) by Brian Lonsdorf

#### Other Functional Languages

- [PureScript by Example](https://leanpub.com/purescript/read) by Phil Freeman
- [Learn You A Haskell for Great Good](http://learnyouahaskell.com) by Miran Lipovača
- [The Structure and Interpretation of Computer Programs](https://mitpress.mit.edu/sicp/) by Hal Abelson, Jerry Sussman, and Julie Sussman
- [The Little Schemer](https://mitpress.mit.edu/books/little-schemer) by Daniel P. Friedman and Matthias Felleisen

---

## Slides

[http://tiny.cc/bjs-fp](https://github.com/smallhadroncollider/talks--bristol-js--nov-16)
