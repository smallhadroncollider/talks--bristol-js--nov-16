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

## v1

Let's start with the old-school mostly procedural style: 

```javascript
fetchJSON("/coders.json").then(function (json) {
    var age = 0;

    for (var i = 0, l = json.length; i < l; i++) {
        age += json[i].age;
    }

    console.log(age);
});
```

---

## v2

Then we notice that we're effectively reducing the items of `json` down to `age`:

```javascript
fetchJSON("/coders.json").then(function (json) {
    var age = json.reduce(function (total, coder) {
        return total + coder.age;
    }, 0);

    console.log(age);
});
```

---

## v3

Then we think, let's simplify the `reduce` by passing in an array of ages rather than coders:

```javascript
fetchJSON("/coders.json").then(function (json) {
    var age = json.map(function (coder) {
        return coder.age;
    }).reduce(function (total, age) {
        return total + age;
    }, 0);

    console.log(age);
});
```

---

## v4

Next, we think, let's use Promises as intended and split this up into a series of `then` statements:

```javascript
fetchJSON("/coders.json").then(function (json) {
    return json.map(function (coder) {
        return coder.age;
    });
}).then(function (ages) {
    return ages.reduce(function (total, age) {
        return total + age;
    }, 0);
}).then(function (age) {
    return console.log(age);
});
```

---

## v5

Next, let's break out the more complex functions to avoid too much nesting:

```javascript
var getAges = function (json) {
    return json.map(function (coder) {
        return coder.age;
    });
};

var addAges = function (ages) {
    return ages.reduce(function (total, age) {
        return total + age;
    }, 0);
};

fetchJSON("/coders.json").then(function (json) {
    return getAges(json);
}).then(function (ages) {
    return addAges(ages);
}).then(function (age) {
    return console.log(age);
});
```

---

## v6

How about getting rid of all those unnecessary wrapper functions and using ES6 syntax:

```javascript
let getAges = json => json.map(coder => coder.age);
let addAges = ages => ages.reduce((total, age) => total + age, 0);

fetchJSON("/coders.json").then(getAges).then(addAges).then(console.log);
```

---

## v7

We've still got some nested functions, so let's pull those out:

```javascript
let getAge = coder => coder.age;
let getAges = json => json.map(getAge);
let addToTotal = (total, age) => total + age;
let addAges = ages => ages.reduce(addToTotal, 0);

fetchJSON("/coders.json").then(getAges).then(addAges).then(console.log);
```

---

## v8

Then we notice that `addToTotal` is just `add` and the `getAge` could be replaced with a `prop` call:

```javascript
import { prop, add } from "ramda";

let getAges = json => json.map(prop("age"));
let addAges = ages => ages.reduce(add, 0);

fetchJSON("/coders.json").then(getAges).then(addAges).then(console.log);
```

---

## v9

Then we remember that Ramda has a curried `map` and `reduce` function:

```javascript
import { prop, add, map, reduce } from "ramda";

let getAges = map(prop("age"));
let addAges = reduce(add, 0);

fetchJSON("/coders.json").then(getAges).then(addAges).then(console.log);
```

---

## v10

Then we realise that `reduce(add, 0)` is just `sum` and `map(prop("age"))` is just `pluck("age")`:

```javascript
import { pluck, sum } from "ramda";

fetchJSON("/coders.json").then(pluck("age")).then(sum).then(console.log);
```

---

## v11

Finally, we extract the code to do with totalling the ages into its own function, so we can use it elsewhere: 

```javascript
import { pluck, sum, compose } from "ramda";

let totalAges = compose(sum, pluck("age"))

fetchJSON("/coders.json").then(totalAges).then(console.log);
```

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
